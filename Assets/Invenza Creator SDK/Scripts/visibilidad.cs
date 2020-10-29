using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class visibilidad : MonoBehaviour{
    public GameObject Cajainfo1;
    public GameObject Cajainfo2;
    bool state;
  
      public void vis_info1()
      {
          state = !state; 
          Cajainfo1.gameObject.SetActive (state);
      }

      public void vis_info2()
      {
          state = !state; 
          Cajainfo2.gameObject.SetActive (state);
      }
    }
