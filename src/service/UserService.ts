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
    const user = await UserModel.getUserByEmail(userEmail);
    if (!user) {
      console.log(`User with email ${userEmail} not found`);
    }
    return user; // Retornar null se não encontrar o usuário
  }

  public async registerUser(
    userName: string,
    userEmail: string,
    userPassword: string,
    address?: string,
    phoneNumber?: string
  ): Promise<User> {
    const hashedPassword = bcrypt.hashSync(userPassword, 10);
    return await UserModel.createUser(
      userName,
      userEmail,
      hashedPassword,
      address,
      phoneNumber
    );
  }

  //Pegar livro emprestado
  //Devolver livro
}

export default UserService;
