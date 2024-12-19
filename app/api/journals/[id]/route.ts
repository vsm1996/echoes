import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(request: NextRequest,
  { params: { id } }: { params: { id: string } }) {

  const journal = await prisma?.journalEntry.findUnique({
    where: { id: id },
    include: {
      user: true
    }
  })

  if (!journal) return NextResponse.json({ error: 'Journal not found' }, { status: 404 })

  return NextResponse.json(journal, { status: 200 })
}