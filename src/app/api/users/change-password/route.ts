import connectDB from "@/utils/mongo";
import { GenericErrorResponse } from "@/schemas/responses/genericSchemasResponses";
import { ConstantsResponsesGenerics } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB()

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
