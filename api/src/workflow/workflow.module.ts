import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkflowRepository } from './repository/workflow.repository';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

@Module({
  controllers: [WorkflowController],
  providers: [PrismaService, WorkflowService, WorkflowRepository],
})
export class WorkflowModule {}