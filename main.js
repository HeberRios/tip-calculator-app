"use strict";

const billInput = document.querySelector("#bill");
const customTipInput = document.querySelector("#custom-tip");
const peopleInput = document.querySelector("#num-of-people");
const radioInputs = document.querySelectorAll("input[type='radio']");
const tipTotal = document.querySelector("#tip-per-person");
const total = document.querySelector("#total-per-person");
const resetBtn = document.querySelector("#reset-btn");

// functions

function checkForNoEmptyRadioBtns() {
    let checkedRadioBtn = false;

    radioInputs.forEach(function (radioBtn) {
        if (radioBtn.checked) {
            checkedRadioBtn = true;
        } else {
            return;
        }
    });

    return checkedRadioBtn;
}

function checkForNoEmptyInputs() {
    return (
        billInput.value ||
        customTipInput.value ||
        peopleInput.value ||
        checkForNoEmptyRadioBtns()
    );
}

function resetRadioButtons() {
    radioInputs.forEach(function (input) {
        input.checked = false;
    });
}

function resetCustomTip() {
    customTipInput.value = "";
}

function resetBill() {
    billInput.value = "";
}

function resetPeople() {
    peopleInput.value = "";
}

function resetValues() {
    resetBill();
    resetRadioButtons();
    resetCustomTip();
    resetPeople();
}

function calculateTip() {
    let tipPercentage = 0;
    let tipPerPerson = 0;
    let totalPerPerson = 0;

    //    Check if any radio btn is pressed

    if (billInput.value !== "") {
        radioInputs.forEach(function (radioBtn) {
            if (radioBtn.checked) {
                tipPercentage = +radioBtn.id;
            } else {
                return;
            }
        });

        // if a radio button was pressed, then :
        if (tipPercentage !== 0) {
            if (!isNaN(billInput.value)) {
                if (peopleInput.value === "") {
                    // no people number entered, assuming just 1 person
                    tipPerPerson = +billInput.value * (tipPercentage / 100);
                    totalPerPerson = +billInput.value + tipPerPerson;

                    tipTotal.textContent = `$${tipPerPerson.toFixed(2)}`;
                    total.textContent = `$${totalPerPerson.toFixed(2)}`;
                } else if (+peopleInput.value >= 1) {
                    tipPerPerson =
                        (+billInput.value * (tipPercentage / 100)) /
                        +peopleInput.value;

                    totalPerPerson =
                        +billInput.value / +peopleInput.value + tipPerPerson;

                    tipTotal.textContent = `$${tipPerPerson.toFixed(2)}`;
                    total.textContent = `$${totalPerPerson.toFixed(2)}`;
                }
            } else {
                tipTotal.textContent = "$0.0";
                total.textContent = "$0.0";
            }
        }
        // if no radio btn was pressed but the custom tip was entered, then :
        else if (customTipInput.value !== "") {
            if (!isNaN(billInput.value)) {
                if (peopleInput.value === "") {
                    // no people number was entered, assuming just 1 person
                    tipPerPerson =
                        +billInput.value * (+customTipInput.value / 100);

                    totalPerPerson = +billInput.value + tipPerPerson;

                    tipTotal.textContent = `$${tipPerPerson.toFixed(2)}`;
                    total.textContent = `$${totalPerPerson.toFixed(2)}`;
                } else if (+peopleInput.value >= 1) {
                    tipPerPerson =
                        (+billInput.value * (+customTipInput.value / 100)) /
                        +peopleInput.value;

                    totalPerPerson =
                        +billInput.value / +peopleInput.value + tipPerPerson;

                    tipTotal.textContent = `$${tipPerPerson.toFixed(2)}`;
                    total.textContent = `$${totalPerPerson.toFixed(2)}`;
                }
            } else {
                tipTotal.textContent = "$0.0";
                total.textContent = "$0.0";
            }
        }
        // if neither a radio btn or a custom  was received, then:
        else {
            if (!isNaN(billInput.value)) {
                if (peopleInput.value === "") {
                    tipTotal.textContent = "$0.0";
                    total.textContent = `$${(+billInput.value).toFixed(2)}`;
                } else if (+peopleInput.value >= 1) {
                    totalPerPerson = +billInput.value / +peopleInput.value;

                    tipTotal.textContent = "$0.0";
                    total.textContent = `$${totalPerPerson.toFixed(2)}`;
                }
            } else {
                tipTotal.textContent = "$0.0";
                total.textContent = "$0.0";
            }
        }
    }
    // if the bill input was not entered, then:
    else {
        tipTotal.textContent = "$0.0";
        total.textContent = "$0.0";
    }

    if (checkForNoEmptyInputs()) {
        resetBtn.classList.add("active");
    } else {
        resetBtn.classList.remove("active");
    }
}

// event listeners

billInput.addEventListener("input", function () {
    calculateTip();
});

radioInputs.forEach(function (input) {
    input.addEventListener("input", function () {
        resetCustomTip();
        calculateTip();
    });
});

customTipInput.addEventListener("input", function () {
    resetRadioButtons();
    calculateTip();
});

peopleInput.addEventListener("input", function () {
    calculateTip();
});

resetBtn.addEventListener("click", function () {
    if (resetBtn.classList.contains("active")) {
        resetValues();
        resetBtn.classList.remove("active");
    } else {
        return;
    }
});

resetValues();
