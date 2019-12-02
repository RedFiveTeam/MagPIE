import RFIModel, { RFIStatus } from './RFIModel';
import moment from 'moment';

function matchEnum(status: any) {
  switch (status) {
    case 'new' || 'NEW':
      return RFIStatus.PENDING;
    case RFIStatus.PENDING:
      return RFIStatus.PENDING;
    case RFIStatus.OPEN:
      return RFIStatus.OPEN;
    case RFIStatus.CLOSED:
      return RFIStatus.CLOSED;
    default:
      return RFIStatus.PENDING;
  }
}

export class RFIDeserializer {
  static deserialize(items: any): RFIModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new RFIModel(
          item.rfiId,
          item.getsUrl,
          matchEnum(item.status),
          item.customer,
          item.ltiov === 0 ? undefined : moment.unix(item.ltiov).utc(),
          item.country
        );
      });
    }
    return [];
  }
}

