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
    formatId:null,
    fillingId:null,
    packageId:2,
    fillingsForThisPackage:"changeFillingsBasic",
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
        
        backButtons()
        makeBack();
        matchAddressFromBack();
        $(".address-tittle-txt h1").html("Enter Text For Front Side");
        this.back=new Array();
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
        $("#backdivimg").parent().remove();
        $("#frontdivimg").parent().remove();
        $("#textForSidecolor").remove();
        $("#toolbarViewAction").append("<div id='textForSidecolor'>Choose color for back, left & right side</div>")
     
    },
    showLeftAndRightSide:function()
    {
        
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
 
    /*
    initFormatChange:function(){
        var oThis=this;
        $("#changeFillingsBasic").change(function(){
            //CH.VC1.getPageContent("",1);
            oThis.formatChanged($("#changeFillingsBasic").val());
        });
        $("#changeFillingsBasic").change();
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
    },
    */
    
    
    initialScreenTwo:function(){
               
        $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();
        $("#changeFillingsBasic").show();
        $(".filling-content-lower").css("margin-left","5px");
        $(".nav").hide();
        $(".nav6bar").show();
        buttonToUnactivestate();
        $(".nav6bar ul #second").prop("class","second active");
        CH.com.VC=this;
        CH.com.getFormats();
        //CH.VC2.getFormats();
        CH.selected=1;       
            
    }, 
    /*  
    initPagination:function(selector,totalItems){
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 6,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                CH.VC2.getPageContent("",pageNum);
            },
            callback:function(){
            //CH.VC2.getPageContent("","1");
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
                packageType:2
            },
            success:function(data){
            $('#changeFillingsBasic').html(data);
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
                fillingId:oThis.fillingId,
                packageId:oThis.packageId,
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
                //window.console.log(width);
                //window.console.log(" ");
                //window.console.log(height);
                $(".drop").append("<div class='overlaydb' style='bottom:"+bottom2+"; left:"+left+"; width:"+width+"; height:"+height+";'></div>");                
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
      
        var oThis=this;
        $("#epsbutton").click(function(){
            buttonToUnactivestate();
            $(".nav6bar ul #sixth").prop("class","sixth active");
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
        var temp=("#"+($(proDivId).prop("id")));
        temp =temp.substr(temp.length - 1);
        if(temp=="0")
        {
            temp=10;
        }
        var divid =(temp);
        var angleOfdiv = (CH.VC2.items[temp-1].angle);
        window.console.log("div:"+temp+"has an angle"+ angleOfdiv);
        $("#demobs"+divid).css('-moz-transform', 'rotate(0deg)');
        $("#demobs"+divid).css('-webkit-transform', 'rotate(0deg)');
        $("#demobs"+divid).css('-o-transform', 'rotate(0deg)');
        $("#demobs"+divid).css('-ms-transform', 'rotate(0deg)');
        var offset = $(proDivId).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        $("#demobs"+divid).css('-moz-transform', 'rotate('+angleOfdiv+'deg)');
        $("#demobs"+divid).css('-webkit-transform', 'rotate('+angleOfdiv+'deg)');
        $("#demobs"+divid).css('-o-transform', 'rotate('+angleOfdiv+'deg)');
        $("#demobs"+divid).css('-ms-transform', 'rotate('+angleOfdiv+'deg)');
        var roundx=$.trim(" "+(xPos-curleft));
        roundx=roundx-CH.textConstantToAddForVerticalImages;
        roundx=Math.floor(roundx);
        var roundy=$.trim(" "+(yPos-curtop));
        CH.VC2.items[temp-1].xposition=$.trim(" "+roundx);
        CH.VC2.items[temp-1].yposition=$.trim(" "+roundy);
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
        $(".drop div div .rotate-image").hide();
        //$(".drop div div .delete-image").hide();
        $(".drop div div.drag-image").hide();
    },
    
    initSelection:function(){
        var oThis=this;
        $(".drop div div").mousedown(function(){
            var seldiv="#"+$(this).prop("id")
            oThis.selectElement(seldiv);
        });
    },
    
    selectElement:function(proDivId){
        $(".drop div div").removeClass("highlight");
        $(".drop div div .rotate-image").hide();
        $(".drop div div .delete-image").hide();
        $(".drop div div .drag-image").hide();
        this.sDiv=("#"+($(proDivId).prop("id")));
        $(this.sDiv).addClass("highlight");
        $(this.sDiv+" .drag-image").show();
        $(this.sDiv+" .delete-image").show();
        this.selecteditem =this.sDiv.substr(this.sDiv.length - 1);
        this.selecteditem--;
        this.initDrag();
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
            $(".drop div div .rotate-image").hide();
            $(".drop div div .delete-image").hide();
            $(".drop div div .drag-image").hide();
            this.sDiv="";
            return true;
        }
        return false;
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
        if(this.counter>2){
            alert("Only 3 new Fields");
            return false;
        }
        else{
            $("#outer").html(" <form id='imageform' method='post' enctype='multipart/form-data' action='./basicFunctions.php?type=uploadPicture'><input type='file' name='photoimg' id='photoimg' /></form>");
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
                            $(".drop #demobs"+oThis.totalcount+" span").html('');
                            $(".drop #demobs"+oThis.totalcount+" .delete-image").hide();
                            $(".drop #demobs"+oThis.totalcount+" .drag-image").hide();
                            $(".drop #demobs"+oThis.totalcount+" .rotate-image").hide();
                            $(".drop #demobs"+oThis.totalcount+" span").html('<img src="img/imagesapp/loading.gif" alt="Uploading...."/>');
                            $(".drop #demobs"+oThis.totalcount+" span img").attr("style", "width: auto");
                            //$(".drop #demobs"+oThis.totalcount+" span img").width("auto");
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
        }
    },
    showResponse:function (responseText, statusText, xhr, $form)  { 
        
        //alert(CH.VC2.totalcount);
        $(".drop #demobs"+CH.VC2.totalcount+" span").html(responseText.split('@@@')[2]);
        window.console.log(responseText);
        
        var width = responseText.split('@@@')[0];
        var height = responseText.split('@@@')[1];
        var asp=width/height;
        //var newheight=50/asp;
        $("#outer").html("");
        var temp="#demobs"+CH.VC2.totalcount;
        var temp2=$(".overlaydb").css("height");
        $(temp+" span img").css("height",temp2);
        
        
        var newwidth=asp*$(temp+" span img").height();
        
        var ind= CH.VC2.totalcount-1;
        CH.VC2.items[ind].fontSize= "0";
        CH.VC2.items[ind].height= $(temp+" span img").height()+"";
        CH.VC2.items[ind].width= newwidth+"";
        $(temp).resizable( "destroy" );
        var url=$(temp+" span img").prop("src");
        var filename = url.substring(url.lastIndexOf('/'));
        
        var databaseIdOfTheImage= responseText.split('@@@')[3];
        CH.VC2.initImageEdit();
        CH.VC2.items[ind].innertxt=$.trim(databaseIdOfTheImage)+","+filename;
        CH.VC2.items[ind].istxt=0;

    //CH.VC3.getXAndYPosition("#"+CH.VC2.items[ind].id);
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
        if(this.counter>2){
            alert("Only 3 new Fields");
            return false;
        }   
        else{
            var it= new CH.item();
            this.items.push(it);
            CH.VC2.count=this.totalcount+1;
            
            if(html==0)
            {
                //var temp_html="<div id='demobs"+ count +"' class='demobs' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+ count +"'>Enter Text Here</span></div>";
                var temp_html="<div id='demobs"+ CH.VC2.count +"' class='demobs' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+ CH.VC2.count +"'>Enter Text Here</span></div>";    
            }
            else
            {
                var temp_html="<div id='demobs"+ CH.VC2.count +"' class='demobs' align='right'><img class='rotate-image' src='img/imagesapp/rotateimg.png' width='20' height='20' /><img class='drag-image' src='img/imagesapp/move.png' width='20' height='20' /><img class='delete-image' src='img/imagesapp/del.png' width='20' height='20' /><span id='span"+ CH.VC2.count +"'>"+html+"</span></div>";
            }
            $(".drop .overlaydb").append(temp_html);
            var temp=$("#demobs"+CH.VC2.count).css("font-size");//muneeb
            temp=temp.substring(0, temp.length-2);
            temp=parseInt(temp);
            temp=$(temp).toUnit("pt");
            temp=Math.ceil(temp);
            CH.VC2.items[CH.VC2.count-1].id="demobs"+CH.VC2.count;
            CH.VC2.items[CH.VC2.count-1].fontSize=""+temp;
            CH.VC2.items[CH.VC2.count-1].innertxt=($("#demobs"+CH.VC2.count+" span").html());
            oThis.initSelection();
            oThis.selectElement("#demobs"+CH.VC2.count);//here
            oThis.initBtEditField();
            oThis.initImageEdit();
            oThis.initHideCornerButtons();
            oThis.initBtRemField();
            oThis.initDrag();
            oThis.totalcount=this.totalcount+1;
            oThis.counter++;
            return true;
        }
    },
    
    initBtRemField:function(){
        var oThis=this;
        $("#removeButton").unbind("click");
        $("#removeButton").click(function () {
            oThis.undoflag=0
            oThis.removeField(oThis.sDiv,oThis.undoflag);
        });
        $(".drop div div .delete-image").unbind("click");
        $(".drop div div .delete-image").click(function () {
            oThis.removeField(oThis.sDiv,oThis.undoflag);
        });
    },
      
    removeField:function(proDivId,flag){
        if(this.counter==0){
            alert("No more textbox to remove");
            return false;
        }   
        else
        {
            if (proDivId!="")
            {
                if(flag==0){
                    var undo=new CH.undoredo;
                    this.undos.push(undo);
                }
                this.tempdivid=$(proDivId).attr('id');
                this.tempspanid=$(proDivId+" span").attr('id');
                if(flag==0){
                    this.undos[this.undos.length-1].lastvalue=$(proDivId+" span").html();
                }
                $(proDivId).remove();
                $(".drop div #demobs"+this.totalcount).prop('id',this.tempdivid);
                $(".drop div #span"+this.totalcount).prop('id',this.tempspanid);
                this.totalcount--;
                this.counter--;
                this.sDiv="";
                if(flag==0){
                    this.undos[this.undos.length-1].id=proDivId;
                    this.undos[this.undos.length-1].lastaction="Remfield";
                }
            }  
            else{
            {
                alert("please select any element to delete");
            }
            }
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
        var oThis=this.sDiv+" span";
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
        });
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
                                $(img).prop('src',updatedfilename);    //here                    
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
                $(".rotate-image").hide();
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
    saveState:function(state){
        var empty;
        traverseBack();
        var obj={
            "triangle":empty,
            "backSide":this.back,
            "frontSide":this.items,
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
        
        $(item+" span").css("font-size",$("#fontsize").val()+"pt");
        //CH.VC3.items[CH.VC3.findItem(item.id)].fontSize=item.fontSize;
        var index=($(item).prop("id")).substr($(item).prop("id").length-1);//
            
        var temp2=$(item+" span").css("font-size");
        temp2=temp2.substring(0, temp2.length-2);
        temp2=parseInt(temp2);
        temp2=$(temp2).toUnit("pt");
        temp2=Math.ceil(temp2);
        window.console.log(temp2);
            
            
        CH.VC2.items[index-1].fontSize=temp2+"";
        $(item.id).css("width","auto");
        $(item.id).css("height","auto");
        
    },
    appendDesignBackgroundUploadBt:function(){/*dont delete*/}
    
    
 
    


}