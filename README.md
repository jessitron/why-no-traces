# Why no traces? Traceflags 00 edition

Today we wrote some code, told it to send a trace to Honeycomb, and it didn't. No traces, no error message, why???

This happened to us on AWS Lambda, and it could happen other places too. These debugging techniques can be helpful anywhere you're struggling with OpenTelemetry. Here I'll demonstrate them in a tiny Node app.

Here's the least [code](https://github.com/jessitron/why-no-traces/blob/200630747e2d76ef033d70363a0a7df45583b42b/main.js) that should send a span:

```
import opentelemetry from "@opentelemetry/api";

const tracer = opentelemetry.trace.getTracer("jessitron play");
tracer.startSpan("your favorite span").end();
```

But, it doesn't send anything.

## Check the span context to see whether the Trace ID is populated.

One thing I always check is: did the span get a Trace ID at all? I print out its SpanContext. In Node, that looks like this:

```
import opentelemetry from "@opentelemetry/api";

const tracer = opentelemetry.trace.getTracer("jessitron play");
const span = tracer.startSpan("your favorite span");
console.log("Span Context: " + JSON.stringify(span.spanContext()));
span.end();
```

This gives me the output:

```
Span Context: {"traceId":"00000000000000000000000000000000","spanId":"0000000000000000","traceFlags":0}
```

Look at all those zeros! When the Trace ID is all zeros, that means tracing was not initialized.

Sometimes that means tracing was not ini
