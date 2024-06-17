import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationFilterDto } from './dto/pagination-filter.dto';
import { extractNumbers } from './helpers/extractNumbers';

@Injectable()
export class RecebedorService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRecebedorDto: CreateRecebedorDto) {
    const recebedor = this.prisma.recebedor.create({
      data: {
        nomeRasaoSocial: createRecebedorDto.nome,
        email: createRecebedorDto.email,
        cpfCnpj: extractNumbers(createRecebedorDto.cpfCnpj),
        tipoChave: createRecebedorDto.tipoChave,
        chave:
          createRecebedorDto.tipoChave === 'CPF' ||
          createRecebedorDto.tipoChave === 'CNPJ'
            ? extractNumbers(createRecebedorDto.chave)
            : createRecebedorDto.chave,
        status: 'Rascunho',
      },
    });
    return recebedor;
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

  async findOne(id: string) {
    const recebedor = await this.prisma.recebedor.findUnique({ where: { id } });

    if (!recebedor)
      throw new HttpException('Recebedor não encontrado', HttpStatus.NOT_FOUND);

    return recebedor;
  }

  async update(id: string, updateRecebedorDto: UpdateRecebedorDto) {
    const recebedor = await this.prisma.recebedor.findUnique({ where: { id } });
    if (!recebedor)
      throw new HttpException('Recebedor não encontrado', HttpStatus.NOT_FOUND);

    switch (recebedor.status) {
      case 'Rascunho':
        return await this.prisma.recebedor.update({
          where: {
            id,
          },
          data: {
            nomeRasaoSocial: updateRecebedorDto?.nome,
            email: updateRecebedorDto?.email,
            cpfCnpj: updateRecebedorDto?.cpfCnpj,
            tipoChave: updateRecebedorDto?.tipoChave,
            chave: updateRecebedorDto.chave,
          },
        });
      case 'Validado':
        if (
          !!updateRecebedorDto.nome ||
          !!updateRecebedorDto.cpfCnpj ||
          !!updateRecebedorDto.tipoChave ||
          !!updateRecebedorDto.chave
        ) {
          throw new HttpException(
            'Recebedores validados só podem alterar o email',
            HttpStatus.FORBIDDEN,
          );
        }
        return await this.prisma.recebedor.update({
          where: {
            id,
          },
          data: {
            email: updateRecebedorDto?.email,
          },
        });
    }
  }

  async remove(id: string) {
    const recebedor = await this.prisma.recebedor.findUnique({ where: { id } });
    if (!recebedor)
      throw new HttpException('Recebedor não encontrado', HttpStatus.NOT_FOUND);

    return await this.prisma.recebedor.delete({ where: { id } });
  }
}
