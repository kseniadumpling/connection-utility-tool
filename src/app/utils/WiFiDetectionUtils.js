import {contains} from "./CLIParseUtils";
import Constants from "../constants/Constants";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const platform = process.platform;

/**
 * Check Wi-Fi status by executing cli command
 * @returns {Boolean}
 */
async function isWiFiEnabled() {
    if (platform === Constants.PLATFORM_TYPES.WIN) {
        const {stdout} = await exec(`chcp 65001 | netsh interface show interface | findstr "Enabled"`);
        return (
            stdout
                .toString()
                .split("\r\n")
                .filter(outputString => contains(outputString, "Wireless", "Wi-Fi") && contains(outputString, "Connected")).length !== 0
        );
    } else if (platform === Constants.PLATFORM_TYPES.LINUX) {
        const {stdout} = await exec("nmcli radio wifi");
        return stdout.includes("enabled");
    }
}

module.exports.isWiFiEnabled = isWiFiEnabled;
