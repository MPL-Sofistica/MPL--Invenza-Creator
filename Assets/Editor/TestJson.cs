using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;



public class TestJson : EditorWindow
{


    [MenuItem("Invenza Creator SDK/Json")]

    public static void CrearVentana()
    {
        GetWindow(typeof(TestJson));
    }

    private void OnGUI()
    {


        if (GUILayout.Button("probar json"))
        {
            TEstfill();
        }

    }

    private void TEstfill()
    {




        //string json = JsonUtility.ToJson(objetotest);
        //Debug.Log(json);
    }


}
