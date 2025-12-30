export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "admin" | "user" | "guest";
}
