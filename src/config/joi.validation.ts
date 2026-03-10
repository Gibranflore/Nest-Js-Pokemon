import * as  Joi from "joi";

//Estamos obligando que tenga estas variables de entorno
export const joiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAUL_LIMIT: Joi.number().default(6)
})