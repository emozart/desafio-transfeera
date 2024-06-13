import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  try {
    const uuids = [
      '4249d450-4524-4c4e-96a5-3331b49f4757',
      'c005782d-282c-4427-810a-3a7719734d94',
      '8b607544-796b-430f-8a7c-6a5647061e1b',
      '839c2e3b-49b2-477d-933f-b45e7e49470b',
      '8753448b-8a37-49a2-92b5-896362605766',
      '07187738-8984-498c-a2b0-eb087408383c',
      '606425a8-314b-475f-894a-751157271453',
      '66a5b978-86c3-4529-8520-780180190899',
      '49708614-213d-478a-8861-29c32672478e',
      '6631e3b9-560a-4868-a271-303d94d8889f',
      '128c0896-3767-4627-840e-76634080283e',
      '4698d921-93c3-4494-9374-1b47b3844684',
      '5542590f-4c5d-4e25-a46e-78873418272d',
      '749944e7-5e10-4481-a83a-474a44393d61',
      '37452739-6f1b-443c-b192-46786131924a',
      '78e2513d-2674-404c-9294-e0b10278b994',
      '804c7862-1848-4527-b119-55672e173395',
      '31d51051-46e3-4451-8c22-7c578714a68a',
      '77d71d16-2650-4522-897c-4f9283362823',
      '59644385-302a-4b11-8461-9068860b8143',
      '670a1c32-2956-4454-a397-28908934e97a',
      'e9494b26-c489-43a6-b817-28337034b335',
      '3817320e-0149-404f-8500-72995058c20c',
      '97755875-43a4-440f-9991-258e7462254b',
      '23c07e17-730c-4429-8e7c-24418982d37e',
      '49708614-213d-478a-8861-29c32672478e',
      '128c0896-3767-4627-840e-76634080283e',
      '4698d921-93c3-4494-9374-1b47b3844684',
      '5542590f-4c5d-4e25-a46e-78873418272d',
      '749944e7-5e10-4481-a83a-474a44393d61',
      '37452739-6f1b-443c-b192-46786131924a',
      '78e2513d-2674-404c-9294-e0b10278b994',
      '804c7862-1848-4527-b119-55672e173395',
      '31d51051-46e3-4451-8c22-7c578714a68a',
      '77d71d16-2650-4522-897c-4f9283362823',
      '59644385-302a-4b11-8461-9068860b8143',
      '670a1c32-2956-4454-a397-28908934e97a',
      'e9494b26-c489-43a6-b817-28337034b335',
      '3817320e-0149-404f-8500-72995058c20c',
      '97755875-43a4-440f-9991-258e7462254b',
      '63229291-7643-419b-8840-8d8e6561a86f',
      '0841a619-4908-42e5-8211-5d95d958144f',
      '79659162-733e-4178-a203-863632328e04',
      '1997a630-3992-4473-a24c-e7d77e2f022a',
      '07c08e08-58e6-4234-b35b-e53097311842',
      '1974523d-4783-452b-a42d-7b465977a380',
      '77818b4a-4942-4258-b977-264123225247',
      '14137392-5482-421c-8678-198821780188',
    ];

    for (const [index, uuid] of uuids.entries()) {
      let elemento;
      // Gera dados aleatórios
      if (index % 4 === 0) {
        elemento = generateCompany(uuid);
      } else {
        elemento = generatePerson(uuid);
      }

      // Cria o elemento JSON
      await prisma.recebedor.upsert({
        where: { id: elemento.id },
        update: {},
        create: elemento,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
}

seed();

function generatePerson(id: string) {
  const primeiroNome = faker.person.firstName();
  const ultimoNome = faker.person.lastName();
  const nomeRasaoSocial = `${primeiroNome} ${ultimoNome}`;
  const email = faker.internet.email({
    firstName: primeiroNome.toLowerCase(),
    lastName: ultimoNome.toLowerCase(),
  });
  const cpfCnpj = generateCPF();
  const tipoChave = faker.helpers.arrayElement(['CPF', 'EMAIL', 'TELEFONE']);
  const chave: string = {
    CPF: cpfCnpj,
    EMAIL: email,
    TELEFONE: generatePhoneNumber(),
  }[tipoChave];
  const status = faker.helpers.arrayElement(['Validado', 'Rascunho']);

  return {
    id,
    nomeRasaoSocial,
    cpfCnpj,
    email,
    tipoChave,
    chave,
    status,
  };
}

function generateCompany(id: string) {
  const company = faker.company.buzzNoun();
  const nomeRasaoSocial = `${company[0].toUpperCase() + company.substring(1)} ${faker.helpers.arrayElement(['S.A.', 'Ltda.'])}`;
  const email = faker.internet.email({
    firstName: 'contato',
    lastName: '',
    provider: `${company.toLowerCase().replace(' ', '')}.com.br`,
  });
  const cpfCnpj = generateCNPJ();
  const tipoChave = faker.helpers.arrayElement([
    'CNPJ',
    'EMAIL',
    'CHAVE_ALEATORIA',
  ]);
  const chave: string = {
    CNPJ: cpfCnpj,
    EMAIL: faker.internet.email({
      firstName: 'pix',
      lastName: '',
      provider: `${company.toLowerCase()}.com.br`,
    }),
    CHAVE_ALEATORIA: generateRandomKey(),
  }[tipoChave];
  const status = faker.helpers.arrayElement(['Validado', 'Rascunho']);

  return {
    id,
    nomeRasaoSocial,
    cpfCnpj,
    email,
    tipoChave,
    chave,
    status,
  };
}

function generateCPF() {
  return `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`;
}

function generateCNPJ() {
  return `${faker.string.numeric(3)}.${faker.string.numeric(3)}.${faker.string.numeric(3)}/000${faker.string.numeric(1)}-${faker.string.numeric(2)}`;
}

function generatePhoneNumber() {
  return `+55 (${faker.string.numeric(2)}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`;
}

function generateRandomKey() {
  return `${faker.string.alphanumeric(8)}-${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(12)}`;
}
