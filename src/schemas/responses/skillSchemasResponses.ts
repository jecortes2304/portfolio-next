import { Details, GenericResponse } from "@/schemas/responses/genericSchemasResponses";

export interface SkillSchema{
    name: string
    percent: number
    logo?: string
}
export interface SkillGetAll extends GenericResponse{
    skills: SkillSchema []
    details: Details
}

export interface SkillGetOne extends GenericResponse{
    skill?: SkillSchema
}