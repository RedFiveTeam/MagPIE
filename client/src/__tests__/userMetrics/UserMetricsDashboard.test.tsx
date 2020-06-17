import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UserMetricsDashboard } from '../../dashboard/userMetrics/UserMetricsDashboard';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { Provider } from 'react-redux';
import { initStore } from '../../../setupTests';
import configureStore from '../../configureStore';

const initState = {
  ...initStore,
};

//@ts-ignore
const mockStore = configureStore(history, initState);

describe('UserMetricsDashboard', () => {
  let subject: ReactWrapper;
  console.log = jest.fn();

  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <UserMetricsDashboard/>
      </Provider>,
    );
  });

  it('should display the header and header buttons', () => {
    expect(subject.find('.metrics-header').exists()).toBeTruthy();
    expect(subject.find('.smallbord-container').exists()).toBeTruthy();
    expect(subject.find(StyledBackButtonVector).exists()).toBeTruthy();
  });

  it('should display the metrics container', () => {
    expect(subject.find('.metrics-container').exists()).toBeTruthy();
  });

  it('should display the date range container', () => {
    expect(subject.find('.datepickers-container').exists()).toBeTruthy();
  });

});
