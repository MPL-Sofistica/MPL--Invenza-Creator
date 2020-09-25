using UnityEngine;
using System.Collections;
using UnityEditor;
public class TestScrollView : EditorWindow
{

    Vector2 scrollPosition = Vector2.zero;


    [MenuItem("Invenza Creator SDK/Test Scroll")]
    /**
     * Name: CrearVentana
     * Description: Crea la ventana para capturar la posicion de el GameObject
     * Params: NO
     * Return: NO
     * 
     * */
    public static void CrearVentana()
    {
        GetWindow(typeof(TestScrollView));
    }



    void OnGUI()
    {
        scrollPosition = GUILayout.BeginScrollView(scrollPosition, true, true, GUILayout.Width(500), GUILayout.Height(1000));

        

        //GUILayout.EndArea();
        GUILayout.EndScrollView();
    }
}