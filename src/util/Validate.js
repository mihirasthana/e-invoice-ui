function validateName(name) {
    let error = "";
    let validationState = 'error'
    const nameReg = /^[a-zA-Z ]+$/;
    if (name.length < 1) {
        error = "Name is a required field";
    } else if (name.length > 25) {
        error = "Name is too long (25 characters only)";
    } else if (!nameReg.test(name)) {
        error = "Please enter a valid name";
    } else {
        validationState = 'success'
    }
    return { error, validationState }
}


function validateEmail(email) {
    let error = "";
    let validationState = 'error'

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email)) {
        error = "Requires valid email";
    }
    else {
        validationState = 'success'
    }

    return { validationState, error }
}

function validateDate(field) {
    let minYear = 1950;
    let maxYear = (new Date()).getFullYear();
    let error = ""
    let re = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    let regs = []
    regs = field.match(re)
    //console.log(regs)
    let validationState = 'error'
    //console.log(field)
    if (field !== '') {
        if (regs != null && regs.length > 0) {
            if (regs[1] < minYear || regs[1] > maxYear) {
                error += " Invalid value for year: " + regs[1] + " - must be between " + minYear + " and " + maxYear;
            }
            else {
                validationState = 'success'
            }
        }
    }
    else {
        error = " Please enter a date ";
    }

    return { error, validationState }
}

const validateAmount = (amount) => {
    let validationState = false
    let message = ''
    const amt = parseFloat(amount);
    if (isNaN(amt)) {
        message = "Amount is invalid"
    }
    else if (amt <= 0) {
        message = "Amount can't be negative or 0"
    } else if (amt > 9999999.99) {
        message = "Amount exceeds the limit of 9999999.99"
    } else {
        validationState = true
    }
    return {
        validationState, errorMessage: message
    }
}
const validateDescription = (desc) => {
    let validationState = false
    let message = ''
    if (desc === "") {
        message = "Description cannot be blank"
    } else if (desc.length > 200) {
        message = "Description cannot be longer than 200 characters"
    } else {
        validationState = true
    }
    return {
        validationState, errorMessage: message
    }
}
const validateLineItem = (lineItem) => {
    const amountVal = validateAmount(lineItem.amount);
    const descVal = validateDescription(lineItem.description);
    return {
        "validationStates": { amount: amountVal.validationState, description: descVal.validationState },
        "validationMessages": {
            amount: amountVal.errorMessage, description: descVal.errorMessage
        }
    }
}

function allInputValid(state) {
    const areStaticFormFieldsValid = ["email", "dueDate", "name"].every(
        (label) => {
            try {
                return state[label + "ValidationState"] === 'success'
            }
            catch (e) {
                return false;
            }
        }
    );
    const areAllLineItemsValid = state.lineItems.every(isLineItemValid);
    return areAllLineItemsValid && areStaticFormFieldsValid;
}

function isLineItemValid(lineItem) {
    try {
        return Object.values(lineItem.validation.validationStates).every((t) => t);
    } catch (e) {
        return false;
    }
}
export { validateEmail, validateName, validateDate, validateLineItem, allInputValid, isLineItemValid }