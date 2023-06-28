const nodesdk = require("@opentelemetry/sdk-node");

const sdk = new nodesdk.NodeSDK({});

sdk.start();
