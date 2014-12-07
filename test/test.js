var mock = require('mock-fs');
var assert = require('chai').assert;
var defaults = require('../index.js');

beforeEach(function() {

    mock({
        './test/content/defaults.yaml': "alpha: a\nbeta: b\ngamma: c\n"
    });
});

describe('plugin', function(){

    it('it should affect all pages', function(done){

        var plugin = defaults('./test/content/defaults.yaml');

        plugin([{}, {}, {}]).then(function(pages){

            assert.deepEqual(pages, [
                {alpha: 'a', beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 'c'}
            ]);

            done();
        });
    });

    it('it should not overwrite existing properties', function(done){

        var plugin = defaults('./test/content/defaults.yaml');

        plugin([{alpha: 1}, {beta: 2}, {gamma: 3}]).then(function(pages){

            assert.deepEqual(pages, [
                {alpha: 1, beta: 'b', gamma: 'c'},
                {alpha: 'a', beta: 2, gamma: 'c'},
                {alpha: 'a', beta: 'b', gamma: 3}
            ]);

            done();
        });
    });
});
