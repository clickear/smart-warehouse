package com.deer.wms.project.seed.util;

import java.security.MessageDigest;

/**
 * Created by Floki on 2017/7/6.
 */
public class MD5Utils {

    /**
     * 根据条件MD5加密用户密码密码
     *
     * @param account 登录帐号
     * @param password 明文密码
     * @param salt 生成密码的加盐值
     * @return 返回MD5处理后的密码
     */
    public  static String encryptPassword(String account, String password, String salt) {
        StringBuilder builder = new StringBuilder();
        builder.append(account);
        builder.append(password);
        builder.append(salt);
        return MD5Utils.hash(builder.toString());
    }

    public static String hash(String s) {
        if (null == s || s.equals("")) {
            return "";
        }
        return hash(s, "UTF-8");
    }

    public static String hash(String s, String charsetName) {
        try {
            return new String(toHex(md5(s)).getBytes(charsetName), charsetName);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private static byte[] md5(String s) {
        try {
            MessageDigest algorithm = MessageDigest.getInstance("MD5");
            algorithm.reset();
            algorithm.update(s.getBytes("UTF-8"));
            return algorithm.digest();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private static final String toHex(byte hash[]) {
        if (null == hash) {
            return null;
        }

        StringBuffer buf = new StringBuffer(hash.length * 2);
        int i;

        for (i = 0; i < hash.length; i++) {
            if ((hash[i] & 0xff) < 0x10) {
                buf.append("0");
            }
            buf.append(Long.toString(hash[i] & 0xff, 16));
        }
        return buf.toString();
    }
}
