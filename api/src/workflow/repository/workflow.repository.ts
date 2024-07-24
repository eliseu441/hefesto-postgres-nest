import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkflowDto, InsertProjetoDto, InsertStatusDto, InsertSubstatusDto, InsertEstoqueDto, InsertClienteDto } from '../dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(private readonly prisma: PrismaService) {}


async getAllProjects() {
  return await this.prisma.tbl_projeto.findMany();
}
async getProject(id: number) {
  return await this.prisma.tbl_projeto.findUnique({
    where: { id: id },
  });
}

async createProject(InsertProjetoDto: InsertProjetoDto) {
  return await this.prisma.tbl_projeto.create({ data: InsertProjetoDto });
}
async createStatus(InsertStatusDto: InsertStatusDto) {
  return await this.prisma.tbl_status.create({ data: InsertStatusDto });
}

async createSubstatus(InsertSubstatusDto: InsertSubstatusDto) {
  return await this.prisma.tbl_substatus.create({ data: InsertSubstatusDto });
}

async createProduct(InsertEstoqueDto: InsertEstoqueDto) {
  return await this.prisma.tbl_estoque.create({ data: InsertEstoqueDto });
}

async createClient(InsertClienteDto: InsertClienteDto) {
  return await this.prisma.tbl_clientes.create({ data: InsertClienteDto });
}



/*
  async create(createWorkflowDTO: CreateWorkflowDto) {
    return await this.prisma.workflow.create({ data: createWorkflowDTO });
  }

  async update(id: bigint, updateWorkflowDTO: UpdateWorkflowDto) {
    return await this.prisma.workflow.update({
      where: { id },
      data: updateWorkflowDTO,
    });
  }

  async remove(id: bigint) {
    return await this.prisma.movie.delete({
      where: { id },
    });
  }
    */
}