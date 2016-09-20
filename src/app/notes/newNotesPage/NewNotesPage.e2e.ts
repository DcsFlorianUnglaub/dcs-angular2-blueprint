describe('NewNotesPage', () => {
  let titleField;
  let bodyField;
  let submitButton;

  beforeEach(() => {
    browser.get('http://localhost:3000/#/notes/new');
    titleField = element(by.css('#inputTitle'));
    bodyField = element(by.css('#inputBody'));
    submitButton = element(by.buttonText('Save'));

  });

  it('validates the fields', () => {
    expect(element(by.css('h1')).getText()).toEqual('Add a new note');

    titleField.sendKeys('too short');
    bodyField.sendKeys('A valid body!');

    expect(titleField.getAttribute('class')).toMatch('ng-invalid');
    expect(titleField.getAttribute('class')).toMatch('ng-dirty');
    expect(bodyField.getAttribute('class')).toMatch('ng-valid');
  });

  it('creates a valid note', () => {
    titleField.sendKeys('A valid note title');
    bodyField.sendKeys('A valid body!');

    submitButton.click();

    expect(element(by.css('h1')).getText()).toEqual('Your notes');
  });

  it('prevents submitting an invalid form', () => {
    titleField.sendKeys('too short');
    bodyField.sendKeys('A valid body!');
    submitButton.click();

    expect(element(by.css('h1')).getText()).toEqual('Add a new note');
  });
});
