import {User} from '@/model/user';
import {ObjectId} from "mongodb";

declare module 'next-auth' {
  /** 기존 "user"타입에서 사용자 정의 "User"타입으로 변경 */
  interface Session {
    user: User;
  }
}

export interface UserSession {
  user: {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    phone: string;
    student_number: number;
    role: string;
    lastAccess: Date;
  };
  session?: {
    sessionId: string;
  }
}