/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should load a page', (I) => {
  I.amOnPage('/');
  I.see('This is the Walking Skeleton for the Fritz application by Lab-1.');
});