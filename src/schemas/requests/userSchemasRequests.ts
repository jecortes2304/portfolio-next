import Joi from "joi";
import { ConstantsRoles } from "@/utils/constants";
export const createUserSchema = Joi.object({
    username: Joi.string().required().min(4).max(50),
    name: Joi.string().required().min(4).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(50),
    role: Joi.string().required().valid(ConstantsRoles.ADMIN.role, ConstantsRoles.GUEST.role),
    img: Joi.string().uri(),
}).disallow({});
export const updateUserSchema = Joi.object({
    name: Joi.string().min(4).max(50),
    password: Joi.string().min(4).max(50),
    role: Joi.string().valid(ConstantsRoles.ADMIN.role, ConstantsRoles.GUEST.role),
    img: Joi.string().uri(),
}).disallow({});