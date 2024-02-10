import connectMongoDB from "@/db/mongodb";
import Article from "@/models/articles";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const {
    newTitle: title,
    newContent: content,
    newAuthor: author,
  } = await request.json();
  await connectMongoDB();

  await Article.findOneAndUpdate(params, {
    title,
    content,
    author,
  });
  return NextResponse.json({ message: "Article updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { title } = params;
  await connectMongoDB();

  const article = await Article.findOne({ title });

  if (article) {
    return NextResponse.json({ article }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }
}
