import { NextRequest, NextResponse } from "next/server";
import schema from './schema'
import prisma from "@/prisma/client";

import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = schema.safeParse(body)

  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email: body.email } })

  if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  const password = await bcrypt.hash(body.password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      password
    }
  })

  return NextResponse.json({ email: newUser.email }, { status: 201 })
}