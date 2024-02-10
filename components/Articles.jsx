"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Remove from "./Remove";

const getArticles = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const { articles } = await getArticles();
    setArticles(articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {articles.map((item) => (
        <div
          key={item._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{item.title}</h2>
            <div>{item.content}</div>
            <div>{item.author}</div>
          </div>

          <div className="flex gap-2">
            <Remove id={item._id} />
            <Link href={`/editArticle/${item._id}`}>edit</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ArticleList;
