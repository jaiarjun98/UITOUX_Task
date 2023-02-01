CREATE TABLE `tbl_users` (
  `userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `profilename` varchar(50) DEFAULT NULL,
  `emailid` varchar(100) NOT NULL,
  `loginid` varchar(100) NOT NULL,
  `fullname` varchar(256) NOT NULL,
  `loginpassword` varchar(256) NOT NULL,
  `mobileno` varchar(20) DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (userid)
) ENGINE=InnoDB CHARSET=utf8;

----------------------------------

CREATE TABLE `tbl_products` (
  `productid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productname` varchar(256) NOT NULL,
  `partnumber` varchar(100) NOT NULL,
  `productdesc` TEXT,
  `sku` varchar(50) DEFAULT NULL,
  `productweight` varchar(50) DEFAULT NULL,
  `avgrating` varchar(20) DEFAULT NULL,
  `price` DECIMAL(20,2) NOT NULL,
  `selltaxid` bigint(20) DEFAULT NULL,
  `isfeatured` ENUM('Y','N') DEFAULT 'N',
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (productid)
) ENGINE=InnoDB CHARSET=utf8;

----------------------------------------
CREATE TABLE `tbl_productreviews` (
  `reviewid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productid` bigint(20) NOT NULL,
  `review` TEXT ,
  `userid` bigint(20) DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (reviewid)
) ENGINE=InnoDB CHARSET=utf8;

------------------------

CREATE TABLE `tbl_userratings` (
  `rattingid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productid` bigint(20) NOT NULL,
  `rating` bigint(10) NOT NULL,
  `userid` bigint(20) DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (rattingid)
) ENGINE=InnoDB CHARSET=utf8;

------------------------------------

CREATE TABLE `tbl_product_taxes` (
  `taxid` bigint(20) NOT NULL AUTO_INCREMENT,
  `taxcode` VARCHAR(50) DEFAULT NULL,
  `taxprcnt` Decimal(20,2) NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (taxid)
) ENGINE=InnoDB CHARSET=utf8;


--------------------------------------


CREATE TABLE `tbl_product_category` (
  `categoryid` bigint(20) NOT NULL AUTO_INCREMENT,
  `categoryname` VARCHAR(100) NOT NULL,
  `categorycode` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (categoryid)
) ENGINE=InnoDB CHARSET=utf8;


--------------------

CREATE TABLE `tbl_offers` (
  `offerid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productid` bigint(20) DEFAULT NULL,
  `offerfrom` DATETIME DEFAULT NULL,
  `offerto` DATETIME DEFAULT NULL,
  `offerprice` DECIMAL(20,2) NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'Active',
  `createdby` VARCHAR(50) NOT NULL,
  `createddt` DATETIME NOT NULL,
  `lastupdatedby` VARCHAR(50) DEFAULT NULL,
  `lastupdateddt` DATETIME DEFAULT NULL,
  PRIMARY KEY (offerid)
) ENGINE=InnoDB CHARSET=utf8;
