import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function (req, res) {
  res.render('admin');
});

app.get('/api/test', function (req, res) {
  res.render('hello world');
});

export default app;