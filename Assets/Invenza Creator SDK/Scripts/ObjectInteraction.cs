using System.Collections;
using System.Collections.Generic;
using Pvr_UnitySDKAPI;
using UnityEngine;

public class ObjectInteraction : MonoBehaviour
{
    // Start is called before the first frame update

    //The focus of the object's "attach" movement(left hand / right hand)
    public Transform node0;
    public Transform node1;

    //Controller(left hand / right hand)
    public GameObject controller0;
    public GameObject controller1;

    //The speed of the "attach" process
    public float attachSpeed;

    //The speed of throwing objects
    public float throwSpeed = 5;

    //Controller in use
    private GameObject currentController;

    //The focus of the object's "attach" movement
    private Transform currentNode;

    private int mainHandNess;

    private Ray ray;
    private RaycastHit hit;

    //The material in the highlighted state of the object
    //[SerializeField]
    public Material pointMaterial;
    //[SerializeField]
    public Material normalMaterial;

    //The key is pressed or not pressed
    private bool noClick = true;

    //The current state of motion of the object
    private bool moveState = false;


    public GameObject interactableinfo;


    public Animator objectAnimator;

    public AudioSource soundSource;


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
        //Determined whether the handle is connected
        if (Controller.UPvr_GetControllerState(0) == ControllerState.Connected || Controller.UPvr_GetControllerState(1) == ControllerState.Connected)
        {
            //Get the current master control controller index
            mainHandNess = Pvr_UnitySDKAPI.Controller.UPvr_GetMainHandNess();

            if (mainHandNess == 0)
            {
                currentController = controller0;
                currentNode = node0;
            }

            if (mainHandNess == 1)
            {
                currentController = controller1;
                currentNode = node1;

            }
            ray.direction = currentController.transform.forward - currentController.transform.up * 0.25f;
            ray.origin = currentController.transform.Find("start").position;

            //Determine whether the ray interacts with this object
            if (Physics.Raycast(ray, out hit) && (hit.transform == transform))
            {
                if (noClick)
                {
                    transform.GetComponent<MeshRenderer>().material = pointMaterial;
                }

                {
                    //Judging whether the "Trigger" is pressed or not
                    if (Input.GetKey(KeyCode.Space) || Pvr_UnitySDKAPI.Controller.UPvr_GetKey(mainHandNess, Pvr_UnitySDKAPI.Pvr_KeyCode.TRIGGER))
                    {
                        interactableinfo.SetActive(true);
                        PlayAnimator("",true);
                        soundSource.Play();
                    }
                }
            }
            else
            {
                transform.GetComponent<MeshRenderer>().material = normalMaterial;
            }

            //Checking whether the "Trigger" is lifted or not
            if (Input.GetKeyUp(KeyCode.Space) || Pvr_UnitySDKAPI.Controller.UPvr_GetKeyUp(mainHandNess, Pvr_UnitySDKAPI.Pvr_KeyCode.TRIGGER))
            {
                interactableinfo.SetActive(false);
                PlayAnimator("", false);
                soundSource.Stop();
                noClick = false;
            }
        }
    }


    public void PlayAnimator(string condition,bool play)
    {
        objectAnimator.SetBool(condition,play);               
    }
}