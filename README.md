Backend de Gestión de Recetas y Comentarios
Este backend permite gestionar recetas y comentarios para una aplicación de cocina. Utiliza Node.js con Express y Sequelize para interactuar con una base de datos MySQL. A través de esta API, los usuarios pueden buscar recetas por diferentes criterios, agregar nuevas recetas y comentarios, y obtener categorías predefinidas.

Funcionalidad General
Este backend ofrece las siguientes funcionalidades principales:

Gestión de Recetas: Permite agregar, buscar, y filtrar recetas por diferentes parámetros, como el nombre del platillo, la categoría, y el país de origen.
Gestión de Comentarios: Permite a los usuarios agregar y ver comentarios asociados a recetas específicas.
Integración con API externa: Incluye un endpoint para guardar recetas desde una API externa en la base de datos.

Configuración de CORS: Permite que el frontend, alojado en http://localhost:4200, acceda a esta API.

Endpoints

Endpoints para Recetas (recipeRoutes)

Obtener una receta por ID

URL: GET /api/recipes/:id

Descripción: Devuelve una receta específica basada en su ID.
Respuesta: JSON de la receta solicitada o un mensaje de error si no se encuentra.

Agregar una nueva receta

URL: POST /api/recipes

Descripción: Añade una nueva receta a la base de datos.

Body (JSON):
{
  "strMeal": "Nombre de la receta",
  "strCategory": "Categoría",
  "strInstructions": "Pasos de la receta",
  "strArea": "País de origen",
  "strMealThumb": "URL de imagen",
  "strTags": "Etiquetas"
}

Respuesta: JSON con la receta creada. Buscar recetas por nombre del platillo URL: GET /api/search?name=:name Descripción: Busca recetas por el nombre del platillo (parcial o completo). Respuesta: JSON con las recetas que coinciden con el nombre. Buscar recetas por categoría URL: GET /api/category/:category Descripción: Filtra recetas según la categoría especificada. Respuesta: JSON con las recetas que pertenecen a la categoría. Buscar recetas por país de origen URL: GET /api/country/:country Descripción: Filtra recetas según el país de origen especificado. Respuesta: JSON con las recetas del país solicitado. Obtener todas las categorías URL: GET /api/categories Descripción: Devuelve una lista de categorías de recetas predefinidas en el sistema. Respuesta: JSON con las categorías disponibles. Endpoints para Comentarios (commentRoutes) Agregar un comentario a una receta URL: POST /api/comments Descripción: Agrega un nuevo comentario a una receta específica. Body (JSON): json

{ "recipeId": "ID de la receta", "user": "Nombre del usuario", "content": "Texto del comentario" } 

Respuesta: JSON con el comentario creado. Obtener comentarios de una receta específica URL: GET /api/comments/:recipeId Descripción: Devuelve todos los comentarios asociados a una receta específica, basado en su recipeId.

1. Redis y la caché global (products)
Qué hace:
Al llamar al endpoint GET /products, el controlador primero verifica si la clave products existe en Redis.
Si existe, devuelve los datos desde la caché (Redis) en lugar de consultar MongoDB.
Si no existe, consulta MongoDB, almacena el resultado en Redis bajo la clave products (con una expiración configurada de 1 hora), y luego devuelve los datos al cliente.
Confirmación:
Cada vez que haces una solicitud a GET /products:
Si Redis ya tiene la clave products, los datos se devuelven desde la caché.
Si la clave no existe, Redis almacena los datos y los devuelve.
2. Redis y la caché específica por producto (product:<id>)
Qué hace:
Al llamar al endpoint GET /products/:id, el controlador primero verifica si la clave product:<id> existe en Redis (donde <id> es el ID del producto solicitado).
Si existe, devuelve los datos desde la caché (Redis).
Si no existe, consulta MongoDB para obtener los datos del producto, almacena el resultado en Redis bajo la clave product:<id> (con una expiración configurada de 30 minutos), y luego devuelve los datos.
Confirmación:
Cada vez que haces una solicitud a GET /products/:id:
Si Redis ya tiene la clave product:<id>, los datos se devuelven desde la caché.
Si la clave no existe, Redis almacena los datos y los devuelve.
3. Eliminación y actualización de la caché
Cuando se elimina la clave global products:
Cuando realizas las siguientes operaciones:
POST /products: Al agregar un producto nuevo.
PUT /products/:id: Al actualizar un producto existente.
DELETE /products/:id: Al eliminar un producto.
En estos casos, la clave products se elimina para garantizar que la próxima solicitud a GET /products obtenga datos actualizados desde MongoDB.
Cuando se elimina la clave específica product:<id>:
Para las operaciones de actualización (PUT) y eliminación (DELETE) de un producto específico:
La clave product:<id> correspondiente al producto modificado o eliminado se elimina de Redis para mantener la consistencia de los datos.
Confirmación:
Después de realizar estas operaciones (POST, PUT, DELETE):
La clave products desaparece de Redis.
Para las actualizaciones y eliminaciones, la clave product:<id> también desaparece.
Ejemplo de interacción completa (Confirmada con pruebas en Redis):
Escenario:
Llamada inicial a GET /products:

Redis crea la clave products y almacena los datos.
Llamada a GET /products/:id:

Redis crea la clave product:<id> para el producto consultado.
Operación POST /products:

Redis elimina la clave global products.
Operación PUT /products/:id:

Redis elimina la clave products.
Redis elimina y actualiza la clave product:<id>.
Operación DELETE /products/:id:

Redis elimina la clave products.
Redis elimina la clave product:<id>.
