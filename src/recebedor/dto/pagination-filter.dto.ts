import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationFilterDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  tipoChave: string;

  @IsOptional()
  @IsString()
  chave: string;

  @IsNumber()
  @Min(1)
  pagina: number;

  @IsNumber()
  @Min(1)
  itens: number;
}
