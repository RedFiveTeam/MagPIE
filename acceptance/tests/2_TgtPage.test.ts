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

Scenario ('Should be able to select dates on the target page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.flatpickr-input');
  I.click('.flatpickr-day');
  I.click('.flatpickr-day');
});

//Once Material UI datepicker is added:

//TODO: acceptance test for adding target

//TODO: acceptance test for deleting target

//TODO: acceptance test for navigating to ixn page
