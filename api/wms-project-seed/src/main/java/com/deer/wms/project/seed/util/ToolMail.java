package com.deer.wms.project.seed.util;

import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.sun.mail.util.MailSSLSocketFactory;

/**
 * 添加邮箱功能类
 * @author shilihua
 * @date 20171212
 */
@Configuration
public class ToolMail
{
    @Value("${email.serverHost}")
    private String serverHost;
    
    @Value("${email.serverPort}")
    private String serverPort;
    
    @Value("${email.fromAddress}")
    private String fromAddress;
    
    @Value("${email.password}")
    private String password;
    
    @Value("${email.outTime}")
    private String outTime;
    
    @Value("${email.nick}")
    private String nick;
    
    /**
     * 发送邮件
     * @param toAddress 收件人地址
     * @param mailTitle 邮件标题
     * @param mailContent 邮件内容
     * @return
     */
    public boolean sendMail( String[] toAddress, String mailTitle, String mailContent)
	{
    	
    	// 创建Session
    	Properties pro = getProperties();
    	Session session = Session.getInstance( pro );
    	
    	try
    	{
    		// 创建邮件消息体
    		Message message = new MimeMessage( session );
    		
    		// 邮件发送地址
    		Address from = new InternetAddress( nick + "<" + fromAddress + ">");
    		message.setFrom( from );
    		// 邮件的主题
    		message.setSubject( mailTitle );
    		// 邮件发送时间
    		message.setSentDate( new Date() );
			Multipart mainPart = new MimeMultipart();
			BodyPart html = new MimeBodyPart();
			html.setContent( mailContent, "text/html; charset=utf-8" );
			mainPart.addBodyPart( html );
			message.setContent( mainPart );
    		
			// 第二步：获取邮件发送对象
			Transport transport = session.getTransport();
			// 连接邮件服务器，链接您的163、sina邮箱，用户名（不带@163.com，登录邮箱的邮箱账号，不是邮箱地址）、密码
			transport.connect( fromAddress, password );
			
			// 发送邮件  
			Address[] addresses = new Address[toAddress.length];
			for ( int i = 0; i < toAddress.length; i++ )
			{
				addresses[i] = new InternetAddress( toAddress[i] );
			}
			
			send( transport, message, addresses );
			
			// 关闭连接  
			transport.close();
			return true;
    	}
    	catch(Exception e)
    	{
    		e.printStackTrace();
    		return false;
    	}
	}
    
	/**
	 * 方法名
	 * @description 群发消息时出现错误重新发送，保证正确的邮箱可以收到
	 * @param transport
	 * @param msg
	 * @param adds
	 * @author jixing
	 * @version V1.0
	 * @date 2017年6月30日
	 */
	private static void send( Transport transport, Message msg, Address[] adds )
	{
		try
		{
			transport.sendMessage( msg, adds );
		}
		catch ( SendFailedException e )
		{
			Address[] unsentAddresses = e.getValidUnsentAddresses();
			send( transport, msg, unsentAddresses );
		}
		catch ( MessagingException e )
		{
			e.printStackTrace();
		}
	}

	public Properties getProperties()
	{
		Properties p = new Properties();
		MailSSLSocketFactory sf;
		try
		{
			sf = new MailSSLSocketFactory();
			sf.setTrustAllHosts( true );
			p.put( "mail.smtp.ssl.enable", "true" );
			p.put( "mail.smtp.ssl.checkserveridentity", "true" );
			p.put( "mail.smtp.ssl.socketFactory", sf );
			p.put( "mail.smtp.host", serverHost );
			p.put( "mail.smtp.port", serverPort );
			p.put( "mail.smtp.auth", "true" );
			p.put( "mail.transport.protocol", "smtp" );
			p.put( "mail.smtp.connectiontimeout", outTime );//连接超时
			p.put( "mail.smtp.timeout", outTime );//读超时
			p.put( "mail.smtp.starttls.enable", "true" );
			p.put( "mail.smtp.socketFactory.fallback", "false" );
			p.put( "mail.smtp.socketFactory.port", serverPort );
		}
		catch ( GeneralSecurityException e )
		{
			e.printStackTrace();
		}
		return p;
	}
}
