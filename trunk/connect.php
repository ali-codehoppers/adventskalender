<?php

/*
  In this class we instantiate an SQL Connection object. Connection details are assinged to
  object variabes so that they can be used when connecting to the database. The two main
  functions are conn() and disc(). They are for connecting and disconnecting to the SQL database.
 */

 
// $con = mysql_connect("localhost","nadeem_advents","");




//print_r($ini['dbHost']);
//print_r($ini_array[])
//$ini = array();
//$ini["photo"]["price"] = 5.00;
//$ini["shipping"]["South Africa"]["value"] = 50.00;










$ini=parse_ini_file('config.ini',false);

$con = mysql_connect($ini['dbHost'],$ini['dbUser'],$ini['dbPass']);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

// some code
  
  
 // $abc=$_POST['to_save'];

/*if(mysql_select_db("Adventkalender"))
{
    $q="INSERT INTO `Adventkalender`.`save`( `saveJSON` )VALUES('$abc');";
    echo $q;
    if(mysql_query($q))
    {
       // echo "inserted";
    }
    else
    {
        //echo "not inserted";
    }
}
*/
 else{
 
    
   // echo "connected";
}


/*

function getcords($table, $filename) 
                {

    
    
$query = mysql_query("SELECT $field FROM contacts WHERE contact_id='". mysql_real_escape_string( $id ) ."' and user_id='1';");
$retval = mysql_fetch_object($query)->$field;

    $query = sprintf("SELECT id, bgId, bottom, left, width, height From ". mysql_real_escape_string( $table ) ." WHERE bgId='".mysql_real_escape_string($filename)."'");
    $result = mysql_query($query);

   


}



mysql_close($con);
*/

?>