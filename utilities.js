// utilities.js

import { result_div, text_input, cipher_selector, shift_selector, keyword_selector, clear_button } from "./main.js";

export function blockString(string, number = 3, nullChar = "x") {
    var string = string.replace(/ /g, "").split("");
    var blockedString = "";
    while (string.length > 0) {
        for (var i = 0; i < number; i++) {
            //string.length > 0 ? blockedString += string.shift() : blockedString += nullChar;
            if (string.length > 0) {
                blockedString += string.shift();
            }
            else {
                blockedString += nullChar
            }
        }
        blockedString += " ";
    }
    return blockedString;
}

export function stretch_text() {
    result_div.style.letterSpacing = "2px";
    setTimeout(() => { result_div.style.letterSpacing = "normal" }, 250)
}

export function evaluateKeywordOption() {
    const keywordCiphers = ["alphaNumeric", "atbash", "caesar", "reverse", "rot13"]
    if (keywordCiphers.includes(cipher_selector.value)) {
        console.log(`${cipher_selector.value} has a keyword option.`)
    } else {
        console.log(`${cipher_selector.value} does not have a keyword option.`)
    }
}

export function hasKeywordOption() {
    const keywordCiphers = ["alphaNumeric", "atbash", "caesar", "reverse", "rot13"]
    return keywordCiphers.includes(cipher_selector.value)
}

export function resetAllValues() {
    block_option.checked = false;
    caps_option.checked = false;
    punctuation_remove_option.checked = false
    text_input.value = ""; 
    result_div.innerText = "";
    cipher_selector.value = "";
    operation_selector.value = "encrypt";
    keyword_option.checked = false;
    keyword_selector.classList.add("unselectable"); keyword_selector.value = "";
    shift_selector.value = 3;
    clear_button.innerText = "Cleared";
    setTimeout(() => clear_button.innerText = "Clear", 500)
}

export function clear_settings() {
    shift_selector.classList.add("unselectable");
    operation_selector.classList.add("unselectable");
    result_div.style = "word-spacing: normal";
}

