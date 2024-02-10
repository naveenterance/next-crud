import Articles from "@/components/Articles";
import Link from "next/link";
import Extra from "@/components/Extra";

export default function Home() {
  return (
    <>
      <Link className="bg-white p-2" href={"/addArticle"}>
        Add Article
      </Link>
      <Articles />
      <Extra />
    </>
  );
}
