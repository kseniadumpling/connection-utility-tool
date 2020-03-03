import {contains} from "./CLIParseUtils";
import Constants from "../constants/Constants";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const platform = process.platform;

/**
 * Check is service LAN port is reachable
 * @returns {Boolean}
 */
export const isServiceLANReachable = async () => {
    if (platform === Constants.PLATFORM_TYPES.WIN) {
        const {stdout} = await exec(`ping ${Constants.IP.SERVICE_LAN}`);
        if (stdout) {
            const percentOfLoss = parseInt(stdout.toString().substring(stdout.lastIndexOf("(") + 1, stdout.lastIndexOf("%")));
            return percentOfLoss < Constants.ACCEPTABLE_PERCENT_LOSS;
        }
    } else if (platform === Constants.PLATFORM_TYPES.LINUX) {
        const {stdout} = await exec(`ping ${Constants.IP.SERVICE_LAN} -c 4`);
        if (stdout) {
            const percentOfLoss = parseInt(stdout.toString().split('received, ').pop().split("%")[0]);
            return percentOfLoss < Constants.ACCEPTABLE_PERCENT_LOSS;
        }
    }
};
