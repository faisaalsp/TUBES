-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 12:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tubes`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `NIK` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `namaDosen` varchar(50) DEFAULT NULL,
  `statusDosen` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`NIK`, `username`, `pass`, `namaDosen`, `statusDosen`) VALUES
(1, 'faisal123', 'qwerty', 'Faisal Surya', 'Administrator'),
(2, 'martin123', 'qwerty', 'Martin Sentoriyan', 'Dosen'),
(3, 'ivan123', 'qwerty', 'Ivan Timothius', 'Dosen'),
(4, 'jose123', 'qwerty', 'Jose Feliksilda', 'Dosen');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `NPM` varchar(10) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `namaMahasiswa` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`NPM`, `username`, `pass`, `namaMahasiswa`) VALUES
('6181901015', 'martin444', 'situmorang15', 'Martin Sentoriyan'),
('6181901045', 'ivan111', 'nightfury10', 'Ivan'),
('6181901073', 'faisal223', 'nightfury10', 'Faisal Surya');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `idReview` int(11) NOT NULL,
  `noSkripsi` int(11) DEFAULT NULL,
  `review` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`idReview`, `noSkripsi`, `review`) VALUES
(1, 1, 'Topiknya bagus banget bun'),
(2, 2, 'Topiknya bagus banget bun'),
(3, 3, 'Topiknya bagus banget bun');

-- --------------------------------------------------------

--
-- Table structure for table `skripsi`
--

CREATE TABLE `skripsi` (
  `NIK` int(11) DEFAULT NULL,
  `noSkripsi` int(11) NOT NULL,
  `Judul` varchar(500) DEFAULT NULL,
  `BidangPeminatan` varchar(20) DEFAULT NULL,
  `Tipe` varchar(15) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skripsi`
--

INSERT INTO `skripsi` (`NIK`, `noSkripsi`, `Judul`, `BidangPeminatan`, `Tipe`, `status`) VALUES
(1, 1, 'Pemberlakuan Sistem Filtering Terhadap Berita Hoax dengan Memakai Metode Berbasis Browser Extensions.', 'Computing Science', 'Bintang', 'Approved'),
(2, 2, 'Perancangan Sistem Informasi Manajemen Rumah Sakit Berbasis Web', 'Computing Science', 'Reguler', 'Declined'),
(3, 3, 'Penerapan Algoritma KMeans Clustering Pada Data Mining Untuk Menentukan Strategi Marketing Produk Home Industri', 'Data Science', 'Bintang', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`NIK`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`NPM`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`idReview`);

--
-- Indexes for table `skripsi`
--
ALTER TABLE `skripsi`
  ADD PRIMARY KEY (`noSkripsi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
