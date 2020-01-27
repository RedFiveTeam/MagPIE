/// <reference path="../steps.d.ts" />

Feature('COI Page');

Scenario ('Should have a COI page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.waitForText('RFI: 20-325', 10);
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
});

//Does not add them--assuming this is a limitation of nightmare
Scenario ('Should be able to select dates on the COI page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.flatpickr-input');
  I.click('.flatpickr-day');
  I.click('.flatpickr-day');
});
