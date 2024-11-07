<?php
require_once 'config/Database.php';

class Usuario {
    private $conn;
    private $table = "usuarios";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }


    public function validarCredenciales($correo, $contrasena) {
        $query = "SELECT idRol, idUsuario, contrasena FROM usuarios WHERE correo = :correo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario) {
            if ( $contrasena == $usuario['contrasena']) {
                // Si la contraseña es correcta, devolver el idRol
                return [
                    'idUsuario' => $usuario['idUsuario'],
                    'idRol' => $usuario['idRol']
                ];
            }
        }else{
            return false;
        }

        return false; 
    }
   

 
}
?>
