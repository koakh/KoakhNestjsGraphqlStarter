export interface Tag {
  title: string;
  value: string;
}

export interface ElapsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

export interface SelectionOptions {
  title: string,
  value: any;
}

export interface GoodsOptions {
  key?: number,
  title: string;
  value: GoodsOptionsValue[];
}

export interface GoodsOptionsValue {
  code: string;
  barCode: string;
  name: string;
  description: string;
  quantity: number;
}

export interface GoodsBagItem {
  barCode: string,
  quantity: number
}