using System.Collections;
using System;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.IO;


/**
 * 
 * Nombre: DownloadUtils
 * 
 * 
 * Descripcion: clase que realiza las conexiones y solicitudes de descarga de los elementos que el dispositivo debe poder ver (apks, videos, imagenes, textos, entre otros)
 * 
 * 
 * **/

public class DownloadUtils : MonoBehaviour
{
    public Image image;
    public AudioSource audioSource;
    AndroidHelper androidHelper = new AndroidHelper();

    public string url;
    public string teachername;
    public string urlsocket;

    public string url_dir;

    public FormData data = new FormData();

    public GameObject conDocentes;

    public DataParent parent;


    /*private void Update()
    {
        //Debug.Log(url);
        //Debug.Log(url_dir);
    }*/


    /**
     * 
     * Nombre: GetRequest
     * 
     * Descripcion: corrutina que realiza un webrequests de unity a una direccion solicitada
     * 
     * Params: string endpoint, Action<UnityWebRequest> callback
     * 
     * Return: retorna un resultado de la consulta, este puede tener un objeto o no
     * 
     * */


    //IEnumerator GetRequest(string endpoint, Action<UnityWebRequest> callback)
    /*{
        using (UnityWebRequest request = UnityWebRequest.Get(endpoint))
        {
            // Send the request and wait for a response
            yield return request.SendWebRequest();

            callback(request);
        }
    }*/
    /**
     * 
     * Nombre: DownloadImage
     * 
     * Descripcion: metodo que descarga una imagen de una direccion solicitada
     * 
     * Params: string url
     * 
     * Return: retorna una imagen a una Texture2D de unity
     * 
     * */

    /*public void DownloadImage(string url)
    {
        StartCoroutine(ImageRequest(url, (UnityWebRequest req) =>
        {
            if (req.isNetworkError || req.isHttpError)
            {
                Debug.Log($"{req.error}: {req.downloadHandler.text}");
            }
            else
            {
                // Get the texture out using a helper downloadhandler
                Texture2D texture = DownloadHandlerTexture.GetContent(req);
                // Save it into the Image UI's sprite
                image.sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(0.5f, 0.5f));
            }
        }));
    }*/

    /**
     * 
     * Nombre: ImageRequest
     * 
     * Descripcion: corrutina que realiza un webrequest sobre imagen de una direccion solicitada
     * 
     * Params: string url, Action<UnityWebRequest> callback
     * 
     * Return: retorna un resultado sobre la consulta, este puede estar lleno o no
     * 
     * */
    /*IEnumerator ImageRequest(string url, Action<UnityWebRequest> callback)
    {
        using (UnityWebRequest req = UnityWebRequestTexture.GetTexture(url))
        {
            yield return req.SendWebRequest();
            callback(req);
        }
    }*/

    /**
    * 
    * Nombre: DownloadSound
    * 
    * Descripcion: metodo que descarga un sonido sobre una direccion solicitada
    * 
    * Params: string url
    * 
    * Return: retorna un sonido descargado
    * 
    * */
    /*public void DownloadSound(string url)
    {
        StartCoroutine(SoundRequest(url, (UnityWebRequest req) =>
        {
            if (req.isNetworkError || req.isHttpError)
            {
                Debug.Log($"{req.error}: {req.downloadHandler.text}");
            }
            else
            {
                // Get the sound out using a helper downloadhandler
                AudioClip clip = DownloadHandlerAudioClip.GetContent(req);
                // Load the clip into our audio source and play
                audioSource.Stop();
                audioSource.clip = clip;
                audioSource.Play();
            }
        }));
    }*/


    /**
    * 
    * Nombre: SoundRequest
    * 
    * Descripcion: corrutina que realiza un webrequest de unity sobre un sonido
    * 
    * Params: string url, Action<UnityWebRequest> callback
    * 
    * Return: retorna un resultado sobre la consulta, este puede estar poblado o no
    * 
    * */
    /*IEnumerator SoundRequest(string url, Action<UnityWebRequest> callback)
    {
        using (UnityWebRequest req = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.OGGVORBIS))
        {
            yield return req.SendWebRequest();
            callback(req);
        }
    }*/



    /**
    * 
    * Nombre: ByteArrayToFile
    * 
    * Descripcion: metodo que almacena un arreglo de bytes como un archivo, utilizado por los metodos de la clase create_element
    * 
    * Params: string fileName, byte[] byteArray
    * 
    * Return: un booleano con la respuesta si el archivo pudo ser descargado o no
    * 
    * */
    /*public bool ByteArrayToFile(string fileName, byte[] byteArray)
    {
        try
        {
            using (var fs = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                fs.Write(byteArray, 0, byteArray.Length);
                return true;
            }
        }
        catch (Exception ex)
        {
            Debug.Log("Exception caught in process: " + ex);
            return false;
        }
    }*/

    /**
    * 
    * Nombre: GetText
    * 
    * Descripcion: corrutina que realiza un webrequest sobre un elemento obtenido por el HDM dentro del json durante la conexion con Vroom
    * 
    * Params: String routeSource, string routeFile, Action<Boolean> resultCallBack
    * 
    * Return: retorna una respuesta sobre si el archivo existe dentro de la direccion consultada o no
    * 
    * */
    /*public IEnumerator GetText(String routeSource, string routeFile, Action<Boolean> resultCallBack)
    {
        Debug.Log("routeSource: " + routeSource);
        Debug.Log("routeFile: " + routeFile);
        UnityWebRequest www = UnityWebRequest.Get(routeSource);

        www.downloadHandler = new DownloadHandlerFile(routeFile);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            //byte[] results = www.downloadHandler.data;

            if (www.isDone)
            {
                resultCallBack(true);
                Debug.Log("Download saved to: " + routeFile);
            }
            else
            {
                resultCallBack(false);
            }

        }
    }*/

    /**
    * 
    * Nombre: GetAndroidInternalFilesDir
    * 
    * Descripcion: metodo que consulta dentro de la memoria del dispositivo android cual es la ruta para descargar los archivos traidos desde Vroom
    *   
    * 
    * Return: direccion dentro del dispositivo donde se pueden alojar los archivos
    * 
    * */
    /*public string GetAndroidInternalFilesDir()
    {
        string[] potentialDirectories = new string[]
        {
        "/mnt/sdcard",
        "/sdcard",
        "/storage/sdcard0",
        "/storage/sdcard1"
        };

        if (Application.platform == RuntimePlatform.Android)
        {
            for (int i = 0; i < potentialDirectories.Length; i++)
            {
                if (Directory.Exists(potentialDirectories[i]))
                {
                    return potentialDirectories[i];
                }
            }
        }
        return "";
    }*/



    /**
    * 
    * Nombre: verifyFilesExist
    * 
    * Descripcion: metodo que verifica si el archivo ya existe dentro del dispositivo
    * 
    * Params: string file
    * 
    * Return: retorna una respuesta sobre si el archivo existe dentro de la direccion consultada o no
    * 
    * */
    /*public Boolean verifyFilesExist(string file)
    {
        if (Application.platform == RuntimePlatform.Android)
        {
            if (File.Exists(file)) return true;
        }
        return false;
    }*/

    /**
    * 
    * Nombre: Get_data
    * 
    * Descripcion: Corrutina que da como respuesta si el arreglo de tipo Elements viene poblado desde Vroom
    * 
    * Params: Action<Element[]> resultCallBack
    * 
    * Return: retorna una respuesta sobre si el arreglo esta poblado o no
    * 
    * */
    /*public IEnumerator Get_data(Action<Element[]> resultCallBack)
    {
        /*#if UNITY_EDITOR
                //if (!androidHelper.getIpServer().Equals(""))
                if (true)
                {
                    WWWForm form = new WWWForm();
                    //form.AddField("action", "get_data");

                    data.id_devices = SystemInfo.deviceUniqueIdentifier;
                    data.user_id = conDocentes.GetComponent<ConexionesDocentes>().loader.teachername;

                    parent.dataContainer = data;

                    string stdata = JsonUtility.ToJson(data);

                    //form.AddField("user_id", conDocentes.GetComponent<ConexionesDocentes>().loader.teachername);
                    //Debug.Log(stdata);

                    //string url = androidHelper.getIpServer() + "/vroom/scripts/get_elements.php";
                    //url_dir = url + ":8000" + "/cotents_devices/" + androidHelper.getSerialNumber();
                    url_dir = url + ":8000" + "/cotents_devices_device";
                    //Debug.Log("direccion de consulta:  " + url_dir);
                    UnityWebRequest w = UnityWebRequest.Put("HTTP://" + url_dir, stdata);
                    yield return w.SendWebRequest();
                    Debug.Log("result" + w.downloadHandler.text);
                    //if (!w.downloadHandler.text.Equals(""))
                    if (!w.downloadHandler.text.Equals(""))
                    {
                        string jsonfix = fixJson(w.downloadHandler.text);
                        Debug.Log(w.downloadHandler.text);
                        Element[] elements = JsonHelper.FromJson<Element>(jsonfix);
                        //Element elements = JsonUtility.FromJson<Element>(w.downloadHandler.text);
                        resultCallBack(elements);
                        //Debug.Log("UrlPkg: " + elements[0].ivr_urlpkgdl);
                        //Debug.Log("UrlPkg: " + elements[1].ivr_urlpkgdl);
                    }
                    else
                    {
                        Debug.Log("get_data downLoad false");
                        Element[] element = new Element[1];
                        //Element element = new Element();
                        // Debug.Log("get_data downLoad: "+element.Length);
                        resultCallBack(element);
                    }

                }
                else
                {
                    Element[] element = new Element[1];
                    //Element element = new Element();
                    resultCallBack(element);
                }
        #endif

        if (!androidHelper.getIpServer().Equals(""))
            if (true)
            {
                data.id_devices = androidHelper.getSerialNumber();
                data.user_id = conDocentes.GetComponent<ConexionesDocentes>().loader.teachername;

                parent.dataContainer = data;

                string stdata = JsonUtility.ToJson(data);

                url_dir = url + ":8000" + "/cotents_devices_device";
                Debug.Log("direccion de consulta:  " + url_dir);
                UnityWebRequest w = UnityWebRequest.Put("HTTP://" + url_dir, stdata);
                yield return w.SendWebRequest();
                Debug.Log("result" + w.downloadHandler.text);
                //if (!w.downloadHandler.text.Equals(""))
                if (!w.downloadHandler.text.Equals(""))
                {
                    string jsonfix = fixJson(w.downloadHandler.text);
                    Debug.Log(w.downloadHandler.text);
                    Element[] elements = JsonHelper.FromJson<Element>(jsonfix);
                    resultCallBack(elements);
                }
                else
                {
                    Debug.Log("get_data downLoad false");
                    Element[] element = new Element[1];
                    resultCallBack(element);
                }

            }
            else
            {
                Element[] element = new Element[1];
                //Element element = new Element();
                resultCallBack(element);
            }
    }*/

   /* string fixJson(string value)
    {
        value = "{\"Items\":" + value + "}";
        return value;
    }*/
}



/**
 * 
 * Nombre: FormData
 * 
 * Descripcion: clase que se utiliza para enviar la informacion al servidor sobre el serial del dispositivo y la identificacion del docente al cual se conecta
 * 
 * */

[Serializable]
public class FormData
{
    public string id_devices;
    public string user_id;
}


/**
 * 
 * Nombre: DataParent
 * 
 * Descripcion: clase que se utiliza para contener la informacion de tipo FormData, para que cumpla con el formato que requiere el servidor
 * 
 * */
[Serializable]
public class DataParent
{
    public FormData dataContainer;
}