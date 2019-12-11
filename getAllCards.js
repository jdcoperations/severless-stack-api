import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.resincardTable,
    Item: {
      ProjectionExpression: "cardId, heading, description, availAction, category, picUrl"
    }
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    /*Key: {
      cardId: event.pathParameters.id
    }*/
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    console.log("***Result:" + result.Items[1].cardId);
    /*for (var key in result.Items[1]) {
      console.log(key);
    }
    for result.Items.ForEach(function(resincard) {
      console.log("foreach:" + resincard.cardId);
    });*/
    if (result.Items) {
      // Return the retrieved item
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}