/**
 * https://github.com/temideoye/barcode-validator/blob/master/src/validatebarcode.js
 * @param barCode 
 */

export const validateBarCode = (barCode: string): boolean => {
  const code = `${barCode}`;
  const digits = () => /^\d{8,13}$/g.test(code);
  const validLengths = [8, 12, 13];
  if (!digits() || !validLengths.includes(code.length)) return false;

  let checksum = 0;
  const codeList = code.split("");
  const checkDigit = parseInt(codeList.pop(), 10);
  // eslint-disable-next-line array-callback-return
  codeList.map((value, index) => {
    const digit = parseInt(value, 10);
    if (code.length % 2 === 1) checksum += index % 2 ? digit * 3 : digit;
    else checksum += index % 2 ? digit : digit * 3;
  });

  let check = checksum % 10;
  if (check !== 0) check = 10 - check;
  if (check === checkDigit) return true;
  return false;
}