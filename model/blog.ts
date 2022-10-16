import { Entity, Fields } from "remult";
import { format } from "https://deno.land/std@0.159.0/datetime/mod.ts";

@Entity("blogs", {
  allowApiCrud: true,
})
export class Blog {
  @Fields.uuid()
  id!: string;

  @Fields.string()
  title = "";

  @Fields.string()
  content = "";

  @Fields.boolean()
  is_published = false;

  @Fields.string()
  created_at = format(new Date(), "yyyy-MM-dd HH:mm");
}
