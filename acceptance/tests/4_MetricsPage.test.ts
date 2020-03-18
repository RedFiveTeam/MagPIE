/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/');
  I.waitForText('20-321', 10);
  I.click('.section--right');

  I.amOnPage('/metrics');
  I.waitForText('GETS URL Clicks: 1', 10);
  I.waitForText('Site Visits: 25', 10);
});
