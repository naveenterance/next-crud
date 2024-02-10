import connectMongoDB from "@/db/mongodb";
import Article from "@/models/articles";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const {
    title: title,
    content: content,
    author: author,
  } = await request.json();
  await connectMongoDB();
  const existingArticle = await Article.findOne({ title: params.title });

  console.log(existingArticle);
  const articleId = existingArticle._id.toString();
  console.log(articleId);

  await Article.findByIdAndUpdate(articleId, {
    title,
    content,
    author,
  });
  return NextResponse.json({ message: "Article updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { title } = params;
  await connectMongoDB();
  // console.log({ title });

  const article = await Article.findOne({ title });

  if (article) {
    return NextResponse.json({ article }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }
}
