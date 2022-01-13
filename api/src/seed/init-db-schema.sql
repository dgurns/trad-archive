-- MySQL dump 10.13  Distrib 8.0.27, for macos11.6 (x86_64)
--
-- Host: 127.0.0.1    Database: trad_archive
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `trad_archive`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `trad_archive` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `trad_archive`;

--
-- Table structure for table `audio_item`
--

DROP TABLE IF EXISTS `audio_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audio_item` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'AudioItem',
  `itmaAtomSlug` varchar(255) DEFAULT NULL,
  `urlSource` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d5eca2db8a788b6481cf843c31` (`slug`),
  KEY `FK_1252a8627b756409999142aba4f` (`createdByUserId`),
  KEY `FK_5a4c6c50d6e8426885c84438983` (`updatedByUserId`),
  FULLTEXT KEY `IDX_17c0f6ea1cd539cbd513a02926` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_012eb80e4106a106419e453a6a` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_6f0d87837164f55e54bd35844a` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_1252a8627b756409999142aba4f` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_5a4c6c50d6e8426885c84438983` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'Collection',
  `itmaAtomSlug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_75a6fd6eedd7fa7378de400b0a` (`slug`),
  KEY `FK_7fb24b585d42dd61d49770d4378` (`createdByUserId`),
  KEY `FK_95684d2c628475cd7e23df7354d` (`updatedByUserId`),
  FULLTEXT KEY `IDX_926e7bdc3f52cd582078a379f1` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_7aae0df65ce31efa9ae1890e4b` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_f1704de398d1050249e4cae870` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_7fb24b585d42dd61d49770d4378` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_95684d2c628475cd7e23df7354d` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` char(36) NOT NULL,
  `parentAudioItemId` char(36) NOT NULL,
  `text` text NOT NULL,
  `createdByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_6410acadbc3e2181ec41da5f356` (`parentAudioItemId`),
  KEY `FK_c05bb6dfa077f32115b9d5265bb` (`createdByUserId`),
  CONSTRAINT `FK_6410acadbc3e2181ec41da5f356` FOREIGN KEY (`parentAudioItemId`) REFERENCES `audio_item` (`id`),
  CONSTRAINT `FK_c05bb6dfa077f32115b9d5265bb` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrument` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'Instrument',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9281cb956dba2fe2b2006f1cbf` (`slug`),
  KEY `FK_b3a84679aa17201a72f8cef5a66` (`createdByUserId`),
  KEY `FK_fbc83e649ff982da5fc22f47a1a` (`updatedByUserId`),
  FULLTEXT KEY `IDX_efda620b8e7e274a712072e2af` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_1c6d698eecbc29074530d1b15b` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_6b87e018a1b7cdc12a7adf38f7` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_b3a84679aa17201a72f8cef5a66` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_fbc83e649ff982da5fc22f47a1a` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'Person',
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_48e444390904f250a3b20e4d57` (`slug`),
  KEY `FK_da028e48c59764ef85ca139857d` (`createdByUserId`),
  KEY `FK_d870176565d51364e84a24f8cbc` (`updatedByUserId`),
  FULLTEXT KEY `IDX_27c811883af9f3fefe79892f02` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_62b704d492298158581b75b439` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_d4c1852090697322de12e22c4b` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_d870176565d51364e84a24f8cbc` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_da028e48c59764ef85ca139857d` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'Place',
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1443badb6c7af8994264958b4d` (`slug`),
  KEY `FK_62e3dabd3294e1e769121c1c24f` (`createdByUserId`),
  KEY `FK_be3a100f740807d44e2243304be` (`updatedByUserId`),
  FULLTEXT KEY `IDX_493d5e591af774a1587d363fb8` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_555314762aec40216993528c63` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_d9922c9e94efcfef7bee42313c` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_62e3dabd3294e1e769121c1c24f` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_be3a100f740807d44e2243304be` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subjectEntityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') NOT NULL,
  `objectEntityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') NOT NULL,
  `createdByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_b067abd48e5f6212730eea141a4` (`createdByUserId`),
  CONSTRAINT `FK_b067abd48e5f6212730eea141a4` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `saved_item`
--

DROP TABLE IF EXISTS `saved_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_item` (
  `id` char(36) NOT NULL,
  `audioItemId` char(36) NOT NULL,
  `userId` char(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_84b494b938aaf3e8768d675caa0` (`audioItemId`),
  KEY `FK_10603d69cf642bd18e374adbe07` (`userId`),
  CONSTRAINT `FK_10603d69cf642bd18e374adbe07` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_84b494b938aaf3e8768d675caa0` FOREIGN KEY (`audioItemId`) REFERENCES `audio_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` char(36) NOT NULL,
  `relationshipId` char(36) NOT NULL,
  `subjectAudioItemId` char(36) DEFAULT NULL,
  `subjectPersonId` char(36) DEFAULT NULL,
  `subjectInstrumentId` char(36) DEFAULT NULL,
  `subjectPlaceId` char(36) DEFAULT NULL,
  `subjectTuneId` char(36) DEFAULT NULL,
  `subjectCollectionId` char(36) DEFAULT NULL,
  `objectAudioItemId` char(36) DEFAULT NULL,
  `objectPersonId` char(36) DEFAULT NULL,
  `objectInstrumentId` char(36) DEFAULT NULL,
  `objectPlaceId` char(36) DEFAULT NULL,
  `objectTuneId` char(36) DEFAULT NULL,
  `objectCollectionId` char(36) DEFAULT NULL,
  `subjectTimeMarkerSeconds` int DEFAULT NULL,
  `createdByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_81757663fd3a737e9de086cd06b` (`relationshipId`),
  KEY `FK_23e0827a99ccfc433dded4e9e3d` (`subjectAudioItemId`),
  KEY `FK_731faf8c98b32a8810f1e842e03` (`subjectPersonId`),
  KEY `FK_fba149c3a638db60488f4f952aa` (`subjectInstrumentId`),
  KEY `FK_8ae3ee2b36549c32ac8a368fa60` (`subjectPlaceId`),
  KEY `FK_39d5e10a46dcd680427772058c4` (`subjectTuneId`),
  KEY `FK_f2f51977d90406e83e2e205e676` (`subjectCollectionId`),
  KEY `FK_0c9359d8c826bc7a2af8d01f2e1` (`objectAudioItemId`),
  KEY `FK_6486271b16dd87223573761182e` (`objectPersonId`),
  KEY `FK_2002bd674353a6874f75a54c5a7` (`objectInstrumentId`),
  KEY `FK_7884c6a74df91f1f452e5106736` (`objectPlaceId`),
  KEY `FK_0d8fb4ad60c15a913c8a9f7ff23` (`objectTuneId`),
  KEY `FK_238c3ba24a0041a6d0e2703fef2` (`objectCollectionId`),
  KEY `FK_beb25937e143892aa1ed9b90745` (`createdByUserId`),
  CONSTRAINT `FK_0c9359d8c826bc7a2af8d01f2e1` FOREIGN KEY (`objectAudioItemId`) REFERENCES `audio_item` (`id`),
  CONSTRAINT `FK_0d8fb4ad60c15a913c8a9f7ff23` FOREIGN KEY (`objectTuneId`) REFERENCES `tune` (`id`),
  CONSTRAINT `FK_2002bd674353a6874f75a54c5a7` FOREIGN KEY (`objectInstrumentId`) REFERENCES `instrument` (`id`),
  CONSTRAINT `FK_238c3ba24a0041a6d0e2703fef2` FOREIGN KEY (`objectCollectionId`) REFERENCES `collection` (`id`),
  CONSTRAINT `FK_23e0827a99ccfc433dded4e9e3d` FOREIGN KEY (`subjectAudioItemId`) REFERENCES `audio_item` (`id`),
  CONSTRAINT `FK_39d5e10a46dcd680427772058c4` FOREIGN KEY (`subjectTuneId`) REFERENCES `tune` (`id`),
  CONSTRAINT `FK_6486271b16dd87223573761182e` FOREIGN KEY (`objectPersonId`) REFERENCES `person` (`id`),
  CONSTRAINT `FK_731faf8c98b32a8810f1e842e03` FOREIGN KEY (`subjectPersonId`) REFERENCES `person` (`id`),
  CONSTRAINT `FK_7884c6a74df91f1f452e5106736` FOREIGN KEY (`objectPlaceId`) REFERENCES `place` (`id`),
  CONSTRAINT `FK_81757663fd3a737e9de086cd06b` FOREIGN KEY (`relationshipId`) REFERENCES `relationship` (`id`),
  CONSTRAINT `FK_8ae3ee2b36549c32ac8a368fa60` FOREIGN KEY (`subjectPlaceId`) REFERENCES `place` (`id`),
  CONSTRAINT `FK_beb25937e143892aa1ed9b90745` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_f2f51977d90406e83e2e205e676` FOREIGN KEY (`subjectCollectionId`) REFERENCES `collection` (`id`),
  CONSTRAINT `FK_fba149c3a638db60488f4f952aa` FOREIGN KEY (`subjectInstrumentId`) REFERENCES `instrument` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `takedown_request`
--

DROP TABLE IF EXISTS `takedown_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `takedown_request` (
  `id` char(36) NOT NULL,
  `type` enum('COPYRIGHT','PERFORMER') NOT NULL,
  `message` text NOT NULL,
  `status` enum('PENDING','APPROVED','DENIED') DEFAULT 'PENDING',
  `createdByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedByUserId` char(36) DEFAULT NULL,
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `audioItemId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_4b57e3d008abb21714be3c7b22` (`audioItemId`),
  KEY `FK_6fe209d711991c1a196a887b636` (`createdByUserId`),
  KEY `FK_adb3bca8319b7c27dbf3ec38052` (`updatedByUserId`),
  CONSTRAINT `FK_4b57e3d008abb21714be3c7b222` FOREIGN KEY (`audioItemId`) REFERENCES `audio_item` (`id`),
  CONSTRAINT `FK_6fe209d711991c1a196a887b636` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_adb3bca8319b7c27dbf3ec38052` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tune`
--

DROP TABLE IF EXISTS `tune`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tune` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `aliases` text,
  `description` text,
  `status` enum('PUBLISHED','TAKEN_DOWN') NOT NULL DEFAULT 'PUBLISHED',
  `createdByUserId` char(36) DEFAULT NULL,
  `updatedByUserId` char(36) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `entityType` enum('AudioItem','Person','Instrument','Place','Tune','Collection') DEFAULT 'Tune',
  `theSessionTuneId` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `meter` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `abc` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0c40b0dbe742aa63a6bb2b5231` (`slug`),
  KEY `FK_622835af391f05750fe194eb15b` (`createdByUserId`),
  KEY `FK_e29a2fc6cb1af1779a7ba55a417` (`updatedByUserId`),
  FULLTEXT KEY `IDX_03ee6f8829912ff0af96eb1de9` (`name`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_a0031b16785b3b7dfed915e249` (`aliases`) /*!50100 WITH PARSER `ngram` */ ,
  FULLTEXT KEY `IDX_6d97fb12657d78f5e69c7eeefb` (`description`) /*!50100 WITH PARSER `ngram` */ ,
  CONSTRAINT `FK_622835af391f05750fe194eb15b` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_e29a2fc6cb1af1779a7ba55a417` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `role` enum('User','Admin') NOT NULL DEFAULT 'User',
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `autoLoginTokenHashed` varchar(255) DEFAULT NULL,
  `autoLoginTokenExpiry` timestamp NULL DEFAULT NULL,
  `copyrightPermissionStatus` enum('FullNonCommercialGranted') DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verification_request`
--

DROP TABLE IF EXISTS `verification_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_request` (
  `id` char(36) NOT NULL,
  `personId` char(36) NOT NULL,
  `status` enum('Pending','Approved','Denied') DEFAULT 'Pending',
  `copyrightPermissionStatus` enum('FullNonCommercialGranted') DEFAULT NULL,
  `imageS3Key` varchar(255) DEFAULT NULL,
  `createdByUserId` char(36) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedByUserId` char(36) DEFAULT NULL,
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `IDX_763df5ddfc5de533461d83add6` (`personId`),
  KEY `FK_a8f2aa794f5a5df79e3f9cd415a` (`createdByUserId`),
  KEY `FK_d8dc55c52d35f4c091110fde7ee` (`updatedByUserId`),
  CONSTRAINT `FK_763df5ddfc5de533461d83add6b` FOREIGN KEY (`personId`) REFERENCES `person` (`id`),
  CONSTRAINT `FK_a8f2aa794f5a5df79e3f9cd415a` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_d8dc55c52d35f4c091110fde7ee` FOREIGN KEY (`updatedByUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-13 12:25:55
