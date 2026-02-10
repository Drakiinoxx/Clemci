-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: clemci
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Tomate'),(2,'Fior Di Latte'),(3,'Basilic'),(4,'Huile d\'olive'),(5,'Champignon'),(6,'Chorizo'),(7,'Jambon blanc'),(8,'Crème'),(9,'Pomme de terre'),(10,'Poitrine fumée'),(11,'Taleggio'),(12,'Oignon'),(13,'Pecorino'),(14,'Parmesan'),(15,'Gorgonzola'),(16,'Chèvre'),(17,'Houmous'),(18,'Légumes de saison'),(19,'Pesto'),(20,'Mortadelle'),(21,'Roquette'),(22,'Mozzarella'),(23,'Pistache'),(24,'Tomate cerise'),(25,'Burrate'),(26,'Courgette'),(27,'Oignon caramélisé'),(28,'Viande hachée préparée'),(29,'Cheddar'),(30,'Scamorza'),(31,'Miel'),(32,'Noix'),(33,'Pancetta'),(34,'Anchois'),(35,'Câpres'),(36,'Jambon'),(37,'Poulet'),(38,'Estragon'),(39,'Poivron');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza_ingredients`
--

DROP TABLE IF EXISTS `pizza_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza_ingredients` (
  `pizza_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`pizza_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `pizza_ingredients_ibfk_1` FOREIGN KEY (`pizza_id`) REFERENCES `pizzas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pizza_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza_ingredients`
--

LOCK TABLES `pizza_ingredients` WRITE;
/*!40000 ALTER TABLE `pizza_ingredients` DISABLE KEYS */;
INSERT INTO `pizza_ingredients` VALUES (1,1),(2,1),(3,1),(8,1),(9,1),(10,1),(11,1),(13,1),(15,1),(16,1),(17,1),(1,2),(2,2),(3,2),(5,2),(11,2),(12,2),(13,2),(15,2),(16,2),(17,2),(1,3),(8,3),(1,4),(8,4),(2,5),(3,5),(9,5),(11,5),(15,5),(2,6),(15,6),(3,7),(4,8),(12,8),(4,9),(4,10),(11,10),(4,11),(4,12),(6,12),(9,12),(10,12),(14,12),(15,12),(16,12),(5,13),(13,13),(14,13),(5,14),(5,15),(5,16),(12,16),(6,17),(7,17),(14,17),(6,18),(6,19),(7,19),(9,19),(7,20),(7,21),(8,21),(13,21),(7,22),(7,23),(13,23),(8,24),(9,24),(8,25),(9,26),(10,27),(10,28),(10,29),(11,30),(12,31),(12,32),(13,33),(15,33),(16,34),(16,35),(15,36),(17,36),(14,37),(14,38),(14,39);
/*!40000 ALTER TABLE `pizza_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizzas`
--

DROP TABLE IF EXISTS `pizzas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizzas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prix` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizzas`
--

LOCK TABLES `pizzas` WRITE;
/*!40000 ALTER TABLE `pizzas` DISABLE KEYS */;
INSERT INTO `pizzas` VALUES (1,'MARGUITA',9.00),(2,'PIQUENTITI',11.00),(3,'IREINE',11.00),(4,'GILBERT MONTAGNARDE',14.00),(5,'PERMIERE',14.00),(6,'VEGELODIE',11.00),(7,'LOLITACHE',15.00),(8,'BURRATA',13.00),(9,'POPOTAGERE',9.50),(10,'LA M BURGER',15.00),(11,'FUMAX',15.00),(12,'MI\'CHEVRE/MI\'MIEL',12.00),(13,'MAESTRO',14.50),(14,'POULETTE',14.00),(15,'PAUPIETTE',14.00),(16,'MARINIERE',11.00),(17,'MAET\'MAELLE',9.00),(18,'PIZZA EPHEMERE',0.00);
/*!40000 ALTER TABLE `pizzas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-09 10:21:41
