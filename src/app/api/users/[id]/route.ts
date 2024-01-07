import { NextResponse } from "next/server";
import connectDB from '@/utils/mongo'
import UserModel from "@/models/user"
import { UserGetOne } from "@/schemas/responses/userSchemasResponses";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesUsers, ConstantsResponsesGenerics,  } from "@/utils/constants";
import { idsModelsSchema } from "@/schemas/requests/projectSchemasRequests";
import { updateUserSchema } from "@/schemas/requests/userSchemasRequests";

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
    const user = await UserModel.findById(id)
    let userFetched : UserGetOne;
    if (user){
      userFetched = {
        statusCode:  ConstantsResponsesUsers.GET_BY_PARAM_OK.code,
        statusMessage:  ConstantsResponsesUsers.GET_BY_PARAM_OK.message,
        user: user
      }
    }else {
      userFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        user: user
      }
    }

    return NextResponse.json((userFetched), {
      status: userFetched.statusCode
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
    const user = await UserModel.findByIdAndDelete(id)
    let userFetched : UserGetOne;
    if (user){
      userFetched = {
        statusCode:  ConstantsResponsesUsers.DELETED_OK.code,
        statusMessage:  ConstantsResponsesUsers.DELETED_OK.message,
        user: user
      }
    }else {
      userFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        user: user
      }
    }

    return NextResponse.json((userFetched), {
      status: userFetched.statusCode
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
    const body = await request.json();

    const errorId = idsModelsSchema.validate(id).error
    const  errorBody  = updateUserSchema.validate(body).error
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

    const userUpdated = await UserModel.findByIdAndUpdate(id,
        {
          name: body.name,
          role: body.name,
          password: body.password,
          img: body.img,
        }, {
      returnOriginal: false
    })

    let userFetched : UserGetOne;
    if (userUpdated){
      userFetched = {
        statusCode:  ConstantsResponsesUsers.UPDATED_OK.code,
        statusMessage:  ConstantsResponsesUsers.UPDATED_OK.message,
        user: userUpdated
      }
    }else {
      userFetched = {
        statusCode:  ConstantsResponsesGenerics.NOT_FOUND.code,
        statusMessage:  ConstantsResponsesGenerics.NOT_FOUND.message,
        user: userUpdated
      }
    }

    return NextResponse.json((userFetched), {
      status: userFetched.statusCode
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
