import opentelemetry from "@opentelemetry/api";

console.log("Hello there");

const tracer = opentelemetry.trace.getTracer("jessitron play");
const span = tracer.startSpan("your favorite span");
console.log("Span Context: " + JSON.stringify(span.spanContext()));
span.end();

console.log("well that was exciting");
