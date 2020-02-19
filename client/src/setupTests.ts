import { configure } from 'enzyme';
// @ts-ignore
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { ApplicationState } from './store';
import { rfiInitState } from './store/rfi';
import { tgtInitState } from './store/tgt';
import { ixnInitState } from './store/ixn/Reducer';
import { metricsInitState } from './store/metrics';
import { RouterState } from 'connected-react-router';


configure({adapter: new EnzymeAdapter()});

const initRouter: RouterState =
  {
    location: {
      pathname: 'Pathname',
      search: 'Search',
      state: 'S',
      hash: 'Hash',
    },
    action: 'PUSH'
  };

export const initStore: ApplicationState = {
  rfiState: rfiInitState,
  tgtState: tgtInitState,
  ixnState: ixnInitState,
  metricState: metricsInitState,
  router: initRouter,
};
