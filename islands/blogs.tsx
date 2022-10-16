/** @tsx h */
import { h } from "preact";
import { format } from "https://deno.land/std@0.159.0/datetime/mod.ts";
import { Remult } from "remult";
import { useState } from "preact/hooks";
import { Blog } from "../model/blog.ts";

const remult = new Remult();
const blogRepo = remult.repo(Blog);

export default function Blogs({ data }: { data: Blog[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(data);

  const addBlog = () => {
    setBlogs([...blogs, new Blog()]);
  };

  return (
    <div>
      <h3 class="text-3xl font-bold m-5">
        Blog Admin
      </h3>

      {blogs.map((blog) => {
        const handleChange = (values: Partial<Blog>) => {
          setBlogs(blogs.map((t) => t === blog ? { ...blog, ...values } : t));
        };

        const saveBlog = async () => {
          const savedBlog = await blogRepo.save(blog);
          setBlogs(blogs.map((t) => t === blog ? savedBlog : t));
        };

        const deleteBlog = async () => {
          await blogRepo.delete(blog);
          setBlogs(blogs.filter((t) => t !== blog));
        };

        return (
          <div
            key={blog.id}
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch justify-center p-5 m-5 border rounded"
          >
            <label class="flex w-full h-full flex-col items-start justify-between">
              <span class="font-bold block">
                Title
              </span>

              <input
                type="text"
                value={blog.title}
                onInput={(e) => handleChange({ title: e.currentTarget.value })}
                class="w-full border rounded p-2"
                placeholder="Title"
              />
            </label>

            <label class="flex w-full h-full flex-col items-start justify-between">
              <span class="font-bold block">
                Content
              </span>

              <textarea
                cols={1}
                rows={1}
                onInput={(e) =>
                  handleChange({ content: e.currentTarget.value })}
                class="w-full border rounded p-2"
                placeholder="Content"
              >
                {blog.content}
              </textarea>
            </label>

            <label class="flex w-full h-full flex-col items-start justify-between">
              <span class="font-bold block">
                Created At
              </span>

              <input
                type="datetime-local"
                value={blog.created_at}
                onInput={(e) =>
                  handleChange({
                    created_at: format(
                      new Date(e.currentTarget.value),
                      "yyyy-MM-dd HH:mm",
                    ),
                  })}
                class="w-full border rounded p-2"
              />
            </label>

            <label class="flex w-full h-full flex-col items-start justify-between">
              <span class="font-bold block">
                Is Published
              </span>

              <input
                type="checkbox"
                checked={blog.is_published}
                onClick={(e) =>
                  handleChange({ is_published: !blog.is_published })}
                class="border rounded p-2"
              />
            </label>

            <div className="flex items-center gap-2">
              <button
                class="border rounded p-2 w-max bg-blue-400 text-white font-bold"
                onClick={saveBlog}
              >
                Save
              </button>

              <button
                class="border rounded p-2 w-max bg-red-400 text-white font-bold"
                onClick={deleteBlog}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={addBlog}
        class="border rounded p-2 w-max bg-blue-400 text-white font-bold m-5"
      >
        Add Blog
      </button>
    </div>
  );
}
