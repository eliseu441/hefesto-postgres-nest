import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WorkflowModule } from './workflow/workflow.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    WorkflowModule
  ],
  providers: [PrismaService],
})
export class AppModule {}