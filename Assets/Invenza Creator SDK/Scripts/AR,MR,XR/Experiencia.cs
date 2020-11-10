using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class Experiencia : MonoBehaviour
{
    public string SHORT_TITLE;
    public string TYPE;
    public string URL_INTERNAL_FILE;
    public List<Objeto> MODEL = new List<Objeto>();
    public string NAME_FILE_ZIP;
    public string URL_FILE;
}
