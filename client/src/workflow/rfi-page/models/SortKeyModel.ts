export enum Field {
  PRIORITY = 'PRIORITY',
  LTIOV = 'LTIOV',
  ID = 'ID',
  CUSTOMER = 'CUSTOMER',
  COUNTRY = 'COUNTRY'
}

export class SortKeyModel{
  constructor(public field: Field, public defaultOrder: boolean) {
  }
}
