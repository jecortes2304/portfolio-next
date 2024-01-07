import { Details, GenericResponse } from "@/schemas/responses/genericSchemasResponses";

export interface UserSchema{
    username: string
    name: string
    email: string
    password: string
    role: string
    img?: string
}
export interface UserGetAll extends GenericResponse{
    users: UserSchema []
    details: Details
}

export interface UserGetOne extends GenericResponse{
    user?: UserSchema
}