using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net.WebSockets;
using System;
using System.Threading.Tasks;
using System.Threading;
using System.Text;
using UnityEngine.UI;

/**
 * NAME: WebSocketConnection
 * 
 * PARAM: N/A
 * 
 * RETURN: Conexion con el servicio Kiosk
 **/

public class WebSocketConnection : MonoBehaviour
{
    public GameObject manager;
    public static DownloadUtils downutils;
    public Message deviceinfo = new Message();

    public Messageholder holder = new Messageholder();

    public AndroidHelper helper = new AndroidHelper();

    private float memoria;
    private float memoria_total;
    private float bateria;

    /**
     * Name: Receive
     * 
     * busca y realiza la conexion con el servicio de Vroom    
     **/
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
                    Debug.Log(serverUri);
                    //Uri serverUri = new Uri("ws://127.0.0.1:8000/ws/devices/demoInvenza/");
                    await ws.ConnectAsync(serverUri, CancellationToken.None);
                    await ws.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
                    //Debug.Log(downutils.url);
                }
                catch (Exception x)
                {
                    Debug.LogError("la conexion fallo");
                }
            }
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        downutils = manager.GetComponent<DownloadUtils>();
    }

    /**
     * Name: sendinfo
     * 
     * envia la informacion del dispositivo a Vroom    
     **/
    public void sendinfo()
    {
        //Debug.Log("hola");
        deviceinfo.id = helper.getSerialNumber();
        deviceinfo.name = helper.getSerialNumber();
        memoria = helper.GetStorage();
        deviceinfo.memory = memoria.ToString("F2");
        memoria_total = helper.GetStorage() * 100 / helper.GetTotalStorage();

        deviceinfo.memory_p = memoria_total.ToString();

        bateria = SystemInfo.batteryLevel * 100;

        deviceinfo.drums = bateria.ToString();

        holder.message = deviceinfo;
        if (ConexionesDocentes.connected)
        {
            Thread t = new Thread(new ThreadStart(metodo));
            t.Start();
        }
    }

    /**
     * Name: TurntoJson
     * 
     * convierte la informacion a json
     * 
     * PARAM: un objeto de tipo Messageholder
     * 
     * RETURN: el mensaje en formato json
     * 
     **/
    public string TurntoJson(Messageholder messagetoSend)
    {
        string sendmessage = JsonUtility.ToJson(messagetoSend);
        Debug.Log(sendmessage);
        //info.text = sendmessage;
        return sendmessage;
    }
    /**
     * Name: startThread
     * 
     * comienza el hilo de comunicacion entre el HMD y el Vroom
     * 
     * PARAM:
     * 
     * RETURN: N/A
     * 
     **/

    public IEnumerator startThread()
    {
        yield return new WaitForSecondsRealtime(0.5f);
        Receive(TurntoJson(holder));
    }
    /**
     * Name: metodo
     * 
     * comienza el hilo de comunicacion entre el HMD y el Vroom
     * 
     * PARAM:
     * 
     * RETURN: N/A
     * 
     **/

    void metodo()
    {
        Receive(TurntoJson(holder));
    }
}
