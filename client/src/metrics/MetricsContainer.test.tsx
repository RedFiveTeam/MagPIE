import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsContainer } from './MetricsContainer';


describe('MetricsContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
      // @ts-ignore
      <MetricsContainer
          GetsClicks={15}
          fetchGetsClicksMetrics={() => null}
          fetchSiteVisitMetrics={() => null}
          fetchSiteVisitsGraphWeek={() => null}
          siteVisits={10}
          siteVisitsGraphWeek={[1, 2, 3, 4, 5, 6, 7]}
        />
    );
  });

  it('should display site a visit count', () => {
    expect(subject.find('.dashboard-siteVisits').text()).toEqual("Site Visits: 10");
  });

  it('should display gets clicks', () => {
    expect(subject.find('.dashboard-GETSButtonClicks').text()).toEqual("GETS URL Clicks: 15");
  });

  it('should display a site visit graph', () => {
    expect(subject.find('.dashboard-siteVisitsGraphWeek').text()).toContain("Bar")
  });

});
