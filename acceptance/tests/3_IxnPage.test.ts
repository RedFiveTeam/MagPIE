/// <reference path="../steps.d.ts" />

Feature('Ixn Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('RFI', 10);
  I.click('.cell--navigate-to-tgt-button');
  I.waitForText('RFI:', 10);
});

Scenario ('Should be able to navigate to and exit the interactions page', (I) => {
  I.click('.add-date-button');
  I.fillField('input', '02012020');

  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.waitForText('MGRS: 12QWE1231231231', 10);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI: 20-325', 10);
});

Scenario('Should be able to add segments', (I) => {
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

Scenario('Should be able to add ixns', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Tab');
  I.fillField('.activity', 'Person entered tgt from right side');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 10);
  I.waitForText('Billy Bob Joe', 10);
  I.waitForText('Person entered tgt from right side', 10);

  I.fillField('.time', '1215');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.fillField('.track', '123-234');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.waitForText('12:15:00Z', 10);
  I.waitForText('123-234', 10);

  I.fillField('.time', '13');
  I.pressKey('Tab');
  I.waitForText('The time you entered does not fall within the segment timeline', 10);
});

Scenario('Should be able to edit ixns', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  I.doubleClick('.exploit-analyst');
  I.pressKey('Tab');
  I.fillField('.time', '121030');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.fillField('.track', '234-345');
  I.pressKey('Tab');
  I.fillField('.track-analyst', 'Giuseppe Alfredo');
  I.pressKey('Enter');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.waitForText('12:10:30Z');
  I.see('234-345');
  I.see('Giuseppe Alfredo');
  I.dontSee('12:10:00Z');
});

Scenario('Should be able to delete ixns', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.dontSee('Person entered tgt from right side');
  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.dontSee('123-234');

  I.pressKey('Tab');
  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.click('.delete-ixn-button');

  I.wait(1);

  I.dontSee('Billy Bob Joe');
});

Scenario('Should be able to edit segments', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT:', 10);

  I.click('.edit-segment');
  I.fillField('.segment-start', '110000');
  I.pressKey('Tab');
  I.fillField('.segment-end', '120000');
  I.pressKey('Enter');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.waitForText('11:00:00Z');
  I.waitForText('12:00:00Z');
});

Scenario('Should be able to delete segments', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT:', 10);

  //Delete segment w/o interactions
  I.click('.delete-segment');
  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:', 10);
  I.click('.exploitation');
  I.waitForText('TGT:', 10);
  I.dontSee('12:00:00Z');

  //Delete segment with interactions
  I.click('.add-segment-button');
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('12:00:00Z');
  I.waitForText('12:30:40Z');

  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 10);
  I.click('.delete-segment');
  I.click('.modal-no');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.waitForText('12:00:00Z');

  I.click('.delete-segment');
  I.click('.modal-yes');

  I.click('.ixn-dash--header--back-button');
  I.click('.exploitation');

  I.dontSee('12:00:00Z');
});

Scenario('Should display a modal when deleting targets with ixns', (I) => {
  //Add date
  I.click('.add-date-button');
  I.fillField('input', '02012020');
  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');


  //Add target
  I.click('.add-tgt-button');
  I.fillField('.name', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  //Add segment
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.click('.add-segment-button');
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.pressKey('Enter');
  I.waitForText('12:00:00Z');

  //Add Ixn
  I.fillField('.exploit-analyst', 'Bob');
  I.pressKey('Tab');
  I.fillField('.time', '121');
  I.pressKey('Tab');
  I.fillField('.activity', 'thing');
  I.pressKey('Enter');
  I.waitForText('12:10:00Z', 10);

  //Navigate back and try a delete
  I.click('.ixn-dash--header--back-button');
  I.click('.delete-tgt-button');
  I.waitForText('Are you sure you want to delete ');
  I.click('.modal-no');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.waitForText('SDT20-123');

  I.click('.delete-tgt-button');
  I.waitForText('Are you sure you want to delete ');
  I.click('.modal-yes');

  I.click('.tgt-dash--header--back-button');
  I.click('.cell--navigate-to-tgt-button');

  I.waitForText('RFI:');
  I.dontSee('SDT20-123');
});
