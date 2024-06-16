import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { validateCNPJ, validateCPF } from '../helpers/validationFunctions';

@ValidatorConstraint({ name: 'IsCpfCnpjValid' })
export class CpfCnpjValidatorConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string) {
    return validateCPF(value) ? true : validateCNPJ(value) ? true : false;
  }

  defaultMessage?() {
    return 'Formato inválido. Formatos válidos: CPF xxx.xxx.xxx-xx | CNPJ xx.xxx.xxx/xxxx-xx';
  }
}

export function IsCpfCnpjValid(args?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCpfCnpjValid',
      target: object.constructor,
      propertyName: propertyName,
      options: args,
      constraints: [],
      validator: CpfCnpjValidatorConstraint,
    });
  };
}
