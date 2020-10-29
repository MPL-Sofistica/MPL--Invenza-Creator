using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class Objeto
{
    public string NAME_MODEL;
    public string PATH_IMAGE_REF;
    public string PATH_MODEL;
    public string SCALE_MODEL;
    public List<SubObjeto> hotspots;
}
