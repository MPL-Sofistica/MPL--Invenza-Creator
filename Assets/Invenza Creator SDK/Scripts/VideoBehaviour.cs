using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;


public class VideoBehaviour : MonoBehaviour
{


    public VideoPlayer videoplayer;
    public Animator anim;


    public void VideoPause()
    {

        videoplayer.Pause();
        anim.speed = 0;
    }


    public void VideoPlay()
    {
        videoplayer.Play();
        anim.speed = 1;
    }
}
