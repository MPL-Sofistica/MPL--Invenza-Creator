using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InstructionManagerText : MonoBehaviour
{
    public string[] instructions;


    int counter = 0;

    public Text instructioncontainer;

    public GameObject Botondelante;
    public GameObject Botondetras;

    public void Start()
    {

    }


    public void changeinstructionsUP()
    {
        if (counter < instructions.Length - 1)
        {
            instructioncontainer.text = instructions[counter + 1];
            counter++;

            if (counter > 0)
            {
                Botondetras.SetActive(true);
            }


            if (instructions.Length - 1 == counter)
            {
                Botondelante.SetActive(false);
            }

        }
        else
        {
            if (instructions.Length - 1 == counter)
            {
                Botondelante.SetActive(false);
            }
        }


    }

    public void changeinstructionsDown()
    {

        if (counter > 0)
        {
            instructioncontainer.text = instructions[counter - 1];

            counter--;

            if (counter < instructions.Length)
            {

                Botondelante.SetActive(true);
            }


            if (0 == counter)
            {
                Botondetras.SetActive(false);
            }

        }
        else
        {
            if (instructions.Length - 1 == 0)
            {
                Botondelante.SetActive(false);
            }
        }


    }





}
