using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEditor;
using System.IO;

public class test : EditorWindow
{
    public Camera camera;
    public Canvas canvasToSreenShot;
    public GameObject canv;
    // Use this for initialization
    private Texture2D screenShot;
    private RenderTexture rt;


    public delegate void takePictureHandler(byte[] pngArray);
    public static event takePictureHandler OnPictureTaken;

    private GameObject duplicatedTargetUI;
    private Image[] allImages;
    private Text[] allTexts;
    private Canvas[] allOtherCanvas;

    public enum SCREENSHOT_TYPE
    {
        IMAGE_AND_TEXT, IMAGE_ONLY, TEXT_ONLY
    }

    SCREENSHOT_TYPE types;

    [MenuItem("Invenza Creator SDK/Capturar texto a imagen")]

    public static void CrearVentana()
    {
        test ventana = (test)GetWindow(typeof(test));
        ventana.maxSize = new Vector2(600, 700);
        ventana.minSize = new Vector2(500, 700);
        ventana.titleContent.text = "Invenza Creator Capturar Imagen";
    }


    private void OnGUI()
    {
        GUILayout.Label("Conversor de texto a imagen", EditorStyles.boldLabel);


        canv = EditorGUILayout.ObjectField("Objeto con el canvas", canv, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;

        camera = EditorGUILayout.ObjectField("Camara de la escena", camera, typeof(Camera), true, GUILayout.MaxWidth(480)) as Camera;

        if (canv != null && camera != null)
        {
            canvasToSreenShot = canv.GetComponent<Canvas>();

            // Debug.Log("tengo un canvas");

            types = (SCREENSHOT_TYPE)EditorGUILayout.EnumPopup("", types, GUILayout.MaxWidth(480));

            //Debug.Log(types);
            if (GUILayout.Button("capturar imagen", GUILayout.Width(480)))
            {  
                receivePNGScreenShot(GetScreenshot(camera, screenShot, rt, canvasToSreenShot));
            }
        }
    }

    public void OnEnable()
    {
        //Un-Subscribe
        CanvasScreenShot.OnPictureTaken -= receivePNGScreenShot;
    }

    void receivePNGScreenShot(byte[] pngArray)
    {
        Debug.Log("Picture taken");

        //Do Something With the Image (Save)
        string path = Application.streamingAssetsPath + "/CanvasScreenShot.png";
        System.IO.File.WriteAllBytes(path, pngArray);
        Debug.Log(path);
    }

    

    public byte[] GetScreenshot(Camera camera, Texture2D screenshot, RenderTexture rt, Canvas canvas)
    {
        rt = new RenderTexture((int)canvas.pixelRect.width, (int)canvas.pixelRect.height, 24);
        screenShot = new Texture2D((int)canvas.pixelRect.width, (int)canvas.pixelRect.height, TextureFormat.RGB24, false);
        camera.targetTexture = rt;
        camera.Render();
        RenderTexture.active = rt;
        screenShot.ReadPixels(new Rect(0, 0, canvas.pixelRect.width, canvas.pixelRect.height), 0, 0);
        camera.targetTexture = null;
        RenderTexture.active = null;
        byte[] bytes = screenShot.EncodeToPNG();
        return bytes;
    }




}