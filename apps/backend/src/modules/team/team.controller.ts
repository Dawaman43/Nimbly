import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createTeam(@Body() body: { name: string }, @Request() req) {
    const userId = req.user.userId;
    const user = await this.userService.findById(userId);
    if (!user) throw new Error('User not found');
    return this.teamService.createTeam(user, body.name);
  }

  @Post(':id/invite')
  async inviteUser(
    @Param('id') teamId: string,
    @Body() body: { username: string },
    @Request() req,
  ) {
    const userId = req.user.userId;
    const user = await this.userService.findById(userId);
    if (!user) throw new Error('User not found');
    return this.teamService.inviteUser(teamId, body.username, user);
  }

  @Get()
  async getUserTeams(@Request() req) {
    const userId = req.user.userId;
    return this.teamService.getUserTeams(userId);
  }
}
