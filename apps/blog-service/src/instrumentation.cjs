const { NodeSDK } = require("@opentelemetry/sdk-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { AmqplibInstrumentation } = require("@opentelemetry/instrumentation-amqplib");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { FastifyInstrumentation } = require("@opentelemetry/instrumentation-fastify");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const exporter = new JaegerExporter({
  endpoint: `http://jaeger:14268/api/traces`,
});
const sdk = new NodeSDK({
  spanProcessor: new SimpleSpanProcessor(exporter),
  traceExporter: exporter,
  instrumentations: [
    new HttpInstrumentation({ requireParentforOutgoingSpans: false }),
    new FastifyInstrumentation(),
    new AmqplibInstrumentation(),
  ],
  serviceName: "blog-service",
});

sdk.start();
