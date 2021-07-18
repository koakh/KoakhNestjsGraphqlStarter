import { v4 as uuidv4 } from 'uuid';

export const newUuid = () => {
  return uuidv4();
}

export const paginateArray = (data: any, skip: number, take: number) => {
  for (let i = 0; i <= 4; i++) {
    data.push(data.slice(i * 2, i * 2 + 2));
  }
};
