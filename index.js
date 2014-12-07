var yaml = require('js-yaml');
var fs = require('fs');
var assign = require('object-assign');
var Promise = require('es6-promise').Promise;

module.exports = function (default_file) {

    return function (pages) {

        return new Promise(function(resolve, reject){

            fs.readFile(default_file, { encoding: 'utf-8' }, function (err, data) {

                var defaults = yaml.load(data);

                pages.forEach(function (val, key) {

                    pages[key] = assign({}, defaults, val);
                });

                resolve(pages);
            });
        });
    };
};
