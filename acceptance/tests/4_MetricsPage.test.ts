/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display metrics', (I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'billy.bob.joe');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click('.section--right');

  I.amOnPage('/metrics');

  I.waitForText('Avg RFI Spent in Status', 10);
  I.see('Open', locate('.workflow-time').find('.card-body'));
  I.see('New', locate('.workflow-time').find('.card-body'));
  I.see('0 d', locate('.workflow-time').find('.card-body'));

  I.waitForText('Avg Targets Created', 10);
  I.see('3', locate('.tgts-created').find('.card-body'));

  I.waitForText('Avg Interactions Created', 10);
  I.see('4', locate('.ixns-created').find('.card-body'));

  I.waitForText('GETS Clicks');
  I.see('Open', locate('.gets-clicks').find('.card-body'));
  I.see('New', locate('.gets-clicks').find('.card-body'));
  I.see('1', locate('.gets-clicks').find('.card-body'));
});
