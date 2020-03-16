import { TgtDashboard } from '../../dashboard/tgt/TgtDashboard';
import '../../setupEnzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';
import { StyledTgtDateDivider } from '../../dashboard/tgt/table/TgtDateDivider';
import { initStore } from '../../setupTests';

const initState = {
  ...initStore
};

//@ts-ignore
const mockStore = configureStore(history, initState);

describe('TgtDashboardContainer', () => {
  let subject: ReactWrapper;
  const moment = require('moment');
  let rfiTest: RfiModel;
  let exitSpy: jest.Mock;
  let setPlaceholderSpy: jest.Mock;

  beforeEach(() => {
    exitSpy = jest.fn();
    setPlaceholderSpy = jest.fn();
    rfiTest = new RfiModel(1, 'DGS-SPC-2035-02335', 'www.spacejam.com', RfiStatus.OPEN, 'space forse', moment('2019-11-20').utc(), 'USLT', 'Good morning starshine, the earth says hello', 42, 0, 0);
    subject = mount(
      <Provider store={mockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <TgtDashboard
            rfi={rfiTest}
            exitTgtPage={exitSpy}
            exploitDates={[]}
            setDatePlaceholder={setPlaceholderSpy}
            showDatePlaceholder={false}
            targets={[]}
          />
        </SnackbarProvider>
      </Provider>,
    );
  });

  it('should display the rfi description', () => {
    expect(subject.find('.tgt-dash--rfi-description-container').text()).toContain('Good morning starshine, the earth says hello');
  });

  it('should display an add date button', () => {
    expect(subject.find('.add-date-button').exists()).toBeTruthy();
  });

  it('should display the date dividers or not properly', () => {
    expect(subject.find(StyledTgtDateDivider).exists()).toBeFalsy();

    let dates: ExploitDateModel[] = [
      new ExploitDateModel(2, 1, moment('2019-11-20').utc()),
      new ExploitDateModel(3, 1, moment('2019-11-21').utc()),
      new ExploitDateModel(4, 1, moment('2019-11-21').utc()),
    ];

    subject = mount(
      <Provider store={mockStore}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={15000}
          hideIconVariant
        >
          <TgtDashboard
            rfi={rfiTest}
            exitTgtPage={exitSpy}
            exploitDates={dates}
            setDatePlaceholder={setPlaceholderSpy}
            showDatePlaceholder={false}
            targets={[]}
          />
        </SnackbarProvider>
      </Provider>,
    );

    expect(subject.find(StyledTgtDateDivider).length).toBe(3);
  });

  it('should display a date placeholder when the add date button is clicked', () => {
    expect(subject.find('.date-divider--placeholder').exists()).toBeFalsy();
    subject.find('.add-date-button').at(0).simulate('click');
    expect(subject.find('.date-divider--placeholder').exists()).toBeTruthy();
  });
});
