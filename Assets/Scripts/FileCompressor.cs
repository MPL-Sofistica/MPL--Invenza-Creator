using System.Collections;
using System.Collections.Generic;
using System;
using System.IO.Compression;

public class FileCompressor
{
    static void Main(string[] args)
    {
        string startPath = @".\start";
        string zipPath = @".\result.zip";
        string extractPath = @".\extract";

        System.IO.Compression.ZipFile.CreateFromDirectory(startPath, zipPath);

        System.IO.Compression.ZipFile.ExtractToDirectory(zipPath, extractPath);
    }
}