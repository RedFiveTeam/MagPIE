import RFIModel from './RFIModel';
import { Field, SortKey } from './SortKey';

export class RFISorter {

  static sortByPriority = (rfis: RFIModel[], sortKey: SortKey) => {
    if (rfis) {
      if (sortKey.field === Field.PRIORITY && sortKey.defaultOrder) {
        return sortDescendingPriority(rfis);
      }
      return sortAscendingPriority(rfis);
    }
    return [];
  };

  static sortById = (rfis: RFIModel[], sortKey: SortKey) => {
    if (rfis) {
      if (sortKey.field === Field.ID && sortKey.defaultOrder) {
        return sortDescendingId(rfis);
      }
      return sortAscendingId(rfis);
    }
    return [];
  };

  static sortByCustomer = (rfis: RFIModel[], sortKey: SortKey) => {
    if (rfis) {
      if (sortKey.field === Field.CUSTOMER && sortKey.defaultOrder) {
        return sortDescendingCustomer(rfis);
      }
      return sortAscendingCustomer(rfis);
    }
    return [];
  };

  static sortByCountry = (rfis: RFIModel[], sortKey: SortKey) => {
    if (rfis) {
      if (sortKey.field === Field.COUNTRY && sortKey.defaultOrder) {
        return sortDescendingCountry(rfis);
      }
      return sortAscendingCountry(rfis);
    }
    return [];
  };

  static sortByLtiov = (rfis: RFIModel[], sortKey: SortKey) => {
    if (rfis) {
      if (sortKey.field === Field.LTIOV && sortKey.defaultOrder) {
        return sortDescendingLtiov(rfis);
      }
      return sortAscendingLtiov(rfis);
    }
    return [];
  };
}

function sortDescendingPriority(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority > b.priority ? -1 : 1
  });
}

function sortAscendingPriority(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.priority < b.priority ? -1 : 1
  });
}

function sortAscendingId(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.id < b.id ? -1 : 1
  });
}

function sortDescendingId(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.id > b.id ? -1 : 1
  });
}

function sortDescendingCustomer(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer > b.customer ? -1 : 1
  })
}

function sortAscendingCustomer(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.customer < b.customer ? -1 : 1
  })
}

function sortDescendingCountry(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.country > b.country ? -1 : 1
  });
}

function sortAscendingCountry(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    return a.country < b.country ? -1 : 1
  });
}

function sortDescendingLtiov(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined)
      return -1;
    if (b.ltiov === undefined)
      return 1;
    return a.ltiov.valueOf() > b.ltiov.valueOf() ? -1 : 1
  });
}

function sortAscendingLtiov(rfis: RFIModel[]) {
  return rfis.sort(function (a, b) {
    if (a.ltiov === undefined)
      return 1;
    if (b.ltiov === undefined)
      return -1;
    return a.ltiov.valueOf() < b.ltiov.valueOf() ? -1 : 1
  });
}
