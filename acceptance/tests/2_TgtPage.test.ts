/// <reference path="../steps.d.ts" />

Feature('Tgt Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click(locate('.rfi-row').at(3));
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

Scenario ('Should be able to collapse/expand mini RFI table', (I) => {
  I.waitForText('RFI DESCRIPTION: Lorem ipsum', 10);
  I.moveCursorTo('.mini-rfi-table');
  I.waitForElement('.collapse-button');
  I.click('.collapse-button');

  I.waitForElement('.mini-rfi-table-collapsed');
  I.moveCursorTo('.mini-rfi-table-collapsed');
  I.waitForElement('.expand-button');
  I.click('.expand-button');

  I.waitForElement('.mini-rfi-table');
});

Scenario('Should prompt user to save new targets retrieved from GETS', (I) => {
  I.click(locate('.rfi-row').at(5));

  I.dontSeeElement('.exploit-date-divider');
  I.dontSee('Add additional coverage dates');
  I.dontSee('Input or select a coverage date for your targets');
  I.see('Input all target names to assign a coverage date');
  I.see('35ABC1212787890');
  I.see('23GSD0987685321');
  I.see('68SDT1056737465');

  I.doubleClick(locate('.tgt-name').at(1));
  I.fillField(locate('.tgt-name').at(1), 'SDT20-001');
  I.pressKey('Enter');
  I.waitForText('SDT20-001');

  I.doubleClick(locate('.tgt-name').at(2));
  I.fillField(locate('.tgt-name').at(2), 'SDT20-002');
  I.pressKey('Enter');
  I.waitForText('SDT20-002');

  I.doubleClick(locate('.tgt-name').at(3));
  I.fillField(locate('.tgt-name').at(3), 'SDT20-003');
  I.pressKey('Enter');
  I.waitForText('SDT20-003');

  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(5));
  I.click('.navigate-to-tgt-button');

  I.dontSee('Input all target names to assign a coverage date');
  I.see('Add Coverage Date to Exploit TGTs');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-004');
  I.pressKey('Tab');
  I.fillField('.mgrs', '20QWE3213213213');
  I.pressKey('Tab');
  I.fillField('.notes', 'notes');
  I.pressKey('Tab');
  I.fillField('.description', 'desc');
  I.pressKey('Enter');
  I.waitForText('SDT20-004 Created');

  I.click('.add-date-button');
  I.waitForText('OK');
  I.click('OK');

  I.waitForText('Created');
  I.waitForElement('.exploit-date-divider');

  I.click('.add-date-button');
  I.waitForText('OK');
  I.click('Cancel');
  I.fillField('input', '02012020');

  I.waitForText('Would you like to import');
  I.click('.modal-yes');

  I.waitForText('Targets Copied');
  within('.date-divider--1-Feb-20', () => {
    I.see('SDT20-001');
    I.see('SDT20-002');
    I.see('SDT20-003');
    I.see('SDT20-004');
    I.see('35ABC1212787890');
    I.see('23GSD0987685321');
    I.see('68SDT1056737465');
    I.see('20QWE3213213213');
  });
});

Scenario('Should be able to add dates and undo', (I) => {
  I.see('Input or select a coverage date for your targets');

  I.click('.add-date-button');
  I.click('Cancel');

  I.fillField('input', '02012020');
  I.waitForText('TGT Name', 10);
  I.waitForElement('.date-divider--1-Feb-20')
  I.waitForText('02/01/2020 Created', 10);
  I.dontSee('Input or select a coverage date for your targets');

  I.click('.undo-button');
  I.waitForText('Input or select a coverage date for your targets', 10);
  I.dontSee('TGT Name');
  I.dontSeeElement('.date-divider--1-Feb-20')

  I.click('.add-date-button');
  I.click('Cancel');

  I.fillField('input', '02012020');
  I.waitForText('02/01/2020 Created', 10);
  I.waitForElement('.date-divider--1-Feb-20')
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
  I.waitForElement('.date-divider--9-Feb-20');
  I.click('.delete-date');
  I.waitForText('You deleted 02/09/2020', 10);
  I.dontSeeElement('.date-divider--9-Feb-20');
  I.click('.undo-button');

  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(3));
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:', 10);
  I.waitForElement('.date-divider--9-Feb-20');
  I.click('.delete-date');
  I.waitForText('You deleted 02/09/2020', 10);
  I.dontSeeElement('.date-divider--9-Feb-20');
});

Scenario('Should be able to add tgts', (I) => {
  I.click('.add-date-button');
  I.click('Cancel');
  I.fillField('input', '02012020');
  I.click('.dismiss-snackbar');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Tab');
  I.fillField('.notes', 'notes');
  I.pressKey('Tab');
  I.fillField('.description', 'desc');
  I.pressKey('Enter');
  I.waitForText('SDT20-123 Created');
  I.click('.undo-button');

  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(3));
  I.click('.navigate-to-tgt-button');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Tab');
  I.fillField('.notes', 'notes');
  I.pressKey('Tab');
  I.fillField('.description', 'desc');
  I.pressKey('Enter');
  I.click('.dismiss-snackbar');

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
  I.click(locate('.rfi-row').at(3));
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
  I.click(locate('.rfi-row').at(3));
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
  I.click(locate('.rfi-row').at(3));
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
  I.click(locate('.rfi-row').at(3));
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI DESCRIPTION:');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT21-999');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');
  I.click('.dismiss-snackbar');

  I.doubleClick('.tgt-name');
  for (let i = 0; i < 5; i++)
    I.pressKey('Backspace');
  I.fillField('.tgt-name', '1-999');
  I.pressKey('Enter');

  I.waitForText('Duplicate TGTs under the same date are not allowed.');
});

Scenario('Should be able to delete and undo delete tgts', (I) => {
  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.waitForText('You deleted SDT20-999');
  I.click('.undo-button');
  I.wait(1);

  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.waitForElement('.dismiss-snackbar');
  I.click('.dismiss-snackbar');

  //Need to leave page and come back to see changes
  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(3));
  I.click('.navigate-to-tgt-button');

  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');
  I.waitForElement('.dismiss-snackbar');
  I.click('.dismiss-snackbar');

  I.click('.tgt-dash--header--back-button');
  I.click(locate('.rfi-row').at(3));
  I.click('.navigate-to-tgt-button');

  I.dontSeeElement('.tgt-form-box');
  I.click('.delete-date');
});

Scenario('Should be able to copy targets', (I) => {
  I.click('.add-date-button');
  I.click('Cancel');
  I.fillField('input', '02012020');
  I.waitForElement('.dismiss-snackbar');
  I.click('.dismiss-snackbar');

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');
  I.waitForElement('.dismiss-snackbar');
  I.click('.dismiss-snackbar');

  I.click('.add-date-button');
  I.click('Cancel');
  I.fillField('input', '02022020');
  I.wait(1);
  I.click('.dismiss-snackbar');

  I.waitForText('Would you like to import', 10);
  I.click('.modal-no');

  I.click('.copy-tgts-button');
  I.waitForText('Copy Targets from', 10);
  I.click('.tgt-copy--select-date');

  I.waitForText('Copy Targets to', 10);
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
  I.waitForText('Targets Copied');

  within('.date-divider--2-Feb-20', () => {
    I.waitForElement('.highlighted');
    I.see('SDT20-123');
    I.see('12QWE1231231231');
  });

  I.click('.undo-button');

  within('.date-divider--2-Feb-20', () => {
    I.dontSee('SDT20-123');
    I.dontSee('12QWE1231231231');
  });

  I.moveCursorTo('.tgt-form-box');
  I.waitForElement('.delete-tgt-button');
  I.click('.delete-tgt-button');

  I.click('.delete-date');
  I.click('.delete-date');
});
