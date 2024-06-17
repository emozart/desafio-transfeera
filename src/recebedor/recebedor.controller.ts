import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { RecebedorService } from './recebedor.service';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';
import { PaginationFilterDto } from './dto/pagination-filter.dto';

@Controller('recebedor')
export class RecebedorController {
  constructor(private readonly recebedorService: RecebedorService) {}

  @Post()
  create(@Body() createRecebedorDto: CreateRecebedorDto) {
    return this.recebedorService.create(createRecebedorDto);
  }

  @Post('list')
  findAll(@Body() paginationFilterDto: PaginationFilterDto) {
    return this.recebedorService.findAll(paginationFilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recebedorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecebedorDto: UpdateRecebedorDto,
  ) {
    await this.recebedorService.update(id, updateRecebedorDto);
    return;
  }

  @Delete()
  @HttpCode(204)
  async remove(@Body('ids') ids: string[]) {
    await this.recebedorService.remove(ids);
    return;
  }
}
