import { prisma } from '../src/utils/prisma.service';
import { Prisma } from '@prisma/client';

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'Jacob Gifford',
    age: 25,
    level: 'intermediate',
    email: 'giffordjacob0@gmail.com',
    preferences: {
      stuff: 'stuff',
    },
  },
  {
    username: 'Guest',
    age: 25,
    level: 'intermediate',
    email: 'jaegif2@gmail.com',
    preferences: {
      stuff: 'stuff',
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
