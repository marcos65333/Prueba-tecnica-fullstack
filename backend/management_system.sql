-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-04-2025 a las 18:14:06
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
-- Base de datos: `management_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `responsible` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `status` enum('Start','Stop','Restart','In Process') NOT NULL DEFAULT 'In Process'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`project_id`, `title`, `description`, `responsible`, `start_date`, `end_date`, `created_at`, `updated_at`, `status`) VALUES
(15, 'Gestum V2', 'Desarrollo de portal web corporativo con sección de noticias y área de clientes', 'Marcos Tovar', '2025-03-03', '2025-04-03', '2025-04-11 06:37:45', '2025-04-11 11:08:08', 'Start'),
(16, 'Gestion de aguas', 'Proyecto para la gestion de aguas residuales en los municipios del atlantico', 'Jhon Suarez', '2025-03-03', '2025-04-03', '2025-04-11 08:47:32', '2025-04-11 09:40:41', 'In Process'),
(17, 'SIVOT  V2', 'Proyecto educativo para realizar votaciones masivas', 'Juan Muñoz', '2025-03-03', '2025-04-03', '2025-04-11 09:11:54', '2025-04-11 10:37:11', 'Stop'),
(26, 'prueba sistema solar', 'hola', 'David Perez', '2025-04-11', '2025-04-11', '2025-04-11 10:35:53', NULL, 'In Process'),
(27, 'Sistema electrónico ', 'Sistema de mantenimiento eléctrico en la ciudad de Barranquilla ', 'Gustavo petro ', '2025-04-11', '2025-04-11', '2025-04-11 10:45:35', '2025-04-11 10:45:57', 'Stop');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `technologies_used`
--

CREATE TABLE `technologies_used` (
  `tecnologies_used_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `technologies_used`
--

INSERT INTO `technologies_used` (`tecnologies_used_id`, `name`, `project_id`) VALUES
(1, 'React', 15),
(2, 'Java', 15),
(3, 'Angular', 16),
(4, 'Java', 16),
(5, 'Flask', 17),
(6, 'Python', 17),
(18, 'HTML', 26),
(19, 'TypeScript', 27),
(20, 'CSS', 27),
(21, 'PostgreSQL', 27);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indices de la tabla `technologies_used`
--
ALTER TABLE `technologies_used`
  ADD PRIMARY KEY (`tecnologies_used_id`),
  ADD KEY `proyect_id` (`project_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `technologies_used`
--
ALTER TABLE `technologies_used`
  MODIFY `tecnologies_used_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `technologies_used`
--
ALTER TABLE `technologies_used`
  ADD CONSTRAINT `technologies_used_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
