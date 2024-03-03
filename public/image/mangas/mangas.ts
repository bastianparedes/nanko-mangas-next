const products = [
  {
    "name": "Nana Volume 1",
    "picture": "nana.jpg",
    "price": 5000,
    "priceSale": 4000,
    "visible": true,
  },
  {
    "name": "Nana Volume 2",
    "picture": "nana.jpg",
    "price": 5000,
    "visible": false,
  },
  {
    "name": "Nana Volume 3",
    "picture": "nana.jpg",
    "price": 5000,
    "priceSale": 2000,
    "visible": true,
  },
  {
    "name": "Shaman king volume 1",
    "picture": "shaman_king.webp",
    "price": 5000,
    "visible": true,
  },
  {
    "name": "Shaman king volume 2",
    "picture": "shaman_king.webp",
    "price": 5000,
    "visible": true,
  },
  {
    "name": "Shaman king volume 3",
    "picture": "shaman_king.webp",
    "price": 5000,
    "visible": true,
  },
  {
    "name": "Made in abyss Volume 1",
    "picture": "made_in_abyss.jpg",
    "price": 5000,
    "visible": true,
  },
  {
    "name": "Made in abyss Volume 2",
    "picture": "made_in_abyss.jpg",
    "price": 5000,
    "visible": true,
  },
  {
    "name": "Made in abyss Volume 3",
    "picture": "made_in_abyss.jpg",
    "price": 5000,
    "visible": true,
  },
];

const filteredProducts = products.filter((product) => product.visible);
export default filteredProducts;
