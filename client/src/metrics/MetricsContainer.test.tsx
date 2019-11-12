import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsContainer } from './MetricsContainer';


describe('MetricsContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
        <MetricsContainer
          GETSClicks={15}
          fetchGETSClicksMetrics={() => null}
          fetchSiteVisitMetrics={() => null}
          siteVisits={10}/>
    );
  });

  it('should display site a visit count', () => {
    expect(subject.find('.dashboard-siteVisits').text()).toEqual("Site Visits: 10");
    expect(subject.find('.dashboard-GETSButtonClicks').text()).toEqual("GETS URL Clicks: 15");
  });

});
