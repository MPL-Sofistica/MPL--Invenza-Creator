using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;



/**
* Name: JsonHelper
* Description: clase que genera los json a partir de un arreglo de arreglos, cosa que la clase basica de unity no permite
* Params: NO
* Return: informacion solicitada por el usuario en formato json a partir de los parametros que se ingresen dentro de la clase
* 
* */

public static class JsonHelper
{
    public static List<T> FromJson<T>(string json)
    {
        Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(json);
        return wrapper.Items;
    }

    public static string ToJson<T>(List<T> array)
    {
        Wrapper<T> wrapper = new Wrapper<T>();
        wrapper.Items = array;
        return JsonUtility.ToJson(wrapper);
    }

    public static string ToJson<T>(List<T> array, bool prettyPrint)
    {
        Wrapper<T> wrapper = new Wrapper<T>();
        wrapper.Items = array;
        return JsonUtility.ToJson(wrapper, prettyPrint);
    }

    [Serializable]
    private class Wrapper<T>
    {
        public List<T> Items;
    }
}