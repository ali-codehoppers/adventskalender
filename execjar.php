<?php 

//exec("java -jar EPSProject.jar arguments", $output); 

//$abc=$_POST['to_save'];
//$abc=str_replace("\"","\\\"",$abc);


require_once("./connect.php");

$firmaField=$_POST['firmaField'];
$strasseField=$_POST['strasseField'];
$anredeField=$_POST['anredeField'];
$plzField=$_POST['plzField'];
$ortField=$_POST['ortField'];
$vornameField=$_POST['vornameField'];
$landField=$_POST['landField'];
$nachnameField=$_POST['nachnameField'];
$telefonField=$_POST['telefonField'];
$emailField=$_POST['emailField'];
$anzahlField=$_POST['anzahlField'];
$commentField=$_POST['commentField'];
$tempmessage=$firmaField."\r\n".$strasseField."\r\n".$anredeField."\r\n".$plzField."\r\n".$ortField."\r\n".$vornameField."\r\n".$landField."\r\n".$nachnameField."\r\n".$telefonField."\r\n".$emailField."\r\n".$anzahlField."\r\n".$commentField;

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
$ini=parse_ini_file('config.ini',false);
mail_attachment($emailField.",".$ini["clientEmail"],"advent",$tempmessage,"noreply@advents.com","./EPSIMAGE/Front_EPS_".$id.".pdf");
}

function mail_attachment($to, $subject, $message, $from, $file) {
  // $file should include path and filename
  $filename = basename($file);
  $file_size = filesize($file);
  $content = chunk_split(base64_encode(file_get_contents($file))); 
  $uid = md5(uniqid(time()));
  $from = str_replace(array("\r", "\n"), '', $from); // to prevent email injection
  $header = "From: ".$from."\r\n"
      ."MIME-Version: 1.0\r\n"
      ."Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n"
      ."This is a multi-part message in MIME format.\r\n" 
      ."--".$uid."\r\n"
      ."Content-type:text/plain; charset=iso-8859-1\r\n"
      ."Content-Transfer-Encoding: 7bit\r\n\r\n"
      .$message."\r\n\r\n"
      ."--".$uid."\r\n"
      ."Content-Type: application/octet-stream; name=\"".$filename."\"\r\n"
      ."Content-Transfer-Encoding: base64\r\n"
      ."Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n"
      .$content."\r\n\r\n"
      ."--".$uid."--"; 
  return mail($to, $subject, "", $header);
 }

?>