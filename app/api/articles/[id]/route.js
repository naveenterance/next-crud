import connectMongoDB from "@/db/mongodb";
import Article from "@/models/articles";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newContent: content,
    newAuthor: author,
  } = await request.json();
  await connectMongoDB();
  await Article.findByIdAndUpdate(id, { title, content, author });
  return NextResponse.json({ message: "articles updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const articles = await Article.findOne({ _id: id });
  return NextResponse.json({ articles }, { status: 200 });
}
