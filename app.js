'use strict';

// Libraries required
const fs = require('fs');
const rimraf = require('rimraf');
const fformat = require('fformat');

// Custom Modules required
const preloader = require('./preloader.js');
const mason = require('./mason.js');

// Clear output directory
rimraf('output/*', () => {
  console.log('Cleared output folder');
})

// Constructing compiled templates
preloader.loadTemplates().then((templates) => {
  preloader.loadInput(process.argv[2]).then((input) => {
    // write content to html file
    fs.writeFile('./output/' + input.component.toLowerCase() + '.component.html',
      mason.buildTemplate(templates, input),
      'utf8', (err) => {
        if (err) throw err;
        console.log('HTML saved successfully');
      });

    // write content to controller file
    fs.writeFile('./output/' + input.component.toLowerCase() + '.component.js',
      mason.buildController(templates.controller, input),
      'utf8', (err) => {
        if (err) throw err;
        console.log('Controller saved successfully');
      });

    // write content to service file
    fs.writeFile('./output/' + input.component.toLowerCase() + '.service.js',
      mason.buildService(templates.service, input),
      'utf8', (err) => {
        if (err) throw err;
        console.log('Service saved successfully');
      });

    // format the files with proper indentation using fformat module
    fformat('./output');

  }, (err) => {
    console.log('Error loading input json');
  })
}, (err) => {
  console.log('Error loading template: ' + path)
});
