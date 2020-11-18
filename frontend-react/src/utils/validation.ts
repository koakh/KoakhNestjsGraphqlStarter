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

/**
 * typescript version of
 * https://gist.github.com/eresende/88562d2c4dc85b62cb0c
 * https://codepen.io/caneco/pen/gOMZvqQ
 * @param value 
 */
export const validateFiscalNumber = (fiscalNumber: string): boolean => {
  // remove PT first
  let value = fiscalNumber.substring(2,fiscalNumber.length) + '';

  // anonymous consumer
  if (value === '999999990') return true;

  // has 9 digits?
  if (!/^[0-9]{9}$/.test(value)) return false;

  // is from a person?
  if (!/^[123]|45|5/.test(value)) return false;

  // digit check
  let tot =
    parseInt(value[0]) * 9 +
    parseInt(value[1]) * 8 +
    parseInt(value[2]) * 7 +
    parseInt(value[3]) * 6 +
    parseInt(value[4]) * 5 +
    parseInt(value[5]) * 4 +
    parseInt(value[6]) * 3 +
    parseInt(value[7]) * 2;
  let div = (tot / 11).toString();
  let mod = tot - parseInt(div) * 11;
  let tst = (mod === 1 || mod === 0 ? 0 : 11 - mod).toString();

  return value[8] === tst;
}
