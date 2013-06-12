<?php
function ae_detect_ie()
{
    if (isset($_SERVER['HTTP_USER_AGENT']) &&
    (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false))
        return true;
    else
        return false;
}
header('Content-Type: text/css; charset=UTF-8');
require_once("./connect.php");
$ini = parse_ini_file('config.ini', false);
if (!mysql_select_db($ini['dbName'])) {
    exit();
}
    $q = "select * from fontfile";
    //$q = "select * from fillings ORDER BY id limit " . (($pageNum - 1) * 6) . ",6"; //testing
    $r = mysql_query($q);
    //$num_rows = mysql_num_rows($r);

    //echo $num_rows;
    $count = 0;
    while ($row = mysql_fetch_array($r)) {
        $displayName = $row['displayName'];
        $ttfFile = $row['ttfFile'];
        $eotFile = $row['eotFile'];
        echo "@font-face"."\n".
            "{"."\n".
            "font-family: \"$displayName\";"."\n".
            "src: url('".$eotFile."');"."\n";
            if(!ae_detect_ie()) {
               echo "src: local(\"$displayName\"),url('".$ttfFile."') format('truetype');"."\n";
            }else {
               echo "src: local(\"$displayName\"),url('".$ttfFile."') format('truetype') format('embedded-opentype');"."\n";
            }
            echo "font-weight:normal;".
            "\nfont-style:normal;".
            "\n}\n";
        $count++;
    }
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

?>
