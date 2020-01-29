/// <reference path="../steps.d.ts" />

Feature('Tgt Page');

Scenario ('Should have a Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.waitForText('RFI: 20-325', 10);
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
});

//TODO: see if we can add dates with the Material UI date picker and do acceptance testing for that and adding targets
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

