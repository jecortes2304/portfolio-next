import { NextResponse } from "next/server";
import connectDB from '@/utils/mongo'
import SkillModel from "@/models/skill"
import { SkillGetOne, SkillSchema } from "@/schemas/responses/skillSchemasResponses";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesSkills, ConstantsResponsesGenerics,  } from "@/utils/constants";
import { idsModelsSchema } from "@/schemas/requests/projectSchemasRequests";
import { updateSkillSchema } from "@/schemas/requests/skillSchemasRequests";

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
    const skill = await SkillModel.findById(id)
    let skillFetched : SkillGetOne;
    if (skill){
      skillFetched = {
        statusCode:  ConstantsResponsesSkills.GET_BY_PARAM_OK.code,
        statusMessage:  ConstantsResponsesSkills.GET_BY_PARAM_OK.message,
        skill: skill
      }
    }else {
      skillFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        skill: skill
      }
    }

    return NextResponse.json((skillFetched), {
      status: skillFetched.statusCode
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
    const skill = await SkillModel.findByIdAndDelete(id)
    let skillFetched : SkillGetOne;
    if (skill){
      skillFetched = {
        statusCode:  ConstantsResponsesSkills.DELETED_OK.code,
        statusMessage:  ConstantsResponsesSkills.DELETED_OK.message,
        skill: skill
      }
    }else {
      skillFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        skill: skill
      }
    }

    return NextResponse.json((skillFetched), {
      status: skillFetched.statusCode
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
    const body: SkillSchema = await request.json();

    const errorId = idsModelsSchema.validate(id).error
    const  errorBody  = updateSkillSchema.validate(body).error
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

    if (body.name){
      const isSkillExist = await SkillModel.findOne({ name: body.name });
      if (isSkillExist) {
        let conflictErrorResponse: GenericErrorResponse = {
          statusCode: ConstantsResponsesGenerics.CONFLICT.code,
          statusMessage: ConstantsResponsesGenerics.CONFLICT.message,
          errors: `The skill with -name: ${body.name}- already exists`
        }
        return NextResponse.json((conflictErrorResponse), {
          status: conflictErrorResponse.statusCode
        });
      }
    }

    const skillUpdated = await SkillModel.findByIdAndUpdate(id,
        {
          name: body.name,
          percent: body.percent,
          logo: body.logo,
        }, {
      returnOriginal: false
    })

    let skillFetched : SkillGetOne;
    if (skillUpdated){
      skillFetched = {
        statusCode:  ConstantsResponsesSkills.UPDATED_OK.code,
        statusMessage:  ConstantsResponsesSkills.UPDATED_OK.message,
        skill: skillUpdated
      }
    }else {
      skillFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        skill: skillUpdated
      }
    }

    return NextResponse.json((skillFetched), {
      status: skillFetched.statusCode
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
