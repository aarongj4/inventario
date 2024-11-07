<?php
require_once 'models/Producto.php';

class ProductoController {
    private $model;

    public function __construct() {
        $this->model = new Producto();
    }

    public function obtenerProductos() {
        echo json_encode($this->model->getAll());
    }

    public function crearProducto($data) {
        $nombre = $data['nombre'];
        $precio = $data['precio'];
        $cantidad = $data['cantidad'];
        $this->model->create($nombre, $precio, $cantidad);
    }

    public function actualizarProducto($data) {
        $idProducto = $data['idProducto'];
        $nombre = $data['nombre'];
        $precio = $data['precio'];
        $cantidad = $data['cantidad'];
        $idUsuario = $data['idUsuario'];
        $this->model->update($idProducto, $nombre, $precio, $cantidad, $idUsuario);
    }

    public function actualizarEstatusProducto($data) {
        $idProducto = $data['idProducto'];
        $estatus = $data['estatus'];
        $this->model->actualizarEstatus($idProducto, $estatus);
    }
    
    public function obtenerHistorial() {
        echo json_encode($this->model->getAllHistorial());
    }

    
 
}
?>
