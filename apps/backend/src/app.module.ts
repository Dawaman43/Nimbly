import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CloudResourcesModule } from './modules/cloud-resources/cloud-resources.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { DeploymentsModule } from './modules/deployments/deployments.module';
import { BillingModule } from './modules/billing/billing.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { TeamModule } from './modules/team/team.module';
import { CostEstimationModule } from './modules/cost-estimation/cost-estimation.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CloudResourcesModule,
    AlertsModule,
    DeploymentsModule,
    BillingModule,
    MonitoringModule,
    TeamModule,
    CostEstimationModule,
    TemplatesModule,
    HealthModule,
  ],
})
export class AppModule {}
