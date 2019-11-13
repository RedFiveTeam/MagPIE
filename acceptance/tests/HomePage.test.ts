/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario ('should see a home page', (I) => {
    I.amOnPage('/');
    I.waitForText('RFI', 10);
    I.waitForText('20-321', 10);
});
