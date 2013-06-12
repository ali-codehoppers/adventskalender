/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package epsakalender;

import org.json.simple.JSONObject;

/**
 *
 * @author Ahmad Abdullah Saeed
 */
public class parseOverlayJson {
    public String isOverlay;
    public float height;
    public float width;
    public float xposition;
    public float yposition;
    public float addressHeight;
    public float addressWidth;
    public float addressXposition;
    public float addressYposition;
    public float addressRotation;
    public String addressText;
    public parseOverlayJson (JSONObject object){
        isOverlay = object.get("isOverlay").toString();
        if(isOverlay!=null)System.out.println("isOverlay = "+isOverlay);
        height =  Float.parseFloat(object.get("height").toString().equals("")?"0":object.get("height").toString());
        System.out.println("height = "+height);
        width = Float.parseFloat(object.get("width").toString().equals("")?"0":object.get("width").toString());
        System.out.println("width = "+width);
        xposition =  Float.parseFloat(object.get("xposition").toString().equals("")?"0":object.get("xposition").toString());
        System.out.println("xposition = "+xposition);
        yposition = Float.parseFloat(object.get("yposition").toString().equals("")?"0":object.get("yposition").toString());
        System.out.println("yposition = "+yposition);
        addressHeight = Float.parseFloat(object.get("addressHeight").toString().equals("")?"0":object.get("addressHeight").toString());
        System.out.println("addressHeight = "+addressHeight);
        addressWidth = Float.parseFloat(object.get("addressWidth").toString().equals("")?"0":object.get("addressWidth").toString());
        System.out.println("addressWidth = "+addressWidth);
        addressXposition = Float.parseFloat(object.get("addressXposition").toString().equals("")?"0":object.get("addressXposition").toString());
        System.out.println("addressXposition = "+addressXposition);
        addressYposition = Float.parseFloat(object.get("addressYposition").toString().equals("")?"0":object.get("addressYposition").toString());
        System.out.println("addressYposition = "+addressYposition);
        addressRotation = Float.parseFloat(object.get("addressRotation").toString().equals("")?"0":object.get("addressRotation").toString());
        System.out.println("addressRotation = "+addressRotation);
        addressText = object.get("addressText").toString();
        if(addressText!=null)System.out.println("addressText = "+addressText);
    }
}
