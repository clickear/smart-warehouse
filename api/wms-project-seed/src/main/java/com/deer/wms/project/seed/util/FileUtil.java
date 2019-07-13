package com.deer.wms.project.seed.util;

import java.io.*;

/**
 * Created by Floki on 2017/10/13.
 */
public class FileUtil {
    /**
     * 创建目录，如果目录不存在这创建目录
     *
     * @param path 目录路径
     */
    public static void mkdirs(String path) {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
    }
    
    /**
     * 删除文件
     * @param path
     */
    public static void deleteFile(String path)
    {
    	File file = new File(path);
    	if (file.exists())
    	{
    		file.delete();
    	}
    }

    /**
     * 创建文件
     *
     * @param stream 文件流
     * @param path 文件保存路径
     * @throws IOException
     */
    public static void createFile(InputStream stream, String path) throws IOException {
        FileOutputStream outputStream = null;
        int byteCount;
        try {
            outputStream = new FileOutputStream(path);
            byte[] bytes = new byte[1024];
            while ((byteCount = stream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, byteCount);
            }
        } finally {
            closeOutputStream(outputStream);
            closeInputStream(stream);
        }
    }

    /**
     * 关闭 InputStream 流
     * @param stream InputStream 流对象
     */
    private static void closeInputStream(InputStream stream) {
        try {
            stream.close();
        } catch (IOException e) {
        }
    }

    /**
     * 关闭 OutputStream 流
     * @param outputStream OutputStream 流对象
     */
    private static void closeOutputStream(OutputStream outputStream) {
        try {
            outputStream.close();
        } catch (IOException e) {
        }
    }
}
