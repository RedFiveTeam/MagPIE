/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.section--button');

  I.amOnPage('/metrics');
  I.waitForText('Site Visits: 11', 10);
  I.waitForText('GETS URL Clicks: 1', 10);
});
