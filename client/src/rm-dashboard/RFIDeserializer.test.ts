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
        lastUpdate: '123',
        customer: 'customer',
        ltiov: 1575158400,
        country: 'country'
      },
      {
        rfiId: 'id',
        getsUrl: 'getsUrl',
        status: 'OPEN',
        lastUpdate: '123',
        customer: 'customer',
        ltiov: 0,
        country: 'country'
      }];

    let rfis = RFIDeserializer.deserialize(json);
    let actual = rfis[0];
    console.log(actual.ltiov);
    console.log(moment('2019-12-01').utc());
    expect(actual.ltiov!.isSame(moment('2019-12-01').utc(), 'second')).toBeTruthy();
    expect(actual.id).toBe('id');
    expect(actual.getsUrl).toBe('getsUrl');
    expect(actual.status).toBe(RFIStatus.PENDING);
    expect(actual.customer).toBe('customer');
    expect(actual.country).toBe('country');

    expect(rfis[1].ltiov).toBe(undefined);
  });
});
