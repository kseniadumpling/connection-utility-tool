import Constants from "../constants";

function contains() {
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[0].includes(arguments[i])) {
            return true;
        }
    }
    return false;
}

export {contains};
