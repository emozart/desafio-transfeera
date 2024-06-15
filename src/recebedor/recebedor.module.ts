import { Module } from '@nestjs/common';
import { RecebedorService } from './recebedor.service';
import { RecebedorController } from './recebedor.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RecebedorController],
  providers: [RecebedorService, PrismaService],
})
export class RecebedorModule {}
