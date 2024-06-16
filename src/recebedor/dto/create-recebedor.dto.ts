import { IsEmail, IsString, Matches } from 'class-validator';
import { IsCpfCnpjValid } from '../validators/cpf-cnpj-validator';
import { IsChaveValid } from '../validators/chave-aleatoria-validator';

export class CreateRecebedorDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsCpfCnpjValid()
  cpfCnpj: string;

  @Matches(/^(CPF|CNPJ|EMAIL|TELEFONE|CHAVE_ALEATORIA)$/, {
    message:
      'O tipo da chave deve ser uma das opções: CPF, CNPJ, EMAIL, TELEFONE, CHAVE_ALEATORIA',
  })
  tipoChave: string;

  @IsChaveValid()
  chave: string;
}
