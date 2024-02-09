import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';

import defaultRoutes from './routes/defaultRoutes.js';
import adminRoutes from  './routes/adminRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

import { UploadPath } from './config/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(expressLayouts);
app.use(express.static('public'));
app.use('p', express.static(UploadPath));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(defaultRoutes);
app.use(adminRoutes);
app.use(registerRoutes);
app.use(questionRoutes);

export default app;