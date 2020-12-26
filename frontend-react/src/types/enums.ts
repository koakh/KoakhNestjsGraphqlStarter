export enum ModelType {
  asset = 'Asset',
  cause = 'Cause',
  person = 'Person',
  participant = 'Participant',
  transaction = 'Transaction',
}

export enum EntityType {
  participant = 'com.chain.solidary.model.participant',
  person = 'com.chain.solidary.model.person',
  cause = 'com.chain.solidary.model.cause'
}

export enum AssetType {
  physicalAsset = 'PHYSICAL_ASSET',
  digitalAsset = 'DIGITAL_ASSET',
  physicalVoucher = 'PHYSICAL_VOUCHER',
  digitalVoucher = 'DIGITAL_VOUCHER',
}

export enum TransactionType {
  transferFunds = 'TRANSFER_FUNDS',
  transferVolunteeringHours = 'TRANSFER_VOLUNTEERING_HOURS',
  transferGoods = 'TRANSFER_GOODS',
  transferAsset = 'TRANSFER_ASSET',
}

export enum ResourceType {
  funds = 'FUNDS',
  volunteeringHours = 'VOLUNTEERING_HOURS',
  genericGoods = 'GENERIC_GOODS',
  physicalAsset = 'PHYSICAL_ASSET',
  digitalAsset = 'DIGITAL_ASSET',
  physicalVoucher = 'PHYSICAL_VOUCHER',
  digitalVoucher = 'DIGITAL_VOUCHER',
}

export enum CurrencyCode {
  eur = 'EUR',
  usd = 'USD',
}
