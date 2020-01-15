import RfiModel from '../../workflow/rfi-page/models/RfiModel';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

export class RfiSorter {
  static sort = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      switch (sortKey.field) {
        case Field.ID:
          return (sortKey.defaultOrder ? sortAscendingId(rfis) : sortDescendingId(rfis));
        case Field.CUSTOMER:
          return (sortKey.defaultOrder ? sortAscendingCustomer(rfis) : sortDescendingCustomer(rfis));
        case Field.LTIOV:
          return (sortKey.defaultOrder ? sortAscendingLtiov(rfis) : sortDescendingLtiov(rfis));
        case Field.COUNTRY:
          return (sortKey.defaultOrder ? sortAscendingCountry(rfis) : sortDescendingCountry(rfis));
        default:
        return (sortKey.defaultOrder ? sortAscendingPriority(rfis) : sortDescendingPriority(rfis));
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
