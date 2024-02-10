import Edit from "@/components/Edit";

const getByTitle = async (title) => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${title}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function EditArticle({ params }) {
  const { title } = params;

  try {
    const articles = await getByTitle(title);

    if (!articles) {
      return <div>Article not found</div>;
    }

    const { _id, content, author } = articles.article;

    return <Edit id={_id} title={title} content={content} author={author} />;
  } catch (error) {
    console.error(error);
    return <div>Error fetching article</div>;
  }
}
