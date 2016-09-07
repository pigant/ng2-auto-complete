'use strict';

var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var pkg = require('./package.json');

var banner =
`/**
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2016
 * Licensed under ${pkg.license}
 */`;

module.exports = {
  entry: './src/index.ts',
  sourceMap: true,
  moduleId: pkg.name,
  moduleName: pkg.name,

  banner: banner,

  external: [
    'typescript',
    'core-js',
    '@angular/core',
    '@angular/common',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'rxjs/Rx'
  ],

  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    'rxjs/Subject': 'Rx',
    'rxjs/observable/PromiseObservable': 'Rx',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'rxjs/Rx': 'Rx'
  },

  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    sourcemaps()
  ]
}
