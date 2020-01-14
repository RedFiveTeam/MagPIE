/// <reference path="../steps.d.ts" />

Feature('COI Page');

Scenario ('Should have a COI page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--addCoiButton');
  I.waitForText("Go Back", 10);
  I.waitForText("DGS-1-SDT-2020-00325", 10);
  I.waitForText("RFI DESCRIPTION: Lorem ipsum", 10);
});
