import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

// GET: Fetch all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
