/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario ('should see a home page', (I) => {
    I.amOnPage('/');
    I.waitForText('RFI', 10);
    I.waitForText('20-321', 10);
    I.waitForText('633d', 10);
    I.waitForText('USA', 10);
    I.waitForText('4 FEB 20', 10);
});

Scenario ('should be able to sort by clickin\' BUTTons', (I) => {
  I.amOnPage('/');
  I.waitForText('20-321', 10);

  I.see('4 FEB 20', locate('.region--pending').find('.row').at(1));
  I.click('.sort--ltiov');
  I.see('-', locate('.region--pending').find('.row').at(1));

  I.click('.sort--country');
  I.see('CAN', locate('.region--pending').find('.row').at(1));
  I.click('.sort--country');
  I.see('USA', locate('.region--pending').find('.row').at(1));

  I.click('.sort--unit');
  I.see('1 FW', locate('.region--pending').find('.row').at(1));
  I.click('.sort--unit');
  I.see('HQ ACC', locate('.region--pending').find('.row').at(1));

});
