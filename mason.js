'use strict';

// Libraries required
const _ = require('underscore');

const _this = this;

_this.buildInput = (template, fieldId, field) => {
    return _.template(template)({
        id: fieldId,
        label: field.label,
        type: field.inputType,
        model: fieldId,
        classes: field.classes
    });
};

_this.buildSelect = (template, fieldId, field) => {
    return _.template(template)({
        id: fieldId,
        label: field.label,
        model: fieldId,
        classes: field.classes,
        options: field.options
    });
};

_this.buildTemplate = (templates, input) => {
    var generatedTemplate = '';

    _.each(input.form, (field, fieldId) => {
        switch (field.inputType) {
            case 'text':
            case 'password':
            case 'number':
                generatedTemplate += _this.buildInput(templates.input, fieldId, field);
                break;
            case 'select':
                generatedTemplate += _this.buildSelect(templates.select, fieldId, field);
                break;
            default:
                console.log(field.inputType, 'Input type out of bound');
        }
    });

    return _.template(templates.html)({
        component: input.component,
        generatedTemplate: generatedTemplate,
        trigger: input.trigger.value
    });
};

_this.buildController = (template, input) => {
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase(),
        models: _.keys(input.form),
        payload: JSON.stringify(input.service.payload)
    });
};

_this.buildService = (template, input) => {
    return _.template(template)({
        component: input.component,
        fileName: input.component.toLowerCase(),
        url: input.service.url
    });
};

module.exports = _this;