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
    sideColor:null,
    formatName:null,
    fillingName:null,
    formatId:null,
    fillingId:null,
    packageId:1,
    zoomScale:1,
    fillingsForThisPackage:"changeFillingsStandard",
    init:function(){
        CH.VC2.deinitialize();
        CH.VC1.deinitialize();
        CH.VC3.deinitialize();
        //this.initOrderAdventKalender();
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
        this.initZoomFunction();
        
        $(".address-tittle-txt h1").html("Enter Text For Front Side");
    },
    
    showLeftAndRightSide:function()
    {
        
    },
    
    preparingFront:function(){
        $( ".tools button" ).prop("disabled","disabled");
        $( ".tools #changebg" ).prop("disabled","disabled");
        $( ".tools #changebg" ).css("opacity","0");
        $( ".tools #toolbarViewAction button" ).css("opacity","1");
        $( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");
        $( ".tools #ZoomIn" ).prop("disabled","");
        $( ".tools #ZoomIn" ).css("opacity","1");
        $( ".tools #ZoomOut" ).prop("disabled","");
        $( ".tools #ZoomOut" ).css("opacity","1");
        
    },
    
    /*here from the next here change is only initfillingnextbutton*/ 
    /*initFormatChange:function(){
        var oThis=this;
        $("#changeFillingsStandard").change(function(){
            oThis.formatChanged($("#changeFillingsStandard").val());
        });
        $("#changeFillingsStandard").change();
    },
    formatChanged:function(formatId){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFillingsForFormat",
                formatId:formatId
            },
            success:function(data){
                data=eval("("+data+")");
                $('.choose-filling ul').html(data.data);
                if(data.pagination){
                    oThis.initPagination("#pagination",data.totalCount);
                }
                oThis.initFillingSelect();
                oThis.initFillingNextButton();
                
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    } ,
    initFillingNextButton:function(){
        var oThis=this;
        $('#formatFillingNextButton').unbind("click");
        $('#formatFillingNextButton').click(function() {
            if($('.filling-radio').is(':checked'))// && $('.format-radio').is(':checked')) 
            {   
                $("#backgroundsForEachPackage ul").html("");
                oThis.formatId=$("#changeFillingsStandard").val();
                $(".screens").hide();
                $("#content-choosedesignhtml").show();
                oThis.putBackGroundInInitialscreen();
            }						
        });
        
    },
    initFillingSelect:function(){
        var oThis=this;
        $('.choose-filling ul li').unbind("click");
        $('.choose-filling ul li').click(function() {
            $(this).find('input[type=radio]').attr('checked', true);
            var fillingId=$(this).find('input[type=radio]').prop("id");
            fillingId=fillingId.substr(fillingId.indexOf("-")+1,fillingId.length);
            oThis.fillingId=fillingId;
        });
    },*/
    
    /*here*/
    initZoomFunction:function()
    {
        $("#ZoomIn").click(function(){
            zoomInFunction();
        });
        $("#ZoomOut").click(function(){
            zoomOutFunction();
        });
        
    },
    initialScreenTwo:function(){
        $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();
        $("#changeFillingsStandard").show();
        $(".filling-content-lower").css("margin-left","5px");
        $(".nav").hide();
        $(".nav6bar").hide();
        $(".nav5bar").show();
        buttonToUnactivestate();
        $(".nav5bar ul #second").prop("class","second active");
        //CH.VC1.getFormats();
        CH.com.VC=this;
        CH.com.getFormats();
        CH.selected=1;
        
    }, 
    /*initPagination:function(selector,totalItems){
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 6,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                CH.VC1.getPageContent("",pageNum);
            },
            callback:function(){
            //CH.VC1.getPageContent("","1");
            }
        });
    },
    initPaginationForDesign:function(selector,totalItems){
        var oThis=this;
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 16,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                oThis.getPageContentForDesign("",pageNum);
            },
            callback:function(){
            //CH.VC1.getPageContent("","1");
            }
        });
    },
    getPageContentForDesign:function(placingSelector,pageNum){//here
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getDesignPage",
                fillingId:oThis.fillingId,
                packageId:oThis.packageId,
                pageNum:pageNum
            },
            success:function(data){
                afterLoadDesignData(data,oThis);
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    },*/
    /*
    getFormats:function(){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFormatsFromDb",
                packageType:1
            },
            success:function(data){
                $('#changeFillingsStandard').html(data);    
                oThis.initFormatChange();
            } 
        });
    },
    
    getPageContent:function(placingSelector,pageNum){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFillingsPage",
                formatId:$("#changeFillingsStandard").val(),
                pageNum:pageNum
            },
            success:function(data){
                $('.choose-filling ul').html(data);
                oThis.initFillingSelect();
                oThis.initFillingNextButton();
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    },*/
/*main changes are till here*/
    
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
     
    initializeAndSetActiveButtons:function(){
       
        CH.VC1.init();
        $(".nav ul #first").prop("class","first");
        $(".nav ul #middle").prop("class","middle");
        $(".nav ul #last").prop("class","last active");
        $( ".tools button" ).prop("disabled","disabled");
        $( ".tools button" ).css("opacity","0.5");
        $( ".tools select" ).prop("disabled","disabled");
        //$( ".tools #changebg" ).prop("disabled","");
        //$( ".tools #changebg" ).css("opacity","1");
        $( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");
        $("#sidebuttons").append("<button name='addtext' class='toolbarViewBtn'  id='frontdivimg'><img src='img/imagesapp/front_view.png' width='18' alt='Front View' /></button><button name='addtext' class='toolbarViewBtn'  id='backdivimg'><img src='img/imagesapp/back_view.png' width='18' alt='Back View' /></button>");
        CH.VC1.toBack();
        CH.VC1.toFront();
        $( "#epsbutton" ).prop("disabled","");
        $( "#epsbutton" ).css("opacity","1");
        $( ".tools #ZoomIn" ).prop("disabled","");
        $( ".tools #ZoomIn" ).css("opacity","1");
        $( ".tools #ZoomOut" ).prop("disabled","");
        $( ".tools #ZoomOut" ).css("opacity","1");
        $("#toolbarImageAction").hide();
       
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
        $("#saveAndSend").unbind("click");
    },
    
    initPreviewEps:function(){
        var oThis=this;
        $("#epsbutton").click(function(){
            buttonToUnactivestate();
            //$(".nav6bar ul #sixth").prop("class","sixth active");
    
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
        $("#clrpikrOption1").parent().remove();
        $("#clrpikrOption2").parent().remove();
        $("#changebg").remove();
        //$("#ZoomIn").remove();
        //$("#ZoomOut").remove();
        
    
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
                        $("#imageform2").ajaxForm({
                            success:function(responseText, statusText, xhr, $form) { 
                                var src=responseText.split(',')[0];
                                var success=responseText.split(',')[1];
                                if(success[0]=="1")   
                                {
                                    $("#divLoad").dialog("close");
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
    initOrderAdventKalender:function(){
        var oThis=this;
        $("#OrderAdventKalender").unbind("click");
        $("#OrderAdventKalender").click(function () {
            $(".screens").hide();
                $("#content-orderAdventKalenderhtml").show();
                buttonToUnactivestate();
                $(".nav6bar ul #sixth").prop("class","sixth active");
                $(".nav5bar ul #fifth").prop("class","fifth active");
                if(CH.language=="english")
        {
        
            $("#orderPageButtonDiv").html("<input id='saveAndSend' class='next-button' style='float:right;' type='button' value='SEND REQUEST' name='submit'><input id='orderBackButton' type='button' name='submit' class='next-button' value='BACK' />");
        }
        else if(CH.language=="dutch")
        {
            $("#orderPageButtonDiv").html("<input id='saveAndSend' class='next-button' style='float:right;' type='button' value='Anfrage Senden' name='submit'><input id='orderBackButton' type='button' name='submit' class='next-button' value='Zuruck' />");
        }
        backButtons();
        oThis.initSaveAndSend();
        });
        
    },
    initSaveAndSend:function(){
        var oThis=this;
        $("#saveAndSend").unbind("click");
        $("#saveAndSend").click(function () {
            oThis.saveState("save");           
        });
        
    },
    
    saveState:function(state){
        var empty;
        traverseBack();
        this.sideColor=$("#clrpikr input").val();
        //alert("side color: "+this.sideColor+"and format is: "+this.formatName+"and the filling is"+this.fillingName);
        
        var obj={
            "triangle":empty,
            "backSide":this.back,
            "frontSide":[],
            "frontBackground":this.dropbackground,
            "backBackground":this.dropbackground,
            "format":this.formatName,
            "filling":this.fillingName,
            "sideColor":this.sideColor
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
                
                
                var salutation=$("#orderPageSalutation").val();
                var lastName=$("#orderPageLastName").val();
                var firstName=$("#orderPageFirstName").val();
                var companyName=$("#orderPageCompanyName").val();
                var road=$("#orderPageRoad").val();
                var zipCode=$("#orderPageZipCode").val();
                var place=$("#orderPagePlace").val();
                var desiredAmount=$("#orderPageDesiredAmount").val();
                
                
                
                $.ajax({ 
                    type: "POST",
                    url: "execjar.php",
                    data: {
                      salutation:salutation,
                lastName:lastName,
                firstName:firstName,
                companyName:companyName,
                road:road,
                zipCode:zipCode,
                place:place,
                desiredAmount:desiredAmount
                
                    },
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
                            /*else 
                                imgEPS.src='./EPSIMAGE/Back_EPS_'+data+'.png';
                            $("#previeweps").html(imgEPS);*/
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
    {   //load design n make canvas are is in common
        //var oThis=this;
        //loadDesigns(oThis,oThis.packageId,oThis.fillingId);
        //makeCanvas(); check1 check this what it does
    },
    appendDesignBackgroundUploadBt:function(){/*dont delete*/}
    
}
