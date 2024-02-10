"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Edit = ({ id, Title, Content, Author }) => {
  const [newTitle, setNewTitle] = useState(Title);
  const [newContent, setNewContent] = useState(Content);
  const [newAuthor, setNewAuthor] = useState(Author);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Fix Content-Type header
        },
        body: JSON.stringify({ newTitle, newContent, newAuthor }),
      });

      if (!res.ok) {
        throw new Error("Failed to update article");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)} // Fix function names
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="New Title"
      />

      <input
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="New Content"
      />
      <input
        onChange={(e) => setNewAuthor(e.target.value)}
        value={newAuthor}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="New Author"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
};
export default Edit;
