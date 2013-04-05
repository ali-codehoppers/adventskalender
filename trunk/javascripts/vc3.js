if(window.CH == undefined){
    window.CH = {};
}

CH.VC3={
    packagename:"business",
    undoflag:0,
    sDiv:"",
    totalcount:4,
    items:{},
    tosave:"",
    toload:"",
    angle:0,
    selecteditem:0,
    imageortext:0,
    imgparam:null,
    filename:"",
    jcrop_api:0,
    boundx:0,
    boundy:0,
    obj:{},
    dirname:"img/bgimgs/business_bgimgs/",
    divforbgcolorchange:"left",
    leftsidebgcolor:"",
    rightsidebgcolor:"",
    dropbackground:"",
    isTri:"0",
    leftrightbackbgcol:"#ffffff",
    sideId:"drop",
    paddding:"",
    tridrop:"",
    triback:"",
    flagtri:1,
    idCounter:4,
    isCopied:false,
    copyId:"",
    colorChanged:false,
    currentformat:"",
    currentfilling:"",
    currentSide:"Front",
    shapeSelected:"",
    sideColor:null,
    formatName:null,
    fillingName:null,
    formatId:null,
    fillingId:null,
    packageId:3,
    fillingsForThisPackage:"changeFillingsBusiness",
    //formatId:null,
    backgroundId:null,
    bgOriginalWidth:null,
    bgOriginalHeight:null,
    addInitialDivs:true,
    A:{},
    B:{},
    C:{},
    isTriangle:0,
    oldPositionLeft:0,
    oldPositionTop:0,
    oldSize:0,
    overlayImagePath:"",
    zoomScale:1,
    
    init:function(){
        CH.VC2.deinitialize();
        CH.VC1.deinitialize();
        CH.VC3.deinitialize();
        this.back=new Array();
        var leftside=new Array();
        var rightside=new Array();
        var backside=new Array();
        
        
        if(CH.VC3.addInitialDivs == true)
        {
            if(CH.language=="english")
            {
        
                $("#drop").append("<div class='demo' id='demo1' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span1'>Company-Name</span></div>	<div class='demo' id='demo2' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span2'>Name</span></div> <div class='demo' id='demo3' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span3'>Telephone</span></div> <div class='demo' id='demo4' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span4'>E mail</span></div>");
        
                this.items= new Array();
                var it= new CH.item();
                this.items.push(it);
                CH.VC3.items[0].id="demo1";
                CH.VC3.items[0].innertxt="Company-Name";
                CH.VC3.items[0].fontSize="23";
                it= new CH.item();
                this.items.push(it);// hard cord properties of first 4 divs
                CH.VC3.items[1].id="demo2";
                CH.VC3.items[1].innertxt="Name";
                CH.VC3.items[1].fontSize="21";
                it= new CH.item();
                this.items.push(it);
                CH.VC3.items[2].id="demo3";
                CH.VC3.items[2].innertxt="Telephone";
                CH.VC3.items[2].fontSize="18";
                it= new CH.item();
                this.items.push(it);
                CH.VC3.items[3].id="demo4";
                CH.VC3.items[3].innertxt="E mail";
                CH.VC3.items[3].fontSize="18";
            }
            else if(CH.language=="dutch")
            {
                            
                $("#drop").append("<div class='demo' id='demo1' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span1'>Firmenname</span></div>	<div class='demo' id='demo2' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span2'>Name</span></div> <div class='demo' id='demo3' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span3'>Telephon</span></div> <div class='demo' id='demo4' align='right' ><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span4'>E mail</span></div>");
        
                this.items= new Array();
                var it= new CH.item();
                this.items.push(it);
                CH.VC3.items[0].id="demo1";
                CH.VC3.items[0].innertxt="Firmenname";
                CH.VC3.items[0].fontSize="23";
                it= new CH.item();
                this.items.push(it);// hard cord properties of first 4 divs
                CH.VC3.items[1].id="demo2";
                CH.VC3.items[1].innertxt="Name";
                CH.VC3.items[1].fontSize="21";
                it= new CH.item();
                this.items.push(it);
                CH.VC3.items[2].id="demo3";
                CH.VC3.items[2].innertxt="Telephon";
                CH.VC3.items[2].fontSize="18";
                it= new CH.item();
                this.items.push(it);
                CH.VC3.items[3].id="demo4";
                CH.VC3.items[3].innertxt="E mail";
                CH.VC3.items[3].fontSize="18";
            }
        }
        
        
        CH.VC3.getXAndYPosition("#demo1");
        CH.VC3.getXAndYPosition("#demo2");
        CH.VC3.getXAndYPosition("#demo3");
        CH.VC3.getXAndYPosition("#demo4");
            
        this.undos= new Array();
        this.redos= new Array();
        this.triangle=new Array();
        this.initSelection();
        this.initUnselect();
        this.initBtBold();
        this.initBtItalic();
        this.initBtUnderline();
        this.initBtLalign();
        this.initBtRalign();
        this.initBtCalign();
        this.initBtColorPickerForbackground();
        this.initBtColorPicker();
        this.initUploadPic();
        this.initBtFontsize();
        this.initBtAddField();
        this.initBtRemField();
        this.initBtEditField();
        this.initImageEdit();
        this.initResizeForImage();
        this.initResizeForText();
        this.initSaveAndSend();
        this.initDrag();
        this.initSave();
        this.initrotatedivs();
        this.initLoad();
        this.initRelBtRotate();
        this.initHideCornerButtons();
        this.initCrtlC();
        this.initCrtlV(); 
        this.initBtUndo();
        this.initBtRedo();
        this.initChangeTheFont();
        this.initFontFam();
        this.selectElement("#demo1");
        this.getSides();
        makeBack();
        matchAddressFromBack();
        this.makeLeft();
        this.makeRight();
      //  populateLeftBarOnFront();
        this.initTextOfLeftOfFrontSideChange();
        this.initPreviewEps();
        this.initMakeShape();
        this.initUnselectIfShape();
        this.initButtonToChangeBackground();
        this.initZoomFunction();
        CH.VC3.triback= $(".back").html();
        $(".address-tittle-txt h1").html("Enter Text For Front Side");
        $(".back").css("background-color",CH.VC3.leftrightbackbgcol);
        if(CH.VC3.isTri=="1")
        {
            CH.VC3.initmaketriangle(CH.VC3.sideId);  
        }
        this.initRemoveUnusedButton();
        
    },
    initOrderAdventKalender:function(){
        var oThis=this;
        $("#OrderAdventKalender").unbind("click");
        $("#OrderAdventKalender").click(function () {
            for(var i=1;i<=CH.VC3.totalcount;i++)
            {
                CH.VC3.getXAndYPosition("#demo"+i+"");
            }
            CH.VC3.beforeSaveState();
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
    initUpdateAddress:function()
    {
    $("#addressDivonback input").change(function(){
         $("#addressPageCompanyName").val($("#deskPageCompanyNameInput").val());
         $("#addressPageRoad").val($("#deskPageRoadInput").val());
         $("#addressPageZipCode").val($("#deskPageZipCodeInput").val());
         $("#addressPagePhoneNumber").val($("#deskPagePhoneNumberInput").val());
         $("#addressPageEMail").val($("#deskPageEMailInput").val());
         $("#addressPageWebsite").val($("#deskPageWebsiteInput").val());
    });
},
    initMakeShape:function(){
        
        $(".drop").find(".shapeOfAC").remove();
        $(".back").find(".shapeOfAC").remove();
        $(".left").find(".shapeOfAC").remove();
        $(".right").find(".shapeOfAC").remove();
        var id;
        if(CH.VC3.shapeSelected=="triangle")
        {
            id=1;
        }
        else if(CH.VC3.shapeSelected=="hexagonal")
        {
            id=2;
        }
        else if(CH.VC3.shapeSelected=="diamond")
        {
            id=3;
        }
        else if(CH.VC3.shapeSelected=="circle")
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
    initZoomFunction:function()
    { 
        $("#ZoomIn").click(function(){
            zoomInFunction();
        });
        $("#ZoomOut").click(function(){
            zoomOutFunction();
        });
        
    },
    
    preparingFront:function(){
        $('#leftdivimg').show();
        $('#rightdivimg').show();
        $( ".tools button" ).prop("disabled","");
        $( ".tools button" ).css("opacity","1");
        $( ".tools select" ).prop("disabled","");
    },
    
    showLeftAndRightSide:function()
    {
        $('#leftdivimg').show();
        $('#rightdivimg').show();
        
    },
    
    /*
    initFormatChange:function(){
        var oThis=this;
        $("#changeFillingsBusiness").change(function(){
            //CH.VC1.getPageContent("",1);
            oThis.formatChanged($("#changeFillingsBusiness").val());
        });
        $("#changeFillingsBusiness").change();
    },
    formatChanged:function(formatId){
        var oThis=this;
        
        //alert (formatId);
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
                oThis.formatId=$("#changeFillingsBusiness").val();
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
    initialScreenTwo:function(){
        $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();
        $("#changeFillingsBusiness").show();
        $(".filling-content-lower").css("margin-left","5px");
        $(".nav").hide();
        $(".nav5bar").hide();
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar ul #second").prop("class","second active");
        CH.com.VC=this;
        CH.com.getFormats();
        //CH.VC3.getFormats();
        CH.selected=1;
    },
    /*
    initPagination:function(selector,totalItems){
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 6,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                CH.VC3.getPageContent("",pageNum);
            },
            callback:function(){
            //CH.VC3.getPageContent("","1");
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
    },
    
    getFormats:function(){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFormatsFromDb",
                packageType:3
            },
            success:function(data){
                $('#changeFillingsBusiness').html(data); 
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
                formatId:$("#changeFillingsBusiness").val(),
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
    },
    */
    
    initTextOfLeftOfFrontSideChange:function(){
        $(".front-form-inside-div input").on('keyup',function(){
        
            var changedVal=this.value;
            var id=this.id;
        
            id=id.substring(0, id.length-8);
            var index=CH.VC3.findItem(id);
            //var ddd;index to items
            id=CH.VC3.items[index].id
        
            $("#"+id+" span").html(changedVal);
            CH.VC3.items[index].innertxt=changedVal;
        //document.getElementById(id).value=(changedVal);
        //document.getElementById("dd_bgaddress1input").value=(this.value);
    
        });   
    },
    
    initChangeTheFont:function(){
        var oThis=this;
        $("#font1").change(function(){
            CH.VC3.xainFunc();
        });
    },
    initPreviewEps:function(){
        $("#epsbutton").click(function(){
            buttonToUnactivestate();
            //$(".nav6bar ul #sixth").prop("class","sixth active");
            for(var i=1;i<=CH.VC3.totalcount;i++)
            {
                CH.VC3.getXAndYPosition("#demo"+i+"");
            }
            $("#previeweps").dialog("destroy");
            CH.VC3.beforeSaveState();
            CH.VC3.saveState("prev");
        });
        $("#backepsbutton").click(function(){
            
            for(var i=1;i<=CH.VC3.totalcount;i++)
            {
                CH.VC3.getXAndYPosition("#demo"+i+"");
            }
            $("#previeweps").dialog("destroy");
            CH.VC3.saveState("prev");
        });
    },
    
    /*Istriangle:function(){
        CH.VC3.isTri="1";  
    },
    initmaketriangle:function(divIdForTri){
        
        var oThis=this;
        $(".drop").append("<img id='img1' src='./img/bgimgs/tri.png'/>");
        var t=1;
    },*/
    inittricontrols:function(){
        CH.VC3.initSelection();
        CH.VC3.initBtEditField();
        CH.VC3.initImageEdit();
        CH.VC3.initrotatedivs();
        CH.VC3.initHideCornerButtons();
        CH.VC3.initBtRemField();
        CH.VC3.destroyDragResize();
        CH.VC3.initResizeForText();
        CH.VC3.selectElement();
    },
    /*
    initdestroytriangle:function(divtoconvert){   // it will have back front etc
        $("#drop").remove();
        $("#tridiv").remove();
        $("#drop").prop("class","drop");
        $("#tempdiv").remove();
        CH.VC3.initSelection();
        CH.VC3.initBtEditField();
        CH.VC3.initImageEdit();
        CH.VC3.initrotatedivs();
        CH.VC3.initHideCornerButtons();
        CH.VC3.initBtRemField();
        CH.VC3.destroyDragResize();
        CH.VC3.initResizeForText();
        CH.VC3.selectElement();
    },
    */
   
    initializeAndSetActiveButtons:function(){
       
        CH.VC3.init();
        
        $( ".tools button" ).prop("disabled","");
        $( ".tools button" ).css("opacity","1");
        $( ".tools select" ).prop("disabled","");
        
    //$('#clrpikr').hide();    
       
    },
   
    deinitialize:function(){
        $(".back").remove();
        $(".left").remove();
        $(".right").remove();
        $('#fontList li').unbind("click");
        $("#predefinebg").unbind("click");
        $('span').unbind("dblclick");
        $(".drop div").unbind("mousedown");
        $(".drop").unbind("click");
        $(".drop").unbind("mouseup");
        $("#UndoButton").unbind("click");
        $("#RedoButton").unbind("click");
        //$(document).unbind("keyup");
        $("#CopyButton").unbind("click");
        $("#PasteButton").unbind("click");
        $("#boldbutton").unbind("click");
        $("#italicbutton").unbind("click");
        $("#underlinebutton").unbind("click");
        $("#Lalignbutton").unbind("click");
        $("#Ralignbutton").unbind("click");
        $("#Calignbutton").unbind("click");
        $("#upphot").unbind("click");
        $("#font1 option").unbind("click");
        $("#fontsize").unbind("change");
        $("#addButton").unbind("click");
        $("#removeButton").unbind("click");
        $(".drop div").unbind("dblclick");
        $(".drop div span .preview").unbind("dblclick");
        //this.destroyDragResize();
        $("#changebg").unbind("click");
        $(".drag-image").unbind("mousedown");
        $("#Save").unbind("click");
        $("#Load").unbind("click");
        $(".drop div .rotate-image").unbind("mousedown");
        $("#epsbutton").unbind("click");
        $("#saveAndSend").unbind("click");
    },
    
    initDestroyDrop:function(){
        $('.drop').empty();
        this.totalcount=4;
    },
    
    toBack:function() {
        var oThis=this;
        $("#backdivimg").click(function(){
            $(".form-editor .color-picker").miniColors('disabled', true);
            if(CH.VC3.isTri=="1")
            {
                if(CH.VC3.flagtri=="1")
                {
                    // $('#clrpikr').hide();
                    $('#frontdivimg').show();
                    $('#backdivimg').show();
                    $('#leftdivimg').show();
                    $('#rightdivimg').show();
                    $(".left").hide();
                    $(".right").hide();
                    $(".tridiv").hide();
                    $(".tridiv").show();
                    $(".drop").show();
                    $( ".tools button" ).prop("disabled","disabled");
                    $( ".tools button" ).css("opacity","0.5");
                    $( ".tools select" ).prop("disabled","disabled");
                    $( "#toolbarViewAction button" ).prop("disabled","");
                    $( "#toolbarViewAction button" ).css("opacity","1");
                        
                    CH.VC3.tridrop= $(".drop").html();
                    $(".drop").html(CH.VC3.triback);
                    $("#addressDivonback").css("top","130px");
                    
                    CH.VC3.flagtri=0;
                }
                else
                {
                    CH.VC3.toFront();
                    CH.VC3.toBack();
                }
            }
            else
            {
                comingToBack(CH.VC3.packagename);
            }
        });
    },
    
    
    initRemoveUnusedButton:function()
    {
        $("#leftdivimg").parent().remove();
        $("#rightdivimg").parent().remove();
        $("#backdivimg").parent().remove();
        $("#frontdivimg").parent().remove();
        $("#textForSidecolor").remove();
        
        if(CH.language=="english")
        {
        
            $("#toolbarViewAction").append("<div id='textForSidecolor'>Choose color for back, left & right side</div>")
        }
        else if(CH.language=="dutch")
        {
            $("#toolbarViewAction").append("<div id='textForSidecolor'>Wahlen Sie eine Farbe fur die Ruckseite sowie fur die rechte und linke Seite.</div>")
        }
     
    },
    toFront:function(){
        var oThis=this;
        $("#frontdivimg").click(function(){
            $("#toolbarFontAction .color-picker").miniColors('disabled', false);
            if(CH.VC3.isTri=="1")
            {
                if(CH.VC3.flagtri=="0")
                {
                    // $('#clrpikr').hide();
                    $(".left").hide();
                    $(".right").hide();
                    $(".back").hide();
                    $(".tridiv").show();
                    $(".drop").show();
                    $('#frontdivimg').show();
                    $('#backdivimg').show();
                    $('#leftdivimg').show();
                    $('#rightdivimg').show();
                    $( ".tools button" ).prop("disabled","");
                    $( ".tools button" ).css("opacity","1");
                    $( ".tools select" ).prop("disabled","");
                    
                    CH.VC3.triback= $(".drop").html();
                    $(".drop").html(CH.VC3.tridrop);
                    CH.VC3.inittricontrols();
                    CH.VC3.flagtri=1;    
                }
            }
            else{
                
                comingToFront(CH.VC3.packagename);
                CH.VC3.initTextOfLeftOfFrontSideChange();
                
            }    
        });
    },
    toLeft:function() {
        var oThis=this;
        $("#leftdivimg").click(function(){
            $(".form-editor .color-picker").miniColors('disabled', true);        
            CH.VC3.divforbgcolorchange="left";
            //comingToLeft();
            $("#epsbutton").hide(); 
            $(".toolbarBtn img").removeClass("dotborder");
            $("#leftdivimg img").addClass("dotborder");
            $('#clrpikr').show();
            $(".drop").hide();
            $(".right").hide();
            $(".back").hide();
            $(".left").show();
            $(".tridiv").hide();
            $('#frontdivimg').show();
            $('#backdivimg').show();
            $('#leftdivimg').show();
            $('#rightdivimg').show();
            $("#clrpikr .miniColors-trigger").css("background-color",CH.VC3.leftrightbackbgcol);
            $( ".tools button" ).prop("disabled","disabled");
            $( ".tools button" ).css("opacity","0.5");
            $( ".tools select" ).prop("disabled","disabled");
            $( ".tools #toolbarViewAction button" ).prop("disabled","");
            $( ".tools #toolbarViewAction button" ).css("opacity","1");
            
            CH.VC3.leftrightbackbgcol=($(".left").css("background-color"));
            $("#clrpikr .miniColors-trigger").css("background-color",CH.VC3.leftrightbackbgcol);
            CH.VC3.currentSide="lOrR";        
        });

    },
    toRight:function() {
        var oThis=this;
        $("#rightdivimg").click(function(){
            $(".form-editor .color-picker").miniColors('disabled', true);      
            CH.VC3.divforbgcolorchange="right";
            //comingToRight();
            $("#epsbutton").hide(); 
            $(".toolbarBtn img").removeClass("dotborder");
            $("#rightdivimg img").addClass("dotborder");
            $('#clrpikr').show();
            $(".drop").hide();
            $(".right").show();
            $(".back").hide();
            $(".left").hide();
            $(".tridiv").hide();
            $('#frontdivimg').show();
            $('#backdivimg').show();
            $('#leftdivimg').show();
            $('#rightdivimg').show();
            $("#clrpikr .miniColors-trigger").css("background-color",CH.VC3.leftrightbackbgcol);
            $( ".tools button" ).prop("disabled","disabled");
            $( ".tools button" ).css("opacity","0.5");
            $( ".tools select" ).prop("disabled","disabled");
            $( "#toolbarViewAction button" ).prop("disabled","");
            $( "#toolbarViewAction button" ).css("opacity","1");
            
            CH.VC3.leftrightbackbgcol=($(".left").css("background-color"));
            $("#clrpikr .miniColors-trigger").css("background-color",CH.VC3.leftrightbackbgcol);
            CH.VC3.currentSide="lOrR";       
        });

    },
    
    initFontFam:function() {  
        $('#fontList li').unbind("click");
        $('#fontList li').click(
            function(){
                var chosen = $(this).index();
                $('#fontSelector option:selected')
                .removeAttr('selected');
                $('#fontSelector option')
                .eq(chosen)
                .attr('selected',true);
                $('.selected').removeClass('selected');
                $(this).addClass('selected');
            });
    },
    
    destroyDragResize:function(){
        $(".drop .demo").draggable( "destroy" );
    //$(".drop .demo").resizable( "destroy" );
    },
    
    initHideCornerButtons:function(){
        $(".drop div .rotate-image").hide();
        $(".drop div .delete-image").hide();
        $(".drop div .drag-image").hide();
    },
    
    initSelection:function(){
        var oThis=this;
        $(".drop div").mousedown(function(e){
            var seldiv="#"+$(e.currentTarget).prop("id");
            oThis.selectElement(seldiv);
        });
    },
    
    selectElement:function(proDivId){
        var flag=false;
        $(".drop div").removeClass("highlight");
        $(".drop div .rotate-image").hide();
        $(".drop div .delete-image").hide();
        $(".drop div .drag-image").hide();
        this.sDiv=("#"+($(proDivId).prop("id")));
        if($(this.sDiv).children().children().prop("class")!="preview")
        {
            var temp=$(this.sDiv).children('span').css("color");
            $(".form-editor .miniColors-trigger").css("background-color",temp);
            
            
            var tempFontName=$(this.sDiv).children('span').css("font-family");
            if(tempFontName != undefined)
            {
                $("#font1").val(tempFontName);
            }
            var temp2=$(this.sDiv).children('span').css("font-size");
            if(temp2 != undefined)
            {
                temp2=temp2.substring(0, temp2.length-2);
                temp2=parseInt(temp2);
                temp2=$(temp2).toUnit("pt");
                temp2=Math.ceil(temp2);
                window.console.log(temp2);
    
                $("#fontsize").append("<option>"+temp2+"</option>");
                var fontsizes = {};
                $("select[name='font-size'] > option").each(function () {
                    if(fontsizes[this.text]) {
                        $(this).remove();
                    } else {
                        fontsizes[this.text] = this.value;
                    }
                });
                $("#fontsize").val(temp2);
            }
        //CH.VC3.initResizeForText();
        }
        else
        {
        //CH.VC3.initResizeForImage();
        }
        $(this.sDiv).addClass("highlight");
        $(this.sDiv+" .rotate-image").show();
        $(this.sDiv+" .drag-image").show();
        $(this.sDiv+" .delete-image").show();
        this.selecteditem =CH.VC3.findItem( (this.sDiv).substring(1) );
        CH.VC3.dragTheDiv();
        
        
    },
    
    autoAdjustsDiv:function(){
        $(this.sDiv).css("width","auto");
        $(this.sDiv).css("height","auto");
    },
    initUnselect:function(){
        var oThis=this;
        $(".drop").unbind("click");
        $(".drop").click(function(e) {
            oThis.unselectElement(e);       
        });
    },
    initUnselectIfShape:function(){
        var oThis=this;
        $(".drop img").click(function(e) {
            if(this.parentNode.id=="drop")
            {
                oThis.unselectElement(e);       
            }
        });
    },
    
    unselectElement:function(e){
        if(($(e.target).prop("id")=="drop")||($($(e.target).parent()).attr("id")=="drop"))
        {
            $(".drop div").removeClass("highlight");
            $(".drop div .rotate-image").hide();
            $(".drop div .delete-image").hide();
            $(".drop div .drag-image").hide();
            this.sDiv="";
            return true;
        }
        return false;
    },
    
    initRelBtRotate:function(){    //display corner buttons
        var oThis=this;
        $(".drop").unbind("mouseup");
        $(".drop").mouseup(function (e){
            $(oThis.sDiv+" .drag-image").show();
            $(oThis.sDiv+" .delete-image").show();
            $(oThis.sDiv+" .rotate-image").show();
        });
    },
    
    
    initBtUndo:function(){  
        var oThis=this;
        $("#UndoButton").unbind("click");
        $("#UndoButton").click(function(){
            oThis.undoAction();
        });
    },
    
    
    undoAction:function(){
        var oThis=this;
        var checkundo=(oThis.undos.length);
        if(checkundo==0)
        {
            alert("There are no actions to Undo!");      
        }
        else
        {
            var action=oThis.undos.pop();
            var copAction={};
            var it = {};
            $.extend(it,CH.VC3.items[oThis.findItem(action.id)]);
            $.extend(copAction,action);
            copAction.item=it;
            if(action.lastaction=="Bold")
            {
                oThis.bold("#"+action.id,1);
            }
            if(action.lastaction=="Italic")
            {
                oThis.italic("#"+action.id,1);
            }
            if(action.lastaction=="Underline")
            {
                oThis.underline("#"+action.id,1);
            }
            if(action.lastaction=="Lalign"||action.lastaction=="Ralign"||action.lastaction=="Calign")
            {
                if(action.lastvalue=="Lalign")
                    oThis.Lalign(action.id,1);
                else if(action.lastvalue=="Ralign")
                    oThis.Ralign(action.id,1);
                else if(action.lastvalue=="Calign")
                    oThis.Calign(action.id,1);
                else
                    oThis.Ralign(action.id,1);
            }
            if(action.lastaction=="textAlign"){
                oThis.textAlign(action.item,"0",1);
            }
            if(action.lastaction=="Fontchange")
            {
                oThis.fontFamilyOfText(action.item, 1);
            }
            if(action.lastaction=="Fontsize")
            {
                oThis.fontsizeOfText(action.item,1);
            }         
            if(action.lastaction=="Addfield")
            {
                oThis.removeField(action.item,1);    
            }
            if(action.lastaction=="Addimage")
            {
                oThis.removeField(action.item,1);    
            }
            if(action.lastaction=="Paste")
            {
                oThis.removeField(action.item,1);    
            }
            if(action.lastaction=="Remfield")
            {
                oThis.addField(1,action.item)
                CH.VC3.getXAndYPosition("#"+action.id);
                $.extend(it,CH.VC3.items[oThis.findItem(action.id)]);
                $.extend(copAction,action);
                copAction.item=it;
            }
            if(action.lastaction=="Edit")
            {
                $("#"+action.id+" span").text(action.item.innertxt);
                CH.VC3.items[CH.VC3.findItem(action.id)].innertxt=action.item.innertxt;
            }
            if(action.lastaction=="Pupload")
            {
                oThis.removeField(action.id,1);
            }
            if(action.lastaction=="Drag")
            {
                $("#"+action.id).css({
                    left:action.item.xposition+"px",//split
                    top: action.item.yposition+"px"
                });
                CH.VC3.items[CH.VC3.findItem(action.id)].xposition=action.item.xposition;
                CH.VC3.items[CH.VC3.findItem(action.id)].yposition=action.item.yposition;
            }
            if(action.lastaction=="Rotate")
            {
                var rotaval="rotate("+action.item.angle+"deg)";
                $("#"+action.id).css('-moz-transform',rotaval);
                $("#"+action.id).css('-webkit-transform', rotaval);
                $("#"+action.id).css('-o-transform', rotaval);
                $("#"+action.id).css('-ms-transform', rotaval);
                CH.VC3.items[CH.VC3.findItem(action.id)].angle=action.item.angle;
            }
            if(action.lastaction=="Resize")
            {
                $("#"+action.id+" span").css('font-size', action.item.fontSize+"pt");
                $("#"+action.id).css('width',"auto");
                $("#"+action.id).css('height',"auto");
                CH.VC3.items[CH.VC3.findItem(action.id)].fontSize=action.item.fontSize;
            }
            
            if(action.lastaction=="Color")
            {
                $("#"+action.item.id+"  span").css("color" ,action.item.fontcolor);
                var temp_ind=CH.VC3.findItem(action.item.id);
                if(temp_ind!=-1){
                    CH.VC3.items[temp_ind].fontcolor=action.item.fontcolor+"";
                }            
            }
            
            oThis.redos.push(copAction);
        }//end of else
    },
    
    initBtRedo:function(){   
        var oThis=this;
        $("#RedoButton").unbind("click");
        $("#RedoButton").click(function(){
            oThis.redoAction();
        });
    },
    
    redoAction:function(){
        var oThis=this;
        var checkredo=(oThis.redos.length);
        if(checkredo==0)
        {
            alert("There are no actions to redo!");
        }
        else
        {
            var action=oThis.redos.pop();
            var copAction={};
            var it = {};
            $.extend(it,CH.VC3.items[oThis.findItem(action.id)]);
            $.extend(copAction,action);
            copAction.item=it;
            if(action.lastaction=="Bold")
            {
                oThis.bold("#"+action.id,1);
            }
            if(action.lastaction=="Italic")
            {
                oThis.italic("#"+action.id,1);
            }
            if(action.lastaction=="Underline")
            {
                oThis.underline("#"+action.id,1);
            }
            if(action.lastaction=="textAlign"){
                oThis.textAlign(action.item,"0",1);
            }
            if(action.lastaction=="Lalign"||action.lastaction=="Ralign"||action.lastaction=="Calign")
            {
                if(action.lastaction=="Lalign")
                    oThis.Lalign(action.id,1);
                else if(action.lastaction=="Ralign")
                    oThis.Ralign(action.id,1);
                else if(action.lastaction=="Calign")
                    oThis.Calign(action.id,1);
                else
                    oThis.Ralign(action.id,1);
            }
            
            if(action.lastaction=="Fontchange")
            {
                oThis.fontFamilyOfText(action.item,1);
            }
            if(action.lastaction=="Fontsize")
            {
                oThis.fontsizeOfText(action.item,1);
            }
            if(action.lastaction=="Addfield")
            {
                oThis.addField(1,action.item);
                CH.VC3.getXAndYPosition("#"+action.id);
                $.extend(it,CH.VC3.items[oThis.findItem(action.id)]);
                $.extend(copAction,action);
                copAction.item=it;
            }
            if(action.lastaction=="Addimage")
            {
                oThis.addField(1,action.item);    
            }
            if(action.lastaction=="Paste")
            {
                oThis.addField(1,action.item);
            }
            if(action.lastaction=="Remfield")
            {
                oThis.removeField(action.item,1);
            }
            if(action.lastaction=="Edit")
            {
                $("#"+action.id+" span").text(action.item.innertxt);
                CH.VC3.items[CH.VC3.findItem(action.id)].innertxt=action.item.innertxt;
            }
            if(action.lastaction=="Pupload")
            {
                oThis.removeField(action.id,1);
            }
            if(action.lastaction=="Drag")
            {
                $("#"+action.id).css({
                    left: action.item.xposition+"px",//split
                    top: action.item.yposition+"px"
                });
                CH.VC3.items[CH.VC3.findItem(action.id)].xposition=action.item.xposition;
                CH.VC3.items[CH.VC3.findItem(action.id)].yposition=action.item.yposition;
            }
            if(action.lastaction=="Rotate")
            {
                var rotaval="rotate("+action.item.angle+"deg)";
                $("#"+action.id).css('-moz-transform',rotaval);
                $("#"+action.id).css('-webkit-transform', rotaval);
                $("#"+action.id).css('-o-transform', rotaval);
                $("#"+action.id).css('-ms-transform', rotaval);
                CH.VC3.items[CH.VC3.findItem(action.id)].angle=action.item.angle;
            }
            if(action.lastaction=="Resize")
            {
                $("#"+action.id+" span").css('font-size', action.item.fontSize+"pt");
                $("#"+action.id).css('width',"auto");
                $("#"+action.id).css('height',"auto");
                CH.VC3.items[CH.VC3.findItem(action.id)].fontSize=action.item.fontSize;
            }
            if(action.lastaction=="Color")
            {
                $("#"+action.item.id+"  span").css("color" ,action.item.fontcolor);
                var temp_ind=CH.VC3.findItem(action.item.id);
                if(temp_ind!=-1){
                    CH.VC3.items[temp_ind].fontcolor=action.item.fontcolor+"";
                } 
            }
            oThis.undos.push(copAction);
        }
    },
    
    initCrtlC:function(){
        var oThis=this;
        var isCtrl = false;
        $(document).unbind("keyup"); 
        $(document).keyup(function (e) { 
            if(e.which == 17)
                isCtrl=false;
        }).keydown(function (e) {
            if(e.which == 17)
                isCtrl=true;
            if(e.which == 67 && isCtrl == true)
            { 
                oThis.copy();
            }
        });
        $("#CopyButton").unbind("click");
        $("#CopyButton").click(function () {
            oThis.copy();
        });
    },
    
    copy:function(){
        if(this.sDiv != undefined && this.sDiv.length>0){
            CH.VC3.copyId=this.sDiv;
            CH.VC3.isCopied=true;
        }
    },
    
    initCrtlV:function(){   
        var oThis=this;
        var isCtrl = false;
        $(document).unbind("keyup");
        $(document).keyup(function (e) { 
            if(e.which == 17)
                isCtrl=false;
        }).keydown(function (e) {
            if(e.which == 17)
                isCtrl=true;
            if(e.which == 86 && isCtrl == true)
            { 
                if(oThis.isCopied)
                {
                    oThis.paste(); 
                }
                else
                {
                    alert("please copy any element before paste");
                }
            }
        });
        
        
        $("#PasteButton").unbind("click");
        $("#PasteButton").click(function () {
            if(oThis.isCopied)
            {
                oThis.paste(); 
            }
            else
            {
                alert("please copy any element before paste");
            }
        });
    },
    
    paste:function(){
        var ind=CH.VC3.findItem(this.copyId.substring(1));
        if(ind!=-1){
            var item={};
            $.extend(item,CH.VC3.items[ind]);
            this.addField(0,"");
            var nItSelec=".drop #demo"+CH.VC3.idCounter;
            // $(nItSelec+" span").html($(this.copyId+" span").html());
            $(nItSelec).html($(this.copyId).html());
            var rotaval="rotate("+item.angle+"deg)";
            item.id="demo"+CH.VC3.idCounter;
            CH.VC3.items[CH.VC3.findItem("demo"+CH.VC3.idCounter)]=item;
            CH.VC3.getXAndYPosition("#"+item.id);
            $(nItSelec+" span").css("font-size",item.fontSize+"pt");
            $(nItSelec).css('-moz-transform',rotaval);
            $(nItSelec).css('-webkit-transform', rotaval);
            $(nItSelec).css('-o-transform', rotaval);
            $(nItSelec).css('-ms-transform', rotaval);
            $(nItSelec).css('width','auto');
            $(nItSelec).css('height','auto');
            CH.VC3.inittricontrols();
        }
        else{
            alert("unable to find copied item");
        }
    },
    
    initBtBold:function(){   
        var oThis=this;
        $("#boldbutton").unbind("click");
        $("#boldbutton").click(function(){
            oThis.undoflag=0;
            oThis.bold(oThis.sDiv,oThis.undoflag);
        });
    },
    
    bold:function(proDivId,flag){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("bold")){
                $(proDivId+" span").removeClass("bold");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isBold=0;    
            }else{
                $(proDivId+"  span").addClass("bold");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isBold=1;    
            }
            if(flag==0)
            {
                var undo=new CH.undoredo;
                undo.id=proDivId.substring(1);
                undo.lastaction="Bold";
                undo.item= CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))];
                CH.VC3.undos.push(undo);
                CH.VC3.redos=[];
            }
        }
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
    
    initBtItalic:function(){
        var oThis=this;
        $("#italicbutton").unbind("click");
        $("#italicbutton").click(function(){
            oThis.undoflag=0;
            oThis.italic(oThis.sDiv,oThis.undoflag);
        });
    
    
    },
    italic:function(proDivId,flag){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("italic")){
                $(proDivId+" span").removeClass("italic");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isItalic=0;    
            }else{
                $(proDivId+"  span").addClass("italic");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isItalic=1;  
            }
            if(flag==0)
            {
                var undo=new CH.undoredo;
                undo.id=proDivId.substring(1);
                undo.lastaction="Italic";
                undo.item= CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))];
                CH.VC3.undos.push(undo);
                CH.VC3.redos=[];
            }
        }
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
    
    initBtUnderline:function(){
        var oThis=this;
        $("#underlinebutton").unbind("click");
        $("#underlinebutton").click(function(){
            oThis.undoflag=0;
            oThis.underline(oThis.sDiv,oThis.undoflag);
        });
    },
    underline:function(proDivId,flag){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("underline")){
                $(proDivId+" span").removeClass("underline");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isUnderlined=0;            
            }else{
                $(proDivId+"  span").addClass("underline");
                CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isUnderlined=1;        
            }
            if(flag==0)
            {
                var undo=new CH.undoredo;
                undo.id=proDivId.substring(1);
                undo.lastaction="Underline";
                undo.item= CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))];
                CH.VC3.undos.push(undo);
                CH.VC3.redos=[];
            }
        }
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
    initBtLalign:function(){    
        var oThis=this;
        $("#Lalignbutton").unbind("click");
        $("#Lalignbutton").click(function(){
            oThis.undoflag=0
            var ind=CH.VC3.findItem(oThis.sDiv.substring(1));
            if(ind!=-1){
                oThis.textAlign(CH.VC3.items[ind],"left",0);
            }
            else{
                alert("please select element");
            }
        });
    
    },
    
    textAlign:function(item,align,flag){
        if(flag==0){
            var undo=new CH.undoredo;
            var item2={};
            $.extend(item2,item);
            undo.id=item2.id;
            undo.lastaction="textAlign"
            undo.item=item2; 
            CH.VC3.undos.push(undo);
            CH.VC3.redos=[];
            $("#"+item.id).css("text-align",align);
            CH.VC3.items[CH.VC3.findItem(item.id)].textAlign=align;
        }
        else if(flag==1){
            $("#"+item.id).css("text-align",item.textAlign);
            CH.VC3.items[CH.VC3.findItem(item.id)].textAlign=item.textAlign;
        }
    },
    
    initBtRalign:function(){    
        var oThis=this;
        
        $("#Ralignbutton").unbind("click");
        $("#Ralignbutton").click(function(){
            oThis.undoflag=0
            var ind=CH.VC3.findItem(oThis.sDiv.substring(1));
            if(ind!=-1){
                oThis.textAlign(CH.VC3.items[ind],"right",0);
            }
            else{
                alert("please select element");
            }
        });
    },
    
    initBtCalign:function(){    
        var oThis=this;
        $("#Calignbutton").unbind("click");
        $("#Calignbutton").click(function(){
            oThis.undoflag=0
            var ind=CH.VC3.findItem(oThis.sDiv.substring(1));
            if(ind!=-1){
                oThis.textAlign(CH.VC3.items[ind],"center",0);
            }
            else{
                alert("please select element");
            }
        });
    },
   /* Calign:function(proDivId,flag){
        if(proDivId.length>0){
            if(flag==0){
                var undo=new CH.undoredo;
                this.undos.push(undo);
                CH.VC3.redos=[];
            }
            if($(proDivId).hasClass("leftalign")){
                if(flag==0){
                    this.undos[this.undos.length-1].lastvalue="Lalign";
                }
                $(proDivId).removeClass("leftalign");
            }
            if($(proDivId).hasClass("rightalign")){
                if(flag==0){
                    this.undos[this.undos.length-1].lastvalue="Ralign";
                }
                $(proDivId).removeClass("rightalign");
            }
            $(proDivId).addClass("centeralign");
            CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isLeftAligned=0; 
            CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isCenterAligned=1;
            CH.VC3.items[CH.VC3.findItem(proDivId.substring(1))].isRightAligned=0;
            CH.VC3.items[this.selecteditem].isRightAligned=0;
            CH.VC3.items[this.selecteditem].isLeftAligned=0;
            CH.VC3.items[this.selecteditem].isCenterAligned=1;
            if(flag==0){
                this.undos[this.undos.length-1].id=proDivId;
                this.undos[this.undos.length-1].lastaction="Calign";
            }
        }
        else
        {
            alert("Please select any text field before applying effects");
        }
    },*/
    
    
    initBtColorPickerForbackground:function(){
        var oThis=this;
        $(".color-picker-for-background").miniColors({
            change: function(hex) {
                if((CH.VC3.divforbgcolorchange)=="left"||(CH.VC3.divforbgcolorchange)=="right");
                {
                    oThis.colorPickerForBackground("left",hex);
                    oThis.colorPickerForBackground("right",hex);
                }
            }
        });
    },
    
    
    colorPickerForBackground:function(div,hex){
        $("."+div).css("background-color" ,hex);
    },
    
    rgb2hex:function(rgb){
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    },
    
    initBtColorPicker:function(){
        var oThis=this;
        // window.console.log("yes");
        $(".color-picker").miniColors({
            change: function(hex) {
                oThis.undoflag=0
                var ind=oThis.findItem(oThis.sDiv.substring(1));
                if(ind!=-1){
                    CH.VC3.items[ind].fontColorNext=hex;
                    $(oThis.sDiv+" span").css("color",hex);
                    CH.VC3.colorChanged=true;
                }
            }
        });
    },
    
    colorpick:function(proDivId, hex,flag){
        if((proDivId!=="")&&(proDivId!=="#undefined"))
        {
            if(flag==0){
                var undo=new CH.undoredo;
                this.undos.push(undo);   
                CH.VC3.redos=[];
                if((CH.VC3.items[this.selecteditem].fontcolor)=="0")
                {
                    this.undos[this.undos.length-1].lastvalue="#000000"
                }
                else{
                    this.undos[this.undos.length-1].lastvalue= CH.VC3.items[this.selecteditem].fontcolor;
                }
                this.undos[this.undos.length-1].nextvalue=hex;
                this.undos[this.undos.length-1].id=proDivId;
                this.undos[this.undos.length-1].lastaction="Color";
            }
            $(proDivId+"  span").css("color" ,hex);
            CH.VC3.items[this.selecteditem].fontcolor=hex;				
        }
    },
    
    initUploadPic:function(){
        var oThis=this;
        $("#upphot").unbind("click");
        $("#upphot").click(function() {
            oThis.addImage();
        });
    },
    
    addImage:function(){
        var oThis=this;
        $("#outer").html(" <form id='imageform' method='post' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadPicture&bgId="+oThis.backgroundId+"&formatId="+oThis.formatId+"'><input type='file' name='photoimg' id='photoimg' /></form>");
        this.imageortext=1;
        $("#outer").dialog({
            title:"Upload your image",
            modal: true,
            resizable: false,
            open:function(event, ui){
            },
            buttons: {
                Ok: function() {
                    var temp=($("#imageform #photoimg").val());
                    var result = temp.substring(temp.lastIndexOf("."));
                    if(result.toLowerCase()==".jpg"||result.toLowerCase()==".tiff")
                    {
                        oThis.addField(0,"");
                        $(".drop #demo"+CH.VC3.idCounter+" span").html('');
                        $(".drop #demo"+CH.VC3.idCounter+" .delete-image").hide();
                        $(".drop #demo"+CH.VC3.idCounter+" .drag-image").hide();
                        $(".drop #demo"+CH.VC3.idCounter+" .rotate-image").hide();
                        
                        //$(".drop #demo"+CH.VC3.idCounter+" span").css("display","inline-block");
                        $(".drop #demo"+CH.VC3.idCounter+" span").html('<img src="img/imagesapp/loading.gif" alt="Uploading...."/>');
                        $(".drop #demo"+CH.VC3.idCounter+" span img").attr("style", "max-width: 100%");
                        $("#imageform").ajaxForm({
                            success:oThis.showResponse
                        //target: $(".drop #demo"+CH.VC3.idCounter+" span")
                        }).submit();
                        $( this ).dialog( "close" );
                    }
                    else{
                        $( this ).dialog( "close" );
                        alert("Please Select jpg or tiff image to upload");
                        CH.VC3.addImage();
                    }
                }    
            }
        });
    },
    showResponse:function (responseText, statusText, xhr, $form)  { 
        var oThis=this;
        var data=responseText.split(",");
        
        if(data[0]=="1"){
            $(".drop #demo"+CH.VC3.idCounter+" span").html(data[3]);
            var width = data[1];
            var height = data[2];
            var asp=width/height;
            var newheight=150/asp;
            $("#outer").html("");
            var temp="#demo"+CH.VC3.idCounter;
            $(temp+" span img").attr("style", "width:150px");
            $(temp+" span img").attr("style", "max-width: 100%");
        
            var ind= CH.VC3.findItem(temp.substring(1));
            CH.VC3.items[ind].fontSize= "0";
            CH.VC3.items[ind].height= newheight+"";
            CH.VC3.items[ind].width= "150";
            $(temp).resizable( "destroy" );
            var url=$(temp+" span img").prop("src");
            var filename = url.substring(url.lastIndexOf('/'));
            ind=CH.VC3.findItem("demo"+CH.VC3.idCounter);
            if(ind!=-1){
                var databaseIdOfTheImage= data[4];
                CH.VC3.initImageEdit();
                CH.VC3.items[ind].innertxt=$.trim(databaseIdOfTheImage)+","+filename;
                CH.VC3.items[ind].istxt=0;
               // populateLeftBarOnFront();
                CH.VC3.selectElement("#"+CH.VC3.items[ind].id);
                CH.VC3.initResizeForImage();//here
                CH.VC3.initTextOfLeftOfFrontSideChange();

                CH.VC3.getXAndYPosition("#"+CH.VC3.items[ind].id);
            }else{
                alert("undefine index");
            }
        }else{
            alert("unable to load image: "+data[1]);
            $("#demo"+CH.VC3.idCounter).remove();    
        }   
        
    }, 
    
    xainFunc:function(){
        var oThis=this;
        oThis.undoflag=0
        var ind=CH.VC3.findItem(CH.VC3.sDiv.substring(1));
        if(ind!=-1){
            oThis.undoflag=0
            CH.VC3.items[ind].fontStyle=$(CH.VC3.sDiv+" span").css("font-family");
            CH.VC3.fontFamilyOfText(CH.VC3.items[ind], oThis.undoflag);
        }
    },
    
    fontFamilyOfText:function(item, flag){
        if(flag==0){
            var undo=new CH.undoredo;
            undo.lastaction="Fontchange";
            var it={};
            $.extend(it,item);
            undo.id=it.id;
            undo.item=it;
            CH.VC3.undos.push(undo); 
            CH.VC3.redos=[];
            $("#"+item.id+" span").css("font-family",$("#font1").val());
            var ind=CH.VC3.findItem(item.id);
            if(ind!=-1){
                CH.VC3.items[ind].fontStyle=$("#font1").val();
            }
        }else if(flag==1){
            $("#"+item.id+" span").css("font-family",item.fontStyle);
            var ind=CH.VC3.findItem(item.id);
            if(ind!=-1){
                CH.VC3.items[ind].fontStyle=item.fontStyle;
            }
        }
    },
    
    initBtFontsize:function(){
        var oThis=this;
        $("#fontsize").unbind("change");
        $("#fontsize").change(function () {
            oThis.undoflag=0
            var ind=CH.VC3.findItem(oThis.sDiv.substring(1));
            if (ind!=-1){
                oThis.fontsizeOfText(CH.VC3.items[ind],0);           
            }
            else{
                alert("select an element");
            }
        });
    },
    
    fontsizeOfText:function(item,flag){
        if(flag==0){
            var undo=new CH.undoredo;
            undo.id=item.id;
            undo.lastaction="Fontsize";
            var temp=$("#"+item.id+" span").css("font-size");
            temp=temp.substring(0, temp.length-2);
            temp=parseInt(temp);
            temp=$(temp).toUnit("pt");
            temp=Math.ceil(temp);
            CH.VC3.items[CH.VC3.findItem(undo.id)].fontSize=temp;
            var it={};
            $.extend(it,CH.VC3.items[CH.VC3.findItem(undo.id)]);
            undo.item=it;
            CH.VC3.undos.push(undo);
            CH.VC3.redos=[];
            CH.VC3.items[CH.VC3.findItem(undo.id)].fontSize=$("#fontsize").val();
            $("#"+item.id+" span").css("font-size",$("#fontsize").val()+"pt");
            $("#"+item.id).css("width","auto");
            $("#"+item.id).css("height","auto");
        }
        else if(flag==1){
            $("#"+item.id+" span").css("font-size",item.fontSize+"pt");
            CH.VC3.items[CH.VC3.findItem(item.id)].fontSize=item.fontSize;
            $("#"+item.id).css("width","auto");
            $("#"+item.id).css("height","auto");
        }
    },
    
    
    initBtAddField:function(){
        var oThis=this;
        $("#addButton").unbind("click");
        $("#addButton").click(function () {
            oThis.undoflag=0
            oThis.html=0
            oThis.addField(oThis.undoflag,oThis.html);           
        });
    },
    
    addField:function(flag,html){
        var oThis=this;
        var itemsLength=$(".demo").length;
        if(itemsLength>9){
            alert("Only 5 new Fields");
            return false;
        }
        else{
            if(flag==0){
                var it= new CH.item();
                CH.VC3.idCounter++;
                it.id="demo"+CH.VC3.idCounter;
                var temp_html="<div id='demo"+ CH.VC3.idCounter +"' class='demo' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+CH.VC3.idCounter +"'>Enter Text Here</span></div>";
                $(".drop").append(temp_html);
                if(oThis.isTriangle==1){
                    var totalWidthHalf=$("#drop").width()/2;
                    var totalHeightHalf=$("#drop").height()/2;
                    $("#demo"+CH.VC3.idCounter).css("left",totalWidthHalf+"px");
                    $("#demo"+CH.VC3.idCounter).css("top",totalHeightHalf+"px");
                
                //$("#demo"+CH.VC3.idCounter).css("left",oThis.A.);    
                }
                var temp=$("#demo"+CH.VC3.idCounter).css("font-size");
                temp=temp.substring(0, temp.length-2);
                temp=parseInt(temp);
                temp=$(temp).toUnit("pt");
                temp=Math.ceil(temp);
                it.fontSize=""+temp;
                it.innertxt=$("#demo"+CH.VC3.idCounter+" span").html();
                this.items.push(it);
                CH.VC3.getXAndYPosition("#demo"+CH.VC3.idCounter);
                var undo=new CH.undoredo;
                undo.id="demo"+CH.VC3.idCounter;
                undo.lastaction="Addfield";
                var it={};
                $.extend(it,CH.VC3.items[oThis.findItem(undo.id)]);
                undo.item=it;
                this.undos.push(undo);
                CH.VC3.redos=[];
                //window.console.log("up");    
                CH.VC3.selectElement("#demo"+CH.VC3.idCounter);        
    
            }
            else if(flag==1){
                var elemId=html.id;
                var spanNum=elemId.substring(4);
                if(html.istxt!="0")
                {
                    var temp_html="<div id='"+elemId+"' class='demo' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+ spanNum+"'>"+html.innertxt;
                    +"</span></div>";
                }
                else
                {
                    var arr=html.innertxt.split(",");
                    $("#drop").append("<div id = '"+elemId+"' class='demo' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+ spanNum+"'><img class='preview' style='width: 150px;'  src='uploads"+arr[1]+"' /></span></div>"); //current     
                }
                $(".drop").append(temp_html);
                $("#"+elemId).css("top",html.yposition+"px");
                $("#"+elemId).css("left",html.xposition+"px");
                $("#"+elemId).css("font-size",html.fontSize+"pt");
                CH.VC3.items.push(html);
                CH.VC3.getXAndYPosition("#"+elemId);
                CH.VC3.selectElement("#"+elemId);
            //      window.console.log("down");
            }
            oThis.initSelection();
            oThis.initDrag();
            oThis.initBtEditField();
            oThis.initrotatedivs();
            //oThis.initHideCornerButtons();
            oThis.initBtRemField();
            oThis.totalcount=this.totalcount+1;
            CH.VC3.initResizeForText();
            //CH.VC3.selectElement();
            window.console.log(elemId);
            
           // populateLeftBarOnFront();
            CH.VC3.initTextOfLeftOfFrontSideChange();
        }
    },    
   
    initBtRemField:function(){
        var oThis=this;
        $("#removeButton").unbind("click");
        $("#removeButton").click(function () {
            oThis.undoflag=0
            oThis.removeField(CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))],oThis.undoflag);
        });
        $(".drop div .delete-image").unbind("click");
        $(".drop div .delete-image").click(function () {
            oThis.removeField(CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))],oThis.undoflag);
        });
   
    },

    removeField:function(item,flag){   
        if($(".demo").length==0){
            alert("No more textbox to remove");
            return false;
        }   
        else{
            var it={};
            $.extend(it,item);
            if(flag==0){
                var undo=new CH.undoredo;
                undo.id=it.id;
                undo.item=it;
                undo.lastaction="Remfield";
                CH.VC3.undos.push(undo);
                CH.VC3.redos=[];
            }
            $("#"+it.id).remove();
            CH.VC3.items.splice(CH.VC3.findItem(it.id),1);
            CH.VC3.sDiv="";
          //  populateLeftBarOnFront();
            CH.VC3.initTextOfLeftOfFrontSideChange();
        }
    },
    
    initBtEditField:function(){
        var oThis=this;
        $(".drop div").unbind("dblclick");
        $(".drop div").dblclick(function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            if($(this).children().children().prop("class")!="preview")
            {
                oThis.doubleclickEditorForText();
            }
            else
            {
                return;
            }
            return
        });
    },
    
    doubleclickEditorForText:function(){
        var oThis=this;
        if ($(oThis.sDiv).children(" span").hasClass('inputMode')) {
            return true;
        }
        var divid=$(oThis.sDiv).prop("id");
        var undo=new CH.undoredo;
        undo.id=divid;
        undo.lastaction="Edit";
        var ind=CH.VC3.findItem(divid);
        var it = {};
        $.extend(it,CH.VC3.items[ind]);
        undo.item=it;
        CH.VC3.undos.push(undo);
        CH.VC3.redos=[];
        var temp=$(oThis.sDiv).children(" span");
        var temp2=temp;
        var temp3=temp;
        temp=$(temp).css("font-size");
        temp2=$(temp2).css("color");
        temp3=$(temp3).css("font-family");
        if(temp3 != undefined)
        {
            if((temp3.substring(0, 1)=="'")||(temp3.substring(0, 1)=="\""))
            {
                temp3 = temp3.substring(1, temp3.length-1);
            }
            
            var divwid=$(this.sDiv).css("width");
            divwid = divwid.substring(0, divwid.length-2);
            // divwid=divwid-45;
            divwid=divwid+"px"
            var tartalom=$(oThis.sDiv+" span").html();
            $(oThis.sDiv).children(" span")
            .empty()
            .append("<input type='text' id='input2' style='background-color:transparent;width:"+divwid+";font-size:"+temp+";color:"+temp2+";font-family:"+temp3+"' value='" + tartalom + "'>")
            .addClass('inputMode');
            $("#input2").mouseout(function() {
                $(this).parent().html($(this).val())
                .removeClass('inputMode');
                CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))].innertxt=$(this).val();
             //   populateLeftBarOnFront();
                CH.VC3.initTextOfLeftOfFrontSideChange();
            
                return false;                    
            });
        }
    },
    
    initImageEdit:function(){
        var oThis=this;
        $(".drop .preview").unbind("dblclick");
        $(".drop .preview").dblclick(function() {
            var imgsrc=($(this).prop('src'));
            $("#target").removeAttr('src').prop('src',imgsrc);
            oThis.editCropImage(this);
        });
    },
    
    editCropImage:function(img){
        var oThis=this;
        if($(img).prop("id")=="upimg_crop")
        {
            alert("Cannot crop an image more than once!");    
        }
        else{
            var temp=($(img).prop("src"));
            var imgStr = "<img class='cropImage' src='"+temp+"' />";
            $('#target').html(imgStr);
            $("#cropper").dialog("destroy");
            $("#cropper").dialog({
                title:"Crop image",
                modal: true,
                width:"auto",
                height:"auto",
                open:function(event, ui){
                    $($('#target .cropImage')[0]).Jcrop({
                        onChange: oThis.updateCoords,
                        onSelect: oThis.updatePreview,
                        aspectRatio: 1
                    },function(){
                        // Use the API to get the real image size
                        var bounds = this.getBounds();
                        oThis.boundx = bounds[0];
                        oThis.boundy = bounds[1];
                        // Store the API in the jcrop_api variable
                        oThis.jcrop_api = this;
                    });
                },
                buttons: {
                    Crop: function() {
                        var imgs=($(img).prop('src'));
                        var url=$("#target img").prop('src');       
                        oThis.filename = url.substring(url.lastIndexOf('/')+1);
                        oThis.filename="./uploads/"+oThis.filename;
                        var ext =("."+oThis.filename.split('.').pop());
                        var output = oThis.filename.substr(0, oThis.filename.lastIndexOf('.')) || oThis.filename;
                        var updatedfilename=(output+"1"+ext);
                        $.ajax({
                            type: "POST",
                            url: "basicFunctions.php",
                            data: {
                                "type":"CropImage",
                                src:oThis.filename, //here
                                x:CH.VC3.imgparam.x,
                                y:CH.VC3.imgparam.y,
                                w:CH.VC3.imgparam.w,
                                h:CH.VC3.imgparam.h
                            } ,
                            success:function(){
                                $(img).prop('id',"upimg_crop");
                                $(img).prop('src',updatedfilename);    //here 
                                //alert(oThis.sDiv);
                                $(img).load(function(){
                                    var index=CH.VC3.findItem(oThis.sDiv.substr(1));
                                    CH.VC3.items[index].width=$(oThis.sDiv).width();
                                    CH.VC3.items[index].height=$(oThis.sDiv).height();   
                                    //window.console.log(CH.VC3.items[index].width+"*"+CH.VC3.items[index].height);
                                    
                                });
                                //var index=($(oThis.sDiv).prop("id")).subs.tr($(oThis.sDiv).prop("id").length-1);//
                                
                                //alert(findItem("demobs1"));
                                var index=CH.VC3.findItem(oThis.sDiv.substr(1));
                                var tempPreviousPath=(CH.VC3.items[index].innertxt);
                                var start_pos = tempPreviousPath.indexOf(',/') + 2;
                                tempPreviousPath=tempPreviousPath.substring(0,start_pos);
                                start_pos = updatedfilename.indexOf('./uploads/')+10;
                                var tempNewPath;
                                tempNewPath = updatedfilename.substring(start_pos,updatedfilename.length);
                                updatedfilename=tempPreviousPath+tempNewPath;
                                CH.VC3.items[index].innertxt=(updatedfilename);
                                //alert();
                                temp = tempPreviousPath.split(',');
                                $(oThis.sDiv).css("height","auto");
                                //alert(temp[0]);
                                //alert(tempNewPath);
                                $.ajax({
                                    type: "POST",
                                    url: "basicFunctions.php",
                                    data: {
                                        "type":"changeNameInUploads",
                                        imageId:temp[0], //here
                                        newName:tempNewPath
                                    } 
                                });
                            //here    
                    
                            //
                            }
                        });
                        oThis.jcrop_api.destroy();
                        $( this ).dialog( "close" );
                        
                    //alert(CH.VC3.items[index].width+"*"+CH.VC3.items[index].height);
                        
                    }
                }
            });
        }
    },
    
    updateCoords:function(c)
    {
        var oThis=this;
        CH.VC3.imgparam=c;
    //   alert(oThis.imgparam.x);
    //   alert(oThis.imgparam.y);
    //   alert(oThis.imgparam.w);
    //   alert(oThis.imgparam.h);
    //$('#x').val(c.x);
    //$('#y').val(c.y);
    //$('#w').val(c.w);
    //$('#h').val(c.h);
    },
    
    checkCoords:function()
    {
        if (parseInt($('#w').val())) return true;
        alert('Please select a crop region then press submit.');
        return false;
    },
    
    /* current
    updatePreview:function(c){
        if (parseInt(c.w) > 0)
        {
            var rx = 100 / c.w;
            var ry = 100 / c.h;

            $('#preview').css({
                width: Math.round(rx * this.boundx) + 'px',
                height: Math.round(ry * this.boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }
    },
 */
    mWid:220,
    initDiagonal:"",
    initFontSize:"",
    
    initResizeForText:function(){
        var oThis=this;
        oThis.destroyDragResize();
        var resizeTimerSet = false;
        fontResize=function(parentDiv, selItem)
        {
            var maxWidth = $(parentDiv).width();
            var maxHeight = $(parentDiv).height();			
            var _text = $(parentDiv+"  span");
            var fontSize = parseInt(_text.css("font-size"), 10);
            var multiplier = maxWidth/_text.width();
            fontSize = (fontSize*(multiplier-0.1));
            150;//just a max font-size from where we start decreasing it
            do { 
                _text.css('font-size', fontSize);
                textHeight = _text.height();
                textWidth = _text.width();
                fontSize = fontSize - 1;
            } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);	
            resizeTimerSet = false;		
            var temp = _text.css('font-size');
            var newStr = temp.substring(0, temp.length-2);
            newStr=Math.ceil(newStr);
            newStr=parseInt(newStr);
            newStr=$(newStr).toUnit("pt");
            newStr=Math.ceil(newStr);
            newStr=""+newStr;    
            CH.VC3.items[selItem].fontSize=newStr;    
        };
        window.console.log("In image resize: "+oThis.sDiv);
        var divIdForResize;
        for(var i=0;i<CH.VC3.items.length;i++){
            
   
   
            if($("#"+CH.VC3.items[i].id).children("span").children().prop("class")!="preview")
            {
                divIdForResize="#"+CH.VC3.items[i].id;
            }
           
           
            /*    
           
           $(this).resizable({
    minWidth: -(contentElem.width()) * 10,  // these need to be large and negative
    minHeight: -(contentElem.height()) * 10, // so we can shrink our resizable while scaled
    resize: function(event, ui) {

        var changeWidth = ui.size.width - ui.originalSize.width; // find change in width
        var newWidth = ui.originalSize.width + changeWidth / zoomScale; // adjust new width by our zoomScale

        var changeHeight = ui.size.height - ui.originalSize.height; // find change in height
        var newHeight = ui.originalSize.height + changeHeight / zoomScale; // adjust new height by our zoomScale

        ui.size.width = newWidth;
        ui.size.height = newHeight;

    }
});*/
           
           
           
           
            $(divIdForResize).resizable({
                aspectRatio:false,
                containment: "parent",
                minWidth: 40,
                minHeight: 40,
                //minWidth: -(40) * 10,  // these need to be large and negative
                //minHeight: -(40) * 10, // so we can shrink our resizable while scaled
                
                resize:function(event, ui) {
                    if(!resizeTimerSet) 
                    {
                        if(oThis.zoomScale>1)
                        {
                            var changeWidth = ui.size.width - ui.originalSize.width; // find change in width
                            var newWidth = ui.originalSize.width + changeWidth / ( oThis.zoomScale ); // adjust new width by our zoomScale

                            var changeHeight = ui.size.height - ui.originalSize.height; // find change in height
                            var newHeight = ui.originalSize.height + changeHeight / ( oThis.zoomScale ); // adjust new height by our zoomScale

                            ui.size.width = newWidth;
                            ui.size.height = newHeight;
                        }
                        
                        window.setTimeout (function(){
                            fontResize(oThis.sDiv, oThis.selecteditem);
                        }, 100);
                        resizeTimerSet = true;
                    }
                },
                start:function(u,e){
                    if(oThis.isTriangle==1){
                        oThis.oldSize=$(oThis.sDiv).css("font-size");
                    }
                    var divid=$(oThis.sDiv).prop("id");
                    var undo=new CH.undoredo;
                    undo.id=divid;
                    undo.lastaction="Fontsize";
                    var ind=CH.VC3.findItem(divid);
                    var it = {};
                    $.extend(it,CH.VC3.items[ind]);
                    undo.item=it;
                    undo.lastvalue=$("#"+divid+" span").css("front-size");
                    CH.VC3.undos.push(undo);
                    CH.VC3.redos=[];
                },
                stop:function(e,ui)
                {
                    var fonttemp=$(oThis.sDiv+" span").css("font-size");
                    var newStr = fonttemp.substring(0, fonttemp.length-2);
                    newStr=Math.ceil(newStr);
                    newStr=parseInt(newStr);
                    newStr=$(newStr).toUnit("pt");
                    newStr=Math.ceil(newStr);
                    newStr=""+newStr;    
                    CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))].fontSize=newStr;
                    $("#fontsize").append("<option>"+newStr+"</option>");
                    $("#fontsize").val(newStr);
                    
                    if(oThis.isTriangle==1){
                        p1={
                            x:ui.position.left,
                            y:ui.position.top
                            };
                        p2={
                            x:ui.position.left+$(oThis.sDiv).width(),
                            y:ui.position.top
                            };
                        p3={
                            x:ui.position.left+$(oThis.sDiv).width(),
                            y:ui.position.top+$(oThis.sDiv).height()
                            };
                        p4={
                            x:ui.position.left,
                            y:ui.position.top+$(oThis.sDiv).height()
                            };
                    
                        oThis.checkAndRevertSizeOfTheElement(p1,p2,p3,p4);
                        
                    }
                    
                    
                    
                    
                }
            
            });
        }
    },
    
    checkAndRevertSizeOfTheElement:function(p1,p2,p3,p4){
        var oThis=this;
        if(oThis.isInsideTriangle(A,B,C,p1)){
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
                    
        }else{
                        
            $(oThis.sDiv+" span").animate({
                "font-size":oThis.oldSize
            });
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
        }
        if(oThis.isInsideTriangle(A,B,C,p2)){
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
                    
        }else{
                        
            $(oThis.sDiv+" span").animate({
                "font-size":oThis.oldSize
            });
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
        }
        if(oThis.isInsideTriangle(A,B,C,p3)){
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
                    
        }else{
                        
            $(oThis.sDiv+" span").animate({
                "font-size":oThis.oldSize
            });
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
        }
        if(oThis.isInsideTriangle(A,B,C,p4)){
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
                    
        }else{
                        
            $(oThis.sDiv+" span").animate({
                "font-size":oThis.oldSize
            });
            $(oThis.sDiv).css("height","auto");
            $(oThis.sDiv).css("width","auto");
        }
    },
    
    getContentDiagonal:function(proDivId) {
        var contentWidth = $(proDivId).width();
        var contentHeight = $(proDivId).height();
        return contentWidth * contentWidth + contentHeight * contentHeight;
    },
    
    initResizeForImage:function(){
        var oThis=this;
        oThis.destroyDragResize();
        var oldWidth;
        var oldHeight;
        window.console.log("In image resize: "+oThis.sDiv);
        if(oThis.sDiv!="")
        {
            $(".drop "+oThis.sDiv).resizable({
                aspectRatio:true,
                containment: "parent",
                minWidth: 40,
                minHeight: 40,
                start:function(eve,ui){
                    oldWidth=$(".drop "+oThis.sDiv).width();
                    oldHeight=$(".drop "+oThis.sDiv).height();
                },
                resize:function(event, ui) {},
                stop:function(e,u)
                {
                    CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))].width=$(oThis.sDiv).width()+"";
                    CH.VC3.items[CH.VC3.findItem(oThis.sDiv.substring(1))].height=$(oThis.sDiv).height()+"";
                    var oWidth=$(oThis.sDiv+" span img").attr("owidth");
                    var oHeight=$(oThis.sDiv+" span img").attr("oheight");
                    var cWidth=$(oThis.sDiv+" span img").width();
                    var cHeight=$(oThis.sDiv+" span img").height();
                    var dropWidth=$(".drop").width();
                    CH.com.VC=oThis;
                    if(!CH.com.checkDPI(cWidth,cHeight,oWidth,oHeight, oThis.bgOriginalWidth, oThis.bgOriginalHeight,dropWidth)){
                        $(".drop "+oThis.sDiv).animate({
                            "width":oldWidth,
                            "height":oldHeight
                        },function(){
                            alert("Image DPI becomes less than "+CH.FIXED_DPI)
                        });
                    }
                    
                }
            });
        }
    },
    
    initButtonToChangeBackground:function(){  //change background
        var oThis=this;
        $("#toolbarImageAction #changebg").unbind("click");
        $("#toolbarImageAction #changebg").click(function() {
            oThis.changeBackground();    
        });
    },
    
    changeBackground:function(){ 
        var oThis=this;
        $("#imageform2").replaceWith("");
        var formStr = " <form id='imageform2' method='post' style='display:none;' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadBackground&formatId="+this.formatId+"'>"+
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
                    var count =(temp.split(".").length - 1)
                    //alert(count.length);
                    var inCaseOfDots;
                    if(count>1)
                    {
                    /*     inCaseOfDots=CH.VC3.removeAllButLast(temp,".") 
                        temp=inCaseOfDots;*/
                    }
                    
                    var result = temp.substring(temp.lastIndexOf("."));
                    if(result.toLowerCase()==".jpg"||result.toLowerCase()==".tiff")
                    {
                        $("#divLoad").dialog("open");
                        $("#imageform2").ajaxForm(
                        {
                            success:    function(responseText, statusText, xhr, $form) { 
                                var resp=responseText.split(',');
                                var src=resp[0];
                                var success=resp[1];
                                
                                var actualval="./uploads/"+src;
                                
                                /*    
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
                                */
                                
                                /* if(success!==undefined)
                                {*/
                                if(success!=null && success=="1")
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
                                    oThis.bgOriginalWidth=parseInt(resp[2]);
                                    oThis.bgOriginalHeight=parseInt(resp[3]);
                                    oThis.backgroundId=null;
                                }
                                else if(success!=null && success=="0"){
                                    //alert(src);
                                    $("#divLoad").dialog("close");
                                    CH.VC3.changeBackground();    
                                }
                            /*}
                                else{
                                    alert("Please select a small image or see if the image extension is correct");
                                    $("#divLoad").dialog("close");
                                    CH.VC3.changeBackground();
                                }*/
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
    },    
    removeAllButLast:function(string, token) {
        var parts = string.split(token);
        return parts.slice(0,-1).join('') + token + parts.slice(-1)
    },
    initDrag:function(){
        var oThis=this;
        $(oThis.sDiv+" .drag-image").unbind("mousedown");
        $(oThis.sDiv+" .drag-image").mousedown(function(){
            CH.VC3.dragTheDiv();    
        });
    },
    
    dragTheDiv:function(){
        var oThis=this;
        $(".drop div").draggable({
            containment: "parent",
            drag: function(event, ui){
                $(".drop div .delete-image").hide();
                $(".drop div .rotate-image").hide();
                var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
                var newLeft = ui.originalPosition.left + changeLeft / (( oThis.zoomScale )); // adjust new left by our zoomScale

                var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
                var newTop = ui.originalPosition.top + changeTop / oThis.zoomScale; // adjust new top by our zoomScale

                ui.position.left = newLeft;
                ui.position.top = newTop;
            },
            start:function(event, ui){
                if(oThis.zoomScale > 1)
                {
                    ui.position.left = 0;
                    ui.position.top = 0;
                }
                
                var divid=$(oThis.sDiv).prop("id");
                if(oThis.isTriangle == 0)
                {
                    var undo=new CH.undoredo;
                    undo.id=divid;
                    undo.lastaction="Drag";
                    var ind=CH.VC3.findItem(divid);
                    CH.VC3.getXAndYPosition(oThis.sDiv);
                    var it = {};
                    $.extend(it,CH.VC3.items[ind]);
                    undo.item=it;
                    CH.VC3.undos.push(undo);
                    CH.VC3.redos=[];
                }
                else 
                {
                    //alert(divid);
                    oThis.oldPositionLeft=$("#"+divid).css("left");
                    oThis.oldPositionTop=$("#"+divid).css("top");
                    
                //window.console.log("left"+oThis.oldPosition.left);
                //window.console.log("top"+oThis.oldPosition.top);
                    
                //alert(oThis.oldPosition)
                }
            
            },
            stop:function(eve,ui){
                if(oThis.isTriangle == 0)
                {
                    var dropOffset=$("#drop").offset();
                    var dropLeft=dropOffset.left;
                    var dropTop=dropOffset.top;
                    var offset = $(this).offset();
                    var divid=$(this).prop("id");
                    var xPos = offset.left;
                    var yPos = offset.top;
                    var roundx=(""+(xPos-dropLeft));
                    var roundy=(""+(yPos-dropTop));
                    var ind=CH.VC3.findItem(divid);
                    CH.VC3.items[ind].xposition=roundx;
                    CH.VC3.items[ind].yposition=roundy;
                }
                else{

                    p1={
                        x:ui.position.left,
                        y:ui.position.top
                        };
                    p2={
                        x:ui.position.left+$(oThis.sDiv).width(),
                        y:ui.position.top
                        };
                    p3={
                        x:ui.position.left+$(oThis.sDiv).width(),
                        y:ui.position.top+$(oThis.sDiv).height()
                        };
                    p4={
                        x:ui.position.left,
                        y:ui.position.top+$(oThis.sDiv).height()
                        };
                    
                    oThis.checkAndMoveBackTheElement(p1,p2,p3,p4);
                }
            }
        }) ;
    },
    
    checkAndMoveBackTheElement:function(p1,p2,p3,p4){
        var oThis=this;
        if(oThis.isInsideTriangle(A,B,C,p1)){
        }else{
            $("#"+$(oThis.sDiv).prop("id")).animate({
                "left":oThis.oldPositionLeft,
                "top":oThis.oldPositionTop
            });
        }
        if(oThis.isInsideTriangle(A,B,C,p2)){
        }else{
            $("#"+$(oThis.sDiv).prop("id")).animate({
                "left":oThis.oldPositionLeft,
                "top":oThis.oldPositionTop
            });
        }
        if(oThis.isInsideTriangle(A,B,C,p3)){
        }else{
            $("#"+$(oThis.sDiv).prop("id")).animate({
                "left":oThis.oldPositionLeft,
                "top":oThis.oldPositionTop
            });
        }
        if(oThis.isInsideTriangle(A,B,C,p4)){
        }else{
            $("#"+$(oThis.sDiv).prop("id")).animate({
                "left":oThis.oldPositionLeft,
                "top":oThis.oldPositionTop
            });
        }
    },



    getXAndYPosition:function(proDivId){   //proDivId is div name
        var obj=document.getElementById("drop");
        var curtop=0;
        var curleft = 0;
        var curright=0;
        if (obj.offsetParent) {
            do {
                if(curright==0)
                {
                    curright = obj.offsetWidth;
                }
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        var temp=proDivId.substring(1);
        var index=CH.VC3.findItem(temp);
        if(index==-1){
            window.console.log("kharab id="+temp);
        }
        else{
            
            var angleOfdiv = (CH.VC3.items[index].angle);
            
            //window.console.log($("#"+temp).prop("id"));
            //window.console.log(angleOfdiv);
            
            $("#"+temp).css('-moz-transform', 'rotate(0deg)');
            $("#"+temp).css('-webkit-transform', 'rotate(0deg)');
            $("#"+temp).css('-o-transform', 'rotate(0deg)');
            $("#"+temp).css('-ms-transform', 'rotate(0deg)');
            var offset = $(proDivId).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            
            $("#"+temp).css('-moz-transform', 'rotate('+angleOfdiv+'deg)');
            $("#"+temp).css('-webkit-transform', 'rotate('+angleOfdiv+'deg)');
            $("#"+temp).css('-o-transform', 'rotate('+angleOfdiv+'deg)');
            $("#"+temp).css('-ms-transform', 'rotate('+angleOfdiv+'deg)');
            var roundx=$.trim(" "+(xPos-curleft));
            roundx=roundx-CH.textConstantToAddForVerticalImages;
            roundx=Math.floor(roundx);
            var roundy=$.trim(" "+(yPos-curtop));
            CH.VC3.items[CH.VC3.findItem(temp)].xposition=$.trim(" "+roundx);
            CH.VC3.items[CH.VC3.findItem(temp)].yposition=$.trim(" "+roundy);
        }
        if(CH.VC3.items[CH.VC3.findItem(temp)] != undefined)
        {
            CH.VC3.items[CH.VC3.findItem(temp)].width=$(proDivId+" span").width()+"";
        }
    },
    
    initSave:function(){ ///backhere
        var oThis=this;
        $("#Save").unbind("click");
        $("#Save").click(function () {
            oThis.saveState("save");           
        });
    },
    initSaveAndSend:function(){
        var oThis=this;
        $("#saveAndSend").unbind("click");
        $("#saveAndSend").click(function () {
            oThis.saveState("save");           
        });
        
    },
    
    beforeSaveState:function(){
        var oThis=this;
        
        var empty;
        this.sideColor=$("#clrpikr input").val();
        //alert("side color: "+this.sideColor+"and format is: "+this.formatName+"and the filling is"+this.fillingName);
        
        var i;
        for(i=1;i<=CH.VC3.totalcount;i++)
        {
            CH.VC3.getXAndYPosition("#demo"+i+"");
        }
        var temp=$(".left").css("background-color");
        temp=CH.VC3.rgb2hex(temp);
        temp=temp.substring(1,temp.length);
        CH.VC3.leftsidebgcolor=temp;
        var temp2=$(".right").css("background-color");
        temp2=CH.VC3.rgb2hex(temp2);
        temp2=temp2.substring(1,temp2.length);
        CH.VC3.rightsidebgcolor=temp2;
        traverseBack();   
        if(CH.VC3.isTriangle=="1")
        {
            
            var tempBackgroundLeftAndTop=$(".drop").css("background-position");
            //alert(temp);
            var parts = tempBackgroundLeftAndTop.split(' ');
            var backLeft=parts[0];
            var backTop=parts[1];
            backLeft=backLeft.substring(0, backLeft.length-2);
            backTop=backTop.substring(0, backTop.length-2);
            
            var tri=new CH.triangleprop;
            
            CH.VC3.triangle.push(tri);
            CH.VC3.triangle[CH.VC3.triangle.length-1].isTri="1";
            CH.VC3.triangle[CH.VC3.triangle.length-1].imagePath=oThis.overlayImagePath;
            CH.VC3.triangle[CH.VC3.triangle.length-1].newBackgroundLeft=backLeft;
            CH.VC3.triangle[CH.VC3.triangle.length-1].newBackgroundTop=backTop;
        /*CH.VC3.triangle[CH.VC3.triangle.length-1].topx="300";
            CH.VC3.triangle[CH.VC3.triangle.length-1].topy="0";
            CH.VC3.triangle[CH.VC3.triangle.length-1].bottomLeftx="100";
            CH.VC3.triangle[CH.VC3.triangle.length-1].bottomLefty="500";
            CH.VC3.triangle[CH.VC3.triangle.length-1].bottomRightx="500";
            CH.VC3.triangle[CH.VC3.triangle.length-1].bottomRighty="500";*/
        }
        else
        {
            var tri=new CH.triangleprop;
            CH.VC3.triangle.push(tri);
            CH.VC3.triangle[CH.VC3.triangle.length-1].isTri=0;
        }
        CH.VC3.obj={
            "triangle":this.triangle,
            "backSide":this.back,
            "frontSide":this.items,
            "leftSide":""+this.leftsidebgcolor,
            "rightSide":""+this.rightsidebgcolor,
            "frontBackground":this.dropbackground,
            //"frontBackground":"back.png",
            "backBackground":this.dropbackground,
            "format":this.formatName,
            "filling":this.fillingName,
            "sideColor":this.sideColor
        };
    },
    
    saveState:function(state){
        var oThis=this;
        window.console.log("a="+JSON.stringify(CH.VC3.obj));
        this.tosave=JSON.stringify(CH.VC3.obj);
        //alert(this.tosave);
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
                
                /*   In use Commented by zain 5-10-2012*/
                $("#divLoad").dialog("open"); 
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
                            if(CH.VC3.currentSide=="Front")
                                imgEPS.src='./EPSIMAGE/Front_EPS_'+data+'.png';
                            else 
                                imgEPS.src='./EPSIMAGE/Back_EPS_'+data+'.png';
                            $("#previeweps").html(imgEPS);
                        }else if(state=="save"){
                            //window.location=window.location.hostname+"/vccc/EPSIMAGE/EPSImage_"+data+".eps";
                            // window.location.pathname="/adventscalender/vccc/EPSIMAGE/EPSImage_"+data+".eps";
                       
                            //window.location.pathname="/adventscalender/EPSIMAGE/Front_EPSImage_"+data+".eps";
                            window.location.pathname="/adventscalender/EPSIMAGE/outfile_"+data+".zip";

                            $("#divLoad").dialog("close");
                        //alert(data);   to view data to be stored
                        }
                    }
                });
            //End of Commented by zain 5-10-2012
            }
        });  
    },
    
    
    initMoveBackground:function(){
        var oThis=this;
        $("#moveback-button-div").click (function(){
            oThis.moveBackground();
        });
    },
    
    moveBackground:function(){
        var oThis=this;
        
        if(IsTriFlag== false){
            oThis.deinitialize();
            CH.VC3.addInitialDivs = false;
            $("#save-button-div").hide();
            $("#preview-button-div").hide();
            //$("#back-button-div").hide();
            $("#deskBackButton").hide();
            $("#moveBack").val("BACK TO EDITING");
            $(".demo div").draggable('destroy');
            $(".drop").bind('mousedown mouseup mouseleave', handle);
            $(".drop").bind('dblclick', reset);
        }

        if(IsTriFlag== true){
            $("#save-button-div").show();
            $("#preview-button-div").show();
            //$("#back-button-div").show();
            $("#deskBackButton").show();
            $("#moveBack").val("MOVE BACKGROUND");
            $(".drop").unbind('mousedown mouseup mouseleave');
            $(".drop").unbind('dblclick');
            oThis.init();
        }
        //alert (IsTriFlag);
        IsTriFlag=!IsTriFlag;
        
    },
    
    initLoad:function(){
        var oThis=this;
        $("#Load").unbind("click");
        $("#Load").click(function () {
            oThis.loadstate();           
        });
    },
    
    loadstate:function(){
        $(".drop").empty();
        CH.VC3.initDestroyDrop();
        $.ajax({ 
            type: "POST",
            url: "loadfromdb.php",
            data: {},
            success: function(data){
                CH.VC3.toload=data;           
                var obj = JSON.parse(CH.VC3.toload);            
                var backdata=obj.backSide;
                $("#backaddress1input").val(backdata[0].inputvalue);
                $("#backaddress2input").val(backdata[1].inputvalue);
                $("#backtelephoneinput").val(backdata[2].inputvalue);
                $("#backwebsiteinput").val(backdata[3].inputvalue);
                var leftdata=obj.leftSide;
                $(".left").css("background-color","#"+leftdata);
                var rightdata=obj.rightSide;
                $(".right").css("background-color","#"+rightdata);
                var back=obj.frontBackground;
                $('.drop').css('background-image', 'url()');
                $('.drop').hide();
                $('.drop').show();
                var url = "url(./"+back+"?"+Math.random()+")";
                $('.drop').css('background-image', url);
                var q=obj.frontSide;
                window.console.log(q);
                var i;
                var x;
                for(i=0;i<q.length;++i)
                {
                    var x=i+1;
                    if(CH.VC3.items[i].istxt=="1")
                    {
                        $(".drop").append("<div id = 'demo"+x+"' class='demo' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+x+"'>"+CH.VC3.items[i].innertxt+"</span></div>"); //current
                    }
                    else if(CH.VC3.items[i].istxt=="0")
                    {
                        $.ajax({
                            type: "POST",
                            url: "basicFunctions.php",
                            data: {
                                "type":"getImageFromUploads",
                                src:CH.VC3.items[i].innertxt
                            } ,
                            success:function(data){
                                var src=data;
                                $("#drop").append("<div id = 'demo"+x+"' class='demo' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+x+"'><img class='preview' style='width: 150px;'  src='uploads"+src+"' /></span></div>"); //current     
                            }
                        });
                    }    
                    $("#demo"+x).addClass("demo");
                    if (q[i].isBold==1)
                    {
                        $("#span"+x).addClass("bold");
                    }
                    if (q[i].isItalic==1)
                    {
                        $("#span"+x).addClass("italic");
                    }
                    if (q[i].isUnderlined==1)
                    {
                        $("#span"+x).addClass("underline");
                    }
                    if (q[i].isRightAligned==1)
                    {
                        $("#demo"+x).addClass("rightalign");
                    }
                    if (q[i].isLeftAligned==1)
                    {
                        $("#demo"+x).addClass("leftalign");
                    }
                    if (q[i].isCenterAligned==1)
                    {
                        $("#demo"+x).addClass("centeralign");
                    }
                    if (q[i].fontcolor!==0)
                    {
                        $("#span"+x).css("color" , q[i].fontcolor);
                    }
                    if (q[i].xposition!==0||q[i].yposition!==0)
                    {
                        var offset = $(".drop").offset();
                        q[i].xposition=parseInt(q[i].xposition);
                        q[i].yposition=parseInt(q[i].yposition);
                        $("#demo"+x).css({
                            left: q[i].xposition+"px",
                            top: q[i].yposition+"px"
                        });
                    } 
                    
                    if (q[i].angle!==0)
                    {
                        $("#demo"+x).css('-moz-transform', 'rotate('+q[i].angle+'deg)');
                        $("#demo"+x).css('-webkit-transform', 'rotate('+q[i].angle+'deg)');
                        $("#demo"+x).css('-o-transform', 'rotate('+q[i].angle+'deg)');
                        $("#demo"+x).css('-ms-transform', 'rotate('+q[i].angle+'deg)');
                    }
                    if (q[i].fontSize!=="0")
                    {
                        $("#span"+x).css("font-size" ,q[i].fontSize);
                    }
                    x=i+1;
                }
                CH.VC3.initSelection();
                CH.VC3.destroyDragResize();
                CH.VC3.initDrag();
                CH.VC3.initResizeForText();
                CH.VC3.initResizeForImage();
                CH.VC3.initBtEditField();
                CH.VC3.initImageEdit();
                CH.VC3.initrotatedivs();
                CH.VC3.initHideCornerButtons();
                CH.VC3.initBtRemField();
            }
        });
    },
    
    fl_rotate:false,
    initrotatedivs:function() {
        var pw;
        var oThis=this;
        $(".drop div .rotate-image").unbind("mousedown");
        $(".drop div .rotate-image").mousedown(function (e){
            var divid=$(oThis.sDiv).prop("id");
            var undo=new CH.undoredo;
            undo.id=divid;
            undo.lastaction="Rotate";
            var ind=CH.VC3.findItem(divid);
            var it = {};
            $.extend(it,CH.VC3.items[ind]);
            undo.item=it;
            CH.VC3.undos.push(undo);
            CH.VC3.redos=[];
            CH.VC3.hookRotation(oThis, e);////////
            return;
        });
        
        $(document).mouseup(function (e){
            if( $(".miniColors-colors").length>0 && $(CH.VC3.sDiv).length>0 && CH.VC3.colorChanged){
                CH.VC3.colorChanged=false;
                var item2={};
                var ind=CH.VC3.findItem(CH.VC3.sDiv.substring(1));
                if(ind!=-1){
                    $.extend(item2,CH.VC3.items[ind]);
                    var undo=new CH.undoredo;
                    undo.id=item2.id;
                    undo.item=item2;
                    undo.lastaction="Color";
                    CH.VC3.undos.push(undo);
                    CH.VC3.redos=[];
                    CH.VC3.items[ind].fontcolor=CH.VC3.items[ind].fontColorNext;
                }
            }
            
            if(oThis.fl_rotate)
            {                
                oThis.initDrag();
                if($(oThis.sDiv).children("span").children().prop("class")!="preview")
                {
                    oThis.initResizeForText();
                }
                else
                {
                    oThis.initResizeForImage();
                }
                var ele= $(oThis.sDiv);
                ele.unbind( 'mousemove' );
                ele.draggable({
                    containment: 'parent'
                });
                ele=0;
                oThis.fl_rotate=false;
            }
        });
    },
    
    rotateOnMouse:function (e,pw) 
    {                   
        CH.VC3.rotateOnMouseMove(this, e, pw);
    },
    
    
    
    rotateOnMouseMove:function(obj, event, pw)
    {
        var offset = pw.offset();
        var center_x = (offset.left) + ( $(pw).width() / 2 );
        var center_y = (offset.top) + ( $(pw).height() / 2 );
        var mouse_x = event.pageX;
        var mouse_y = event.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 100;
        $(pw).css('-moz-transform', 'rotate('+degree+'deg)');
        $(pw).css('-webkit-transform', 'rotate('+degree+'deg)');
        $(pw).css('-o-transform', 'rotate('+degree+'deg)');
        $(pw).css('-ms-transform', 'rotate('+degree+'deg)');
        obj.lastaction="Rotate";
    
        var ids=$(pw).prop("id");
        // window.console.log(ids);
        var ind=CH.VC3.findItem(ids);
        degree=""+degree;
        if(ind!=-1){
            CH.VC3.items[ind].angle=degree;
       
        
        }
        else{
            window.console.log("id is not corrent.");
        }
    },

    hookRotation:function(obj, e)
    {
        $(".drop div .delete-image").hide();
        $(".drop div .drag-image").hide();
        obj.fl_rotate=true;
        e.stopImmediatePropagation();
        e.preventDefault();
        $(document).mousemove(function(e){
            if(obj.fl_rotate){
                var element=$(obj.sDiv);
                obj.rotateOnMouse(e,element);
                e.stopImmediatePropagation();
                e.preventDefault();
            } 
        });
    },
            
    putAddressInInitialscreen:function() 
    {
        currentPackage = CH.VC3;
        $(".screens").hide();
        $("#content-chooseaddresshtml").show();
        putAddressIndd();
        
    },        
            
    putBackGroundInInitialscreen:function() 
    {
        var oThis=this;
        loadDesigns(oThis,oThis.packageId,oThis.fillingId);
        
    },       
    
    
    findItem:function(itemId){
        for(var i=0;i<CH.VC3.items.length;i++){
            if(CH.VC3.items[i].id==itemId){
                return i;
            }
        }
        return -1;  
    },
    
    
    
    
    
    cloneItem:function(obj){
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
    makeLeft:function(){
        $(".sider").append("<div id='left' class='left'></div>");
        $(".left").css("background-color",CH.VC3.leftrightbackbgcol);
        CH.VC3.leftsidebgcolor="ffffff";
        $(".left").hide();
    },

    makeRight:function(){
    
        $(".sider").append("<div id='right' class='right'></div>");
        $(".right").css("background-color",CH.VC3.leftrightbackbgcol);
        CH.VC3.rightsidebgcolor="ffffff";
        $(".right").hide();
    },
    getSides:function()
    {
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"CropImage"
            },
            success:function(data){
                $("#sidebuttons").html(data);            
                CH.VC3.toBack();
                CH.VC3.toFront();
                CH.VC3.toLeft();
                CH.VC3.toRight();
            } 
        });
    },
    appendDesignBackgroundUploadBt:function(){
        if(CH.language=="english"){
            $('#buttonDiv').html(" <div id='uploadButton'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='UPLOAD' onclick='changeBackground();'/></div>");
        }else if(CH.language=="dutch"){
            $('#buttonDiv').html("<div id='uploadButton'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Hochladen' onclick='changeBackground();'/></div>");
        }
    },
    makeTriangleTorestrictDrag:function(ax,ay,bx,by,cx,cy){
        
            
        $(".drop").append("<div id='a' style='position:absolute; display:none; left:"+ax+"px;top:"+ay+"px;'>A</div><div id='b' style='position:absolute;display:none; left:"+bx+"px;top:"+by+"px;'>B</div><div id='c' style='position:absolute;display:none; left:"+cx+"px;top:"+cy+"px;'>C</div>");
        A={
            y:parseInt(ay),
            x:parseInt(ax)
        };
        B={
            y:parseInt(by),
            x:parseInt(bx)
        };
        C={
            y:parseInt(cy),
            x:parseInt(cx)
        };
        $("#a").css("top",A.y);
        $("#a").css("left",A.x);
			
        $("#b").css("top",B.y);
        $("#b").css("left",B.x);
			
        $("#c").css("top",C.y);
        $("#c").css("left",C.x);
        
        
    },
    moveTextAccordinglyIntoTriangle:function(firstdivX,firstdivY){
        var oThis=this;
        var variablePadding = 0;
        var variableY = parseInt(firstdivY);
        var count=0;
        while(count<oThis.items.length)
        {
            variableY=variableY+variablePadding;
            var temp="#"+oThis.items[count].id
            $(temp).css("left",firstdivX+"px");
            $(temp).css("top",variableY+"px");        
            
            variablePadding=variablePadding+25;
            count++;
        }
    },
    isInsideTriangle:function (A,B,C,P){
        var oThis=this;
        var planeAB = (A.x-P.x)*(B.y-P.y)-(B.x-P.x)*(A.y-P.y);
        var planeBC = (B.x-P.x)*(C.y-P.y)-(C.x - P.x)*(B.y-P.y);
        var planeCA = (C.x-P.x)*(A.y-P.y)-(A.x - P.x)*(C.y-P.y);
        return oThis.sign(planeAB)==oThis.sign(planeBC) && oThis.sign(planeBC)==oThis.sign(planeCA);
    },
    sign: function (n){
        return Math.abs(n)/n;
    }
    
    
    
    
    
}
    
    
    
    

