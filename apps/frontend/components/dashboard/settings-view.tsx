"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Lock,
  Bell,
  Users,
  Save,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SettingsViewProps {
  user: {
    id: string;
    name: string;
    email: string;
    username?: string;
  } | null;
}

export default function SettingsView({ user }: SettingsViewProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
    "checking" | "available" | "taken" | "idle"
  >("idle");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Invite member state
  const [inviteUsername, setInviteUsername] = useState("");
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Remove member dialog state
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      id: user?.id || "",
      name: user?.name || "",
      role: "Owner",
      isCurrentUser: true,
    },
    {
      id: "alice-smith",
      name: "Alice Smith",
      role: "Developer",
      isCurrentUser: false,
    },
  ]);

  const handleUpdateProfile = async () => {
    if (!user?.id) return;

    setIsUpdating(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`http://[::1]:4000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim(),
        }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        // Optionally refresh the page or update parent state
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const checkUsernameAvailability = useCallback(
    async (usernameToCheck: string) => {
      const trimmed = usernameToCheck.trim();

      if (!trimmed) {
        setUsernameStatus("idle");
        setUsernameError(null);
        return;
      }

      if (trimmed.length < 5) {
        setUsernameStatus("idle");
        setUsernameError("Username must be at least 5 characters long");
        return;
      }

      if (trimmed === user?.username) {
        setUsernameStatus("idle");
        setUsernameError(null);
        return;
      }

      setUsernameStatus("checking");
      setUsernameError(null);

      try {
        const res = await fetch("http://[::1]:4000/auth/check-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: trimmed }),
        });

        if (res.ok) {
          const data = await res.json();
          setUsernameStatus(data.available ? "available" : "taken");
        } else {
          setUsernameStatus("idle");
          setUsernameError("Failed to check username availability");
        }
      } catch (error) {
        console.error("Username check error:", error);
        setUsernameStatus("idle");
        setUsernameError("Failed to check username availability");
      }
    },
    [user?.username]
  );

  // Debounced username checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [username, checkUsernameAvailability]);

  // Debounced username suggestions search
  const searchUsernameSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setUsernameSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `http://[::1]:4000/users/search-usernames?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const suggestions = await res.json();
        setUsernameSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } else {
        setUsernameSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Username search error:", error);
      setUsernameSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsernameSuggestions(inviteUsername);
    }, 300); // 300ms delay for suggestions

    return () => clearTimeout(timeoutId);
  }, [inviteUsername, searchUsernameSuggestions]);

  const handleInviteMember = async () => {
    if (!inviteUsername.trim()) return;

    const token = localStorage.getItem("access_token");

    try {
      // For now, just show a success message since we don't have the invite API yet
      toast.success(`Invitation sent to ${inviteUsername}!`);

      // Trigger notification
      if (typeof window !== "undefined" && (window as any).addNotification) {
        (window as any).addNotification({
          title: "Team Invitation Sent",
          message: `An invitation has been sent to ${inviteUsername} to join your team.`,
          type: "team",
        });
      }

      setInviteUsername("");
      setUsernameSuggestions([]);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Invite error:", error);
      toast.error("Failed to send invitation");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInviteUsername(suggestion);
    setShowSuggestions(false);
  };

  const handleRemoveMember = (memberName: string) => {
    setMemberToRemove(memberName);
    setShowRemoveDialog(true);
  };

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;

    // Remove the member from the team
    setTeamMembers((prev) =>
      prev.filter((member) => member.name !== memberToRemove)
    );

    toast.success(`${memberToRemove} has been removed from the team.`);

    setShowRemoveDialog(false);
    setMemberToRemove(null);
  };

  if (!user) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and team preferences.
          </p>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              Unable to load user profile. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = user.name;
  const displayEmail = user.email;
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and team preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your public profile and details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {displayName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. Max 1MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Full Name</Label>
                  <Input
                    id="firstName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username (min 5 characters)"
                      className={
                        usernameError && username.trim().length < 5
                          ? "border-red-500"
                          : usernameStatus === "taken"
                            ? "border-red-500"
                            : usernameStatus === "available"
                              ? "border-green-500"
                              : ""
                      }
                    />
                    {usernameStatus === "checking" && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {usernameStatus === "available" && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    {usernameStatus === "taken" && (
                      <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                    {usernameError && username.trim().length < 5 && (
                      <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {usernameStatus === "available" && username.trim() && (
                    <p className="text-xs text-green-600">
                      Username is available
                    </p>
                  )}
                  {usernameStatus === "taken" && username.trim() && (
                    <p className="text-xs text-red-600">
                      Username is already taken
                    </p>
                  )}
                  {usernameError && (
                    <p className="text-xs text-red-600">{usernameError}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={displayEmail} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Software Engineer at..."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleUpdateProfile}
                disabled={
                  isUpdating ||
                  usernameStatus === "taken" ||
                  (username.trim().length > 0 && username.trim().length < 5)
                }
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage who has access to this project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.isCurrentUser
                            ? displayName.substring(0, 2).toUpperCase()
                            : member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {member.name} {member.isCurrentUser && "(You)"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    {member.isCurrentUser ? (
                      <Button variant="outline" size="sm" disabled>
                        Manage
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveMember(member.name)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Label>Invite New Member</Label>
                  <div className="relative mt-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          placeholder="Enter username to invite"
                          value={inviteUsername}
                          onChange={(e) => setInviteUsername(e.target.value)}
                          onFocus={() => {
                            if (
                              inviteUsername.trim().length >= 2 ||
                              usernameSuggestions.length > 0
                            ) {
                              setShowSuggestions(true);
                            }
                          }}
                          onBlur={() => {
                            // Delay hiding suggestions to allow clicks
                            setTimeout(() => setShowSuggestions(false), 200);
                          }}
                        />
                        {isSearching && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        )}
                        {showSuggestions && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                            {usernameSuggestions.length > 0
                              ? usernameSuggestions.map((suggestion, index) => (
                                  <div
                                    key={index}
                                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                    onClick={() =>
                                      handleSuggestionClick(suggestion)
                                    }
                                  >
                                    {suggestion}
                                  </div>
                                ))
                              : inviteUsername.trim().length >= 2 &&
                                !isSearching && (
                                  <div className="px-3 py-2 text-sm text-muted-foreground">
                                    No users found
                                  </div>
                                )}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={handleInviteMember}
                        disabled={!inviteUsername.trim()}
                      >
                        Invite
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and API keys.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium mb-4">API Keys</h3>
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                  <div className="space-y-1">
                    <div className="font-mono text-sm">pk_live_51Mz...8s9d</div>
                    <div className="text-xs text-muted-foreground">
                      Created 2 months ago
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Generate New Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what we email you about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Deployment Status",
                  desc: "Get notified when a deployment succeeds or fails.",
                },
                {
                  title: "Budget Alerts",
                  desc: "Receive alerts when you reach 80% of your budget.",
                },
                {
                  title: "Security Alerts",
                  desc: "Important security notifications about your account.",
                },
                {
                  title: "Marketing Emails",
                  desc: "Receive news about new features.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">{item.title}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="flex items-center h-6">
                    <Switch
                      defaultChecked={i < 3}
                      className="data-[state=checked]:bg-orange-600"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Remove Member Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove} from the team?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRemoveDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemoveMember}>
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
