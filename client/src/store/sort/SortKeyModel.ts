export enum Field {
  PRIORITY = 'PRIORITY',
  LTIOV = 'LTIOV',
  RFINUM = 'RFINUM',
  CUSTOMER = 'CUSTOMER',
  COUNTRY = 'COUNTRY',
  TGTS = 'TGTS',
  IXNS = 'IXNS',
}

export class SortKeyModel {
  constructor(public field: Field, public defaultOrder: boolean) {
  }
}
