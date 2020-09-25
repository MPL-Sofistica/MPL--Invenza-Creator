using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class vectortostring : MonoBehaviour
{

    public Vector3 vectortest = new Vector3(15.23f, 12.47f, 5.326547f);



    // Start is called before the first frame update
    void Start()
    {

        Debug.Log(vectortest.ToString());
    }

    // Update is called once per frame
    void Update()
    {

    }
}
