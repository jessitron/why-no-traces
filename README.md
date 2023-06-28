# Why no traces? Traceflags 00 edition

Today we wrote some code, told it to send a trace to Honeycomb, and it didn't. No traces, no error message, why???

This happened to us on AWS Lambda, and it could happen other places too. These debugging techniques can be helpful anywhere you're struggling with OpenTelemetry. Here I'll demonstrate them in a tiny Node app.

Here's the least [code](https://github.com/jessitron/why-no-traces/blob/200630747e2d76ef033d70363a0a7df45583b42b/main.js) that should send a span:

```js
const opentelemetry = require("@opentelemetry/api");

const tracer = opentelemetry.trace.getTracer("jessitron play");
tracer.startSpan("your favorite span").end();
```

But, it doesn't send anything.

## Check the span context to see whether the Trace ID is populated.

One thing I always check is: did the span get a Trace ID at all? I print out its SpanContext. In Node, that looks like [this](https://github.com/jessitron/why-no-traces/blob/ea4aab3c953f57bde99c493feff6cb58e669e4bd/main.js):

```js
const opentelemetry = require("@opentelemetry/api");

const tracer = opentelemetry.trace.getTracer("jessitron play");
const span = tracer.startSpan("your favorite span");
console.log("Span Context: " + JSON.stringify(span.spanContext()));
span.end();
```

This gives me the output:

```txt
Span Context: {"traceId":"00000000000000000000000000000000","spanId":"0000000000000000","traceFlags":0}
```

Look at all those zeros! When the Trace ID is all zeros, that means tracing was not initialized.

Sometimes that means tracing was not initialized _yet_. Now and then it takes it a second - not a problem in web servers, but it can trip you up if you're tracing a Node script.

More often it means that I forgot to bring in my tracing initialization code. In my toy [package.json](https://github.com/jessitron/why-no-traces/blob/main/package.json#L7C6-L7C6), I choose to add the require of `tracing.js` because that's where I put the tracing initialization code.

```json
{
  "scripts": {
    "start": "node --require ./tracing.js main.js
  }
}
```

In our AWS Lambda using the [OpenTelemetry Lambda Layer](https://opentelemetry.io/docs/faas/lambda-auto-instrument/) for JavaScript, we had to define the environment variable `AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-handler`. That told Lambda to start the invocation in the layer.

Then we got output like this:

```txt
Span Context: {"traceId":"0da3aa6fe6831e4cc0bf545702195448","spanId":"f726b788cd02eb04","traceFlags":0}
```

It's a real Trace ID! But we still didn't see it in Honeycomb. 😡

