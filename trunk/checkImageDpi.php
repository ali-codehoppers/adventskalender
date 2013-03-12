<?php  

$filename=$_POST['bgsrc'];
    



$blah = getimagesize($filename);
    if($blah['channels']==4){
// it is cmyk
    
        
    }
    else{
       // exit("not cmyk");
       echo 'not cmyk';
    }




print_r (get_dpi($filename));
function get_dpi($filename){  
      
        // open the file and read first 20 bytes.  
        $a = fopen($filename,'r');  
        $string = fread($a,20);  
        fclose($a);  
      
        // get the value of byte 14th up to 18th  
        $data = bin2hex(substr($string,14,4));  
        $x = substr($data,0,4);  
        $y = substr($data,0,4);  
        return array(hexdec($x),hexdec($y));  
      
    }  
//print_r(get_dpi('filename.jpg'));        
    // output the result:  
    
?>  