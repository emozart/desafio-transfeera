import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CreateRecebedorDto } from '../dto/create-recebedor.dto';
import {
  validateCNPJ,
  validateCPF,
  validateChaveAleatoria,
  validateEmail,
  validateTelefone,
} from '../helpers/validationFunctions';

@ValidatorConstraint()
class ChaveValidatorConstraint implements ValidatorConstraintInterface {
  validate(value: string, args?: ValidationArguments) {
    console.log('args: ', args.object);

    const dto = args.object as CreateRecebedorDto;
    const tipoChave = dto.tipoChave;

    switch (tipoChave) {
      case 'CPF':
        return validateCPF(value);
      case 'CNPJ':
        return validateCNPJ(value);
      case 'EMAIL':
        return validateEmail(value);
      case 'TELEFONE':
        return validateTelefone(value);
      case 'CHAVE_ALEATORIA':
        return validateChaveAleatoria(value);
      default:
        return false;
    }
  }

  defaultMessage?(args: ValidationArguments) {
    const dto = args.object as CreateRecebedorDto;
    const tipoChave = dto.tipoChave;

    return `A chave não corresponde ao tipo selecionado: ${tipoChave}`;
  }
}

export function IsChaveValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isChaveValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ChaveValidatorConstraint,
    });
  };
}
