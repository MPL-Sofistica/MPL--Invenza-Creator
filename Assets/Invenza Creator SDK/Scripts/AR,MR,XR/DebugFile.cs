using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEditor;

public class DebugFile : EditorWindow
{

    private string myFilePath;
    private GameObject manager;
    private DownloadUtils dUtils;

    private int numBoton = 0;

    private string date = System.DateTime.UtcNow.Millisecond.ToString();

    private string headerStart = "<!DOCTYPE doctype html><html><head><meta charset='utf-8'><meta content='initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no' name='viewport'><title>Prueba Panolens</title><script src='js/three.min.js'></script><script src='js/panolens.min.js '></script><style>html,body {width: 100%;height: 100%;overflow: hidden;margin: 0;}#container {width: 100%;height: 100%;}</style></meta></meta></head><body>";

    private string stopVideo = "function stopVideo(){var videosTag = document.getElementsByTagName('video');for (var i = videosTag.length - 1; i >= 0; i--) {videosTag[i].pause();}}";

    private string footer = "</script></body></html>";
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

    public string variablesGenericas = "var panorama, panorama, viewer;";

    public string varContainer = "var container = document.querySelector('#container');";





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


    public void CrearBoton(string Nombretextura, string NombreBoton, tipoBoton tipo, string idVideo, string grupoPanel)
    {
        string pathIcono = "";
        string boton = "";
        string posicionBoton = "";
        if (numBoton == 0)
        {
            posicionBoton = "-45, -33, -299";
        }
        else if (numBoton == 1)
        {
            posicionBoton = "-29, -33, -299";
        }
        else if (numBoton == 2)
        {
            posicionBoton = "-14, -33, -299";
        }
        else if (numBoton == 3)
        {
            posicionBoton = "-1,-33,-299";
        }

        switch (tipo)
        {
            case tipoBoton.Video:
                {
                    
                     pathIcono = "assets/iconoPlay";
                    boton = "var" + NombreBoton + "textPlay = new THREE.TextureLoader().load('" + pathIcono + "');"+
                    "var btnPlay" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "TextPlay}));";

                    pathIcono = "assets/iconoVideo";
                    boton = "var " + NombreBoton + "text= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                    boton = boton + "var texture = new THREE.VideoTexture(" + idVideo + ");texture.minFilter = THREE.LinearFilter;texture.magFilter = THREE.LinearFilter;texture.format = THREE.RGBFormat;";
                    boton = boton + "frameLayout.material = new THREE.MeshBasicMaterial({map: texture});" + grupoPanel + ".remove(btnPrev);" + grupoPanel + ".remove(btnNext);" + grupoPanel + ".add(btnPlay" + NombreBoton + ");" + grupoPanel + ".add(btnPause" + NombreBoton + ");";

                }
                break;
            case tipoBoton.Imagen:
                {
                    pathIcono = "assets/iconoImg";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Texto:
                {
                    pathIcono = "assets/iconoTxt";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(" + posicionBoton + ");" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Cerrar:
                {
                    pathIcono = "assets/iconoCerrar";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(46, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Adelante:
                {
                    pathIcono = "assets/iconoAdelante";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(30, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Atras:
                {
                    pathIcono = "assets/iconoAtras";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(15, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Play:
                {
                    pathIcono = "assets/iconoPlay";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(15, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
            case tipoBoton.Pausar:
                {
                    pathIcono = "assets/iconoPause";
                    boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
                    "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
                    "" + NombreBoton + ".position.set(30, -33, -299);" +
                    "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
                    "" + NombreBoton + ".name = '" + NombreBoton + "';" +
                    "" + NombreBoton + ".addEventListener('click', function(event) {";
                }
                break;
        }




        /* boton = "var" + Nombretextura + "= new THREE.TextureLoader().load('" + pathIcono + "');" +
        "var" + NombreBoton + "= new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({map: " + NombreBoton + "Text}));" +
        "" + NombreBoton + ".position.set(15, -33, -299);" +
        "" + NombreBoton + ".scale.set(0.8, 0.8, 0.8);" +
        "" + NombreBoton + ".name = '" + NombreBoton + "P1';" +
        "" + NombreBoton + ".addEventListener('click', function(event) {";
         if (pivot > 0)
         {
             var texture = new THREE.TextureLoader().load(arrayImgs[--pivot]);
             frameLayout.material = new THREE.MeshBasicMaterial({
                     map: texture
                 });
         }
         console.log(pivot);
         });";*/
        numBoton++;
    }
    public string CreateVideoHTML(string id, string url)
    {
        return "<video crossorigin='anonymous' id='" + id + "' loop='' playsinline='' style='display:none'><source src='" + url + "' type='video/mp4; codecs='avc1.42E01E, mp4a.40.2''></source></video>";
    }
    public string CreateContainerHTML()
    {
        return "<div id='container'></div>";
    }

    public string CreateFrameLayout(string frameLayoutName)
    {
        return "var " + frameLayoutName + " = new THREE.Mesh(new THREE.PlaneGeometry(150, 100), new THREE.MeshBasicMaterial({map: texture}));frameLayout.position.set(0, 7, -300);frameLayout.lookAt(0, 0, 0);frameLayout.scale.set(0.65, 0.65, 0.65);frameLayout.name = '" + frameLayoutName + "';frameLayout.material.needsUpdate = true;";
    }

    public string CreatePanelHTML(string panelName)
    {
        return " const" + panelName + "= new THREE.TextureLoader().load('assets/CanvasMat_MainTex.png');var panel = new THREE.Mesh(new THREE.PlaneGeometry(175, 125), new THREE.MeshBasicMaterial({map: texpanel}));panel.position.set(0, 0, -302);panel.lookAt(0, 0, 0);panel.scale.set(0.65, 0.65, 0.65);panel.name = '" + panelName + "';";
    }
    public string CreatePanorama(string fileName, tipoPanorama pan)
    {
        tipoPanorama tipoPan = pan;
        if (tipoPan == tipoPanorama.Video)
        {
            return "panorama = new PANOLENS.VideoPanorama('asset/" + fileName + "', {autoplay: true, loop: true, muted: false});";
        }
        else
        {
            return "panorama = new PANOLENS.ImagePanorama( 'asset/" + fileName + "' );";
        }
    }
    public string CreateViewerHTML()
    {
        return "viewer = new PANOLENS.Viewer({container: container,output: 'console'});viewer.add(panorama);";
    }

    public string CreateInfoSpot(string infoSpotNumber, string infoSpotName, string infoSpotPosition, string InfoSPanel)
    {
        return infoSpotName + " = new PANOLENS.Infospot(175, 'asset/" + infoSpotNumber + "');infospot.name = '" + infoSpotName + "';infospot.position.set(" + infoSpotPosition + ");infospot.addEventListener('click', function() {" + InfoSPanel + ".visible = true;});panorama.add(" + infoSpotName + ");";
    }

}
