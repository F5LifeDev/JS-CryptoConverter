//JS CryptoConverter
// main.js

import { blockString, stretch_text, resetAllValues, clear_settings, evaluateKeywordOption, hasKeywordOption } from "./utilities.js";
import { encryptCaesar, decryptCaesar } from "./caesar.js";
import { alphaNumeric } from "./alphaNumeric.js";
import { atbash } from "./atbash.js";
import { encryptMorse, decryptMorse } from "./morseCode.js";

//Initializing DOM variables
export const text_input = document.getElementById("text_input");
export const result_div = document.getElementById("text_result");
export const block_option = document.getElementById("block_option");
export const caps_option = document.getElementById("caps_option");
export const keyword_option = document.getElementById("keyword_option");
export const cipher_selector = document.getElementById("cipher_selector");
export const shift_selector = document.getElementById("shift_selector");
export const keyword_selector = document.getElementById("keyword_selector");
export const operation_selector = document.getElementById("operation_selector");
const copyButton = document.getElementById("copy_button")

//Event Listeners
text_input.addEventListener("input", () => { result_div.innerText = encryptMessage() });
block_option.addEventListener("click", () => { result_div.innerText = encryptMessage(), stretch_text() });
caps_option.addEventListener("click", () => { result_div.innerText = encryptMessage() });
document.getElementById("clear_button").addEventListener("click", () => { resetAllValues(), clear_settings() });
cipher_selector.addEventListener("change", () => { result_div.innerText = encryptMessage(); evaluateKeywordOption() });
shift_selector.addEventListener("change", () => { result_div.innerText = encryptMessage() });
keyword_selector.addEventListener("change", () => { result_div.innerText = encryptMessage() });
operation_selector.addEventListener("change", () => { result_div.innerText = encryptMessage() });
keyword_option.addEventListener("change", () => {
    keyword_option.checked ? keyword_selector.classList.remove("unselectable") : keyword_selector.classList.add("unselectable");
    result_div.innerText = encryptMessage();
})
copyButton.addEventListener("click", copyToClipboard)

function encryptMessage() {
    clear_settings();
    var string = text_input.value;
    block_option.checked ? string = blockString(string) : string;
    caps_option.checked ? string = string.toUpperCase() : string;

    switch (cipher_selector.value) {
        case "alphaNumeric":
            string = alphaNumeric(string);
            result_div.style = "word-spacing: 5px";
            break;
        case "atbash":
            string = atbash(string);
            break;
        case "caesar":
            shift_selector.classList.remove("unselectable");
            operation_selector.classList.remove("unselectable");
            if (operation_selector.value == "encrypt") {
                string = encryptCaesar(string, parseInt(shift_selector.value));
            } else {
                string = decryptCaesar(string, parseInt(shift_selector.value));
            }
            break;
        case "morse_code":
            operation_selector.classList.remove("unselectable");
            keyword_selector.value = "";
            keyword_option.checked = false;
            if (operation_selector.value == "encrypt") {
                string = encryptMorse(string);
            }
            else {
                string = decryptMorse(string);
            }
            break;
        case "reverse":
            string = string.split("").reverse().join("");
            break;
        case "rot13":
            string = encryptCaesar(string, 13);
            break;

        default:
            string = string;
            break;
    }
    //TO DO:  Remove once setKeyword function is working?
    keyword_selector.value = "";
    return string;
}

function copyToClipboard() {
    if (result_div.innerText == "") return

    result_div.value = result_div.innerText
    console.log(`innerText:  ${result_div.innerText}`)
    console.log(`value:  ${result_div.value}`)

    /*
    var copyText = document.querySelector("#text_result")
    copyText.select()
    document.execCommand("copy")
    */

}