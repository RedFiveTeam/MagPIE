/// <reference path="../steps.d.ts" />

Feature('Tgt Page');

Scenario ('Should be able to navigate to and exit the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.waitForText('RFI: 20-325', 10);
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
  I.click('.tgt-dash--header--back-button');
  I.waitForText('PRI', 10);
  I.waitForText('Customer', 10);
  I.waitForText('LTIOV', 10);
});

Scenario('Should be able to set dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.add-date-button');
  I.fillField('.MuiInputBase-input', '02012020');
  I.see('TGT Name');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/01/2020'}));
});

Scenario('Should be able to edit dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.see('TGT Name');
  I.clearField('.MuiInputBase-input');
  I.fillField('.MuiInputBase-input', '02092020');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
  I.dontSeeElement(locate('.MuiInputBase-input').withAttr({value: '02/01/2020'}));
});

Scenario('Should be able to delete dates on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.see('TGT Name');
  I.seeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
  I.click('.delete-date');
  I.dontSeeElement(locate('.MuiInputBase-input').withAttr({value: '02/09/2020'}));
});

Scenario('Should be able to add tgts on the Tgt page', (I) => {
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

Scenario('Should be able to edit tgts on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  // TODO: rename the cell--add-tgt-button class to something more accurate i.e. cell--nav-to-tgt-page
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.doubleClick('.tgt-name');
  for (let i = 0; i < 9; i++)
    I.pressKey('Backspace');
  I.fillField('.name', 'SDT20-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1234567890');
  I.pressKey('Enter');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--add-tgt-button');

  I.dontSeeElement(locate('.Mui-disabled').withAttr({value: 'SDT20-123'}));
  I.dontSeeElement(locate('.Mui-disabled').withAttr({value: '12QWE1231231231'}));
  I.seeElement(locate('.Mui-disabled').withAttr({value: 'SDT20-999'}));
  I.seeElement(locate('.Mui-disabled').withAttr({value: '12QWE1234567890'}));
});

Scenario('should not be able to add tgts with conflicting names', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);
  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT20-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1111111111');
  I.pressKey('Enter');

  I.dontSeeElement(locate('.Mui-disabled').withAttr({value: '12QWE1111111111'}));

  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT21-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');
  I.seeElement('.add-tgt-button');
  I.dontSeeElement('.add-tgt-button-disabled');

  //Need to leave page and come back to see changes if show: true
  // I.click('.tgt-dash--header--back-button');
  // I.click('.cell--add-tgt-button');

  I.doubleClick('.tgt-name');
  for (let i = 0; i < 9; i++)
    I.pressKey('Backspace');
  I.fillField('.name', 'SDT21-999');
  I.pressKey('Enter');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--add-tgt-button');

  I.seeElement(locate('.Mui-disabled').withAttr({value: 'SDT20-999'}));
});

Scenario('Should be able to delete tgts on the Tgt page', (I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--add-tgt-button');
  I.waitForText('Go Back', 10);

  I.click('.delete-tgt');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--add-tgt-button');

  I.click('.delete-tgt');
  I.dontSeeElement('.tgt-form-box');
  I.click('.delete-date');
});
