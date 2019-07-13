package com.deer.wms.project.seed.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.poifs.filesystem.DirectoryEntry;
import org.apache.poi.poifs.filesystem.DocumentEntry;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

/**
 * 导出word文档
 * 
 * @author shilihua
 */
public class WordUtils
{
	/**
	 * createWork
	 * @description <描述:生成word文件到指定路径下，>
	 * @param content 文件内容 如：
	 *            <h1>我是示例内容</h1>
	 * @param path 文件保存绝对路径 如：/Users/xu/Documents/xuFiles/
	 * @param fileName 如：test.doc 必须是doc，否则文件打不开
	 * @return boolean 返回类型 true 生成成功
	 * @author xuYingYang
	 * @version V1.0
	 * @date 2017年7月15日
	 * @email xuyinyang_cloud@sina.com
	 */
	@SuppressWarnings( "unused" )
	public static boolean createWorkToPath( String content, String path, String fileName )
	{
		try
		{
			//word内容
			//content = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'> </head><body>" + content + "</body></html>";
			byte b[] = content.getBytes(); //这里是必须要设置编码的，不然导出中文就会乱码。
			ByteArrayInputStream bais = new ByteArrayInputStream( b );//将字节数组包装到流中  
			/*
			* 关键地方
			* 生成word格式
			*/
			POIFSFileSystem poifs = new POIFSFileSystem();
			DirectoryEntry directory = poifs.getRoot();
			DocumentEntry documentEntry = directory.createDocument( "WordDocument", bais );
			//输出文件
			String filePath = path;
			File file = new File( filePath, fileName );
			if (!file.exists())
			{
				file.getParentFile().mkdirs();
				file.createNewFile();
			}
			OutputStream ostream = new FileOutputStream( file );

			poifs.writeFilesystem( ostream );
			poifs.close();
			bais.close();
			ostream.close();
			return true;
		}
		catch ( Exception e )
		{
			e.printStackTrace();
		}
		return false;
	}

	public static String generateFileName() {
		Format format = new SimpleDateFormat("yyyyMMddHHmmss");
		return format.format(new Date()) + RandomUtil.generateString(6);
	}

	public static void main( String[] args )
	{

		WordUtils.createWorkToPath("","F:\\pallet", "test.doc" );
	}
	

	
}
