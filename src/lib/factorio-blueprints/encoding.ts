import { Buffer } from "buffer"
import { Serializable } from "child_process";
import pako from "pako";

const TEXT_DECODER = new TextDecoder();
const VERSION = "0";

export const encodeBlueprint = <T = Serializable>(data: T) => {
  return VERSION + Buffer.from(pako.deflate(JSON.stringify(data))).toString("base64");
}

export const decodeBlueprint = <T = Serializable> (bp: string): T => {
  //const version = bp.charCodeAt(0);
  const data: unknown = JSON.parse(TEXT_DECODER.decode(pako.inflate(Buffer.from(bp.slice(1), "base64"))));

  return data as T;
}
