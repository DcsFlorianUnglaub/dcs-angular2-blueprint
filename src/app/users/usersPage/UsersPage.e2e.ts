describe('UsersPage', () => {

  it('shows the users list', () => {
    browser.get('/');

    expect(element(by.css('h1')).getText()).toEqual('Listing Users');
  });

});
