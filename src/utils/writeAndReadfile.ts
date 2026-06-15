import fs from "fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { type applicationType } from "../types/types.js";
import { AppError } from "./AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.join(__dirname, "../data/data.json");
const readFile = async () => {
  try {
    const data = await fs.readFile(filepath, "utf8");
    if (!data || data.trim() === "") {
      return [];
    }
    return JSON.parse(data); //converts raw data into readable array
  } catch (error) {
    throw new AppError(404, "no data avaialble in database");
  }
};

const writeFile = async (data: applicationType[]) => {
  try {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2)); //adds line break and two space indendation
  } catch (error) {
    throw new Error("something went wrong while writing data");
  }
};
export { readFile, writeFile };
