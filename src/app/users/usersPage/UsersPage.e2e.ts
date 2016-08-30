describe('UsersPage', () => {

  beforeEach(() => {
    browser.get('http://localhost:3000/#/users');
  });

  it('shows the users list', () => {
    expect(element(by.css('h1')).getText()).toEqual('Listing Users');
  });

  it('navigates to the add users form on clicking the link', () => {
    element(by.css('.add-user-link')).click();

    expect(browser.getCurrentUrl()).toMatch('/users/new');
    expect(element(by.css('h1')).getText()).toEqual('Add New User');
  });

});
