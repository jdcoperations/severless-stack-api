import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import uuid from "uuid";

export async function main(event, context) {
	const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.contactTable,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Item: {
            contactId: uuid.v1(),
            submitted: Date.now(),
            userId: event.requestContext.identity.cognitoIdentityId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        }
     };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}