-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2014 at 07:33 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `avdar`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `auth_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`auth_id`, `username`, `password`, `email`) VALUES
(1, 'admin', '$2y$10$6o9e5faiOatngg3CqIMPkumQc9mgqOpfxm5ZXL/JZTtJOzsbGnzp2', 'ankhaa1002@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text,
  `created_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_Comment_Movie1_idx` (`movie_id`),
  KEY `fk_Comment_User1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(255) NOT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
(1, 'Адал явдал'),
(2, 'Аймшиг'),
(3, 'Зөгнөлт'),
(4, 'Инээдэм'),
(5, 'Түүхэн'),
(6, 'Хайр дурлал'),
(7, 'Баримтат');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_24_045603_insertAuth', 1),
('2014_10_24_072926_insertauth', 2),
('2014_10_24_090906_insertUser', 3);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE IF NOT EXISTS `movie` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `featured_image` text,
  `name` varchar(45) NOT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `cast` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `length` varchar(45) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `synopsis` text,
  `movie_trailer` text,
  `modified_user_id` int(11) DEFAULT NULL,
  `is_upcoming` tinyint(4) DEFAULT NULL,
  `imdb_link` varchar(500) DEFAULT NULL,
  `uploaded_admin` int(11) NOT NULL,
  `director` varchar(255) NOT NULL,
  `movie_content` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`movie_id`),
  KEY `fk_Movie_Auth1_idx` (`uploaded_admin`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `featured_image`, `name`, `rating`, `cast`, `release_date`, `length`, `language`, `synopsis`, `movie_trailer`, `modified_user_id`, `is_upcoming`, `imdb_link`, `uploaded_admin`, `director`, `movie_content`, `updated_at`, `created_at`) VALUES
(8, 'uploads/movies/covers/file_216888032.jpg', 'Godfather', '9.2', 'Marlon Brando, Al Pacino, James Caan ', '1972-01-01', '175', 'Монгол', '<p class="fr-tag">The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</p>', 'https://www.youtube.com/watch?v=sY1S34973zA', NULL, 0, 'http://www.imdb.com/title/tt0068646', 1, 'Francis Ford Coppola', '', '2014-10-26 09:15:50', '2014-10-26 09:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

CREATE TABLE IF NOT EXISTS `movie_genre` (
  `movie_genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`movie_genre_id`),
  KEY `fk_Genre_Movie1_idx` (`movie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `movie_genre`
--

INSERT INTO `movie_genre` (`movie_genre_id`, `movie_id`, `genre_id`) VALUES
(3, 8, 1),
(4, 8, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(400) DEFAULT NULL,
  `joined_date` datetime DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `avatar` text,
  `bio` text,
  `is_admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `code`, `username`, `password`, `email`, `joined_date`, `is_active`, `avatar`, `bio`, `is_admin`) VALUES
(1, '1', 'admin', '$2y$10$Q7POQgjd0Y8oqVlgGymNO.gn19zRFESUYrkKQLl50vNcBMXf7dqwi', NULL, NULL, NULL, NULL, NULL, 1),
(2, '2', 'user', '$2y$10$74I4Yml0mrQldpSFoStq7.j9c7XkvMBBFQoe5suDtpKFFz4UTu5iq', NULL, NULL, NULL, NULL, NULL, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_Comment_Movie1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Comment_User1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_Movie_Auth1` FOREIGN KEY (`uploaded_admin`) REFERENCES `auth` (`auth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `fk_Genre_Movie1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
