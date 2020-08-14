Feature('Feedback Page');

Before((I) => {
  I.amOnPage('/');
  I.waitForText('Don\'t have an account?', 3);
  I.fillField('.username-input', 'Sdt.Test');
  I.pressKey('Enter');
  I.waitForText('20-321', 10);
});

Scenario('Should display the feedback page and star submittal reaction', (I) => {
  I.amOnPage('/feedback/DGS-1-SDT-2020-00321');

  I.waitForText('RFI: DGS-1-SDT-2020-00321', 10);
  I.waitForText('How did we do?');
  I.waitForText('RFI Description');
  I.waitForText('hello rfi');

  within(locate('.star-container'), () => {
    I.click(locate('.star').at(4));
  });

  I.waitForText('Thank You!');
});
