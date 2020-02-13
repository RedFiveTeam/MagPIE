/// <reference path="../steps.d.ts" />

Feature('Ixn Page');

//TODO: acceptance test for navigating to ixn page
Scenario ('Should be able to navigate to and exit the interactions page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.add-date-button');
  I.fillField('.MuiInputBase-input', '02012020');

  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Tab');
  I.fillField('.notes', 'notes');
  I.pressKey('Tab');
  I.fillField('.description', 'desc');
  I.pressKey('Enter');
  I.seeElement('.add-tgt-button');
  I.dontSeeElement('.add-tgt-button-disabled');

  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.waitForText('MGRS: 12QWE1231231231', 10);
  I.waitForText('EEI Notes: notes', 10);
  I.waitForText('Date: 02/01/2020', 10);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI: 20-325', 10);
});
