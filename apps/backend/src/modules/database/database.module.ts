import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CloudResource } from '../cloud-resources/cloud-resource.entity';
import { Alert } from '../alerts/alert.entity';
import { Deployment } from '../deployments/deployment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'nimbly',
      entities: [User, CloudResource, Alert, Deployment],
      synchronize: true, // auto-create tables for dev
    }),
  ],
})
export class DatabaseModule {}
