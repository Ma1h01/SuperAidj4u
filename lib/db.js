import { PrismaClient } from "@prisma/client";

// globalThis is a new global object in JavaScript that is available in all environments.
const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
