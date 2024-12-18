import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Explicitly cast global object to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

global.mongoose ||= { conn: null, promise: null };

const cached = global.mongoose;

async function dbConnect(): Promise<Connection | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    try {
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongooseInstance) => {
          return mongooseInstance.connection;
        });
      mongoose.connection.on('error', (error) => {
        console.log('Error after initial db connection:', error);
      });
    } catch (error) {
      console.log('Error in initial db connection:', error);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
