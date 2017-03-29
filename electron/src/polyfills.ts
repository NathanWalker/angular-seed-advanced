// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)

// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';

// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone.js');
//Error['stackTraceLimit'] = Infinity;

require('zone.js/dist/long-stack-trace-zone');

// RxJS
// to include every operator uncomment
//require('rxjs/Rx');

require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/observable/throw');

