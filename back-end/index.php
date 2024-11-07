<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); 
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once 'controllers/ProductoController.php';
require_once 'controllers/UsuarioController.php'; 

$controller = new ProductoController();
$usuarioController = new UsuarioController(); 

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($_SERVER['REQUEST_URI'] == '/Inventario/obtener_productos') {
            $controller->obtenerProductos(); 
        } elseif ($_SERVER['REQUEST_URI'] == '/Inventario/obtener_historial') {
            $controller->obtenerHistorial(); 
        }
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['idProducto']) && isset($input['estatus'])) {
            $controller->actualizarEstatusProducto($input);
        } elseif (isset($input['idProducto'])) {
            $controller->actualizarProducto($input); 
        } elseif (isset($input['correo']) && isset($input['contrasena'])) { 
            $usuarioController->iniciarSesion($input);
        } else {
            $controller->crearProducto($input); 
        }
        break;
    
    default:
        echo json_encode(['message' => 'Método no permitido']);
        break;
}
?>
