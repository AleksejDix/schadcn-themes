export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
};

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2023-03-14 09:15",
    role: "editor",
    status: "inactive",
    lastLogin: "2023-03-14 09:15",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-03-15 14:30",
    role: "admin",
    status: "active",
    lastLogin: "2023-03-15 14:30",
  },
];
