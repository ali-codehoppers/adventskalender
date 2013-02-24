if(window.CH == undefined){
    window.CH = {};
}
CH.language=getURLParameter("language");
CH.currentPackage;
CH.WIDTHOFDROP=980;
CH.HEIGHTOFDROP=750;
CH.SEPERSTOR="@@@";
CH.paddding;
CH.selected;
CH.backgroundSelected;
CH.isFillingAndFormatSelected;
CH.isCompanyAddress=true;
CH.textConstantToAddForVerticalImages=0;

function loadDesigns(currentVC, _showInLeftMenu, akType)
{
    
    $(".screens").hide();
        $("#content-choosedesignhtml").show();
        
        CH.isFillingAndFormatSelected=true;
        $(".filling-content-lower").css("margin-left","0px");
    $(".drop").html("");
    $.ajax({
        type:"POST",
        url: "basicFunctions.php",
        data: {
            "type":"getBackgroundImagesFromDbAccordingToPackage",
            akType:akType,
            src:currentVC.dirname
        } ,		
        success:function(stepTwo)
        {    
            
            
            
            buttonToUnactivestate();
            
            $(".nav6bar ul #third").prop("class","third active");
            
            var _divId = ".content-upper";
            $('.content-upper').html("<div id='backgroundsForEachPackage' style='height:430px; overflow-y:scroll; border: 2px dotted black;'><ul>"+stepTwo+"</ul></div>");
            if(currentVC.packagename!="basic")
                {
                    
                //alert (CH.language);
                
                if(CH.language=="english")
                    {
            $('.content-upper').append("<div id='pre-upload-button-div'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='UPLOAD' onclick='changeBackground();'/></div>");
                    }
                    else if(CH.language=="dutch")
                        {
                            $('.content-upper').append("<div id='pre-upload-button-div'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Hochladen' onclick='changeBackground();'/></div>");
                        }
            }
            
            if(CH.language=="english")
                    {
            $('.content-upper').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='NEXT' /></div>");
            $('.content-upper').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='BACK' /></div>");
            }
                    else if(CH.language=="dutch")
                        {
                            $('.content-upper').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Weiter' /></div>");
            $('.content-upper').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Zuruck' /></div>");
                        }
            
            
            $(_divId +" img").click(function(e){
                
                $(_divId +" img").css("border", "0px");
                $(this).css("border", "10px double orange");
                var temp=($(this).prop("src"));  //src of img clicked
                
                
                 temp = temp.replace("img/bgimgs/thumbs/", "img/bgimgs/");
                
                var str = temp,
                delimiter = '/',
                start = 4,
                tokens = str.split(delimiter).slice(start),
                
                backgroundSelected = tokens.join(delimiter);
                currentVC.dropbackground=backgroundSelected;
                var bg=$(this).prop("src");
                
                var fileNameIndex = bg.lastIndexOf("/") + 1;
var filename = bg.substr(fileNameIndex);


                
              //  CH.currentPackage.backgroundSelected = bg.lastIndexOf("/");//.jpb
              //  CH.currentPackage.backgroundSelected=bg.charAt(CH.VC2.backgroundSelected-1);
                CH.currentPackage.backgroundSelected=filename;
                //setBackGroundImageInDrop(backgroundSelected);
                CH.currentPackage.result=CH.currentPackage.backgroundSelected;
                CH.backgroundSelected=backgroundSelected;
                
                
                
                //putAddressIndd();
                return false;
            });
            $("#chooseDesignNextButton").click(function(e){				
                
                if(CH.backgroundSelected!=null)
                    {
                putAddressIndd();
                    }
            });
            
            
            backButtons();
        }
    });
}
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function changeBackground(){ 
        $("#imageform2").replaceWith("");
        var formStr = " <form id='imageform2' method='post' style='display:none;' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadBackground'>"+
        "<input type='file' name='photoimg2' id='photoimg2' />"+
        "<input type='hidden' name='rand1' value='"+Math.random()+"' />" +
        "</form>";
        $("#outer").html("");
        $("#outer").html(formStr);
        $("#imageform2").dialog("destroy");
        $("#imageform2").dialog({
            title:"Upload Background Image",
            modal: true,
            resizable: false,
            open:function(event, ui){
            },
            buttons: {
                Ok: function() {
                    
                    var temp=($("#imageform2 #photoimg2").val());
                    var result = temp.substring(temp.lastIndexOf("."));
                    if(result.toLowerCase()==".jpg"||result.toLowerCase()==".png")
                    {
                        
                        //var url = "url(./img/imagesapp/loading.gif?"+Math.random()+")";
                        $("#divLoad").dialog("open");
                        //$('.drop').css('background-image', url);//     .html('<img src="img/imagesapp/loading.gif" alt="Uploading...."/>');
                        //$('.back').css('background-image', url);
                        $("#imageform2").ajaxForm(
                        {
                            success:    function(responseText, statusText, xhr, $form) { 
                                
                                
                                
                                var src=responseText.split(',')[0];
                                var success=responseText.split(',')[1];
                                var actualval="./uploads/"+src;
                                CH.backgroundSelected=actualval;
                                putAddressIndd();
                                    
                        $.ajax({ 
            type: "POST",
            url: "checkImageDpi.php",
            data: {
                "type":"saveJasonToDb",
                "bgsrc":actualval
            },
            async:false,
            success: function(data){
            window.console.log(data);
        }
        });
                                
                                
                                
                                
                                if(success[0]=="1")   
                                {   
                                    
                                    $("#divLoad").dialog("close");
                                    $('.back').css('background-image', 'url()');
                                    $('.back').hide();
                                    $('.drop').css('background-image', 'url()');
                                    $('.drop').hide();
                                    $('.drop').show();
                                    $('.back').hide();
                                    var url = "url(./uploads/"+src+"?"+Math.random()+")";
                                    $('.drop').css('background-image', url);
                                    $('.back').css('background-image', url);
                                    CH.VC3.dropbackground="uploads/"+src;
                                    fitBackground(CH.VC3.dropbackground);  //zainchange
                                }
                                else if(success[0]=="0"){
                                    alert("Please select a small image or see if the image extension is correct");
                                }
                            } 
                        }).submit();
                        $( this ).dialog( "close" );
                    }
                    else{
                        $( this ).dialog( "close" );
                        alert("Please Select jpg or png image for background");
                        CH.VC3.changeBackground();
                    }
                }
            }
        });
    }
//fine till here

function populateLeftBarOnFront()
{
    $(".front-form").show();
    $(".address-form").hide();
$(".front-form-inside-div").empty();
    for(var i=0;i<CH.VC3.items.length;i++){
            $(".front-form-inside-div").append("<input type='text' id='"+CH.VC3.items[i].id+"-LeftDiv' class='txtbox'  value='" + CH.VC3.items[i].innertxt + "'/>")
        }
}
function restoreAll()
{
    $(".drop").html("");
    $(".back").html("");
    $(".left").html("");
    $(".right").html("");
    $(".tools").html("<div id='toolbarCommonAction' class='editor-icon' style='width: auto; height: 40px;'><button id='Save' class='form-editor-save'></button><button id='removeButton' class='form-editor-delete'></button><button id='UndoButton' class='form-editor-undo'></button><button id='RedoButton' class='form-editor-redo'></button><button id='CopyButton' class='form-editor-copy'></button><button id='PasteButton' class='form-editor-paste'></button></div><div id='toolbarImageAction' class='editor-icon1' style='width: auto; height: 35px;'><button id='addButton' class='form-editor-t'></button><button id='upphot' class='form-editor-cam'></button><button id='changebg' class='form-editor-f'></button></div><div  id='toolbarFontAction' class='form-editor' style='width: auto; height: 35px;'><select id='font1' name='font' class='form-editor-dropdown1'><option style='font-family: Arial;'>Arial</option><!--<option style='font-family: Tangerine;'>Tangerine</option>--><option style='font-family: Georgia;'>Georgia</option><option style='font-family: Verdana;'>Verdana</option><option style='font-family: Times New Roman;'>Times New Roman</option><!--<option style='font-family: Lucida Grande;'>Lucida Grande</option>--><option style='font-family: Lucida Sans Unicode;'>Lucida Sans Unicode</option><option style='font-family: Courier New;'>Courier New</option></select><select id='fontsize' name='font-size' class='form-editor-dropdown2'><option>10</option><option>12</option><option>14</option><option>16</option><option>18</option><option>20</option><option>22</option><option>24</option><option>28</option><option>32</option><option>38</option></select><input type='hidden' id='colpick' name='color1' class='color-picker' size='6' autocomplete='on' maxlength='10' /><button id='boldbutton' class='form-editor-btnb' ></button><button id='italicbutton' class='form-editor-btni'></button><button id='underlinebutton' class='form-editor-btnu' ></button><button id='Lalignbutton' class='form-editor-btnp1' ></button><button id='Calignbutton' class='form-editor-btnp2'></button><button id='Ralignbutton' class='form-editor-btnp3'></button></div><ul id='toolbarViewAction' class='editor-shape' style='width: 224px; height: 40px;'><li><div id='frontdivimg' class='toolbarBtn'><img src='img/images/shape1-editor.png' alt='shape1' />Front</div></li><li><div id='backdivimg' class='toolbarBtn'><img src='img/images/shape2-editor.png' alt='shape2' />Back</div></li><li><div id='leftdivimg' class='toolbarBtn'><img src='img/images/shape3-editor.png' alt='shape3' />Left</div></li><li><div id='rightdivimg' class='toolbarBtn'><img src='img/images/shape4-editor.png' alt='shape4' />Right</div></li><li><div id='clrpikr'><input type='hidden' id='colpickfordiv' name='color1' class='color-picker-for-background' size='6' autocomplete='on' maxlength='10' /></div></li></ul></form>");
    CH.backgroundSelected=null;
    CH.currentPackage=null;
CH.isFillingAndFormatSelected=false;
    
}


function setBackGroundImageInDrop(sourceOfImage)
{
    $(".screens").hide();
    $("#content-playablehtml").show();
    backButtons();
    buttonToUnactivestate();
    $(".nav6bar ul #fifth").prop("class","fifth active");
    $( ".tools button" ).prop("disabled","");
    $( ".tools input" ).prop("disabled","");
    $( ".tools select" ).prop("disabled","");//here
    $('.drop').css('background-image', 'url()');
    var background=(sourceOfImage);
    var url = "url(./"+background+"?"+Math.random()+")";
    $('.drop').css('background-image', url);
    //$('.back').css('background-image', url);                
    fitBackground(sourceOfImage);
    makeCanvas();
    setActiveButtonsInToolsAccordingToPackage();
    $(".toolbarBtn img").removeClass("dotborder");
    $("#frontdivimg img").addClass("dotborder");
    //putAddressIndd();        				  
                  
}


function setActiveButtonsInToolsAccordingToPackage()
{
    CH.currentPackage.initializeAndSetActiveButtons();
}

function loadAddressFromAddressScreen(){
                if(CH.isCompanyAddress==true)
                   {
                       document.getElementById("backaddress1input").value="werbungxyz";
        document.getElementById("backaddress2input").value="78xyz";
        document.getElementById("backtelephoneinput").value="+49 (0) 7643 80 10";
        document.getElementById("backwebsiteinput").value="www.werbungxyz.com";
                   }
                   else
                   {
                       document.getElementById("backaddress1input").value=$("#addressDivindd_bg input").val();
        document.getElementById("backaddress2input").value=$("#dd_bgaddress2input").val();
        document.getElementById("backtelephoneinput").value=$("#dd_bgtelephoneinput").val();
        document.getElementById("backwebsiteinput").value=$("#dd_bgwebsiteinput").val();
                   }
        
    
}

function putAddressIndd()
{
    $(".screens").hide();
    $("#content-chooseaddresshtml").show();
    backButtons();
    buttonToUnactivestate();
    
    $(".nav6bar ul #fourth").prop("class","fourth active");
    
    //$('.dd_BG_top').html("<div style='padding-top:10px'>Enter text for back side</div>");
    //$('.dd_BG').html("<div id='addressDivindd_bg' style='text-align:left;padding-left:15px;'><div>Address Line 1</div><div id='dd_bgaddress1' style='margin-bottom:4px'><input id='dd_bgaddress1input' type='text' name='addrline1' size='35' /></div><div>Address Line 2</div><div  id='dd_bgaddress2' style='margin-bottom:4px'><input id='dd_bgaddress2input' type='text' name='addrline2' size='35' /></div><div>Telephone</div><div  id='dd_bgtelephone' style='margin-bottom:4px'><input id='dd_bgtelephoneinput' type='text' name='telephone' size='25' /></div><div>Website</div><div  id='dd_bgwebsite' style='margin-bottom:4px'><input id='dd_bgwebsiteinput' type='text' name='website' size='35' /></div></div>");
    $('.addressRadio').click(function() {
                  //alert("ddd");
                   $(this).find('input[type=radio]').attr('checked','checked');
                   if(($(this).attr("id"))=="radioCompanyAddress")
                   {
                       $("#addressDivindd_bg").hide();
                       CH.isCompanyAddress=true;
                   }
                   else if(($(this).attr("id"))=="radioHomeAddress")
                   {
                       $("#addressDivindd_bg").show();
                       CH.isCompanyAddress=false;
                   }
    });
    
    $("#addressDivindd_bg").hide();
    //$('.content-upper-address').html("<div id='addressDivindd_bg' style='text-align:left;padding-left:15px;'><div>Address Line 1</div><div id='dd_bgaddress1' style='margin-bottom:4px'><input id='dd_bgaddress1input' type='text' name='addrline1' size='35' /></div><div>Address Line 2</div><div  id='dd_bgaddress2' style='margin-bottom:4px'><input id='dd_bgaddress2input' type='text' name='addrline2' size='35' /></div><div>Telephone</div><div  id='dd_bgtelephone' style='margin-bottom:4px'><input id='dd_bgtelephoneinput' type='text' name='telephone' size='25' /></div><div>Website</div><div  id='dd_bgwebsite' style='margin-bottom:4px'><input id='dd_bgwebsiteinput' type='text' name='website' size='35' /></div><br/><input id='AddressNextButton' type='button' name='submit' class='next-button' value='NEXT' /></div>");
stepToDesk();

}
function stepToDesk()
{
    $("#AddressNextButton").click(function(e){
        $(".drop").html("");
        $(".screens").hide();
        $("#content-playablehtml").show();
        //backButtons();
        setBackGroundImageInDrop(CH.backgroundSelected);
        loadAddressFromAddressScreen();
        $("#epsbutton").remove();
        
        //if ( $(window).width() < 960)
        
        if( $("#bottomButtonsFinalScreen").length != 1)
            {
                
                if(CH.language=="english")
        {
        $(".content-upper-playable").append("<div id='bottomButtonsFinalScreen'><div id='next-button-div'><input id='epsbuttonothersides' type='button' name='submit' class='next-button' value='PREVIEW-OTHERSIDES' /></div><div id='next-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='next-button-div'><input id='finalBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
   }
                    else if(CH.language=="dutch")
                        {
                            $(".content-upper-playable").append("<div id='bottomButtonsFinalScreen'><div id='next-button-div'><input id='epsbuttonothersides' type='button' name='submit' class='next-button' value='PREVIEW-OTHERSIDES' /></div><div id='next-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='next-button-div'><input id='finalBackButton' type='button' name='submit' class='next-button' value='Zuruck' /></div></div>");
                        }        
       
   }
        else{
            $("#bottomButtonsFinalScreen").remove();
            
                if(CH.language=="english")
        {   
            $(".content-upper-playable").append("<div id='bottomButtonsFinalScreen'><div id='next-button-div'><input id='epsbuttonothersides' type='button' name='submit' class='next-button' value='PREVIEW-OTHERSIDES' /></div><div id='next-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='next-button-div'><input id='finalBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
}
                    else if(CH.language=="dutch")
                        {
                               $(".content-upper-playable").append("<div id='bottomButtonsFinalScreen'><div id='next-button-div'><input id='epsbuttonothersides' type='button' name='submit' class='next-button' value='PREVIEW-OTHERSIDES' /></div><div id='next-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='next-button-div'><input id='finalBackButton' type='button' name='submit' class='next-button' value='Zuruck' /></div></div>");
                        }          
    
}
       CH.currentPackage.initPreviewEps();
       backButtons();
       //CH.currentPackage.putBackGroundInInitialscreen();
    });
}


function makeCanvas()
{
    var oThis=this;
    if(CH.selected==0)
    {
        $('#leftdivimg').hide();
        $('#rightdivimg').hide();
    }
    else
    {
        $('#leftdivimg').show();
        $('#rightdivimg').show();
    }
    $('#topMenuChooseDesign').click(function() {
        loadDesigns(CH.currentPackage, true);
    });
    $('#topMenuChooseAddress').click(function() {
        if(_showInLeftMenu)
        {
            $('.dd_BG').html("");
            oThis.putAddressIndd();
        }					
    });
    
}
         
function makeBack(){
    $(".sider").append("<div id='back' class='back'></div>");
    //$(".back").css("background-image","url("+CH.currentPackage.dropbackground+"?"+Math.random()+")");
    $(".sider .back").html("<div id='addressDivonback' style='width:260px; position:absolute; text-align:left;padding-left:15px;'><div>Address Line 1</div><div id='backaddress1' style='margin-bottom:4px'><input id='backaddress1input' type='text' name='addrline1' size='35' /></div><div>Address Line 2</div><div  id='backaddress2' style='margin-bottom:4px'><input  id='backaddress2input' type='text' name='addrline2' size='35' /></div><div>Telephone</div><div  id='backtelephone' style='margin-bottom:4px'><input  id='backtelephoneinput' type='text' name='telephone' size='25' /></div><div>Website</div><div  id='backwebsite' style='margin-bottom:4px'><input  id='backwebsiteinput' type='text' name='website' size='35' /></div></div>");
    loadAddressFromAddressScreen()
    $(".back").hide();
}

function comingToBack(pckg) {
    $('#clrpikr').hide();
    $(".toolbarBtn img").removeClass("dotborder");
    $("#backdivimg img").addClass("dotborder");
    $("#epsbutton").hide();
    $('#frontdivimg').show();
    $('#backdivimg').show();
    fitBackground(CH.currentPackage.dropbackground);
    CH.currentPackage.showLeftAndRightSide();
    $(".left").hide();
    $(".right").hide();
    $(".tridiv").hide();
    $(".drop").hide();
    $(".back").show();
    $( ".tools button" ).prop("disabled","disabled");
    $( ".tools button" ).css("opacity","0.5");
    $( ".tools select" ).prop("disabled","disabled");
    $( ".tools #toolbarViewAction button" ).prop("disabled","");
    $( ".tools #toolbarViewAction button" ).css("opacity","1");
    
$( "#epsbutton" ).show();
CH.currentPackage.currentSide="Back";
$(".address-form").show();
$(".front-form").hide();
$(".address-tittle-txt h1").html("Enter Text For Back Side");

}

function comingToFront(pckg)
{
    $('#clrpikr').hide();
    $(".toolbarBtn img").removeClass("dotborder");
    $("#frontdivimg img").addClass("dotborder");
    $("#epsbutton").show();    
    $(".left").hide();
    $(".right").hide();
    $(".back").hide();
    $(".drop").show();
    $(".tridiv").show();
    $('#frontdivimg').show();
    $('#backdivimg').show();
    CH.currentPackage.preparingFront();
    
CH.currentPackage.currentSide="Front";
$(".address-tittle-txt h1").html("Enter Text For Front Side");

populateLeftBarOnFront();
}
  
function matchAddressFromBack(){
/*
    $("#backaddress1 input").on('keyup',function(){
        document.getElementById("dd_bgaddress1input").value=(this.value);
    });
    $("#backaddress2 input").on('keyup',function(){
        document.getElementById("dd_bgaddress2input").value=(this.value);
    });
    $("#backtelephone input").on('keyup',function(){
        document.getElementById("dd_bgtelephoneinput").value=(this.value);
    });
    $("#backwebsite input").on('keyup',function(){
        document.getElementById("dd_bgwebsiteinput").value=(this.value);
    });
    $("#dd_bgaddress1input").on('keyup',function(){
        document.getElementById("backaddress1input").value=(this.value);
    });
    $("#dd_bgaddress2input").on('keyup',function(){
        document.getElementById("backaddress2input").value=(this.value);
    });
    $("#dd_bgtelephoneinput").on('keyup',function(){
        document.getElementById("backtelephoneinput").value=(this.value);
    });
    $("#dd_bgwebsiteinput").on('keyup',function(){
        document.getElementById("backwebsiteinput").value=(this.value);
    });*/
}



function traverseBack(){
    $(".back").show();
    $("#addressDivonback").children().each(function(index) {
        var newback= new CH.backitem();
        CH.currentPackage.back.push(newback);
        var chilli=$("#addressDivonback").children()[index];
        
        
        //alert("yeh hai id: "+$(this).prop("id"));
        if($(this).children().length > 0)
        {
        //  alert("input id: "+ $(this).children().val());
        }
        
        if ($(this).children().length == 0) {
          
            CH.currentPackage.back[index].isheader=1;
            CH.currentPackage.back[index].inputid=$(this).prop("id"); 
            CH.currentPackage.back[index].inputvalue=$(this).html();
            CH.currentPackage.back[index].height=$(this).height()+"";
            CH.currentPackage.back[index].width=$(this).width()+"";
            CH.currentPackage.back[index].xposition=$(this).position().left+"";
            CH.currentPackage.back[index].yposition=$(this).position().top+"";
         
        }
        
        else if($(this).children().length > 0)//if ($(chilli).tagName == "DIV")
        {
            CH.currentPackage.back[index].isheader=0;
            CH.currentPackage.back[index].inputid=$(this).children().prop("id"); 
            CH.currentPackage.back[index].inputvalue=$(this).children().val();
            CH.currentPackage.back[index].height=$(this).children().height()+"";
            CH.currentPackage.back[index].width=$(this).children().width()+"";
            CH.currentPackage.back[index].xposition=$(this).children().position().left+"";
            CH.currentPackage.back[index].yposition=$(this).children().position().top+"";
        }
    

    });
if(CH.currentPackage.currentSide!="Back")
        {
$(".back").hide();
        }
}

function initialScreenOne(){
    $(".screens").hide();
    $("#content-choosepackagehtml").show();
    backButtons();
    $('.buyandchoose').click(function(){
        
        
        if($(this).prop("id")=="basicButton")
        {
            CH.currentPackage=CH.VC1;
        }
        else if($(this).prop("id")=="standardButton")
        {
            CH.currentPackage=CH.VC2;
        }
        else if($(this).prop("id")=="businessButton")
        {
            CH.currentPackage=CH.VC3;
        }  
        CH.currentPackage.initialScreenTwo();
    });
}
function buttonToUnactivestate(){
   
    $(".nav6bar ul #first").prop("class","first");
    $(".nav6bar ul #second").prop("class","second");
    $(".nav6bar ul #third").prop("class","third");
    $(".nav6bar ul #fourth").prop("class","fourth");
    $(".nav6bar ul #fifth").prop("class","fifth");
    $(".nav6bar ul #sixth").prop("class","sixth");
    
}

function buttonToUnactiveFlag(){
   
    $(".lang-block .flag-de lang-active").prop("class","flag-de");
    $(".lang-block .flag-en lang-active").prop("class","flag-en");
    $(".lang-block .flag-fr lang-active").prop("class","flag-fr");
  
}



function backButtons(){
    

$('#formatFillingBackButton').click(function(){ 
    $(".screens").hide();
    $("#content-choosepackagehtml").show();
    buttonToUnactivestate();
    $(".nav6bar ul #first").prop("class","first active");
});
$('#chooseDesignBackButton').click(function(){ 
    $(".screens").hide();
    $("#content-choosefillingshtml").show();
    $(".dynamicFillings").hide();
    
    $("#"+CH.currentPackage.fillingsForThisPackage).show();
    buttonToUnactivestate();
    $(".nav6bar ul #second").prop("class","second active");
});
$('#AddressBackButton').click(function(){ 
    $(".screens").hide();
    $("#content-choosedesignhtml").show();
    buttonToUnactivestate();
    $(".nav6bar ul #third").prop("class","third active");
});
$('#finalBackButton').click(function(){ 
    $(".screens").hide();
    $("#content-chooseaddresshtml").show();
    buttonToUnactivestate();
    $(".nav6bar ul #fourth").prop("class","fourth active");
});

}


function fitBackground(dropbackground){  //zain change
    $.ajax({
        type: "POST",
        url: "basicFunctions.php",
        data: {
            "type":"FitBackgroundInDrop",
            "src":dropbackground  //zainchange
        },
        success:function(data)
        {
            $('.drop').css("margin-left", "0px");
            $('.back').css("margin-left", "0px");
            $('.drop').css("width", CH.WIDTHOFDROP+"px");
            $('.back').css("width", CH.WIDTHOFDROP+"px");
            $('.drop').css("height", "750px");
            $('.back').css("height", "750px");
            var field = data.split(' ')[1];
            var addval=field-CH.HEIGHTOFDROP;
            CH.paddding = CH.WIDTHOFDROP-field;
            CH.paddding = CH.paddding/2;
            var heightOrwidth=data.split(' ')[0];
            var heightacratio=CH.WIDTHOFDROP/data.split(' ')[2];
            if(heightOrwidth=="width100%")
            {
                $('.drop').css("background-width", "100%");
                $('.back').css("background-width", "100%");
                $('.drop').css("height", heightacratio+"px");
                $('.back').css("height", heightacratio+"px");
                $('.drop').css("background-repeat","no-repeat");
                $('.back').css("background-repeat","no-repeat");
                $(".edit-design-content").height(CH.HEIGHTOFDROP+230+"");  //"580"
                $(".add-address").height(CH.HEIGHTOFDROP+255+""); //"605"
            }
            else if(heightOrwidth=="height100%")
            {
                $('.drop').css("background-size", "auto 100%");
                $('.back').css("background-size", "auto 100%");
                $('.drop').css("background-position","center");
                $('.back').css("background-position","center"); 
                $('.drop').css("background-repeat","no-repeat");
                $('.back').css("background-repeat","no-repeat");
                $(".edit-design-content").height(CH.HEIGHTOFDROP+250+"");
                $(".add-address").height(CH.HEIGHTOFDROP+275+"");
                var url = $('.drop').css('background-image').replace('url(', '').replace(')', '').replace("'", '').replace('"', '');
$('.drop').append("<div id='forImageWidth'></div>");
var bgImg = $('<img />');
//$('.drop').append(bgImg);
bgImg.hide();
bgImg.bind('load', function()
{
    var originalWidth = $(this).width();
    //alert(originalWidth);
    var originalHeight = $(this).height();
    //alert(originalHeight);
    aspect=originalWidth/originalHeight;
    var manipulatedHeight = 750;
    var width=manipulatedHeight*aspect;
    
    CH.textConstantToAddForVerticalImages=(980-(Math.ceil(width)))/2;
    //alert(CH.textConstantToAddForVerticalImages);
    
    moveDropElementsAccordingToBackground();
});
$('#forImageWidth').append(bgImg);

bgImg.attr('src', url);
                
                
                
            //var CH.WIDTHOFDROP=580;
            //var CH.HEIGHTOFDROP=350;        
            
            }
        }
    });
}


function moveDropElementsAccordingToBackground(){
$( ".drop .demo" ).each(function() {
  $(this).css("left",CH.textConstantToAddForVerticalImages+"px");
});

}
function applyGermanProgressBar(){
$(".nav6bar ul li.first").css("background", "url('img/images/menu/6menu/german/choosepackage.png')");
                                       $(".nav6bar ul li.first").css("width","150px");
                                        $(".nav6bar ul li.second").css("background", "url('img/images/menu/6menu/german/format-filling.png')");
                                       $(".nav6bar ul li.second").css("width","170px");
                                       $(".nav6bar ul li.third").css("background", "url('img/images/menu/6menu/german/choose-design.png')");
                                       $(".nav6bar ul li.third").css("width","204px");
                                       $(".nav6bar ul li.fourth").css("background", "url('img/images/menu/6menu/german/add-address.png')");
                                       $(".nav6bar ul li.fourth").css("width","212px");
                                       $(".nav6bar ul li.fifth").css("background", "url('img/images/menu/6menu/german/desk.png')");
                                        $(".nav6bar ul li.fifth").css("width","225px");
                                        $(".nav6bar ul li.sixth").css("background", "url('img/images/menu/6menu/german/preview.png')");
                                        $(".nav6bar ul li.sixth").css("width","129px");
                                        
                                        $(".nav6bar ul li.first.active").css("background", "url('img/images/menu/6menu/german/choosepackage-hover.png')");
                                        $(".nav6bar ul li.first.active").css("width","150px");
                                        $(".nav6bar ul li.second.active").css("background", "url('img/images/menu/6menu/german/format-filling-hover.png')");
                                        $(".nav6bar ul li.second.active").css("width","170px");
                                        $(".nav6bar ul li.third.active").css("background", "url('img/images/menu/6menu/german/choose-design-hover.png')");
                                        $(".nav6bar ul li.third.active").css("width","204px");
                                        $(".nav6bar ul li.fourth.active").css("background", "url('img/images/menu/6menu/german/add-address-hover.png')");
                                        $(".nav6bar ul li.fourth.active").css("width","212px");
                                        $(".nav6bar ul li.fifth.active").css("background", "url('img/images/menu/6menu/german/desk-hover.png')");
                                        $(".nav6bar ul li.fifth.active").css("width","225px");
                                        $(".nav6bar ul li.sixth.active").css("background", "url('img/images/menu/6menu/german/preview-hover.png')");
                                        $(".nav6bar ul li.sixth.active").css("width","129px");
                                        }