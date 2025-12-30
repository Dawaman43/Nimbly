import { Module } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from './modules/user/user.service';
import { CloudResourcesService } from './modules/cloud-resources/cloud-resources.service';

@Module({
  imports: [AuthService, UserService, CloudResourcesService],
})
export class AppModule {}
