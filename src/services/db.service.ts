import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const saveBoletin = async (data: any) => {
  const id = uuidv4();

  await db.execute(
    `INSERT INTO boletines (id, mensaje, correo, imagen_url, leido)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.mensaje, data.correo, data.fileUrl, false]
  );

  return id;
};
