"use client";
import { useRouter } from "next/navigation";

const Remove = ({ id }) => {
  const router = useRouter();
  const removeArticle = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/articles?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeArticle} className="text-red-400">
      delete
    </button>
  );
};

export default Remove;
