# NodeJs API-RESTful
Realizada con fines de prueba de implementación para un ecommerce stateless backend.
---

Esto ha sido un desarrollo para prueba de implementación de __CRUD__ para un futuro desarrollo de un stateless backend para
ecommerce.

Para garantizar la compatibilidad de las dependencias utiliza _Yarn_, así que la instalación de las dependencias es a través de...


```bash
  $ yarn install
  ```
  
#### Se inicia con...
```bash
  $ npm start
  ```
  
#### Una vez iniciada presenta el siguiente prompt...
```bash
  Conexión con la base de datos establecida...
  API REST corriendo en http://localhost:3001
```

#### Necesita tener MongoDB instalado y funcionando


### END POINTS
---
```javascript
// (GET) Ruta para petición de productos (requiere auth por JWT)
localhost:3001/api/product

// (GET) Ruta para acceder a productos según ID (requiere auth por JWT)
localhost:3001/api/product/:productId

// (POST) Ruta para creación de productos (requiere auth por JWT)
localhost:3001/api/product

// (PUT) Ruta para actualización de producto de acceso según su ID (requiere auth por JWT)
localhost:3001/api/product/:productId

// (DELETE) Ruta para eliminar productos de la base de datos según su ID (requiere auth por JWT)
localhost:3001/api/product/:productId

// (POST) Ruta para registro de usuarios (requiere auth por JWT)
localhost:3001/api/signup

// (POST) Ruta para inicio de sesión de usuario (requiere auth por JWT)
localhost:3001/api/signin

// (DELETE) Ruta para eliminar usuarios según su email (requiere auth por JWT)
localhost:3001/api/user
```

Tengo planeado desplegarla para prueba de producción en Heroku, actualizo con el enlace para pruebas al estar listo.
