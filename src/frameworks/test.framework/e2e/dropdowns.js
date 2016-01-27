"use strict";
// http://qainsight.blogspot.com/2014/04/select-dropdown-value-in-protractor-js.html
// modified to match new api
/**
* Usage: selectDropdownByNumber ( selector, index)
* selector : dom selector
* index : index in the dropdown, 1 base.
*/
function selectDropdownByNumber(selector, index, milliseconds) {
    element.all(by.css(selector + ' option'))
        .then(function (options) {
        options[index].click();
    });
    if (typeof milliseconds !== 'undefined') {
        browser.sleep(milliseconds);
    }
}
exports.selectDropdownByNumber = selectDropdownByNumber;
/**
* Usage: selectDropdownByText (selector, text)
* selector : dom selector
* text : option(s) in the dropdown.
*/
function selectDropdownByText(selector, text, milliseconds) {
    var desiredOption;
    element.all(by.css(selector + ' option'))
        .then(function findMatchingOption(options) {
        options.forEach(function (option) {
            option.getText().then(function doesOptionMatch(item) {
                if (item.indexOf(text) !== -1) {
                    desiredOption = option;
                    return true;
                }
            });
        });
    })
        .then(function clickOption() {
        if (desiredOption) {
            desiredOption.click();
            browser.actions().mouseDown().mouseUp().perform();
        }
    });
    if (typeof milliseconds !== 'undefined') {
        browser.sleep(milliseconds);
    }
}
exports.selectDropdownByText = selectDropdownByText;
/**
* Usage: selectRandomDropdownReturnText ( selector, milliseconds)
* selector : dom selector
* index : wait time to select value for drop down.
*/
function selectRandomDropdownReturnText(selector, milliseconds) {
    element.all(by.css(selector + ' option'))
        .then(function (options) {
        var randomNumber = Math.floor((Math.random() * options.length));
        options[randomNumber].click();
        return options[randomNumber].getText().then(function (text) {
            return text;
        });
    });
    if (typeof milliseconds !== 'undefined') {
        browser.sleep(milliseconds);
    }
}
exports.selectRandomDropdownReturnText = selectRandomDropdownReturnText;
//# sourceMappingURL=dropdowns.js.map