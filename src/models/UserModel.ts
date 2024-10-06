import { User } from "@prisma/client";
import prisma from "../config/prisma";
import { v4 as uuid } from "uuid";

class UserModel {
  public async getAllUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error: any) {
      throw new Error("Error fetching all users");
    }
  }

  public async getUserById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error: any) {
      throw new Error("Error fetching user by ID");
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error: any) {
      console.error("Error fetching user by email:", error);
      return null; // Retornar null ao invés de lançar um erro
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string,
    address?: string | undefined,
    phoneNumber?: string | undefined
  ): Promise<User> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      return await prisma.user.create({
        data: {
          id: uuid(),
          name,
          email,
          password,
          address,
          phoneNumber,
          roleId: "2",
          borrowCount: 0,
          penaltyCount: 0,
        },
      });
    } catch (error: any) {
      throw new Error("Error creating user");
    }
  }
}

export default new UserModel();
