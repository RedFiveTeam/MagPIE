/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/metrics');
  I.waitForText('Avg RFI Spent in Status', 10);
  I.see('Open');
  I.see('New');
  I.see('0 d');
  I.waitForText('Avg Targets Created', 10);
  I.see('3');
});
