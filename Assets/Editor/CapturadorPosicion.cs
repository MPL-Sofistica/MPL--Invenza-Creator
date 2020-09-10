using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEngine.Video;
using UnityEngine.UI;


public class CapturadorPosicion : EditorWindow
{

    Vector3 PosicionObjeto;
    Vector3 EscalaObjeto;

    [SerializeField] public List<Objeto> HijosdelObjeto = new List<Objeto>();

    [SerializeField] public List<SubObjeto> SubHijos = new List<SubObjeto>();

    private int numhijos;

    private int numsubhijos;

    GameObject ObjetoaCapturar;

    SpriteRenderer SpriteHolder;

    VideoPlayer VideoHolder;

    Text TextHolder;


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

        ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true) as GameObject;

        GUILayout.Label("Posicion del Objeto", EditorStyles.boldLabel);


        PosicionObjeto = EditorGUILayout.Vector3Field("Posicion del Objeto", PosicionObjeto);
        EscalaObjeto = EditorGUILayout.Vector3Field("Escala del Objeto", EscalaObjeto);


        numhijos = EditorGUILayout.IntField("numero de hijos: ", numhijos);

        numhijos = ObjetoaCapturar.transform.childCount;


        List<Objeto> lista = HijosdelObjeto;

        List<SubObjeto> listasubobjetos = SubHijos;

        if (GUILayout.Button("Capturar la Posición"))
        {
            CapturarPosicion();
        }

        int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos));
        while (tamano > lista.Count)
        {
            lista.Add(new Objeto());
        }

        while (tamano < lista.Count)
        {
            lista.RemoveAt(lista.Count - 1);
        }


        if (ObjetoaCapturar != null)
        {
            numsubhijos = ObjetoaCapturar.transform.childCount;
            for (int i = 0; i < numhijos; i++)
            {
                GUILayout.Label("Hijo " + i + " del objeto:", EditorStyles.boldLabel);
                lista[i].posicion = EditorGUILayout.Vector3Field("Posicion", ObjetoaCapturar.transform.GetChild(i).transform.position);
                lista[i].rotacion = EditorGUILayout.Vector3Field("Rotacion", ObjetoaCapturar.transform.GetChild(i).transform.rotation.eulerAngles);
                EditorGUILayout.Space();

                if (ObjetoaCapturar.transform.childCount > 0)
                {
                    int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                    while (tamañosubhijos > listasubobjetos.Count)
                    {
                        listasubobjetos.Add(new SubObjeto());
                    }
                    for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                    {
                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<SpriteRenderer>() != null)
                        {
                            SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<SpriteRenderer>();
                            GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", AssetDatabase.GetAssetPath(SpriteHolder.sprite));
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                            Debug.Log("hay spriterenderer");
                        }
                        else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<VideoPlayer>() != null)
                        {
                            VideoHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<VideoPlayer>();
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", AssetDatabase.GetAssetPath(VideoHolder.clip));
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                            Debug.Log("hay videoplayer");

                        }
                        else if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Text>() != null)
                        {
                            TextHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<Text>();
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", TextHolder.text);
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                            Debug.Log("hay texto");
                        }
                        else
                        {
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", "no hay ningun tipo de compatibilidad");
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                            Debug.LogWarning("El Objeto Hijo No Contiene Ningun tipo reconocible");
                        }
                    }
                }
            }
        }        
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
        if (ObjetoaCapturar == null)
        {
            Debug.LogError("No Existe un objeto en el campo Objeto a Capturar");
            return;
        }
        PosicionObjeto = ObjetoaCapturar.transform.position;
        EscalaObjeto = ObjetoaCapturar.transform.localScale;
    }


    private void CapturarHijos()
    {
        numhijos = EditorGUILayout.IntField("numero de hijos: ", numhijos);

        numhijos = ObjetoaCapturar.transform.childCount;


        List<Objeto> lista = HijosdelObjeto;

        List<SubObjeto> listasubobjetos = SubHijos;

        int tamano = Mathf.Max(0, EditorGUILayout.IntField("Tamaño", numhijos));
        while (tamano > lista.Count)
        {
            lista.Add(new Objeto());
        }

        while (tamano < lista.Count)
        {
            lista.RemoveAt(lista.Count - 1);
        }


        if (ObjetoaCapturar != null)
        {
            numsubhijos = ObjetoaCapturar.transform.childCount;
            for (int i = 0; i < numhijos; i++)
            {
                GUILayout.Label("Hijo " + i + " del objeto:", EditorStyles.boldLabel);
                lista[i].posicion = EditorGUILayout.Vector3Field("Posicion", ObjetoaCapturar.transform.GetChild(i).transform.position);
                lista[i].rotacion = EditorGUILayout.Vector3Field("Rotacion", ObjetoaCapturar.transform.GetChild(i).transform.rotation.eulerAngles);
                EditorGUILayout.Space();

                if (ObjetoaCapturar.transform.childCount > 0)
                {
                    int tamañosubhijos = ObjetoaCapturar.transform.GetChild(i).transform.childCount;
                    while (tamañosubhijos > listasubobjetos.Count)
                    {
                        listasubobjetos.Add(new SubObjeto());
                    }
                    for (int ji = 0; ji < ObjetoaCapturar.transform.GetChild(i).childCount; ji++)
                    {
                        if (ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<SpriteRenderer>() != null)
                        {
                            SpriteHolder = ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).gameObject.GetComponent<SpriteRenderer>();
                            GUILayout.Label("Sub Hijo del objeto", EditorStyles.boldLabel);
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", AssetDatabase.GetAssetPath(SpriteHolder.sprite));
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                            Debug.Log("hay spriterenderer");
                        }
                        else
                        {
                            listasubobjetos[ji].path = EditorGUILayout.TextField("camino de el archivo", "no es tipo sprite");
                            listasubobjetos[ji].name = EditorGUILayout.TextField("Nombre del objeto", ObjetoaCapturar.transform.GetChild(i).transform.GetChild(ji).transform.name);
                        }
                    }
                }
            }
        }
    }

}
