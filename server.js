const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar el middleware CORS
const sequelize = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const sharedRoutes = require('./routes/sharedRoutes')

const app = express();
app.use(bodyParser.json());

// Configuración de CORS para permitir el acceso desde el puerto 4200 (frontend)
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Rutas
app.use('/api', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', sharedRoutes);

// Sincronización con la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch(err => console.error('Error al sincronizar la base de datos:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
