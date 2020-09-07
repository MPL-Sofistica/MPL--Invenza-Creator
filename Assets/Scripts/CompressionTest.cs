using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO.Compression;
public class CompressionTest : MonoBehaviour
{
    string startPath = "Assets/Resources/ZipTest";
    string zipPath = @".\result.zip";
    string extractPath = @".\extract";



    public void Compressfile()
    {
        System.IO.Compression.ZipFile.CreateFromDirectory(startPath, zipPath);
    }
}