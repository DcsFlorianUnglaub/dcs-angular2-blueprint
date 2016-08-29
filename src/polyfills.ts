import 'core-js/shim';
import 'core-js/es7/reflect';
import 'ts-helpers';
import 'zone.js/dist/zone';

if ('production' === ENV) {

} else {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
