if(window.CH == undefined){
    window.CH = {};
}


CH.VC2={
    packagename:"basic",
    undoflag:0,
    imagesuploaded:0,
    sDiv:"",
    xangle:0,
    counter:0,
    totalcount:0,
    count:0,
    tempdivid:"",
    tempspanid:"",
    items:{},
    overlayItem:{},
    obj:{},
    tosave:"",
    selecteditem:0,
    imageortext:0,
    imgparam:null,
    filename:"",
    jcrop_api:0,
    boundx:0,
    boundy:0,
    dirname:"img/bgimgs/basic_bgimgs/",
    result:"",
    dropbackground:"",
    currentSide:"Front",
    shapeSelected:"",
    sideColor:null,
    formatName:null,
    fillingName:null,
    formatId:null,
    fillingId:null,
    packageId:2,
    angleOfAddressDiv:0,
    idCounter:0,
    zoomScale:1,
    fillingsForThisPackage:"changeFillingsBasic",
    backgroundId:null,
    init:function(){
        
        CH.VC1.deinitialize();
        CH.VC3.deinitialize();
        CH.VC2.deinitialize();

        //this.initDestroyDrop();
        this.items= new Array();
        this.undos= new Array();
        this.redos= new Array();
        this.initSelection();
        this.initUnselect();
        this.initBtAddField();
        this.initUploadPic();
        this.initBtRemField();
        this.initBtEditField();
        this.initImageEdit();
        this.initDrag();
        this.initHideCornerButtons();
        this.initEditInPlace();    
        this.initPreviewEps();
        this.initEditableDiv();
        this.toBack();
        this.toFront();
        this.initSave();
        this.initRemoveUnusedButton();
        this.initBtColorPickerForbackground();
        this.initBtBold();
        this.initBtItalic();
        this.initBtUnderline();
        this.initChangeTheFont();
        this.initBtFontsize();
        this.initBtLalign();
        this.initBtRalign();
        this.initBtCalign();
        this.initMakeShape();
        this.initRelBtRotate();
        this.initZoomFunction();
        
        
        backButtons()
        makeBack();
        matchAddressFromBack();
        $(".address-tittle-txt h1").html("Enter Text For Front Side");
        this.back=new Array();
        this.overlayItem=new Array();
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
    initRemoveUnusedButton:function()
    {
        $("#removeButton").remove();
        $("#UndoButton").remove();
        $("#RedoButton").remove();
        $("#CopyButton").remove();
        $("#PasteButton").remove();
        $("#changebg").remove();
        //$("#toolbarFontAction").remove();
        $("#leftdivimg").parent().remove();
        $("#rightdivimg").parent().remove();
        $("#backdivimg").parent()
        $("#frontdivimg").parent()
        $("#textForSidecolor").remove();
        //$("#toolbarViewAction").append("<div id='textForSidecolor'>Choose color for back, left & right side</div>")
     $("#clrpikr").remove();
    },
    showLeftAndRightSide:function()
    {
        
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
       
    
    initBtColorPickerForbackground:function(){
        var oThis=this;
        $(".color-picker-for-background").miniColors({
            change: function(hex) {
                
                oThis.colorPickerForBackground("left",hex);
                    
                
            }
        });
    },
    preparingFront:function(){
     
        $( ".tools button" ).prop("disabled","disabled");
        $( ".tools button" ).css("opacity","0.5");
        $( ".tools select" ).prop("disabled","disabled");
        $( ".tools #addButton" ).prop("disabled","");
        $( ".tools #addButton" ).css("opacity","1");
        $( ".tools #upphot" ).prop("disabled","");
        $( ".tools #upphot" ).css("opacity","1");
        $( ".tools #toolbarViewAction button" ).prop("disabled","");
        $( ".tools #toolbarViewAction button" ).css("opacity","1");
        $( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");

        $( "#toolbarFontAction button" ).prop("disabled","");
        $( "#toolbarFontAction button" ).css("opacity","1");
        $( "#font1" ).prop("disabled","");
        $( "#font1" ).css("opacity","1");
        $( "#fontsize" ).prop("disabled","");
        $( "#fontsize" ).css("opacity","1");
    },
    initOrderAdventKalender:function(){
        var oThis=this;
        $("#OrderAdventKalender").unbind("click");
        $("#OrderAdventKalender").click(function () {
            for(var i=1;i<=CH.VC2.totalcount;i++)
            {
                CH.VC2.getXAndYPosition("#demobs"+i+"");
            }
            CH.VC2.beforeSaveState();
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
    initialScreenTwo:function(){
               
        $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();
        $("#changeFillingsBasic").show();
        $(".filling-content-lower").css("margin-left","5px");
        $(".nav").hide();
        $(".nav5bar").hide();
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar ul #second").prop("class","second active");
        CH.com.VC=this;
        CH.com.getFormats();
        //CH.VC2.getFormats();
        CH.selected=1;       
            
    }, 

    initMakeShape:function(){
        
        $(".drop").find(".shapeOfAC").remove();
        $(".back").find(".shapeOfAC").remove();
        $(".left").find(".shapeOfAC").remove();
        $(".right").find(".shapeOfAC").remove();
        var id;
        if(CH.VC2.shapeSelected=="triangle")
        {
            id=1;
        }
        else if(CH.VC2.shapeSelected=="hexagonal")
        {
            id=2;
        }
        else if(CH.VC2.shapeSelected=="diamond")
        {
            id=3;
        }
        else if(CH.VC2.shapeSelected=="circle")
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
    
    initEditableDiv:function(){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data:{
                type:"getDimensionsOfWhiteArea",
                src:CH.VC2.result    //sending image number coming from common load designs;
            } ,
            success:function(data){
                var temp = new Array();
                temp = data.split(' ');
                var bottom2=temp[0]+'px';
                var left=temp[1]+'px';
                var width=temp[2]+'px';
                var height=temp[3]+'px';
                
                var AddressBottom=temp[4]+'px';
                var AddressLeft=temp[5]+'px';
                var AddressWidth=temp[6]+'px';
                var AddressHeight=temp[7]+'px';
                CH.VC2.angleOfAddressDiv=temp[8];
                var AddressRotation=temp[8]+'deg';
                window.console.log("angle is: "+AddressRotation);
                //window.console.log(width);
                //window.console.log(" ");
                //window.console.log(height);
                $(".drop").append("<div class='overlaydb' style='bottom:"+bottom2+"; left:"+left+"; width:"+width+"; height:"+height+";'></div>");                
          $("#drop").append("<div id='addressOverlay' style='position:absolute; background-color: white; border: 2px dashed black; bottom:"+AddressBottom+"; height:"+AddressHeight+"; width:"+AddressWidth+"; left:"+AddressLeft+"; font-size:3pt; transform: rotate("+AddressRotation+"); -webkit-transform: rotate("+AddressRotation+"); -moz-transform: rotate("+AddressRotation+"); -o-transform: rotate("+AddressRotation+"); -ms-transform: rotate("+AddressRotation+");'><span>Company:"+$("#addressPageCompanyName").val()+" Road:"+ $("#addressPageRoad").val()+" Zip:"+ $("#addressPageZipCode").val()+" PH#:"+$("#addressPagePhoneNumber").val() +" Email:"+$("#addressPageEMail").val() +" Web:"+$("#addressPageWebsite").val() +"</span></div>");
          oThis.populateOverlayItem()
          }
        }); 
    },
    
    initializeAndSetActiveButtons:function(){
       
        CH.VC2.init();
        $(".nav ul #first").prop("class","first");
        $(".nav ul #middle").prop("class","middle");
        $(".nav ul #last").prop("class","last active");
        $( ".tools button" ).prop("disabled","disabled");
        $( ".tools button" ).css("opacity","0.5");
        $( ".tools select" ).prop("disabled","disabled");
        $( ".tools #addButton" ).prop("disabled","");
        $( ".tools #addButton" ).css("opacity","1");
        $( ".tools #upphot" ).prop("disabled","");
        $( ".tools #upphot" ).css("opacity","1");
        $( ".tools #Save" ).prop("disabled","");
        $( ".tools #Save" ).css("opacity","1");
        //$("#sidebuttons").append("<button name='addtext' class='toolbarViewBtn'  id='frontdivimg'><img src='img/imagesapp/front_view.png' width='18' alt='Front View' /></button><button name='addtext' class='toolbarViewBtn'  id='backdivimg'><img src='img/imagesapp/back_view.png' width='18' alt='Back View' /></button>");
        CH.VC2.toBack();
        CH.VC2.toFront();
        $( "#epsbutton" ).prop("disabled",""); 
        $( "#epsbutton" ).css("opacity","1");
        $( "#toolbarFontAction button" ).prop("disabled","");
        $( "#toolbarFontAction button" ).css("opacity","1");
        $( "#font1" ).prop("disabled","");
        $( "#font1" ).css("opacity","1");
        $( "#fontsize" ).prop("disabled","");
        $( "#fontsize" ).css("opacity","1");
        $( ".tools #ZoomOut" ).prop("disabled","");
        $( ".tools #ZoomOut" ).css("opacity","1");
        $( ".tools #ZoomIn" ).prop("disabled","");
        $( ".tools #ZoomIn" ).css("opacity","1");
                            
                            
                            
                            
       
    },
 
 
    deinitialize:function(){
        $(".back").remove();
        $(".probtn").unbind("click");
        $(".txtbtn").unbind("click");
        $(".uplodtbtn").unbind("click");
        $('#fontList li').unbind("click");
        $("#predefinebg").unbind("click")
        $('span').unbind("dblclick");
        $(".drop div div").unbind("mousedown");
        $(".drop").unbind("click");
        $(".drop div").unbind("mouseup");
        $("#photoimg").unbind("change");
        $("#addButton").unbind("click");
        $('#backdivimg').unbind("click");
        $('#frontdivimg').unbind("click");
        $("#removeButton").unbind("click");
        $(".drop div div .delete-image").unbind("click");
        $(".drop div div").unbind("dblclick");
        $(".drop div div span .preview").unbind("dblclick");
        $(this.sDiv+" .drag-image").unbind("mousedown");
        this.destroyDragResize();
        $("#epsbutton").unbind("click");
        $("#Save").unbind("click");
        $("#saveAndSend").unbind("click");
        CH.VC2.count=0;
    },
    
    
    initRelBtRotate:function(){    //display corner buttons
        
        $(".drop").unbind("mouseup");
        $(".drop").mouseup(function (e){
            $("#demobs".sDiv+" .drag-image").show();
            $("#demobs".sDiv+" .delete-image").show();
        //$("#demobs".sDiv+" .rotate-image").show();
        });
    },

    
    initPreviewEps:function(){
        $("#epsbutton").click(function(){
            buttonToUnactivestate();
            //$(".nav6bar ul #sixth").prop("class","sixth active");
            for(var i=1;i<=CH.VC2.totalcount;i++)
            {
                CH.VC2.getXAndYPosition("#demobs"+i+"");
            }
            $("#previeweps").dialog("destroy");
            CH.VC2.beforeSaveState();
            CH.VC2.saveState("prev");
            
        });
        $("#backepsbutton").click(function(){
            
            for(var i=1;i<=CH.VC2.totalcount;i++)
            {
                CH.VC2.getXAndYPosition("#demobs"+i+"");
            }
            $("#previeweps").dialog("destroy");
            CH.VC2.saveState("prev");
        });
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
        var index=CH.VC2.findItem(temp);
        if(index==-1){
            window.console.log("kharab id="+temp);
        }
        else{
            
            var angleOfdiv = (CH.VC2.items[index].angle);
            
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
            CH.VC2.items[CH.VC2.findItem(temp)].xposition=$.trim(" "+roundx);
            CH.VC2.items[CH.VC2.findItem(temp)].yposition=$.trim(" "+roundy);
        }
        if(CH.VC2.items[CH.VC2.findItem(temp)] != undefined)
        {
            CH.VC2.items[CH.VC2.findItem(temp)].width=$(proDivId+" span").width()+"";
        }
    },
    
    initDestroyDrop:function(){
        $('.drop').empty();
        this.counter=0;
        this.totalcount=0;
        this.count=0;
    },
    
    toBack:function() {
        var oThis=this;
        $("#backdivimg").click(function(){
            $('#backdivimg').hide();
            $('#frontdivimg').show();
            comingToBack(CH.VC2.packagename);
    
        });
    },
    
    toFront:function(){
        var oThis=this;
        $("#frontdivimg").click(function(){
            comingToFront(CH.VC2.packagename);
        });
    },
    
    initFontFam:function() {  
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
    
    initEditInPlace:function() {
        $('span').live('dblclick', function() {
            $(this).find('.ok').remove();
            if ($(this).hasClass('inputMode')) {
                return true;
            }
            var tartalom = $(this).html();
            var divwid=$(this).css("width");
            $(this)
            .empty()
            .append("<input type='text' id='input2' style='background-color:transparent; width:"+divwid+";' value='" + tartalom + "'>")
            .addClass('inputMode');
            
            $("#input2").unbind("focusout");
            $("#input2").focusout(function() {
                $(this).parent().html($(this).val())
                .removeClass('inputMode');
                return false;
            });
        });
    },
    
    destroyDragResize:function(){
        $(".drop div div").draggable( "destroy" );
        $(".drop div div").resizable( "destroy" );
    },

    initHideCornerButtons:function(){
        //$(".drop div div .rotate-image").hide();
        $(".drop div div .delete-image").hide();
        $(".drop div div .drag-image").hide();
    },
    
    initSelection:function(){
        var oThis=this;
        $(".drop div div").mousedown(function(e){
            var seldiv="#"+$(e.currentTarget).prop("id");
            oThis.selectElement(seldiv);
        });
    },
    
    selectElement:function(proDivId){
        var flag=false;
        $(".drop div div").removeClass("highlight");
        //$(".drop div div .rotate-image").hide();
        $(".drop div div .delete-image").hide();
        $(".drop div div .drag-image").hide();
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
    

            
        //CH.VC3.initResizeForText();
        }
        else
        {
        //CH.VC3.initResizeForImage();
        }
        $(this.sDiv).addClass("highlight");
        //$(this.sDiv+" .rotate-image").show();
        $(this.sDiv+" .drag-image").show();
        $(this.sDiv+" .delete-image").show();
        this.selecteditem =CH.VC2.findItem( (this.sDiv).substring(1) );
        CH.VC2.dragTheDiv();
        
        
    },
    
    
    initUnselect:function(){
        var oThis=this;
        $(".drop").unbind("click");
        $(".drop").click(function(e) {
            oThis.unselectElement(e);       
        });
    },
    
    unselectElement:function(e){
        if($(e.target).prop("id")=="drop")
        {
            $(".drop div div").removeClass("highlight");
            //$(".drop div div .rotate-image").hide();
            $(".drop div div .delete-image").hide();
            $(".drop div div .drag-image").hide();
            this.sDiv="";
            return true;
        }
        return false;
    },
    findItem:function(itemId){
        for(var i=0;i<CH.VC2.items.length;i++){
            if(CH.VC2.items[i].id==itemId){
                return i;
            }
        }
        return -1;  
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
        var itemsLength=$(".demobs").length;
        if(itemsLength>2){
            alert("Only 3 new Fields");
            return false;
        }
        //$("#outer").html(" <form id='imageform' method='post' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadPicture'><input type='file' name='photoimg' id='photoimg' /></form>");
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
                    if(result.toLowerCase()==".jpg"||result.toLowerCase()==".png")
                    {
                        oThis.addField(0,"");
                        $(".drop #demobs"+CH.VC2.idCounter+" span").html('');
                        $(".drop #demobs"+CH.VC2.idCounter+" .delete-image").hide();
                        $(".drop #demobs"+CH.VC2.idCounter+" .drag-image").hide();
                        //$(".drop #demobs"+CH.VC2.idCounter+" .rotate-image").hide();
                        
                        
                        //$(".drop #demo"+CH.VC3.idCounter+" span").css("display","inline-block");
                        $(".drop #demobs"+CH.VC2.idCounter+" span").html('<img src="img/imagesapp/loading.gif" alt="Uploading...."/>');
                        $(".drop #demobs"+CH.VC2.idCounter+" span img").attr("style", "max-width: 100%");
                        $("#imageform").ajaxForm({
                            success:       oThis.showResponse
                        //target: $(".drop #demo"+CH.VC3.idCounter+" span")
                        }).submit();
                        
                        $( this ).dialog( "close" );
                    
                    }
                    else{
                        $( this ).dialog( "close" );
                        alert("Please Select jpg or png image to upload");
                        CH.VC2.addImage();
                    }
                }    
            }
        });
    },
    showResponse:function (responseText, statusText, xhr, $form)  { 
        var data=responseText.split(",");
        
        if(data[0]=="1"){
            $(".drop #demobs"+CH.VC2.idCounter+" span").html(data[3]);
            
            var width = data[1];
            var height = data[2];
            var asp=width/height;
            //var newheight=150/asp;
            $("#outer").html("");
            var temp="#demobs"+CH.VC2.idCounter;
            var temp2=$(".overlaydb").css("height");
            $(temp+" span img").css("height",temp2);
            var newwidth=asp*$(temp+" span img").height();
            var ind= CH.VC2.findItem(temp.substring(1));
            CH.VC2.items[ind].fontSize= "0";
            CH.VC2.items[ind].height= $(temp+" span img").height()+"";
            CH.VC2.items[ind].width= newwidth+"";
            $(temp).resizable( "destroy" );
            var url=$(temp+" span img").prop("src");
            var filename = url.substring(url.lastIndexOf('/'));
            ind=CH.VC2.findItem("demobs"+CH.VC2.idCounter);
            if(ind!=-1){
                var databaseIdOfTheImage= data[4];
                CH.VC2.initImageEdit();
                CH.VC2.items[ind].innertxt=$.trim(databaseIdOfTheImage)+","+filename;
                CH.VC2.items[ind].istxt=0;
                //populateLeftBarOnFront();
                CH.VC2.selectElement("#"+CH.VC2.items[ind].id);
                CH.VC2.getXAndYPosition("#"+CH.VC2.items[ind].id);
            }else{
                alert("udefine index");
            }
        }else{
            alert("unable to load image: "+data[1]);
            $("#demo"+CH.VC2.idCounter).remove();
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
        var itemsLength=$(".demobs").length;
        if(itemsLength>2){
            alert("Only 3 new Fields");
            return false;
        }
        else{
            if(flag==0){
                var it= new CH.item();
                CH.VC2.idCounter++;
                it.id="demobs"+CH.VC2.idCounter;
                var temp_html="<div id='demobs"+ CH.VC2.idCounter +"' class='demobs' align='right'><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+CH.VC2.idCounter +"'>Enter Text Here</span></div>";
                $(".drop .overlaydb").append(temp_html);
                var temp=$("#demobs"+CH.VC2.idCounter).css("font-size");
                temp=temp.substring(0, temp.length-2);
                temp=parseInt(temp);
                temp=$(temp).toUnit("pt");
                temp=Math.ceil(temp);
                it.fontSize=""+temp;
                it.innertxt=$("#demobs"+CH.VC2.idCounter+" span").html();
                this.items.push(it);
                CH.VC2.getXAndYPosition("#demobs"+CH.VC2.idCounter);
                CH.VC2.selectElement("#demobs"+CH.VC2.idCounter);        
    
            }
            oThis.initSelection();
            oThis.initDrag();
            oThis.initBtEditField();
            oThis.initBtRemField();
            oThis.totalcount=this.totalcount+1;
        // CH.VC2.initTextOfLeftOfFrontSideChange();
        }
    },
    
    
    
    initBtRemField:function(){
        var oThis=this;
        $("#removeButton").unbind("click");
        $("#removeButton").click(function () {
            oThis.undoflag=0
            oThis.removeField(CH.VC2.items[CH.VC2.findItem(oThis.sDiv.substring(1))],oThis.undoflag);
        });
        $(".drop div .delete-image").unbind("click");
        $(".drop div .delete-image").click(function () {
            oThis.removeField(CH.VC2.items[CH.VC2.findItem(oThis.sDiv.substring(1))],oThis.undoflag);
        });
   
    },

    removeField:function(item,flag){   
        if($(".demobs").length==0){
            alert("No more textbox to remove");
            return false;
        }   
        else{
            var it={};
            $.extend(it,item);
            if(flag==0){
            }
            $("#"+it.id).remove();
            CH.VC2.items.splice(CH.VC2.findItem(it.id),1);
            CH.VC2.sDiv="";
        //populateLeftBarOnFront();
        //CH.VC2.initTextOfLeftOfFrontSideChange();
        }
    },
    
    initBtEditField:function(){
        var oThis=this;
        $(".drop div div").unbind("dblclick");
        $(".drop div div").dblclick(function(e) {
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
        var ind=CH.VC2.findItem(divid);
        var it = {};
        $.extend(it,CH.VC2.items[ind]);
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
            CH.VC2.items[CH.VC2.findItem(oThis.sDiv.substring(1))].innertxt=$(this).val();
            //populateLeftBarOnFront();
            //CH.VC2.initTextOfLeftOfFrontSideChange();
            
            return false;                    
        });
        }
        
        /*var oThis=this.sDiv+" span";
        if ($(this.sDiv).children(" span").hasClass('inputMode')) {
            window.console.log($(this.sDiv).children(" span").prop("id"));
            return true;
        }
        var tartalom = $(this.sDiv).children(" span").html();
        var undo=new CH.undoredo;//
        this.undos.push(undo);//
        this.undos[this.undos.length-1].lastvalue=tartalom;//        
        this.undos[this.undos.length-1].id=("#"+$(this.sDiv).prop("id"))//
        var divwid=$(this.sDiv).children(" span").width()+20;
        $(this.sDiv).children(" span")
        .empty()
        .append("<input type='text' id='input2' style='background-color:transparent;width:"+divwid+"px;' value='" + tartalom + "'>")
        .addClass('inputMode');
        $("#input2").mouseout(function() {
            $(this).parent().html($(this).val())
            .removeClass('inputMode');
            var index=($(oThis).prop("id")).substr($(oThis).prop("id").length-1);//
            CH.VC2.items[index-1].innertxt=$(this).val();//
            CH.VC2.undos[CH.VC2.undos.length-1].nextvalue=$(this).val();//
            CH.VC2.undos[CH.VC2.undos.length-1].lastaction="Edit";//
            return false;                    
        });*/
    },
	
    initImageEdit:function(){
        var oThis=this;
        $(".drop div div span .preview").unbind("dblclick");
        $(".drop div div span .preview").dblclick(function() {
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
                                x:CH.VC2.imgparam.x,
                                y:CH.VC2.imgparam.y,
                                w:CH.VC2.imgparam.w,
                                h:CH.VC2.imgparam.h
                            } ,
                            success:function(){
                                $(img).prop('id',"upimg_crop");
                                $(img).prop('src',updatedfilename);
                                $(img).load(function(){
                                    var index=CH.VC2.findItem(oThis.sDiv.substr(1));
                                    CH.VC2.items[index].width=$(oThis.sDiv).width();
                                    CH.VC2.items[index].height=$(oThis.sDiv).height();   
                                    //window.console.log(CH.VC3.items[index].width+"*"+CH.VC3.items[index].height);
                                    
                                });
                                //alert(oThis.sDiv);
                                
                                //var index=($(oThis.sDiv).prop("id")).substr($(oThis.sDiv).prop("id").length-1);//
                                
                                //alert(findItem("demobs1"));
                                var index=CH.VC2.findItem(oThis.sDiv.substr(1));
                                var tempPreviousPath=(CH.VC2.items[index].innertxt);
                                var start_pos = tempPreviousPath.indexOf(',/') + 2;
                                tempPreviousPath=tempPreviousPath.substring(0,start_pos);
                                start_pos = updatedfilename.indexOf('./uploads/')+10;
                                var tempNewPath;
                                tempNewPath = updatedfilename.substring(start_pos,updatedfilename.length);
                                updatedfilename=tempPreviousPath+tempNewPath;
                                CH.VC2.items[index].innertxt=(updatedfilename);
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
                            }
                        });
                        oThis.jcrop_api.destroy();    
                        $( this ).dialog( "close" );
                        
                        
                    }
                }
            });
        }
    },
  
    updateCoords:function(c)
    {
        var oThis=this;
        CH.VC2.imgparam=c;
    },

    checkCoords:function()
    {
        if (parseInt($('#w').val())) return true;
        alert('Please select a crop region then press submit.');
        return false;
    },
  
    initDrag:function(){
        var oThis=this;
        $(".drag-image").unbind("mousedown");
        $(".drag-image").mousedown(function(){
            oThis.dragTheDiv();    
        });
    },
    
    dragTheDiv:function(){
        var oThis=this;
        //this.destroyDragResize();
        $(oThis.sDiv).draggable({
            containment: "parent",
            drag: function(){
                //$(".delete-image").hide();
                // $(".rotate-image").hide();
                var offset = $(this).offset();
                var xPos = offset.left;
                var yPos = offset.top;
                CH.VC2.items[oThis.selecteditem].xposition=xPos;
                CH.VC2.items[oThis.selecteditem].yposition=yPos;
            }        
        }) ;
    },
    
    putBackGroundInInitialscreen:function(bannertemphtml) //initial wallpaper selection
    {
        var oThis=this;
        loadDesigns(oThis,oThis.packageId,oThis.fillingId);
    //makeCanvas();
    			
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
    populateOverlayItem:function(){
        var oThis=this;
        var ovItem= new CH.overlayItem();
        CH.currentPackage.overlayItem.push(ovItem);
        
        oThis.overlayItem[0].isOverlay=1;
        oThis.overlayItem[0].height=$(".overlaydb").height();
        oThis.overlayItem[0].width=$(".overlaydb").width();
        oThis.overlayItem[0].xposition=$(".overlaydb").offset().left-$(".drop").offset().left;
        oThis.overlayItem[0].yposition=$(".overlaydb").offset().top-$(".drop").offset().top;
        
        
        
        
        
        
        
            var angleOfdiv=CH.VC2.angleOfAddressDiv;
            $("#addressOverlay").css('-moz-transform', 'rotate(0deg)');
            $("#addressOverlay").css('-webkit-transform', 'rotate(0deg)');
            $("#addressOverlay").css('-o-transform', 'rotate(0deg)');
            $("#addressOverlay").css('-ms-transform', 'rotate(0deg)');
            var offset = $("#addressOverlay").offset();
            var xPos = offset.left;
            var yPos = offset.top;
            
var dropOffset = $(".drop").offset();
            var DropXPos = dropOffset.left;
            var DropYPos = dropOffset.top;
            
            
            $("#addressOverlay").css('-moz-transform', 'rotate('+angleOfdiv+'deg)');
            $("#addressOverlay").css('-webkit-transform', 'rotate('+angleOfdiv+'deg)');
            $("#addressOverlay").css('-o-transform', 'rotate('+angleOfdiv+'deg)');
            $("#addressOverlay").css('-ms-transform', 'rotate('+angleOfdiv+'deg)');
            var roundx=$.trim(" "+(xPos-DropXPos));
            roundx=roundx-CH.textConstantToAddForVerticalImages;
            roundx=Math.floor(roundx);
            var roundy=$.trim(" "+(yPos-DropYPos));
            oThis.overlayItem[0].addressHeight=$("#addressOverlay").height();
            oThis.overlayItem[0].addressWidth=$("#addressOverlay").width();
            oThis.overlayItem[0].addressXposition=$.trim(" "+roundx);
            oThis.overlayItem[0].addressYposition=$.trim(" "+roundy);
            oThis.overlayItem[0].addressText=$("#addressOverlay span").text();
            oThis.overlayItem[0].addressRotation=angleOfdiv;
        
    },
    
    beforeSaveState:function(){
        var empty;
        traverseBack();
        CH.VC2.obj={
            "triangle":empty,
            "backSide":this.back,
            "overlayItem":this.overlayItem,
            "frontSide":this.items,
            "frontBackground":this.dropbackground,
            "backBackground":this.dropbackground,
            "format":this.formatName,
            "filling":this.fillingName,
            "sideColor":this.sideColor
        };
    },
    saveState:function(state){
        //this.populateOverlayItem();
        //this.sideColor=$("#clrpikr input").val();
        //alert("side color: "+this.sideColor+"and format is: "+this.formatName+"and the filling is"+this.fillingName);
        
        
        window.console.log("a="+JSON.stringify(CH.VC2.obj));
        this.tosave=JSON.stringify(CH.VC2.obj);
        //alert(this.tosave);
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
                            if(CH.VC2.currentSide=="Front")
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
                        }
                    }
                });
            }
        });  
    },
    
    initBtBold:function(){   
        var oThis=this;
        $("#boldbutton").unbind("click");
        $("#boldbutton").click(function(){
            oThis.bold(oThis.sDiv);
        });
    },
    
    bold:function(proDivId){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("bold")){
                $(proDivId+" span").removeClass("bold");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isBold=0;       
            }else{
                $(proDivId+"  span").addClass("bold");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isBold=1;    
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
            oThis.italic(oThis.sDiv);
        });
    
    
    },
    italic:function(proDivId){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("italic")){
                $(proDivId+" span").removeClass("italic");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isItalic=0;     
            }else{
                $(proDivId+"  span").addClass("italic");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isItalic=1;  
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
            oThis.underline(oThis.sDiv);
        });
    },
    underline:function(proDivId){
        if(proDivId.length>0){
            if($(proDivId+" span").hasClass("underline")){
                $(proDivId+" span").removeClass("underline");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isUnderlined=0;//
                
            }else{
                $(proDivId+"  span").addClass("underline");
                var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                CH.VC2.items[index-1].isUnderlined=1;//
                
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
            
            oThis.Lalign(oThis.sDiv);
            
        });
    
    },
   
    
    Lalign:function(proDivId){
        if(proDivId.length>0){
            
            if($(proDivId).hasClass("centeralign")){
                
                $(proDivId).removeClass("centeralign");
            }
            if($(proDivId).hasClass("rightalign")){
                
                $(proDivId).removeClass("rightalign");
            }
            $(proDivId).addClass("leftalign");
            
            var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                
            CH.VC2.items[index-1].isRightAligned=0;
            CH.VC2.items[index-1].isCenterAligned=0;
            CH.VC2.items[index-1].isLeftAligned=1;
            
            
        }
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
    
    
    
    
    
    initBtRalign:function(){    
        var oThis=this;
        
        $("#Ralignbutton").unbind("click");
        $("#Ralignbutton").click(function(){
            oThis.Ralign(oThis.sDiv);
        });
    },
    
    Ralign:function(proDivId){
        if(proDivId.length>0){
            
            if($(proDivId).hasClass("centeralign")){
                
                $(proDivId).removeClass("centeralign");
            }
            if($(proDivId).hasClass("leftalign")){
                
                $(proDivId).removeClass("leftalign");
            }
            $(proDivId).addClass("rightalign");
            
            var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                
            CH.VC2.items[index-1].isRightAligned=1;
            CH.VC2.items[index-1].isCenterAligned=0;
            CH.VC2.items[index-1].isLeftAligned=0;
            
            
        }
            
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
    initBtCalign:function(){    
        var oThis=this;
        $("#Calignbutton").unbind("click");
        $("#Calignbutton").click(function(){
            oThis.Calign(oThis.sDiv);
        });
    },
    Calign:function(proDivId){
        if(proDivId.length>0){
            
            if($(proDivId).hasClass("rightalign")){
                
                $(proDivId).removeClass("rightalign");
            }
            if($(proDivId).hasClass("leftalign")){
                
                $(proDivId).removeClass("leftalign");
            }
            $(proDivId).addClass("centeralign");
            
            var index=($(proDivId).prop("id")).substr($(proDivId).prop("id").length-1);//
                
            CH.VC2.items[index-1].isRightAligned=0;
            CH.VC2.items[index-1].isCenterAligned=1;
            CH.VC2.items[index-1].isLeftAligned=0;
            
            
        }
            
        else
        {
            alert("Please select any text field before applying effects");
        }
    },
     
    initChangeTheFont:function(){
        var oThis=this;
        $("#font1").change(function(){
            CH.VC2.xainFunc();
        });
    },
    xainFunc:function(){
        var oThis=this;
        
        CH.VC2.fontFamilyOfText(oThis.sDiv);
        
    },
    
    fontFamilyOfText:function(item){
        
        
        $(""+item+" span").css("font-family",$("#font1").val());
        var index=($(item).prop("id")).substr($(item).prop("id").length-1);//
        CH.VC2.items[index-1].fontStyle= $(""+item+" span").css("font-family");
            
        
    },
    
    initBtFontsize:function(){
        var oThis=this;
        $("#fontsize").unbind("change");
        $("#fontsize").change(function () {
            if (oThis.sDiv){
                oThis.fontsizeOfText(oThis.sDiv);           
            }
            else{
                alert("select an element");
            }
        });
    },
    
    fontsizeOfText:function(item){
        var oThis=this;
        var oldFontValue=$(item+" span").css("font-size");
        $(item+" span").css("font-size",$("#fontsize").val()+"pt");
        //CH.VC3.items[CH.VC3.findItem(item.id)].fontSize=item.fontSize;
        var index=($(item).prop("id")).substr($(item).prop("id").length-1);//
        
        var heightOfParent=$(oThis.sDiv).parent().height();
        var differenceInTop=$(oThis.sDiv).offset().top-$(oThis.sDiv).parent().offset().top;
        var heightOfDiv=$(oThis.sDiv).height();
        if(heightOfParent >= (differenceInTop+heightOfDiv))
        {
        var temp2=$(item+" span").css("font-size");
        if(temp2 != undefined)
        {
            temp2=temp2.substring(0, temp2.length-2);
            temp2=parseInt(temp2);
            temp2=$(temp2).toUnit("pt");
            temp2=Math.ceil(temp2);
            window.console.log(temp2);
            CH.VC2.items[index-1].fontSize=temp2+"";//here
        }
        $(item.id).css("width","auto");
        $(item.id).css("height","auto");
        }
        else{
            alert("Unable to perform this operation. \n Reason: Text will go beyond the available area");
        $(oThis.sDiv+" span").css("font-size",oldFontValue);
    }
    },
    appendDesignBackgroundUploadBt:function(){/*dont delete*/}
}