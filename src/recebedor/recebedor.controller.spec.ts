import { Test, TestingModule } from '@nestjs/testing';
import { RecebedorController } from './recebedor.controller';
import { RecebedorService } from './recebedor.service';

describe('RecebedorController', () => {
  let controller: RecebedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecebedorController],
      providers: [RecebedorService],
    }).compile();

    controller = module.get<RecebedorController>(RecebedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
