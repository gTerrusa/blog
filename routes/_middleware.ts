import { remultFresh } from "remult/remult-fresh";
import { Blog } from "../model/blog.ts";
import { createPostgresConnection } from "https://deno.land/x/remult@v0.16.3-exp.3/postgres.ts";

export const remultServer = remultFresh({
  entities: [Blog],
  dataProvider: async () => {
    const dbUrl = Deno.env.get("DATABASE_URL");
    if (dbUrl) {
      return createPostgresConnection({ connectionString: dbUrl });
    }
    return await undefined;
  },
}, Response);

export const handler = remultServer.handle;