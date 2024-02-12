import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';

import defaultRoutes from './routes/default-routes.js';
import adminRoutes from  './routes/admin-routes.js';
import registerRoutes from './routes/register-routes.js';
import questionRoutes from './routes/question-routes.js';
import attendanceRoutes from './routes/attendance-routes.js'

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
app.use(attendanceRoutes);

export default app;