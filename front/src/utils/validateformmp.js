export function valLet(inputs) {
  const regExpLettersOnly = /^[a-zA-ZÀ-ÿ\s]*$/gm;
  return regExpLettersOnly.test(inputs);
}

export function valN(input) {
  if (!input) return true;
  const regExpNumbersOnly = /^[0-9]{1,6}$/gm;
  return regExpNumbersOnly.test(input);
}
