import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface User extends User {
      id?: string;
    }
  }
}
