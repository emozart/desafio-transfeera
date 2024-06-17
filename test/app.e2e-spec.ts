import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('Recebedores (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  it('/recebedor (POST)', async () => {
    const payload = {
      nome: 'João da Silva',
      email: 'test.e2e@teste.com',
      cpfCnpj: '11122233300',
      tipoChave: 'CPF',
      chave: '11122233300',
    };
    const response = await request(app.getHttpServer())
      .post('/recebedor')
      .send(payload);

    expect(response.statusCode).toBe(201);

    const result = await prisma.recebedor.findUnique({
      where: { id: response.body.id },
    });

    expect(result.nomeRasaoSocial).toBe(payload.nome);
    expect(result.email).toBe(payload.email);
    expect(result.cpfCnpj).toBe(payload.cpfCnpj);
    expect(result.tipoChave).toBe(payload.tipoChave);
    expect(result.chave).toBe(payload.chave);
  });

  it('/recebedor/list (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/recebedor/list')
      .send({
        pagina: 1,
        itens: 5,
      });

    expect(response.statusCode).toBe(201);
  });

  it('/recebedor (GET)', async () => {
    const id = 'c005782d-282c-4427-810a-3a7719734d94';
    const response = await request(app.getHttpServer()).get(`/recebedor/${id}`);

    expect(response.statusCode).toBe(200);
  });

  it('/recebedor (PATCH) - id inválido', async () => {
    const id = 'id_invalido';
    const response = await request(app.getHttpServer())
      .patch(`/recebedor/${id}`)
      .send({
        nome: 'João de Souza',
        email: 'test.e2e.alterado@teste.com.XXX',
        cpfCnpj: '44455566699',
        tipoChave: 'CPF',
        chave: '44455566699',
      });

    expect(response.statusCode).toBe(404);
  });

  it('/recebedor (PATCH) - id válido', async () => {
    const id = 'c005782d-282c-4427-810a-3a7719734d94';
    const response = await request(app.getHttpServer())
      .patch(`/recebedor/${id}`)
      .send({
        nome: 'João de Souza',
        email: 'test.e2e.alterado@teste.com.br',
        cpfCnpj: '44455566699',
        tipoChave: 'CPF',
        chave: '44455566699',
      });

    expect(response.statusCode).toBe(200);
  });

  it('/recebedor (PATCH) - Status Validado', async () => {
    const id = '4249d450-4524-4c4e-96a5-3331b49f4757';
    const response = await request(app.getHttpServer())
      .patch(`/recebedor/${id}`)
      .send({
        nome: 'João dos Santos',
        email: 'test.e2e.alterado@teste.com.br',
        cpfCnpj: '77788899900',
        tipoChave: 'CPF',
        chave: '77788899900',
      });

    expect(response.statusCode).toBe(403);
  });

  it('/recebedor (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/recebedor')
      .send({
        ids: [
          '1974523d-4783-452b-a42d-7b465977a380',
          '77818b4a-4942-4258-b977-264123225247',
          '14137392-5482-421c-8678-198821780188',
        ],
      });

    expect(response.statusCode).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
