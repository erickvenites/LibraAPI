import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

class UserService {
  constructor() {}

  public async fetchAllUsers(): Promise<User[]> {
    return await UserModel.getAllUsers();
  }

  public async fetchUserById(userId: string): Promise<User | null> {
    return await UserModel.getUserById(userId);
  }

  public async fetchUserByEmail(userEmail: string): Promise<User | null> {
    return await UserModel.getUserByEmail(userEmail);
  }

  public async registerUser(
    userName: string,
    userEmail: string,
    userPassword: string
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(userPassword, 10);
    return await UserModel.createUser(userName, userEmail, hashedPassword);
  }
}

export default UserService;
