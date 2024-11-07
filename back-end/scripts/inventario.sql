-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 10:16:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertHistorial` (IN `pIdUsuario` INT, IN `pIdProducto` INT)   BEGIN

	declare vRol INT(6);
	declare vTipoMovimiento VARCHAR(15);
	
	SELECT 
		idRol INTO vRol
		FROM usuarios WHERE idUsuario = pIdUsuario
		;
		
	IF vRol = 1 THEN
      SET vTipoMovimiento = 'Entrada';
   ELSE
      SET vTipoMovimiento = 'Salida';
   END IF;

	INSERT INTO historial(
		tipoMovimiento,
		idUsuario,
		idProducto,
		fecha
	)VALUES(
		vTipoMovimiento,
		pIdUsuario,
		pIdProducto,
		NOW()
	);

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `idHistorial` int(6) NOT NULL,
  `tipoMovimiento` enum('Entrada','Salida') DEFAULT NULL,
  `idUsuario` int(6) DEFAULT NULL,
  `idProducto` int(6) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`idHistorial`, `tipoMovimiento`, `idUsuario`, `idProducto`, `fecha`) VALUES
(18, 'Entrada', 1, 1, '2024-11-07 01:51:04'),
(19, 'Salida', 2, 19, '2024-11-07 01:51:41'),
(20, 'Entrada', 1, 19, '2024-11-07 01:53:48'),
(21, 'Salida', 2, 19, '2024-11-07 01:54:07'),
(22, 'Salida', 2, 19, '2024-11-07 01:54:23'),
(23, 'Salida', 2, 2, '2024-11-07 01:56:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(6) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `precio` decimal(16,2) DEFAULT NULL,
  `cantidad` int(6) DEFAULT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `precio`, `cantidad`, `estatus`) VALUES
(1, 'LAPTOP', 10000.00, 12, 1),
(2, 'PC', 15000.00, 10, 1),
(3, 'MOUSE', 100.00, 3, 1),
(4, 'TECLADO', 350.00, 0, 1),
(17, 'SILLA', 2000.00, 11, 0),
(18, 'CELULAR', 6500.00, 0, 1),
(19, 'MONITOR', 2300.00, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(2) NOT NULL,
  `tipoRol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `tipoRol`) VALUES
(1, 'administrador'),
(2, 'almacenista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(6) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `contrasena` varchar(25) DEFAULT NULL,
  `idRol` int(2) DEFAULT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `correo`, `contrasena`, `idRol`, `estatus`) VALUES
(1, 'Juan Perez', 'juan', '123456', 1, 1),
(2, 'Pedro Perez', 'pedro', '123456', 2, 1),
(3, 'Emily Perez', 'emily@gmail.com', '123456', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
