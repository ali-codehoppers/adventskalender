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
public class parseFrontJson{

    public String id;
    public boolean isBold;
    public boolean isItalic;
    public boolean isUnderlined;
    public String textAlign;
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

    public parseFrontJson(JSONObject object) throws ParseException {
        id = object.get("id").toString();
        if (id != null) {
            System.out.println("Id = " + id);
        }
        isBold = object.get("isBold").toString().equals("0") ? false : true;
        System.out.println("Is Bold = " + isBold);
        isItalic = object.get("isItalic").toString().equals("0") ? false : true;
        System.out.println("Is Italic = " + isItalic);
        isUnderlined = object.get("isUnderlined").toString().equals("0") ? false : true;
        System.out.println("Is Understand = " + isUnderlined);
        textAlign = object.get("textAlign").toString();
        System.out.println("textAlign = " + textAlign);
        istxt = object.get("istxt").toString().equals("0") ? false : true;
        System.out.println("Is Text = " + istxt);
        fontSize = object.get("fontSize").toString();
        if (fontSize != null) {
            System.out.println("Font Size = " + fontSize);
        }
        fontStyle = object.get("fontStyle").toString();
        if (fontStyle != null) {
            System.out.println("Font Style = " + fontStyle);
        }
        innertxt = object.get("innertxt").toString();
        if (innertxt != null) {
            System.out.println("Inner Text = " + innertxt);
        }
        fontcolor = object.get("fontcolor").toString();
        if (fontcolor != null) {
            System.out.println("Font Color = " + fontcolor);
        }
        xposition = Float.parseFloat(object.get("xposition").toString().equals("")?"0":object.get("xposition").toString());
        System.out.println("X Position = " + xposition);
        yposition = Float.parseFloat(object.get("yposition").toString().equals("")?"0":object.get("yposition").toString());
        System.out.println("Y Position = " + yposition);
        angle = Float.parseFloat(object.get("angle").toString().equals("")?"0":object.get("angle").toString());
        System.out.println("Angle = " + angle);
        if (object.get("width") != null) {
            width = Float.parseFloat(object.get("width").toString().equals("")?"0":object.get("width").toString());
            System.out.println("Width = " + width);
        }
        if (object.get("height") != null) {
            height = Float.parseFloat(object.get("height").toString().equals("")?"0":object.get("height").toString());
            System.out.println("Height = " + height);
        }
    }
}
