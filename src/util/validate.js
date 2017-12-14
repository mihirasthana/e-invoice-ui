
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

    const emailReg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (!emailReg.test(email)) {
        error = "Requires valid email";
    }
    else {
        validationState = 'success'
    }

    return { validationState, error }
}

const validateAmount = (amount) => {
    let validationState = false
    let message = ''
    const amt = parseFloat(amount);
    if (amt < 0) {
        message = "Amount can't be negative"
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

export { validateEmail, validateName, validateLineItem }