"use client";

import React, { useState } from "react";
import { User, Lock, Bell, Users, Save, Shield } from "lucide-react";
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
import { toast } from "sonner";

interface SettingsViewProps {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function SettingsView({ user }: SettingsViewProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState("");

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
                disabled={isUpdating}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {displayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{displayName} (You)</p>
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alice Smith</p>
                      <p className="text-xs text-muted-foreground">Developer</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
                <div className="border-t pt-4 mt-4">
                  <Label>Invite New Member</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="colleague@company.com" />
                    <Button>Invite</Button>
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
    </div>
  );
}
