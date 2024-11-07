<?php
require_once 'config/Database.php';

class Producto {
    private $conn;
    private $table = "productos";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($nombre, $precio, $cantidad) {
        $query = "INSERT INTO " . $this->table . " (nombre, precio, cantidad, estatus) VALUES (:nombre, :precio, :cantidad, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':cantidad', $cantidad);
        return $stmt->execute();
    }

    public function update($idProducto, $nombre, $precio, $cantidad, $idUsuario) {
        
        $query = "UPDATE " . $this->table . " SET nombre = :nombre, precio = :precio, cantidad = :cantidad WHERE idProducto = :idProducto";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idProducto', $idProducto);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':cantidad', $cantidad);
        if ($stmt->execute()) {
            
            $spQuery = "CALL insertHistorial(:idUsuario, :idProducto)";
            $spStmt = $this->conn->prepare($spQuery);
            $spStmt->bindParam(':idUsuario',  $idUsuario);
            $spStmt->bindParam(':idProducto', $idProducto);
            
            return $spStmt->execute(); 
        }

    }

    public function delete($idProducto) {
        $query = "DELETE FROM " . $this->table . " WHERE idProducto = :idProducto";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idProducto', $idProducto);
        return $stmt->execute();
    }

    public function actualizarEstatus($idProducto, $estatus) {
        $query = "UPDATE " . $this->table . " SET estatus = :estatus WHERE idProducto = :idProducto";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idProducto', $idProducto);
        $stmt->bindParam(':estatus', $estatus);
        return $stmt->execute();
    }

    public function getAllHistorial() {
        // $query = "SELECT * FROM " . $this->table;
        $query = "SELECT  idHistorial,  tipoMovimiento,  h.idUsuario, u.nombre AS usuario, h.idProducto,  p.nombre AS producto, fecha  FROM historial h INNER JOIN usuarios u ON u.idUsuario = h.idUsuario INNER JOIN productos p ON p.idProducto = h.idProducto ORDER BY idHistorial DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    

 
}
?>
