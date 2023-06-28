import opentelemetry from "@opentelemetry/api";

console.log("Hello there");

const tracer = opentelemetry.trace.getTracer("jessitron play");
tracer.startSpan("your favorite span").end();

console.log("well that was exciting");
