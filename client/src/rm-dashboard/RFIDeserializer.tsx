import RFIModel from './RFIModel';

export class RFIDeserializer {
  deserialize(items: any): RFIModel[] {
    if (items) {
      return items.map((item: any) => {
        return new RFIModel(
          item.rfiId,
          item.getsUrl
        );
      });
    }
    return [];
  }
}

