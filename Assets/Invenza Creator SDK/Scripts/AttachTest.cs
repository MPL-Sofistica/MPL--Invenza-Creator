using System.Collections;
using System.Collections.Generic;
using Pvr_UnitySDKAPI;
using UnityEngine;


public class AttachTest : MonoBehaviour
{
    // Start is called before the first frame update   
    public Animator objectanim;
    public Animator buttonanim;


    //Controller(left hand / right hand)
    public GameObject controller0;
    public GameObject controller1;

    public float maxdistance;
    //Controller in use
    private GameObject currentController;

    private int mainHandNess;

    private Ray ray;
    private RaycastHit hit;

    //The key is pressed or not pressed
    private bool noClick = true;

    //The current state of motion of the object
    private bool moveState = false;

    //private Vector3 currentPosition;
    //private Vector3 lastPosition;
    //private Vector3 movementDirection; 


    public bool ishit;

    void Start()
    {
        ray = new Ray();
        hit = new RaycastHit();

        //attachMaterial = Resources.Load<Material>("Materials/Custom_AttachMaterial");
        //normalMaterial = Resources.Load<Material>("Materials/Custom_NormalMaterial");
    }

    // Update is called once per frame
    void Update()
    {

        if (ishit)
        {
            //Determined whether the handle is connected
            if (Controller.UPvr_GetControllerState(0) == ControllerState.Connected || Controller.UPvr_GetControllerState(1) == ControllerState.Connected || Input.GetKey(KeyCode.Space))
            {
                //Get the current master control controller index
                //mainHandNess = Pvr_UnitySDKAPI.Controller.UPvr_GetMainHandNess();

                mainHandNess = 1;

                if (mainHandNess == 0)
                {
                    currentController = controller0;
                }

                if (mainHandNess == 1)
                {
                    currentController = controller1;

                }

                ray.direction = currentController.transform.forward - currentController.transform.up * 0.25f;
                ray.origin = currentController.transform.Find("start").position;

                //Determine whether the ray interacts with this object
                if (Physics.Raycast(ray.origin, ray.direction, out hit, maxdistance) && (hit.transform == transform))
                {
                    objectanim.SetBool("Open", true);
                    buttonanim.SetBool("Open", true);
                }
                else
                {

                }

                //Checking whether the "Trigger" is lifted or not
                if (Input.GetKeyUp(KeyCode.Space) || Pvr_UnitySDKAPI.Controller.UPvr_GetKeyUp(mainHandNess, Pvr_UnitySDKAPI.Pvr_KeyCode.TRIGGER))
                {
                    if (moveState)
                    {

                    }
                }
            }
        }
    }
}
