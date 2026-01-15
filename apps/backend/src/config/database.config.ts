import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/user.entity';
import { CloudResource } from '../modules/cloud-resources/cloud-resource.entity';
import { Alert } from '../modules/alerts/alert.entity';
import { Deployment } from '../modules/deployments/deployment.entity';
import { Invoice } from '../modules/billing/invoice.entity';
import { MonitoringLog } from '../modules/monitoring/monitoring-log.entity';
import { CostHistory } from '../modules/cost-estimation/cost-history.entity';
import { Team, TeamMember } from '../modules/team/team.entity';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'nimbly',
    entities: [
      User,
      CloudResource,
      Alert,
      Deployment,
      Invoice,
      MonitoringLog,
      CostHistory,
      Team,
      TeamMember,
    ],
    synchronize: !isProduction, // Only auto-sync in development
    logging: !isProduction ? ['error', 'warn', 'schema'] : ['error'],
    migrations: ['dist/migrations/*.js'],
    migrationsRun: isProduction, // Run migrations automatically in production
    ssl: isProduction
      ? {
          rejectUnauthorized: false,
        }
      : false,
    extra: {
      max: 20, // Maximum number of connections in the pool
      connectionTimeoutMillis: 2000,
    },
  };
};
