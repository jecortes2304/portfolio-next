import { NextResponse } from "next/server";
import { ConstantsResponsesGenerics, ConstantsResponsesUsers } from "@/utils/constants";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { UserGetAll, UserSchema } from "@/schemas/responses/userSchemasResponses";
import connectDB from "@/utils/mongo";
import UserModel from "@/models/user";

export async function GET(request: Request) {
    try {
        await connectDB()
        const {searchParams} = new URL(request.url)

        const pageStr = searchParams.get("page");
        const limitStr = searchParams.get("limit")

        const page = pageStr ? parseInt(pageStr, 10) : 1;
        const limit = limitStr ? parseInt(limitStr, 10) : 5;
        const skip = (page - 1) * limit;

        const totalCount = await UserModel.count({})

        const users: UserSchema [] = await UserModel.find({},
            {skip: skip},
            {limit: limit}
        ).sort('createdAt').exec();

        let getAllUsersResponse: UserGetAll = {
            statusCode: ConstantsResponsesUsers.GET_ALL_OK.code,
            statusMessage: ConstantsResponsesUsers.GET_ALL_OK.message,
            users: users,
            details: {
                page: page,
                count: users.length,
                totalItems: totalCount
            }
        }
        return NextResponse.json((getAllUsersResponse), {
            status: ConstantsResponsesUsers.GET_ALL_OK.code
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



