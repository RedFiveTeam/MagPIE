import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

export class RfiSorter {
  static sort = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
    let openPending: RfiModel[] = rfis.filter(rfi => rfi.status !== RfiStatus.CLOSED);
    let closed: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.CLOSED);
      switch (sortKey.field) {
        case Field.ID:
          return (sortKey.defaultOrder ? sortAscendingId(openPending) : sortDescendingId(openPending)).concat(closed);
        case Field.CUSTOMER:
          return (sortKey.defaultOrder ? sortAscendingCustomer(openPending) : sortDescendingCustomer(openPending)).concat(closed);
        case Field.LTIOV:
          return (sortKey.defaultOrder ? sortAscendingLtiov(openPending) : sortDescendingLtiov(openPending)).concat(closed);
        case Field.COUNTRY:
          return (sortKey.defaultOrder ? sortAscendingCountry(openPending) : sortDescendingCountry(openPending)).concat(closed);
        default:
          return (sortKey.defaultOrder ? sortAscendingPriority(openPending) : sortDescendingPriority(openPending)).concat(closed);
      }
    }
    return [];
  };
}

function sortDescendingPriority(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority > b.priority ? -1 : 1
  });
}

function sortAscendingPriority(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority < b.priority ? -1 : 1
  });
}

function sortAscendingId(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.id < b.id ? -1 : 1
  });
}

function sortDescendingId(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.id > b.id ? -1 : 1
  });
}

function sortDescendingCustomer(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer > b.customer ? -1 : 1
  })
}

function sortAscendingCustomer(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer < b.customer ? -1 : 1
  })
}

function sortDescendingCountry(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.country > b.country ? -1 : 1
  });
}

function sortAscendingCountry(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.country < b.country ? -1 : 1
  });
}

function sortDescendingLtiov(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined)
      return -1;
    if (b.ltiov === undefined)
      return 1;
    return a.ltiov.valueOf() > b.ltiov.valueOf() ? -1 : 1
  });
}

function sortAscendingLtiov(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined)
      return 1;
    if (b.ltiov === undefined)
      return -1;
    return a.ltiov.valueOf() < b.ltiov.valueOf() ? -1 : 1
  });
}
