import { sns } from "../config/aws";

export const sendEmailNotification = async (correo: string, link: string) => {
  const params = {
    Message: `Tienes un nuevo boletín disponible: ${link}`,
    Subject: "Nuevo boletín",
    TopicArn: process.env.SNS_TOPIC_ARN!,
  };

  await sns.publish(params).promise();
};
