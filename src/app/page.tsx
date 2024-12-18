import dbConnect from '@/lib/dbConnect';

export default async function Page() {
  try {
    await dbConnect();
    return <div>Database connected successfully!</div>;
  } catch (error) {
    return <div>Failed to connect to the database: {!error}</div>;
  }
}
