import Joi from "joi";
import { ConstantsStatusProject, ConstantsTypeProject } from "@/utils/constants";
export const createProjectSchema = Joi.object({
    name: Joi.string().required().min(4).max(255),
    type: Joi.string().required().valid(...ConstantsTypeProject),
    bannerPath: Joi.string().required().uri(),
    logo: Joi.string().uri(),
    imagesUrl: Joi.array().items(Joi.string().required().uri()),
    repositoryUrl: Joi.string().required().uri(),
    publishUrl: Joi.string().empty(true).allow(null, ""),
    status: Joi.string().required().valid(...ConstantsStatusProject),
    techStack: Joi.array().items(Joi.string().required()).required(),
    description: Joi.string().required().min(50).max(500),
}).disallow({});
export const updateProjectSchema = Joi.object({
    name: Joi.string().min(4).max(255),
    type: Joi.string().valid(...ConstantsTypeProject),
    bannerPath: Joi.string().uri().empty(true),
    logo: Joi.string().uri(),
    imagesUrl: Joi.array().items(Joi.string().uri()),
    repositoryUrl: Joi.string().uri(),
    publishUrl: Joi.string(),
    status: Joi.string().valid(...ConstantsStatusProject),
    techStack: Joi.array().items(Joi.string().required()),
    description: Joi.string().min(50).max(500)
}).disallow({});

export const idsModelsSchema = Joi.string().regex(/^[a-f0-9]{24}$/);