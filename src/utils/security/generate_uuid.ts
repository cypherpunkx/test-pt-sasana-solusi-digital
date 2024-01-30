import { v4 as uuid } from "uuid";

function generateUUID(): string {
  return uuid();
}

export default generateUUID;
