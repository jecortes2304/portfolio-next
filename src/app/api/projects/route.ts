import { NextResponse } from "next/server";
import connectDB from '@/utils/mongo'
import ProjectModel from "@/models/project"
import { ProjectGetAll, ProjectGetOne, ProjectSchema } from "@/schemas/responses/projectSchemasResponses";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesProjects, ConstantsResponsesGenerics,  } from "@/utils/constants";
import { createProjectSchema } from "@/schemas/requests/projectSchemasRequests";

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const pageStr = searchParams.get("page");
    const limitStr = searchParams.get("limit");

    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 5;
    const skip = (page - 1) * limit;

    const totalCount = await ProjectModel.count({})

    const projects: ProjectSchema [] = await ProjectModel.find({},
        {skip: skip},
        {limit: limit}
    ).sort('createdAt').exec();

    let getAllProjectsResponse : ProjectGetAll = {
      statusCode:  ConstantsResponsesProjects.GET_ALL_OK.code,
      statusMessage:  ConstantsResponsesProjects.GET_ALL_OK.message,
      projects:  projects,
      details: {
        page: page,
        count: projects.length,
        totalItems: totalCount
      }
    }

    return NextResponse.json((getAllProjectsResponse), {
      status: ConstantsResponsesProjects.GET_ALL_OK.code
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


export async function PUT(request: Request) {
  try {
    const body: ProjectSchema = await request.json();
    const { error } = createProjectSchema.validate(body)
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
    await connectDB()

    const isProjectExist = await ProjectModel.findOne(
        { $or: [{name: body.name},  { repository_url: body.repositoryUrl} ]}
    );
    if (isProjectExist) {
      let conflictErrorResponse: GenericErrorResponse = {
        statusCode: ConstantsResponsesGenerics.CONFLICT.code,
        statusMessage: ConstantsResponsesGenerics.CONFLICT.message,
        errors: "The project already exist. Be sure of using different name and repository url"
      }
      return NextResponse.json((conflictErrorResponse), {
        status: conflictErrorResponse.statusCode
      });
    }

    const project = new ProjectModel({
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
    })

    const savedProject = await project.save();

    let projectCreated: ProjectGetOne = {
      statusCode:  ConstantsResponsesProjects.CREATED_OK.code,
      statusMessage:  ConstantsResponsesProjects.CREATED_OK.message,
      project: savedProject
    }
    return NextResponse.json((projectCreated), {
      status: projectCreated.statusCode
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

