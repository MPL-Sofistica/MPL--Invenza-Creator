using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class cambio_escena1 : MonoBehaviour
{

   public void ChangeScene(int scene)
    {
        SceneManager.LoadScene(scene);
    }
}
