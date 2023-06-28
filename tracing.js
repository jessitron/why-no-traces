const nodesdk = import("@opentelemetry/sdk-node");

const sdk = new nodesdk.NodeSDK({});

sdk.start();
