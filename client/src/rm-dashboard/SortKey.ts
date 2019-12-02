export enum Field {
  LTIOV,
  ID,
  CUSTOMER,
  COUNTRY
}

export class SortKey{
  constructor(public field: Field, public defaultOrder: boolean) {
  }
}
