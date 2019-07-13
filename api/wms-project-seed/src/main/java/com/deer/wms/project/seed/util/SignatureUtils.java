package com.deer.wms.project.seed.util;

import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * Created by Floki on 2017/10/15.
 */
public class SignatureUtils {
    private static final String MAC_HMAC_SHA1 = "HmacSHA1";
    private static final String ENCODING_UTF8 = "UTF-8";

    /**
     * Base64 解码，默认 UTF-8 编码格式
     *
     * @param data 需要解码的串
     * @return 解码后的字符串，如果data为null或者为空字符串，返回空字符串
     */
    public static String decodeBase64(String data) {
        if (null == data || data.equals("")) {
            return "";
        }
        return decodeBase64(data, ENCODING_UTF8);
    }

    /**
     * Base64 解码，指定编码格式
     *
     * @param data 需要解码的串
     * @param charsetName 编码格式
     * @return 解码后的字符串，如果data为null或者为空字符串，返回空字符串
     */
    public static String decodeBase64(String data, String charsetName) {
        try {
            return new String(Base64.decodeBase64(data.getBytes(charsetName)));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * encodeBase64 编码，默认为 UTF-8 编码格式
     *
     * @param data 需要编码的字符串
     * @return 编码后的字符串，如果data为null或者为空字符串，返回空字符串
     */
    public static String encodeBase64(String data) {
        if (null == data || data.equals("")) {
            return "";
        }
        return encodeBase64(data, ENCODING_UTF8);
    }

    /**
     * encodeBase64 编码，指定编码格式
     *
     * @param data 需要编码的字符串
     * @param charsetName 编码格式
     * @return 编码后的字符串，如果data为null或者为空字符串，返回空字符串
     */
    public static String encodeBase64(String data, String charsetName) {
        try {
            return new String(Base64.encodeBase64(data.getBytes(charsetName)));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * HmacSha1加密。
     *
     * @param data 需要加密的数据
     * @param key 密钥
     * @return 返回加密后的字符串，如果data或者key为null或者为空字符串，则返回空字符串
     */
    public static String encryptionHamcSha1(String data, String key) {
        return encryptionHamcSha1(data, key, ENCODING_UTF8);
    }

    /**
     * 按照指定编码格式进行 HmacSha1 加密。
     *
     * @param data 需要加密的数据
     * @param key 密钥
     * @param encoding 编码格式
     * @return 返回加密后的字符串
     */
    public static String encryptionHamcSha1(String data, String key, String encoding) {
        if (null == data || data.equals("")
                || null == key || key.equals("")) {
            return "";
        }
        try {
            return encryptionHamcSha1(data.getBytes(encoding), key.getBytes(encoding));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * HmacSha1加密。
     * HMAC-SHA1是一种安全的基于加密 hash函数和共享密钥的消息认证协议，
     * 它可以有效地防止数据在传输的过程中被截取和篡改，维护了数据的完整性、可靠性和安全性。
     * HMAC-SHA1消息认证机制的成功在于一个加密的 hash函数、一个加密的随机密钥和一个安全的密钥交换机制
     *
     * @param data 需要加密的数据二进制
     * @param key 密钥的二进制
     * @return 返回加密后的字符串
     */
    public static String encryptionHamcSha1(byte[] data, byte[] key) {
        try {
            Mac mac = Mac.getInstance(MAC_HMAC_SHA1);
            mac.init(new SecretKeySpec(key, MAC_HMAC_SHA1));
            return byte2hex(mac.doFinal(data));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        } catch (InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 生成token
     *
     * @param params
     * @return
     */
    public static String generator(String[] params) {
        return generator(params, "SHA-1");
    }

    /**
     * 生成token
     *
     * @param params 生成token的参数，保证不能为null，并且长度>0
     * @return 返回生成的 token
     */
    public static String generator(String[] params, String algorithm) {
        String[] array = params;
        Arrays.sort(array);
        StringBuffer content = new StringBuffer();
        for (String param : params) {
            content.append(param);
        }
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance(algorithm);
            return byteToStr(messageDigest.digest(content.toString().getBytes()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";
        }
    }

    //二行制转字符串
    public static String byte2hex(byte[] b) {
        StringBuilder hs = new StringBuilder();
        String stmp;
        for (int n = 0; b!=null && n < b.length; n++) {
            stmp = Integer.toHexString(b[n] & 0XFF);
            if (stmp.length() == 1) {
                hs.append('0');
            }
            hs.append(stmp);
        }
        return hs.toString();
    }

    private static String byteToStr(byte[] byteArray) {
        StringBuffer digest = new StringBuffer();
        for(int i = 0;i < byteArray.length; i++) {
            digest.append(byteToHexStr(byteArray[i]));
        }
        return digest.toString();
    }

    private static String byteToHexStr(byte mByte){
        char[] Digit = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        char[] tempArr = new char[2];
        tempArr[0] = Digit[(mByte >>> 4) & 0X0F];
        tempArr[1] = Digit[mByte & 0X0F];
        return new String(tempArr);
    }

    public static void main(String[] args) {
        String data = SignatureUtils.encryptionHamcSha1("123456", "12345678");
        System.out.println("hamcsha1=" + data);
        String encodeBase64 = SignatureUtils.encodeBase64(data);
        System.out.println("encodeBase64=" + encodeBase64);
        String decodeBase64 = SignatureUtils.decodeBase64(encodeBase64);
        System.out.println("decodeBase64=" + decodeBase64);
    }
}
