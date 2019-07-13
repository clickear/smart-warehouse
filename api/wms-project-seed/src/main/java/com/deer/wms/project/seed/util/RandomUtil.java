package com.deer.wms.project.seed.util;

import java.util.Random;

/**
 * 随机生成数值的工具类
 *
 * Created by Floki on 2017/7/5.
 */
public class RandomUtil {
    /** 所有的字符串，包括数字、小写字母、大写字母 */
    public static final String ALL_CHAR = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /** 字母的字符串，包括小写字母、大写字母 */
    public static final String LETTER_CHAR = "abcdefghijkllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /** 数字的字符串，包括0-9的数字 */
    public static final String NUMBER_CHAR = "0123456789";

    /**
     * 生成一个包含大小写字母、数字的定长随机字符串
     *
     * @param length 生成随机字符串的长度
     * @return 返回生成的随机字符串
     */
    public static String generateString(int length) {
        StringBuffer result = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            result.append(ALL_CHAR.charAt(random.nextInt(ALL_CHAR.length())));
        }
        return result.toString();
    }

    /**
     * 生成一个指定长度的随机纯字母字符串
     *
     * @param length 生成随机字符串的长度
     * @return 返回生成的随机字符串
     */
    public static String generateMixString(int length) {
        StringBuffer result = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            result.append(ALL_CHAR.charAt(random.nextInt(LETTER_CHAR.length())));
        }
        return result.toString();
    }

    /**
     * 生成一个指定长度的随机纯大写字母字符串
     *
     * @param length 生成随机字符串的长度
     * @return 返回生成的随机字符串
     */
    public static String generateLowerString(int length) {
        return generateMixString(length).toLowerCase();
    }

    /**
     * 生成一个指定长度的随机纯小写字母字符串
     *
     * @param length 生成随机字符串的长度
     * @return 返回生成的随机字符串
     */
    public static String generateUpperString(int length) {
        return generateMixString(length).toUpperCase();
    }

    /**
     * 生成一个指定长度的纯0字符串
     *
     * @param length 生成字符串的长度
     * @return 返回生成的纯0字符串
     */
    public static String generateZeroString(int length) {
        StringBuffer result = new StringBuffer();
        for (int i = 0; i < length; i++) {
            result.append("0");
        }
        return result.toString();
    }

    /**
     * 根据数字生成一个定长的字符串，长度不够前面补0，如果 num 的长度超过了 fixdLength 值，则直接返回 num 的字符串
     *
     * @param num 数字
     * @param fixdLength 字符串的固定长度
     * @return 返回固定长度的字符串
     */
    public static String toFixdLengthString(long num, int fixdLength) {
        String strNum = String.valueOf(num);
        int value = fixdLength - strNum.length();
        if (value <= 0) {
            return strNum;
        }

        StringBuffer result = new StringBuffer();
        result.append(generateZeroString(value));
        result.append(strNum);
        return result.toString();
    }

    /**
     * 每次生成的len位数都不相同
     *
     * @param param
     * @return 定长的数字
     */
    public static int getNotSimple(int[] param, int len) {
        Random rand = new Random();
        for (int i = param.length; i > 1; i--) {
            int index = rand.nextInt(i);
            int tmp = param[index];
            param[index] = param[i - 1];
            param[i - 1] = tmp;
        }
        int result = 0;
        for (int i = 0; i < len; i++) {
            result = result * 10 + param[i];
        }
        return result;
    }

}
