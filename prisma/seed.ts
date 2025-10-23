import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  //Buat user admin default
  const password = await bcrypt.hash("admin123", 10);
  const user = await prisma.users.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      username: "Admin",
      email: "admin@example.com",
      password,
    },
  });

  //Genre
  const genres = await prisma.genres.createMany({
    data: [
      { name: "Fantasy" },
      { name: "Sci-Fi" },
      { name: "Romance" },
      { name: "Horror" },
    ],
  });

  //Books
  const fantasy = await prisma.genres.findFirst({ where: { name: "Fantasy" } });
  if (fantasy) {
    await prisma.books.createMany({
      data: [
        {
          title: "The Hobbit",
          writer: "J.R.R. Tolkien",
          publisher: "Allen & Unwin",
          publication_year: 1937,
          description: "Classic fantasy adventure",
          price: 15.99,
          stock_quantity: 20,
          genre_id: fantasy.id,
        },
        {
          title: "The Fellowship of the Ring",
          writer: "J.R.R. Tolkien",
          publisher: "Allen & Unwin",
          publication_year: 1954,
          description: "Lord of the Rings Part 1",
          price: 18.5,
          stock_quantity: 15,
          genre_id: fantasy.id,
        },
      ],
    });
  }

  console.log("Done! Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
