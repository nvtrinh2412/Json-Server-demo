const faker = require('faker');
const fs = require('fs');
faker.loccale = 'vi';


const randomCategoryList = (n) => {
    let categoryList = [];
  if (n<= 0) return;
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
  if(numberOfProducts<=0 || categoryList == null) return;
  let productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
       id : faker.random.uuid(),
      name : faker.commerce.productName(),
      price : faker.commerce.price(),
      description : faker.lorem.sentence(),
      thumbnailUrl : faker.image.imageUrl(400,400),
      categoryId: category.id ,
      };
      productList.push(product);
      
    })
  
  }
  return productList
}
(() => {
  const categoryList = randomCategoryList(5);
  const db = {
    categories: categoryList,
    products: randomProductList(categoryList, 10),
    profile: {
      name: 'Pro'
    },
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Done!');
  });
})()

// console.log(faker.commerce.productName());