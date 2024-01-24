-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 12:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ghoit`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `acceptor_invoice_id` bigint(20) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `txn` text DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `merchant_id`, `acceptor_invoice_id`, `amount`, `txn`, `status`) VALUES
(1, 1, 1454409, 1, '0x1077cc07b93b67e3f6a553b9fcc41672046ff4eaece0201e9a1b591e98202eae', '1'),
(2, 2, 1454410, 2, '0x7e2e79afef647e62301ff6eccce9bb28a7b48b6afed3b78568eff145ea0e1659', '1'),
(3, 2, 1454411, 10, '0xbaedd219278e67479105381ed24c8e8b56da85d5ab1e0029a9c4ee64c322ec29', '1'),
(4, 1, 1454412, 3, NULL, '0');

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(50) NOT NULL,
  `wallet_addr` varchar(42) NOT NULL,
  `description` text NOT NULL,
  `owner_addr` varchar(42) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merchant`
--

INSERT INTO `merchant` (`id`, `name`, `url`, `wallet_addr`, `description`, `owner_addr`, `status`) VALUES
(1, 'test', 'https://solidgrant.click', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '', '0xE570375908C46597CF5BBeA3a9E8b694E1E57158', '1'),
(2, 'test', 'https://solidgrant.click', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '1'),
(3, 'adsf', 'www.lukso.network', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '1'),
(4, 'My shopping website', 'https://example.com', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '', '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `merchant_id` (`merchant_id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
