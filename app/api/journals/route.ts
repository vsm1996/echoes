import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from '@/prisma/client'
import { connect } from "http2";
import { unknown } from "zod";

export async function GET(request: NextRequest) {
  const journals = await prisma.journalEntry.findMany()

  return NextResponse.json(journals)
}

export async function POST(request: NextRequest,
  { params: { id } }: { params: { id: string } }) {
  const body = await request.json()

  const validation = schema.safeParse(body)

  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })


  const newJournal = await prisma.journalEntry.create({
    data: {
      title: body.title,
      content: body.content,
      tags: body.tags?.length ? {
        connect: body.tags.map((tag: { id: string }) => ({ id: tag.id }))
      } : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: { id: id }, // Replace with an actual user ID from your database
      },
    }
  })

  NextResponse.json(newJournal, { status: 200 })

}