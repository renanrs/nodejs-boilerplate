const Prometheus = require('prom-client')
    , httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

const _handleError = ( req, res, body, statusCode ) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels([req.method, req.url, res.statusCode])
    .observe(responseTimeInMs);

  return res.status( statusCode || 500 ).send( body );
};

const _handleSuccess = ( req, res, body, statusCode ) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels([req.method, req.url, res.statusCode])
    .observe(responseTimeInMs);

  return res.status( statusCode || 200 ).send( body );
};

module.exports = {
    handleError: _handleError
  , handleSuccess: _handleSuccess
};