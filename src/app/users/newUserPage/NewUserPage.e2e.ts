describe('NewUserPage', () => {

  beforeEach(() => {
    browser.get('http://localhost:3000/#/users/new');
  });

  it('validates the fields', () => {
    expect(element(by.css('h1')).getText()).toEqual('Add New User');

    const emailField = element(by.css('#inputEmail'));
    const nameField = element(by.css('#inputFullName'));

    emailField.sendKeys('invalid');
    nameField.sendKeys('A valid name');

    expect(emailField.getAttribute('class')).toMatch('ng-invalid');
    expect(emailField.getAttribute('class')).toMatch('ng-dirty');
    expect(nameField.getAttribute('class')).toMatch('ng-valid');
  });

});
