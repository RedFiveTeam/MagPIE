/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario ('Should log and display GETS click metrics', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('GETS Clicks');
  I.see('Open', '.gets-clicks');
  I.see('New', '.gets-clicks');
  I.see('1', '.gets-clicks');
});

Scenario ('Should display other metrics', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('Avg RFI Spent in Status', 10);
  I.see('Open', '.workflow-time');
  I.see('New', '.workflow-time');
  I.see('0 d', '.workflow-time');

  I.waitForText('Avg Targets Created', 10);
  I.see('3', '.tgts-created');

  I.waitForText('Avg Interactions Created', 10);
  I.see('4', '.ixns-created');

  I.waitForText('Avg Deletions');
  I.see('Dates', '.deletions');
  I.see('Targets', '.deletions');
  I.see('Segments', '.deletions');
  I.see('Interactions', '.deletions');
  I.see('3', locate('.deletions').find('.card-row').at(1));
  I.see('4', locate('.deletions').find('.card-row').at(2));
  I.see('3', locate('.deletions').find('.card-row').at(3));
  I.see('3', locate('.deletions').find('.card-row').at(4));

  I.waitForText('Avg Logins');
  I.see('1', '.logins');
});
