# static-engine-defaults

[![Dependency Status](https://david-dm.org/erickmerchant/static-engine-defaults.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-defaults) [![devDependency Status](https://david-dm.org/erickmerchant/static-engine-defaults/dev-status.svg?style=flat-square)](https://david-dm.org/erickmerchant/static-engine-defaults#info=devDependencies)

This is a plugin for [static-engine](https://github.com/erickmerchant/static-engine). Reads default properties from a file and then uses object-assign to apply them to the existing objects. It should not overwrite existing properties but should set ones that don't exist. Call it with the path to the file and a converter for the content like JSON.parse.

```javascript

var engine = require('static-engine');
var defaults = require('static-engine-defaults');
var cson = require('cson-parser');
var pluginA = require('plugin-a');

engine([
    pluginA,
    defaults('./content/defaults.cson', cson.parse)
]);

```
