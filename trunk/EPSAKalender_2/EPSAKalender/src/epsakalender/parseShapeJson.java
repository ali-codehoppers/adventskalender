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

public class parseShapeJson {
    public String isTri;
    public String imagePath;
    public float newBackgroundLeft;
    public float newBackgroundTop;

    public parseShapeJson (JSONObject object) throws ParseException{
        isTri = object.get("isTri").toString();
        if(isTri!=null)System.out.println("Id = "+isTri);
        imagePath =  object.get("imagePath").toString();
        if(imagePath!=null)System.out.println("imagePath = "+imagePath);
        newBackgroundLeft =  Float.parseFloat(object.get("newBackgroundLeft").toString().equals("")?"0":object.get("newBackgroundLeft").toString());
        System.out.println("newBackgroundLeft = "+newBackgroundLeft);
        newBackgroundTop = Float.parseFloat(object.get("newBackgroundTop").toString().equals("")?"0":object.get("newBackgroundTop").toString());
        System.out.println("newBackgroundTop = "+newBackgroundTop);
    }
}
