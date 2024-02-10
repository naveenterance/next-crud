import connectMongoDB from "@/db/mongodb";
import Article from "@/models/articles";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, content, author } = await request.json();
  await connectMongoDB();
  await Article.create({ title, content, author });
  return NextResponse.json({ message: "article Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const articles = await Article.find();
  return NextResponse.json({ articles });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Article.findByIdAndDelete(id);
  return NextResponse.json({ message: "article deleted" }, { status: 200 });
}
