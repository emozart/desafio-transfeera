export function validateCPF(cpf: string) {
  const cpfRegEx = /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/;
  return cpfRegEx.test(cpf);
}

export function validateCNPJ(cnpj: string) {
  const cnpjRegEx =
    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/;
  return cnpjRegEx.test(cnpj);
}

export function validateEmail(email: string) {
  const cnpjRegEx = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/;
  return cnpjRegEx.test(email);
}

export function validateTelefone(telefone: string) {
  const cnpjRegEx = /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/;
  return cnpjRegEx.test(telefone);
}

export function validateChaveAleatoria(chave: string) {
  const cnpjRegEx =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return cnpjRegEx.test(chave);
}
