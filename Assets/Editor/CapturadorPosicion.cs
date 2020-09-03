using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;


public class CapturadorPosicion : EditorWindow
{

    Vector3 PosicionObjeto;

    Vector3 PosicionPanelHijo;

    Vector3 Posicion2PanelHijo;


    GameObject ObjetoaCapturar;


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
        GUILayout.Label("Posicion del Objeto", EditorStyles.boldLabel);


        PosicionObjeto = EditorGUILayout.Vector3Field("Posicion del Objeto", PosicionObjeto);


        PosicionPanelHijo = EditorGUILayout.Vector3Field("Posicion del hijo", PosicionPanelHijo);

        Posicion2PanelHijo = EditorGUILayout.Vector3Field("Posicion del segundo hijo", Posicion2PanelHijo);


        ObjetoaCapturar = EditorGUILayout.ObjectField("Objeto a Capturar", ObjetoaCapturar, typeof(GameObject), true) as GameObject;

        if (GUILayout.Button("Capturar la Posición"))
        {
            CapturarPosicion();
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
        if (ObjetoaCapturar==null)
        {
            Debug.LogError("No Existe un objeto en el campo Objeto a Capturar");
            return;
        }

        PosicionObjeto = ObjetoaCapturar.transform.position;

        PosicionPanelHijo = ObjetoaCapturar.transform.GetChild(0).transform.position;

        Posicion2PanelHijo = ObjetoaCapturar.transform.GetChild(1).transform.position;

    }





}
