describe('Form Spec', function() {
  beforeEach(function() {
    browser.get('http://localhost:4000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('TripChat');
  });

  it('should open a model when login is clicked', function() {
    expect(element(by.id('signup-modal')).isDisplayed()).toBe(false);

    element(by.id('signupBtn')).click();

    expect(element(by.id('signup-modal')).isDisplayed()).toBe(true);


    // expect(element(by.id('signup-modal')).isDisplayed()).toBe(false); 

    // expect(element(by.id('signup-modal')).isDisplayed()).toBe(true); 
    // var username = driver.wait(until.elementLocated(By.id('username')), 4000);
    // username.sendKeys('yoyoyoyoyoyoyoyoyyoyoyoyoyo');
    // element(by.model('username')).sendKeys('yoyoyoyoyoyoyoyoyyoyoyoyoyo');
    // expect(element(by.id('login-modal')).isPresent()).toBe(true);
  });

  // it('should change the url when clicking the new page route', function() {

  // });


});