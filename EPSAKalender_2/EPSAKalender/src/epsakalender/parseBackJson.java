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
        isHeader = (Long) object.get("isheader")==0?false:true;
        inputValue = (String) object.get("inputvalue");
        xposition =  new Float((String)object.get("xposition"));
        System.out.println("X Position = "+xposition);
        yposition = new Float((String)object.get("yposition"));
        System.out.println("Y Position = "+yposition);
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
