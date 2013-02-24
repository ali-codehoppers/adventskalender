
<?php

require_once("./connect.php");

$abc=$_POST['bgsrc']; //contains the id of clicked format


//echo($abc);

$ini = parse_ini_file('config.ini', false);

mysql_select_db($ini['dbName']);


//session_start();
// store session data
//$_SESSION['format']=$abc;


//echo "selected format=". $_SESSION['format'];


//echo $abc;


if (mysql_select_db($ini['dbName'])) {
    //$q="INSERT INTO `Adventkalender`.`save`( `saveJSON` )VALUES('$abc');";
    //$q = "select * from login where email='" . $email . "' and password='" . $pass . "';";

    $q = "Select * From shapes Where id='".$abc."';";

    $r = mysql_query($q);

    while ($row = mysql_fetch_array($r)) {

        $formatName = $row['format'];

		echo $formatName;
		
        }
}
?>