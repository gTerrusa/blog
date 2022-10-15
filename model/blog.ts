import { Entity, Fields } from "remult";
import { dateToDateTimeField } from "../utils/date.ts";

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
  created_at = dateToDateTimeField(new Date());
}
