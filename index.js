var yaml = require('js-yaml');
var fs = require('fs');
var assign = require('object-assign');

module.exports = function (defaultFile, converter) {

    if(typeof converter == 'undefined') {

        converter = function(content) {

            return yaml.load(content);
        }
    }

    return function (pages, done) {

        fs.readFile(defaultFile, { encoding: 'utf-8' }, function (err, data) {

            var defaults;

            if(err) {
                done(err);
            }
            else {

                try {

                    defaults = converter(data);

                    pages.forEach(function (val, key) {

                        pages[key] = assign({}, defaults, val);
                    });

                    done(null, pages);
                }
                catch(e) {

                    done(e);
                }
            }
        });
    };
};
