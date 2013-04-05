/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package epsakalender;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Ahmad Abdullah Saeed
 */
public class parseFrontJson {
    public String id;
    public boolean isBold;
    public boolean isItalic;
    public boolean isUnderlined;
    public boolean isRightAligned;
    public boolean isLeftAligned;
    public boolean isCenterAligned;
    public boolean istxt;
    public String fontSize;
    public String fontStyle;
    public String innertxt;
    public String fontcolor;
    public float xposition;
    public float yposition;
    public float angle;
    public float width;
    public float height;
    
    public parseFrontJson(JSONObject object) throws ParseException{
        id = (String) object.get("id");
        if(id!=null)System.out.println("Id = "+id);
        isBold = (Long) object.get("isBold")==0?false:true;
        System.out.println("Is Bold = "+isBold);
        isItalic = (Long) object.get("isItalic")==0?false:true;
        System.out.println("Is Italic = "+isItalic);
        isUnderlined = (Long) object.get("isUnderlined")==0?false:true;
        System.out.println("Is Understand = "+isUnderlined);
        isRightAligned = (Long) object.get("isRightAligned")==0?false:true;
        System.out.println("Is Right Aligned = "+isRightAligned);
        isLeftAligned = (Long) object.get("isLeftAligned")==0?false:true;
        System.out.println("Is Left Aligned = "+isLeftAligned);
        isCenterAligned = (Long) object.get("isCenterAligned")==0?false:true;
        System.out.println("Is Center Aligned = "+isCenterAligned);
        istxt=(Long) object.get("istxt")==0?false:true;
        System.out.println("Is Text = "+istxt);
        fontSize = (String) object.get("fontSize");
        if(fontSize!=null)System.out.println("Font Size = "+fontSize);
        fontStyle = (String) object.get("fontStyle");
        if(fontStyle!=null)System.out.println("Font Style = "+fontStyle);
        innertxt = (String) object.get("innertxt");
        if(innertxt!=null)System.out.println("Inner Text = "+innertxt);
        fontcolor=(String) object.get("fontcolor");
        if(fontcolor!=null)System.out.println("Font Color = "+fontcolor);
        xposition =  new Float((String)object.get("xposition"));
        System.out.println("X Position = "+xposition);
        yposition = new Float((String)object.get("yposition"));
        System.out.println("Y Position = "+yposition);
        angle = new Float((String)object.get("angle"));
        System.out.println("Angle = "+angle);
        if(object.get("width")!=null)
        {
            width = new Float((String) object.get("width"));
            System.out.println("Width = "+width);
        }
        if (object.get("height") != null)
        {
            height = new Float((String) object.get("height"));
            System.out.println("Height = "+height);
        }
    }
}
