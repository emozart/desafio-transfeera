import { Injectable } from '@nestjs/common';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';

@Injectable()
export class RecebedorService {
  create(createRecebedorDto: CreateRecebedorDto) {
    return 'This action adds a new recebedor';
  }

  findAll() {
    return `This action returns all recebedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recebedor`;
  }

  update(id: number, updateRecebedorDto: UpdateRecebedorDto) {
    return `This action updates a #${id} recebedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} recebedor`;
  }
}
