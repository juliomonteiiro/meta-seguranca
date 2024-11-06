-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/11/2024 às 02:29
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
(4, 'Controle de proximidade Intelbras', 'Tag RFID passivo somente leitura com furo para ser usado como chaveiro. Possui código único pré-gravado de 64bits.', 15.00, 'Chaveiro', 'chaveiro.png'),
(6, 'Tag veicular - Nice ', 'A Tag Veícular Linear Nice CR5-A é responsável em habilitar de forma automatizada a entrada de veículos autorizados no ambiente que está sendo resguardado por equipamentos de controle de acesso. Adquira já para o seu condomínio ou empresa.', 8.00, 'Tag', '1730845923353.jpg'),
(7, 'Chaveiro de Proximidade - Nice', 'O Chaveiro de Proximidade foi desenvolvido para utilização nos sistemas de controle de acesso em condomínios, integrado com equipamentos desenvolvidos pela Nice Brasil. Proporcionam maior comodidade e segurança aos usuários do sistema com a identificação do usuário e/ou abertura do portão ou cancela com a uma distância de até 30cm da leitora.', 12.00, 'Chaveiro', '1730845997187.jpg'),
(8, 'Cartão de proximidade - Control ID', ' Os cartões de proximidade comercializados pela Control iD são ideias para uma solução confiável de controle de acesso por proximidade. Com opções disponíveis que utilizam as tecnologias ASK 125 kHZ e MIFARE, eles são uma ótima opção para ambientes corporativos, edifícios comerciais e locais de grande circulação de pessoas onde o controle se faz necessário.', 15.00, 'Eletrônicos', '1730846137508.jpg');

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
(28, 'dsa', 'julioa@gmail.com', '$2y$10$dQmCYdbRZv3dgsEPV8xq4u9GkU5Xtgkik.gia5cGu2p3cusoQqQBi', 'uploads/672a21ce43265.png', '12312312312', '12213122112', '2000-10-10'),
(29, 'André Dantas', 'andreluissousaa10@gmail.com', '$2y$10$0mGHIe0kYdbOxFJg6WIbAujZLulRO7zD3CtH9wTmV1zcyVb0Hwq4S', 'uploads/672a9f20ed74d.png', '52958920852', '19999442654', '2006-02-07'),
(30, 'João Belai', 'joaopbelai@gmail.com', '$2y$10$wla61hTHYW8a6OOJHITfCe2MuS3d3vvF6WXUYI/IHJxk7m9Hhliy2', 'uploads/672aa09d5a1be.png', '48914771806', '19971547538', '2006-03-14'),
(31, 'Hortência Monteiro', 'hortenciamonteiro.23@gmail.com', '$2y$10$y0.z/MyLyUhJRIe/QHZwnu5gBUV/xouYrMnhlJCOEzWxy2MsrWLni', 'uploads/horty.png', '31378619854', '19994718351', '1983-10-23');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
