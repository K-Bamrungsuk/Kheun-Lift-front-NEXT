// Matches GET /users/me → { user: User } in kheun-lift-backend-go.
export type WeightClass = {
  id: number;
  gender: "male" | "female";
  name: string;
  minWeight: number;
  maxWeight: number | null;
};

export type User = {
  id: number;
  username: string;
  email: string;
  profileImage: string | null;
  bodyWeight: number | null;
  height: number | null;
  gender: "male" | "female" | null;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  weightClass: WeightClass | null;
};
