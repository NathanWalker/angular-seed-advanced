/**
* Usage: selectDropdownByNumber ( element, index)
* element : select element
* index : index in the dropdown, 1 base.
*/
export function selectDropdownByNumber(element, index, milliseconds) {
  element.findElements(by.tagName('option'))
    .then(function(options) {
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
export function selectDropdownByText(element, item, milliseconds) {
  var desiredOption;
  element.findElements(by.tagName('option'))
    .then(function findMatchingOption(options) {
      options.some(function(option) {
        option.getText().then(function doesOptionMatch(text) {
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
export function selectRandomDropdownReturnText(element, milliseconds) {
  element.findElements(by.tagName('option')).then(function(options) {
    var randomNumber = Math.floor((Math.random() * options.length
    ));
    options[randomNumber].click();
    return options[randomNumber].getText().then(function(text) {
      return text;
    });
  });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}
