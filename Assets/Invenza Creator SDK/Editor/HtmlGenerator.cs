using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;


public class HtmlGenerator : MonoBehaviour
{

    private string myFilePath;
    private GameObject manager;
    private DownloadUtils dUtils;

    public int numBoton = 0;

    private string date = System.DateTime.UtcNow.Millisecond.ToString();

    public string headerStart = "<!DOCTYPE html><html><head><meta charset='utf-8'><meta content='initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no' name='viewport'><title>Prueba Panolens</title><script src='js/three.min.js'></script><script src='js/panolens.min.js '></script><style>html,body {width: 100%;height: 100%;overflow: hidden;margin: 0;}#container {width: 100%;height: 100%;}#deviceType{text-align: center;font-family: Arial, Helvetica, sans-serif;font-size: 3rem;font-weight: bold;color: #08f}#permission{padding: 2rem 5rem;background: #08f;color: white;margin-top: 30;font-family: Arial, Helvetica, sans-serif;font-size: 3rem;border: none;border-radius: 1rem}#permissionStatus{text-align: center;font-family: Arial, Helvetica, sans-serif;font-size: 2.5rem;font-weight: 600;color: red;margin-top: 30px}</style></meta></meta></head><body>";

    public string stopVideo = "function stopVideo(){ var  videosTag = document.getElementsByTagName('video');for ( var  i = videosTag.length - 1; i >= 0; i--) {videosTag[i].pause();}}";

    public string footer = "</body></html>";
    public enum tipoBoton
    {

        Imagen,
        Texto,
        Video,
        Cerrar,
        Adelante,
        Atras,
        Play,
        Pausar,
    };

    public enum tipoPanorama
    {
        Video,
        Imagen,
    };

    public string variablesGenericas = " var  panorama, viewer;   var  arrayGroupPanels=[]; ";

    public string varContainer = " var  container = document.querySelector('#container');";





    // Start is called before the first frame update
    void Start()
    {
        //myFilePath = dUtils.GetAndroidInternalFilesDir() + "/LogFile" + date + ".txt";
        myFilePath = Application.streamingAssetsPath + "/LogFile" + date + ".txt";

        if (File.Exists(myFilePath))
        {
            try
            {
                File.Delete(myFilePath);
                Debug.Log("file deleted");
            }
            catch (System.Exception e)
            {
                Debug.Log("cannot delete de file");
            }
        }
    }
    public void WriteToFile(string message)
    {
        try
        {
            StreamWriter fileWriter = new StreamWriter(myFilePath, true);


            fileWriter.Write(message);
            fileWriter.WriteLine();
            fileWriter.Close();
        }
        catch (System.Exception e)
        {
            Debug.Log("Cannot write into the file" + e);
        }
    }


    public string CrearBoton(string path, string NombreBoton, tipoBoton tipo, string idVideo, string grupoPanel, string frameLayout)
    {
        string pathIcono = "";
        string boton = "";
        string posicionBoton = "";
        if (numBoton == 0)
        {
            posicionBoton = "-49, -33, -299";
        }
        else if (numBoton == 1)
        {
            posicionBoton = "-32, -33, -299";
        }
        else if (numBoton == 2)
        {
            posicionBoton = "-15, -33, -299";
        }
        else if (numBoton == 3)
        {
            posicionBoton = "2,-33,-299";
        }

        switch (tipo)
        {
            case tipoBoton.Video:
                {
                    boton = boton + "  var  video" + idVideo + " = document.getElementById('" + idVideo + "');";

                    /*Button Play*/
                    pathIcono = "assets/iconoPlay.png";
                    boton += "  var  " + NombreBoton + "TextPlay = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnPlay" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "TextPlay}));" +
                    "btnPlay" + NombreBoton + ".position.set(19, -33, -299);" +
                    "btnPlay" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnPlay" + NombreBoton + ".name = '" + NombreBoton + "_Play" + "';" +
                    "btnPlay" + NombreBoton + ".addEventListener('click', function(event) {   video" + idVideo + ".play();  });";

                    /*Button Pause*/
                    pathIcono = "assets/iconoPause.png";
                    boton = boton + "  var  " + NombreBoton + "TextPause = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnPause" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "TextPause}));" +
                    "btnPause" + NombreBoton + ".position.set(33, -33, -299);" +
                    "btnPause" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnPause" + NombreBoton + ".name = '" + NombreBoton + "_Pause" + "';" +
                    "btnPause" + NombreBoton + ".addEventListener('click', function(event) { video" + idVideo + ".pause();  });";

                    /*Button Video*/
                    pathIcono = "assets/iconoVideo.png";
                    boton = boton + "  var  " + NombreBoton + "TextVideo= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  " + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "TextVideo}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                    boton = boton + " var  texture" + NombreBoton + " = new THREE.VideoTexture( video" + idVideo + ");texture" + NombreBoton + ".minFilter = THREE.LinearFilter;texture" + NombreBoton + ".magFilter = THREE.LinearFilter;texture" + NombreBoton + ".format = THREE.RGBFormat;";
                    boton = boton + "" + frameLayout + ".material = new THREE.MeshBasicMaterial({map: texture" + NombreBoton + "}); hideBtnPlayAndPause();  " + grupoPanel + ".add(btnPlay" + NombreBoton + ");" + grupoPanel + ".add(btnPause" + NombreBoton + ");";
                    boton = boton + " hideBtnNextAndPrev(); stopVideo();   video" + idVideo + ".currentTime=0; video" + idVideo + ".play();  });  " + grupoPanel + ".add(" + NombreBoton + ");";
                }
                break;
            case tipoBoton.Imagen:
                {
                    boton = " var  pivot" + NombreBoton + " = 0; ";
                    boton = boton + "   var  arrayImgs" + NombreBoton + " = '" + path + "'.split('&&');  ";

                    /*Button Atras*/
                    pathIcono = "assets/iconoAtras.png";
                    boton = boton + "  var  " + NombreBoton + "textAtras = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnAtras" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textAtras}));" +
                    "btnAtras" + NombreBoton + ".position.set(19, -33, -299);" +
                    "btnAtras" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnAtras" + NombreBoton + ".name = '" + NombreBoton + "_Prev';" +
                    "btnAtras" + NombreBoton + ".addEventListener('click', function(event) {    if (pivot" + NombreBoton + " > 0) {  var  texture = new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[--pivot" + NombreBoton + "]);" +
                    "  " + frameLayout + ".material = new THREE.MeshBasicMaterial({ map: texture });  }  }); ";

                    /*Button Adelante*/
                    pathIcono = "assets/iconoAdelante.png";
                    boton = boton + "  var  " + NombreBoton + "textAdelante = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnAdelante" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textAdelante}));" +
                    "btnAdelante" + NombreBoton + ".position.set(33, -33, -299);" +
                    "btnAdelante" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnAdelante" + NombreBoton + ".name = '" + NombreBoton + "_Next';" +
                    "btnAdelante" + NombreBoton + ".addEventListener('click', function(event) { if (pivot" + NombreBoton + " < arrayImgs" + NombreBoton + ".length - 1) {  var  texture = new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[++pivot" + NombreBoton + "]);" +
                    "   " + frameLayout + ".material = new THREE.MeshBasicMaterial({ map: texture });  } }); ";

                    /*Button Imagen*/
                    pathIcono = "assets/iconoImg.png";
                    boton = boton + "  var  imgInit" + NombreBoton + " = new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[0]);";
                    boton = boton + "  var  " + NombreBoton + "textImg= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  " + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textImg}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';  " +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                    boton = boton + "  " + frameLayout + ".material = new THREE.MeshBasicMaterial({map: imgInit" + NombreBoton + "}); hideBtnNextAndPrev(); " + grupoPanel + ".add(btnAdelante" + NombreBoton + ");" + grupoPanel + ".add(btnAtras" + NombreBoton + ");";
                    boton = boton + "    stopVideo();         hideBtnPlayAndPause(); pivot" + NombreBoton + " = 0;  }); " + grupoPanel + ".add(" + NombreBoton + ");";


                }
                break;
            case tipoBoton.Texto:
                {

                    boton = " var  pivot" + NombreBoton + " = 0; ";
                    boton = boton + "   var  arrayImgs" + NombreBoton + " = '" + path + "'.split('&&');  ";

                    /*Button Atras*/
                    pathIcono = "assets/iconoAtras.png";
                    boton = boton + "  var  " + NombreBoton + "textAtras = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnAtras" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textAtras}));" +
                    "btnAtras" + NombreBoton + ".position.set(19, -33, -299);" +
                    "btnAtras" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnAtras" + NombreBoton + ".name = '" + NombreBoton + "_Prev';" +
                    "btnAtras" + NombreBoton + ".addEventListener('click', function(event) {    if (pivot" + NombreBoton + " > 0) {  var  texture = new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[--pivot" + NombreBoton + "]);" +
                    "  " + frameLayout + ".material = new THREE.MeshBasicMaterial({ map: texture });  }  }); ";

                    /*Button Adelante*/
                    pathIcono = "assets/iconoAdelante.png";
                    boton = boton + "  var  " + NombreBoton + "textAdelante = new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  btnAdelante" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textAdelante}));" +
                    "btnAdelante" + NombreBoton + ".position.set(33, -33, -299);" +
                    "btnAdelante" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "btnAdelante" + NombreBoton + ".name = '" + NombreBoton + "_Next';" +
                    "btnAdelante" + NombreBoton + ".addEventListener('click', function(event) { if (pivot" + NombreBoton + " < arrayImgs" + NombreBoton + ".length - 1) {  var  texture = new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[++pivot" + NombreBoton + "]);" +
                    "   " + frameLayout + ".material = new THREE.MeshBasicMaterial({ map: texture });  } }); ";

                    /*Button Imagen*/
                    pathIcono = "assets/iconoTxt.png";
                    boton = boton + "  var  imgInit" + NombreBoton + "= new THREE.TextureLoader().load(arrayImgs" + NombreBoton + "[0]);";
                    boton = boton + "  var  " + NombreBoton + "textImg= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  " + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "textImg}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';  " +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                    boton = boton + "  " + frameLayout + ".material = new THREE.MeshBasicMaterial({map: imgInit" + NombreBoton + "}); hideBtnNextAndPrev(); " + grupoPanel + ".add(btnAdelante" + NombreBoton + ");" + grupoPanel + ".add(btnAtras" + NombreBoton + ");";
                    boton = boton + "    stopVideo();         hideBtnPlayAndPause();  pivot" + NombreBoton + " = 0; }); " + grupoPanel + ".add(" + NombreBoton + ");";
                }
                break;
            case tipoBoton.Cerrar:
                {
                    pathIcono = "assets/iconoCerrar.png";
                    boton = " var  " + NombreBoton + "_cerrar" + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    " var  " + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "_cerrar}));" +
                    "" + NombreBoton + ".position.set(48, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "_cerrar" + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {  " + grupoPanel + ".visible = false;       stopVideo();      });   " + grupoPanel + ".add(" + NombreBoton + ");";
                }
                break;


        }
        numBoton++;
        return boton;
    }
    public string CreateVideoHTML(string id, string url)
    {
        return "<video crossorigin='anonymous' id='" + id + "' loop='' playsinline='' style='display:none'><source src='" + url + "' type='video/mp4' codecs='avc1.42E01E, mp4a.40.2'></source></video>";
    }
    public string CreateContainerHTML()
    {
        return "<div id='container'></div>";
    }

    public string CreateFrameLayout(string frameLayoutName, string grupoPanel)
    {
        return " var  " + frameLayoutName + " = new THREE.Mesh(new THREE.PlaneGeometry(150, 100), new THREE.MeshBasicMaterial({color: 0xF0F8FF}));" + frameLayoutName + ".position.set(0, 7, -300);" + frameLayoutName + ".lookAt(0, 0, 0);" + frameLayoutName + ".scale.set(0.65, 0.65, 0.65);" + frameLayoutName + ".name = '" + frameLayoutName + "';" + frameLayoutName + ".material.needsUpdate = true;  " + grupoPanel + ".add(" + frameLayoutName + ");";
    }

    public string CreatePanelHTML(string panelName, string grupoPanel)
    {
        return " const " + panelName + "textura = new THREE.TextureLoader().load('assets/CanvasMat_MainTex.png');  var  " + panelName + " = new THREE.Mesh(new THREE.PlaneGeometry(175, 125), new THREE.MeshBasicMaterial({map: " + panelName + "textura}));" + panelName + ".position.set(0, 0, -302);" + panelName + ".lookAt(0, 0, 0);" + panelName + ".scale.set(0.65, 0.65, 0.65); " + panelName + ".name = '" + panelName + "';  " + grupoPanel + ".add(" + panelName + ");";
    }
    public string CreatePanorama(string fileName, tipoPanorama pan)
    {
        tipoPanorama tipoPan = pan;
        if (tipoPan == tipoPanorama.Video)
        {
            return "panorama = new PANOLENS.VideoPanorama('" + fileName + "', {autoplay: true, loop: true, muted: false, crossOrigin: 'anonymous',});";
            //return "panorama = new PANOLENS.VideoPanorama('', { loop: true, muted: false,crossOrigin: 'anonymous', videoElement: videopanorama,}); ";
        }
        else
        {
            return "panorama = new PANOLENS.ImagePanorama( '" + fileName + "' );";
        }
    }
    public string CreateViewerHTML()
    {
        return "viewer = new PANOLENS.Viewer({container: container,output: 'console', autoHideInfospot: false, controlButtons: ['video'],});viewer.add(panorama);";
    }

    public string CreateInfoSpot(string infoSpotNumber, string infoSpotName, string infoSpotPosition, string InfoSGroup,string infoScale)
    {
        return " var " + infoSpotName + " = new PANOLENS.Infospot(85, 'assets/hsb" + infoSpotNumber + ".png" + "');" + infoSpotName + ".name = '" + infoSpotName + "';" + infoSpotName + ".position.set(" + infoSpotPosition + ");" + infoSpotName + ".scale.set("+infoScale+");" + infoSpotName + ".addEventListener('click', function() {" + InfoSGroup + ".visible = true;});panorama.add(" + infoSpotName + ");";
    }

    public string createHidePlayAndPause()
    {
        return "function hideBtnPlayAndPause(){ for ( var  i = arrayGroupPanels.length - 1; i >= 0; i--) { arrayGroupPanels[i].children.map(function (object) {  if (object.name.includes('Play')) { arrayGroupPanels[i].remove(object); } }); arrayGroupPanels[i].children.map(function (object) { if (object.name.includes('Pause')) { arrayGroupPanels[i].remove(object); } }); } }";
    }

    public string createHideNextAndPrev()
    {
        return "function hideBtnNextAndPrev(){ for ( var  i = arrayGroupPanels.length - 1; i >= 0; i--) { arrayGroupPanels[i].children.map(function (object) {  if (object.name.includes('Next')) { arrayGroupPanels[i].remove(object); } }); arrayGroupPanels[i].children.map(function (object) { if (object.name.includes('Prev')) { arrayGroupPanels[i].remove(object); } }); } }";
    }

    public string stopfunction()
    {
        return "function stopVideo(){var videosTag = document.getElementsByTagName('video');for (var i = videosTag.length - 1; i >= 0; i--){videosTag[i].pause();}}";
    }

    public string createGrupoPanel(string nameGrupo, string position, string scale)
    {
        return " var  " + nameGrupo + " = new THREE.Group();  " + nameGrupo + ".name = '" + nameGrupo + "';   " + nameGrupo + ".position.set(" + position + ");" + nameGrupo + ".scale.set(" + scale + ");" + nameGrupo + ".lookAt(0, 0, 0);" + nameGrupo + ".visible=false; arrayGroupPanels.push(" + nameGrupo + ");panorama.add(" + nameGrupo + ");";
    }

    public string CreatePanoTag(string vidpath)
    {
        return "<video crossorigin='anonymous' id='Video_PANO' loop playsinline style='display:none'>< source src = '" + vidpath + "' type = 'video/mp4' codecs = 'avc1.42E01E, mp4a.40.2' ></ source ></ video > ";
    }

    public string addVideoPanorama()
    {
        return "var videopanorama = document.getElementById('Video_PANO'); videopanorama.preload = 'auto';";
    }

    public string addWidgets()
    {
        return "var cardboardWidget = {style:{backgroundImage: 'url(assets/CardBoard_icon_blanco_1.png)',float: 'right'},onTap: function() {requestPermission();}};var orbitWidget = {style: {backgroundImage: 'url(assets/icon_blanco_360.png)',float: 'right'},onTap: function() {viewer.enableEffect(PANOLENS.MODES.NORMAL);viewer.enableControl(PANOLENS.CONTROLS.ORBIT);}};viewer.appendControlItem(cardboardWidget);viewer.appendControlItem(orbitWidget);viewer.hideVideoWidget();"; 
    }

    public string ScriptIOS()
    {
        return "<script>function requestPermission(){if (typeof DeviceMotionEvent.requestPermission === 'function'){DeviceMotionEvent.requestPermission().then(response => {console.log(response);if (response == 'granted'){console.log('Motion granted');viewer.enableEffect(PANOLENS.MODES.CARDBOARD);viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);}}).catch (error => {console.log(error);});DeviceOrientationEvent.requestPermission().then(response => {if (response == 'granted'){console.log('Orientation granted');viewer.enableEffect(PANOLENS.MODES.CARDBOARD);viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);}}).catch (error => {console.log(error)})} else {console.log('non iOS 13');viewer.enableEffect(PANOLENS.MODES.CARDBOARD);viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);}}</script>";
    }
}
