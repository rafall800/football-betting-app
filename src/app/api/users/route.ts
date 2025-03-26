import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { tryCatch } from '@/lib/try-catch';

// GET: Fetch all users
export async function GET() {
  await dbConnect();

  const { data, error } = await tryCatch(User.find({}));

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data }, { status: 200 });
}
