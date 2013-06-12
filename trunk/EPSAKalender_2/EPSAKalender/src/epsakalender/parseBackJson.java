/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package epsakalender;

import java.text.ParseException;
import org.json.simple.JSONObject;

/**
 *
 * @author Ahmad Abdullah Saeed
 */
public class parseBackJson {
    public boolean isHeader;
    public String inputValue;
    public float width;
    public float height;
    public float xposition;
    public float yposition;
    public parseBackJson(JSONObject object) throws ParseException{
        isHeader = object.get("isheader").toString().equals("0")?false:true;
        inputValue = object.get("inputvalue").toString();
        xposition =  Float.parseFloat(object.get("xposition").toString().equals("")?"0":object.get("xposition").toString());
        System.out.println("X Position = "+xposition);
        yposition = Float.parseFloat(object.get("yposition").toString().equals("")?"0":object.get("yposition").toString());
        System.out.println("Y Position = "+yposition);
        if(object.get("width")!=null)
        {
            width = Float.parseFloat(object.get("width").toString().equals("")?"0":object.get("width").toString());
            System.out.println("Width = "+width);
        }
        if (object.get("height") != null)
        {
            height = Float.parseFloat(object.get("height").toString().equals("")?"0":object.get("height").toString());
            System.out.println("Height = "+height);
        }
    }
}
