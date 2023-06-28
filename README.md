# Why no traces? Traceflags 00 edition

Today we wrote some code, told it to send a trace to Honeycomb, and it didn't. No traces, no error message, why???

This happened to us on AWS Lambda, and it could happen other places too. These debugging techniques can be helpful anywhere you're struggling with OpenTelemetry. Here I'll demonstrate them in a tiny Node app.

Here's the least code that should send a span:

```
import opentelemetry from "@opentelemetry/api";

const tracer = opentelemetry.trace.getTracer("jessitron play");
tracer.startSpan("your favorite span").end();
```

