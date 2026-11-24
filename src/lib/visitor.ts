import { cookies } from "next/headers";
import { VISITOR_COOKIE } from "./visitor-cookie";

export async function getVisitorId(): Promise<string | undefined> {
  return (await cookies()).get(VISITOR_COOKIE)?.value;
}
