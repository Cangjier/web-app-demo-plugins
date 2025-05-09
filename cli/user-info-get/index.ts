import { UTF8Encoding } from "../../.tsc/System/Text/UTF8Encoding";
import { args, setLoggerPath } from "../../.tsc/Context";
import { File } from "../../.tsc/System/IO/File";
import { IUserInfomation } from "../interfaces";

let parameters = {} as { [key: string]: string };
let utf8 = new UTF8Encoding(false);
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(parameters);

let inputPath = parameters.i ?? parameters.input;
let outputPath = parameters.o ?? parameters.output;
let loggerPath = parameters.l ?? parameters.logger;
if (loggerPath != undefined && loggerPath.length != 0) {
    setLoggerPath(loggerPath);
}

let main = async () => {
    const userInfo: IUserInfomation = {
        isLogin: false,
        name: "test",
        id: "1234567890",
        email: "test@test.com"
    };
    File.WriteAllTextAsync(outputPath, JSON.stringify(userInfo), utf8);
};

await main();
