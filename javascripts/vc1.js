//basic=standard

if(window.CH == undefined){
    window.CH = {};
}

CH.VC1={
    packagename:"standard",
    dirname:"img/bgimgs/standard_bgimgs/",
    backhtml:"",
    fronthtml:"",
    dropbackground:"",
    currentSide:"Front",
    shapeSelected:"",
    akType:"",
    fillingsForThisPackage:"changeFillingsStandard",
    init:function(){
        CH.VC2.deinitialize();
        CH.VC1.deinitialize();
        CH.VC3.deinitialize();
        this.initButtonToChangeBackground();
        this.initPreBackgroud();    
        this.toBack();
        this.toFront();
        makeBack();
        matchAddressFromBack();
        backButtons()
        this.initPreviewEps();
        this.initRemoveUnusedButton();
        this.initMakeShape();
        
		this.initSave();
this.back=new Array();
$(".address-tittle-txt h1").html("Enter Text For Front Side");
    },
    
    showLeftAndRightSide:function()
    {
        
    },
    
    preparingFront:function(){
     $( ".tools button" ).prop("disabled","disabled");
        
        //$( ".tools button" ).css("opacity","0.5");
        //$( ".tools select" ).prop("disabled","disabled");
        $( ".tools #changebg" ).prop("disabled","");
        $( ".tools #changebg" ).css("opacity","1");
        //$( ".tools #toolbarViewAction button" ).prop("disabled","");
        $( ".tools #toolbarViewAction button" ).css("opacity","1");
	 $( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");
    
    },
    
  /*  initialScreenTwo:function(){
        $(".screens").hide();
            $("#content-choosedesignhtml").show();
                $(".nav").hide();
        
        $(".nav6bar").show();
            CH.VC1.putBackGroundInInitialscreen();
            CH.selected=0;
    },*/
    
    initChangeSubPackage:function(){
        $("#changeFillingsStandard").change(function(){
             CH.VC1.getPageContent("",1);
        });
    },
    
    initMakeShape:function(){
        
        $(".drop").find(".shapeOfAC").remove();
        $(".back").find(".shapeOfAC").remove();
        $(".left").find(".shapeOfAC").remove();
        $(".right").find(".shapeOfAC").remove();
        var id;
        if(CH.VC1.shapeSelected=="triangle")
        {
            id=1;
        }
        else if(CH.VC1.shapeSelected=="hexagonal")
        {
            id=2;
        }
        else if(CH.VC1.shapeSelected=="diamond")
        {
            id=3;
        }
        else if(CH.VC1.shapeSelected=="circle")
        {
            id=4;
        }
        if(id!=null)
        {
            var test="<img id='img"+id+"' class='shapeOfAC' src='./img/shapes/"+id+".png'/>";
            $(".drop").append(test);
            $(".back").append(test);
            $(".left").append(test);
            $(".right").append(test);
        }
    },
    initialScreenTwo:function(){
            
     $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();
        $("#changeFillingsStandard").show();
        this.initChangeSubPackage();
        $(".filling-content-lower").css("margin-left","5px");
        $(".nav").hide();
        
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar ul #second").prop("class","second active");
        CH.VC1.putchooseformatforinit();
        $(function() {
            $.ajax({
                type: "POST",
                url: "basicFunctions.php",
                data: {
                    "type":"getTotalFillings"
                },
                success:function(data){
                    data=$.trim(data);
                    CH.VC1.initPagination("#pagination",data);
                },
                error:function(a,b,c){
                    alert("error");
                }
            });
        });
        CH.selected=1;       
            
    }, 
    initPagination:function(selector,totalItems){
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 6,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                CH.VC1.getPageContent("",pageNum);
            },
            callback:function(){
                CH.VC1.getPageContent("","1");
            }
        });
    },
    
    putchooseformatforinit:function(){
        var oThis=this;
        
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFormatsFromDb"
            },
            success:function(data){
                //$('.choose-format ul').html(data);
            } 
        });
    },
    getPageContent:function(placingSelector,pageNum){
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getPagefillings",
                subpckg:$("#changeFillingsStandard").val(),
                pageNum:pageNum
            },
            success:function(data){
                
                /**xains code**/
                
                $('.choose-filling ul').html(data);
                $('.filling-radio').click(function() {
                    						
                });
                $('.choose-filling ul li').click(function() {
                    $(this).find('input[type=radio]').attr('checked', true);
                    						
                });
                
                $('#formatFillingNextButton').click(function() {
                    if($('.filling-radio').is(':checked'))// && $('.format-radio').is(':checked')) 
                    {
                        $("#backgroundsForEachPackage ul").html("");
                        CH.VC1.akType=$("#changeFillingsStandard").val();
                        //$('.content').html("");  
                        //$('.content').append(choosedesignhtml);
                        $(".screens").hide();
                        $("#content-choosedesignhtml").show();
                        CH.VC1.putBackGroundInInitialscreen();
                        makeCanvas();
                    }						
                });
                
                
               /* 
                $('.choose-format ul li').click(function() {
                    $(this).find('input[type=radio]').attr('checked', true);
                    var temp= $(this.getElementsByTagName("input")).prop("value");//$(this).prop("value");
                    $.ajax({
                        async: false,
                        type: "POST",
                        url:"storesession.php",
                        data:{
                            bgsrc:temp
                        },
                        success:function(data){
                            data=data.trim();
                            CH.VC1.shapeSelected=data;
                            CH.VC1.initMakeShape();
                        } 
                    })
                });*/
            /**xains code end**/
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    },
 
    initializeAndSetActiveButtons:function(){
       
                            CH.VC1.init();
                            $(".nav ul #first").prop("class","first");
                            $(".nav ul #middle").prop("class","middle");
                            $(".nav ul #last").prop("class","last active");
                            $( ".tools button" ).prop("disabled","disabled");
                            $( ".tools button" ).css("opacity","0.5");
                            $( ".tools select" ).prop("disabled","disabled");
                            $( ".tools #changebg" ).prop("disabled","");
                            $( ".tools #changebg" ).css("opacity","1");
    	$( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");
                            $("#sidebuttons").append("<button name='addtext' class='toolbarViewBtn'  id='frontdivimg'><img src='img/imagesapp/front_view.png' width='18' alt='Front View' /></button><button name='addtext' class='toolbarViewBtn'  id='backdivimg'><img src='img/imagesapp/back_view.png' width='18' alt='Back View' /></button>");
                            CH.VC1.toBack();
                            CH.VC1.toFront();
                            $( "#epsbutton" ).prop("disabled","");
                            $( "#epsbutton" ).css("opacity","1");
       
   },
    
    
    deinitialize:function(){
        $(".back").remove();
        $(".probtn").unbind("click");
        $(".txtbtn").unbind("click");
        $(".uplodtbtn").unbind("click");
        $('#backdivimg').unbind("click");
        $('#frontdivimg').unbind("click");
        $("#predefinebg").unbind("click")
        $('span').unbind("dblclick");
        $(".drop div").unbind("mousedown");
        $(".drop").unbind("click");
        $("#changebg").unbind("click");
$("#epsbutton").unbind("click");
$("#Save").unbind("click");
    },
    
    initPreviewEps:function(){
        var oThis=this;
        $("#epsbutton").click(function(){
            buttonToUnactivestate();
    $(".nav6bar ul #sixth").prop("class","sixth active");
    
            $("#previeweps").dialog("destroy");
            CH.VC1.saveState("prev");
        });
    },
    
    toBack:function() {
        var oThis=this;
        $("#backdivimg").click(function(){
            $('#backdivimg').hide();
            $('#frontdivimg').show();
            comingToBack(CH.VC1.packagename);
        });
    },
    
    toFront:function(){
        var oThis=this;
        $("#frontdivimg").click(function(){
            comingToFront(CH.VC1.packagename);
        });
    },
    initRemoveUnusedButton:function()
    {
            $("#removeButton").remove();
        $("#UndoButton").remove();
        $("#RedoButton").remove();
        $("#CopyButton").remove();
        $("#PasteButton").remove();
        $("#addButton").remove();
        $("#upphot").remove();
        $("#toolbarFontAction").remove();
        $("#leftdivimg").parent().remove();
        $("#rightdivimg").parent().remove();
        $("#clrpikr").parent().remove();
        
    
    },
    initPreBackgroud:function() {
        
        var oThis=this;
        $("#predefinebg").click(function(){
            $("#addressdiv").hide();
            $("#leftsidetable td").html("choose a background");
            CH.VC1.putBackGroundIndd();
        });
    },
    
initButtonToChangeBackground:function(){  //change background
        var oThis=this;
        $("#toolbarImageAction #changebg").unbind("click");
        $("#toolbarImageAction #changebg").click(function() {
            CH.VC1.changeBackground();    
        });
    },

changeBackground:function(){   //working function
        $("#imageform2").replaceWith("");
        var formStr = " <form id='imageform2' method='post' style='display:none;' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadBackground'>"+
        "<input type='file' name='photoimg2' id='photoimg2' />"+
        "<input type='hidden' name='rand1' value='"+Math.random()+"' />" +
        "</form>";
        $("#outer").html("");
        $("#outer").html(formStr);
        $("#imageform2").dialog("destroy");
        $("#imageform2").dialog({
            title:"Upload your image",
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
                        $("#divLoad").dialog("open");
                        //var url = "url(./img/imagesapp/loading.gif?"+Math.random()+")";
                        //$('.drop').css('background-image', url);//     .html('<img src="img/imagesapp/loading.gif" alt="Uploading...."/>');
                        $("#imageform2").ajaxForm(
                        {
                        success:    function(responseText, statusText, xhr, $form) { 
                                var src=responseText.split(',')[0];
                                var success=responseText.split(',')[1];
                                if(success[0]=="1")   
                                {    $("#divLoad").dialog("close");
                                    //$('.back').css('background-image', 'url()');
                                    $('.back').hide();
                                    $('.drop').css('background-image', 'url()');
                                    $('.drop').hide();
                                    $('.drop').show();
                                    $('.back').hide();
                                    var url = "url(./uploads/"+src+"?"+Math.random()+")";
                                    $('.drop').css('background-image', url);
                                    //$('.back').css('background-image', url);
                                    CH.VC1.dropbackground="./uploads/"+src;
                                    fitBackground(CH.VC1.dropbackground);  //zainchange
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
                        CH.VC1.changeBackground();
                    }
                }
            }
        });
    },
    initSave:function(){ ///backhere
        var oThis=this;
        $("#Save").unbind("click");
        $("#Save").click(function () {
            oThis.saveState("save");           
        });
    },
    saveState:function(state){
        var empty;
traverseBack();
        var obj={
            "triangle":empty,
            "backSide":this.back,
            "frontSide":[],
            "frontBackground":this.dropbackground,
            "backBackground":this.dropbackground
        };
        window.console.log("a="+JSON.stringify(obj));
        this.tosave=JSON.stringify(obj);
        $("#divLoad").dialog("open");
        $.ajax({ 
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"saveJasonToDb",
                "itemJasonToSaveInDb":this.tosave
            },
            async:false,
            success: function(data){
                $('form#submit').hide(function(){
                    $('div.success').fadeIn();
                });
                $.ajax({ 
                    type: "POST",
                    url: "execjar.php",
                    data: {},
                    success: function(data){
                        if(state=="prev"){  
                            var imgEPS = new Image();
                            imgEPS.onload=function(){
                                $("#previeweps").dialog({
                                    open:function(ui,eve){
                                    },
                                    width:'auto',
                                    height:'auto',
                                    modal:true,
                                    position: 'center',
                                    resizable:false
                                });
                                $("#divLoad").dialog("close");
                            };
				if(CH.VC1.currentSide=="Front")
                            	imgEPS.src='./EPSIMAGE/Front_EPS_'+data+'.png';
				else 
                            	imgEPS.src='./EPSIMAGE/Back_EPS_'+data+'.png';
                            $("#previeweps").html(imgEPS);
                        }else if(state=="save"){
				//window.location.pathname="/adventscalender/EPSIMAGE/Front_EPSImage_"+data+".eps";
				window.location.pathname="/adventscalender/EPSIMAGE/outfile_"+data+".zip";
                            $("#divLoad").dialog("close");
                        }
                    }
                });
            }
        });  
    },
    
    putBackGroundInInitialscreen:function() 
    {
        currentPackage = CH.VC1;
        loadDesigns(CH.VC1, false, CH.VC1.akType);			
    }    
    
}
