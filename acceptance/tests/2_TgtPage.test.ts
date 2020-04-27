/// <reference path="../steps.d.ts" />

Feature('Tgt Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click('.rfi-row');
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:', 10);
});

Scenario ('Should be able to navigate to and exit the Tgt page', (I) => {
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
  I.click('.tgt-dash--header--back-button');
  I.waitForText('Justification', 10);
  I.waitForText('Customer', 10);
  I.waitForText('LTIOV', 10);
});

Scenario('Should be able to add dates and undo', (I) => {
  I.see('Input or select a coverage date for your targets');
  I.fillField('input', '02012020');
  I.waitForText('TGT Name', 10);
  I.seeElement(locate('input').withAttr({value: '02/01/2020'}));
  I.waitForText('02/01/2020 Created', 10);
  I.dontSee('Input or select a coverage date for your targets');

  I.click('UNDO');
  I.waitForText('Input or select a coverage date for your targets', 10);
  I.dontSee('TGT Name');
  I.dontSeeElement(locate('input').withAttr({value: '02/01/2020'}));

  I.fillField('input', '02012020');
  I.waitForText('TGT Name', 10);
  I.seeElement(locate('input').withAttr({value: '02/01/2020'}));
  I.waitForText('02/01/2020 Created', 10);
  I.dontSee('Input or select a coverage date for your targets');
});

Scenario('Should be able to edit dates', (I) => {
  I.see('TGT Name');
  I.clearField('input');
  I.fillField('input', '02092020');
  I.seeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.dontSeeElement(locate('input').withAttr({value: '02/01/2020'}));
});

Scenario('Should be able to delete and undo delete dates', (I) => {
  I.see('TGT Name');
  I.seeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.click('.delete-date');
  I.waitForText('You deleted 02/09/2020', 10);
  I.dontSeeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.click('UNDO');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:', 10);
  I.seeElement(locate('input').withAttr({value: '02/09/2020'}));
  I.click('.delete-date');
  I.waitForText('You deleted 02/09/2020', 10);
  I.dontSeeElement(locate('input').withAttr({value: '02/09/2020'}));
});

Scenario('Should be able to add tgts', (I) => {
  I.click('.add-date-button');
  I.fillField('input', '02012020');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Tab');
  I.fillField('.notes', 'notes');
  I.pressKey('Tab');
  I.fillField('.description', 'desc');
  I.pressKey('Enter');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.waitForText('SDT20-123', 10);
  I.seeElement('.add-tgt-button');
  I.dontSeeElement('.add-tgt-button-disabled');
  I.see('12QWE1231231231');
  I.see('notes');
  I.see('desc');
});

Scenario('Should be able to edit tgts', (I) => {
  I.doubleClick('.tgt-name');
  for (let i = 0; i < 3; i++)
    I.pressKey('Backspace');
  I.fillField('.tgt-name', '999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1234567890');
  I.pressKey('Enter');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.waitForText('SDT20-999', 10);
  I.see('12QWE1234567890');
  I.dontSee('SDT20-123');
  I.dontSee('12QWE1231231231');

  //Cancel edit
  I.doubleClick('.tgt-name');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE0987654321');
  I.click('.cancel-edit-tgt-button');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.waitForText('SDT20-999', 10);
  I.dontSee('12QWE0987654321');
});

Scenario('Should display modal when trying to navigate away while editing a target', (I) => {
  I.doubleClick('.tgt-name');

  I.click('.tgt-dash--header--back-button');
  I.waitForText('You haven\'t saved the target you were editing.', 10);
  I.click('.modal-no');
  I.wait(1);
  I.dontSee('You haven\'t saved the target you were editing.');

  I.doubleClick('.tgt-name');
  I.pressKey('Backspace');
  I.pressKey('0');

  I.click('.tgt-dash--header--back-button');
  I.waitForText('You haven\'t saved the target you were editing.', 10);
  I.click('.modal-yes');
  I.waitForText('Customer', 10)
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:');
  I.dontSee('SDT20-990');
});


Scenario('Should not be able to add tgts with conflicting names', (I) => {
  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1111111111');
  I.pressKey('Enter');

  I.waitForText('Duplicate TGTs under the same date are not allowed.');

  I.click('.tgt-dash--header--back-button');
  I.waitForText('You haven\'t saved the target you were editing.', 10);
  I.click('.modal-yes');
  I.waitForText('Justification');
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT21-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  I.doubleClick('.tgt-name');
  for (let i = 0; i < 5; i++)
    I.pressKey('Backspace');
  I.fillField('.tgt-name', '1-999');
  I.pressKey('Enter');

  I.waitForText('Duplicate TGTs under the same date are not allowed.');
});

Scenario('Should be able to delete and undo delete tgts', (I) => {
  I.moveCursorTo('.tgt-form-box');
  I.click('.delete-tgt-button');
  I.waitForText('You deleted SDT20-999');
  I.click('UNDO');
  I.wait(1);

  I.moveCursorTo('.tgt-form-box');
  I.click('.delete-tgt-button');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.moveCursorTo('.tgt-form-box');
  I.click('.delete-tgt-button');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.dontSeeElement('.tgt-form-box');
  I.click('.delete-date');
});

Scenario('Should be able to copy targets', (I) => {
  I.click('.add-date-button');
  I.fillField('input', '02012020');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  I.click('.add-date-button');
  I.fillField('input', '02022020');

  I.click('.copy-tgts-button');
  I.waitForText('Copy Targets from', 10);
  I.click('.tgt-copy--select-date');

  I.click('.copy-to-menu');
  I.click(locate('.menu-item').at(2));
  I.wait(1);
  I.click('.select-all-checkbox');
  I.click('.copy-button');

  within('.tgt-copy--small-body', () => {
    I.see('SDT20-123');
    I.see('12QWE1231231231');
  });

  I.click('.tgt-copy--header-button');
  I.waitForText('You haven\'t saved all the targets you\'ve copied.');
  I.click('.modal-yes');

  I.click('.copy-tgts-button');
  I.waitForText('Copy Targets from', 10);
  I.click('.tgt-copy--select-date');

  I.click('.copy-to-menu');
  I.click(locate('.menu-item').at(2));
  I.wait(1);
  I.click('.select-all-checkbox');
  I.click('.copy-button');

  within('.tgt-copy--small-body', () => {
    I.see('SDT20-123');
    I.see('12QWE1231231231');
  });

  I.click('.tgt-copy--submit');

  within('.date-divider--2-Feb-20', () => {
    I.waitForElement('.highlighted');
    I.see('SDT20-123');
    I.see('12QWE1231231231');
  });

  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.click('.delete-date');
  I.click('.delete-date');
});
