import { receiveMessages, deleteMessage } from "./services/sqs.service";
import { saveBoletin } from "./services/db.service";
import { sendEmailNotification } from "./services/sns.service";

import dotenv from "dotenv";
dotenv.config();

const processMessages = async () => {
  while (true) {
    try {
      const messages = await receiveMessages();

      for (const msg of messages) {
        if (!msg.Body) continue;

        const data = JSON.parse(msg.Body);

        // 1. Guardar en DB
        const boletinId = await saveBoletin(data);

        // 2. Generar link
        const link = `http://IP:8081/boletines/${boletinId}?correo=${data.correo}`;

        // 3. Enviar notificación
        await sendEmailNotification(data.correo, link);

        // 4. Borrar mensaje
        await deleteMessage(msg.ReceiptHandle!);
      }

    } catch (error) {
      console.error("Error procesando mensajes:", error);
    }
  }
};

processMessages();
