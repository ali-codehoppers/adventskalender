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
CH.addressSelected=false;
CH.designLoad=false;
CH.isFillingAndFormatSelected;
CH.isCompanyAddress=true;
CH.textConstantToAddForVerticalImages=0;
CH.FIXED_DPI=0;
CH.selectedBar;
CH.ACTUALWIDTH;
CH.ACTUALHEIGHT;

CH.com={
    VC:null,//current vc
    getFormats:function(){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFormatsFromDb",
                packageType:oThis.VC.packageId
            },
            success:function(data){

                $("#dd_format").html(data);
                oThis.initFormatChange();

            }
        });
    },
    initFormatChange:function(){
        var oThis=this;
        $("#dd_format").unbind("change");
        $("#dd_format").change(function(){
            oThis.displayFormatImage($(this).prop('selectedIndex'));
            oThis.formatChanged($("#dd_format").val());
        });
        $("#dd_format").change();
    },
    formatChanged:function(formatId){
        var oThis=this;
        oThis.VC.formatName=$("#dd_format :selected").text();
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFillingsForFormat",
                formatId:formatId
            },
            success:function(data){
                data=eval("("+data+")");
                $('.choose-filling ul').html(data.data)
                $(".right-contentfilling .pagination").html("");
                if(data.pagination){
                    oThis.initPagination(".right-contentfilling .pagination",data.totalCount);
                }
                oThis.initFillingSelect();
                oThis.initFillingNextButton();
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    },
    displayFormatImage:function(selectedIndex){
        var imagePath=$("#dd_format option:nth-child("+(selectedIndex+1)+")").attr("pic");
        $(".formatImage").html("<img src='./"+imagePath+"'/>");
    },
    initFillingNextButton:function(){
        var oThis=this;
        $('#formatFillingNextButton').unbind("click");
        $('#formatFillingNextButton').click(function() {
            if($('.filling-radio').is(':checked'))// && $('.format-radio').is(':checked'))
            {
                $("#backgroundsForEachPackage ul").html("");
                oThis.VC.formatId=$("#dd_format").val();
                $(".screens").hide();
                $("#content-choosedesignhtml").show();
                oThis.loadDesigns();
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
            oThis.VC.fillingId=fillingId;
            //xain's
            oThis.VC.fillingName=$("input[name='filling']:checked").parent().parent().attr("title");
        });
        //select first by default
        if($(".choose-filling ul li").length>0){
            $(".choose-filling ul li :first").click();
        }
    },
    getPageContent:function(pageNum){
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getFillingsPage",
                formatId:$("#dd_format").val(),
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
    initPagination:function(selector,totalItems){
        var oThis=this;
        $(selector).pagination({
            items: totalItems,
            itemsOnPage: 6,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                oThis.getPageContent(pageNum);
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
            itemsOnPage: 32,
            cssStyle: 'light-theme',
            onClick:function(pageNum){
                oThis.getPageContentForDesign(pageNum);
            },
            callback:function(){
            //CH.VC1.getPageContent("","1");
            }
        });
    },
    getPageContentForDesign:function(pageNum){//here
        var oThis=this;
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"getDesignPage",
                fillingId:oThis.VC.fillingId,
                packageId:oThis.VC.packageId,
                pageNum:pageNum
            },
            success:function(data){
                oThis.afterLoadDesignData(data,oThis);
            },
            error:function(a,b,c){
                alert("error");
            }
        });
    },
    updateCallerVC:function(){
    //check later if its necessary most probably wont be needed

    /*var command="CH.VC"+this.VC.packageId+"=this.VC";
        eval(command);*/
    },
    loadDesigns:function(){
        //alert(CH.selectedBar);
        var oThis=this;
        $(".screens").hide();
        $("#content-choosedesignhtml").show();
        CH.isFillingAndFormatSelected=true;
        $(".filling-content-lower").css("margin-left","0px");
        $(".drop").html("");
        $.ajax({
            type:"POST",
            url: "basicFunctions.php",
            data: {
                "type":"getDesigns",
                packageId:oThis.VC.packageId,
                fillingId:oThis.VC.fillingId
            },
            success:function(data){
                data=eval("("+data+")");
                buttonToUnactivestate(); //checkthis1
                $(CH.selectedBar+" ul #third").prop("class","third active");
                $(CH.selectedBar+" ul #third").prop("class","third active");

                $("#content-choosedesignhtml #pagination").html("");
                oThis.afterLoadDesignData(data.data);
                if(data.pagination){
                    oThis.initPaginationForDesign("#content-choosedesignhtml #pagination",data.totalCount);
                }
            }
        });
    },
    afterLoadDesignData:function(data){

        $('.content-upper ul').html(data);
        $('.content-upper ul li a').css("border","4px solid grey");
        $('.content-upper ul li a').first().css("border","4px solid orange");

        var bgId=$('.content-upper ul li').first().attr("id");
        bgId=bgId.substr(bgId.indexOf("_")+1,bgId.length);
        this.VC.backgroundId=bgId;
        this.VC.bgOriginalWidth=$('.content-upper ul li a').first().attr("owidth");
        this.VC.bgOriginalHeight=$('.content-upper ul li a').first().attr("oheight");

        var temp=($('.content-upper ul li a').first().css("background-image"));  //src of img clicked
        temp = /^url\((['"]?)(.*)\1\)$/.exec(temp);
        temp = temp ? temp[2] : "";
        temp = temp.replace("img/bgimgs/thumbs/", "img/bgimgs/");
        var str = temp,
        delimiter = '/',
        start = 4,
        tokens = str.split(delimiter).slice(start),
        backgroundSelected = tokens.join(delimiter); //check this
        this.VC.dropbackground=backgroundSelected;

        var bg=$('.content-upper ul li a').first().css("background-image");
        bg = /^url\((['"]?)(.*)\1\)$/.exec(bg);
        bg = bg ? bg[2] : "";
        var fileNameIndex = bg.lastIndexOf("/") + 1;
        var filename = bg.substr(fileNameIndex);
        CH.currentPackage.backgroundSelected=filename;
        CH.currentPackage.result=CH.currentPackage.backgroundSelected;
        CH.backgroundSelected=backgroundSelected;

        $('#buttonDiv').html("");
        $('#uploadButton').html("");
        this.VC.appendDesignBackgroundUploadBt(); //appending upload buttons
        this.appendDesignScreenButtons();

        this.designImageClicked(".content-upper ul li a");
        $("#chooseDesignNextButton").click(function(e){
            CH.designLoad=true;
            if(CH.backgroundSelected!=null)
            {
                if(CH.currentPackage.packageId != "1")
                {
                    $("#radioCompanyAddress").attr('checked','checked');
                    putAddressIndd();
                }
                else{
                    fromAddressToDesk();
                }
            }
        });
        backButtons();
    },
    designImageClicked:function(selector){
        var oThis=this;
        $(selector).unbind("click");
        $(selector).click(function(e){
            $(selector).css("border", "4px solid grey");
            $(this).css("border", "4px solid orange");
            var temp=($(this).css("background-image"));
            temp = /^url\((['"]?)(.*)\1\)$/.exec(temp);
            temp = temp ? temp[2] : "";  //src of img clicked

            temp = temp.replace("img/bgimgs/thumbs/", "img/bgimgs/");

            var str = temp,
            delimiter = '/',
            start = 4,
            tokens = str.split(delimiter).slice(start),

            backgroundSelected = tokens.join(delimiter);
            oThis.VC.dropbackground=backgroundSelected;
            var bg=$(this).css("background-image");
            bg = /^url\((['"]?)(.*)\1\)$/.exec(bg);
            bg = bg ? bg[2] : "";
            var fileNameIndex = bg.lastIndexOf("/") + 1;
            var filename = bg.substr(fileNameIndex);
            CH.currentPackage.backgroundSelected=filename;
            CH.currentPackage.result=CH.currentPackage.backgroundSelected;
            CH.backgroundSelected=backgroundSelected;

            var bgId=$(this).parent().attr("id");
            bgId=bgId.substr(bgId.indexOf("_")+1,bgId.length);
            oThis.VC.backgroundId=bgId;
            oThis.VC.bgOriginalWidth=$(this).attr("owidth");
            oThis.VC.bgOriginalHeight=$(this).attr("oheight");

            return false;
        });
    },
    appendDesignScreenButtons:function(){
        if(CH.language=="english")
        {
            $('#buttonDiv').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='NEXT' /></div>");
            $('#buttonDiv').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='BACK' /></div>");
        }
        else if(CH.language=="dutch"){
            $('#buttonDiv').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Weiter' /></div>");
            $('#buttonDiv').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Zurück' /></div>");
        }
        $('#buttonDiv').append("<div class='clearBoth'></div>");
    },
    checkDPI:function(currentWidth,currentHeight,originalWidth,originalHeight, bgWidth, bgHeight,divWidth){

        var UIBgWidth=divWidth;
        var uiWidthFactor= currentWidth/UIBgWidth;

        var UIBgHeight=bgHeight*(divWidth/bgWidth);
        var uiHeightFactor= currentHeight/UIBgHeight;

        var cInchesWidth = uiWidthFactor*(bgWidth/CH.FIXED_DPI);
        var cInchesHeight = uiHeightFactor*(bgHeight/CH.FIXED_DPI);

        var xDPI=originalWidth/cInchesWidth;
        var yDPI=originalHeight/cInchesHeight;

        window.console.log(xDPI,yDPI+" dpi");

        if(xDPI<CH.FIXED_DPI && yDPI<CH.FIXED_DPI){
            return false;
        }else{
            return true;
        }

    }

}

/**Put these function in common class later**/

/*
function loadDesigns(currentVC,packageId,fillingId) //check package Type
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
            //"type":"getBackgroundImagesFromDbAccordingToPackage",
            "type":"getDesigns",
            packageId:packageId,
            fillingId:fillingId
        },
        success:function(data){
            data=eval("("+data+")");
            buttonToUnactivestate();
            $(".nav6bar ul #third").prop("class","third active");
            $("#content-choosedesignhtml #pagination").html("");
            afterLoadDesignData(data.data,currentVC);
            if(data.pagination){
                currentVC.initPaginationForDesign("#content-choosedesignhtml #pagination",data.totalCount);
            }
        }
    });
}

function afterLoadDesignData(data,currentVC){
    var _divId = ".content-upper";
    $('.content-upper ul').html(data);
    $('.content-upper ul li img').css("border","4px solid grey");
    $('.content-upper ul li img').first().css("border","4px solid orange");
    var temp=($('.content-upper ul li img').first().prop("src"));  //src of img clicked
    temp = temp.replace("img/bgimgs/thumbs/", "img/bgimgs/");
    var str = temp,
    delimiter = '/',
    start = 4,
    tokens = str.split(delimiter).slice(start),
    backgroundSelected = tokens.join(delimiter);
    currentVC.dropbackground=backgroundSelected;

    var bg=$('.content-upper ul li img').first().prop("src");
    var fileNameIndex = bg.lastIndexOf("/") + 1;
    var filename = bg.substr(fileNameIndex);
    CH.currentPackage.backgroundSelected=filename;
    CH.currentPackage.result=CH.currentPackage.backgroundSelected;
    CH.backgroundSelected=backgroundSelected;
    //end
    $('#buttonDiv').html("");
    //here
    if(currentVC.packagename!="basic" && currentVC.packagename!="standard"){
        if(CH.language=="english")
        {
            $('#buttonDiv').html(" <div id='uploadButton'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='UPLOAD' onclick='changeBackground();'/></div>");

        }
        else if(CH.language=="dutch")
        {
            $('#buttonDiv').html("<div id='uploadButton'><input id='changebg' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Hochladen' onclick='changeBackground();'/></div>");
        }
    }else{
        $('#uploadButton').html("");
    }

    if(CH.language=="english")
    {
        $('#buttonDiv').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='NEXT' /></div>");
        $('#buttonDiv').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='BACK' /></div>");
    }
    else if(CH.language=="dutch")
    {
        $('#buttonDiv').append("<div id='next-button-div'><input id='chooseDesignNextButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Weiter' /></div>");
        $('#buttonDiv').append("<div id='back-button-div'><input id='chooseDesignBackButton' style='margin-top: 0px;' type='button' name='submit' class='next-button' value='Zurück' /></div>");
    }
    $('#buttonDiv').append("<div class='clearBoth'></div>");

    designImageClicked(_divId +" img",currentVC);
    $("#chooseDesignNextButton").click(function(e){
        if(CH.backgroundSelected!=null)
        {
            putAddressIndd();
            $("#radioCompanyAddress").attr('checked','checked');
        }
    });
    backButtons();
};


function designImageClicked(selector,currentVC){
    $(selector).unbind("click");
    $(selector).click(function(e){
        $(selector).css("border", "4px solid grey");
        $(this).css("border", "4px solid orange");
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
        CH.currentPackage.backgroundSelected=filename;
        CH.currentPackage.result=CH.currentPackage.backgroundSelected;
        CH.backgroundSelected=backgroundSelected;
        return false;
    });
};*/
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
}
function changeBackground(){
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
                                    CH.backgroundSelected="uploads/"+src;
                                    fitBackground(CH.VC3.dropbackground);  //zainchange
                                    oThis.bgOriginalWidth=parseInt(resp[2]);
                                    oThis.bgOriginalHeight=parseInt(resp[3]);
                                    oThis.backgroundId=null;
                                     oThis.putAddressIndd();
                                }
                                else if(success!=null && success=="0"){
                                    alert(src);
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
    }
/*function changeBackground(){
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
}*/
//fine till here

/*function populateLeftBarOnFront()
{
    $(".front-form").show();
    $(".address-form").hide();
    $(".front-form-inside-div").empty();
    for(var i=0;i<CH.VC3.items.length;i++){
        $(".front-form-inside-div").append("<input type='text' id='"+CH.VC3.items[i].id+"-LeftDiv' class='txtbox'  value='" + CH.VC3.items[i].innertxt + "'/>")
    }
}*/
function restoreAll()
{
    $(".drop").html("");
    $(".back").html("");
    $(".left").html("");
    $(".right").html("");
    //$(".tools").html("<div id='toolbarCommonAction' class='editor-icon' style='width: auto; height: 40px;'><button id='Save' class='form-editor-save'></button><button id='removeButton' class='form-editor-delete'></button><button id='UndoButton' class='form-editor-undo'></button><button id='RedoButton' class='form-editor-redo'></button><button id='CopyButton' class='form-editor-copy'></button><button id='PasteButton' class='form-editor-paste'></button><button id='ZoomIn' class='form-editor-zoomin'></button><button id='ZoomOut' class='form-editor-zoomout'></button></div><div id='toolbarImageAction' class='editor-icon1' style='width: auto; height: 35px;'><button id='addButton' class='form-editor-t'></button><button id='upphot' class='form-editor-cam'></button><button id='changebg' class='form-editor-f'></button></div><div  id='toolbarFontAction' class='form-editor' style='width: auto; height: 35px;'><select id='font1' name='font' class='form-editor-dropdown1'><option style='font-family: Arial;'>Arial</option><!--<option style='font-family: Tangerine;'>Tangerine</option>--><option style='font-family: Georgia;'>Georgia</option><option style='font-family: Verdana;'>Verdana</option><option style='font-family: Times New Roman;'>Times New Roman</option><!--<option style='font-family: Lucida Grande;'>Lucida Grande</option>--><option style='font-family: Lucida Sans Unicode;'>Lucida Sans Unicode</option><option style='font-family: Courier New;'>Courier New</option></select><select id='fontsize' name='font-size' class='form-editor-dropdown2'><option>10</option><option>12</option><option>14</option><option>16</option><option>18</option><option>20</option><option>22</option><option>24</option><option>28</option><option>32</option><option>38</option></select><input type='hidden' id='colpick' name='color1' class='color-picker' size='6' autocomplete='on' maxlength='10' /><button id='boldbutton' class='form-editor-btnb' ></button><button id='italicbutton' class='form-editor-btni'></button><button id='underlinebutton' class='form-editor-btnu' ></button><button id='Lalignbutton' class='form-editor-btnp1' ></button><button id='Calignbutton' class='form-editor-btnp2'></button><button id='Ralignbutton' class='form-editor-btnp3'></button></div><ul id='toolbarViewAction' class='editor-shape' style='width: 224px; height: 40px;'><li><div id='frontdivimg' class='toolbarBtn'><img src='img/images/shape1-editor.png' alt='shape1' />Front</div></li><li><div id='backdivimg' class='toolbarBtn'><img src='img/images/shape2-editor.png' alt='shape2' />Back</div></li><li><div id='leftdivimg' class='toolbarBtn'><img src='img/images/shape3-editor.png' alt='shape3' />Left</div></li><li><div id='rightdivimg' class='toolbarBtn'><img src='img/images/shape4-editor.png' alt='shape4' />Right</div></li><li><div id='clrpikr'><input type='hidden' id='colpickfordiv' name='color1' class='color-picker-for-background' size='6' autocomplete='on' maxlength='10' /></div></li></ul></form>");
    $(".tools").html("<div id='toolbarCommonAction' class='editor-icon' style='width: auto; height: 40px;'><button id='Save' class='form-editor-save'></button><button id='removeButton' class='form-editor-delete'></button><button id='UndoButton' class='form-editor-undo'></button><button id='RedoButton' class='form-editor-redo'></button><button id='CopyButton' class='form-editor-copy'></button><button id='PasteButton' class='form-editor-paste'></button><button id='ZoomIn' class='form-editor-zoomin'></button><button id='ZoomOut' class='form-editor-zoomout'></button></div><div id='toolbarImageAction' class='editor-icon1' style='width: auto; height: 35px;'><button id='addButton' class='form-editor-t'></button><button id='upphot' class='form-editor-cam'></button><button id='changebg' class='form-editor-f'></button></div>"+
                        "<div  id='toolbarFontAction' class='form-editor' style='width: auto; height: 35px;'>"+
                            "<div class=\"textFontStyle\"><select id='font1' name='font' class='form-editor-dropdown1'>"+
                                "<option style='font-family: Arial;'>Arial</option>"+
                                "<!--<option style='font-family: Tangerine;'>Tangerine</option>-->"+
                                "<option style='font-family: Georgia;'>Georgia</option>"+
                                "<option style='font-family: Verdana;'>Verdana</option>"+
                                "<option style='font-family: Times New Roman;'>Times New Roman</option>"+
                                "<!--<option style='font-family: Lucida Grande;'>Lucida Grande</option>-->"+
                                "<option style='font-family: Lucida Sans Unicode;'>Lucida Sans Unicode</option>"+
                                "<option style='font-family: Courier New;'>Courier New</option>"+
                            "</select>"+
                            "<select id='fontsize' name='font-size' class='form-editor-dropdown2'>"+
                                "<option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>"+
                                "<option>11</option><option>12</option><option>13</option><option>14</option><option>15</option>"+
                                "<option>16</option><option>17</option><option>18</option><option>19</option><option>20</option>"+
                                "<option>21</option><option>22</option><option>23</option><option>24</option><option>25</option>"+
                                "<option>26</option><option>27</option><option>28</option><option>29</option><option>30</option>"+
                                "<option>31</option><option>32</option><option>33</option><option>34</option>"+
                             "</select>"+
                             "<input type='hidden' id='colpick' name='color1' class='color-picker' size='6' autocomplete='on' maxlength='10' />"+
                             "</div><div class=\"textButtonStyle\">"+
                             "<button id='boldbutton' class='form-editor-btnb'/>"+
                             "<button id='italicbutton' class='form-editor-btni'/>"+
                             "<button id='underlinebutton' class='form-editor-btnu'/>"+
                             "<button id='Lalignbutton' class='form-editor-btnp1' />"+
                             "<button id='Calignbutton' class='form-editor-btnp2'/>"+
                             "<button id='Ralignbutton' class='form-editor-btnp3'/>"+
                             "</div></div><ul id='toolbarViewAction' class='editor-shape' style='width: 224px; height: 40px;'><li><div id='frontdivimg' class='toolbarBtn'><img src='img/images/shape1-editor.png' alt='shape1' /></div></li><li><div id='backdivimg' class='toolbarBtn'><img src='img/images/shape2-editor.png' alt='shape2' /></div></li><li><div id='leftdivimg' class='toolbarBtn'><img src='img/images/shape3-editor.png' alt='shape3' />Left</div></li><li><div id='rightdivimg' class='toolbarBtn'><img src='img/images/shape4-editor.png' alt='shape4' />Right</div></li><li><div id='clrpikr'><input type='hidden' id='colpickfordiv' name='color1' class='color-picker-for-background' size='6' autocomplete='on' maxlength='10' /></div></li></ul></form>");
    CH.backgroundSelected=null;
    CH.currentPackage=null;
    CH.isFillingAndFormatSelected=false;
    $("#content-choosedesignhtml .content-upper ul").html("");
    $(".right-contentfilling .choose-filling ul").html("");
    $("#dd_format").html("");
    $(".formatImage").html("");
}


function setBackGroundImageInDrop(sourceOfImage)
{
    $(".screens").hide();
    $("#content-playablehtml").show();
    backButtons();
    buttonToUnactivestate();
    $(".nav6bar ul #fifth").prop("class","fifth active");
    $(".nav5bar ul #fourth").prop("class","#fourth active");
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
    /*if(CH.isCompanyAddress==true)
    {
        document.getElementById("backaddress1input").value="werbungxyz";
        document.getElementById("backaddress2input").value="78xyz";
        document.getElementById("backtelephoneinput").value="+49 (0) 7643 80 10";
        document.getElementById("backwebsiteinput").value="www.werbungxyz.com";
    }
    else
    {*/
    $("#selectedAddressType").val($("input[name='addressType']:checked").val());
    if($("input[name='addressType']:checked").val()=="company_address"){
        $("#deskPageCompanyNameInput").val($("#companyAddressPageCompanyName").html());
        $("#deskPageRoadInput").val($("#companyAddressPageRoad").html());
        $("#deskPageZipCodeInput").val($("#companyAddressPageZipCode").html());
        $("#deskPagePhoneNumberInput").val("");
        $("#deskPageEMailInput").val("");
        $("#deskPageWebsiteInput").val("");
    }else{
        $("#deskPageCompanyNameInput").val($("#homeAddressPageCompanyName").val());
        $("#deskPageRoadInput").val($("#homeAddressPageRoad").val());
        $("#deskPageZipCodeInput").val($("#homeAddressPageZipCode").val());
        $("#deskPagePhoneNumberInput").val($("#homeAddressPagePhoneNumber").val());
        $("#deskPageEMailInput").val($("#homeAddressPageEMail").val());
        $("#deskPageWebsiteInput").val($("#homeAddressPageWebsite").val());
    }

    /*}*/

}

function putAddressIndd()
{
    CH.addressSelected=true;
    if(CH.currentPackage.packageId == "2"){
        $("#color_optionPanel").show();
        $("#addressOptionText").show();
        $(".color-picker-for-basic-package").miniColors();
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"hksColorCode"
            },
            success:function(data){
               $("#hks1Value").append(data);
               $("#hks2Value").append(data);
            }
        });
    }
    $(".screens").hide();
    $("#content-chooseaddresshtml").show();
    backButtons();
    buttonToUnactivestate();
    $(".nav6bar ul #fourth").prop("class","fourth active");
    $("input[name='addressType']").unbind("change");
    $("input[name='addressType']").change(function(){
        if($("input[name='addressType']:checked").val()=="company_address"){
            stepToDesk("company");
            $("#homeErrorMessage").hide();
            //$("#companyAddress").attr("style","min-height:250px;");
        }else{
            stepToDesk("home");
            $("#companyErrorMessage").hide();

        }
        /*if($(this).prop("selectedIndex")==0){
            $("#addressPageCompanyName").val("Kalfany SÃ¼ÃŸe Werbung GmbH & Co. KG");
            $("#addressPageCompanyName").prop('disabled', true);
            $("#addressPageRoad").val("HolzmattenstraÃŸe 22");
            $("#addressPageRoad").prop('disabled', true);
            $("#addressPageZipCode").val("D-79336 Herbolzheim");
            $("#addressPageZipCode").prop('disabled', true);
        }else{
            $("#addressPageCompanyName").val("");
            $("#addressPageCompanyName").prop('disabled', false);
            $("#addressPageRoad").val("");
            $("#addressPageRoad").prop('disabled', false);
            $("#addressPageZipCode").val("");
            $("#addressPageZipCode").prop('disabled', false);
            $("#addressDivindd_bg input").val("");
            $("#addressDivindd_bg").show();
            $("#addressDivindd_bg input").removeAttr("readonly");//zain
            //CH.isCompanyAddress=false;
        }*/
    });
    if($("#selectedAddressType").val()=="company_address"){
        $('input:radio[name="addressType"][value="company_address"]').prop('checked', true);
    }
    $("input[name='addressType']").change();


    /*$("#addressDivindd_bg").hide();*///zain
    //$('.content-upper-address').html("<div id='addressDivindd_bg' style='text-align:left;padding-left:15px;'><div>Address Line 1</div><div id='dd_bgaddress1' style='margin-bottom:4px'><input id='dd_bgaddress1input' type='text' name='addrline1' size='35' /></div><div>Address Line 2</div><div  id='dd_bgaddress2' style='margin-bottom:4px'><input id='dd_bgaddress2input' type='text' name='addrline2' size='35' /></div><div>Telephone</div><div  id='dd_bgtelephone' style='margin-bottom:4px'><input id='dd_bgtelephoneinput' type='text' name='telephone' size='25' /></div><div>Website</div><div  id='dd_bgwebsite' style='margin-bottom:4px'><input id='dd_bgwebsiteinput' type='text' name='website' size='35' /></div><br/><input id='AddressNextButton' type='button' name='submit' class='next-button' value='NEXT' /></div>");
    stepToDesk("company");

}
function stepToDesk(addressType)
{
    var oThis=this;
    $("#AddressNextButton").unbind("click"); //awais
    $("#AddressNextButton").click(function(e){
        CH.designLoad=true;
        if(addressType=="company"){
            oThis.fromAddressToDesk();
        }else{
            if($("#"+addressType+"AddressPageCompanyName").val()!="" && $("#"+addressType+"AddressPageRoad").val()!="" && $("#"+addressType+"AddressPageZipCode").val()!="")
            {
                $("#"+addressType+"ErrorMessage").hide();
                if(addressType=="company"){
                    $("#homeErrorMessage").hide();
                    //$("#companyAddress").attr("style","min-height:250px;");
                }
                else{
                    $("#companyErrorMessage").hide();
                }
                oThis.fromAddressToDesk();
            }
            else
            {
                $("#"+addressType+"ErrorMessage").show();
                //$("#companyAddress").attr("style","min-height:320px;");
                if(addressType=="company"){
                    $("#homeErrorMessage").hide();
                    //$("#companyAddress").attr("style","min-height:250px;");
                }
                else{
                    $("#companyErrorMessage").hide();
                }
            }
        }
    });
}


function fromAddressToDesk()
{
        $(".drop").html("");
        $(".screens").hide();
        $("#content-playablehtml").show();
        CH.VC3.addInitialDivs = true;
        //backButtons();
        setBackGroundImageInDrop(CH.backgroundSelected);
        /*triangle check start */
        //alert(CH.currentPackage.formatId);
        $.ajax({
            type: "POST",
            url: "basicFunctions.php",
            data: {
                "type":"checkIfImageIsTriangle",
                formatId:CH.currentPackage.formatId,
                imageSrc:CH.backgroundSelected
            },
            success:function(data){
                if(data[0]=="0")
                {
                    CH.currentPackage.isTriangle=0;
                    $("#moveback-button-div").remove();
                //alert(data)
                }
                else if(data[0]=="1"){
                    //alert(data)
                    CH.currentPackage.isTriangle=1;
                    var imagePath = data.split(',')[7];
                    CH.currentPackage.overlayImagePath=imagePath;
                    $("#drop").append("<img id='triImage' src='./"+imagePath+"' style='width:100%';>");//heree
                    //function to make triangle border for drag.
                    CH.currentPackage.makeTriangleTorestrictDrag(data.split(',')[1],data.split(',')[2],data.split(',')[3],data.split(',')[4],data.split(',')[5],data.split(',')[6]);
                    //function to move all elements inside the triangle
                    CH.currentPackage.moveTextAccordinglyIntoTriangle(data.split(',')[8],data.split(',')[9]);
                    CH.VC3.initMoveBackground();
                }
                else{
                    alert("ERROR WITH CURRENT FORMAT!");
                }
            }
        });


        /*triangle check end*/
        loadAddressFromAddressScreen();
        $("#epsbutton").remove();

        //if ( $(window).width() < 960)
        /*
        if( $("#bottomButtonsFinalScreen").length != 1)
        {

            if(CH.language=="english")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='ORDER' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='save-button-div'><input id='saveAndSend' type='button' name='submit' class='next-button' value='SAVE & SEND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
            }
            else if(CH.language=="dutch")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='BESTELLEN' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='save-button-div'><input id='saveAndSend' type='button' name='submit' class='next-button' value='SPEICHEN & ABSENDEN' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='Zurück' /></div></div>");
            }

        }
        else{
            $("#bottomButtonsFinalScreen").remove();

            if(CH.language=="english")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='ORDER' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='save-button-div'><input id='saveAndSend' type='button' name='submit' class='next-button' value='SAVE & SEND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
            }
            else if(CH.language=="dutch")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='BESTELLEN' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='save-button-div'><input id='saveAndSend' type='button' name='submit' class='next-button' value='SPEICHEN & ABSENDEN' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='Zurück' /></div></div>");
            }

        }
    */
   if( $("#bottomButtonsFinalScreen").length != 1)
        {

            if(CH.language=="english")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='ORDER' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
            }
            else if(CH.language=="dutch")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='Weiter' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='Zurück' /></div></div>");
            }

        }
        else{
            $("#bottomButtonsFinalScreen").remove();

            if(CH.language=="english")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='ORDER' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='PREVIEW-FRONTSIDE' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='BACK' /></div></div>");
            }
            else if(CH.language=="dutch")
            {
                $("#playableButtonDiv").append("<div id='bottomButtonsFinalScreen'><div id='order-button-div'><input id='OrderAdventKalender' type='button' name='submit' class='next-button' value='Weiter' /></div><div id='moveback-button-div'><input id='moveBack' type='button' name='submit' class='next-button' value='MOVE BACKGROUND' /></div><div id='preview-button-div'><input id='epsbutton' type='button' name='submit' class='next-button' value='Vorschau' /></div><div id='back-button-div'><input id='deskBackButton' type='button' name='submit' class='next-button' value='Zurück' /></div></div>");
            }

        }
        CH.currentPackage.initOrderAdventKalender();
        CH.currentPackage.initSaveAndSend();
        if(CH.currentPackage.packageId == "1")
        {
            $("#epsbutton").remove();
        }
        CH.currentPackage.initPreviewEps();
        backButtons();
    //CH.currentPackage.putBackGroundInInitialscreen();


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
    $(".sider .back").html("<div id='addressDivonback' style='width:260px; position:absolute; text-align:left;padding-left:15px;'><input type='hidden' id='selectedAddressType' name='selectedAddressType'/><div>Company Name</div><div id='deskPageCompanyName' style='margin-bottom:4px'><input id='deskPageCompanyNameInput' type='text' name='deskPageCompanyName' size='35' /></div><div>Road</div><div  id='deskPageRoad' style='margin-bottom:4px'><input  id='deskPageRoadInput' type='text' name='deskPageRoad' size='35' /></div><div>Zip Code</div><div  id='deskPageZipCode' style='margin-bottom:4px'><input  id='deskPageZipCodeInput' type='text' name='deskPageZipCodeInput' size='25' /></div><div>Phone Number</div><div  id='deskPagePhoneNumber' style='margin-bottom:4px'><input  id='deskPagePhoneNumberInput' type='text' name='deskPagePhoneNumberInput' size='35' /></div><div>E Mail</div><div  id='deskPageEMail' style='margin-bottom:4px'><input  id='deskPageEMailInput' type='text' name='deskPageEMailInput' size='35' /></div><div>Website</div><div  id='deskPageWebsite' style='margin-bottom:4px'><input  id='deskPageWebsiteInput' type='text' name='deskPageWebsiteInput' size='35' /></div></div>");
    if(CH.currentPackage.packageId!="1")
        {
    CH.currentPackage.initUpdateAddress();
        }
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
    //$('#backdivimg').hide();
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
    $("#toolbarCommonAction").css("display","none");
    if(CH.currentPackage.packageId=="2"){
        $("#toolbarImageAction").hide();
        $("#toolbarFontAction").hide();
    }

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
    //$('#backdivimg').hide();
    CH.currentPackage.preparingFront();

    CH.currentPackage.currentSide="Front";
    $(".address-tittle-txt h1").html("Enter Text For Front Side");
    $("#toolbarCommonAction").css("display","block");
    //populateLeftBarOnFront();
    if(CH.currentPackage.packageId=="2"){
        $("#toolbarImageAction").show();
        $("#toolbarFontAction").show();
        $("#ZoomIn" ).prop("disabled","");
    $("#ZoomIn").css("opacity","1");
    $("#ZoomOut").prop("disabled","");
    $("#ZoomOut").css("opacity","1");
    }
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
            CH.selectedBar=".nav5bar";
        }
        else if($(this).prop("id")=="standardButton")
        {
            CH.currentPackage=CH.VC2;
            CH.selectedBar=".nav6bar";
        }
        else if($(this).prop("id")=="businessButton")
        {
            CH.currentPackage=CH.VC3;
            CH.selectedBar=".nav6bar";
        }
        $(".mainBanner").hide();
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
    $(".nav5bar ul #first").prop("class","first");
    $(".nav5bar ul #second").prop("class","second");
    $(".nav5bar ul #third").prop("class","third");
    $(".nav5bar ul #fourth").prop("class","fourth");
    $(".nav5bar ul #fifth").prop("class","fifth");


}

function buttonToUnactiveFlag(){

    $(".lang-block .flag-de lang-active").prop("class","flag-de");
    $(".lang-block .flag-en lang-active").prop("class","flag-en");
    $(".lang-block .flag-fr lang-active").prop("class","flag-fr");

}



function backButtons(){


    $('#formatFillingBackButton').click(function(){
        $(".mainBanner").attr("style","margin-top:0px;");
        $(".mainBanner").show();
        $(".nav5bar").hide();
        $(".nav6bar").hide();
        $(".screens").hide();
        $("#content-choosepackagehtml").show();
        restoreAll()
        buttonToUnactivestate();
        $(CH.selectedBar+" ul #first").prop("class","first active");
    });
    $('#chooseDesignBackButton').click(function(){
        $(".screens").hide();
        $("#content-choosefillingshtml").show();
        $(".dynamicFillings").hide();

        $("#"+CH.currentPackage.fillingsForThisPackage).show();
        buttonToUnactivestate();
        $(CH.selectedBar+" ul #second").prop("class","second active");
    });
    $('#AddressBackButton').click(function(){
        $(".screens").hide();
        $("#content-choosedesignhtml").show();
        buttonToUnactivestate();
        $(".nav6bar ul #third").prop("class","third active");
    });
    $('#deskBackButton').click(function(){
        $(".screens").hide();
        if(CH.currentPackage.packageId != "1")
            {
        $("#content-chooseaddresshtml").show();
        //$("#drop").show();
        buttonToUnactivestate();
        $(".nav6bar ul #fourth").prop("class","fourth active");
            }
         else{
             $("#content-choosedesignhtml").show();
             buttonToUnactivestate();
        $(".nav5bar ul #third").prop("class","third active");
         }
    });
    $('#orderBackButton').click(function(){
        $('#orderForm').validationEngine('hideAll');
        $(".screens").hide();
        if(CH.currentPackage.packageId != "1")
            {
        $("#content-playablehtml").show();
        //$("#drop").show();
        buttonToUnactivestate();
        $(".nav6bar ul #fifth").prop("class","fifth active");
            }
         else{
             $("#content-playablehtml").show();
             buttonToUnactivestate();
        $(".nav5bar ul #fourth").prop("class","fourth active");
         }
    });

}


function fitBackground(dropbackground){  //zain change
    var oThis=this;
    $("#divLoad").dialog("open");
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
            //$('.drop').css("width", CH.WIDTHOFDROP+"px");
            //$('.back').css("width", CH.WIDTHOFDROP+"px");
            //$('.drop').css("height", "750px");
            //$('.back').css("height", "750px");
            var field = data.split(' ')[1];
            var addval=field-CH.HEIGHTOFDROP;
            CH.paddding = CH.WIDTHOFDROP-field;
            CH.paddding = CH.paddding/2;
            var heightOrwidth=data.split(' ')[0];
            //var heightacratio=CH.WIDTHOFDROP/data.split(' ')[2];
            var width=data.split(' ')[1];
            var height=data.split(' ')[2];
            CH.ACTUALWIDTH= (parseFloat(data.split(' ')[4])*0.026458333).toFixed(3);
            CH.ACTUALHEIGHT= (parseFloat(data.split(' ')[5])*0.026458333).toFixed(3);
            /*if(heightOrwidth=="width100%")
            {*/
            if(heightOrwidth=="widthgreater")
            {
                $('.drop').css("width", CH.WIDTHOFDROP+"px");
                $('.back').css("width", CH.WIDTHOFDROP+"px");
                $('.drop').css("height", height+"px");
                $('.back').css("height", height+"px");
                $('.drop').css("background-size", "100% auto");
                $('.back').css("background-size", "100% auto");
                //$('.drop').css("height", height+"px");
                //$('.back').css("height", height+"px");
                $('.drop').css("background-repeat","no-repeat");
                $('.back').css("background-repeat","no-repeat");
                $(".sider").css("height",$('.drop').height()+10+"px");
            }
            else if(heightOrwidth=="widthlesser")
            {
                $('.drop').css("width", width+"px" );
                $('.back').css("width", width+"px");
                $('.drop').css("height", height+"px");
                $('.back').css("height", height+"px");
                $('.drop').css("background-size", width+"px auto" );
                $('.back').css("background-size", width+"px auto");
                //$('.drop').css("background-height", height+"px");
                //$('.back').css("background-height", height+"px");
                $('.drop').css("height", height+"px");
                $('.back').css("height", height+"px");
                var padding = (980-(Math.ceil(width)))/2;
                $('.drop').css("margin-left",padding+"px");
                $('.drop').css("background-position","center");
                $('.back').css("background-position","center");
                $('.drop').css("background-repeat","no-repeat");
                $('.back').css("background-repeat","no-repeat");
                //may be required/$(".edit-design-content").height(CH.HEIGHTOFDROP+250+"");
                //$(".add-address").height(CH.HEIGHTOFDROP+275+"");
                $(".sider").css("height",$('.drop').height()+10+"px");
                var url = $('.drop').css('background-image').replace('url(', '').replace(')', '').replace("'", '').replace('"', '');
                $('.drop').append("<div id='forImageWidth'></div>");
                var bgImg = $('<img />');
                //$('.drop').append(bgImg);
                bgImg.hide();
                bgImg.bind('load', function()
                {
                    /*var originalWidth = $(this).width();
                    CH.textConstantToAddForVerticalImages=(980-(Math.ceil(originalWidth)))/2;
                    dragbound();
                    moveDropElementsAccordingToBackground();*///zain


                    });
                $('#forImageWidth').append(bgImg);

                bgImg.attr('src', url);


            }

            //}
            /*else if(heightOrwidth=="height100%")
            {
                $('.drop').css("background-size", "auto 100%");
                $('.back').css("background-size", "auto 100%");
                $('.drop').css("background-position","center");
                $('.back').css("background-position","center");
                $('.drop').css("background-repeat","no-repeat");
                $('.back').css("background-repeat","no-repeat");
                //may be required/$(".edit-design-content").height(CH.HEIGHTOFDROP+250+"");
                $(".add-address").height(CH.HEIGHTOFDROP+275+"");
                $(".sider").css("height",$('.drop').height()+10+"px");
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

            }*/
            $("#divLoad").dialog("close");
             /*$("#drop").attr("background").load(function(){
            $("#divLoad").dialog("close");
        });
            */

        }
    });
}


function moveDropElementsAccordingToBackground(){
    $( ".drop .demo" ).each(function() {
        $(this).css("left",CH.textConstantToAddForVerticalImages+"px");
    });

}
/*function dragbound(){
    $("#drop div").draggable({
    containment: [CH.textConstantToAddForVerticalImages,0, 980-(CH.textConstantToAddForVerticalImages*2), 150]
});

}*/

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
function zoomInFunction()
{
  CH.currentPackage.zoomScale=1.3;
    $("#content-playablehtml").addClass("zoomIn");
    $("#content-playablehtml").removeClass("zoomOut");
}
function zoomOutFunction()
{
  CH.currentPackage.zoomScale=1;
    $("#content-playablehtml").removeClass("zoomIn");
    $("#content-playablehtml").addClass("zoomOut");
}
