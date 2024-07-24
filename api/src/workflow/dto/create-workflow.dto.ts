import { IsInt, IsDateString, IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;
}
export class CreateWorkflowDto {
 
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;
}
export class InsertProjetoDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsOptional()
  @IsInt({ message: 'O SLA deve ser um número inteiro.' })
  sla?: number;
}

export class InsertStatusDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O id_projeto é obrigatório.' })
  @IsInt({ message: 'O id_projeto deve ser um número inteiro.' })
  id_projeto: number;

  @IsNotEmpty({ message: 'A ordem é obrigatória.' })
  @IsNumber({}, { message: 'A ordem deve ser um número.' })
  ordem: number;

  @IsOptional()
  @IsInt({ message: 'O SLA deve ser um número inteiro.' })
  sla?: number;
}

export class InsertSubstatusDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O id_status é obrigatório.' })
  @IsInt({ message: 'O id_status deve ser um número inteiro.' })
  id_status: number;

  @IsNotEmpty({ message: 'A ordem é obrigatória.' })
  @IsNumber({}, { message: 'A ordem deve ser um número.' })
  ordem: number;
}

export class InsertEstoqueDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O id_projeto é obrigatório.' })
  @IsInt({ message: 'O id_projeto deve ser um número inteiro.' })
  id_projeto: number;

  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  quantidade: number;

  @IsNotEmpty({ message: 'O preço é obrigatório.' })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  preco: number;
}

export class InsertClienteDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O id_status é obrigatório.' })
  @IsInt({ message: 'O id_status deve ser um número inteiro.' })
  id_status: number;

  @IsNotEmpty({ message: 'O id_substatus é obrigatório.' })
  @IsInt({ message: 'O id_substatus deve ser um número inteiro.' })
  id_substatus: number;

  @IsNotEmpty({ message: 'A data de entrada é obrigatória.' })
  @IsDateString({}, { message: 'A entrada deve ser uma data válida.' })
  entrada: Date;
}