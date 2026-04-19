import { sqs } from "../config/aws";

export const receiveMessages = async () => {
  const params = {
    QueueUrl: process.env.SQS_URL!,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  };

  const data = await sqs.receiveMessage(params).promise();

  return data.Messages || [];
};

export const deleteMessage = async (receiptHandle: string) => {
  await sqs.deleteMessage({
    QueueUrl: process.env.SQS_URL!,
    ReceiptHandle: receiptHandle,
  }).promise();
};
