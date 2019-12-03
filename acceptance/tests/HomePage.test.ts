/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario ('should see a home page', (I) => {
    I.amOnPage('/');
    I.waitForText('RFI', 10);
    I.waitForText('20-321', 10);
    I.waitForText('633d', 10);
    I.waitForText('USA', 10);
    I.waitForText('4 FEB 20', 10);
    I.waitForText('hi', 10);
});

Scenario ('should be able to sort by clickin\' BUTTons', (I) => {
  I.amOnPage('/');
  I.waitForText('20-321', 10);

  I.see('4 FEB 20', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--ltiov');
  I.see('-', locate('.region--pending').find('.rfi-row').at(1));

  I.click('.header-cell--country');
  I.see('CAN', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--country');
  I.see('USA', locate('.region--pending').find('.rfi-row').at(1));

  I.click('.header-cell--customer');
  I.see('1 FW', locate('.region--pending').find('.rfi-row').at(1));
  I.click('.header-cell--customer');
  I.see('HQ ACC', locate('.region--pending').find('.rfi-row').at(1));
});

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.section--button');

  I.amOnPage('/metrics');
  I.waitForText('Site Visits: 3', 10);
  I.waitForText('GETS URL Clicks: 1', 10);
});
