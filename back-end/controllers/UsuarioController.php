<?php
require_once 'models/Usuario.php';

class UsuarioController {
    private $model;

    public function __construct() {
        $this->model = new Usuario();
    }

    public function iniciarSesion($data) {
        $correo = $data['correo'];
        $contrasena = $data['contrasena'];

        $resultado = $this->model->validarCredenciales($correo, $contrasena);

        if ($resultado) {
            echo json_encode([
                'status' => 'success',
                'data' => $resultado,
                'mensaje' => 'Inicio de sesión exitoso.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Credenciales inválidas.'
            ]);
        }
    }

 
 
}
?>
