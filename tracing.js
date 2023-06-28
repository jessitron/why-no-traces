const nodesdk = require("@opentelemetry/sdk-node");
const api = require("@opentelemetry/api");

api.diag.setLogger(new api.DiagConsoleLogger(), api.DiagLogLevel.DEBUG);

const sdk = new nodesdk.NodeSDK({});

sdk.start();
