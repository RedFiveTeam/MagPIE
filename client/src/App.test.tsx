import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { shallow, ShallowWrapper } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display the happy sock image', () => {
    expect(subject.find('.App-logo').exists()).toBeTruthy();
  });
});
