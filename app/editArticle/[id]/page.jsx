import Edit from "@/components/Edit";

const getById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditArticle({ params }) {
  const { id } = params;
  const { articles } = await getById(id);
  const { title, content, author } = articles;

  return <Edit id={id} title={title} content={content} author={author} />;
}
