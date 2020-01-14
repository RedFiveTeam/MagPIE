import RfiModel, { RfiStatus } from '../../workflow/rfi-page/models/RfiModel';
import moment from 'moment';

function matchEnum(status: any) {
  switch (status) {
    case 'new' || 'NEW':
      return RfiStatus.PENDING;
    case RfiStatus.PENDING:
      return RfiStatus.PENDING;
    case RfiStatus.OPEN:
      return RfiStatus.OPEN;
    case RfiStatus.CLOSED:
      return RfiStatus.CLOSED;
    default:
      return RfiStatus.PENDING;
  }
}

export class RfiDeserializer {
  static deserialize(items: any): RfiModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new RfiModel(
          item.rfiId,
          item.getsUrl,
          matchEnum(item.status),
          item.customer,
          item.ltiov === null ? undefined : moment(item.ltiov, moment.ISO_8601).utc(),
          item.country,
          item.description,
          item.priority);
      });
    }
    return [];
  }
}

