<?php 

//exec("java -jar EPSProject.jar arguments", $output); 

//$abc=$_POST['to_save'];
//$abc=str_replace("\"","\\\"",$abc);


require_once("./connect.php");
require_once('class.phpmailer.php');

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
$tempmessage=$firmaField."\r\n<br/>".$strasseField."\r\n<br/>".$anredeField."\r\n<br/>".$plzField."\r\n<br/>".$ortField."\r\n<br/>".$vornameField."\r\n<br/>".$landField."\r\n".$nachnameField."\r\n<br/>".$telefonField."\r\n<br/>".$emailField."\r\n<br/>".$anzahlField."\r\n<br/>".$commentField;

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
    mail_attachment($emailField,$ini["clientEmail"],"Ihr Adventskalender Anfrage",$tempmessage,"noreply@advents.com","EPSIMAGE/Front_EPS_".$id.".pdf");
    //print_r($output);
}
function mail_attachment($to,$clientEmail, $subject, $message, $from, $file) {

    $mail= new PHPMailer(); // defaults to using php "mail()"

    $mail->IsSendmail(); // telling the class to use SendMail transport

    $mail->SetFrom($from, '');
    $mail->AddAddress($to, "");
    $mail->AddBCC($clientEmail, '');

    $mail->Subject    = $subject;
    $body=$message;
    //$mail->AltBody    = $message; // optional, comment out and test
    $mail->MsgHTML($body);
    $mail->AddAttachment($file);      // attachment
    if(!$mail->Send()) {
       // echo "Mailer Error: " .
       return $mail->ErrorInfo;
    } else {
      //  echo
       return "Message sent!";
    }
}

?>