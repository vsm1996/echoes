import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding the database...");

  // Hash passwords
  const password1 = await bcrypt.hash('securepassword1', 10);
  const password2 = await bcrypt.hash('securepassword2', 10);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: password1,
      avatarUrl: 'https://example.com/avatar1.jpg',
      bio: 'An artist exploring the world of transformation.',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: password2,
      avatarUrl: 'https://example.com/avatar2.jpg',
      bio: 'A creative thinker and journal enthusiast.',
    },
  });

  // Create transformations
  const transformation1 = await prisma.transformation.create({
    data: {
      title: 'Metamorphosis',
      description: 'A visual journey of personal growth.',
      artworkUrl: 'https://example.com/artwork1.jpg',
      userId: user1.id,
    },
  });

  const transformation2 = await prisma.transformation.create({
    data: {
      title: 'Emergence',
      description: 'Stepping into a new chapter of life.',
      artworkUrl: 'https://example.com/artwork2.jpg',
      userId: user2.id,
    },
  });

  // Create journal entries
  const journalEntry1 = await prisma.journalEntry.create({
    data: {
      title: 'Reflection on Change',
      private: true,
      content: 'Today I embraced the idea of transformation.',
      userId: user1.id,
      tags: {
        connectOrCreate: [{ where: { name: 'Reflection' }, create: { name: 'Reflection' } }],
      },
    },
  });

  const journalEntry2 = await prisma.journalEntry.create({
    data: {
      title: 'The Artist\'s Journey',
      private: true,
      content: 'Art has a way of revealing our innermost thoughts.',
      userId: user2.id,
      tags: {
        connectOrCreate: [{ where: { name: 'Art' }, create: { name: 'Art' } }],
      },
    },
  });

  // Create comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'This transformation resonates deeply!',
        userId: user2.id,
        transformationId: transformation1.id,
      },
      {
        content: 'What a beautiful journey.',
        userId: user1.id,
        transformationId: transformation2.id,
      },
    ],
  });

  // Create likes
  await prisma.like.createMany({
    data: [
      { userId: user1.id, transformationId: transformation2.id },
      { userId: user2.id, transformationId: transformation1.id },
    ],
  });

  // Create sessions
  //   await prisma.session.createMany({
  //     data: [
  //       {
  //         sessionToken: 'sessiontoken1',
  //         userId: user1.id,
  //         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
  //       },
  //       {
  //         sessionToken: 'sessiontoken2',
  //         userId: user2.id,
  //         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
  //       },
  //     ],
  //   });

  //   console.log("✅ Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
