/// <reference path="../steps.d.ts" />

Feature('User Metrics Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
});

Scenario('Should be able to navigate to the user metrics page and back', (I) => {
  I.waitForElement('.metrics-button');
  I.click('.metrics-button');
  I.waitForText('RFIs Completed');

  I.waitForElement('.metrics-header--back-button');
  I.click('.metrics-header--back-button');
  I.waitForText('Customer');
});

Scenario('Should display RFIs completed card', (I) => {
  I.waitForElement('.metrics-button');
  I.click('.metrics-button');
  I.waitForText('RFIs Completed');
  within('.rfis-completed', () => {
    I.see('0');
  });
});

Scenario('Should display targets created card', (I) => {
  I.waitForElement('.metrics-button');
  I.click('.metrics-button');
  I.waitForText('Targets Created');
  within('.targets-created', () => {
    I.see('11');
  });
});
