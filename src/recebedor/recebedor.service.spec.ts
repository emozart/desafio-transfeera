import { Test, TestingModule } from '@nestjs/testing';
import { RecebedorService } from './recebedor.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecebedorDto } from './dto/create-recebedor.dto';
import { PaginationFilterDto } from './dto/pagination-filter.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateRecebedorDto } from './dto/update-recebedor.dto';

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

  describe('findAll', () => {
    it('deve retornar uma lista de recebedores paginada', async () => {
      const paginationFilterDto: PaginationFilterDto = {
        nome: '',
        status: '',
        tipoChave: '',
        chave: '',
        pagina: 1,
        itens: 3,
      };

      const mockRecebedores = [
        {
          id: '1',
          nomeRasaoSocial: 'Cydney Olson',
          email: 'cydney.olson24@hotmail.com',
          cpfCnpj: '042.631.612-63',
          tipoChave: 'TELEFONE',
          chave: '+55 (93) 91922-6949',
          status: 'Rascunho',
        },
        {
          id: '2',
          nomeRasaoSocial: 'Dock Harris',
          email: 'dock_harris36@yahoo.com',
          cpfCnpj: '721.922.298-07',
          tipoChave: 'CPF',
          chave: '721.922.298-07',
          status: 'Rascunho',
        },
        {
          id: '3',
          nomeRasaoSocial: 'Eldridge Nicolas',
          email: 'eldridge_nicolas28@hotmail.com',
          cpfCnpj: '840.045.111-06',
          tipoChave: 'TELEFONE',
          chave: '+55 (21) 91664-6443',
          status: 'Validado',
        },
        {
          id: '4',
          nomeRasaoSocial: 'Shanna Hane',
          email: 'shanna_hane18@hotmail.com',
          cpfCnpj: '735.417.028-50',
          tipoChave: 'EMAIL',
          chave: 'shanna_hane18@hotmail.com',
          status: 'Rascunho',
        },
        {
          id: '5',
          nomeRasaoSocial: 'Kirstin Harvey',
          email: 'kirstin_harvey76@hotmail.com',
          cpfCnpj: '828.860.572-69',
          tipoChave: 'CPF',
          chave: '828.860.572-69',
          status: 'Rascunho',
        },
        {
          id: '6',
          nomeRasaoSocial: 'Interfaces Ltda.',
          email: 'contato_21@interfaces.com.br',
          cpfCnpj: '826.640.547/0009-83',
          tipoChave: 'CNPJ',
          chave: '826.640.547/0009-83',
          status: 'Validado',
        },
        {
          id: '7',
          nomeRasaoSocial: 'Metrics Ltda.',
          email: 'contato_@metrics.com.br',
          cpfCnpj: '354.846.975/0008-41',
          tipoChave: 'CHAVE_ALEATORIA',
          chave: 'DGpahSbD-DFiF-Jxha-QIMo-dIGqAd8fVQnv',
          status: 'Rascunho',
        },
        {
          id: '8',
          nomeRasaoSocial: 'Antoinette Jacobson',
          email: 'antoinette_jacobson@gmail.com',
          cpfCnpj: '218.442.977-46',
          tipoChave: 'TELEFONE',
          chave: '+55 (18) 96330-9206',
          status: 'Rascunho',
        },
        {
          id: '9',
          nomeRasaoSocial: 'Initiatives S.A.',
          email: 'contato_@initiatives.com.br',
          cpfCnpj: '752.906.907/0007-58',
          tipoChave: 'CHAVE_ALEATORIA',
          chave: 'Nquhex6P-FbIX-SFjJ-qGzN-ev76xuoIdGaL',
          status: 'Validado',
        },
        {
          id: '10',
          nomeRasaoSocial: 'Katelynn Ryan',
          email: 'katelynn_ryan@hotmail.com',
          cpfCnpj: '178.080.733-25',
          tipoChave: 'EMAIL',
          chave: 'katelynn_ryan@hotmail.com',
          status: 'Rascunho',
        },
      ];

      const mockRecebedoresPrimeiraChamada = [
        mockRecebedores[0],
        mockRecebedores[1],
        mockRecebedores[2],
      ];

      // Primeira chamada busca os recebedores da página selecionada
      mockPrismaService.recebedor.findMany.mockResolvedValueOnce(
        mockRecebedoresPrimeiraChamada,
      );
      // Segunda chamada busca total de recebedores encontrados
      mockPrismaService.recebedor.findMany.mockResolvedValueOnce(
        mockRecebedores,
      );

      const result = await service.findAll(paginationFilterDto);

      expect(result.total).toBe(mockRecebedores.length);
      expect(result.pagina).toBe(paginationFilterDto.pagina);
      expect(result.recebedores).toEqual(mockRecebedoresPrimeiraChamada);

      expect(mockPrismaService.recebedor.findMany).toHaveBeenCalledTimes(2);
      const firstCall = mockPrismaService.recebedor.findMany.mock.calls[0][0];
      expect(firstCall.where).toEqual({
        nomeRasaoSocial: paginationFilterDto.nome,
        status: paginationFilterDto.status,
        tipoChave: paginationFilterDto.tipoChave,
        chave: paginationFilterDto.chave,
      });
      expect(firstCall.skip).toBe(
        (paginationFilterDto.pagina - 1) * paginationFilterDto.itens,
      );
      expect(firstCall.take).toBe(paginationFilterDto.itens);
    });
  });

  describe('findOne', () => {
    it('Deve encontrar o recebedor pelo id', async () => {
      const id = '1';
      const mockRecebedor = {
        id,
        nomeRasaoSocial: 'João da Silva',
        email: 'joao.silva@teste.com',
        cpfCnpj: '042.631.612-63',
        tipoChave: 'TELEFONE',
        chave: '+55 (93) 91922-6949',
        status: 'Rascunho',
      };

      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(
        mockRecebedor,
      );

      const foundRecebedor = await service.findOne(id);

      expect(foundRecebedor).toEqual(mockRecebedor);
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('Deve lançar um erro se o recebedor não for encontrado', async () => {
      const id = 'id não encontrado';

      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new HttpException('Recebedor não encontrado', HttpStatus.NOT_FOUND),
      );
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('Update', () => {
    it('Deve lançar um erro se o recebedor não for encontrado', async () => {
      const id = 'id não encontrado';
      const updateDto: UpdateRecebedorDto = {
        nome: 'João da Silva',
        email: 'joao.silva@teste.com',
        cpfCnpj: '12345678900',
        tipoChave: 'CPF',
        chave: '12345678900',
      };

      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(null);

      await expect(service.update(id, updateDto)).rejects.toThrow(
        new HttpException('Recebedor não encontrado', HttpStatus.NOT_FOUND),
      );
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('Deve atualizar um recebedor com status Rascunho', async () => {
      const id = '1';
      const updateDto: UpdateRecebedorDto = {
        nome: 'João da Silva',
        email: 'joao.silva@teste.com',
        cpfCnpj: '12345678900',
        tipoChave: 'CPF',
        chave: '12345678900',
      };

      const mockRecebedor = {
        id,
        nomeRasaoSocial: updateDto.nome,
        email: updateDto.email,
        cpfCnpj: updateDto.cpfCnpj,
        tipoChave: updateDto.tipoChave,
        chave: updateDto.chave,
        status: 'Rascunho',
      };

      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(
        mockRecebedor,
      );

      const updatedRecebedor = await service.update(id, updateDto);

      expect(updatedRecebedor).toEqual(mockRecebedor);
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.recebedor.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          nomeRasaoSocial: updateDto.nome,
          email: updateDto.email,
          cpfCnpj: updateDto.cpfCnpj,
          tipoChave: updateDto.tipoChave,
          chave: updateDto.chave,
        },
      });
    });

    it('Deve atualizar somente email se o status for Validado', async () => {
      const id = '2';
      const updateDto: UpdateRecebedorDto = {
        email: 'maria.souza2@teste.com',
      };

      const mockRecebedor = {
        id,
        nomeRasaoSocial: 'Maria de Souza',
        email: updateDto.email,
        cpfCnpj: '98765432100',
        tipoChave: 'CPF',
        chave: '98765432100',
        status: 'Validado',
      };

      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(
        mockRecebedor,
      );

      const updatedRecebedor = await service.update(id, updateDto);

      expect(updatedRecebedor).toEqual(mockRecebedor);
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.recebedor.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          email: updateDto.email,
        },
      });
    });

    it('Deve lançar um erro ao tentar atualizar outros campos com status validado', async () => {
      const id = '1';
      const updateDto: UpdateRecebedorDto = {
        nome: 'Jane Doe',
        cpfCnpj: '98765432100',
        tipoChave: 'CPF',
        chave: '98765432100',
      };

      const mockRecebedor = { id: '1', status: 'Validado' };
      mockPrismaService.recebedor.findUnique.mockResolvedValueOnce(
        mockRecebedor,
      );

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        new HttpException(
          'Recebedores validados só podem alterar o email',
          HttpStatus.FORBIDDEN,
        ),
      );
      expect(mockPrismaService.recebedor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
