-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220612.30bcc6535a
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2022 a las 21:40:59
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `to-do`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `nameCategoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`nameCategoria`) VALUES
('Aplicaciones'),
('Comercio'),
('Otros'),
('Profesional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `fechaCreacion` date NOT NULL DEFAULT current_timestamp(),
  `fechaResolucion` date NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `prioridad` varchar(50) NOT NULL,
  `fechaLimite` date NOT NULL,
  `estado` varchar(50) NOT NULL,
  `id_lista` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `titulo`, `fechaCreacion`, `fechaResolucion`, `descripcion`, `prioridad`, `fechaLimite`, `estado`, `id_lista`, `idUser`) VALUES
(8, 'manzanas', '2022-06-16', '0000-00-00', 'x', 'Baja', '2022-06-24', 'Sin resolver', 7, 2),
(9, 'naranjas', '2022-06-16', '0000-00-00', 'x', 'Baja', '2022-06-24', 'Sin resolver', 7, 2),
(10, 'peras', '2022-06-16', '2022-06-16', 'x', 'Baja', '2022-06-24', 'Resuelta', NULL, 2),
(11, 'Crear una app', '2022-06-16', '0000-00-00', 'x', 'Alta', '2022-06-16', 'Sin resolver', 8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `id_lista` int(11) NOT NULL,
  `titleList` varchar(50) NOT NULL,
  `fechaCreacion` date NOT NULL DEFAULT current_timestamp(),
  `fechaResolucion` date NOT NULL,
  `estado` varchar(50) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idCategoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id_lista`, `titleList`, `fechaCreacion`, `fechaResolucion`, `estado`, `idUser`, `idCategoria`) VALUES
(7, 'Compras', '2022-06-16', '0000-00-00', 'Sin resolver', 2, 'Comercio'),
(8, 'Apk', '2022-06-16', '0000-00-00', 'Sin resolver', 2, 'Profesional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('OzT4fw3UXznhR1rW_PlHgqPOnGtYohrA', 1655494522, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`) VALUES
(1, 'Admin@admin.com', 'Admin', '$2a$10$Y0tLQySDBq9yf/bgmQJdNuiqFQZZ7BqUwDvD8oFpR9TeR1iUj1Qzy'),
(2, 'lab2@gmail.com', 'Lorenzo', '$2a$10$jLzJDtT8/gjcZYU7oIjHwOFu7ObMuYBBbpbtsO0T169UONKygHpqi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`nameCategoria`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lista` (`id_lista`,`idUser`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id_lista`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`nameCategoria`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



