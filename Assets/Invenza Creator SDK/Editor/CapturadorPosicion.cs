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

    string nombre;

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
        CapturadorPosicion ventana = (CapturadorPosicion)GetWindow(typeof(CapturadorPosicion));
        ventana.maxSize = new Vector2(600, 700);
        ventana.minSize = new Vector2(500, 700);
        ventana.titleContent.text = "Invenza Creator SDK";
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

        scrollPosition = GUILayout.BeginScrollView(scrollPosition, false, true, GUILayout.Width(500), GUILayout.Height(700));

        GUILayout.Label("Titulo de la experiencia", EditorStyles.boldLabel);

        experiencia.SHORT_TITLE = EditorGUILayout.TextField("", experiencia.SHORT_TITLE);

        GUILayout.Label("Seleccione el tipo de la experiencia", EditorStyles.boldLabel);

        tipodeexperiencia = (Tipos)EditorGUILayout.EnumPopup("", tipodeexperiencia, GUILayout.MaxWidth(480));


        experiencia.TYPE = tipodeexperiencia.ToString();

        GUILayout.Label("Objeto a Capturar", EditorStyles.boldLabel);

        ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;



        if (ObjetoaCapturar != null)
        {
            numhijos = ObjetoaCapturar.transform.childCount;
        }

        if (GUILayout.Button("Convertir a Json", GUILayout.Width(480)))
        {
            TestJson();
        }

        int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos, GUILayout.MaxWidth(480)));

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
                        experiencia.model[i].NAME_MODEL = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(480));
                        EditorGUILayout.Space();
                        imagenreferencia[i] = EditorGUILayout.ObjectField("imagen de referencia", imagenreferencia[i], typeof(Sprite), true, GUILayout.MaxWidth(480)) as Sprite;
                        if (imagenreferencia[i] != null)
                        {
                            experiencia.model[i].PATH_IMAGE_REF = EditorGUILayout.TextField("Dirección de la imagen", AssetDatabase.GetAssetPath(imagenreferencia[i]), GUILayout.MaxWidth(480));
                        }

                        modelos3D[i] = EditorGUILayout.ObjectField("Modelo 3d del objeto en la escena", modelos3D[i], typeof(GameObject), true, GUILayout.MaxWidth(480)) as GameObject;
                        if (modelos3D[i] != null)
                        {
                            experiencia.model[i].PATH_MODEL = EditorGUILayout.TextField("Dirección del modelo", AssetDatabase.GetAssetPath(modelos3D[i]), GUILayout.MaxWidth(480));
                        }
                        experiencia.model[i].PATH_MODEL = EditorGUILayout.TextField("Escala del modelo", ObjetoaCapturar.transform.GetChild(i).transform.localScale.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));

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
                                    experiencia.model[i].hotspots[ji].NAME_HOTSPOT = EditorGUILayout.TextField("nombre del hotspot " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name, GUILayout.MaxWidth(480));
                                    experiencia.model[i].hotspots[ji].POSITION_HOTSPOT = EditorGUILayout.TextField("posicion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.position.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                    experiencia.model[i].hotspots[ji].ROTATION_HOTSPOT = EditorGUILayout.TextField("rotacion del hotsptpot numero: " + ji + " ", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.rotation.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                    experiencia.model[i].hotspots[ji].IMAGE_HOTSPOT = experiencia.model[i].hotspots[ji].NAME_HOTSPOT;

                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount > 0)
                                    {
                                        for (int k = 0; k < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.childCount; k++)
                                        {
                                            experiencia.model[i].hotspots[ji].POSITION_PANEL = EditorGUILayout.TextField("posicion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.position.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                            experiencia.model[i].hotspots[ji].SCALE_PANEL = EditorGUILayout.TextField("escala del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.localScale.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                            experiencia.model[i].hotspots[ji].ROTATION_PANEL = EditorGUILayout.TextField("rotacion del panel", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.rotation.ToString().Replace("(", "").Replace(")", ""), GUILayout.MaxWidth(480));
                                            if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<Canvas>() != null)
                                            {
                                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).GetChild(0).gameObject.GetComponent<Image>() != null)
                                                {
                                                    experiencia.model[i].hotspots[ji].TYPE = "image";
                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount > 0)
                                                    {
                                                        string aux;
                                                        for (int l = 0; l < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; l++)
                                                        {
                                                            SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(l).gameObject.GetComponent<Image>();
                                                            aux = AssetDatabase.GetAssetPath(SpriteHolder.sprite);

                                                            if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                            {
                                                                aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                            }

                                                            experiencia.model[i].hotspots[ji].PATH_ARRAY = experiencia.model[i].hotspots[ji].PATH_ARRAY + aux + "&&";
                                                        }

                                                        experiencia.model[i].hotspots[ji].PATH_ARRAY = experiencia.model[i].hotspots[ji].PATH_ARRAY.Substring(0, experiencia.model[i].hotspots[ji].PATH_ARRAY.Length - 2); ;
                                                    }
                                                    EditorGUILayout.LabelField("Dirección del archivo");
                                                    experiencia.model[i].hotspots[ji].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.model[i].hotspots[ji].PATH_ARRAY, GUILayout.Height(50), GUILayout.Width(position.width - 20));
                                                    EditorGUILayout.Space();
                                                }
                                                else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).GetChild(0).gameObject.GetComponent<Text>() != null)
                                                {
                                                    experiencia.model[i].hotspots[ji].TYPE = "texto";
                                                    if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount > 0)
                                                    {
                                                        for (int m = 0; m < ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.childCount; m++)
                                                        {
                                                            TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).transform.GetChild(m).gameObject.GetComponent<Text>();
                                                            experiencia.model[i].hotspots[ji].PATH_ARRAY = experiencia.model[i].hotspots[ji].PATH_ARRAY + TextHolder.text + "&&";
                                                        }
                                                        experiencia.model[i].hotspots[ji].PATH_ARRAY = experiencia.model[i].hotspots[ji].PATH_ARRAY.Substring(0, experiencia.model[i].hotspots[ji].PATH_ARRAY.Length - 2);
                                                    }
                                                    EditorGUILayout.LabelField("Contenido del texto");
                                                    experiencia.model[i].hotspots[ji].PATH_ARRAY = EditorGUILayout.TextArea(experiencia.model[i].hotspots[ji].PATH_ARRAY, GUILayout.Height(50), GUILayout.MaxWidth(480));
                                                    EditorGUILayout.Space();
                                                }
                                            }
                                            else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<VideoPlayer>() != null)
                                            {
                                                VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.GetChild(k).gameObject.GetComponent<VideoPlayer>();
                                                experiencia.model[i].hotspots[ji].TYPE = "video";

                                                string aux = AssetDatabase.GetAssetPath(VideoHolder.clip);

                                                if (aux.StartsWith("Assets/Invenza Creator SDK/"))
                                                {
                                                    aux = aux.Replace("Assets/Invenza Creator SDK/", "");
                                                }
                                                experiencia.model[i].hotspots[ji].PATH_ARRAY = EditorGUILayout.TextField("Dirección del archivo", aux, GUILayout.MaxWidth(480));

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
