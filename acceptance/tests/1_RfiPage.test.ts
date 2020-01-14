/// <reference path="../steps.d.ts" />

Feature('RFI Page');

Scenario ('Should see the loading screen and RFI page', (I) => {
    I.amOnPage('/');
    I.see("LOADING");
    I.waitForText('RFI', 10);
    I.waitForText('20-321', 10);
    I.waitForText('633d', 10);
    I.waitForText('USA', 10);
    I.waitForText('4 FEB 20', 10);
    I.waitForText('hi', 10);
    I.dontSee("LOADING");
});

Scenario ('Should be able to sort by clickin\' Buttons', (I) => {
  I.amOnPage('/');
  I.waitForText('20-321', 10);

  I.see('-', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--ltiov');
  I.see('4 FEB 20', locate('.region--pending').find('.rfi-row').at(1));

  I.click('.header-cell--country');
  I.see('CAN', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--country');
  I.see('USA', locate('.region--pending').find('.rfi-row').at(1));

  I.click('.header-cell--customer');
  I.see('1 FW', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--customer');
  I.see('HQ ACC', locate('.region--pending').find('.rfi-row').at(1));
});

Scenario ('Should expand and collapse descriptions', (I) => {
  I.amOnPage('/');
  I.waitForText('See more', 10);
  I.see('See more', locate('.region--open').find('.rfi-row').at(1));
  I.dontSee('See less');

  I.click('.see-more');
  I.waitForText('See less', 10);
  I.dontSee('See more', locate('.region--open').find('.rfi-row').at(1));

  I.click('.see-less');
  I.waitForText('See more', 10);
  I.dontSee('See less');
});
