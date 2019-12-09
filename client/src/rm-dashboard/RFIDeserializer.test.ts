import moment from 'moment';
import { RFIDeserializer } from './RFIDeserializer';
import { RFIStatus } from './RFIModel';

describe('RFIDeserializer', () => {
  it('should turn backend response into RFIModel', () => {
    let json = [
      {
        rfiId: 'id',
        getsUrl: 'getsUrl',
        status: 'NEW',
        lastUpdate: '2020-11-10T14:21:21.000+0000',
        customer: 'customer',
        ltiov: '2020-11-20T00:00:00.000+0000',
        country: 'country'
      },
      {
        rfiId: 'id',
        getsUrl: 'getsUrl',
        status: 'OPEN',
        lastUpdate: '2020-11-10T14:21:21.000+0000',
        customer: 'customer',
        ltiov: null,
        country: 'country'
      }];

    let rfis = RFIDeserializer.deserialize(json);
    let actual = rfis[0];
    expect(actual.ltiov!.isSame(moment.utc('2020-11-20'), 'second')).toBeTruthy();
    expect(actual.id).toBe('id');
    expect(actual.getsUrl).toBe('getsUrl');
    expect(actual.status).toBe(RFIStatus.PENDING);
    expect(actual.customer).toBe('customer');
    expect(actual.country).toBe('country');

    expect(rfis[1].ltiov).toBe(undefined);
  });
});
