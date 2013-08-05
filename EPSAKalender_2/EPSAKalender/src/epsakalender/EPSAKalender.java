/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package epsakalender;

import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.font.LineBreakMeasurer;
import java.awt.font.TextAttribute;
import java.awt.font.TextLayout;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.text.AttributedCharacterIterator;
import java.text.AttributedString;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
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

/**
 *
 * @author Ahmed Abdullah Saeed
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
    private String txtfilePath;
    private String frontBackground;
    private String otherBackground;
    private String otherSides;
    private JSONArray frontSide;
    private JSONArray shapeSide;
    private JSONArray backSide;
    private JSONObject orderForm;
    private JSONArray overlaySide;
    private String sql;
    private PreparedStatement exeStatement;
    private static final String propertyString = "message.properties";
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
    private LinkedList<parseFrontJson> parseArray;
    private LinkedList<parseBackJson> parseBackArray;
    private LinkedList<parseShapeJson> parseShapeJson;
    private LinkedList<parseOverlayJson> parseOverlayJson;
    private LinkedList<parseOrderForm> parseOrderFormArray;
    //Zain
    private String sideColor;
    private String fillingName;
    private String formatName;
    private String address = "";
    private boolean isShape=false;
    private double topLeft=0;
    private double topRight=0;
    private String overlayPath;
    private double overlayX=0;
    private double overlayY=0;
    private double overlayWidth=0;
    private double overlayHeight=0;
    private Graphics2D overlayItem;
    private String HSKValue1="";
    private String HSKValue2="";
    private String orderFormText="";
    //

    public EPSAKalender(String id) {
        cardId = id;
        properties = new Properties();
        filenames = new LinkedList<String>();
        parseArray = new LinkedList<parseFrontJson>();
        parseBackArray = new LinkedList<parseBackJson>();
        parseShapeJson = new LinkedList<parseShapeJson>();
        parseOverlayJson = new LinkedList<parseOverlayJson>();
        parseOrderFormArray=new LinkedList<parseOrderForm>();
        json = "";
        epsPath = "";
        imagePath = "";
        txtfilePath = "";
        otherSides = null;
        frontSide = null;
        shapeSide=null;
        backSide = null;
        overlaySide=null;
        orderForm=null;
        frontFileToSave = "";
        otherFileToSave = "";
        bgWidth = 0;
        bgHeight = 0;
        xAspect = 0;
        yAspect = 0;
        width = 0;
        height = 0;
        overlayPath="";
        topLeft=0;
        topRight=0;
        overlayItem=null;
        getProperties(propertyString);
    }

    private int getProperties(String propertiesName) {
        InputStream inputStream = null;
        try {
            inputStream = EPSAKalender.class.getClassLoader().getResourceAsStream(propertiesName);
            if (inputStream != null) {
                properties.load(inputStream);
                connect = properties.getProperty("CONNECT");
                epsPath = properties.getProperty("EPSPATH");
                imagePath = properties.getProperty("IMAGEPATH");
                backgroundPath = properties.getProperty("BACKGROUNDPATH");
                txtfilePath = properties.getProperty("TXTFILE");
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
                System.out.println(json);
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

                if (items.get("frontSide") != null) {
                    frontSide = (JSONArray) items.get("frontSide");
                    shapeSide = (JSONArray) items.get("triangle");
                    overlaySide=(JSONArray) items.get("overlayItem");
                    frontFileToSave = epsPath + "Front_EPSImage_" + cardId + ".eps";
                    addFileToList(epsPath + "Front_EPSImage_" + cardId + ".eps");
                }
                if (items.get("frontBackground") != null) {
                    frontBackground = (String) items.get("frontBackground");
                    addFileToList(backgroundPath + frontBackground);
                }
                if (items.get("sideColor") != null) {
                    sideColor = (String) items.get("sideColor");
                }
                if (items.get("format") != null) {
                    formatName = (String) items.get("format");
                }
                if (items.get("filling") != null) {
                    fillingName = (String) items.get("filling");
                }
                if (items.get("HSKValue1") != null) {
                    HSKValue1= items.get("HSKValue1").toString();
                }
                if (items.get("HSKValue2") != null) {
                    HSKValue2= items.get("HSKValue2").toString();
                }
                orderForm= (JSONObject) items.get("orderForm");
                if(orderForm!=null){
                    if(orderForm.get("emailField")!=null && !orderForm.get("emailField").equals("")){
                        orderFormText = orderFormText +"\r\n\r\n";
                        orderFormText = orderFormText +"FIRMA :"+ orderForm.get("firmaField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"STRASSE :"+ orderForm.get("strasseField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"ANREDE :"+ orderForm.get("anredeField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"PLZ :"+ orderForm.get("plzField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"ORT :"+ orderForm.get("ortField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"VORNAME :"+ orderForm.get("vornameField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"LAND :"+ orderForm.get("landField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"NACHNAME :"+ orderForm.get("nachnameField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"TELEFON :"+ orderForm.get("telefonField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"EMAIL :"+ orderForm.get("emailField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"ANZAHL DER GEW\u00DCNSCHEN ADVENTSKALENDER :"+ orderForm.get("anzahlField").toString()+ "\r\n\r\n";
                        orderFormText = orderFormText +"HIER IST PLATZ F\u00DCR LHRE ANMERKUNGEN UND FRAGEN :"+ orderForm.get("commentField").toString()+ "\r\n\r\n";
                    }
                }
                if (items.get("backSide") != null) {
                    backSide = (JSONArray) items.get("backSide");
                    if (backSide != null) {
                            for (int i = 0; i < backSide.size(); i++) {
                                JSONObject object = (JSONObject) backSide.get(i);
                                parseBackJson parseback = new parseBackJson(object);
                                parseBackArray.push(parseback);
                            }


                        for (int i = parseBackArray.size(); i > 0; i--) {
                            parseBackJson current = parseBackArray.get(i - 1);
                            //AffineTransform a = imageEps.getTransform();

                            if (!current.isHeader) {
                                address = address + current.inputValue + "\r\n\r\n";
                            } else if (current.isHeader) {
                                if(!current.inputValue.equals(""))
                                address = address + current.inputValue + ":";
                            }
                        }

                        addFileToList(txtfilePath + "Other Information.txt");
                    }
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
            if (renderSides("front") != 0) {
                return 4;
            }
            return 0;
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return 4;
        }
    }

    public BufferedImage overlayImages(BufferedImage bgImage, BufferedImage fgImage) {
        Graphics2D createImage=null;
        try{
            /**
             * Doing some preliminary validations.
             * Foreground image height cannot be greater than background image height.
             * Foreground image width cannot be greater than background image width.
             *
             * returning a null value if such condition exists.
             */
            /* if (fgImage.getHeight() > bgImage.getHeight()
            || fgImage.getWidth() > fgImage.getWidth()) {
            JOptionPane.showMessageDialog(null,
            "Foreground Image Is Bigger In One or Both Dimensions"
            + "\nCannot proceed with overlay."
            + "\n\n Please use smaller Image for foreground");
            return null;
            }
             */
            /**Create a Graphics  from the background image**/
            BufferedImage bf=new BufferedImage(bgWidth,bgHeight,BufferedImage.TYPE_INT_ARGB);
            createImage=bf.createGraphics();
            //createImage=bgImage.createGraphics();
            /**Set Antialias Rendering**/

            /**
             * Draw background image at location (0,0)
             * You can change the (x,y) value as required
             */
            createImage.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            createImage.setBackground(Color.WHITE);
            createImage.fillRect(0, 0, bgWidth, bgHeight);
            createImage.translate(topLeft, topRight);
            createImage.drawImage(bgImage,0,0, bgImage.getWidth(), bgImage.getHeight(), null);
            createImage.translate(-topLeft, -topRight);
            float height=((float)bgImage.getWidth()/(float)bgImage.getHeight())*bgImage.getHeight();
            createImage.drawImage(fgImage, 0, 0, bgImage.getWidth(), (int)height, null);

            return bf;
        }catch(Exception ex){
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } finally {
            if(createImage!=null)
                createImage.dispose();

        }
    }

    public void writeImage(BufferedImage img, String fileLocation, String extension) {
        try {
            BufferedImage bi = img;
            File outputfile = new File(fileLocation);
            ImageIO.write(bi, extension, outputfile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public int renderSides(String side) {
        FileOutputStream fout = null;
        BufferedImage backgroundImage = bgImageDimension();
        try {
            if (backgroundImage != null) {
                if (side.equals("front")) {
                    if (frontSide != null) {
                        for (int i = 0; i < frontSide.size(); i++) {
                            JSONObject object = (JSONObject) frontSide.get(i);
                            parseFrontJson parse = new parseFrontJson(object);
                            parseArray.push(parse);
                        }
                        fout = new FileOutputStream(new File(frontFileToSave));
                        if(shapeSide!=null){
                            for (int i = 0; i < shapeSide.size(); i++) {
                                JSONObject object = (JSONObject) shapeSide.get(i);
                                parseShapeJson parse = new parseShapeJson(object);
                                parseShapeJson.push(parse);
                            }
                        }
                        if(overlaySide!=null){
                            for (int i = 0; i < overlaySide.size(); i++) {
                                JSONObject object = (JSONObject) overlaySide.get(i);
                                parseOverlayJson parse = new parseOverlayJson(object);
                                parseOverlayJson.push(parse);
                            }
                        }
                        imageEps = new EpsGraphics("EPSImage", fout, 0, 0, bgWidth, bgHeight, ColorMode.COLOR_RGB);
                        if (epsDrawing(fout,backgroundImage) != 0) {
                            return 6;
                        }
                    } else {
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

    public BufferedImage bgImageDimension() {
        BufferedImage bkImage = null;
        try {
            bkImage = readBackgroundImage(backgroundPath + frontBackground);
            if (bkImage != null) {
                bgWidth = bkImage.getWidth();
                bgHeight = bkImage.getHeight();
                double bgAspect = (double) bgWidth / (double) bgHeight;
                if(bgWidth>980){
                    width = 980;
                    height = (width * bgHeight) / bgWidth;
                }else{
                    width=bgWidth;
                    height=bgHeight;
                }
                xAspect = (double) bgWidth / (double) width;
                yAspect = (double) bgHeight / height;

            }
        } catch (Exception ex) {
            Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            //return 5;
        }
        return bkImage;
    }

    public BufferedImage readBackgroundImage(String background) {
        InputStream bkCardIn = null;
        try {
            File file = new File(background);
            bkCardIn = new FileInputStream(file);
            BufferedImage bkImage = null;
            //try{
                bkImage = ImageIO.read(bkCardIn);
            /*}catch(IIOException ce) {
                SeekableStream seekableStream = new FileSeekableStream(file);
                ParameterBlock pb = new ParameterBlock();
                ColorModel cm = new ComponentColorModel(ColorSpace.getInstance(ColorSpace.TYPE_CMYK), new int[] {32}, false, false, Transparency.OPAQUE, DataBuffer.TYPE_BYTE);
                pb.add(cm);
                pb.add(seekableStream);
                bkImage = JAI.create("jpeg", pb).getAsBufferedImage();
            } catch(CMMException ce) {
                SeekableStream seekableStream = new FileSeekableStream(file);
                ParameterBlock pb = new ParameterBlock();
                pb.add(seekableStream);
                bkImage = JAI.create("jpeg", pb).getAsBufferedImage();
            }*/

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
    public BufferedImage createOverlay(double widthOverlay, double heightOverlay,double rotate){
        Graphics2D createImage=null;

        try{
            BufferedImage bf=new BufferedImage((int)widthOverlay,(int)heightOverlay,BufferedImage.TYPE_INT_ARGB);
            createImage=bf.createGraphics();
            createImage.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            createImage.setColor(Color.WHITE);
            createImage.fillRect(0, 0, (int)widthOverlay, (int)heightOverlay);
            //createImage.dispose();
            return bf;
        }catch(Exception ex){

        }finally{
            if(createImage!=null)createImage.dispose();
        }
        return null;
    }
    public BufferedImage drawOverlayOnEPS(){
        overlayX=Math.round(parseOverlayJson.get(0).xposition*xAspect);
        overlayY=Math.round(parseOverlayJson.get(0).yposition*yAspect);
        overlayWidth=Math.round(parseOverlayJson.get(0).width*xAspect);
        overlayHeight=Math.round(parseOverlayJson.get(0).height*yAspect);
        BufferedImage textOverlayBuffer=createOverlay(overlayWidth,overlayHeight,0);
        if(parseArray.size()==0){
            imageEps.drawImage(textOverlayBuffer,(int)overlayX,(int)overlayY,null);
        }

        double xOverlay=Math.round(parseOverlayJson.get(0).addressXposition*xAspect);
        double yOverlay=Math.round(parseOverlayJson.get(0).addressYposition*yAspect);
        double widthOverlay=Math.round(parseOverlayJson.get(0).addressWidth*xAspect);
        double heightOverlay=Math.round(parseOverlayJson.get(0).addressHeight*yAspect)+4;
        BufferedImage addressBuffer=null;
        addressBuffer=createOverlay(widthOverlay,heightOverlay,parseOverlayJson.get(0).addressRotation);
        imageEps.translate((int)xOverlay,(int)yOverlay);
        imageEps.rotate(parseOverlayJson.get(0).addressRotation * Math.PI / ((double) (180)),widthOverlay/2,heightOverlay/2);
        imageEps.drawImage(addressBuffer,0,0,null);
        AttributedString value = new AttributedString(parseOverlayJson.get(0).addressText);
        double widthDiff = Math.floor(Double.valueOf(3) * (bgWidth / width));
        double heightDiff = Math.floor(Double.valueOf(3) * ((bgHeight / height)));
        double fontSize = widthDiff * 1.3;
        Font myFont = new Font("Arial",Font.PLAIN,1);
        FontMetrics fMetrics = imageEps.getFontMetrics(myFont);
        myFont=myFont.deriveFont(Font.PLAIN, (int) (fontSize));
        value.addAttribute(TextAttribute.FONT, myFont, 0, parseOverlayJson.get(0).addressText.length());

        AttributedCharacterIterator iterator = value.getIterator();
        textRenderOnEPS(parseOverlayJson.get(0).addressWidth,parseOverlayJson.get(0).addressRotation,"",fMetrics, iterator,null,6,0,0);
        return textOverlayBuffer;
    }
    public void textRenderOnEPS(double width,double angle,String textAlign,FontMetrics fMetrics,AttributedCharacterIterator iterator,BufferedImage overlayImage,int constNum,int textConst,double yConst){
        float breakWidth = new Float((width) * xAspect)+textConst;
        float drawPosY = -fMetrics.getAscent()+(float)yConst;
        //float drawPosY = 0;
        float drawPosX = 0;
        FontRenderContext fontRenderContext=null;
        if(overlayImage!=null){
            if(overlayItem==null){
                overlayItem=overlayImage.createGraphics();
            }
            overlayItem.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            fontRenderContext = overlayItem.getFontRenderContext();
        }else{
            fontRenderContext = imageEps.getFontRenderContext();
        }

        LineBreakMeasurer measurer = new LineBreakMeasurer(iterator, fontRenderContext);
        int countLine = 0;
        int prevPos=0;
        while (measurer.getPosition() < iterator.getEndIndex()) {
            TextLayout textLayout = measurer.nextLayout(breakWidth);
            /*double teHe=textLayout.getBounds().getHeight();
            float drawPosX = textLayout.isLeftToRight()? 0 : breakWidth - textLayout.getAdvance();

            // Move y-coordinate by the ascent of the
            // layout.
            drawPosY += textLayout.getAscent();
*/
            if (countLine != 0 || angle == 0) {
                drawPosY += (textLayout.getAscent());
            } else if (angle != 0 && measurer.getPosition() >= iterator.getEndIndex()) {
                drawPosY += fMetrics.getAscent();
            } else if (angle != 0 && measurer.getPosition() < iterator.getEndIndex()) {
                drawPosY += fMetrics.getAscent()+(fMetrics.getAscent() / 2);
                drawPosX = (-fMetrics.getAscent() / 2);
            }

            if(textAlign.equals("center"))
                drawPosX=(breakWidth-textLayout.getAdvance())/2;
            else if(textAlign.equals("right"))
                drawPosX=(breakWidth-textLayout.getAdvance());

            prevPos=measurer.getPosition();
            if(overlayImage!=null){
                AffineTransform fontAT = AffineTransform.getTranslateInstance(0, 0);
                overlayItem.setFont((Font)iterator.getAttribute(TextAttribute.FONT));
                overlayItem.setColor(imageEps.getColor());

                double xTextPosition=imageEps.getTransform().getTranslateX()-overlayX;
                double yTextPosition=imageEps.getTransform().getTranslateY()-overlayY;
                overlayItem.setTransform(fontAT);

                textLayout.draw(overlayItem,(int)xTextPosition+drawPosX, (int)yTextPosition+drawPosY);
                imageEps.setTransform(fontAT);
                imageEps.drawImage(overlayImage,(int)overlayX,(int)overlayY,null);
            }
            else
            {
                textLayout.draw(imageEps, drawPosX+constNum, drawPosY+constNum);
            }
            drawPosY += textLayout.getDescent() + textLayout.getLeading();
            countLine++;
        }
    }
    public int epsDrawing(FileOutputStream fout,BufferedImage bkImage) {
        try {
            //BufferedImage bkImage = readBackgroundImage(backgroundPath + frontBackground);
            BufferedImage overlayImage=null;
            BufferedImage textOverlay=null;
            if(parseShapeJson!=null && !parseShapeJson.isEmpty() && !parseShapeJson.get(0).imagePath.equals("")){
                topLeft=parseShapeJson.get(0).newBackgroundLeft;
                topRight=parseShapeJson.get(0).newBackgroundTop;
                BufferedImage fgImage = readBackgroundImage(backgroundPath + parseShapeJson.get(0).imagePath);
                overlayImage=overlayImages(bkImage, fgImage);
            }else{
                overlayImage=bkImage;
            }

            imageEps.setBackground(Color.WHITE);
            imageEps.drawRect(0, 0, bgWidth, bgHeight);
            imageEps.drawImage(overlayImage, 0, 0, bgWidth, bgHeight, null);

            if(parseOverlayJson!=null && !parseOverlayJson.isEmpty() && parseOverlayJson.get(0).isOverlay.equals("1")){
               textOverlay=drawOverlayOnEPS();
            }
            Collections.sort(parseArray, new Comparator<parseFrontJson>() {
                 @Override
                 public int compare(parseFrontJson o1, parseFrontJson o2) {
                     if(o1.istxt)
                         return 1;
                     else
                         return -1;
                 }
             });
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
                    //int fontSize = (int) Math.round(Integer.parseInt(current.fontSize) * screenRes / 72.0);

                    double widthDiff = Math.floor(Double.valueOf(current.fontSize) * (bgWidth / width));
                    double heightDiff = Math.floor(Double.valueOf(current.fontSize) * ((bgHeight / height)));
                    double fontSize = widthDiff * 1.3;

                    String fontFileName=current.fontStyle.replaceAll("\'", "").replaceAll("\"", "");
                    if(fontFileName!=null && !fontFileName.equals("")){
                        sql = "SELECT * FROM fontfile WHERE displayName='" +fontFileName +"'";
                        ResultSet rs = executeQuery();
                        if(rs!=null & rs.next()){
                            fontFileName=rs.getString("ttfFile");
                        }
                    }
                    //Path currentRelativePath = Paths.get("");
                    //String path = currentRelativePath.toAbsolutePath().toString();
                    //String classpath = System.getProperty("java.class.path");
                    //System.out.println("classPath="+classpath);
                    //int jarPos = classpath.indexOf("epsgraphics.jar");
                    //int jarPathPos = classpath.lastIndexOf(File.pathSeparatorChar, jarPos) + 1;
                    //String path = classpath.substring(jarPathPos, jarPos);

                    File fileIn = new File(".", fontFileName);
                    //File fileIn = new File(decoded, fontFileName);
                    //InputStream fontIn = this.getClass().getResourceAsStream(fontFileName);
                    Font myFont = Font.createFont(Font.TRUETYPE_FONT, fileIn);
                    myFont = myFont.deriveFont(fontStyle, (int) (fontSize));
                    FontMetrics fMetrics = imageEps.getFontMetrics(myFont);
                    double yConst=0;
                    double fontAscent=fMetrics.getAscent();
                    if(compareMetrics.getAscent()>fMetrics.getAscent()){
                        yConst=compareMetrics.getAscent()-fMetrics.getAscent();
                    }
                    
                    
                    GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
                    ge.registerFont(myFont);

//                    Font myFont = new Font("Arial", fontStyle, (int) (fontSize));

                    if (current.innertxt != null) {
                        value = new AttributedString(current.innertxt);
                    }
                    
                    if (current.angle != 0) {
                        fontAT.translate(new Float((current.xposition) * xAspect), new Float((current.yposition) * yAspect));
                    } else {
                        fontAT.translate(new Float((current.xposition) * xAspect), new Float((current.yposition) * yAspect) + fMetrics.getAscent());
                    }
                    int subPoint=current.innertxt.length();
                    if(current.innertxt.contains(" ")){
                        subPoint=current.innertxt.indexOf(" ");
                    }
                    fontAT.rotate(current.angle * Math.PI / ((double) (180)), (double) fMetrics.stringWidth(current.innertxt.substring(0, subPoint))/2, (double) fMetrics.getHeight() / 2);
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
                        textRenderOnEPS(current.width,current.angle,current.textAlign,fMetrics, iterator,textOverlay,0,40,yConst);
                            }
                } else {
                    String imageId[] = current.innertxt.split(",");
                    String imageSrc = "";
                    sql = "SELECT source FROM uploads WHERE id=" + imageId[0];
                    ResultSet rs = executeQuery();
                    imageEps.setTransform(AffineTransform.getTranslateInstance(0, 0));
                    AffineTransform at=imageEps.getTransform();

                    if (rs != null && rs.next()) {
                        imageSrc = rs.getString(1);
                        BufferedImage logoImage = readBackgroundImage(imagePath + imageSrc);
                        addFileToList(imagePath + imageSrc);
                        AffineTransform af = new AffineTransform();
                        BufferedImage resizedImage = new BufferedImage((int) (current.width * xAspect), (int) (current.height * yAspect), logoImage.getType() == 0 ? 5 : logoImage.getType());
                        Graphics2D gItem = resizedImage.createGraphics();
                        gItem.drawImage(logoImage, 0, 0, (int) (current.width * xAspect), (int) (current.height * yAspect), null);
                        gItem.dispose();
                        af.translate(-at.getTranslateX(),-at.getTranslateY());
                        af.translate(current.xposition * xAspect, current.yposition * yAspect);
                        af.rotate(Math.toRadians(current.angle));
                        imageEps.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                        if(textOverlay!=null){
                            if(overlayItem == null){
                                overlayItem=textOverlay.createGraphics();
                            }
                            AffineTransform overlayfontAT = AffineTransform.getTranslateInstance(0, 0);
                            AffineTransform overlayAF = new AffineTransform();
                            double xTextPosition=af.getTranslateX()-overlayX;
                            double yTextPosition=af.getTranslateY()-overlayY;
                            overlayItem.setTransform(overlayfontAT);
                            overlayAF.rotate(Math.toRadians(current.angle),xTextPosition+(current.width * xAspect)/2, yTextPosition+(current.height * yAspect)/2);
                            overlayAF.translate(xTextPosition, yTextPosition);
                            overlayItem.drawImage(resizedImage, overlayAF,null);
                            //imageEps.setTransform(overlayfontAT);
                            imageEps.drawImage(textOverlay,(int)overlayX,(int)overlayY,null);
                        }else{
                            imageEps.drawImage(resizedImage, af, null);
                            af.translate(at.getTranslateX(),at.getTranslateY());
                            imageEps.setTransform(af);
                        }
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

    public void makeTextFiles() {

        Writer writer = null;

        try {
            String text = "This is a text file";

            //File file = new File(txtfilePath + "Other Information.txt");
            writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(txtfilePath + "Other Information.txt"), "UTF-8"));
            writer.write("Filling Name: " + fillingName);
            writer.write("\r\n");
            writer.write("\r\n");
            writer.write("Format Name: " + formatName);
            writer.write("\r\n");
            writer.write("\r\n");
            if(sideColor!=null)
            {
            writer.write("Color For Other Sides: " + sideColor);
            writer.write("\r\n");
            writer.write("\r\n");
            }
            if (HSKValue1 != null) {
                writer.write("HSK 1: " + HSKValue1);
                writer.write("\r\n");
                writer.write("\r\n");
            }
            if (HSKValue2 != null) {
                writer.write("HSK 2: " + HSKValue2);
                writer.write("\r\n");
                writer.write("\r\n");
            }
            if(orderFormText!=null && !orderFormText.equals("")){
                writer.write("\r\n\r\nOrder Information: " + orderFormText);
                writer.write("\r\n");
                writer.write("\r\n");
            }
            writer.write("Address information: \r\n\r\n" + address);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //file name main add kerna hai
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
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException ex) {
                Logger.getLogger(EPSAKalender.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public int createPng() {
        Process retValue = null;
        try {
            String command = "/usr/bin/gs -dSAFER -dBATCH -dNOPAUSE -dEPSCrop -sDEVICE=png16m -r250 -sOutputFile="
                    + epsPath + "Front_EPS_" + cardId + ".png " + filenames.get(filenames.indexOf(epsPath + "Front_EPSImage_" + cardId + ".eps"));

            String[] cmd = command.split(" ");
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

    public int createPdf() {
        Process retValue = null;
        try {
            String command = "/usr/bin/gs -dSAFER -dBATCH -dNOPAUSE -dNOCACHE -sDEVICE=pdfwrite -dDEVICEWIDTHPOINTS="+bgWidth+" -dDEVICEHEIGHTPOINTS="+bgHeight+" -sOutputFile="
                    + epsPath + "Front_EPS_" + cardId + ".pdf " + filenames.get(filenames.indexOf(epsPath + "Front_EPSImage_" + cardId + ".eps"));

            String[] cmd = command.split(" ");
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
        String idfromphp = "222";
        if(args != null && args.length > 0){
            idfromphp = args[0];
        }

        if (idfromphp == null || idfromphp.equals("")) {
            errorMessage = 1;
        } else {
            EPSAKalender EPSAK = new EPSAKalender(idfromphp);
            errorMessage = EPSAK.getJsonFromDb();
            errorMessage = EPSAK.parseJson();
            errorMessage = EPSAK.renderImage();
            EPSAK.makeTextFiles();
            errorMessage = EPSAK.createZipFile();
            errorMessage = EPSAK.createPng();
            errorMessage = EPSAK.createPdf();
        }
    }
}
