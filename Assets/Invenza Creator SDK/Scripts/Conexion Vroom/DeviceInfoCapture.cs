using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Timers;
using System;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Threading;
using System.Text;
using UnityEngine.UI;


/**
 * 
 * Nombre: DeviceInfoCapture
 * 
 * 
 * Descripcion: Clase que captura la informacion del dispositivo para enviarla por websocket al servidor de Vroom
 * 
 * **/

public class DeviceInfoCapture : MonoBehaviour
{
    AndroidHelper helper = new AndroidHelper();

    public static Message deviceinfo = new Message();

    public GameObject manager;

    private static ScreenCapture capture;

    float memoria;
    float bateria;
    float memoria_total;

    public float fps = 1f;

    private static System.Timers.Timer aTimer;
    private Messageholder holder = new Messageholder();

    public static DownloadUtils downutils;

    private void Start()
    {
        helper = manager.GetComponent<AndroidHelper>();
        downutils = manager.GetComponent<DownloadUtils>();
        capture = manager.GetComponent<ScreenCapture>();
        if (BroadcastConnection.docente != null)
        {
            fps = float.Parse(BroadcastConnection.docente.fps_v);
        }
        //capture.InvokeRepeating("TimedScreen", 1f, fps);

        //StartCoroutine("timedEvent");
        aTimer = new System.Timers.Timer(5000);
        //aTimer.Elapsed += onTimeEvent;
        aTimer.Elapsed += delegate { onThreadEvent(holder); };
        aTimer.AutoReset = true;
        aTimer.Enabled = true;
    }


    /**
     * 
     * Nombre: onThreadEvent
     * 
     * Descripcion: adquiere un objeto de tipo Messageholder, lo transforma en json y lo envia a travez de websocket
     * 
     * Params: Messageholder holder
     * 
     * **/

    private void onThreadEvent(Messageholder holder)
    {
        holder.message = deviceinfo;

        string sendmessage = JsonUtility.ToJson(holder);
        //Debug.Log(deviceinfo.name);

        Receive(sendmessage);
        deviceinfo.screenshot.Clear();
    }

    private void Update()
    {
        if (BroadcastConnection.docente != null)
        {
            fps = float.Parse(BroadcastConnection.docente.fps_v, System.Globalization.NumberStyles.Float, new System.Globalization.CultureInfo("en-US"));
        }
#if UNITY_EDITOR
        /*deviceinfo.id = SystemInfo.deviceUniqueIdentifier;
        deviceinfo.name = SystemInfo.deviceName;

        memoria = 30f;
        deviceinfo.memory = memoria.ToString("F2");

        memoria_total = 30f * 100 / 50f;

        deviceinfo.memory_p = memoria_total.ToString();

        bateria = SystemInfo.batteryLevel * 100;

        deviceinfo.drums = "100";

        if (capture.takeHiResShot)
        {
            deviceinfo.screenshot.Add(capture.GetScreenshot());
            capture.takeHiResShot = false;
            //Debug.Log(deviceinfo.screenshot);
        }

        holder.message = deviceinfo;*/

#elif UNITY_ANDROID

        deviceinfo.id = helper.getSerialNumber();
        deviceinfo.name = helper.getSerialNumber();

        memoria = helper.GetStorage();
        deviceinfo.memory = memoria.ToString("F2");
        memoria_total = helper.GetStorage() * 100 / helper.GetTotalStorage();

        deviceinfo.memory_p = memoria_total.ToString();

        bateria = SystemInfo.batteryLevel * 100;

        deviceinfo.drums = bateria.ToString();

        if (capture.takeHiResShot)
        {
            deviceinfo.screenshot.Add(capture.GetScreenshot());
            capture.takeHiResShot = false;
        }
        holder.message = deviceinfo;

#endif
    }

    /**
     * 
     * Nombre: Receive
     * 
     * Descripcion: Metodo asincronico que realiza la conexion por websocket al servidor
     * 
     * Param: string message
     * 
     * **/

    public static async Task Receive(string message)
    {
        if (!downutils.url.Equals("0.0.0.0"))
        {
            using (ClientWebSocket ws = new ClientWebSocket())
            {
                try
                {
                    byte[] sendBytes = Encoding.UTF8.GetBytes(message);
                    var sendBuffer = new ArraySegment<byte>(sendBytes);

                    Uri serverUri = new Uri("ws://" + downutils.url + ":8000/ws/devices/" + downutils.teachername + "/");
                    downutils.urlsocket = serverUri.ToString();
                    await ws.ConnectAsync(serverUri, CancellationToken.None);
                    await ws.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                catch (Exception x)
                {
                    Debug.LogError("la conexion fallo");
                }
            }
        }
    }
}
