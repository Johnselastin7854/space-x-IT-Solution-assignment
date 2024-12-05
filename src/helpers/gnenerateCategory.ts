import { faker } from "@faker-js/faker";

interface Category {
  id: number;
  category: string;
}

const generateCategory = () => {
  const categoty: Category[] = [];

  for (let i = 1; i <= 100; i++) {
    categoty.push({
      id: i,
      category: faker.commerce.product(),
    });
  }

  return categoty;
};

export default generateCategory;
