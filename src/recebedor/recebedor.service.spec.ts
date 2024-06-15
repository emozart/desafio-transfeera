import { Test, TestingModule } from '@nestjs/testing';
import { RecebedorService } from './recebedor.service';

describe('RecebedorService', () => {
  let service: RecebedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecebedorService],
    }).compile();

    service = module.get<RecebedorService>(RecebedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
