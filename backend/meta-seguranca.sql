-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/11/2024 às 22:32
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `meta-seguranca`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `orcamentos`
--

CREATE TABLE `orcamentos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `cpf_cnpj` varchar(20) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `tipo_servico` varchar(255) DEFAULT NULL,
  `solicitacao` text DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `categoria`, `imagem`) VALUES
(1, 'Etiqueta Adesiva Control ID', 'Tag adesivo veicular da marca CONTROL ID frequência 125mhz. Específico para uso em antenas da marca CONTROL ID.', 10.00, 'Tag', 'tag.png'),
(2, 'Controle de proximidade Intelbras', 'Tag RFID passivo somente leitura com furo para ser usado como chaveiro. Possui código único pré-gravado de 64bits.', 15.00, 'Chaveiro', 'chaveiro.png'),
(3, 'Etiqueta Adesiva Control ID', 'Tag adesivo veicular da marca CONTROL ID frequência 125mhz. Específico para uso em antenas da marca CONTROL ID.', 10.00, 'Tag', 'tag.png'),
(4, 'Controle de proximidade Intelbras', 'Tag RFID passivo somente leitura com furo para ser usado como chaveiro. Possui código único pré-gravado de 64bits.', 15.00, 'Chaveiro', 'chaveiro.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `cpf` varchar(11) NOT NULL,
  `telefone` varchar(12) NOT NULL,
  `data_nasc` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `foto_perfil`, `cpf`, `telefone`, `data_nasc`) VALUES
(1, 'julio', 'jsilva@multi360.com.br', '1', NULL, '', '', NULL),
(2, 'Julio Alexsandro Monteiro da Silva', 'julioalexsandro.monteiro13@gmail.com', '$2y$10$yDcLZb.QZViEyCUCoYUPDe3VqR0ejavVFrEu3CpPPsg0W9ebODNZ2', 'uploads/jm.png', '37859235897', '19991971956', '2005-10-13'),
(3, 'Pafaro', 'pafarinho123@gmail.com', '$2y$10$wdNlNZZmdCVBU8QE90B5K.56qyRuEkJvm3QN7Cmr/SyJbvOEKYTUu', NULL, '', '', NULL),
(28, 'dsa', 'julioa@gmail.com', '$2y$10$dQmCYdbRZv3dgsEPV8xq4u9GkU5Xtgkik.gia5cGu2p3cusoQqQBi', 'uploads/672a21ce43265.png', '12312312312', '12213122112', '2000-10-10');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
