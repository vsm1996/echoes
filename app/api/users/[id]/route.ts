import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import bcrypt from 'bcrypt'

import schema from '../schema'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const id = (await params).id

  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      journalEntries: true,
      transformations: true,
    }
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json(user, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const body = await request.json()

  const validation = schema.safeParse(body)

  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })


  const existingUser = await prisma.user.findUnique({
    where: { id: id }
  })

  if (!existingUser) return NextResponse.json({ error: 'User not found' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      username: body.username,
      password: hashedPassword,
    }
  })

  return NextResponse.json(updatedUser, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  // Fetch user from db
  const user = await prisma.user.findUnique({
    where: { id: id }
  })
  // If not found, return 404
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  // Else delete user from db
  const deletedUser = await prisma.user.delete({
    where: { id: id }
  })
  // Return 200
  return NextResponse.json(deletedUser, { status: 200 })
}
