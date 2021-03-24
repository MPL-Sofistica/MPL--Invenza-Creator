using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEngine.Video;
using UnityEngine.UI;
using System.IO;
using System;
using System.IO.Compression;
using Siccity.GLTFUtility;
[Serializable]
public class CapturadorPosicion : EditorWindow
{
    #region variables capturador
    public Experiencia experiencia;

    enum Tipos
    {
        SELECCIONE_UNA_EXPERIENCIA,
        MR,
        AR,
        VR,
        i360,
        v360,
        Three,
    }

    enum Objetos
    {

        SELECCIONE_UN_TIPO_DE_OBJETO,
        OBJ,
        GLTF
    }

    enum Panorama
    {
        Imagen,
        Video,
    }

    Objetos tipoobjeto;

    Objetos tipoobj;

    Tipos tipodeexperiencia;

    GameObject ObjetoaCapturar;

    CapturadorPosicion Experiencia;

    private int numhijos;

    private int numsubhijos;

    private int numbotones;

    Image SpriteHolder;
    VideoPlayer VideoHolder;
    Text TextHolder;
    AudioSource AudioHolder;
    VideoClip panoramaHolder;
    string panoramaPath;

    List<Sprite> imagenreferencia = new List<Sprite>();

    List<GameObject> modelos3D = new List<GameObject>();

    List<GameObject> modelogltf = new List<GameObject>();

    List<TextAsset> archivostexto = new List<TextAsset>();

    List<DefaultAsset> modelostensor = new List<DefaultAsset>();

    Vector2 scrollPosition = Vector2.zero;

    string nombre;

    bool showelement;

    List<bool> subelements = new List<bool>();

    Tipos op;

    TextAsset indexfile;

    DefaultAsset apkfile;

    string title;
    string apk_name;
    string pkg_name;

    #endregion

    #region variables capturar imagen
    public Camera camera;
    public Canvas canvasToSreenShot;
    public GameObject canv;
    // Use this for initialization
    private Texture2D screenShot;
    private RenderTexture rt;

    public enum SCREENSHOT_TYPE
    {
        IMAGE_AND_TEXT, IMAGE_ONLY, TEXT_ONLY
    }

    SCREENSHOT_TYPE types;

    #endregion

    #region variables generar archivo
    DebugFile indexHMTLFile;
    public string filehtml = "";
    public string[] hotPos;
    public string[] hotnam;

    public string[] panPos;
    public string[] panNam;
    #endregion
    [MenuItem("Invenza Creator SDK/Capturar Posición")]
    /**
     * Name: CrearVentana
     * Description: Crea la ventana para capturar la posicion de el GameObject
     * Params: NO
     * Return: NO
     * 
     * */
    public static void CrearVentana()
    {
        CapturadorPosicion ventana = (CapturadorPosicion)GetWindow(typeof(CapturadorPosicion));
        ventana.maxSize = new Vector2(600, 900);
        ventana.minSize = new Vector2(500, 900);
        ventana.titleContent.text = "Invenza Creator SDK";
    }

    /**
  * Name: OnGUI
  * Description: Crea la ventana junto con las opciones internas
  * Params: NO
  * Return: la ventana dentro del editor con las opciones que se le atribuyen, en este caso una ventana que muestra el objeto a cargar y todas las caracteristicas necesarias para generar una experiencia en Asira
  * 
  * */

    private void OnGUI()
    {
        experiencia = new Experiencia();

        scrollPosition = GUILayout.BeginScrollView(scrollPosition, false, true, GUILayout.Width(500), GUILayout.Height(700));

        GUILayout.Label("Titulo de la experiencia", EditorStyles.boldLabel);

        title = EditorGUILayout.TextField("Titulo: ", title);

        experiencia.SHORT_TITLE = title;

        GUILayout.Label("Seleccione el tipo de la experiencia", EditorStyles.boldLabel);

        tipodeexperiencia = (Tipos)EditorGUILayout.EnumPopup("", tipodeexperiencia, GUILayout.MaxWidth(480));

        op = tipodeexperiencia;

        switch (op)
        {
            case Tipos.MR:
                {
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    GUILayout.Label("Objeto a Capturar", EditorStyles.boldLabel);

                    ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;



                    if (ObjetoaCapturar != null)
                    {
                        numhijos = ObjetoaCapturar.transform.childCount;
                    }


                    experiencia.URL_INTERNAL_FILE = "";
                    int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos, GUILayout.MaxWidth(480)));

                    if (ObjetoaCapturar != null)
                    {
                        while (tamano > experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.Add(new Objeto());
                        }

                        while (numhijos > imagenreferencia.Count)
                        {
                            imagenreferencia.Add(Sprite.Create(null, new Rect(new Vector2(0, 0), new Vector2(0, 0)), new Vector2(0, 0)));
                        }

                        while (numhijos > modelos3D.Count)
                        {
                            modelos3D.Add(null);
                        }

                        while (numhijos > modelogltf.Count)
                        {
                            modelogltf.Add(null);
                        }

                        while (tamano < experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.RemoveAt(experiencia.MODEL.Count - 1);
                            imagenreferencia.RemoveAt(imagenreferencia.Count - 1);
                        }
                    }



                    if (ObjetoaCapturar != null)
                    {

                        showelement = EditorGUILayout.Foldout(showelement, "Elemento");

                        if (showelement)
                        {
                            numsubhijos = ObjetoaCapturar.transform.childCount;
                            for (int i = 0; i < numhijos; i++)
                            {
                                while (numsubhijos > subelements.Count)
                                {
                                    subelements.Add(new bool());
                                }
                                while (numsubhijos < subelements.Count)
                                {
                                    subelements.RemoveAt(experiencia.MODEL.Count - 1);
                                }

                                GUILayout.Label("Hotspot " + i + " del objeto:", EditorStyles.boldLabel);
                                subelements[i] = EditorGUILayout.Foldout(subelements[i], "Elemento" + i);

                                if (subelements[i])
                                {
                                    experiencia.MODEL[i].NAME_MODEL = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(480));
                                    EditorGUILayout.Space();
                                    imagenreferencia[i] = EditorGUILayout.ObjectField("imagen de referencia", imagenreferencia[i], typeof(Sprite), true, GUILayout.MaxWidth(480)) as Sprite;
                                    if (imagenreferencia[i] != null)
                                    {
                                        string auxst;

                                        auxst = AssetDatabase.GetAssetPath(imagenreferencia[i]);

                                        if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                        {
                                            auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                        }
                                        experiencia.MODEL[i].PATH_IMAGE_REF = EditorGUILayout.TextField("Dirección de la imagen", auxst, GUILayout.MaxWidth(480));
                                    }

                                    GUILayout.Label("Seleccione el tipo de objeto", EditorStyles.boldLabel);

                                    tipoobjeto = (Objetos)EditorGUILayout.EnumPopup("", tipoobjeto, GUILayout.MaxWidth(480));

                                    tipoobj = tipoobjeto;

                                    switch (tipoobj)
                                    {
                                        case Objetos.OBJ:
                                            {
                                                modelos3D[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelos3D[i], typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                                                if (modelos3D[i] != null)
                                                {
                                                    string auxst;

                                                    auxst = AssetDatabase.GetAssetPath(modelos3D[i]);

                                                    if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                                    {
                                                        auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                                    }
                                                    experiencia.MODEL[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", auxst, GUILayout.MaxWidth(480));
                                                }
                                                experiencia.MODEL[i].SCALE_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].PATH_MODEL_LABEL = "";
                                                EditorGUILayout.Space();
                                            }
                                            break;
                                        case Objetos.GLTF:
                                            {
                                                modelogltf[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelogltf[i], typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                                                if (modelogltf[i] != null)
                                                {
                                                    string auxst;

                                                    auxst = AssetDatabase.GetAssetPath(modelogltf[i]);

                                                    if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                                    {
                                                        auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                                    }
                                                    experiencia.MODEL[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", auxst, GUILayout.MaxWidth(480));
                                                }
                                                experiencia.MODEL[i].SCALE_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString("F3").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].PATH_MODEL_LABEL = "";
                                                EditorGUILayout.Space();
                                            }
                                            break;
                                    }

                                    if (ObjetoaCapturar.transform.childCount > 0)
                                    {
                                        int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                                        //experiencia.MODEL[i].HOTSPOTS = new List<SubObjeto>();
                                        while (tamañosubhijos > experiencia.MODEL[i].HOTSPOTS.Count)
                                        {
                                            //listasubobjetos.Add(new SubObjeto());
                                            experiencia.MODEL[i].HOTSPOTS.Add(new SubObjeto());
                                        }
                                        for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                                        {
                                            if (ObjetoaCapturar.transform.GetChild(i).GetChild(ji).transform.tag == "hotspot")
                                            {
                                                GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);
                                                experiencia.MODEL[i].HOTSPOTS[ji].NAME_HOTSPOT = EditorGUILayout.TextField("nombre del hotspot " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));
                                                //experiencia.MODEL[i].HOTSPOTS[ji].POSITION_HOTSPOT = EditorGUILayout.TextField("posicion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.localPosition.ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].HOTSPOTS[ji].POSITION_HOTSPOT = EditorGUILayout.TextField("posicion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.localPosition.ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_HOTSPOT = EditorGUILayout.TextField("rotacion del hotsptpot numero: " + ji + " ", left2rightrotation(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.rotation.eulerAngles).ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_HOTSPOT);
                                                experiencia.MODEL[i].HOTSPOTS[ji].IMAGE_HOTSPOT = experiencia.MODEL[i].HOTSPOTS[ji].NAME_HOTSPOT;
                                                experiencia.MODEL[i].HOTSPOTS[ji].TITLE_PANEL = EditorGUILayout.TextField("nombre del panel" + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));


                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount > 0)
                                                {
                                                    for (int k = 0; k < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount; k++)
                                                    {
                                                        experiencia.MODEL[i].HOTSPOTS[ji].POSITION_PANEL = EditorGUILayout.TextField("posicion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localPosition.ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        experiencia.MODEL[i].HOTSPOTS[ji].SCALE_PANEL = EditorGUILayout.TextField("escala del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localScale.ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        //experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_PANEL = EditorGUILayout.TextField("rotacion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localRotation.eulerAngles.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_PANEL = EditorGUILayout.TextField("rotacion del panel", left2righthand(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localRotation.eulerAngles).ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_PANEL);
                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<Canvas>() != null)
                                                        {
                                                            for (int b = 0; b < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; b++)
                                                            {
                                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.tag == "button")
                                                                {
                                                                    numbotones = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount;
                                                                    //Debug.Log(numbotones);
                                                                    while (numbotones > experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Count)
                                                                    {
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Add(new Botones());
                                                                    }

                                                                    //Debug.Log(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.name);
                                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Image>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de imagen");
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "image";
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            string aux;
                                                                            //if (!loopediAR)
                                                                            //{
                                                                            for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).childCount; l++)
                                                                            {
                                                                                SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                                                aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);
                                                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                                {
                                                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                                }

                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + aux + "&&";
                                                                                Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                            //}
                                                                        }
                                                                        EditorGUILayout.LabelField("Dirección del archivo");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.Width(position.width - 20));

                                                                        //Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Text>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de texto");
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "text";
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            for (int m = 0; m < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount; m++)
                                                                            {
                                                                                TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(m).gameObject.GetComponent<Text>();
                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + TextHolder.text + "&&";
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                        }
                                                                        EditorGUILayout.LabelField("Contenido del texto");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.MaxWidth(480));

                                                                        Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);


                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de video");
                                                                        EditorGUILayout.Space();
                                                                        VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "video";

                                                                        string aux = AssetDatabase.GetAssetPath(VideoHolder.clip);

                                                                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                        {
                                                                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                        }
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextField("Dirección del archivo", aux, GUILayout.MaxWidth(480));

                                                                        //Debug.Log("hay videoplayer");
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else
                                                                    {
                                                                        Debug.LogWarning("el objeto no tiene ningun formato reconocible");
                                                                    }
                                                                    ///////////////////////////////////////////////////////////
                                                                }
                                                                else
                                                                {
                                                                    Debug.LogWarning("El Objeto no es boton");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case Tipos.AR:
                {
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    GUILayout.Label("Objeto a Capturar", EditorStyles.boldLabel);

                    ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;



                    if (ObjetoaCapturar != null)
                    {
                        numhijos = ObjetoaCapturar.transform.childCount;
                    }

                    experiencia.URL_INTERNAL_FILE = "";
                    int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos, GUILayout.MaxWidth(480)));

                    if (ObjetoaCapturar != null)
                    {
                        while (tamano > experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.Add(new Objeto());
                        }

                        while (numhijos > archivostexto.Count)
                        {
                            archivostexto.Add(null);
                        }

                        while (numhijos > imagenreferencia.Count)
                        {
                            imagenreferencia.Add(Sprite.Create(null, new Rect(new Vector2(0, 0), new Vector2(0, 0)), new Vector2(0, 0)));
                        }

                        while (numhijos > modelostensor.Count)
                        {
                            modelostensor.Add(null);
                        }

                        while (tamano < experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.RemoveAt(experiencia.MODEL.Count - 1);
                            imagenreferencia.RemoveAt(imagenreferencia.Count - 1);
                        }
                    }



                    if (ObjetoaCapturar != null)
                    {

                        showelement = EditorGUILayout.Foldout(showelement, "Elemento");

                        if (showelement)
                        {
                            numsubhijos = ObjetoaCapturar.transform.childCount;
                            for (int i = 0; i < numhijos; i++)
                            {
                                while (numsubhijos > subelements.Count)
                                {
                                    subelements.Add(new bool());
                                }
                                while (numsubhijos < subelements.Count)
                                {
                                    subelements.RemoveAt(experiencia.MODEL.Count - 1);
                                }

                                GUILayout.Label("Hotspot " + i + " del objeto:", EditorStyles.boldLabel);
                                subelements[i] = EditorGUILayout.Foldout(subelements[i], "Elemento" + i);

                                if (subelements[i])
                                {
                                    experiencia.MODEL[i].NAME_MODEL = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(480));
                                    EditorGUILayout.Space();
                                    /* imagenreferencia[i] = EditorGUILayout.ObjectField("imagen de referencia", imagenreferencia[i], typeof(Sprite), true, GUILayout.MaxWidth(480)) as Sprite;
                                     if (imagenreferencia[i] != null)
                                     {
                                         experiencia.MODEL[i].PATH_IMAGE_REF = EditorGUILayout.TextField("Dirección de la imagen", AssetDatabase.GetAssetPath(imagenreferencia[i]), GUILayout.MaxWidth(480));
                                     }*/

                                    modelostensor[i] = EditorGUILayout.ObjectField("Modelo Tensor TFLITE", modelostensor[i], typeof(DefaultAsset), true, GUILayout.MaxWidth(480)) as DefaultAsset;
                                    if (modelostensor[i] != null)
                                    {
                                        string auxst;

                                        auxst = AssetDatabase.GetAssetPath(modelostensor[i]);

                                        if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                        {
                                            auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                        }

                                        experiencia.MODEL[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", auxst, GUILayout.MaxWidth(480));
                                    }
                                    //experiencia.MODEL[i].SCALE_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));


                                    archivostexto[i] = EditorGUILayout.ObjectField("Archivo de etiquetas", archivostexto[i], typeof(TextAsset), true, GUILayout.MaxWidth(480)) as TextAsset;

                                    if (archivostexto[i])
                                    {

                                        string auxst;

                                        auxst = AssetDatabase.GetAssetPath(archivostexto[i]);

                                        if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                        {
                                            auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                        }
                                        experiencia.MODEL[i].PATH_MODEL_LABEL = EditorGUILayout.TextField("Dirección del archivo", auxst, GUILayout.MaxWidth(480));
                                    }

                                    EditorGUILayout.Space();

                                    if (ObjetoaCapturar.transform.childCount > 0)
                                    {
                                        int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                                        experiencia.MODEL[i].HOTSPOTS = new List<SubObjeto>();
                                        while (tamañosubhijos > experiencia.MODEL[i].HOTSPOTS.Count)
                                        {
                                            //listasubobjetos.Add(new SubObjeto());
                                            experiencia.MODEL[i].HOTSPOTS.Add(new SubObjeto());
                                        }
                                        for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                                        {
                                            if (ObjetoaCapturar.transform.GetChild(i).GetChild(ji).transform.tag == "hotspot")
                                            {
                                                GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);

                                                experiencia.MODEL[i].HOTSPOTS[ji].NUM_PANEL = EditorGUILayout.TextField("numero del panel" + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].HOTSPOTS[ji].TITLE_PANEL = EditorGUILayout.TextField("nombre del panel" + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));
                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount > 0)
                                                {
                                                    for (int k = 0; k < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount; k++)
                                                    {
                                                        experiencia.MODEL[i].HOTSPOTS[ji].POSITION_PANEL = EditorGUILayout.TextField("posicion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.position.ToString("F4").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        experiencia.MODEL[i].HOTSPOTS[ji].SCALE_PANEL = EditorGUILayout.TextField("escala del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localScale.ToString("F4").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        experiencia.MODEL[i].HOTSPOTS[ji].ROTATION_PANEL = EditorGUILayout.TextField("rotacion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localRotation.ToString("F4").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<Canvas>() != null)
                                                        {
                                                            for (int b = 0; b < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; b++)
                                                            {
                                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.tag == "button")
                                                                {
                                                                    numbotones = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount;
                                                                    //Debug.Log(numbotones);
                                                                    while (numbotones > experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Count)
                                                                    {
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Add(new Botones());
                                                                    }

                                                                    //Debug.Log(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.name);
                                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Image>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de imagen");
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "image";
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            string aux;

                                                                            for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).childCount; l++)
                                                                            {
                                                                                SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                                                aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);

                                                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                                {
                                                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                                }

                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + aux + "&&";
                                                                            }

                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                        }
                                                                        EditorGUILayout.LabelField("Dirección del archivo");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.Width(position.width - 20));

                                                                        Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Text>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de texto");
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "text";
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {

                                                                            for (int m = 0; m < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount; m++)
                                                                            {
                                                                                TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(m).gameObject.GetComponent<Text>();
                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + TextHolder.text + "&&";
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                        }
                                                                        EditorGUILayout.LabelField("Contenido del texto");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.MaxWidth(480));

                                                                        Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);


                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de video");
                                                                        EditorGUILayout.Space();
                                                                        VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "video";

                                                                        string aux = AssetDatabase.GetAssetPath(VideoHolder.clip);

                                                                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                        {
                                                                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                        }
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextField("Dirección del archivo", aux, GUILayout.MaxWidth(480));

                                                                        //Debug.Log("hay videoplayer");
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else
                                                                    {
                                                                        Debug.LogWarning("el objeto no tiene ningun formato reconocible");
                                                                    }
                                                                    ///////////////////////////////////////////////////////////
                                                                }
                                                                else
                                                                {
                                                                    Debug.LogWarning("El Objeto no es boton");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        //lista[i].ListadeHijos = listasubobjetos;
                                    }
                                }
                            }
                        }

                    }
                }
                break;
            case Tipos.i360:
                {
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    indexfile = EditorGUILayout.ObjectField("archivo de texto", indexfile, typeof(TextAsset), true, GUILayout.MaxWidth(480)) as TextAsset;
                    if (indexfile)
                    {
                        string aux = AssetDatabase.GetAssetPath(indexfile);

                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                        {
                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                            experiencia.URL_INTERNAL_FILE = aux;
                        }
                        experiencia.URL_INTERNAL_FILE = EditorGUILayout.TextField("direccion del index", experiencia.URL_INTERNAL_FILE, GUILayout.MaxWidth(480));
                    }
                }
                break;
            case Tipos.v360:
                {
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    indexfile = EditorGUILayout.ObjectField("archivo de texto", indexfile, typeof(TextAsset), true, GUILayout.MaxWidth(480)) as TextAsset;
                    if (indexfile)
                    {
                        string aux = AssetDatabase.GetAssetPath(indexfile);

                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                        {
                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                            experiencia.URL_INTERNAL_FILE = aux;
                        }
                        experiencia.URL_INTERNAL_FILE = EditorGUILayout.TextField("direccion del index", experiencia.URL_INTERNAL_FILE, GUILayout.MaxWidth(480));
                    }
                }
                break;
            case Tipos.VR:
                {
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    apkfile = EditorGUILayout.ObjectField("direccion del apk", apkfile, typeof(DefaultAsset), true, GUILayout.MaxWidth(480)) as DefaultAsset;
                    if (apkfile)
                    {
                        apk_name = EditorGUILayout.TextField("nombre del apk", apk_name, GUILayout.MaxWidth(480));

                        experiencia.URL_INTERNAL_FILE = apk_name;


                        string aux = AssetDatabase.GetAssetPath(apkfile);

                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                        {
                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                            experiencia.URL_FILE = aux;
                        }
                        experiencia.URL_FILE = EditorGUILayout.TextField("direccion del zip", experiencia.URL_FILE, GUILayout.MaxWidth(480));


                        pkg_name = EditorGUILayout.TextField("nombre del Paquete del app", pkg_name, GUILayout.MaxWidth(480));

                        experiencia.NAME_FILE_ZIP = pkg_name;
                    }
                }
                break;
            case Tipos.Three:
                {
                    EditorGUILayout.Space();
                    GUILayout.Label("1. Guarda los textos como imagen", EditorStyles.boldLabel);

                    EditorGUILayout.Space();

                    GUILayout.Label("Conversor de texto a imagen", EditorStyles.boldLabel);

                    canv = EditorGUILayout.ObjectField("Objeto con el canvas", canv, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;

                    camera = EditorGUILayout.ObjectField("Camara de la escena", camera, typeof(Camera), true, GUILayout.MaxWidth(480)) as Camera;

                    if (canv != null && camera != null)
                    {
                        canvasToSreenShot = canv.GetComponent<Canvas>();
                        if (GUILayout.Button("capturar imagen", GUILayout.Width(480)))
                        {
                            receivePNGScreenShot(GetScreenshot(camera, screenShot, rt, canvasToSreenShot));
                        }
                    }


                    //EditorGUILayout.Space();
                    EditorGUILayout.Space();

                    GUILayout.Label("2. Arrastra la diagramación de los paneles", EditorStyles.boldLabel);
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    GUILayout.Label("Game Object a capturar", EditorStyles.boldLabel);

                    ObjetoaCapturar = EditorGUILayout.ObjectField("Game Object a Capturar", ObjetoaCapturar, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                    EditorGUILayout.Space();
                    EditorGUILayout.Space();
                    GUILayout.Label("Arrastre el video 360", EditorStyles.boldLabel);

                    panoramaHolder = EditorGUILayout.ObjectField("videoClip", panoramaHolder, typeof(VideoClip), true, GUILayout.MaxWidth(480)) as VideoClip;
                    if (panoramaHolder != null)
                    {
                        string aux = AssetDatabase.GetAssetPath(panoramaHolder);

                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                        {
                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                        }
                        panoramaPath = EditorGUILayout.TextField("Dirección del v360 ", splitURL(aux), GUILayout.MaxWidth(480));
                    }
                    EditorGUILayout.Space();

                    if (ObjetoaCapturar != null)
                    {
                        numhijos = ObjetoaCapturar.transform.childCount;
                    }


                    experiencia.URL_INTERNAL_FILE = "";
                    int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos, GUILayout.MaxWidth(480)));
                    #region listas
                    if (ObjetoaCapturar != null)
                    {
                        while (tamano > experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.Add(new Objeto());
                        }

                        while (numhijos > imagenreferencia.Count)
                        {
                            imagenreferencia.Add(Sprite.Create(null, new Rect(new Vector2(0, 0), new Vector2(0, 0)), new Vector2(0, 0)));
                        }

                        while (numhijos > modelos3D.Count)
                        {
                            modelos3D.Add(null);
                        }

                        while (numhijos > modelogltf.Count)
                        {
                            modelogltf.Add(null);
                        }

                        while (tamano < experiencia.MODEL.Count)
                        {
                            experiencia.MODEL.RemoveAt(experiencia.MODEL.Count - 1);
                            imagenreferencia.RemoveAt(imagenreferencia.Count - 1);
                        }
                    }
                    #endregion
                    if (ObjetoaCapturar != null)
                    {

                        showelement = EditorGUILayout.Foldout(showelement, "Elemento");

                        if (showelement)
                        {
                            numsubhijos = ObjetoaCapturar.transform.childCount;
                            for (int i = 0; i < numhijos; i++)
                            {
                                GUILayout.Label("Modelo " + i + " de la experiencia:", EditorStyles.boldLabel);
                                experiencia.MODEL[i].NAME_MODEL = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(480));
                                EditorGUILayout.Space();
                                experiencia.MODEL[i].PATH_IMAGE_REF = "";
                                #region modelo 3D
                                /*GUILayout.Label("Seleccione el tipo de objeto", EditorStyles.boldLabel);

                                tipoobjeto = (Objetos)EditorGUILayout.EnumPopup("", tipoobjeto, GUILayout.MaxWidth(480));

                                tipoobj = tipoobjeto;

                                switch (tipoobj)
                                {
                                    case Objetos.OBJ:
                                        {
                                            modelos3D[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelos3D[i], typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                                            if (modelos3D[i] != null)
                                            {
                                                string auxst;

                                                auxst = AssetDatabase.GetAssetPath(modelos3D[i]);

                                                if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                                {
                                                    auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                                }
                                                experiencia.MODEL[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", auxst, GUILayout.MaxWidth(480));
                                            }
                                            experiencia.MODEL[i].SCALE_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                            experiencia.MODEL[i].PATH_MODEL_LABEL = "";
                                            EditorGUILayout.Space();
                                        }
                                        break;
                                    case Objetos.GLTF:
                                        {
                                            modelogltf[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelogltf[i], typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                                            if (modelogltf[i] != null)
                                            {
                                                string auxst;

                                                auxst = AssetDatabase.GetAssetPath(modelogltf[i]);

                                                if (auxst.StartsWith("Assets/Invenza Creator SDK/"))
                                                {
                                                    auxst = auxst.Replace("Assets/Invenza Creator SDK/", "");
                                                }
                                                experiencia.MODEL[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", auxst, GUILayout.MaxWidth(480));
                                            }
                                            experiencia.MODEL[i].SCALE_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString("F3").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                            experiencia.MODEL[i].PATH_MODEL_LABEL = "";
                                            EditorGUILayout.Space();
                                        }
                                        break;
                                }*/
                                #endregion
                                experiencia.MODEL[i].PATH_MODEL = "";
                                experiencia.MODEL[i].SCALE_MODEL = "";
                                experiencia.MODEL[i].PATH_MODEL_LABEL = "";
                                EditorGUILayout.Space();
                                if (ObjetoaCapturar.transform.childCount > 0)
                                {
                                    int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                                    while (tamañosubhijos > experiencia.MODEL[i].HOTSPOTS.Count)
                                    {
                                        experiencia.MODEL[i].HOTSPOTS.Add(new SubObjeto());
                                    }
                                    for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                                    {
                                        while (tamañosubhijos > subelements.Count)
                                        {
                                            subelements.Add(new bool());
                                        }
                                        while (tamañosubhijos < subelements.Count)
                                        {
                                            subelements.RemoveAt(experiencia.MODEL[i].HOTSPOTS.Count - 1);
                                        }
                                        subelements[ji] = EditorGUILayout.Foldout(subelements[ji], "Hotspot: " + ji);
                                        hotPos = new string[ObjetoaCapturar.transform.GetChild(i).childCount];
                                        hotnam = new string[ObjetoaCapturar.transform.GetChild(i).childCount];
                                        if (subelements[ji])
                                        {
                                            if (ObjetoaCapturar.transform.GetChild(i).GetChild(ji).transform.tag == "hotspot")
                                            {

                                                GUILayout.Label("Información del Hotspot", EditorStyles.boldLabel);
                                                EditorGUILayout.Space();
                                                experiencia.MODEL[i].HOTSPOTS[ji].NAME_HOTSPOT = EditorGUILayout.TextField("nombre del hotspot: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));
                                                experiencia.MODEL[i].HOTSPOTS[ji].POSITION_HOTSPOT = EditorGUILayout.TextField("posicion hotsptpot: " + ji + " ", hotspotPositionWeb(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.position).ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                hotPos[ji] = experiencia.MODEL[i].HOTSPOTS[ji].POSITION_HOTSPOT;
                                                hotnam[ji] = experiencia.MODEL[i].HOTSPOTS[ji].NAME_HOTSPOT;
                                                //Debug.Log(hotPos[ji]);
                                                //Debug.Log(hotnam[ji]);
                                                EditorGUILayout.Space();
                                                GUILayout.Label("Información del Panel", EditorStyles.boldLabel);
                                                EditorGUILayout.Space();
                                                experiencia.MODEL[i].HOTSPOTS[ji].IMAGE_HOTSPOT = experiencia.MODEL[i].HOTSPOTS[ji].NAME_HOTSPOT;
                                                experiencia.MODEL[i].HOTSPOTS[ji].TITLE_PANEL = EditorGUILayout.TextField("nombre del panel" + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name + "_Panel", GUILayout.MaxWidth(480));


                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount > 0)
                                                {
                                                    panNam = new string[ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount];
                                                    panPos = new string[ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount];
                                                    for (int k = 0; k < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount; k++)
                                                    {
                                                        experiencia.MODEL[i].HOTSPOTS[ji].POSITION_PANEL = EditorGUILayout.TextField("posicion del panel", panelPositionWeb(inverx(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.position)).ToString("F5").Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                                        panNam[k] = experiencia.MODEL[i].HOTSPOTS[ji].TITLE_PANEL;
                                                        panPos[k] = experiencia.MODEL[i].HOTSPOTS[ji].POSITION_PANEL;
                                                        // Debug.Log(panNam[k]);
                                                        //Debug.Log(panPos[k]);
                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<Canvas>() != null)
                                                        {
                                                            for (int b = 0; b < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; b++)
                                                            {
                                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.tag == "button")
                                                                {
                                                                    numbotones = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount;
                                                                    //Debug.Log(numbotones);
                                                                    while (numbotones > experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Count)
                                                                    {
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS.Add(new Botones());
                                                                    }

                                                                    //Debug.Log(ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.name);
                                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Image>() != null && ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.name.Contains("Imagen"))
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de imagen", EditorStyles.boldLabel);
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "image";
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            string aux;
                                                                            //if (!loopediAR)
                                                                            //{
                                                                            for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).childCount; l++)
                                                                            {
                                                                                SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                                                aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);
                                                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                                {
                                                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                                    aux = splitURL(aux);
                                                                                }

                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + aux + "&&";
                                                                                //Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                            //}
                                                                        }
                                                                        EditorGUILayout.LabelField("Dirección del archivo");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.Width(position.width - 20));

                                                                        //Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<Image>() != null && ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.name.Contains("Texto"))
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de texto", EditorStyles.boldLabel);
                                                                        EditorGUILayout.Space();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "text";
                                                                        #region comment
                                                                        /*if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            string aux;
                                                                            for (int m = 0; m < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount; m++)
                                                                            {
                                                                                SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(m).gameObject.GetComponent<Image>();
                                                                                aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);
                                                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                                {
                                                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                                }
                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + aux + "&&";
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                        }
                                                                        EditorGUILayout.LabelField("Contenido del texto");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.MaxWidth(480));*/

                                                                        //Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                        #endregion
                                                                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.childCount > 0)
                                                                        {
                                                                            string aux;
                                                                            //if (!loopediAR)
                                                                            //{
                                                                            for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).childCount; l++)
                                                                            {
                                                                                SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                                                aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);
                                                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                                {
                                                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                                    aux = splitURL(aux);
                                                                                }

                                                                                experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY + aux + "&&";
                                                                                //Debug.Log(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY);
                                                                            }
                                                                            experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Substring(0, experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY.Length - 2);
                                                                            //}
                                                                        }
                                                                        EditorGUILayout.LabelField("Dirección del archivo");
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY, GUILayout.Height(50), GUILayout.Width(position.width - 20));

                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>() != null)
                                                                    {
                                                                        EditorGUILayout.LabelField("Boton de video", EditorStyles.boldLabel);
                                                                        EditorGUILayout.Space();
                                                                        VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(b).transform.GetChild(0).gameObject.GetComponent<VideoPlayer>();
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].TYPE = "video";

                                                                        string aux = AssetDatabase.GetAssetPath(VideoHolder.clip);

                                                                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                                        {
                                                                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                                            aux = splitURL(aux);
                                                                        }
                                                                        experiencia.MODEL[i].HOTSPOTS[ji].BUTTONS[b].PATH_ARRAY = EditorGUILayout.TextField("Dirección del archivo", aux, GUILayout.MaxWidth(480));

                                                                        //Debug.Log("hay videoplayer");
                                                                        EditorGUILayout.Space();
                                                                    }
                                                                    else
                                                                    {
                                                                        Debug.LogWarning("el objeto no tiene ningun formato reconocible");
                                                                    }
                                                                    ///////////////////////////////////////////////////////////
                                                                }
                                                                else
                                                                {
                                                                    Debug.LogWarning("El Objeto no es boton");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            EditorGUILayout.LabelField("", GUI.skin.horizontalSlider);
                                        }
                                    }
                                }

                                // }
                            }
                        }
                    }

                    if (GUILayout.Button("generar el index.html", GUILayout.Width(480)))
                    {
                        indexHMTLFile = new DebugFile();
                        filehtml = indexHMTLFile.headerStart;
                        filehtml += indexHMTLFile.CreateContainerHTML();
                        // crear videos html
                        for (int i = 0; i < experiencia.MODEL[0].HOTSPOTS.Count; i++)
                        {
                            for (int ji = 0; ji < experiencia.MODEL[0].HOTSPOTS[i].BUTTONS.Count; ji++)
                            {
                                if (experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE == "video")
                                {
                                    filehtml += indexHMTLFile.CreateVideoHTML("Video" + "_id" + "_" + i.ToString() + "_" + ji.ToString(), experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].PATH_ARRAY);
                                }
                            }
                        }
                        /////
                        filehtml += "<script>" + indexHMTLFile.variablesGenericas;
                        filehtml += indexHMTLFile.varContainer;
                        filehtml += indexHMTLFile.CreatePanorama(panoramaPath, DebugFile.tipoPanorama.Video);////panorama
                        filehtml += indexHMTLFile.CreateViewerHTML();
                        for (int i = 0; i < experiencia.MODEL[0].HOTSPOTS.Count; i++)
                        {
                            filehtml += indexHMTLFile.createGrupoPanel(experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo", experiencia.MODEL[0].HOTSPOTS[i].POSITION_PANEL, "1,1,1");
                            filehtml += indexHMTLFile.CreateFrameLayout(experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Layout", experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo");
                            //filehtml+= indexHMTLFile.CreateFrameLayout()
                            for (int ji = 0; ji < experiencia.MODEL[0].HOTSPOTS[i].BUTTONS.Count; ji++)
                            {
                                DebugFile.tipoBoton boton;
                                if (experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE == "image")
                                {
                                    boton = DebugFile.tipoBoton.Imagen;
                                }
                                else if (experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE == "text")
                                {
                                    boton = DebugFile.tipoBoton.Texto;
                                }
                                else
                                {
                                    boton = DebugFile.tipoBoton.Video;
                                }
                                //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE);
                                //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].PATH_ARRAY);
                                filehtml += indexHMTLFile.CrearBoton(experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].PATH_ARRAY, experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE + i.ToString() + "_" + ji.ToString(), boton, "Video" + "_id" + "_" + i.ToString() + "_" + ji.ToString(), experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo", experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Layout");
                                if (ji == experiencia.MODEL[0].HOTSPOTS[i].BUTTONS.Count - 1)
                                {
                                    filehtml += indexHMTLFile.CrearBoton(experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].PATH_ARRAY, experiencia.MODEL[0].HOTSPOTS[i].BUTTONS[ji].TYPE + i.ToString() + "_" + ji.ToString(), DebugFile.tipoBoton.Cerrar, "Video" + "_id" + "_" + i.ToString() + "_" + ji.ToString(), experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo", experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Layout");
                                }
                            }
                            indexHMTLFile.numBoton = 0;
                            filehtml += indexHMTLFile.CreatePanelHTML(experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL, experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo");
                            filehtml += indexHMTLFile.CreateInfoSpot((i + 1).ToString(), experiencia.MODEL[0].HOTSPOTS[i].NAME_HOTSPOT, experiencia.MODEL[0].HOTSPOTS[i].POSITION_HOTSPOT, experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL + "_Grupo");
                            //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].NAME_HOTSPOT);
                            //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].POSITION_HOTSPOT);
                            //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].TITLE_PANEL);
                            //Debug.Log(experiencia.MODEL[0].HOTSPOTS[i].POSITION_PANEL);
                        }

                        filehtml += indexHMTLFile.createHideNextAndPrev();
                        filehtml += indexHMTLFile.createHidePlayAndPause();
                        filehtml += indexHMTLFile.stopfunction();


                        filehtml += indexHMTLFile.footer;///fin del documento
                        //Debug.Log(filehtml);

                        Writehtml(filehtml);

                    }

                    EditorGUILayout.Space();

                    GUILayout.Label("3. generar manifest de la experiencia", EditorStyles.boldLabel);
                    experiencia.TYPE = tipodeexperiencia.ToString();
                    indexfile = EditorGUILayout.ObjectField("archivo index.html", indexfile, typeof(TextAsset), true, GUILayout.MaxWidth(480)) as TextAsset;
                    if (indexfile)
                    {
                        string aux = AssetDatabase.GetAssetPath(indexfile);

                        if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                        {
                            aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                            experiencia.URL_INTERNAL_FILE = aux;
                        }
                        experiencia.URL_INTERNAL_FILE = EditorGUILayout.TextField("direccion del index", experiencia.URL_INTERNAL_FILE, GUILayout.MaxWidth(480));
                    }
                }
                break;
        }
        if (GUILayout.Button("Convertir a Json", GUILayout.Width(480)))
        {
            TestJson();
        }
        GUILayout.EndScrollView();
    }

    /**
* Name: TestJson
* Description: Crea el Objeto en formato json de todos los datos capturados en el metodo OnGUI
* Params: NO
* Return: Documento json generado a travez de la codificacion de las variables
* 
* */
    public void TestJson()
    {
        string jsonpath;
        string json = JsonUtility.ToJson(experiencia, true);
        jsonpath = EditorUtility.SaveFilePanel("Seleccione la carpeta donde va a alojar el json", "", "manifest", "json");
        File.WriteAllText(jsonpath, json);
        Debug.Log(json);
    }

    public void Writehtml(string data)
    {
        string htmlpath;
        htmlpath = EditorUtility.SaveFilePanel("Seleccione la carpeta donde va a alojar el index.html", "", "index", "html");
        File.WriteAllText(htmlpath, data);
        Debug.Log(data);
    }

    public Vector3 left2righthand(Vector3 vector)
    {
        Vector3 temporal = vector;
        vector.x = vector.z;
        vector.y = 180 + (vector.y * -1);
        vector.z = temporal.x;
        return vector;
    }

    public Vector3 left2rightrotation(Vector3 vector)
    {
        vector.x = -vector.x;
        vector.y = -vector.y;

        vector.x = vector.x * Mathf.Deg2Rad;
        vector.y = vector.y * Mathf.Deg2Rad;
        vector.z = vector.z * Mathf.Deg2Rad;
        return vector;
    }





    public Vector3 left2rightrotation_Safe(Vector3 vector)
    {
        vector.x = -vector.x;
        vector.y = -vector.y;
        return vector;
    }


    void receivePNGScreenShot(byte[] pngArray)
    {
        Debug.Log("Picture taken");

        //Do Something With the Image (Save)
        //string path = Application.streamingAssetsPath + "/CanvasScreenShot.png";

        string path = EditorUtility.SaveFilePanel("Guardar PNG como", "", "Screenshot", "png");

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
    public string splitURL(string url)
    {
        string[] splitUrl = url.Split(new Char[] { '/' });
        string imageName = "";

        for (int i = 1; i < splitUrl.Length; i++)
        {
            if (i == splitUrl.Length - 1)
            {
                imageName += splitUrl[i];
                break;
            }
            else
            {
                imageName += splitUrl[i] + "/";
            }

        }

        //imageName = imageName.Remove(0,1);

        return imageName;
    }

    public Vector3 hotspotPositionWeb(Vector3 position)
    {
        position.x *= 100;
        position.y *= 100;
        position.z *= 100;

        return position;
    }
    public Vector3 panelPositionWeb(Vector3 position)
    {
        position.x *= 10;
        position.y *= 10;
        position.z *= 10;

        return position;
    }

    public Vector3 inverx(Vector3 original)
    {
        original.x *= -1;
        return original;
    }

}
