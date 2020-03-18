/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.sign-in', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click('.section--right');

  I.amOnPage('/metrics');
  I.waitForText('GETS URL Clicks: 1', 10);
  I.waitForText('Site Visits: 25', 10);
});
