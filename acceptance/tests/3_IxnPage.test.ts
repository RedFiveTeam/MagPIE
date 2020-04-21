/// <reference path="../steps.d.ts" />

Feature('Ixn Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
  I.click('.navigate-to-tgt-button');
  I.waitForText('RFI:', 10);
});

Scenario('Should be able to navigate to and exit the interactions page', (I) => {
  I.click('.add-date-button');
  I.fillField('input', '02012020');

  I.waitForText('TGT Name', 10);

  I.click('.add-tgt-button');
  I.fillField('.tgt-name-input-new', 'SDT20-123');
  I.pressKey('Tab');
  I.fillField('.mgrs', '12QWE1231231231');
  I.pressKey('Enter');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.waitForText('MGRS: 12QWE1231231231', 10);

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.waitForText('RFI: 20-325', 10);
});

Scenario('Should be able to add and cancel adding segments', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  //Add and cancel
  I.click('.add-segment-button');
  I.fillField('.segment-start', '12');
  I.pressKey('Tab');
  I.fillField('.segment-end', '12304');
  I.click('.cancel-add-segment');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.dontSee('12:00:00Z');

  //Add
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

  I.pressKey('Tab');
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
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.waitForText('12:15:00Z', 10);

  I.fillField('.time', '13');
  I.pressKey('Tab');
  I.waitForText('The time you entered does not fall within the segment timeline', 10);
});

Scenario('Should be able to see Tgt and Ixn counts on the RFI page', (I) => {
  I.click('.tgt-dash--header--back-button');

  I.waitForText('TGTs', 10);
  I.see('IXNs');
  I.see('1', locate('.region--prioritized').find('.cell--count').at(1));
  I.see('2', locate('.region--prioritized').find('.cell--count').at(2));
});

Scenario('Should be able to edit ixns', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  I.doubleClick('.exploit-analyst');
  I.pressKey('Tab');
  I.fillField('.time', '121030');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.fillField('.track-analyst', 'Giuseppe Alfredo');
  I.pressKey('Enter');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('12:10:30Z');
  I.see('Giuseppe Alfredo');
  I.dontSee('12:10:00Z');

  I.doubleClick('.exploit-analyst');
  I.pressKey('Tab');
  I.fillField('.time', '121133');
  I.pressKey('Tab');
  I.click('.cancel-edit-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');
  I.waitForText('12:10:30Z');
  I.dontSee('12:11:33Z');
});

Scenario('Should be able to assign status, edit track narratives, and see tracks generate', (I) => {
  I.click('.exploitation');
  I.waitForText('Status', 10);

  I.moveCursorTo('.status-wrapper', 10, 10);
  I.click('.in-progress-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('In Progress', 10);
  I.see('123-001');

  I.moveCursorTo('.status-wrapper', 10, 10);
  I.click('.completed-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('Complete', 10);
  I.see('123-001');
  I.dontSee('In Progress');

  I.moveCursorTo('.status-wrapper', 10, 10);
  I.click('.does-not-meet-eei-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('EEI', 10);
  I.dontSee('Completed');
  I.dontSee('123-001');
});

Scenario('Should be able to write and view track narratives', (I) => {
  I.click('.exploitation');
  I.waitForText('Status', 10);
  I.click('.status-wrapper');
  I.click('.completed-button');
  I.click('.track-narrative-button');

  I.waitForText('Copy to Clipboard');

  I.fillField('.track-narrative', '3 already present PERS were in the CY S of BLDG 1. 2 Pers entered the S entrance of ' +
    'BLDG 1 and 1 PERS entered the W entrance of BLDG 2.');
  I.pressKey('Enter');
  I.fillField('.track-narrative', '02:11Z - 1 PERS entered the N entrance of BLDG 20 (exited S entrance of BLDG 9 at ' +
    '02:10:11).');

  I.pressKey('ArrowDown');
  I.pressKey('ArrowDown');
  I.pressKey('ArrowDown');
  I.pressKey('Enter');
  I.pressKey('Enter');

  I.fillField('.track-narrative', 'Analyst Note: Track stopped due to VEH exiting coverage area.');

  I.click('.save');
  I.waitForText('Track Narrative Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.track-narrative-input', '2 Pers entered the S entrance of BLDG 1');
  I.seeInField('.track-narrative-input', 'Track stopped due to VEH exiting coverage area');

  I.fillField('.track-narrative', 'DO NOT SAVE THIS');
  I.click('.cancel');
  I.dontSee('Copy to Clipboard');

  I.click('.track-narrative-button');
  I.waitForText('Copy to Clipboard');
  I.dontSeeInField('.track-narrative-input', 'DO NOT SAVE THIS');
});

Scenario('Should be able to write and view ixn notes', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  I.click('.note-button');
  I.wait(1);
  I.fillField('.note-input', 'These are some notes about an ixn');
  I.pressKey('Enter');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);
  I.dontSee('These are some notes about an ixn');

  I.click('.note-button');
  I.wait(1);
  I.seeInField('.note-input', 'These are some notes about an ixn');
});

Scenario('Should be able to write and view rollups', (I) => {
  I.click('.exploitation');
  I.waitForText('Status', 10);
  I.click('.rollup-button');

  I.waitForText('Copy to Clipboard');
  I.seeInField('.rollup-input', 'Activity Rollup (SDT20-123)');
  I.seeInField('.rollup-input', '01FEB20');
  I.seeInField('.rollup-input', 'Note:');
  I.see('12:00:00Z');
  I.see('12:30:40Z');
  I.see('12:10:30Z');
  I.see('Person entered tgt from right side');
  I.see('12:15:00Z');

  I.click(locate('.import-checkbox').at(2));
  I.click('.import-rollup-button');
  I.wait(1);
  I.seeInField('.rollup-input', '12:15:00Z -');

  I.click(locate('.import-checkbox').at(1));
  I.click('.import-rollup-button');
  I.wait(1);
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.click('.save');
  I.waitForText('Rollup Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.fillField('.rollup', 'DO NOT SAVE THIS');
  I.click('.cancel');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.dontSeeInField('.rollup-input', 'DO NOT SAVE THIS');

  I.click('.rollup-mode-toggle-button');
  I.wait(1);

  I.seeInField('.rollup-input', 'Activity Rollup (SDT20-123)');
  I.seeInField('.rollup-input', '01FEB20');
  I.seeInField('.rollup-input', '1200Z - 1230Z:');
  I.seeInField('.rollup-input', 'Note:');
  I.dontSeeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.fillField('.rollup', 'Some things happened within this half hour block of time');

  I.click('.save');
  I.waitForText('Rollup Saved');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');
  I.seeInField('.rollup-input', '12:10:30Z - Person entered tgt from right side\n\n12:15:00Z -');

  I.click('.rollup-mode-toggle-button');
  I.wait(1);

  I.seeInField('.rollup-input', 'Some things happened within this half hour block of time');

  I.fillField('.rollup', 'DO NOT SAVE THIS');
  I.click('.cancel');
  I.dontSee('Copy to Clipboard');

  I.click('.rollup-button');
  I.waitForText('Copy to Clipboard');

  I.click('.rollup-mode-toggle-button');
  I.wait(1);

  I.dontSeeInField('.rollup-input', 'DO NOT SAVE THIS');
});

Scenario('Should be able to delete ixns and undo an ixn delete', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT: SDT20-123', 10);

  //Delete first ixn
  I.moveCursorTo('.ixn-row-box', 10, 10);
  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.dontSee('Person entered tgt from right side');

  //Delete second ixn and undo
  I.moveCursorTo('.ixn-row-box', 10, 10);
  I.click('.delete-ixn-button');

  I.waitForText('Interaction deleted', 10);

  I.click('UNDO');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('Person entered tgt from right side', 10);

  //Delete second ixn
  I.moveCursorTo('.ixn-row-box', 10, 10);
  I.click('.delete-ixn-button');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.dontSee('Person entered tgt from right side');

  //Clear entered data with cancel button on input row
  I.pressKey('Tab');
  I.fillField('.exploit-analyst', 'Billy Bob Joe');
  I.pressKey('Tab');
  I.click('.cancel-edit-ixn-button');

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
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('11:00:00Z');
  I.waitForText('12:00:00Z');
});

Scenario('Should be able to delete segments and undo segment delete', (I) => {
  I.click('.exploitation');
  I.waitForText('TGT:', 10);

  //Delete segment w/o interactions and undo
  I.click('.delete-segment');

  I.waitForText('You deleted 11:00:00Z-12:00:00Z', 10);

  I.click('UNDO');

  I.click('.ixn-dash--header--back-button');
  I.waitForText('RFI:');
  I.click('.exploitation');

  //Redo delete
  I.click('.delete-segment');
  I.waitForText('You deleted 11:00:00Z-12:00:00Z', 10);

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
  I.waitForText('RFI:');
  I.click('.exploitation');

  I.waitForText('12:00:00Z');

  I.click('.delete-segment');
  I.click('.modal-yes');

  I.waitForText('You deleted');
});

Scenario('Should display a modal when deleting targets with ixns', (I) => {
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
  I.waitForText('RFI:');
  I.moveCursorTo('.tgt-form-box', 10, 10);
  I.click('.delete-tgt-button');
  I.seeElement(locate('div').withText('All associated data will be erased.'));
  I.click('.modal-no');

  I.click('.tgt-dash--header--back-button');
  I.waitForText('PRI');
  I.click('.navigate-to-tgt-button');

  I.waitForText('SDT20-123');

  I.moveCursorTo('.tgt-form-box', 10, 10);
  I.click('.delete-tgt-button');
  I.seeElement(locate('div').withText('All associated data will be erased.'));
  I.click('.modal-yes');

  I.click('.tgt-dash--header--back-button');
  I.click('.navigate-to-tgt-button');

  I.waitForText('RFI:');
  I.dontSee('12QWE1231231231');
});
