export enum AssetType {
  physicalAsset = 'PHYSICAL_ASSET',
  digitalAsset = 'DIGITAL_ASSET',
}

export enum TransactionType {
  TransferFunds = 'TRANSFER_FUNDS',
  TransferVolunteeringHours = 'TRANSFER_VOLUNTEERING_HOURS',
  TransferGoods = 'TRANSFER_GOODS',
  TransferAsset = 'TRANSFER_ASSET',
}

export enum ResourceType {
  Funds = 'FUNDS',
  VolunteeringHours = 'VOLUNTEERING_HOURS',
  GenericGoods = 'GENERIC_GOODS',
  PhysicalAsset = 'PHYSICAL_ASSET',
  DigitalAsset = 'DIGITAL_ASSET',
}

export enum CurrencyCode {
  eur = 'EUR',
  usd = 'USD',
}