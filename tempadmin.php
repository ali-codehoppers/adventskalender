<?php

require_once("./connect.php");
$temp1 = $_POST['tt1'];
$temp2 = $_POST['tt2'];
$ini=parse_ini_file('config.ini',false);
if(mysql_select_db($ini['dbName'])){
    $q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('A5-Schoko-Adventskalender BUSINESS', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Knusper-Adventskalender BUSINESS', '$temp2');";
mysql_query($q);
/*$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Premium Wunsch-Adventskalender BUSINESS mit Fruchtgummi Weihnachten im Flowpack 16 g', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Premium Wunsch-Adventskalender BUSINESS mit Lubecker Marzipanmischung', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Classic Schoko-Wand-Adventskalender BUSINESS', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Classic Schoko-Tisch-Adventskalender BUSINESS', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Schoko-Sonderform-Adventskalender BUSINESS', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Wunsch-Adventskalender BUSINESS mit Vollmilch-Naps von Lindt & Sprungli', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Wunsch-Adventskalender BUSINESS mit Alpenmilchschokoladen-Naps von Kraft Foods', '$temp2');";
mysql_query($q);
$q = "INSERT INTO `package_backgrounds`( `packageId`, `backgrounds`  )VALUES('Wunsch-Adventskalender BUSINESS mit Dextro Energy Traubenzucker-Tafelchen', '$temp2');";
mysql_query($q);*/
	}
        
        
   /*
    * 
    * Premium Wunsch-Adventskalender BUSINESS mit Ferrero Rocher
    * Premium Wunsch-Adventskalender BUSINESS mit Ferrero Rondnoir
                             <option></option>
                             <option></option>
                             <option>Premium Wunsch-Adventskalender BUSINESS mit Fruchtgummi Weihnachten im Flowpack 16 g</option>
                             <option></option>
      */               
        
?>