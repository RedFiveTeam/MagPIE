import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Provider} from "react-redux";
import {initStore} from "../../../../setupTests";
import configureStore from "../../../configureStore";
import {StyledScoreBoardContainer} from "./ScoreBoardContainer";
import {ScoreBoardMetricModel} from "../ScoreBoardMetricModel";

const initState = {
    ...initStore,
};
//@ts-ignore
const mockStore = configureStore(history, initState);

describe('UserMetricsDashboard', () => {
    let subject: ReactWrapper;
    console.log = jest.fn();

    const ratings = [new ScoreBoardMetricModel("jacy.l.hoag", 50)]

    beforeEach(() => {
        subject = mount(
            <Provider store={mockStore}>
                <StyledScoreBoardContainer ratings={ratings} />
            </Provider>,
        );
    });

    it('should display user table', function () {
        expect(subject.find('.user-name').text()).toContain("jacy.l.hoag")
    });

});