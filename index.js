const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// статика
app.use(express.static('public'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// шаблонизатор
app.set('view engine', 'pug');

// connect
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'blog'
});

// main страница
app.get('/', (req, res) => {
    conn.query(
        'SELECT * FROM posts',
        function(err, result) {
            if (!err && result != 0) {
                res.render('main', {
                    posts: JSON.parse(JSON.stringify(result))
                });
            } else {
                res.status(404).send('<h1>no one posts</h1>');
                console.log(err);
            }
        }
    );
});

// одиночная странца
app.get('/post/:id', (req, res) => {
    let id = req.params.id;
    conn.query(
        'SELECT * FROM posts WHERE id='+id,
        function(err, result) {
            if (!err && result != 0) {
                res.render('post', {
                    posts: JSON.parse(JSON.stringify(result))
                });
            } else {
                res.status(404).send('<h1>404 Not found</h1>');
                console.log(err);
            }
        }
    );
});

// запрос на удаление
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    conn.query(
        'DELETE FROM posts WHERE id='+id,
        function(err, result) {
            if (!err && result.affectedRows != 0) {
                res.send(`Пост под id ${id} был удален.`);
            } else {
                res.status(404).send('<h1>404 Not found</h1>');
                console.log(err);
            }
        }
    );
});

// запрос на редактирование
app.post('/update', (req, res) => {
    const data = {
        id: req.body.id,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description
    };
    conn.query(
        `UPDATE posts SET title='${data.title}', date='${data.date}', description='${data.description}' WHERE id=${data.id}`,
        function(err, result) {
            if (!err) {
                res.send('Пост был успешно отредактирован');
            } else {
                res.status(404).send('<h1>404 Not found</h1>');
            }
        }
    );
});

// 404 redirect error
app.use((req, res) => {
    res.status(404).send('<h1>404 Not found</h1>');
});

// слушаем порт
app.listen(3000, () => {
    console.log('listen port 3000...');
});