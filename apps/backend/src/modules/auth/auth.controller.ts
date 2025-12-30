import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('signup')
  async signup(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // req.user is populated by JwtStrategy.validate() which returns { userId, email, role }
    // We want to return the full user object (excluding password ideally, but for now full object is okay as long as entity has @Exclude or we filter it)
    // Actually User entity might show password if not careful. Let's rely on UserService.
    // But JwtStrategy returns userId in 'userId' property.

    // In NestJS passport-jwt, the default property is 'user'.
    const userId = req.user.userId;
    const user = await this.userService.findById(userId);

    // Rudimentary password removal if not handled by Entity
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return user;
  }
}
