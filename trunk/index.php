     
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"  />

        <title>Choose Package</title>
        <!--my C-->
        <link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.8.23.custom.css" /><!--add s to run this to put right corner-->
        <!--<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />-->
        <!--<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>-->
        <script type="text/javascript" src="./javascripts/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="./javascripts/js/jquery-ui-1.8.23.custom.min.js"></script>
        <!--<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" type="text/javascript"></script>-->
        <script type="text/javascript" src="./javascripts/plugins/jquery.unitconversion.js"></script><!--/for unit conversion-->
        <script src="./javascripts/plugins/croping/js/jquery.Jcrop.js" type="text/javascript"></script><!--/for cropping-->
        <script src="./javascripts/plugins/croping/js/jquery.color.js" type="text/javascript"></script><!--/for cropping-->
        <link rel="stylesheet" href="./javascripts/plugins/croping/css/jquery.Jcrop.css" type="text/css" /><!--/for cropping-->
        <link type="text/css" rel="stylesheet" href="./javascripts/plugins/colorpicker/jquery.miniColors.css" /><!--/for color picker-->
        <script type="text/javascript" src="./javascripts/plugins/colorpicker/jquery.miniColors.js"></script><!--/for color picker-->
        <!--        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine" />/for Tangerine font-->
        <script type="text/javascript" src="./javascripts/plugins/ajaxfileupload.js"></script><!--/for file upload-->
        <link rel="stylesheet" href="css/simplePagination.css" /> <!--/for pagination-->
        <script type="text/javascript" src="javascripts/plugins/jquery.simplePagination.js"></script> <!--/for pagination-->
        <script type="text/javascript" src="javascripts/plugins/jquery.form.js"></script><!--/for file upload-->
        <link rel="stylesheet" href="css/default.css" />
        <link id="style_css" href="./css/style.css" rel="stylesheet" type="text/css" />
        <link id="german_style_css" href="" rel="stylesheet" type="text/css" />
        <script src="./javascripts/common.js" type="text/javascript"></script>
        <script src="./javascripts/vc1.js" type="text/javascript"></script>
        <script src="./javascripts/vc2.js" type="text/javascript"></script>
        <script src="./javascripts/vc3.js" type="text/javascript"></script>
        <script src="./javascripts/objectClasses.js" type="text/javascript"></script>
        <style type="text/css">



            /*.bgImage
            {
              background-image:url('110108300-W003.jpg');    
              width: 1453px;
              height:1028px;
            *//*width: 500px;
            height: 500px;
            background-color: Gray;*/
            /*}*/
        </style>
        <!--end of my C-->

        <!--[if IE 7]>
        <link rel="stylesheet" type="text/css" href="css/ie.css" />
        <![endif]-->
        <?php
        if (isset($_GET['language'])) {
            $language = $_GET['language'];
        } else {
            $language = "english";
            header('Location: ./index.php?language=english'); //
        }

        if ($language == "english") {
            include('en.php');
        } else if ($language == "dutch") {

            include('de.php');
        }
        $ini = parse_ini_file('config.ini', false);
        $FIXED_DPI = $ini['imageDPI'];
        ?>
        <script type="text/javascript">
            var jproducts_bookmarks_url='/en/products/?task=bookmarks';
            $(document).ready(function(){
                
                $("#divLoad").dialog({
                    autoOpen: false,
                    //closeOnEscape: false,
                    title: "Processing",
                    height: 70,
                    width: 280,
                    modal:true,
                    resizable:false
                    //open: function() { $(this).parent().children().children('.ui-dialog-titlebar-close').hide(); }
                });
                
                    
<?php echo "CH.FIXED_DPI=$FIXED_DPI;"; ?>
	
            //myObject.draggable( 'disable' )
        });

        //var $bg = $('.drop'),
        origin = {x: 0, y: 0},
        start = {x: 0, y: 0},
        movecontinue = false;
        IsTriFlag = false;
	
        function move (e){
        
            //var temp =$(e.currentTarget).attr("id");
            if(IsTriFlag==false)
            {
                mousecontinue=false;
            }
            var moveby = {
                x: origin.x - e.clientX,
                y: origin.y - e.clientY
            };
        
            if (movecontinue === true) {
                start.x = start.x - moveby.x;
                start.y = start.y - moveby.y;
            
                $(this).css('background-position', start.x + 'px ' + start.y + 'px');
            }
        
            origin.x = e.clientX;
            origin.y = e.clientY;
        
            e.stopPropagation();
            return false;
        }
	
    
    function handle (e){
        movecontinue = false;
        $('.drop').unbind('mousemove', move);
        
        if (e.type == 'mousedown') {
            origin.x = e.clientX;
            origin.y = e.clientY;
            movecontinue = true;
            $('.drop').bind('mousemove', move);
        } else {
            $(document.body).focus();
        }
        
    e.stopPropagation();
    return false;
}
    
function reset (){
    start = {x: 0, y: 0};
    $(this).css('backgroundPosition', '0 0');
}
                         
                         
                         
			
                            
var bannertemphtml;
var selected=0;   
$(document).ready(function() { 
    $(".nav5bar").hide();
    $(".nav").hide();
            
    //This is all for navigation bar
                
    buttonToUnactiveFlag();
    $(".flag-de a").click(function(){
        window.location='./index.php?language=dutch';
        $(".lang-block .flag-de").prop("class","flag-de lang-active");
    });
    $(".flag-en a").click(function(){
        window.location='./index.php?language=english';
        $(".lang-block .flag-en").prop("class","flag-en lang-active");
				
    });
    $(".flag-fr a").click(function(){
				
        //$.get("fr.php");
    });
    var language = getURLParameter("language");
    if(language=="english")
    {
        $(".lang-block .flag-en").prop("class","flag-en lang-active");
        //$(".format-tittle h1").html("<?php //echo mb_convert_encoding($lang['Choose a background image'], "UTF-8");              ?>");
        //$(".choose-filling-tittle h1").html("choose a filling");
                                        
                                        
    }
    else if(language=="dutch")
    {
        $(".lang-block .flag-de").prop("class","flag-de lang-active");
        $("#german_style_css").attr("href","./css/germanstyle.css");
                    
    }
    else if(language=="french")
    {
        $(".lang-block .flag-fr").prop("class","flag-fr lang-active");
    }
                                
                                
				
				
    $(".nav6bar #first").click(function(){
                    
                    
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar #first").prop("class","first active");
        //alert("here");
        window.location.reload();

        //restoreAll()
        //initialScreenOne();
    });

    $(".nav5bar #first").click(function(){
                    
                    
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar #first").prop("class","first active");
        //alert("here");
        window.location.reload();

        //restoreAll()
        //initialScreenOne();
    });
                
                
                
    $(".nav6bar #second ").click(function(){
        if(CH.currentPackage.packagename)
        {
            buttonToUnactivestate();
            $(".nav6bar #second").prop("class","second active");
            $(".screens").hide();
            $("#content-choosefillingshtml").show();
            if(CH.currentPackage.packagename=="business"){
                            
                CH.currentPackage.putchooseformatforinit();
                $(function() {
                    $.ajax({
                        type: "POST",
                        url: "basicFunctions.php",
                        data: {
                            "type":"getTotalFillings"
                        },
                        success:function(data){
                            data=$.trim(data);
                            CH.VC3.initPagination("#pagination",data);
                        },
                        error:function(a,b,c){
                            alert("error");
                        }
                    });
                });
                CH.selected=1;
            }
        }
                
    });
    $(".nav5bar #second ").click(function(){
        if(CH.currentPackage.packagename)
        {
            buttonToUnactivestate();
            $(".nav5bar #second").prop("class","second active");
            $(".screens").hide();
            $("#content-choosefillingshtml").show();
            if(CH.currentPackage.packagename=="business"){
                            
                CH.currentPackage.putchooseformatforinit();
                $(function() {
                    $.ajax({
                        type: "POST",
                        url: "basicFunctions.php",
                        data: {
                            "type":"getTotalFillings"
                        },
                        success:function(data){
                            data=$.trim(data);
                            CH.VC3.initPagination("#pagination",data);
                        },
                        error:function(a,b,c){
                            alert("error");
                        }
                    });
                });
                CH.selected=1;
            }
        }
                
    });
                
    $(".nav6bar #third ").click(function(){
        if((CH.currentPackage.packagename)&&(CH.isFillingAndFormatSelected))
        {
            buttonToUnactivestate();
            $(".nav6bar #third").prop("class","third active");
            $(".screens").hide();
            $("#content-choosedesignhtml").show();
        }
    });
                
    $(".nav5bar #third ").click(function(){
        if((CH.currentPackage.packagename)&&(CH.isFillingAndFormatSelected))
        {
            buttonToUnactivestate();
            $(".nav5bar #third").prop("class","third active");
            $(".screens").hide();
            $("#content-choosedesignhtml").show();
        }
    });
                
                
                
    $(".nav6bar #fourth ").click(function(){
        if((CH.currentPackage.packagename)&&(CH.backgroundSelected!=null))
        {
            buttonToUnactivestate();
            $(".nav6bar #fourth").prop("class","fourth active");
            $(".screens").hide();
            $("#content-chooseaddresshtml").show();
        }
    });
                
    $(".nav5bar #fourth ").click(function(){
        if((CH.currentPackage.packagename)&&(CH.isFillingAndFormatSelected))
        {
            buttonToUnactivestate();
            $(".nav5bar #fourth").prop("class","fourth active");
            $(".screens").hide();
            $("#content-playablehtml").show();
        }
    });
                
                
                
    $(".nav6bar #fifth ").click(function(){
        if((CH.currentPackage.packagename)&&(CH.backgroundSelected!=null))
        {
            buttonToUnactivestate();
            $(".nav6bar #fifth").prop("class","fifth active");
            $(".screens").hide();
            $("#content-playablehtml").show();
        }
    });
                
        
    initialScreenOne(); //screen for package
});
                
/*  
           window.addEvent('domready', function() {
            var slide2=0;
            $('clickslide2').addEvent('click', function(){
                if(slide2==0){
                    $('divslide2').morph({'margin-top': '-20px'});
                    this.className="slidebutton2";
                    slide2=1;
                    var request = new Request.JSON({
                        url: '/en/component/jproducts/get_nspkey/', 
                        method: 'post',
                        data: {'823b52d6db2b50de9b2ebc8e13b09004' : '1'} ,
                        onComplete: function(jsonObj) {
                            $('tel_skey').value=jsonObj.key;
                        }
                    }).send();	

                }else{
                    $('divslide2').morph({'margin-top': '-128px'});
                    this.className="slidebutton";
                    slide2=0;
                }
            });
        });
 */

/*window.addEvent('domready', function() {
            var slide1=0;
            $('clickslide1').addEvent('click', function(){
                    if(slide1==0){
                            $('divslide1').morph({'left': '55px'});
                            this.className="slidebutton2";
                            slide1=1;

                            var request = new Request.JSON({
                            url: '/en/component/jproducts/get_nspkey/', 
                             method: 'post',
                            data: {'823b52d6db2b50de9b2ebc8e13b09004' : '1'} ,
                            onComplete: function(jsonObj) {
                                    $('fastsend_skey').value=jsonObj.key;
                            }
                            }).send();

                    }else{
                            $('divslide1').morph({'left': '300px'});
                            this.className="slidebutton";
                            slide1=0;
                    }
            });
    });*/
        </script>


    </head>

    <body>
        <div id="divLoad" style="display:none"><img src="img/imagesapp/loading.gif" alt="Uploading...."/></div>
        <div id="quicknavi" class="quicknavi-en">


            <div class="jproducts-bookmarks container-bookmarks">
                <center><span class="small">No products in the list</span></center></div> 
        </div>
        <div class="wrapper">
            <div class="header">
                <div class="logo"> <a href="#"><img src="img/images/logo.png" alt="logo"/></a></div>
                <div class="header-content">                              
                    <div class="flags">
                        <div class="mod-languages">

                            <ul class="lang-block">
                                <!--<li class="flag-de" dir="ltr"><a href="#"></a></li>
                                <li class="flag-en" dir="ltr"><a href="#"></a></li>
                                <li class="flag-fr" dir="ltr"><a href="#"></a></li>-->
                                <li class="flag-de" dir="ltr"><a href="#"></a></li>
                                <li class="flag-en" dir="ltr"><a href="#"></a></li>
                                <li class="flag-fr" dir="ltr"><a href="#"></a></li>


                            </ul>
                        </div>

                    </div>

                    <div class="widget-box-bg">
                        <div class="widget-menu">
                            <ul class="menu">
                                <li class="item-403"><a href="/en/gtb/">GTB</a></li>
                                <li class="item-404"><a href="/en/imprint-en/">Imprint</a></li>
                                <li class="item-193"><a href="/en/sitemap/" target="_blank">Sitemap</a></li>
                            </ul>

                        </div>

                        <div class="widgets">
                            <div class="custom-socialimages">
                                <ul>
                                    <li><a href="#"><img src="img/images/facebook.png" alt="facebook" border="0"/></a></li>
                                    <li><a href="#"><img src="img/images/google-plus.png" alt="google plus" border="0"/></a></li>
                                    <li><a href="#"><img src="img/images/icon_flickr.png" alt="flicker" border="0"/></a></li>
                                    <li><a href="#"><img src="img/images/twitter.png" alt="twitter" border="0"/></a></li>
                                </ul>
                            </div>

                        </div>



                        <div id="divslide2outer">
                            <div id="divslide2">
                                <form class="form-validate" method="post" action="">
                                    <!--                                    <input required="required" aria-required="true" class="inputbox2 required" value="Name ..." name="name" onblur="if (this.value=='') 		this.value='Name ...';" onfocus="if (this.value=='Name ...') this.value='';" type="text">
                                                                            <input required="required" aria-required="true" class="inputbox2 required" value="Telephone ..." name="telefon" onblur="if 	(this.value=='') this.value='Telephone ...';" onfocus="if (this.value=='Telephone ...') this.value='';" type="text"><br>-->
                                    <input class="inputbox2 required" value="Name ..." name="name" onblur="if (this.value=='') 		this.value='Name ...';" onfocus="if (this.value=='Name ...') this.value='';" type="text"></input>
                                    <input class="inputbox2 required" value="Telephone ..." name="telefon" onblur="if 	(this.value=='') this.value='Telephone ...';" onfocus="if (this.value=='Telephone ...') this.value='';" type="text"></input><br/>
                                    <button class="button">Send</button>
                                    <input name="subject" value="Please call back" type="hidden"/>
                                    <input name="option" value="com_jproducts" type="hidden"/>
                                    <input name="task" value="contact.telsend" type="hidden"/>
                                    <!-- <input required="required" aria-required="true" name="skey" class="required" id="tel_skey" value="" type="hidden">    -->
                                    <input name="skey" class="required" id="tel_skey" value="" type="hidden"></input>

                                    <input name="return" value="http://www.suesse-werbung.de/en/" type="hidden"/>
                                    <input name="823b52d6db2b50de9b2ebc8e13b09004" value="1" type="hidden"/>
                                </form>


                                <div class="fone">
                                    <p class="fone-number">+49 (0) 7643 80 10</p>
                                    <p class="font-text">We will call you back!<span id="clickslide2" class="slidebutton">&nbsp;&nbsp;&nbsp;</span>
                                    </p>
                                </div>


                            </div>
                        </div>


                    </div>
                    <div class="header-contact" style="background:url(img/images/en_slogan.png) no-repeat left 8px;">                      
                        <form class="form-validate" method="post" action="">
                            <div id="divslide1" class="cslider">
                                <div class="csliderinner">
                                    <span id="clickslide1" class="slidebutton"></span>
                                    <div class="fltleft">
                                        <div class="title">
                                            <h4>Contact form</h4>  
                                        </div>
                                        <input class="inputbox required" value="Name ..." name="nxaxmxe" onblur="if (this.value=='') this.value='Name ...';" onfocus="if (this.value=='Name ...') this.value='';" type="text"/><br/>
                                        <input class="inputbox validate-email required" value="E-mail ..." name="exmxaxixl" onblur="if (this.value=='') this.value='E-mail ...';" onfocus="if (this.value=='E-mail ...') this.value='';" type="email"/>
                                        <!--                                                            
<input required="required" aria-required="true" class="inputbox required" value="Name ..." name="nxaxmxe" onblur="if (this.value=='') this.value='Name ...';" onfocus="if (this.value=='Name ...') this.value='';" type="text"><br>
                                                <input required="required" aria-required="true" class="inputbox validate-email required" value="E-mail ..." name="exmxaxixl" onblur="if (this.value=='') this.value='E-mail ...';" onfocus="if (this.value=='E-mail ...') this.value='';" type="email">-->
                                    </div>


                                    <div class="fltleft">
                                        <div class="title">
                                            <button class="button fltright">Send</button>
                                            <h4>your message:</h4><br/>
                                        </div>
                                        <textarea class="inputbox2 required" name="mxsxg"></textarea>

                                    </div>
                                </div>
                            </div>
                            <input name="subject" value="Rapid contact" type="hidden"/>
                            <input name="option" value="com_jproducts" type="hidden"/>
                            <input name="task" value="contact.fastsend" type="hidden"/>
                            <input name="return" value="http://www.suesse-werbung.de/en/" type="hidden"/>
                            <input name="skey" class="required" id="fastsend_skey" value="" type="hidden"/>
                            <input name="823b52d6db2b50de9b2ebc8e13b09004" value="1" type="hidden"/>
                        </form>



                    </div>
                </div>
            </div> 

            <div class="nav">
                <ul>
                    <li id="first" class="first active"><a href="#" ></a></li>
                    <li id="middle" class="middle"><a href="#" ></a></li>
                    <li id="last" class="last"><a href="#"></a></li>
                </ul>
            </div> 

            <div class="nav5bar">
                <ul>
                    <li id="first" class="first active"><a href="#" ></a></li>
                    <li id="second" class="second"><a href="#" ></a></li>
                    <li id="third" class="third"><a href="#"></a></li>
                    <li id="fourth" class="fourth"><a href="#" ></a></li>
                    <li id="fifth" class="fifth"><a href="#"></a></li>

                </ul>
            </div>

            <div class="nav6bar">
                <ul>
                    <li id="first" class="first active"><a href="#" ></a></li>
                    <li id="second" class="second"><a href="#" ></a></li>
                    <li id="third" class="third"><a href="#"></a></li>
                    <li id="fourth" class="fourth"><a href="#" ></a></li>
                    <li id="fifth" class="fifth"><a href="#"></a></li>
                    <li id="sixth" class="sixth"><a href="#"></a></li>
                </ul>
            </div>

            <div class="content">


                <!--SCREEN-CHOOSE-PACKAGE-->
                <div id="content-choosepackagehtml" class="screens">
                    <div class='packge-content'>
                        <div class='right-contentpackge'>
                            <div class='packge-business-tittle'>
                                <h1>Business</h1>
                            </div>
                            <div class='packge-business'>
                                <img src='img/images/business-packge.png' alt='business' class='packge-img' />
                                <span><?php echo mb_convert_encoding($lang['In the business version the following configurations are possible'], "UTF-8"); ?>:</span>
                                <ul>
                                    <li class='first'><?php echo mb_convert_encoding($lang['Choose the shape of the advent calendar'], "UTF-8"); ?>.</li>
                                    <li class='second'><?php echo mb_convert_encoding($lang['Choose the filling of the advent calendar'], "UTF-8"); ?>.</li>
                                    <li class='third'><?php echo mb_convert_encoding($lang['Choose and edit the address which is to be printed on the advent calendar'], "UTF-8"); ?>.</li>
                                    <li class='fourth'><?php echo mb_convert_encoding($lang['Choose the colour of the backside as well as the left and right sides'], "UTF-8"); ?>.</li>

                                </ul>
                                <a id='businessButton'  class='buyandchoose' href='#' name='choose-btn'></a>
                            </div>
                        </div>
                        <div class='middle-contentpackge'>
                            <div class='packge-basic-tittle'>
                                <h1>Basic</h1>
                            </div>
                            <div class='packge-basic'>
                                <img src='img/images/basic-packge.png' alt='basic' class='packge-img' />
                                <span><?php echo mb_convert_encoding($lang['In the basic version the following configurations are possible'], "UTF-8"); ?>:</span>
                                <ul>
                                    <li class='first'><?php echo mb_convert_encoding($lang['Choose a background image'], "UTF-8"); ?>.</li>
                                    <li class='second'><?php echo mb_convert_encoding($lang['Choose and edit the address which is to be printed on the advent calendar'], "UTF-8"); ?>.</li>
                                    <li class='third'><?php echo mb_convert_encoding($lang['Place text and images within the white areas of the background image'], "UTF-8"); ?>.</li>
                                </ul>
                                <a id='standardButton'  class='buyandchoose' href='#' name='choose-btn'></a>
                            </div>
                        </div>
                        <div class='left-contentpackge'>
                            <div class='packge-standard-tittle'>
                                <h1>Standard</h1>
                            </div>
                            <div class='packge-standard'>
                                <img src='img/images/standard-packge.png' alt='standard' class='packge-img' />
                                <span><?php echo mb_convert_encoding($lang['In the standard version the following configurations are possible'], "UTF-8"); ?>:</span>
                                <ul>
                                    <li class='first'><?php echo mb_convert_encoding($lang['Choose a background image'], "UTF-8"); ?>.</li>
                                    <li class='second'><?php echo mb_convert_encoding($lang['Choose and edit the address which is to be printed on the advent calendar'], "UTF-8"); ?>.</li>
                                </ul>
                                <a id='basicButton'  class='buyandchoose' href='#' name='choose-btn'></a>
                            </div>
                        </div>

                    </div>
                    <div class='packge-content-lower'></div>
                </div>

                <!--SCREEN-CHOOSE-FILLINGS-->
                <div id="content-choosefillingshtml" class="screens">
                    <div class='fillingcontent'>
                        <div>
                            <form action='#' method='post' name='choose-filling'>
                                <div class="filling-header">
                                    <div class='format-title'>
                                        <?php echo mb_convert_encoding($lang['Choose a Format'], "UTF-8"); ?>
                                    </div>
                                    <div class="filling-title">
                                        <?php echo mb_convert_encoding($lang['choose a filling'], "UTF-8"); ?>
                                    </div>
                                    <div style="clear:both"></div>
                                </div>

                                <div class="fillingcontent-bg borderLeftRight">
                                    <div class='left-contentformat'>
                                        <center>
                                            <div class='choose-format'>
                                                <select id="dd_format">

                                                </select>
                                                <!--<select id="changeFormat" name="dynamicFillings" class="dynamicFillings"></select>
                                                <select id="changeFillingsStandard" name="dynamicFillings" class="dynamicFillings">
                                                </select>          
                                                <select id="changeFillingsBasic" name="dynamicFillings" class="dynamicFillings"> </select>
                                                <select id="changeFillingsBusiness" name="dynamicFillings" class="dynamicFillings"> 
                                                </select>   
                                                <br/><br/>
                                                <ul>

                                                </ul>-->
                                            </div>
                                            <div class="formatImage">

                                            </div>

                                        </center>
                                    </div>
                                    <div class='right-contentfilling'>

                                        <div class='choose-filling'>
                                            <ul>

                                            </ul>
                                        </div>
                                        <div style="clear:both;"></div><div class='pagination' style="margin-top:2px;margin-left:2px;"></div><div style="clear:both;"></div>
                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                            </form>
                        </div>
                        <div style="clear:both;">
                            <div id='nextButton' style="float: right; margin-right: 5px;"><input id='formatFillingNextButton' style="bottom: 10px;" type='button' name='submit' class='next-button' value='<?php echo mb_convert_encoding($lang['NEXT'], "UTF-8"); ?>' /></div>
                            <div id='backButton' style="float: right; margin-right: 5px;"><input id='formatFillingBackButton' style="bottom: 10px;" type='button' name='submit' class='next-button' value='<?php echo mb_convert_encoding($lang['BACK'], "UTF-8"); ?>' /></div>
                            <div style="clear:both;"></div>
                        </div>
                    </div>
                </div>


                <div id="content-choosedesignhtml" class="screens">
                    <div class="tiitle">
                        <div class='design-title'>
                            <?php echo mb_convert_encoding($lang['Choose a design'], "UTF-8"); ?>
                                    </div>

                                    <div style="clear:both"></div>
                                </div>
                                <div class='content-upper' style="border-bottom: 1px solid #C9C9C9; border-radius: 0 0 5px 5px;">
                                    <ul></ul>
                                    <div class="clearBoth"></div><div id='pagination' style="margin-top:2px;margin-left:2px;"></div><div style="clear:both;"></div>
                                </div>
                                <div id="buttonDiv" style="clear:both; padding-top:20px;">
                                    <div id="uploadButton"></div>
                                    <!--                        <div id="backAndNextButtons"></div>-->
                                </div>
                            </div>
                            <div id="content-orderAdventKalenderhtml" class="screens">
                                <div class="tiitle">
                                    <div class='design-title'>
                            <?php //echo mb_convert_encoding($lang['Choose a design'], "UTF-8"); ?>
                                        ORDER NOW
                                    </div>

                                    <div style="clear:both"></div>
                                </div>
                                <div class='content-upper' style="border-bottom: 1px solid #C9C9C9; padding-bottom: 10px; border-radius: 0 0 5px 5px;">
                                    <table border="0" id='orderDiv' cellspacing="10px">
                                        <tr>
                                            <td>Salutation</td>
                                            <td>&nbsp;&nbsp;&nbsp;<select id='orderPageSalutation'><option>Mr.</option><option>Ms.</option></select></td>
                                        </tr>
                                        <tr>
                                            <td>Last Name</td>
                                            <td><input id='orderPageLastName' type='text' name='LastName' size='35' /></td>
                                        </tr>
                                        <tr>
                                            <td>First Name</td>
                                            <td><input id='orderPageFirstName' type='text' name='FirstName' size='25' /></td>
                                        </tr>
                                        <tr>
                                            <td>Company</td>
                                            <td><input id='orderPageCompanyName' type='text' name='Company' size='35' /></td>
                                        </tr>
                                        <tr>
                                            <td>Road</td>
                                            <td><input id='orderPageRoad' type='text' name='Road' size='35' /></td>
                                        </tr>
                                        <tr>
                                            <td>Zip Code</td>
                                            <td><input id='orderPageZipCode' type='text' name='ZipCode' size='35' /></td>
                                        </tr>
                                        <tr>
                                            <td>Place</td>
                                            <td><input id='orderPagePlace' type='text' name='Place' size='35' /></td>
                                        </tr>
                                        <tr>
                                            <td>Desired Amount Of The Calender</td>
                                            <td><input id='orderPageDesiredAmount' type='text' name='DesiredAmount' size='35' /></td>
                                        </tr>

                                    </table>

                                </div>
                                <div id="orderPageButtonDiv">

                                </div>

                            </div>



                            <!--SCREEN-CHOOSE-ADDRESS-->
                            <div id="content-chooseaddresshtml" class="screens">
                                <div class='tiitle'>

                                    <div class='address-title'>
                            <?php echo mb_convert_encoding($lang['ADD YOUR HOUSE OR OFFICE ADDRESS'], "UTF-8"); ?>
                                    </div>

                                </div>
                                <div class='chose-format'>
                                    <div class='content-upper-address' style="border-bottom: 1px solid #C9C9C9; border-radius: 0 0 5px 5px;">
                                        <center>
                                            <div id="color_optionPanel" style="display:none">
                                                <div class="pannel">
                                                    <div class="row">
                                                        <div class="col1">
                                                            Color Option #1 :
                                                        </div>
                                                        <div class="col2">
                                                            <div id="colorOption1"><input value="#000000" type='hidden' id='colorOptionField1' name='colorOptionField1' class='color-picker-for-basic-package' size='6' autocomplete='on' maxlength='10' /></div>
                                                        </div>
                                                        <div style="clear:both"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col1">
                                                            Color Option #2 :
                                                        </div>
                                                        <div class="col2">
                                                            <div id="colorOption2"><input value="#000000" type='hidden' id='colorOptionField2' name='colorOptionField2' class='color-picker-for-basic-package' size='6' autocomplete='on' maxlength='10' /></div>
                                                        </div>
                                                        <div style="clear:both"></div>
                                                    </div>
                                                </div>
                                                <div style="text-align: justify;font-weight: bold;margin-left: 5px;margin-right: 5px;padding-top: 5px">
                                                    <p style="color:red">Achtung! Wenn Ihr Weihnachtsgruß, Ihr Firmenlogo oder Ihr Weihnachtsgruß in Kombination mit Ihrem Logo 3 oder mehr Farben darstellen, kontaktieren Sie uns bitte unter 07643-8010 damit wir individuell auf Ihre Sonderwünsche eingehen können.</p>
                                                </div>
                                            </div>
                                            <select id="dd_addressType">
                                                <option><?php echo mb_convert_encoding($lang['Use Company Address'], "UTF-8"); ?></option>
                                                <option><?php echo mb_convert_encoding($lang['Use Home Address'], "UTF-8"); ?></option>
                                            </select>

                                            <div id="homeAddress">
                                                <table border="0" id='addressDivindd_bg' cellspacing="10px">
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['Company Name'], "UTF-8"); ?>*</td>
                                                        <td><input id='addressPageCompanyName' type='text' name='addrline1' size='35' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['Road'], "UTF-8"); ?>*</td>
                                                        <td><input id='addressPageRoad' type='text' name='addrline2' size='35' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['Zip Code and City'], "UTF-8"); ?>*</td>
                                                        <td><input id='addressPageZipCode' type='text' name='telephone' size='25' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['Phone Number'], "UTF-8"); ?></td>
                                                        <td><input id='addressPagePhoneNumber' type='text' name='website' size='35' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['eMail'], "UTF-8"); ?></td>
                                                        <td><input id='addressPageEMail' type='text' name='website' size='35' /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><?php echo mb_convert_encoding($lang['Website'], "UTF-8"); ?></td>
                                                        <td><input id='addressPageWebsite' type='text' name='website' size='35' /></td>
                                                    </tr>

                                                </table>
                                                <div style="color:red; display:none;" id="errorMessage"> Please fill all the required(*) fields</div>
                                            </div>
                                        </center>
                                    </div>
                                </div>

                                <div id="buttonDiv" style="clear:both; padding-top:20px;">
                                    <div class='next-button-div'><input id='AddressNextButton' type='button' name='submit' class='next-button' value='<?php echo mb_convert_encoding($lang['NEXT'], "UTF-8"); ?>' /></div>
                                    <div class='back-button-div'><input id='AddressBackButton' type='button' name='submit' class='next-button' value='<?php echo mb_convert_encoding($lang['BACK'], "UTF-8"); ?>' /></div>
                                </div>
                            </div>


                            <!---->
                            <div id="content-playablehtml" class="screens">
                                <div class='tiitle'>

                                    <div class='playable-title'>
                            <?php echo mb_convert_encoding($lang['CUSTOMIZE YOUR ADVENTS KALENDER'], "UTF-8"); ?>
                        </div>


                    </div>
                    <div class='chose-format'>
                        <div class='content-upper-playable' style="border-bottom: 1px solid #C9C9C9; width: auto; height:auto; border-radius: 0 0 5px 5px;">
                            <div id="allPlayableArea" style="width: 100%;">
                                <div class="edit-design-editor">
                                    <div class="tools">

                                        <div id="toolbarCommonAction" class="editor-icon" style="width: auto; height: 40px;">
                                            <button id="Save" class="form-editor-save"></button>
                                            <button id="removeButton" class="form-editor-delete"></button>
                                            <button id="UndoButton" class="form-editor-undo"></button>
                                            <button id="RedoButton" class="form-editor-redo"></button>
                                            <button id="CopyButton" class="form-editor-copy"></button>
                                            <button id="PasteButton" class="form-editor-paste"></button>
                                            <button id="ZoomIn" class="form-editor-zoomin"></button>
                                            <button id="ZoomOut" class="form-editor-zoomout"></button>
                                        </div>

                                        <div id="toolbarImageAction" class="editor-icon1" style="width: auto; height: 35px;">
                                            <button id="addButton" class="form-editor-t"></button>
                                            <button id="upphot" class="form-editor-cam"></button>
                                            <button id="changebg" class="form-editor-f"></button>
                                        </div>

                                        <div  id="toolbarFontAction" class="form-editor" style="width: auto; height: 35px;">
                                            <select id="font1" name="font" class="form-editor-dropdown1"><option style="font-family: Arial;">Arial</option><!--<option style="font-family: Tangerine;">Tangerine</option>--><option style="font-family: Georgia;">Georgia</option><option style="font-family: Verdana;">Verdana</option><option style="font-family: Times New Roman;">Times New Roman</option><!--<option style="font-family: Lucida Grande;">Lucida Grande</option>--><option style="font-family: Lucida Sans Unicode;">Lucida Sans Unicode</option><option style="font-family: Courier New;">Courier New</option></select>
                                            <select id="fontsize" name="font-size" class="form-editor-dropdown2"><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option></select>
                                            <input type="hidden" id="colpick" name="color1" class="color-picker" size="6" autocomplete="on" maxlength="10" />
                                            <button id="boldbutton" class="form-editor-btnb" ></button>
                                            <button id="italicbutton" class="form-editor-btni"></button>
                                            <button id="underlinebutton" class="form-editor-btnu" ></button>
                                            <button id="Lalignbutton" class="form-editor-btnp1" ></button>
                                            <button id="Calignbutton" class="form-editor-btnp2"></button>
                                            <button id="Ralignbutton" class="form-editor-btnp3"></button>
                                        </div>

                                        <ul id="toolbarViewAction" class="editor-shape" style="width: 124px; height: 40px;">
                                            <li><div id="frontdivimg" class="toolbarBtn"><img src="img/images/shape1-editor.png" alt="shape1" /><!--Front--></div></li>
                                            <li><div id="backdivimg" class="toolbarBtn"><img src="img/images/shape2-editor.png" alt="shape2" /><!--Back--></div></li>
                                            <li><div id="leftdivimg" class="toolbarBtn"><img src="img/images/shape3-editor.png" alt="shape3" />Left</div></li>
                                            <li><div id="rightdivimg" class="toolbarBtn"><img src="img/images/shape4-editor.png" alt="shape4" />Right</div></li>
                                            <li><div id="clrpikr"><input type="hidden" id="colpickfordiv" name="color1" class="color-picker-for-background" size="6" autocomplete="on" maxlength="10" /></div></li>
                                            <li>
                                                <div id="clrpikrOption1" style="padding-top: 5px"><input type="hidden" id="colpickfordivOption1" name="colpickfordivOption1" class="color-picker-for-option-basic" size="6" autocomplete="on" maxlength="10" /></div></li>
                                            <li><div id="clrpikrOption2" style="padding-top: 5px"><input type="hidden" id="colpickfordivOption2" name="colpickfordivOption2" class="color-picker-for-option-basic" size="6" autocomplete="on" maxlength="10" /></div></li>
                                        </ul>


                                        <!--</form>-->

                                    </div>
                                </div>
                                <div class="edit-design-content" style=" height: auto;">
                                    <!---->
                                    <div id="outer" style="display: none;">
                                    </div>
                                    <div class="maindiv" style="margin-left:5px">
                                        <div class="sider" style="margin-top:3px;   width:980px; height: 750px;">
                                            <div class="drop" id="drop" >
                                            </div>                                                
                                        </div>
                                    </div>
                                    <div id="tempo"></div>
                                    <div style="display:none;">
                                        <div id="dialogBox1"><textarea rows="2" cols="15" id="myTextarea"> </textarea></div>
                                    </div> 
                                    <div id="cropper" style="display:none;"><br/>
                                        <div id="target"></div>
                                        <div id="previeweps"  style="display:none;"> <div class="prev-content"></div></div>
                                        <div id="display"  style="display:none;"><h1>Predefined Background img/imagesapp</h1></div>
                                        <div id="packagesrc"  style="display:none;"><h1>Choose your package first</h1></div>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                    </div>
                    <div id="playableButtonDiv" style="clear:both; padding-top:20px;"></div>
                </div>





                <!--SCREEN-DESK-->


            </div>

            <!--end of content-->







        </div>
        </div>       

    </body>
</html>
