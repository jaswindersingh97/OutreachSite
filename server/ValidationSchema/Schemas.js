const { query } = require('express');
const Joi = require('joi');

const schemas ={
    register: {
        body: Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            }),
        },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
            }),
        },
    createEmailTemplate:{
        body: Joi.object({
            subject: Joi.string().required(),
            textBody: Joi.string().required(),
            htmlBody: Joi.string().required(),
            placeholders: Joi.array().items(Joi.string().required()).optional(),
            }),
        },
    updateEmailTemplate:{
        body: Joi.object({
            subject: Joi.string().optional(),
            textBody: Joi.string().optional(),
            htmlBody: Joi.string().optional(),
            placeholders: Joi.array().items(Joi.string().required()).optional(),
            }),
        },
    getEmailTemplates:{
        },
    deleteEmailTemplate:{
        params: Joi.object({
            templateId: Joi.string().required(),
            }),
        },       

        
};
module.exports = schemas;