const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Ноутбук', price: 50000 },
  { id: 2, name: 'Смартфон', price: 30000 }
];

app.get('/', (req, res) => {
  res.send('API товаров работает');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});


// ✅ Обновить товар (UPDATE)
app.patch('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  const { name, price } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  res.json(product);
});
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.send('Товар удалён');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});