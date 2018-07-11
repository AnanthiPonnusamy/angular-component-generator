'use strict';

// Libraries required
const fs = require('fs');
const _ = require('underscore');

const _this = this;

// Load templates
_this.loadTemplates = () => {
    return new Promise((resolve, reject) => {
        const templatePaths = fs.readdirSync('./templates');
        const templates = {};

        templatePaths.forEach((path, index) => {
            fs.readFile('./templates/' + path, 'utf8', (err, content) => {
                templates[path] = content;
                path === _.last(templatePaths) ? resolve(templates) : console.log(path + ' template ' + 'loaded');
                err ? reject(path) : '';
            });
        });
    });
};

// Load Input.json for meta data
_this.loadInput = (input) => {
    return new Promise((resolve, reject) => {
        fs.readFile(input, 'utf8', (err, content) => {
            err ? reject(err) : resolve(JSON.parse(content));
        });
    });
};

module.exports = _this;