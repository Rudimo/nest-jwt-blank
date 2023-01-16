import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(email: string): Promise<User | undefined> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
