/**
* Usage: selectDropdownByNumber ( element, index)
* element : select element
* index : index in the dropdown, 1 base.
*/
export function selectDropdownByNumber(element: any, index: number, milliseconds: number) {
  element.findElements(by.tagName('option'))
    .then(function(options: any) {
      options[index].click();
    });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}


/**
* Usage: selectDropdownByText (selector, item)
* selector : select element
* item : option(s) in the dropdown.
*/
export function selectDropdownByText(element: any, item: string, milliseconds: number) {
  var desiredOption: any;
  element.findElements(by.tagName('option'))
    .then(function findMatchingOption(options: any) {
      options.some(function(option: any) {
        option.getText().then(function doesOptionMatch(text: string) {
          if (text.indexOf(item) !== -1) {
            desiredOption = option;
            return true;
          }
        });
      });
    })
    .then(function clickOption() {
      if (desiredOption) {
        desiredOption.click();
      }
    });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}

/**
* Usage: selectRandomDropdownReturnText ( element, milliseconds)
* element : select random element
* index : wait time to select value for drop down.
*/
export function selectRandomDropdownReturnText(element: any, milliseconds: number) {
  element.findElements(by.tagName('option')).then(function(options: any) {
    var randomNumber = Math.floor((Math.random() * options.length
    ));
    options[randomNumber].click();
    return options[randomNumber].getText().then(function(text: string) {
      return text;
    });
  });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}
