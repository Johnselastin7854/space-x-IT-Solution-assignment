import { faker } from "@faker-js/faker";

const generateCategory = () => {
  const categoty = [];

  for (let i = 1; i <= 100; i++) {
    categoty.push({
      id: i,
      category: faker.commerce.product(),
    });
  }

  return categoty;
};

export default generateCategory;
