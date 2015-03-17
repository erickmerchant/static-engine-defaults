var mock = require('mock-fs');
var assert = require('assert');
var defaults = require('../index.js');

beforeEach(function() {

    mock({
        './test/content/defaults.json': '{ "alpha": "a", "beta": "b", "gamma": "c" }'
    });
});

describe('plugin', function(){

    it('it should affect all pages', function(done){

        var plugin = defaults('./test/content/defaults.json', JSON.parse);

        plugin([{}, {}, {}], function(err, pages){

            assert.deepEqual(pages, [
                {alpha: 'a', beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 'c'}
            ]);

            done();
        });
    });

    it('it should not overwrite existing properties', function(done){

        var plugin = defaults('./test/content/defaults.json', JSON.parse);

        plugin([{alpha: 1}, {beta: 2}, {gamma: 3}], function(err, pages){

            assert.deepEqual(pages, [
                {alpha: 1, beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 2, gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 3}
            ]);

            done();
        });
    });
});
