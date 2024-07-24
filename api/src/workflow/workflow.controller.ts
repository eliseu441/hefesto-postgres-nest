import {
    Controller,
    Get,
    Request,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpException, 
    HttpStatus 
  } from '@nestjs/common';
  import { CreateWorkflowDto, InsertProjetoDto, InsertStatusDto, InsertSubstatusDto, InsertEstoqueDto, InsertClienteDto  } from './dto/create-workflow.dto';
  import { WorkflowService } from './workflow.service';
  
  @Controller('api')
  export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}
  
    @Get('/getAllProjects/')
    async getAllProjects() {
      return await this.workflowService.getAllProjects();
    }
  
    @Get('/getProject/:id')
    async getProject(@Param('id') id: string) {
      return await this.workflowService.getProject(parseInt(id, 10));
    }
  
    @Post('/createProject')
    async createProject(@Body() InsertProjetoDto: InsertProjetoDto) {
        return await this.workflowService.createProject(InsertProjetoDto);
    }
    @Post('/createStatus')
    async createStatus(@Body() InsertStatusDto: InsertStatusDto) {
      return await this.workflowService.createStatus(InsertStatusDto);
    }
    @Post('/createSubstatus')
    async createSubstatus(@Body() InsertSubstatusDto: InsertSubstatusDto) {
      return await this.workflowService.createSubstatus(InsertSubstatusDto);
    }
    @Post('/createProduct')
    async createProduct(@Body() InsertEstoqueDto: InsertEstoqueDto) {
      return await this.workflowService.createProduct(InsertEstoqueDto);
    }
    @Post('/createClient')
    async createClient(@Body() InsertClienteDto: InsertClienteDto) {
      return await this.workflowService.createClient(InsertClienteDto);
    }



/*  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateWorkflowDto: UpdateWorkflowDto,
    ) {
      return await this.workflowService.update(BigInt(id), updateWorkflowDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.workflowService.remove(BigInt(id));
    }
      */
  }