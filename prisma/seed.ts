import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { use } from "react";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const FAKE_POSTS = [
  {
    title: "Post 1",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    userId: "uHUqmb2LmxSGyMusjsIPPzRw15bMhIxc",
  },
  {
    title: "Post 2",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    userId: "uHUqmb2LmxSGyMusjsIPPzRw15bMhIxc",
  },
  {
    title: "Post 3",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    userId: "uHUqmb2LmxSGyMusjsIPPzRw15bMhIxc",
  },
];

const seed = async() => {
    await prisma.post.deleteMany({});

    await prisma.post.createMany({ data: FAKE_POSTS });

    console.log("database seed....")
}

seed()