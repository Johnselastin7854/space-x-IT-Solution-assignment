import { db } from "~/server/db";
import generateCategory from "~/helpers/gnenerateCategory";

async function main() {
  await db.category.createMany({
    data: generateCategory(),
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
