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

Scenario ('Should be able to set dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.add-date-button');
  I.fillField('.MuiInputBase-input', '02012020');
  I.see('TGT Name');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/01/2020'}));
});

Scenario ('Should be able to edit dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.see('TGT Name');
  I.clearField('.MuiInputBase-input');
  I.fillField('.MuiInputBase-input', '02092020');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
  I.dontSeeElement(locate('.MuiInputBase-input').withAttr({value: '02/01/2020'}));
});

Scenario ('Should be able to delete dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.see('TGT Name');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
  I.click('.delete-date');
  I.dontSeeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
});

Scenario ('Should be able to add targets on the Tgt page', (I) => {
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

});

Scenario ('Should be able to delete targets on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);

  I.click('.delete-tgt');
  I.dontSeeElement('.tgt-form-box');
  I.click('.delete-date');
});

