import { NextResponse } from "next/server";
import connectDB from '@/utils/mongo'
import ProjectModel from "@/models/project"
import { ProjectGetOne, ProjectSchema } from "@/schemas/responses/projectSchemasResponses";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesProjects, ConstantsResponsesGenerics,  } from "@/utils/constants";
import { idsModelsSchema, updateProjectSchema } from "@/schemas/requests/projectSchemasRequests";

export async function GET(request: Request,  { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const id = params.id;
    const { error } = idsModelsSchema.validate(id)
    if (error){
      let badRequestErrorResponse: GenericErrorResponse = {
        statusCode: ConstantsResponsesGenerics.BAD_REQUEST.code,
        statusMessage: ConstantsResponsesGenerics.BAD_REQUEST.message,
        errors: error.details[0].message
      }
      return NextResponse.json((badRequestErrorResponse), {
        status: badRequestErrorResponse.statusCode
      });
    }
    const project = await ProjectModel.findById(id)
    let projectFetched : ProjectGetOne;
    if (project){
      projectFetched = {
        statusCode:  ConstantsResponsesProjects.GET_BY_PARAM_OK.code,
        statusMessage:  ConstantsResponsesProjects.GET_BY_PARAM_OK.message,
        project: project
      }
    }else {
      projectFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        project: project
      }
    }

    return NextResponse.json((projectFetched), {
      status: projectFetched.statusCode
    });
  } catch (error: any) {
    let errorResponse: GenericErrorResponse = {
      statusCode: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code,
      statusMessage: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.message,
      errors: error.toString()
    };
    return NextResponse.json((errorResponse), {
      status: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code
    });
  }
}


export async function DELETE(request: Request,  { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const id = params.id;
    const { error } = idsModelsSchema.validate(id)
    if (error){
      let badRequestErrorResponse: GenericErrorResponse = {
        statusCode: ConstantsResponsesGenerics.BAD_REQUEST.code,
        statusMessage: ConstantsResponsesGenerics.BAD_REQUEST.message,
        errors: error.details[0].message
      }
      return NextResponse.json((badRequestErrorResponse), {
        status: badRequestErrorResponse.statusCode
      });
    }
    const project = await ProjectModel.findByIdAndDelete(id)
    let projectFetched : ProjectGetOne;
    if (project){
      projectFetched = {
        statusCode:  ConstantsResponsesProjects.DELETED_OK.code,
        statusMessage:  ConstantsResponsesProjects.DELETED_OK.message,
        project: project
      }
    }else {
      projectFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        project: project
      }
    }

    return NextResponse.json((projectFetched), {
      status: projectFetched.statusCode
    });
  } catch (error: any) {
    let errorResponse: GenericErrorResponse = {
      statusCode: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code,
      statusMessage: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.message,
      errors: error.toString()
    };
    return NextResponse.json((errorResponse), {
      status: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code
    });
  }
}


export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const id = params.id;
    const body: ProjectSchema = await request.json();

    const errorId = idsModelsSchema.validate(id).error
    const  errorBody  = updateProjectSchema.validate(body).error
    let badRequestErrorResponse: GenericErrorResponse = {
      statusCode: ConstantsResponsesGenerics.BAD_REQUEST.code,
      statusMessage: ConstantsResponsesGenerics.BAD_REQUEST.message,
    }
    if (errorId){
       badRequestErrorResponse.errors = errorId.details[0].message
      return NextResponse.json((badRequestErrorResponse), {
        status: badRequestErrorResponse.statusCode
      });
    }
    if (errorBody){
      badRequestErrorResponse.errors = errorBody.details[0].message
      return NextResponse.json((badRequestErrorResponse), {
        status: badRequestErrorResponse.statusCode
      });
    }

    if (body.name || body.repositoryUrl){
      const isProjectExist = await ProjectModel.findOne(
          { $or: [{name: body.name},  { repository_url: body.repositoryUrl} ]}
      );
      if (isProjectExist) {
        let conflictErrorResponse: GenericErrorResponse = {
          statusCode: ConstantsResponsesGenerics.CONFLICT.code,
          statusMessage: ConstantsResponsesGenerics.CONFLICT.message,
          errors: `The project with\
          ${body.name ? "-name: " + body.name + "-": ""}\
          ${body.repositoryUrl ? "-repositoryUrl: " + body.repositoryUrl + "-": ""}\
          already exists. Be sure of using different name and repository url`
        }
        return NextResponse.json((conflictErrorResponse), {
          status: conflictErrorResponse.statusCode
        });
      }
    }

    const projectUpdated = await ProjectModel.findByIdAndUpdate(id,
        {
          name: body.name,
          type: body.type,
          banner_path: body.bannerPath,
          logo: body.logo,
          images_url: body.imagesUrl,
          repository_url: body.repositoryUrl,
          publish_url: body.publishUrl,
          status: body.status,
          tech_stack: body.techStack,
          description: body.description
        }, {
      returnOriginal: false
    })

    let projectFetched : ProjectGetOne;
    if (projectUpdated){
      projectFetched = {
        statusCode:  ConstantsResponsesProjects.UPDATED_OK.code,
        statusMessage:  ConstantsResponsesProjects.UPDATED_OK.message,
        project: projectUpdated
      }
    }else {
      projectFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        project: projectUpdated
      }
    }

    return NextResponse.json((projectFetched), {
      status: projectFetched.statusCode
    });
  } catch (error: any) {
    let errorResponse: GenericErrorResponse = {
      statusCode: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code,
      statusMessage: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.message,
      errors: error.toString()
    };
    return NextResponse.json((errorResponse), {
      status: ConstantsResponsesGenerics.INTERNAL_SERVER_ERROR.code
    });
  }
}
