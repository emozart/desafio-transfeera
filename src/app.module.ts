import { Module } from '@nestjs/common';
import { RecebedorModule } from './recebedor/recebedor.module';

@Module({
  imports: [RecebedorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
