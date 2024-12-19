import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id

  const journal = await prisma?.journalEntry.findUnique({
    where: { id: id },
    include: {
      user: true
    }
  })

  if (!journal) return NextResponse.json({ error: 'Journal not found' }, { status: 404 })

  return NextResponse.json(journal, { status: 200 })
}