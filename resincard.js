import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import uuid from "uuid";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.resincardTable,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Item: {
            cardId: uuid.v1(),
            picUrl: data.picUrl,
            heading: data.heading,
            description: data.description,
            category: data.category,
            price: data.price,
            availAction: data.availAction
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