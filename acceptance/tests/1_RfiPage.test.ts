/// <reference path="../steps.d.ts" />

Feature('RFI Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 10);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
});

Scenario('Should see the RFI page with clickable GETS buttons', (I) => {
  I.waitForText('20-325', 10);
  I.see('RFI');
  I.see('633d');
  I.see('USA');
  I.see('4 FEB 20');
  I.see('RFI Description');
  I.click('.gets-button');
  I.wait(1);
});

Scenario('Should be able to sort by clicking buttons', (I) => {
  I.waitForText('20-321', 10);

  I.see('-', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--ltiov');
  I.see('4 FEB 20', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--country');
  I.see('CAN', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--country');
  I.see('USA', locate('.region--new').find('.rfi-row').at(1));

  I.click('.header-cell--customerUnit');
  I.see('1 FW', locate('.region--new').find('.rfi-row').at(1));
  I.click('.header-cell--customerUnit');
  I.see('HQ ACC', locate('.region--new').find('.rfi-row').at(1));
});

Scenario('Should be able to select RFIs and see descriptions', (I) => {
  I.waitForText('RFI', 10);
  I.see('RFI Description');
  I.see('Lorem ipsum dolor sit amet');
  I.see('Justification');
  I.see('This is a justification.');
  I.click(locate('.rfi-row').at(2));
  I.waitForText('in culpa qui officia deserunt mollit anim id es laborum.')
});
