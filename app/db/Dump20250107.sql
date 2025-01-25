CREATE DATABASE  IF NOT EXISTS `gas_station` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gas_station`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: gas_station
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `  users`
--

DROP TABLE IF EXISTS `  users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `  users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` int NOT NULL,
  `NIC` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `  users`
--

LOCK TABLES `  users` WRITE;
/*!40000 ALTER TABLE `  users` DISABLE KEYS */;
/*!40000 ALTER TABLE `  users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certifications`
--

DROP TABLE IF EXISTS `certifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certifications` (
  `certifications_id` int NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(45) NOT NULL,
  `certification_document` varchar(45) NOT NULL,
  `issued_by` varchar(45) NOT NULL,
  `issued_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`certifications_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certifications`
--

LOCK TABLES `certifications` WRITE;
/*!40000 ALTER TABLE `certifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `certifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_schedule`
--

DROP TABLE IF EXISTS `delivery_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `outled_id` int NOT NULL,
  `delivery_date` datetime NOT NULL,
  `status_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `outlet_id_f_key_idx` (`outled_id`),
  KEY `gas_status_fk_idx` (`status_id`),
  CONSTRAINT `gas_status_fk` FOREIGN KEY (`status_id`) REFERENCES `gas_status` (`status_id`),
  CONSTRAINT `outlet_id_f_key` FOREIGN KEY (`outled_id`) REFERENCES `outlets` (`outlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_schedule`
--

LOCK TABLES `delivery_schedule` WRITE;
/*!40000 ALTER TABLE `delivery_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispatch_stock`
--

DROP TABLE IF EXISTS `dispatch_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispatch_stock` (
  `dispatch_id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL,
  `outlet_id` int NOT NULL,
  `gas_type_id` int NOT NULL,
  `quantity_dispatched` int NOT NULL,
  `dispatched_at` datetime NOT NULL,
  PRIMARY KEY (`dispatch_id`),
  KEY `schedule_id_fk_idx` (`schedule_id`),
  KEY `outlet_fk_idx` (`outlet_id`),
  CONSTRAINT `outlet_fk` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`outlet_id`),
  CONSTRAINT `schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `delivery_schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispatch_stock`
--

LOCK TABLES `dispatch_stock` WRITE;
/*!40000 ALTER TABLE `dispatch_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispatch_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gas_request`
--

DROP TABLE IF EXISTS `gas_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gas_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `outlet_id` int NOT NULL,
  `qty` int NOT NULL,
  `request_status_id` int NOT NULL,
  `pickup_date` datetime NOT NULL,
  `token` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `outlet_id_fk_idx` (`outlet_id`),
  KEY `request_status_id_idx` (`request_status_id`),
  CONSTRAINT `outlet_id_fk` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`outlet_id`),
  CONSTRAINT `request_status_id` FOREIGN KEY (`request_status_id`) REFERENCES `gas_request_status` (`request_status_id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `  users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gas_request`
--

LOCK TABLES `gas_request` WRITE;
/*!40000 ALTER TABLE `gas_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `gas_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gas_request_status`
--

DROP TABLE IF EXISTS `gas_request_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gas_request_status` (
  `request_status_id` int NOT NULL AUTO_INCREMENT,
  `request_status_desc` varchar(45) NOT NULL,
  PRIMARY KEY (`request_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gas_request_status`
--

LOCK TABLES `gas_request_status` WRITE;
/*!40000 ALTER TABLE `gas_request_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `gas_request_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gas_status`
--

DROP TABLE IF EXISTS `gas_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gas_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gas_status`
--

LOCK TABLES `gas_status` WRITE;
/*!40000 ALTER TABLE `gas_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `gas_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gas_type`
--

DROP TABLE IF EXISTS `gas_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gas_type` (
  `gas_type_id` int NOT NULL AUTO_INCREMENT,
  `gas_type_desc` varchar(45) NOT NULL,
  PRIMARY KEY (`gas_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gas_type`
--

LOCK TABLES `gas_type` WRITE;
/*!40000 ALTER TABLE `gas_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `gas_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_request`
--

DROP TABLE IF EXISTS `industrial_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_request` (
  `industrial_request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `certification_id` int DEFAULT NULL,
  `outlet_id` int NOT NULL,
  `industrial_request_qty` int NOT NULL,
  `industrial_request_status` int NOT NULL,
  `pickup_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`industrial_request_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `outlet_id_idx` (`outlet_id`),
  KEY `certification_id_idx` (`certification_id`),
  CONSTRAINT `certification_id` FOREIGN KEY (`certification_id`) REFERENCES `certifications` (`certifications_id`),
  CONSTRAINT `outlet_id` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`outlet_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `  users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_request`
--

LOCK TABLES `industrial_request` WRITE;
/*!40000 ALTER TABLE `industrial_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_type`
--

DROP TABLE IF EXISTS `notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_type` (
  `notification_type_id` int NOT NULL AUTO_INCREMENT,
  `notification_type_desc` varchar(45) NOT NULL,
  PRIMARY KEY (`notification_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_type`
--

LOCK TABLES `notification_type` WRITE;
/*!40000 ALTER TABLE `notification_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  ` notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `request_id` int NOT NULL,
  `message` varchar(45) NOT NULL,
  `notification_type_id` int NOT NULL,
  `sent_at` datetime NOT NULL,
  PRIMARY KEY (` notification_id`),
  KEY `user_fk_idx` (`user_id`),
  KEY `request_fk_idx` (`request_id`),
  KEY `notification_type_id_fk_idx` (`notification_type_id`),
  CONSTRAINT `notification_type_id_fk` FOREIGN KEY (`notification_type_id`) REFERENCES `notification_type` (`notification_type_id`),
  CONSTRAINT `request_fk` FOREIGN KEY (`request_id`) REFERENCES `gas_request` (`request_id`),
  CONSTRAINT `userid_fk` FOREIGN KEY (`user_id`) REFERENCES `  users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outlets`
--

DROP TABLE IF EXISTS `outlets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outlets` (
  `outlet_id` int NOT NULL AUTO_INCREMENT,
  `outlet_name` varchar(45) NOT NULL,
  ` outlet_address` varchar(45) NOT NULL,
  `district` varchar(45) NOT NULL,
  ` user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` int DEFAULT NULL,
  PRIMARY KEY (`outlet_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`outlet_id`) REFERENCES `  users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outlets`
--

LOCK TABLES `outlets` WRITE;
/*!40000 ALTER TABLE `outlets` DISABLE KEYS */;
/*!40000 ALTER TABLE `outlets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_replenishment_request`
--

DROP TABLE IF EXISTS `stock_replenishment_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_replenishment_request` (
  `replenishment_id` int NOT NULL AUTO_INCREMENT,
  `outlet_id` int NOT NULL,
  `gas_type_id` int NOT NULL,
  `quantity_requested` int NOT NULL,
  `status_id` int NOT NULL,
  `approved_by` int NOT NULL,
  `created_at` datetime NOT NULL,
  `fulfilled_at` datetime NOT NULL,
  PRIMARY KEY (`replenishment_id`),
  KEY `outlet_byfk_idx` (`outlet_id`),
  KEY `gas_type_id_fk_idx` (`gas_type_id`),
  KEY `status_id_idx` (`status_id`),
  KEY `approved_by_fk_idx` (`approved_by`),
  CONSTRAINT `approved_by_fk` FOREIGN KEY (`approved_by`) REFERENCES `  users` (`user_id`),
  CONSTRAINT `gas_type_id_fk` FOREIGN KEY (`gas_type_id`) REFERENCES `gas_type` (`gas_type_id`),
  CONSTRAINT `outlet_byfk` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`outlet_id`),
  CONSTRAINT `status_id` FOREIGN KEY (`status_id`) REFERENCES `gas_status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_replenishment_request`
--

LOCK TABLES `stock_replenishment_request` WRITE;
/*!40000 ALTER TABLE `stock_replenishment_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_replenishment_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transactions`
--

DROP TABLE IF EXISTS `stock_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_transactions` (
  `tranasaction_id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `transaction_type` int NOT NULL,
  `quantity` int NOT NULL,
  `reason` varchar(45) NOT NULL,
  `performed_by` int NOT NULL,
  `transaction_date` datetime NOT NULL,
  PRIMARY KEY (`tranasaction_id`),
  KEY `stock_id_fk_idx` (`stock_id`),
  KEY `perform_fk_idx` (`performed_by`),
  CONSTRAINT `perform_fk` FOREIGN KEY (`performed_by`) REFERENCES `  users` (`user_id`),
  CONSTRAINT `stock_id_fk` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_transactions`
--

LOCK TABLES `stock_transactions` WRITE;
/*!40000 ALTER TABLE `stock_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transfer_request`
--

DROP TABLE IF EXISTS `stock_transfer_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_transfer_request` (
  `transfer_request_id` int NOT NULL AUTO_INCREMENT,
  `source_outlet_id` int NOT NULL,
  `destination_outlet_id` int NOT NULL,
  `gas_type_id` int NOT NULL,
  `quantity_requested` int NOT NULL,
  `quantity_approved` int NOT NULL,
  `status_id` int NOT NULL,
  `request_at` datetime NOT NULL,
  `approved_at` datetime NOT NULL,
  PRIMARY KEY (`transfer_request_id`),
  KEY `source_outlet_fk_idx` (`source_outlet_id`),
  KEY `destination_outlet_fk_idx` (`destination_outlet_id`),
  KEY `gas_type_fk_idx` (`gas_type_id`),
  KEY `gas_status_fk_idx` (`status_id`),
  CONSTRAINT `destination_outlet_fk` FOREIGN KEY (`destination_outlet_id`) REFERENCES `outlets` (`outlet_id`),
  CONSTRAINT `gas_statusfk` FOREIGN KEY (`status_id`) REFERENCES `gas_status` (`status_id`),
  CONSTRAINT `gas_type_fk` FOREIGN KEY (`gas_type_id`) REFERENCES `gas_type` (`gas_type_id`),
  CONSTRAINT `source_outlet_fk` FOREIGN KEY (`source_outlet_id`) REFERENCES `outlets` (`outlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_transfer_request`
--

LOCK TABLES `stock_transfer_request` WRITE;
/*!40000 ALTER TABLE `stock_transfer_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_transfer_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transfer_transaction`
--

DROP TABLE IF EXISTS `stock_transfer_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_transfer_transaction` (
  `transfer_transaction_id` int NOT NULL AUTO_INCREMENT,
  `transfer_request_id` int NOT NULL,
  `performed_by` int NOT NULL,
  `quantity_transfered` int NOT NULL,
  `transaction_date` datetime NOT NULL,
  PRIMARY KEY (`transfer_transaction_id`),
  KEY `transfer_request_fk_idx` (`transfer_request_id`),
  KEY `perfomed_id_fk_idx` (`performed_by`),
  CONSTRAINT `perfomed_id_fk` FOREIGN KEY (`performed_by`) REFERENCES `  users` (`user_id`),
  CONSTRAINT `transfer_request_fk` FOREIGN KEY (`transfer_request_id`) REFERENCES `stock_transfer_request` (`transfer_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_transfer_transaction`
--

LOCK TABLES `stock_transfer_transaction` WRITE;
/*!40000 ALTER TABLE `stock_transfer_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_transfer_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `outlet_id` int NOT NULL,
  `gas_type_id` int NOT NULL,
  `available_qty` int NOT NULL,
  `last_update` datetime NOT NULL,
  `threshold_qty` int NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `outlet_foreign_k_idx` (`outlet_id`),
  KEY `gas_tyep_id_fk_idx` (`gas_type_id`),
  CONSTRAINT `gas_tyep_id_fk` FOREIGN KEY (`gas_type_id`) REFERENCES `gas_type` (`gas_type_id`),
  CONSTRAINT `outlet_foreign_k` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`outlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07 10:20:13
