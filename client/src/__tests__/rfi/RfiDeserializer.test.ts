import * as moment from 'moment';
import { RfiDeserializer } from '../../store/rfi/RfiDeserializer';
import { RfiStatus } from '../../store/rfi/RfiModel';

describe('RFIDeserializer', () => {
  it('should turn backend response into RfiModel', () => {
    let json = [
      {
        rfiNum: 'id',
        getsUrl: 'getsUrl',
        status: 'NEW',
        lastUpdate: '2020-11-10T14:21:21.000+0000',
        customer: 'customer',
        ltiov: '2020-11-20T00:00:00.000+0000',
        country: 'country',
        priority: -1
      },
      {
        rfiNum: 'id',
        getsUrl: 'getsUrl',
        status: 'OPEN',
        lastUpdate: '2020-11-10T14:21:21.000+0000',
        customer: 'customer',
        ltiov: null,
        country: 'country',
        priority: 7
      }];

    let rfis = RfiDeserializer.deserialize(json);
    expect(rfis[0].ltiov!.isSame(moment.utc('2020-11-20'), 'second')).toBeTruthy();
    expect(rfis[0].rfiNum).toBe('id');
    expect(rfis[0].getsUrl).toBe('getsUrl');
    expect(rfis[0].status).toBe(RfiStatus.PENDING);
    expect(rfis[0].customer).toBe('customer');
    expect(rfis[0].country).toBe('country');
    expect(rfis[0].priority).toBe(-1);

    expect(rfis[1].ltiov).toBe(undefined);
    expect(rfis[1].priority).toBe(7);
  });
});
