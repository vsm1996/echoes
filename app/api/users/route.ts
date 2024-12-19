import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

import schema from './schema'

// Add request: NextRequest to prevent caching the response data
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()

  // fetch users from a db
  return NextResponse.json(users)
}