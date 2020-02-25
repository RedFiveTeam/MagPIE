/// <reference path="../steps.d.ts" />

Feature('Ixn Page');

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
  I.pressKey('Enter');
  I.seeElement('.add-tgt-button');
  I.dontSeeElement('.add-tgt-button-disabled');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--add-tgt-button');

  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.waitForText('MGRS: 12QWE1231231231', 10);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI: 20-325', 10);
});

Scenario('Should be able to add segments', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.click('.add-segment-button');
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('12:00:00Z');
  I.waitForText('12:30:40Z');
  I.dontSee('.segment-input-container');
});