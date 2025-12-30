export interface Deployment {
  id: string;
  userId: string;
  resourceId: string;
  version: string;
  action: "restart" | "scale-up" | "scale-down" | "update";
  status:
    | "pending"
    | "in-progress"
    | "successful"
    | "failed"
    | "rolling-back"
    | "rolled-back";
  startedAt: string;
  completedAt?: string;
  timestamp: string;
  name?: string;
}
