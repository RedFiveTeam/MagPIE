export enum Field {
  LTIOV = 'LTIOV',
  ID = 'ID',
  CUSTOMER = 'CUSTOMER',
  COUNTRY = 'COUNTRY'
}

export class SortKey{
  constructor(public field: Field, public defaultOrder: boolean) {
  }
}
