<?php

$picMaxSize = 6000;
$SEPERATOR = "@@@";
$dropWidth = 980;
$dropHeight = 750;
$backgroundSelectionThumbsWidth = 216;
$backgroundSelectionThumbsHeight = 198;

require_once("./connect.php");
$ini = parse_ini_file('config.ini', false);
mysql_select_db($ini['dbName']);
if (!mysql_select_db($ini['dbName'])) {
    exit();
}

$type = $_REQUEST['type'];
if ($type == NULL) {
    exit();
}

if ($type == "uploadPicture") {
    $path = "uploads/";
    $valid_formats = array("jpg", "png", "gif", "bmp");
    if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
        $name = $_FILES['photoimg']['name'];
        $size = $_FILES['photoimg']['size'];

        if (strlen($name)) {
            $name = pathinfo($name);
            $txt = $name['filename'];
            $ext = $name['extension'];


            //list($txt, $ext) = explode(".", $name);


            $ext = strtolower($ext);

            if (in_array($ext, $valid_formats)) {


                if ($size < ($picMaxSize * $picMaxSize)) {
                    $actual_image_name = time() . substr(str_replace(" ", "_", $txt), 5) . "." . $ext;
                    $tmp = $_FILES['photoimg']['tmp_name'];
                    if (move_uploaded_file($tmp, $path . $actual_image_name)) {
                        //mysql_query("UPDATE users SET profile_image='$actual_image_name' WHERE uid='$session_id'");
                        $abc = "uploads/" . $actual_image_name;
                        list($width, $height, $type, $attr) = getimagesize($abc);
                        echo $width . $SEPERATOR . $height . $SEPERATOR;
                        echo "<img src='uploads/" . $actual_image_name . "' id='upimg' class='preview'>";
//////                  
                        $temp = 'userid';

                        $q = "INSERT INTO `uploads`( `source`)VALUES('$actual_image_name');";
                        // echo $q;
                        if (mysql_query($q)) {
                            $q = "Select Max(id) as id From uploads ;";
                            $r = mysql_query($q);
                            while ($vname = mysql_fetch_array($r)) {
                                $id = $vname['id'];
                            }
                            echo ($SEPERATOR . $id);
// echo "inserted";
                        } else {
                            //echo "not inserted";
                        }
                    }
                    else
                        echo "failed";
                }
                else
                    echo "Image file size max 1 MB";
            }
            else
                echo "Invalid file format..";
        }

        else
            echo "Please select image..!";

        exit;
    }
}
else if ($type == "uploadBackground") {


    /* session_start();
      $session_id='1'; //$session id */
    $path = "uploads/";

    $valid_formats = array("jpg", "png", "gif", "bmp");
    if (isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
        $name = $_FILES['photoimg2']['name'];
        $size = $_FILES['photoimg2']['size'];

        if (strlen($name)) {

            $name = pathinfo($name);
            $txt = $name['filename'];
            $ext = $name['extension'];


            //list($txt, $ext) = explode(".", $name);

            $ext = strtolower($ext);
            if (in_array($ext, $valid_formats)) {

                if ($size < ($picMaxSize * $picMaxSize)) {


                    $my_string = rand_string(10);
                    $actual_image_name = "back" . $my_string . ".png";

                    echo $actual_image_name . ",";
                    $tmp = $_FILES['photoimg2']['tmp_name'];
                    if (move_uploaded_file($tmp, $path . $actual_image_name)) {
                        echo 1;
                    }
                    else
                        echo 0;
                }
                else
                    echo 0;
            }
            else
                echo "Invalid file format..";
        }

        else
            echo "Please select image..!";

        exit;
    }
}
else if ($type == "saveJasonToDb") {
    $abc = $_POST['itemJasonToSaveInDb'];
    $temp = 'userid';
    $q = "INSERT INTO `cards`( `json`, `userId`  )VALUES('$abc', '$temp');";
    echo $q;
    if (mysql_query($q)) {
        // echo "inserted";
    } else {
        //echo "not inserted";
    }
} else if ($type == "getDimensionsOfWhiteArea") {
    $index = $_POST['src'];
    $q = "Select * From editable_area Where bgId='" . $index . "';";
    $r = mysql_query($q);
    while ($vname = mysql_fetch_array($r)) {

        //$venue = $vname['bgId'];
        $bottom = $vname['bottom'];
        $left = $vname['left'];
        $width = $vname['width'];
        $height = $vname['height'];
        $to_send = "" . $bottom . " " . $left . " " . $width . " " . $height;
        echo $to_send;
    }
    if (mysql_num_rows($r) == 1) {
        $row = mysql_fetch_array($r);
        exit($row['bgId']);
        if (mysql_query($q)) {
            echo "inserted";
        } else {
            echo "not inserted";
        }
    } else {

        echo "error in insertion";
    }
} else if ($type == "getFillingsPage") {
    $pageNum = 1;
    if (isset($_POST['pageNum'])) {
        $pageNum = $_POST['pageNum'];
    }
    $formatId = $_POST['formatId'];
    $q = "select * from fillings where format_id ='" . $formatId . "' ORDER BY id limit " . (($pageNum - 1) * 6) . ",6";
    //$q = "select * from fillings ORDER BY id limit " . (($pageNum - 1) * 6) . ",6"; //testing
    $r = mysql_query($q);
    $num_rows = mysql_num_rows($r);

    //echo $num_rows;
    $count = 0;
    while ($row = mysql_fetch_array($r)) {

        $fillingId = $row['id'];
        $formatName = $row['image_path'];
        $fillingTitle = $row['name'];
        $fillingTitle = str_replace(array('"'), array("&#34;"), $fillingTitle);
        $fillingName = $fillingTitle;
        if (strlen($fillingTitle) > 16) {
            $fillingName = substr($fillingTitle, 0, 16) . "...";
        }
        echo "<li title='$fillingTitle'><center><img alt='filling-" . $fillingId . "' src='" . $formatName . "' /><br/><span>$fillingName</span><br/><input id='filling-$fillingId ' class='filling-radio' type='radio' name='filling'></center></li>";
        $count++;
    }
} else if ($type == "getFillingsForFormat") {
    $formatId = $_POST['formatId'];
    $q = "select * from fillings where format_id ='" . $formatId . "' ORDER BY id ";
    //$q = "select * from fillings"; //testing
    $r = mysql_query($q);
    $num_rows = mysql_num_rows($r);
    $count = 0;
    $data = "";
    while ($row = mysql_fetch_array($r)) {
        $formatName = $row['image_path'];
        $fillingTitle = $row['name'];
        $fillingTitle = str_replace(array('"'), array("&#34;"), $fillingTitle);
        $fillingName = $fillingTitle;
        if (strlen($fillingTitle) > 16) {
            $fillingName = substr($fillingTitle, 0, 16) . "...";
        }
        $fillingId = $row['id'];
        $data.= "<li  title='$fillingTitle'><center><img alt='filling" . $fillingId . "' src='" . $formatName . "' /><br/><span >$fillingName</span><br/><input id='filling-" . $fillingId . "' class='filling-radio' type='radio' name='filling'></center></li>";
        $count++;
        if ($num_rows > 6) {
            if ($count > 5) {
                break;
            }
        }
    }
    $json = "{";
    if ($num_rows > 6) {
        $json.="\"pagination\":true";
    } else {
        $json.="\"pagination\":false";
    }
    $json.=",\"data\":\"" . $data . "\",\"totalCount\":" . $num_rows . "}";
    echo $json;
} else if ($type == "getDesignPage") {

    $pageNum = 1;
    if (isset($_POST['pageNum'])) {
        $pageNum = $_POST['pageNum'];
    }
    $packageId = $_POST['packageId'];
    $fillingId = $_POST['fillingId'];
    $q = "select * from backgrounds where package_id='" . $packageId . "' AND (filling_id='" . $fillingId . "' OR filling_id is NULL) ORDER BY id LIMIT " . (($pageNum - 1) * 16) . ",16";

    $r = mysql_query($q);
    $num_rows = mysql_num_rows($r);
    $data = "";
    $count = 0;
    while ($row = mysql_fetch_array($r)) {
        $img = $row['image_path'];
        $img = str_replace("img/bgimgs/", "img/bgimgs/thumbs/", $img);
        $data.= "<li><a href='#'><img src='" . $img . "'  style='cursor:pointer; border:5px solid grey;' width='" . $backgroundSelectionThumbsWidth . "' height='" . $backgroundSelectionThumbsHeight . "' alt='" . $img . "'/></a></li>";
        //herezain
        $count++;
        if ($num_rows > 16) {
            if ($count > 15) {
                break;
            }
        }
    }
    echo $data;
} else if ($type == "getDesigns") {
    $packageId = $_POST['packageId'];
    //exit ($packageId);
    $fillingId = $_POST['fillingId'];
    $q = "select * from backgrounds where package_id='" . $packageId . "' AND (filling_id='" . $fillingId . "' OR filling_id is NULL) ORDER BY id ";

    $r = mysql_query($q);
    $num_rows = mysql_num_rows($r);
    //echo $num_rows;
    $count = 0;
    $data = "";
    while ($row = mysql_fetch_array($r)) {
        $img = $row['image_path'];
        $img = str_replace("img/bgimgs/", "img/bgimgs/thumbs/", $img);
        //$data.= "<li><img alt='filling" . $count . "' src='" . $formatName . "' /><input id='filling" . $count . "' class='filling-radio' type='radio' name='filling'></li>";
        $data.= "<li><a href='#'><img src='" . $img . "'  style='cursor:pointer;border:5px solid white' width='" . $backgroundSelectionThumbsWidth . "' height='" . $backgroundSelectionThumbsHeight . "' alt='" . $img . "'/></a></li>";
        //herezain
        $count++;
        if ($num_rows > 16) {
            if ($count > 15) {
                break;
            }
        }
    }

    $json = "{";
    if ($num_rows > 16) {
        $json.="\"pagination\":true";
    } else {
        $json.="\"pagination\":false";
    }
    $json.=",\"data\":\"" . $data . "\",\"totalCount\":" . $num_rows . "}";
    echo $json;
} else if ($type == "getTotalFillings") {
    $q = "Select * From fillings";
    $r = mysql_query($q);
    echo mysql_num_rows($r);
} else if ($type == "FitBackgroundInDrop") {
    $src = $_POST['src'];
    list($width, $height, $type, $attr) = getimagesize($src);
    $aspectratio = $width / $height;
    if ($aspectratio >= 1) {//width is greater than height
        if ($width >= $dropWidth) {
            echo ("width100% ");
            $h = ceil($dropWidth / $aspectratio);
            echo ($h . " " . $aspectratio);
        } else if ($width < $dropWidth) {
            echo ("width100% ");
            $h = ceil($dropWidth / $aspectratio);
            echo ($h . " " . $aspectratio);
        }
    } else if ($aspectratio < 1) {
        echo ("height100% ");
        $w = ceil($dropHeight * $aspectratio);
        echo ($w . " " . $aspectratio);
    }
} else if ($type == "CropImage") {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $src = $_POST['src'];
        require('./javascripts/plugins/croping/ImageManipulation.php');
        $objImage = new ImageManipulation($src);
        if ($objImage->imageok) {
            $objImage->setCrop($_POST['x'], $_POST['y'], $_POST['w'], $_POST['h']);
            $objImage->resize(500);
            $filename_ext = pathinfo($src, PATHINFO_EXTENSION);
            $src = preg_replace('/(\.gif|\.jpg|\.png)/', '1', "$src");
            $src = $src . "." . $filename_ext;
            $objImage->save($src);
        } else {
            echo 'Error!';
        }
        exit;
    }
} else if ($type == "getSideButtons") {
    session_start();

    $temp = $_SESSION['format'];
    $q = "Select * From shapes Where id='$temp'";
    $r = mysql_query($q);
    while ($row = mysql_fetch_array($r)) {

        $formatName = $row['id'];
        $front = $row['front'];
        $back = $row['back'];
        $left = $row['left'];
        $right = $row['right'];
        $top = $row['top'];
        $bottom = $row['bottom'];

        if ($front == 1) {
            echo"<button name='addtext' class='toolbarViewBtn'  id='frontdivimg'><img src='img/imagesapp/front_view.png' width='18' alt='Front View' /></button>";
        }
        if ($back == 1) {
            echo"<button name='addtext' class='toolbarViewBtn'  id='backdivimg'><img src='img/imagesapp/back_view.png' width='18' alt='Back View' /></button>";
        }
        if ($left == 1) {
            echo "<button name='addtext' class='toolbarViewBtn'  id='leftdivimg'><img src='img/imagesapp/left_view.png' width='18' alt='Left View' /></button>";
        }
        if ($right == 1) {
            echo "<button name='addtext' class='toolbarViewBtn'  id='rightdivimg'><img src='img/imagesapp/right_view.png' width='18' alt='Right View' /></button>";
        }
    }
} else if ($type == "getImagePathAndDimensions") {

    //file to shift predefined image from directory to another directory
    $src = $_POST['bgsrc'];
    $keys = parse_url($src); // parse the url
    $path = explode("/", $keys['path']); // splitting the path
    $last = end($path); // get the value of the last element 
    $packageType = $_POST['packageType'];

    if ($packageType == 'BASIC')
        $src = "img/bgimgs2/" . $last;
    else
        $src = "img/bgimgs/" . $last;

    list($width, $height, $type, $attr) = getimagesize($src);
    $aspectratio = $width / $height;
    if ($aspectratio >= 1) {//width is greater than height
        if ($width >= $dropWidth) {
            echo ("width100% ");
            $h = ceil($dropWidth / $aspectratio);
            echo ($h . " " . $aspectratio);
        } else if ($width < $dropWidth) {
            echo ("width100% ");
            $h = ceil($dropWidth / $aspectratio);
            echo ($h . " " . $aspectratio);
        }
    } else if ($aspectratio < 1) {
        echo ("height100% ");
        $w = ceil($dropHeight * $aspectratio);
        echo ($w . " " . $aspectratio);
    }
    echo(" " . $src);
} else if ($type == "getImageDimensionsForAddImage") {
    $abc = $_POST['src'];
    list($width, $height, $type, $attr) = getimagesize($abc);
    echo($width . " " . $height);
} else if ($type == "getImageFromUploads") {
    session_start();
    $src = $_POST['src'];
    $q = "Select * From uploads Where id='$src'";
    $r = mysql_query($q);
    while ($row = mysql_fetch_array($r)) {
        $data = $row['source'];
        echo $data;
    }
} else if ($type == "storeImageToDb") {
    $imagesrc = $_POST['src'];
    $temp = 'userid';
    $q = "INSERT INTO `uploads`( `source`)VALUES('$imagesrc');";
    //max id pakro or echo keraa do
} else if ($type == "getFormatsFromDb") {

    $packageType = $_POST['packageType'];
    $q = "Select * from formats Where package_id='" . $packageType . "';";
    $r = mysql_query($q);
    $count = 0;
    while ($row = mysql_fetch_array($r)) {
        $count++;
        $formatName = $row['name'];
        $formatId = $row['id'];
        $imagePath = $row['image_path'];
        echo "<option value='$formatId' pic='$imagePath'>" . $formatName . "</option>";
    }
}

//end of null check
function rand_string($length) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    $size = strlen($chars);
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[rand(0, $size - 1)];
    }

    return $str;
}

?>