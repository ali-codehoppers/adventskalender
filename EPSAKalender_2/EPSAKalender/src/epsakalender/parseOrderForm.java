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
public class parseOrderForm {
    public String firmaField;
    public String strasseField;
    public String anredeField;
    public String plzField;
    public String ortField;
    public String vornameField;
    public String landField;
    public String nachnameField;
    public String telefonField;
    public String emailField;
    public String anzahlField;
    public String commentField;


    public parseOrderForm(JSONObject object) throws ParseException {
        firmaField = object.get("firmaField").toString();
        strasseField = object.get("strasseField").toString();
        anredeField = object.get("anredeField").toString();
        plzField = object.get("plzField").toString();
        ortField = object.get("ortField").toString();
        vornameField = object.get("vornameField").toString();
        landField = object.get("landField").toString();
        nachnameField = object.get("nachnameField").toString();
        telefonField = object.get("telefonField").toString();
        emailField = object.get("emailField").toString();
        anzahlField = object.get("anzahlField").toString();
        commentField = object.get("commentField").toString();
    }
}
