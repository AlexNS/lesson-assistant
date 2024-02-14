import app from './src/server/app.js';

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running');
});