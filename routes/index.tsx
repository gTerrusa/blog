/** @tsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Blogs from "../islands/blogs.tsx";
import { Blog } from "../model/blog.ts";
import { remultServer } from "./_middleware.ts";

export const handler: Handlers<Blog[]> = {
  async GET(req, ctx) {
    const remult = await remultServer.getRemult(req);
    return ctx.render(await remult.repo(Blog).find());
  },
};

export default function Home({ data }: PageProps<Blog[]>) {
  return (
    <div>
      <Blogs data={data} />
    </div>
  );
}
