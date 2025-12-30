import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CloudResourcesModule } from './modules/cloud-resources/cloud-resources.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { DeploymentsModule } from './modules/deployments/deployments.module';
import { BillingModule } from './modules/billing/billing.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';

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
  ],
})
export class AppModule { }
