import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateWorkflowDto, InsertProjetoDto, InsertStatusDto, InsertSubstatusDto, InsertEstoqueDto, InsertClienteDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowRepository } from './repository/workflow.repository';

@Injectable()
export class WorkflowService {
  constructor(private readonly repository: WorkflowRepository) { }

  async getAllProjects() {
    return await this.repository.getAllProjects();

  }
  async getProject(id: number) {
    return await this.repository.getProject(id);

  }
  async createProject(insertProjetoDto: InsertProjetoDto) {
    const projeto = new InsertProjetoDto();
    projeto.nome = insertProjetoDto.nome;
    projeto.sla = insertProjetoDto.sla;

    try {
      await validateOrReject(projeto);
      return await this.repository.createProject(insertProjetoDto);
    } catch (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }

  async createStatus(insertStatusDto: InsertStatusDto) {
    const status = new InsertStatusDto();
    status.nome = insertStatusDto.nome;
    status.id_projeto = insertStatusDto.id_projeto;
    status.ordem = insertStatusDto.ordem;

    try {
      await validateOrReject(status);
      return await this.repository.createStatus(insertStatusDto);
    } catch (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }

  async createSubstatus(insertSubstatusDto: InsertSubstatusDto) {
    const substatus = new InsertSubstatusDto();
    substatus.nome = insertSubstatusDto.nome;
    substatus.id_status = insertSubstatusDto.id_status;
    substatus.ordem = insertSubstatusDto.ordem;
    
    try {
      await validateOrReject(substatus);
      return await this.repository.createSubstatus(insertSubstatusDto);
    } catch (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }


  async createProduct(insertEstoqueDto: InsertEstoqueDto) {
    const estoque = new InsertEstoqueDto();
    estoque.nome = insertEstoqueDto.nome;
    estoque.id_projeto = insertEstoqueDto.id_projeto;
    estoque.quantidade = insertEstoqueDto.quantidade;
    estoque.preco = insertEstoqueDto.preco;

    try {
      await validateOrReject(estoque);
      return await this.repository.createProduct(insertEstoqueDto);
    } catch (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }

  async createClient(insertClienteDto: InsertClienteDto) {
    const cliente = new InsertClienteDto();
    cliente.nome = insertClienteDto.nome;
    cliente.id_status = insertClienteDto.id_status;
    cliente.id_substatus = insertClienteDto.id_substatus;
    cliente.entrada = insertClienteDto.entrada;

    try {
      await validateOrReject(cliente);
      return await this.repository.createClient(insertClienteDto);
    } catch (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }
  /*
  async findById(id: bigint) {
    return await this.repository.findById(id);
  }

  async create(createWorkflowDTO: CreateWorkflowDto) {
    return await this.repository.create(createWorkflowDTO);
  }

  async update(id: bigint, updateWorkflowDTO: UpdateWorkflowDto) {
    return await this.repository.update(id, updateWorkflowDTO);
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
    */
}