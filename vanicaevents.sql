-- phpMyAdmin SQL Dump
-- Vanica Event Management System Database
-- Generation Time: 2025-01-01
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vanicaevents`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblevents`
--

CREATE TABLE `tblevents` (
  `ID` int(5) NOT NULL,
  `EventType` varchar(250) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreationDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblevents`
--

INSERT INTO `tblevents` (`ID`, `EventType`, `Description`, `CreationDate`) VALUES
(1, 'Birthday Party', 'Children and adult birthday celebrations with themed decorations and entertainment', NOW()),
(2, 'Wedding Ceremony', 'Complete wedding planning and coordination services', NOW()),
(3, 'Gender Reveal Party', 'Special celebrations to reveal baby gender with creative themes', NOW()),
(4, 'Baby Shower', 'Elegant baby shower events with personalized touches', NOW()),
(5, 'Anniversary Celebration', 'Memorable anniversary parties and milestone celebrations', NOW()),
(6, 'Engagement Party', 'Romantic engagement celebrations and proposal events', NOW()),
(7, 'Graduation Party', 'Academic achievement celebrations and graduation ceremonies', NOW()),
(8, 'Corporate Events', 'Professional corporate gatherings and team building events', NOW()),
(9, 'Holiday Celebrations', 'Seasonal and holiday-themed party planning', NOW()),
(10, 'Bridal Shower', 'Pre-wedding celebrations for brides-to-be', NOW());

-- --------------------------------------------------------

--
-- Table structure for table `tbleventbooking`
--

CREATE TABLE `tbleventbooking` (
  `ID` int(10) NOT NULL,
  `BookingNumber` int(10) DEFAULT NULL,
  `ClientName` varchar(250) DEFAULT NULL,
  `MobileNumber` bigint(20) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `EventDate` date DEFAULT NULL,
  `EventTime` time DEFAULT NULL,
  `EventType` varchar(250) DEFAULT NULL,
  `EventPlanner` int(10) DEFAULT NULL,
  `EventLocation` varchar(500) DEFAULT NULL,
  `GuestCount` int(5) DEFAULT NULL,
  `Budget` decimal(10,2) DEFAULT NULL,
  `SpecialRequests` mediumtext DEFAULT NULL,
  `ApplyDate` timestamp NULL DEFAULT current_timestamp(),
  `Remark` varchar(250) DEFAULT NULL,
  `Status` varchar(250) DEFAULT NULL,
  `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbleventbooking`
--

INSERT INTO `tbleventbooking` (`ID`, `BookingNumber`, `ClientName`, `MobileNumber`, `Email`, `EventDate`, `EventTime`, `EventType`, `EventPlanner`, `EventLocation`, `GuestCount`, `Budget`, `SpecialRequests`, `ApplyDate`, `Remark`, `Status`, `UpdationDate`) VALUES
(1, 141561395, 'Sarah Johnson', 1234567890, 'sarah@email.com', '2025-03-15', '14:00:00', '1', 1, 'Beirut Community Center', 25, 1500.00, 'Princess theme with pink decorations', NOW(), 'Confirmed booking for princess birthday party', 'Approved', NOW()),
(2, 499219152, 'Michael & Lisa', 2345678901, 'michael.lisa@email.com', '2025-06-20', '18:00:00', '2', 2, 'Seaside Resort Venue', 150, 8000.00, 'Outdoor ceremony with sea view, white and gold theme', NOW(), 'Wedding planning consultation scheduled', 'Approved', NOW()),
(3, 485109480, 'Amanda Thompson', 3456789012, 'amanda@email.com', '2025-04-10', '16:00:00', '3', 1, 'Garden Party Venue', 35, 2000.00, 'Blue and pink theme, surprise element needed', NOW(), 'Gender reveal party approved', 'Approved', NOW());

-- --------------------------------------------------------

--
-- Table structure for table `tbleventplanners`
--

CREATE TABLE `tbleventplanners` (
  `ID` int(5) NOT NULL,
  `FullName` varchar(250) DEFAULT NULL,
  `MobileNumber` bigint(10) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `Specialization` varchar(250) DEFAULT NULL,
  `Password` varchar(259) DEFAULT NULL,
  `CreationDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbleventplanners`
-- Note: All passwords are hashed using PHP's password_hash() function
-- Default password for all planners is: 'password' (without quotes)
-- Use generate-password.php to create new password hashes
--

INSERT INTO `tbleventplanners` (`ID`, `FullName`, `MobileNumber`, `Email`, `Specialization`, `Password`, `CreationDate`) VALUES
(1, 'Elena Rodriguez', 1234567890, 'elena@vanica.com', '1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
(2, 'David Chen', 2345678901, 'david@vanica.com', '2', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
(3, 'Sophie Williams', 3456789012, 'sophie@vanica.com', '1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
(4, 'Marcus Thompson', 4567890123, 'marcus@vanica.com', '4', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW()),
(5, 'Isabella Garcia', 5678901234, 'isabella@vanica.com', '6', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW());

-- --------------------------------------------------------

--
-- Table structure for table `tblpage`
--

CREATE TABLE `tblpage` (
  `ID` int(10) NOT NULL,
  `PageType` varchar(200) DEFAULT NULL,
  `PageTitle` mediumtext DEFAULT NULL,
  `PageDescription` mediumtext DEFAULT NULL,
  `Email` varchar(200) DEFAULT NULL,
  `MobileNumber` bigint(10) DEFAULT NULL,
  `UpdationDate` date DEFAULT NULL,
  `Timing` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblpage`
--

INSERT INTO `tblpage` (`ID`, `PageType`, `PageTitle`, `PageDescription`, `Email`, `MobileNumber`, `UpdationDate`, `Timing`) VALUES
(1, 'aboutus', 'About Us', '<div><font color=\"#202124\" face=\"arial, sans-serif\"><b>Vanica is a premier authority in children\'s event planning and coordination, serving discerning families across Lebanon and the Gulf with unparalleled excellence and creativity.</b></font></div>', NULL, NULL, NULL, ''),
(2, 'contactus', 'Contact Us', 'Gebran Mall, Beirut, Lebanon', 'info@vanica.com', 96170003161, NULL, '9:00 AM to 8:00 PM');

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblevents`
--
ALTER TABLE `tblevents`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbleventbooking`
--
ALTER TABLE `tbleventbooking`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbleventplanners`
--
ALTER TABLE `tbleventplanners`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tblpage`
--
ALTER TABLE `tblpage`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblevents`
--
ALTER TABLE `tblevents`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbleventbooking`
--
ALTER TABLE `tbleventbooking`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbleventplanners`
--
ALTER TABLE `tbleventplanners`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblpage`
--
ALTER TABLE `tblpage`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;