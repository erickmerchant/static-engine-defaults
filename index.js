var yaml = require('js-yaml');
var fs = require('fs');
var interpolate = require('interpolate');
var moment = require('moment');
var assign = require('object-assign');

module.exports = function (app, default_file) {

    var route = function (name, args) {

        if (!app.routes.hasOwnProperty(name) || !app.routes[name].route) return '';

        return interpolate(app.routes[name].route, args || {});
    };

    var now = moment();

    return function (pages, next) {

        fs.readFile(default_file, { encoding: 'utf-8' }, function (err, data) {

            var defaults = yaml.load(data);

            defaults.route = route;

            defaults.now = now;

            pages.forEach(function (val, key) {

                pages[key] = assign(val, defaults);
            });

            next(pages);
        });
    };
};
