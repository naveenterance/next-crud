"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert("Title ,content and author  are required.");
      return;
    }
    const test = await fetch(`http://localhost:3000/api/articles/${title}`);

    if (test.ok) {
      alert("Make title more unique.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create an Article");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article Title"
      />

      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article content"
      />
      <input
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article content"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Article
      </button>
    </form>
  );
}
