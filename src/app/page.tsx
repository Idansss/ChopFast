import { redirect } from "next/navigation";

// The homepage is the main (main) layout — redirect there
export default function RootPage() {
  redirect("/home");
}
