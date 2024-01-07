import { NextResponse } from "next/server";
import connectDB from '@/utils/mongo'
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesProjects, ConstantsResponsesGenerics, ConstantsResponsesSkills, } from "@/utils/constants";
import { SkillGetAll, SkillGetOne, SkillSchema } from "@/schemas/responses/skillSchemasResponses";
import SkillModel from "@/models/skill";
import { createSkillSchema } from "@/schemas/requests/skillSchemasRequests";

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const pageStr = searchParams.get("page");
    const limitStr = searchParams.get("limit");

    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 5;
    const skip = (page - 1) * limit;

    const totalCount = await SkillModel.count({})

    const skills: SkillSchema [] = await SkillModel.find({},
        {skip: skip},
        {limit: limit}
    ).sort('createdAt').exec();

    let getAllSkillsResponse : SkillGetAll = {
      statusCode:  ConstantsResponsesSkills.GET_ALL_OK.code,
      statusMessage:  ConstantsResponsesSkills.GET_ALL_OK.message,
      skills:  skills,
      details: {
        page: page,
        count: skills.length,
        totalItems: totalCount
      }
    }
    return NextResponse.json((getAllSkillsResponse), {
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
    await connectDB()
    const body: SkillSchema = await request.json();
    const { error } = createSkillSchema.validate(body)
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

    const isSkillExist = await SkillModel.findOne({name: body.name});
    if (isSkillExist) {
      let conflictErrorResponse: GenericErrorResponse = {
        statusCode: ConstantsResponsesGenerics.CONFLICT.code,
        statusMessage: ConstantsResponsesGenerics.CONFLICT.message,
        errors: "The skill already exist"
      }
      return NextResponse.json((conflictErrorResponse), {
        status: conflictErrorResponse.statusCode
      });
    }

    const skill = new SkillModel({
      name: body.name,
      percent: body.percent,
      logo: body.logo
    })

    const savedSkill = await skill.save();

    let skillCreated: SkillGetOne = {
      statusCode:  ConstantsResponsesProjects.CREATED_OK.code,
      statusMessage:  ConstantsResponsesProjects.CREATED_OK.message,
      skill: savedSkill
    }
    return NextResponse.json((skillCreated), {
      status: skillCreated.statusCode
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

