import {
  Body,
  ConflictException,
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from './services/password.service';
import { Prisma } from '@prisma/client';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/registration')
  async registration(@Body() body) {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        body.password,
      );

      const result = await this.prisma.users.create({
        data: {
          ...body,
          password: hashedPassword,
        },
      });

      return {
        status: 'ok',
        message: `User ${result.email} successfully register`,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${body.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
