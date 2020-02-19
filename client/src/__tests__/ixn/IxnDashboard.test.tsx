import '../../setupEnzyme';
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { IxnDashboard } from '../../dashboard/ixn/IxnDashboard';
import { StyledIxnDashboardHeader } from '../../dashboard/ixn/IxnDashboardHeader';
import { StyledIxnTable } from '../../dashboard/ixn/table/IxnTable';
import { TargetModel } from '../../store/tgt/TargetModel';
import configureStore from '../../configureStore';
import { initStore } from '../../setupEnzyme';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { Provider } from 'react-redux';
import { StyledTableHeader } from '../../dashboard/components/header/TableHeader';
import { StyledIxnRow } from '../../dashboard/ixn/table/IxnRow';

let target = new TargetModel(1, 1, 1, 'SDT20-123', '00ABC1234567890', 'These are some EEI Notes to be displayed.', '');

const initState = {
  ...initStore,
  ixnState: {
    viewIxnPage: true,
    target: target,
    dateString: '11/11/2011',
    segments: [] as SegmentModel[],
    ixns: []
  }
};

//@ts-ignore
const mockStore = configureStore(history, initState);

describe("Interactions Dashboard", () => {
  let subject: ReactWrapper;
  const moment = require('moment');


  beforeEach(() => {
    subject = mount(
      <Provider store={mockStore}>
        <IxnDashboard />
      </Provider>
    );
  });

  it('should display the header', () => {
    expect(subject.find(StyledIxnDashboardHeader).exists()).toBeTruthy();
  });

  it('should display an add segment button', () => {
    expect(subject.find('.add-segment-button').exists()).toBeTruthy();
  });

  it('should toggle displaying the add segment placeholder on add segment button press', () => {
    expect(subject.find('.segment-divider-placeholder').exists()).toBeFalsy();
    subject.find('.add-segment-button').at(0).simulate('click');
    expect(subject.find('.segment-divider-placeholder').exists()).toBeTruthy();
  });

  it('should display the interactions table', () => {
    expect(subject.find(StyledIxnTable).exists()).toBeTruthy();
  });

  it('should display the table header when it has segments', () => {
    expect(subject.find(StyledTableHeader).exists()).toBeFalsy();

    const newInitState = {
      ...initStore,
      ixnState: {
        viewIxnPage: true,
        target: target,
        dateString: '11/11/2011',
        segments: [new SegmentModel(1, 1, 1, 1, moment(0), moment(1))],
        ixns: []
      }
    };

    //@ts-ignore
    const newMockStore = configureStore(history, newInitState);

    subject = mount(
      <Provider store={newMockStore}>
        <IxnDashboard />
      </Provider>
    );

    expect(subject.find(StyledTableHeader).exists()).toBeTruthy();
    expect(subject.find(StyledTableHeader).text()).toContain("Exploit Analyst");
    expect(subject.find(StyledTableHeader).text()).toContain("Time");
    expect(subject.find(StyledTableHeader).text()).toContain("Activity");
    expect(subject.find(StyledTableHeader).text()).toContain("Track ID");
  });

  it('should display interactions within the interactions table', () => {
    const newInitState = {
      ...initStore,
      ixnState: {
        viewIxnPage: true,
        target: target,
        dateString: '11/11/2011',
        segments: [new SegmentModel(1, 1, 1, 1, moment(0), moment(1))],
        ixns: []
      }
    };

    //@ts-ignore
    const newMockStore = configureStore(history, newInitState);

    subject = mount(
      <Provider store={newMockStore}>
        <IxnDashboard />
      </Provider>
    );

    expect(subject.find(StyledIxnRow).exists()).toBeTruthy();
  });
});
