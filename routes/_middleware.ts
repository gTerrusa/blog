import { remultFresh } from "remult/remult-fresh";
import { Blog } from "../model/blog.ts";

export const remultServer = remultFresh({
  entities: [Blog],
}, Response);

export const handler = remultServer.handle;
