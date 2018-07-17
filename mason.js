'use strict';

// Libraries required
const _ = require('underscore');

const _this = this;
_this.elements = [];

_this.buildInput = (template, field) => {
    return _.template(template)({
        id: field,
        label: field,
        type: 'text',
        model: field,
    });
};

_this.buildSelect = (template, field) => {
    return _.template(template)({
        id: field,
        label: field,
        model: field
    });
};

_this.buildTemplate = (templates, input) => {
    var generatedTemplate = '';
    console.log('ele template: ', _this.elements);

    _.each(_this.elements, (field) => {
        // switch (field.inputType) {
        //     case 'text':
        //     case 'password':
        //     case 'number':
        //         generatedTemplate += _this.buildInput(templates.input, fieldId, field);
        //         break;
        //     case 'select':
        //         generatedTemplate += _this.buildSelect(templates.select, fieldId, field);
        //         break;
        //     default:
        //         console.log(field.inputType, 'Input type out of bound');
        // }

        generatedTemplate += _this.buildInput(templates.input, field);
    });

    return _.template(templates.html)({
        component: input.component,
        generatedTemplate: generatedTemplate,
        trigger: input.trigger.value
    });
};

_this.buildController = (template, input) => {
    var result = _this.preparePayload(input.service.payload);
    var payload = JSON.stringify(result).replace(/"/g, '');
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase(),
        models: _.keys(input.form),
        payload: payload
    });
};

_this.preparePayload = function (data) {
    for (var key in data) {
        var item = data[key];
        if (typeof(item) === "string" || !(_.isObject(item)) ) {
            data[key] = 'this.' + key;
            _this.elements.push(key);
        } else if (_.isObject(item) && !(item instanceof Date)) {
            _this.preparePayload(item);
        }
    }
    return data;
};

_this.buildControllerSpec = (template, input) => {
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase(),
        models: _.keys(input.form)
    });
};

_this.buildService = (template, input) => {
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase(),
        url: input.service.url
    });
};

_this.buildServiceSpec = (template, input) => {
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase()
    });
};

module.exports = _this;