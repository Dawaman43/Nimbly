export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  status: "pending" | "accepted" | "declined";
  user: User;
}
