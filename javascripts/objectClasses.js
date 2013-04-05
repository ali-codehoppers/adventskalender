if(window.CH == undefined){
    window.CH = {};
}

CH.item=function(){
    this.id="";
    this.isBold=0;
    this.isItalic=0;
    this.isUnderlined=0;
    this.isRightAligned=0;
    this.isLeftAligned=0;
    this.isCenterAligned=0 
    this.fontSize="";
    this.istxt=1;
    this.innertxt="";
    this.fontcolor="#000000";
    this.fontStyle="0";//added
    this.height="0";//for image only
this.width="0";//for image only
this.xposition="0";
this.yposition="0";
this.angle="0";
this.textAlign="left"

}; 


CH.overlayItem=function(){
    
    this.isOverlay=0;
 this.height="0";
this.width="0";
this.xposition="0";
this.yposition="0";

this.addressHeight="0";
this.addressWidth="0";
this.addressXposition="0";
this.addressYposition="0";
this.addressRotation="0";
this.addressText="0";
    

};

CH.backitem=function(){
    
    this.isheader=0;
    this.inputid="";
    this.inputvalue="";
 this.height="0";
this.width="0";
this.xposition="0";
this.yposition="0";
    

};

CH.triangleprop=function(){
    this.isTri="0";
    this.imagePath="";
    this.newBackgroundLeft="";
    this.newBackgroundTop="";
}; 

CH.undoredo=function(){
    this.id="";
    this.lastaction=0;
    this.lastvalue=0;
    this.nextvalue=0;
    this.item={};
}; 
/*
CH.undoredo.prototype.id="";
CH.undoredo.prototype.lastaction=0;  //added
CH.undoredo.prototype.lastvalue=0; //added
CH.undoredo.prototype.nextvalue=0; //added


CH.undoredo.prototype.say=function(abc){
    alert(abc);
}*/