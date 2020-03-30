/// <reference path="../steps.d.ts" />

Feature('RFI Page');

Before((I)=> {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
});

Scenario ('Should see the RFI page with clickable GETS buttons', (I) => {
    I.waitForText('RFI', 10);
    I.waitForText('20-321', 10);
    I.waitForText('633d', 10);
    I.waitForText('USA', 10);
    I.waitForText('4 FEB 20', 10);
    I.waitForText('hi', 10);
    I.click('.section--right');
    I.wait(1);
});

Scenario ('Should be able to sort by clickin\' Buttons', (I) => {
  I.waitForText('20-321', 10);

  I.see('-', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--ltiov');
  I.see('4 FEB 20', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--country');
  I.see('CAN', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--country');
  I.see('USA', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--customer');
  I.see('1 FW', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--customer');
  I.see('HQ ACC', locate('.region--new').find('.rfi-row').at(1));
});

Scenario ('Should expand and collapse descriptions', (I) => {
  I.waitForText('RFI', 10);
  // @ts-ignore
  I.seeElement('.see-more', locate('.region--prioritized').find('.rfi-row').at(1));
  I.dontSee('See less');

  I.click('.see-more');
  I.dontSeeElement(locate('.region--prioritized').find('.rfi-row').at(1).find('.see-more'));

  I.click('.see-less');
  I.wait(1);
  I.dontSee('See less');
});
