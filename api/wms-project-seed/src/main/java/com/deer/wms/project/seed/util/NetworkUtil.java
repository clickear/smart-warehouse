package com.deer.wms.project.seed.util;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Optional;

/**
 * 常用获取客户端信息的工具
 *
 * Created by DW on 2016/10/30.
 */
public class NetworkUtil {

    /**
     * 获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址;
     *
     * @param request
     * @return
     * @throws IOException
     */
    public static String getIpAddress(HttpServletRequest request){
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (!isIpAddress(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (!isIpAddress(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (!isIpAddress(ipAddress)) {
            ipAddress = request.getHeader("HTTP_CLIENT_IP");
        }

        if (!isIpAddress(ipAddress)) {
            ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
        }

        if (!isIpAddress(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")){
                //根据网卡获取本机配置的IP地址
                InetAddress inetAddress = null;
                try {
                    inetAddress = InetAddress.getLocalHost();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                ipAddress = inetAddress.getHostAddress();
            }
        }

        //对于通过多个代理的情况，第一个IP为客户端真实的IP地址，多个IP按照','分割
        if (!isIpAddress(ipAddress) && ipAddress.length() > 15) {
            Optional<String> optional = Arrays.asList(ipAddress.split(","))
                    .stream()
                    .filter(ip -> !"unknown".equalsIgnoreCase(ip))
                    .findFirst();
            if (null != optional) {
                ipAddress = optional.get();
            }
        }

        return ipAddress;
    }

    /**
     * 判断是否ip地址
     *
     * @param ipAddress
     * @return
     */
    private static boolean isIpAddress(String ipAddress) {
        return null != ipAddress
                && ipAddress.length() > 0
                && !"unknown".equalsIgnoreCase(ipAddress)
                && !"0:0:0:0:0:0:0:1".equals(ipAddress);
    }
}
