const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/shop', function (request, response) {
  response.render('pages/shop', { title: 'Shop' })
})
app.get('/product', function (request, response) {
  response.render('pages/product', { title: 'Product' })
})
app.get('/stock', function (request, response) {
  response.render('pages/stock', { title: 'Stock' })
})
app.get('/productonstock', function (request, response) {
  response.render('pages/productonstock', { title: 'Product on Stock' })
})


// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
