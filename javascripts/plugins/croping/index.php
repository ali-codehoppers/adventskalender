
<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $src = 'google.png';
    
    require('ImageManipulation.php');
    
    $objImage = new ImageManipulation($src);
    if ( $objImage->imageok ) {
        $objImage->setCrop($_POST['x'], $_POST['y'], $_POST['w'], $_POST['h']);
        $objImage->resize(500);
        $objImage->show();
        // uncomment the following line to save the output image.
        $objImage->save('12345.png');
    } else {
        echo 'Error!';
    }
    exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js" type="text/javascript"></script>-->
    <!--<script src="jquery.Jcrop.pack.js" type="text/javascript"></script>-->
	
	<script src="./js/jquery.min.js" type="text/javascript"></script>
    <script src="./js/jquery.Jcrop.js" type="text/javascript"></script>
    <script src="./js/jquery.color.js" type="text/javascript"></script>
    <link rel="stylesheet" href="./css/jquery.Jcrop.css" type="text/css" />
    <link rel="stylesheet" href="./css/jquery.Jcrop.extras.css" type="text/css" />
    <!--<link rel="stylesheet" href="demo_files/demos.css" type="text/css" />-->
	
	
    <link rel="stylesheet" href="jquery.Jcrop.css" type="text/css" />

        <script type="text/javascript">
        //<!--

            $(function(){
                $('#cropbox').Jcrop({
                    aspectRatio: 1,
                    onSelect: updateCoords
                });
            });

            function updateCoords(c)
            {
                $('#x').val(c.x);
                $('#y').val(c.y);
                $('#w').val(c.w);
                $('#h').val(c.h);
            };

            function checkCoords()
            {
                if (parseInt($('#w').val())) return true;
                alert('Please select a crop region then press submit.');
                return false;
            };
        // -->
        </script>
    </head>
    <body>

        <h1>JCrop Crop Behavior</h1>

        <!-- This is the image we're attaching Jcrop to -->
        <img src="google.png" id="cropbox" />

        <!-- This is the form that our event handler fills -->
        <form action="index.php" method="post" onsubmit="return checkCoords();">
            <input type="hidden" id="x" name="x" />
            <input type="hidden" id="y" name="y" />
            <input type="hidden" id="w" name="w" />
            <input type="hidden" id="h" name="h" />
            <input type="submit" value="Crop Image" />
        </form>
</body>
</html>