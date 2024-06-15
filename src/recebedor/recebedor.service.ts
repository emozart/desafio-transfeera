import { Injectable } from '@nestjs/common';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationFilterDto } from './dto/pagination-filter.dto';

@Injectable()
export class RecebedorService {
  constructor(private readonly prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createRecebedorDto: CreateRecebedorDto) {
    return 'This action adds a new recebedor';
  }

  async findAll(paginationFilterDto: PaginationFilterDto) {
    const skip = (paginationFilterDto.pagina - 1) * paginationFilterDto.itens;
    const recebedores = await this.prisma.recebedor.findMany({
      where: {
        nomeRasaoSocial: paginationFilterDto.nome,
        status: paginationFilterDto.status,
        tipoChave: paginationFilterDto.tipoChave,
        chave: paginationFilterDto.chave,
      },
      skip,
      take: paginationFilterDto.itens,
    });

    const result = await this.prisma.recebedor.findMany({
      where: {
        nomeRasaoSocial: paginationFilterDto.nome,
        status: paginationFilterDto.status,
        tipoChave: paginationFilterDto.tipoChave,
        chave: paginationFilterDto.chave,
      },
    });

    return {
      total: result.length,
      pagina: paginationFilterDto.pagina,
      recebedores,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} recebedor`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateRecebedorDto: UpdateRecebedorDto) {
    return `This action updates a #${id} recebedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} recebedor`;
  }
}
