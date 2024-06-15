import { PartialType } from '@nestjs/mapped-types';
import { CreateRecebedorDto } from './create-recebedor.dto';

export class UpdateRecebedorDto extends PartialType(CreateRecebedorDto) {}
