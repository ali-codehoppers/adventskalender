/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package epsakalender;

import com.mysql.jdbc.Util;
import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.font.LineBreakMeasurer;
import java.awt.font.TextAttribute;
import java.awt.font.TextLayout;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.*;
import java.text.AttributedCharacterIterator;
import java.text.AttributedString;
import java.util.LinkedList;
import java.util.Locale;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.imageio.ImageIO;
import net.sf.epsgraphics.ColorMode;
import net.sf.epsgraphics.EpsGraphics;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author AmierHaider
 */
public class EPSAKalender {

    /**
     * @param args the command line arguments
     */
    private LinkedList<String> filenames;
    private Properties properties;
    private String json;
    private Connection connection;
    private String connect;
    private String epsPath;
    private String imagePath;
    private String backgroundPath;
    private String frontBackground;
    private String otherBackground;
    private String otherSides;
    private JSONArray frontSide;
    private String sql;
    private PreparedStatement exeStatement;
    private String propertyString = "";
    private EpsGraphics imageEps = null;
    private String frontFileToSave;
    private String otherFileToSave;
    private String cardId;
    private int bgWidth = 0;
    private int bgHeight = 0;
    private double xAspect = 0;
    private double yAspect = 0;
    private double width = 0;
    private double height = 0;
    private String goScriptPath;
    private LinkedList<parseFrontJson> parseArray;

    public EPSAKalender(String id,String propertyString) {
        cardId = id;
        properties = new Properties();
        filenames = new LinkedList<String>();
        parseArray = new LinkedList<parseFrontJson>();
        json = "";
        epsPath = "";
        imagePath = "";
        otherSides = null;
        frontSide = null;
        frontFileToSave = "";
        otherFileToSave = "";
        bgWidth = 0;
        bgHeight = 0;
        xAspect = 0;
        yAspect = 0;
        width = 0;
        height = 0;
        this.propertyString=propertyString;
        getProperties(propertyString);
    }

    private int getProperties(String propertiesName) {
        InputStream inputStream = null;
        try {
            inputStream =  new FileInputStream(new File(propertiesName));
            if (inputStream != null) {
                properties.load(inputStream);
                connect = properties.getProperty("CONNECT");
                epsPath = properties.getProperty("EPSPATH");
                imagePath = properties.getProperty("IMAGEPATH");
                backgroundPath = properties.getProperty("BACKGROUNDPATH");
                goScriptPath=properties.getProperty("GHOST_SCRIPT_PATH");
                return 0;
            } else {
                return 1;
            }
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 1;
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception ex) {
                    Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

    public ResultSet executeQuery() {
        try {
            connection = DriverManager.getConnection(connect);
            ResultSet rs = null;
            if (connection != null) {
                exeStatement = connection.prepareStatement(sql);
                rs = exeStatement.executeQuery();
            } else {
                return null;
            }
            return rs;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public int getJsonFromDb() {
        sql = "SELECT json FROM cards WHERE id=" + cardId;
        try {
            ResultSet rs = executeQuery();
            if (rs != null && rs.next()) {
                json = rs.getString(1);
                json = json.replaceAll("\"", "\\\"");
            } else {
                return 2;
            }
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 2;
        } finally {
            try {
                if (!connection.isClosed()) {
                    connection.close();
                }
            } catch (Exception ex) {
                Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public void addFileToList(String fileName) {
        if (!fileName.equals("") && !filenames.contains(fileName)) {
            filenames.add(fileName);
        }
    }

    public int parseJson() {
        try {
            if (json != null && !json.equals("")) {
                JSONParser parser = new JSONParser();
                Object obj = parser.parse(json);
                JSONObject items = (JSONObject) obj;
                if (items.get("leftSide") != null) {
                    otherSides = (String) items.get("leftSide");
                    otherFileToSave = epsPath + "OtherSides_EPSImage_" + cardId + ".eps";
                    addFileToList(epsPath + "OtherSides_EPSImage_" + cardId + ".eps");
                }
                if (items.get("frontSide") != null) {
                    frontSide = (JSONArray) items.get("frontSide");
                    frontFileToSave = epsPath + "Front_EPSImage_" + cardId + ".eps";
                    addFileToList(epsPath + "Front_EPSImage_" + cardId + ".eps");
                }
                if (items.get("frontBackground") != null) {
                    frontBackground = (String) items.get("frontBackground");
                    addFileToList(backgroundPath + frontBackground);
                }
                return 0;
            } else {
                return 3;
            }
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 3;
        }
    }

    public int renderImage() {
        try {
            if(renderSides("front")!=0){
                return 4;
            }
            if(renderSides("back")!=0){
                return 4;
            }
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 4;
        }
    }

    public int renderSides(String side) {
        FileOutputStream fout = null;
        try {
            if (bgImageDimension() == 0) {
                if(side.equals("front")){
                        if (frontSide != null) {
                            for (int i = 0; i < frontSide.size(); i++) {
                                JSONObject object = (JSONObject) frontSide.get(i);
                                parseFrontJson parse = new parseFrontJson(object);
                                parseArray.push(parse);
                            }
                            fout = new FileOutputStream(new File(frontFileToSave));
                            imageEps = new EpsGraphics("EPSImage", fout, 0, 0, bgWidth, bgHeight, ColorMode.COLOR_RGB);
                            if(epsDrawing(fout)!=0){
                                return 6;
                            }
                        } else {
                            return 4;
                        }
                }
                else if(side.equals("back")){
                        if (otherSides != null && !otherSides.equals("")) {
                            fout = new FileOutputStream(new File(otherFileToSave));
                            imageEps = new EpsGraphics("EPSImage", fout, 0, 0, bgWidth, bgHeight, ColorMode.COLOR_RGB);
                            imageEps.setColor(Color.decode("#" + otherSides));
                            imageEps.fillRect(0, 0, bgWidth, bgHeight);
                        } else {
                            fout = null;
                            imageEps = null;
                            return 4;
                        }
                }
                return 0;
            } else {
                return 5;
            }
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 4;
        } finally {
            try {
                if (imageEps != null) {
                    imageEps.dispose();
                    imageEps.close();
                    imageEps = null;
                }
                if (fout != null) {
                    fout.close();
                }
            } catch (IOException ex) {
                Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public int bgImageDimension() {
        try {
            BufferedImage bkImage = readBackgroundImage(backgroundPath + frontBackground);
            if (bkImage != null) {
                bgWidth = bkImage.getWidth();
                bgHeight = bkImage.getHeight();
                double bgAspect = (double) bgWidth / (double) bgHeight;
                if (bgAspect < 1) {
                    height = 750;
                    width = (height * bgWidth) / bgHeight;
                } else {
                    width = 980;
                    height = (width * bgHeight) / bgWidth;
                }
                xAspect = (double) bgWidth / (double) width;
                yAspect = (double) bgHeight / height;
                return 0;
            } else {
                return 5;
            }
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 5;
        } 
    }

    public BufferedImage readBackgroundImage(String background) {
        InputStream bkCardIn = null;
        try {
            File file = new File(background);
            bkCardIn = new FileInputStream(file);
            BufferedImage bkImage = ImageIO.read(bkCardIn);
            return bkImage;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            if (bkCardIn != null) {
                try {
                    bkCardIn.close();
                } catch (IOException ex) {
                    Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

    public int epsDrawing(FileOutputStream fout) {
        try {
            BufferedImage bkImage = readBackgroundImage(backgroundPath + frontBackground);
            imageEps.setBackground(Color.WHITE);
            imageEps.drawRect(0, 0, bgWidth, bgHeight);
            imageEps.drawImage(bkImage, 0, 0, bgWidth, bgHeight, null);
            for (int i = 0; i < parseArray.size(); i++) {
                AttributedString value = null;
                AffineTransform fontAT = AffineTransform.getTranslateInstance(0, 0);
                parseFrontJson current = parseArray.get(i);
                AffineTransform a = imageEps.getTransform();
                if (current.istxt) {
                    int fontStyle = Font.PLAIN;
                    if (current.isBold) {
                        fontStyle += Font.BOLD;
                    }
                    if (current.isItalic) {
                        fontStyle += Font.ITALIC;
                    }

                    //int screenRes = Toolkit.getDefaultToolkit().getScreenResolution();
                    //System.out.println("Screen");
                    //int fontSize = (int) Math.round(Integer.parseInt(current.fontSize) * 300 / 120.0);

                    double widthDiff = Math.floor(Double.valueOf(current.fontSize) * (bgWidth / width));
                    double heightDiff = Math.floor(Double.valueOf(current.fontSize) * ((bgHeight / height)));
                    double fontSize = widthDiff * 1.20;

                    Font myFont = new Font(current.fontStyle, fontStyle, (int) (fontSize));
                    if (current.innertxt != null) {
                        value = new AttributedString(current.innertxt);
                    }
                    FontMetrics fMetrics = imageEps.getFontMetrics(myFont);
                    if (current.angle != 0) {
                        fontAT.translate(new Float((current.xposition) * xAspect), new Float((current.yposition) * yAspect));
                    } else {
                        fontAT.translate(new Float((current.xposition) * xAspect), new Float((current.yposition) * yAspect) + fMetrics.getAscent());
                    }
                    fontAT.rotate(current.angle * Math.PI / ((double) (180)), (double) fMetrics.stringWidth(current.innertxt) / 2, (double) fMetrics.getHeight() / 2);
                    if (current.angle != 0) {
                        fontAT.translate(0, ((double) fMetrics.getHeight() / 2) + (double) fMetrics.getDescent() + 4);
                    }
                    imageEps.setTransform(fontAT);

                    if (current.innertxt.length() > 0) {
                        value.addAttribute(TextAttribute.FONT, myFont, 0, current.innertxt.length());
                    }
                    if (current.isUnderlined) {
                        value.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
                    }
                    if (current.fontcolor != null) {
                        imageEps.setColor(Color.decode(current.fontcolor));
                    }
                    AttributedCharacterIterator iterator = value.getIterator();
                    if (current.width != 0) {
                        float breakWidth = new Float((current.width) * xAspect)+30;
                        float drawPosY = -fMetrics.getAscent();
                        float drawPosX = 0;
                        FontRenderContext fontRenderContext = imageEps.getFontRenderContext();
                        LineBreakMeasurer measurer = new LineBreakMeasurer(iterator, fontRenderContext);
                        int countLine = 0;
                        while (measurer.getPosition() < iterator.getEndIndex()) {
                            TextLayout textLayout = measurer.nextLayout(breakWidth);
                            if (countLine != 0 || current.angle == 0) {
                                drawPosY += textLayout.getAscent();
                            } else if (current.angle != 0 && measurer.getPosition() >= iterator.getEndIndex()) {
                                drawPosY += fMetrics.getAscent();
                            } else if (current.angle != 0 && measurer.getPosition() < iterator.getEndIndex()) {
                                drawPosY += fMetrics.getAscent() / 2;
                                drawPosX = (-fMetrics.getAscent() / 2) + 5;
                            }
                            textLayout.draw(imageEps, drawPosX, drawPosY);
                            drawPosY += textLayout.getDescent() + textLayout.getLeading();
                            countLine++;
                        }
                    } else {
                        imageEps.drawString(iterator, 0, 0);
                    }

                } else {
                    String imageId[] = current.innertxt.split(",");
                    String imageSrc = "";
                    sql = "SELECT source FROM uploads WHERE id=" + imageId[0];
                    ResultSet rs = executeQuery();
                    if (rs != null && rs.next()) {
                        imageSrc = rs.getString(1);
                        BufferedImage logoImage = readBackgroundImage(imagePath + imageSrc);
                        AffineTransform af = new AffineTransform();
                        BufferedImage resizedImage = new BufferedImage((int) (current.width * xAspect), (int) (current.height * yAspect), logoImage.getType() == 0 ? 5 : logoImage.getType());
                        Graphics2D gItem = resizedImage.createGraphics();
                        gItem.drawImage(logoImage, 0, 0, (int) (current.width * xAspect), (int) (current.height * yAspect), null);
                        gItem.dispose();

                        af.translate(current.xposition * xAspect, current.yposition * yAspect);
                        af.rotate(Math.toRadians(current.angle));
                        imageEps.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                        imageEps.drawImage(resizedImage, af, null);
                    }
                }
            }
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 6;
        } finally {
            try {
                if (!connection.isClosed()) {
                    connection.close();
                }
            } catch (Exception ex) {
                Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public int createZipFile() {
        FileInputStream inputStream = null;
        ZipOutputStream outputStream = null;
        try {
            byte[] buf = new byte[1024];
            String outFilename = epsPath + "outfile_" + cardId + ".zip";
            outputStream = new ZipOutputStream(new FileOutputStream(outFilename));
            for (int i = 0; i < filenames.size(); i++) {
                inputStream = new FileInputStream(filenames.get(i));
                outputStream.putNextEntry(new ZipEntry(filenames.get(i).substring(filenames.get(i).lastIndexOf("/") + 1, filenames.get(i).length())));
                int len;
                while ((len = inputStream.read(buf)) > 0) {
                    outputStream.write(buf, 0, len);
                }
                outputStream.closeEntry();
            }
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 6;
        } finally {
            try {
                if (inputStream != null)
                    inputStream.close();
                if (outputStream != null) 
                    outputStream.close();
            } catch (IOException ex) {
                Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public int createPng() {
        Process retValue=null;
        try {
            String command = goScriptPath+" -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r250 -sOutputFile="
                    + epsPath + "Front_EPS_" + cardId + ".png " + filenames.get(filenames.indexOf(epsPath + "Front_EPSImage_" + cardId + ".eps"));

            String[] cmd = command.split(" ");
            retValue = Runtime.getRuntime().exec(cmd);
            retValue.waitFor();
            command = goScriptPath+" -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r250 -sOutputFile="
                    + epsPath + "OtherSides_EPS_" + cardId + ".png " + filenames.get(filenames.indexOf(epsPath + "OtherSides_EPSImage_" + cardId + ".eps"));

            cmd = command.split(" ");
            retValue = Runtime.getRuntime().exec(cmd);
            retValue.waitFor();
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 7;
        } finally {
            retValue.destroy();
        }
    }

    public static void main(String[] args) {
        // TODO code application logic here
        int errorMessage;
        String idfromphp = args[0];
        //String idfromphp = "190";
        if (idfromphp == null || idfromphp.equals("")) {
            errorMessage = 1;
        } else {
             EPSAKalender EPSAK = new EPSAKalender(idfromphp,args[1]);
           errorMessage = EPSAK.getJsonFromDb();
            errorMessage = EPSAK.parseJson();
            errorMessage = EPSAK.renderImage();
            errorMessage = EPSAK.createZipFile();
            errorMessage = EPSAK.createPng();
        }
    }
}