import Joi from "joi";
export const createSkillSchema = Joi.object({
    name: Joi.string().required().min(4).max(50),
    percent: Joi.number().required().min(1).max(100),
    logo: Joi.string().uri(),
}).disallow({});
export const updateSkillSchema = Joi.object({
    name: Joi.string().min(4).max(50),
    percent: Joi.number().min(1).max(100),
    logo: Joi.string().uri(),
}).disallow({});