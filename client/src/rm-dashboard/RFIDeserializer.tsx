import RFIModel from './RFIModel';

export class RFIDeserializer {
  deserialize(items: any): RFIModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new RFIModel(
          item.rfiId,
          item.getsUrl,
          item.status,
          item.lastUpdate,
          item.unit,
          item.ltiov
        );
      });
    }
    return [];
  }
}

