import { SegmentModel } from '../tgtSegment/SegmentModel';

const moment = require('moment');

export class SegmentDeserializer {
  static deserialize(items: any): SegmentModel[] {
    if (items.map) {
      return items.map((item: any) => {
        return new SegmentModel(item.id, item.rfiId, item.exploitDateId, item.targetId,
          moment(item.startTime, moment.ISO_8601).utc(),
          moment(item.endTime, moment.ISO_8601).utc());
      });
    }
    return [] as SegmentModel[];
  }
}