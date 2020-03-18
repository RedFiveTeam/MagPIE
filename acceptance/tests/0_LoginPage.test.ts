/// <reference path="../steps.d.ts" />

Feature('Login Page');

Scenario ('Should be able to create an account', (I) => {
  //Try to log in without an account
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.sign-in', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('Email not found');

  //Go to and exit sign up screen
  I.click('Don\'t have an account?');
  I.waitForText('Submit', 10);
  I.click('Cancel');
  I.waitForText('Don\'t have an account?', 10);

  //Sign up
  I.click('Don\'t have an account?');
  I.fillField('.sign-up', 'billy.bob.joe!');
  I.waitForText('Invalid input', 10);
  I.pressKey('Backspace');
  I.pressKey('Enter');
  I.waitForText('Field cannot be empty', 10);
  I.pressKey('Tab');
  I.fillField('.sign-up-verify', 'billy.bob.joey');
  I.pressKey('Enter');
  I.waitForText('Does not match', 10);
  I.pressKey('Backspace');
  I.click('Submit');

  I.waitForText('RFI', 10);
});

Scenario('Should not be able to register an existing account', (I) => {
  I.clearCookie('username');

  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.click('Don\'t have an account?');
  I.fillField('.sign-up', 'billy.bob.joe');
  I.pressKey('Tab');
  I.fillField('.sign-up-verify', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('Account already exists', 10);
});

Scenario('Should be able to log in to an existing account', (I) =>{
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.sign-in', 'billy.bob.joe');
  I.pressKey('Enter');

  I.waitForText('RFI', 10);
});
