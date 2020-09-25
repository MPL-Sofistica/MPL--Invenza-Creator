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

    public string tituloCardV;
    public string type;

    public List<Objeto> model = new List<Objeto>();


    public enum Tipos
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


    //Vector3 PosicionObjeto;
    //Vector3 EscalaObjeto;

    //public List<Objeto> lista = new List<Objeto>();

    /*[SerializeField]*/
    // public List<SubObjeto> listasubobjetos = new List<SubObjeto>();

    private int numhijos;

    private int numsubhijos;

    // GameObject ObjetoaCapturar;

    Image SpriteHolder;

    List<Sprite> imagenreferencia = new List<Sprite>();

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

        scrollPosition = GUILayout.BeginScrollView(scrollPosition, false, true, GUILayout.Width(500), GUILayout.Height(700));




        GUILayout.Label("Titulo de la experiencia", EditorStyles.boldLabel);

        tituloCardV = EditorGUILayout.TextField("Titulo", GUILayout.MaxWidth(200));

        GUILayout.Label("Seleccione el tipo de la experiencia", EditorStyles.boldLabel);

        tipodeexperiencia = (Tipos)EditorGUILayout.EnumPopup("", tipodeexperiencia, GUILayout.MaxWidth(200));


        type = tipodeexperiencia.ToString();

        GUILayout.Label("Objeto a Capturar", EditorStyles.boldLabel);

        ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true) as GameObject;



        if (ObjetoaCapturar != null)
        {
            numhijos = ObjetoaCapturar.transform.childCount;

        }

        if (GUILayout.Button("Capturar la Posición"))
        {
            CapturarPosicion();
        }

        if (GUILayout.Button("Convertir a Json"))
        {
            TestJson();
        }

        int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos));
        while (tamano > model.Count)
        {
            model.Add(new Objeto());

        }

        while (numhijos > imagenreferencia.Count)
        {
            imagenreferencia.Add(Sprite.Create(null, new Rect(new Vector2(0, 0), new Vector2(0, 0)), new Vector2(0, 0)));
        }

        while (tamano < model.Count)
        {
            model.RemoveAt(model.Count - 1);
            imagenreferencia.RemoveAt(imagenreferencia.Count - 1);
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
                        subelements.RemoveAt(model.Count - 1);
                    }

                    GUILayout.Label("Hotspot " + i + " del objeto:", EditorStyles.boldLabel);
                    subelements[i] = EditorGUILayout.Foldout(subelements[i], "Elemento" + i);

                    if (subelements[i])
                    {
                        model[i].nameModel = EditorGUILayout.TextField(ObjetoaCapturar.transform.GetChild(i).transform.name, GUILayout.MaxWidth(200));
                        imagenreferencia[i] = EditorGUILayout.ObjectField("imagen de referencia", imagenreferencia[i], typeof(Sprite), true) as Sprite;
                        if (imagenreferencia != null)
                        {
                            model[i].pathImageRef = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.name);
                        }
                        model[i].pathModel = EditorGUILayout.TextField("direccion del modelo", AssetDatabase.GetAssetPath(ObjetoaCapturar.transform.GetChild(i).gameObject as GameObject));

                        //model[i].posicion = EditorGUILayout.Vector3Field("Posicion", ObjetoaCapturar.transform.GetChild(i).transform.position);
                        //model[i].rotacion = EditorGUILayout.Vector3Field("Rotacion", ObjetoaCapturar.transform.GetChild(i).transform.rotation.eulerAngles);
                        EditorGUILayout.Space();

                        if (ObjetoaCapturar.transform.childCount > 0)
                        {
                            int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                            model[i].hostpots = new List<SubObjeto>();
                            while (tamañosubhijos > model[i].hostpots.Count)
                            {
                                //listasubobjetos.Add(new SubObjeto());
                                model[i].hostpots.Add(new SubObjeto());
                            }
                            for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                            {
                                if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Image>() != null)
                                {
                                    SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Image>();
                                    GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);
                                    //model[i].hostpots[ji].path = EditorGUILayout.TextField("camino de el archivo", AssetDatabase.GetAssetPath(SpriteHolder.sprite));
                                    //model[i].hostpots[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                                    //Debug.Log("hay spriterenderer");
                                }
                                else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<VideoPlayer>() != null)
                                {
                                    VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<VideoPlayer>();
                                    //model[i].hostpots[ji].path = EditorGUILayout.TextField("camino de el archivo", AssetDatabase.GetAssetPath(VideoHolder.clip));
                                    //model[i].hostpots[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                                    //Debug.Log("hay videoplayer");

                                }
                                else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Text>() != null)
                                {
                                    TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Text>();
                                    //model[i].hostpots[ji].path = EditorGUILayout.TextField("camino de el archivo", TextHolder.text);
                                    //model[i].hostpots[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                                    //Debug.Log("hay texto");
                                }
                                else
                                {
                                    //model[i].hostpots[ji].path = EditorGUILayout.TextField("camino de el archivo", "no hay ningun tipo de compatibilidad");
                                    //model[i].hostpots[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                                    //Debug.LogWarning("El Objeto Hijo No Contiene Ningun tipo reconocible");
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


    /**
* Name: CapturarPosicion
* Description: Captura la posicion del GameObject puesto en la variable
* Params: NO
* Return: se ve la posicion dentro de la ventana de editor creada
* 
* */
    private void CapturarPosicion()
    {
        /*if (ObjetoaCapturar == null)
        {
            Debug.LogError("No Existe un objeto en el campo Objeto a Capturar");
            return;
        }*/
        //PosicionObjeto = ObjetoaCapturar.transform.position;
        //EscalaObjeto = ObjetoaCapturar.transform.localScale;
    }

    public void OnInspectorUpdate()
    {
        this.Repaint();
    }

    public void TestJson()
    {

        //string json = JsonUtility.ToJson(lista);

        //string json = JsonHelper.ToJson(lista, true);


        //Debug.Log(json);

    }


}
