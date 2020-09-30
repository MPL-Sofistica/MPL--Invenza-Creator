using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEngine.Video;
using UnityEngine.UI;
using System.IO;
using System;

[Serializable]
public class CapturadorPosicion : EditorWindow
{

    public Experiencia experiencia = new Experiencia();

    enum Tipos
    {
        MR,
        AR,
        XR,
        VR,
        i360,
        v360
    }

    Tipos tipodeexperiencia;

    GameObject ObjetoaCapturar;

    CapturadorPosicion Experiencia;

    private int numhijos;

    private int numsubhijos;

    Image SpriteHolder;

    List<Sprite> imagenreferencia = new List<Sprite>();

    List<GameObject> modelos3D = new List<GameObject>();

    VideoPlayer VideoHolder;

    Text TextHolder;

    Vector2 scrollPosition = Vector2.zero;


    bool showelement;

    List<bool> subelements = new List<bool>();

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
        GetWindow(typeof(CapturadorPosicion));
    }

    /**
  * Name: OnGUI
  * Description: Crea la ventana junto con las opciones internas
  * Params: NO
  * Return: la ventana dentro del editor con las opciones que se le atribuyen, en este caso un vector3 para la posicion y un objeto a cargar
  * 
  * */

    private void OnGUI()
    {

        scrollPosition = GUILayout.BeginScrollView(scrollPosition, false, true, GUILayout.Width(1000), GUILayout.Height(700));

        GUILayout.Label("Titulo de la experiencia", EditorStyles.boldLabel);

        experiencia.tituloCardV = EditorGUILayout.TextField("Titulo");

        GUILayout.Label("Seleccione el tipo de la experiencia", EditorStyles.boldLabel);

        tipodeexperiencia = (Tipos)EditorGUILayout.EnumPopup("", tipodeexperiencia);


        experiencia.type = tipodeexperiencia.ToString();

        GUILayout.Label("Objeto a Capturar", EditorStyles.boldLabel);

        ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true) as GameObject;



        if (ObjetoaCapturar != null)
        {
            numhijos = ObjetoaCapturar.transform.childCount;
        }

        if (GUILayout.Button("Convertir a Json"))
        {
            TestJson();
        }

        int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos));

        if (ObjetoaCapturar != null)
        {
            while (tamano > experiencia.model.Count)
            {
                experiencia.model.Add(new Objeto());
            }

            while (numhijos > imagenreferencia.Count)
            {
                imagenreferencia.Add(Sprite.Create(null, new Rect(new Vector2(0, 0), new Vector2(0, 0)), new Vector2(0, 0)));
            }

            while (numhijos > modelos3D.Count)
            {
                modelos3D.Add(null);
            }

            while (tamano < experiencia.model.Count)
            {
                experiencia.model.RemoveAt(experiencia.model.Count - 1);
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
                        subelements.RemoveAt(experiencia.model.Count - 1);
                    }

                    GUILayout.Label("Hotspot " + i + " del objeto:", EditorStyles.boldLabel);
                    subelements[i] = EditorGUILayout.Foldout(subelements[i], "Elemento" + i);

                    if (subelements[i])
                    {
                        experiencia.model[i].nameModel = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(200));
                        imagenreferencia[i] = EditorGUILayout.ObjectField("imagen de referencia", imagenreferencia[i], typeof(Sprite), true) as Sprite;
                        if (imagenreferencia[i] != null)
                        {
                            experiencia.model[i].pathImageRef = EditorGUILayout.TextField("direccion de la imagen", AssetDatabase.GetAssetPath(imagenreferencia[i]));
                        }

                        modelos3D[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelos3D[i], typeof(GameObject), true) as GameObject;
                        if (modelos3D[i] != null)
                        {
                            experiencia.model[i].pathModel = EditorGUILayout.TextField("Direccion del modelo", AssetDatabase.GetAssetPath(modelos3D[i]));
                        }
                        experiencia.model[i].scaleModel = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString().Replace("(", "").Replace(")", ""));

                        EditorGUILayout.Space();

                        if (ObjetoaCapturar.transform.childCount > 0)
                        {
                            int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                            experiencia.model[i].hotspots = new List<SubObjeto>();
                            while (tamañosubhijos > experiencia.model[i].hotspots.Count)
                            {
                                //listasubobjetos.Add(new SubObjeto());
                                experiencia.model[i].hotspots.Add(new SubObjeto());
                            }
                            for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                            {
                                if (ObjetoaCapturar.transform.GetChild(i).GetChild(ji).transform.tag == "hotspot")
                                {
                                    GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);
                                    experiencia.model[i].hotspots[ji].nameHotspot = EditorGUILayout.TextField("nombre del hotspot " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                                    experiencia.model[i].hotspots[ji].positionHotspot = EditorGUILayout.TextField("posicion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.position.ToString().Replace("(", "").Replace(")", ""));
                                    experiencia.model[i].hotspots[ji].rotationHotspot = EditorGUILayout.TextField("rotacion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.rotation.ToString().Replace("(", "").Replace(")", ""));
                                    experiencia.model[i].hotspots[ji].imageHotsPot = experiencia.model[i].hotspots[ji].nameHotspot;

                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount > 0)
                                    {
                                        for (int k = 0; k < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount; k++)
                                        {
                                            experiencia.model[i].hotspots[ji].positionMenu = EditorGUILayout.TextField("posicion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.position.ToString().Replace("(", "").Replace(")", ""));
                                            experiencia.model[i].hotspots[ji].scaleMenu = EditorGUILayout.TextField("escala del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localScale.ToString().Replace("(", "").Replace(")", ""));
                                            experiencia.model[i].hotspots[ji].rotationMenu = EditorGUILayout.TextField("rotacion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.rotation.ToString().Replace("(", "").Replace(")", ""));
                                            if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<Canvas>() != null)
                                            {
                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).GetChild(0).gameObject.GetComponent<Image>() != null)
                                                {
                                                    experiencia.model[i].hotspots[ji].typeHotsPot = "image";
                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount > 0)
                                                    {
                                                        for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; l++)
                                                        {
                                                            SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                            experiencia.model[i].hotspots[ji].pathArray = experiencia.model[i].hotspots[ji].pathArray + AssetDatabase.GetAssetPath(SpriteHolder.sprite) + "#";
                                                        }
                                                    }
                                                    experiencia.model[i].hotspots[ji].pathArray = EditorGUILayout.TextField("direccion del archivo", experiencia.model[i].hotspots[ji].pathArray);
                                                    EditorGUILayout.Space();
                                                }
                                                else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).GetChild(0).gameObject.GetComponent<Text>() != null)
                                                {
                                                    experiencia.model[i].hotspots[ji].typeHotsPot = "texto";
                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount > 0)
                                                    {
                                                        for (int m = 0; m < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; m++)
                                                        {
                                                            TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(m).gameObject.GetComponent<Text>();
                                                            experiencia.model[i].hotspots[ji].pathArray = experiencia.model[i].hotspots[ji].pathArray + TextHolder.text + "#";
                                                        }
                                                        experiencia.model[i].hotspots[ji].pathArray = EditorGUILayout.TextField("direccion del archivo", experiencia.model[i].hotspots[ji].pathArray);
                                                        EditorGUILayout.Space();
                                                    }
                                                }
                                            }
                                            else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<VideoPlayer>() != null)
                                            {
                                                VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<VideoPlayer>();
                                                experiencia.model[i].hotspots[ji].typeHotsPot = "video";
                                                experiencia.model[i].hotspots[ji].pathArray = EditorGUILayout.TextField("camino del archivo", AssetDatabase.GetAssetPath(VideoHolder.clip));
                                                //Debug.Log("hay videoplayer");
                                                EditorGUILayout.Space();
                                            }
                                            else
                                            {
                                                Debug.LogWarning("El Objeto Hijo No Contiene Ningun tipo reconocible");
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
        GUILayout.EndScrollView();
    }

    public void OnInspectorUpdate()
    {
        //this.Repaint();
    }

    public void TestJson()
    {
        string jsonpath;
        string json = JsonUtility.ToJson(experiencia, true);

        //string json = JsonHelper.ToJson(Experiencia, true);

        jsonpath = EditorUtility.SaveFilePanel("Seleccione la carpeta donde va a alojar el json", "", "data", "json");


        File.WriteAllText(jsonpath, json);


        Debug.Log(json);
    }


}
