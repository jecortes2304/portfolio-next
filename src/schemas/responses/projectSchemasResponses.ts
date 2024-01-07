import { Details, GenericResponse } from "@/schemas/responses/genericSchemasResponses";

export interface ProjectSchema{
    name: string
    type: string
    bannerPath: string
    logo?: string
    imagesUrl?: string []
    repositoryUrl: string
    publishUrl?: string
    status: string
    techStack: string []
    description: string
}
export interface ProjectGetAll extends GenericResponse{
    projects: ProjectSchema []
    details: Details
}

export interface ProjectGetOne extends GenericResponse{
    project?: ProjectSchema
}