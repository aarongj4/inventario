# Proyecto PHP - Backend

Este proyecto constituye el backend de la aplicación, desarrollado en PHP utilizando el patrón **MVC**. Permite realizar operaciones CRUD para la gestión de productos

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **XAMPP** (o cualquier servidor web compatible con PHP y MySQL).

## Pasos para la Instalación

1. Copia la carpeta del backend a la ruta `htdocs` de tu instalación de XAMPP (o a la carpeta raíz de tu servidor web).
2. Renombra la carpeta a **`Inventario`**.
3. Configura tus credenciales de base de datos:
   - Edita el archivo de conexión en `config/Database.php`.
   - Ajusta los valores de `host`, `username`, `password` y `database` según tu configuración.
4. Importa la base de datos:
   - Entra al panel de **phpMyAdmin**.
   - Crea una nueva base de datos llamada `inventario` (o el nombre que configures).
   - Importa el archivo SQL localizado en `/scripts/inventario.sql`.

## Uso

Una vez configurado:

1. Asegúrate de que el servidor de XAMPP (Apache y MySQL) esté corriendo.
2. Accede al backend desde la URL:
**ENDPOINTS**
  **GET**
    http://localhost/Inventario/obtener_productos
    http://localhost/Inventario/obtener_historial
    **POST**
    http://localhost/Inventario/
    {
    "nombre": "Prueba Producto EEE",
    "precio": 200.00,
    "cantidad": 30
  }

