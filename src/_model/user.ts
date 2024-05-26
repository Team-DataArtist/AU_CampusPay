import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  password: string;
  email: string;
  username: string;
  student_number: number;
  phone: string;
  role: string;
}