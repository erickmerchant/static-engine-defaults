var yaml = require('js-yaml');
var fs = require('fs');
var assign = require('object-assign');

module.exports = function (default_file) {

    return function (pages, done) {

        fs.readFile(default_file, { encoding: 'utf-8' }, function (err, data) {

            if(err) {
                done(err);
            }
            else {

                var defaults = yaml.load(data);

                pages.forEach(function (val, key) {

                    pages[key] = assign({}, defaults, val);
                });

                done(null, pages);
            }
        });
    };
};
