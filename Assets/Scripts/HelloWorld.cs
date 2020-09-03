using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class HelloWorld : MonoBehaviour
{

    public Text HolaMundo;


    private void Start()
    {
        HolaMundo.text = "Hola Mundo";
    }

    private void Update()
    {

    }
}
