import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecebedorService } from './recebedor.service';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';

@Controller('recebedor')
export class RecebedorController {
  constructor(private readonly recebedorService: RecebedorService) {}

  @Post()
  create(@Body() createRecebedorDto: CreateRecebedorDto) {
    return this.recebedorService.create(createRecebedorDto);
  }

  @Get()
  findAll() {
    return this.recebedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recebedorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecebedorDto: UpdateRecebedorDto,
  ) {
    return this.recebedorService.update(+id, updateRecebedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recebedorService.remove(+id);
  }
}
