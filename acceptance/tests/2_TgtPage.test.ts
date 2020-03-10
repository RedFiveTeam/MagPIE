/// <reference path="../steps.d.ts" />

Feature('Tgt Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('20-321', 10);
  I.click('.cell--navigate-to-tgt-button');
  I.waitForText('RFI: 20-325', 10);
});

Scenario ('Should be able to navigate to and exit the Tgt page', (I) => {
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
  I.click('.tgt-dash--header--back-button');
  I.waitForText('PRI', 10);
  I.waitForText('Customer', 10);
  I.waitForText('LTIOV', 10);
});

Scenario('Should be able to set dates on the Tgt page', (I) => {
  I.click('.add-date-button');
  I.fillField('input', '02012020');
  I.waitForText('TGT Name', 10);
  I.seeElement(locate('input').withAttr({value: '02/01/2020'}));
});

Scenario('Should be able to edit dates on the Tgt page', (I) => {
  I.see('TGT Name');
  I.clearField('input');
  I.fillField('input', '02092020');
  I.seeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.dontSeeElement(locate('input').withAttr({value: '02/01/2020'}));
});

Scenario('Should be able to delete dates on the Tgt page', (I) => {
  I.see('TGT Name');
  I.seeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.click('.delete-date');
  I.dontSeeElement(locate('input').withAttr({value: '02/09/2020'}));
});

Scenario('Should be able to add tgt on the Tgt page', (I) => {
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

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.waitForText('SDT20-123', 10);
  I.see('12QWE1231231231');
  I.see('notes');
  I.see('desc');
});

Scenario('Should be able to edit tgt on the Tgt page', (I) => {
  I.doubleClick('.tgt-name');
  for (let i = 0; i < 3; i++)
    I.pressKey('Backspace');
  I.fillField('.name', '999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1234567890');
  I.pressKey('Enter');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.waitForText('SDT20-999', 10);
  I.see('12QWE1234567890');
  I.dontSee('SDT20-123');
  I.dontSee('12QWE1231231231');
});

Scenario('should not be able to add tgt with conflicting names', (I) => {
  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT20-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1111111111');
  I.pressKey('Enter');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.dontSee('12QWE1111111111');

  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT21-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');
  I.seeElement('.add-tgt-button');
  I.dontSeeElement('.add-tgt-button-disabled');

  I.doubleClick('.tgt-name');
  for (let i = 0; i < 5; i++)
    I.pressKey('Backspace');
  I.fillField('.name', '1-999');
  I.pressKey('Enter');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.waitForText('SDT20-999', 10);
});

Scenario('Should be able to delete tgt on the Tgt page', (I) => {
  I.click('.delete-tgt-button');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.click('.delete-tgt-button');
  I.dontSeeElement('.tgt-form-box');
  I.click('.delete-date');
});
