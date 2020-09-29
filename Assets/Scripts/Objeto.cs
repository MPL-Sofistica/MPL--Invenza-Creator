using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class Objeto
{
    public string nameModel;
    public string pathImageRef;
    public string pathModel;
    public string scaleModel;
    public List<SubObjeto> hotspots;
}
