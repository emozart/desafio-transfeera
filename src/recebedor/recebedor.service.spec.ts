import { Test, TestingModule } from '@nestjs/testing';
import { RecebedorService } from './recebedor.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';

const mockPrismaService = {
  recebedor: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest
      .fn()
      .mockImplementation((params: { where: any; data: any }) => {
        const { where, data } = params;

        if (where.id === '1') {
          const mockRecebedor = {
            id: '1',
            nomeRasaoSocial: data.nome || 'João da Silva',
            email: data.email || 'joão.silva@teste.com',
            cpfCnpj: data.cpfCnpj || '12345678900',
            tipoChave: data.tipoChave || 'CPF',
            chave: data.chave || '12345678900',
            status: 'Rascunho',
          };
          return Promise.resolve(mockRecebedor);
        } else if (where.id === '2') {
          const mockRecebedor = {
            id: '2',
            nomeRasaoSocial: 'Maria de Souza',
            email: data.email || 'maria.souza@teste.com',
            cpfCnpj: '98765432100',
            tipoChave: 'CPF',
            chave: '98765432100',
            status: 'Validado',
          };
          return Promise.resolve(mockRecebedor);
        } else {
          return Promise.reject(new Error('Recebedor não encontrado'));
        }
      }),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('RecebedorService', () => {
  let service: RecebedorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecebedorService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RecebedorService>(RecebedorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Devem ser definidos', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('should create a new recebedor', async () => {
      const createDto: CreateRecebedorDto = {
        nome: 'João da Silva',
        email: 'joao.silva@teste.com',
        cpfCnpj: '12345678900',
        tipoChave: 'CPF',
        chave: '12345678900',
      };

      mockPrismaService.recebedor.create.mockResolvedValueOnce({
        id: '1',
        ...createDto,
      });

      const createdRecebedor = await service.create(createDto);

      expect(createdRecebedor).toEqual({ id: '1', ...createDto });
      expect(mockPrismaService.recebedor.create).toHaveBeenCalledWith({
        data: {
          nomeRasaoSocial: createDto.nome,
          email: createDto.email,
          cpfCnpj: '12345678900',
          tipoChave: createDto.tipoChave,
          chave: '12345678900',
          status: 'Rascunho',
        },
      });
    });
  });
});
