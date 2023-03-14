import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserDocument = {
  id: number;
  email: string;
  userName?: string;
  name?: string;
  password?: string;
  refreshToken?: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserDocument[]> {
    return this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        userName: true,
        name: true,
      },
    });
  }

  async findById(id: number): Promise<UserDocument> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        name: true,
        refreshToken: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto | { refreshToken: string },
  ): Promise<UserDocument> {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        userName: true,
        name: true,
      },
    });
  }

  async remove(id: number): Promise<UserDocument> {
    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
