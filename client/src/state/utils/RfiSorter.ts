import RfiModel from '../../workflow/rfi-page/models/RfiModel';
import { Field, SortKeyModel } from '../../workflow/rfi-page/models/SortKeyModel';

export class RfiSorter {

  static sortByPriority = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      if (sortKey.field === Field.PRIORITY && sortKey.defaultOrder) {
        return sortDescendingPriority(rfis);
      }
      return sortAscendingPriority(rfis);
    }
    return [];
  };

  static sortById = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      if (sortKey.field === Field.ID && sortKey.defaultOrder) {
        return sortDescendingId(rfis);
      }
      return sortAscendingId(rfis);
    }
    return [];
  };

  static sortByCustomer = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      if (sortKey.field === Field.CUSTOMER && sortKey.defaultOrder) {
        return sortDescendingCustomer(rfis);
      }
      return sortAscendingCustomer(rfis);
    }
    return [];
  };

  static sortByCountry = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      if (sortKey.field === Field.COUNTRY && sortKey.defaultOrder) {
        return sortDescendingCountry(rfis);
      }
      return sortAscendingCountry(rfis);
    }
    return [];
  };

  static sortByLtiov = (rfis: RfiModel[], sortKey: SortKeyModel) => {
    if (rfis) {
      if (sortKey.field === Field.LTIOV && sortKey.defaultOrder) {
        return sortDescendingLtiov(rfis);
      }
      return sortAscendingLtiov(rfis);
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
