import RfiModel, { RfiStatus } from './RfiModel';
import { Field, SortKeyModel } from '../sort/SortKeyModel';

export class RfiSorter {
  static sort = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      let open: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.OPEN);
      let pending: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.PENDING);
      let closed: RfiModel[] = rfis.filter(rfi => rfi.status === RfiStatus.CLOSED);
      switch (sortKey.field) {
        case Field.RFINUM:
          return (
            (sortKey.defaultOrder ?
                sortAscendingNum(open).concat(sortAscendingNum(pending))
                :
                sortDescendingNum(open).concat(sortDescendingNum(pending))
            ).concat(closed)
          );
        case Field.CUSTOMER:
          return (
            (sortKey.defaultOrder ?
                sortAscendingCustomer(open).concat(sortAscendingCustomer(pending))
                :
                sortDescendingCustomer(open).concat(sortDescendingCustomer(pending))
            ).concat(closed)
          );
        case Field.LTIOV:
          return (
            (sortKey.defaultOrder ?
                sortAscendingLtiov(open).concat(sortAscendingLtiov(pending))
                :
                sortDescendingLtiov(open).concat(sortDescendingLtiov(pending))
            ).concat(closed)
          );
        case Field.COUNTRY:
          return (
            (sortKey.defaultOrder ?
                sortAscendingCountry(open).concat(sortAscendingCountry(pending))
                :
                sortDescendingCountry(open).concat(sortDescendingCountry(pending))
            ).concat(closed)
          );
        default:
          return (
            (sortKey.defaultOrder ?
                sortAscendingPriority(open).concat(sortAscendingPriority(pending))
                :
                sortDescendingPriority(open).concat(sortDescendingPriority(pending))
            ).concat(closed)
          );
      }
    }
    return [];
  };
}

function sortDescendingPriority(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority > b.priority ? -1 : 1;
  });
}

function sortAscendingPriority(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority < b.priority ? -1 : 1;
  });
}

function sortAscendingNum(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.rfiNum < b.rfiNum ? -1 : 1;
  });
}

function sortDescendingNum(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.rfiNum > b.rfiNum ? -1 : 1;
  });
}

function sortDescendingCustomer(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer > b.customer ? -1 : 1;
  });
}

function sortAscendingCustomer(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer < b.customer ? -1 : 1;
  });
}

function sortDescendingCountry(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.country > b.country ? -1 : 1;
  });
}

function sortAscendingCountry(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    return a.country < b.country ? -1 : 1;
  });
}

function sortDescendingLtiov(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined) {
      return -1;
    }
    if (b.ltiov === undefined) {
      return 1;
    }
    return a.ltiov.valueOf() > b.ltiov.valueOf() ? -1 : 1;
  });
}

function sortAscendingLtiov(rfis: RfiModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined) {
      return 1;
    }
    if (b.ltiov === undefined) {
      return -1;
    }
    return a.ltiov.valueOf() < b.ltiov.valueOf() ? -1 : 1;
  });
}
