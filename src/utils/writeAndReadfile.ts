import fs from "fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { type applicationType } from "../types/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.join(__dirname, "../data/data.json");
const readFile = async (): Promise<applicationType[]> => {
  try {
    const data = await fs.readFile(filepath, "utf8");
    return JSON.parse(data); //converts raw data into readable array
  } catch (error) {
    console.log("Cant read file");
    return [];
  }
};

const writeFile = async (data: applicationType[]) => {
  try {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2)); //adds line break and two space indendation
  } catch (error) {
    console.log("cannt write");
  }
};
export { readFile, writeFile };
