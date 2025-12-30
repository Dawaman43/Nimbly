import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team, TeamMember } from './team.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    private userService: UserService,
  ) {}

  async createTeam(owner: User, name: string): Promise<Team> {
    const team = this.teamRepository.create({ name, ownerId: owner.id, owner });
    return this.teamRepository.save(team);
  }

  async inviteUser(
    teamId: string,
    username: string,
    inviter: User,
  ): Promise<TeamMember> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    const team = await this.teamRepository.findOneBy({ id: teamId });
    if (!team || team.ownerId !== inviter.id) {
      throw new Error('Unauthorized');
    }
    const member = this.teamMemberRepository.create({
      teamId,
      userId: user.id,
      team,
      user,
    });
    return this.teamMemberRepository.save(member);
  }

  async getTeamById(id: string): Promise<Team | null> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ['members', 'members.user'],
    });
  }

  async getUserTeams(userId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: { ownerId: userId },
      relations: ['members'],
    });
  }
}
