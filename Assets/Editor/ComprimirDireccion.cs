using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO.Compression;

public class ComprimirDireccion : EditorWindow
{

    string path;

    string zipPath;

    [MenuItem("Invenza Creator SDK/Comprimir Carpeta")]
    /**
     * Name: CrearVentana
     * Description: Crea la ventana para capturar la posicion de el GameObject
     * Params: NO
     * Return: NO
     * 
     * */
    public static void CrearVentana()
    {
        GetWindow(typeof(ComprimirDireccion));
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
        GUILayout.Label("Direccion de la carpeta", EditorStyles.boldLabel);

        if (GUILayout.Button("Buscar"))
        {
            path = EditorUtility.OpenFolderPanel("Seleccione la carpeta a comprimir","","");
        }

        GUILayout.TextField(path,GUILayout.MaxWidth(500.0f));


        if (GUILayout.Button("Comprimir"))
        {


            zipPath = EditorUtility.SaveFilePanel("Seleccione la carpeta donde va a alojar el comprimido", "","result", ".zip");

            ComprimirCarpeta(zipPath);
        }
    }


    public void ComprimirCarpeta(string zipPath)
    {
        System.IO.Compression.ZipFile.CreateFromDirectory(path, zipPath);
    }




}
