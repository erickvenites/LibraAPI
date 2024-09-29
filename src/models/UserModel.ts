import { Books, User } from "@prisma/client";
import prisma from "../config/prisma";
import { v4 as uuid } from "uuid";

class UserModel {
  public async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return await prisma.user.create({
      data: {
        id: uuid(),
        name,
        email,
        password,
      },
    });
  }
}

export default new UserModel(); // Exporta uma instância do UserModel
