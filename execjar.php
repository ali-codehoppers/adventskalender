<?php 

//exec("java -jar EPSProject.jar arguments", $output); 

//$abc=$_POST['to_save'];
//$abc=str_replace("\"","\\\"",$abc);


require_once("./connect.php");



$ini=parse_ini_file('config.ini',false);
if(mysql_select_db($ini['dbName']))
{
    $q="Select Max(id) as id From cards ;";
    $r = mysql_query($q);
while($vname = mysql_fetch_array($r)){
$id = $vname['id'];
    
}


//$id=18;
//echo ($abc);
echo ($id);
//exec("java -jar C:\wamp\www\VCCC\\EPSProject.jar \""+$abc+"\"" , $output);
//exec("java -jar C:\wamp\www\VCCC\\EPSIMAGE.jar $id", $output );
exec("java -jar epsAKalender.jar $id", $output );//forserver
//
//print_r($output);


}

?>