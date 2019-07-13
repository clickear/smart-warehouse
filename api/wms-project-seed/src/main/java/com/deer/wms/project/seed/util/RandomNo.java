package com.deer.wms.project.seed.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public  class RandomNo {
    public static String  createNo(){
        SimpleDateFormat simpleDateFormat;
        simpleDateFormat = new SimpleDateFormat("yyyyMMddHH");
        Date date =new Date();
        String str=simpleDateFormat.format(date);
        Random random=new Random();
        int rannum=(int) (random.nextDouble()*(99999-10000+1))+10000;//获取5位随机数
        String  No =str +"-"+  rannum;
        return  No;
    }

    public static String  createTimeString(){
        SimpleDateFormat simpleDateFormat;
        simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date =new Date();
        String str=simpleDateFormat.format(date);
        return  str;
    }

    public static String  createDateString(){
        SimpleDateFormat simpleDateFormat;
        simpleDateFormat = new SimpleDateFormat("yyyyMMddHH");
        Date date =new Date();
        String str=simpleDateFormat.format(date);
        return  str;
    }

    public static void main(String[] args) {
        System.out.print(RandomNo.createNo());
    }

}
