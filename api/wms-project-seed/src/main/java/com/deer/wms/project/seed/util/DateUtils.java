package com.deer.wms.project.seed.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

import com.alibaba.druid.util.StringUtils;

/**
 * Created by WUXB on 2016-8-25.
 */
public class DateUtils {





    /**
     * 默认日期格式
     */
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

    /**
     * 默认日期时间格式
     */
    public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /**
     * 默认时间格式
     */
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    /**
     * 判断字符串是否为指定的日期格式
     *
     * @param dateStr 需要判断的字符串
     * @param format 指定的日期格式
     * @return true=字符串是日期格式
     */
    public static boolean isDateFormat(String dateStr, String format) {
        try {
            new SimpleDateFormat(format).parse(dateStr);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }

    /**
     * 将Date时间转成字符串
     */
    public static String dateToStr(Date date, String format) {
        if(null == date){
            return "";
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        return simpleDateFormat.format(date);
    }

    /**
     * 将字符串时间改成Date类型
     */
    public static Date formatDate(Date date, String format) {
        Date newDate;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
            newDate = simpleDateFormat.parse(dateToStr(date, format));
        } catch (ParseException e) {
            newDate = now(format);
            e.printStackTrace();
        }
        return newDate;
    }

    /**
     * 将字符串时间改成Date类型
     */
    public static Date strToDate(String dateStr, String format) {
        Date date = null;
        try {
        	if ( !StringUtils.isEmpty(dateStr) ) {
        		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
                date = simpleDateFormat.parse(dateStr);
        	}
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 将字符串时间改成Date类型
     */
    public static String toStringDate(String dateStr, String format) {
        String result = dateStr;
        try {
            Date date = new SimpleDateFormat(format).parse(dateStr);
            result = new SimpleDateFormat(format).format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }

    /***
     * 计算两个日期相差多少秒
     *
     * @param date1
     * @param date2
     * @return
     */
    public static int getTimeDelta(Date date1, Date date2) {
        long timeDelta = (date1.getTime() - date2.getTime()) / 1000; //单位是秒
        int secondsDelta = timeDelta > 0 ? (int) timeDelta : (int) Math.abs(timeDelta);
        return secondsDelta;
    }

    /**
     * 计算指定时间与当前时间相差多少秒
     *
     * @param date 指定时间
     * @return
     */
    public static int getTimeDelta(Date date) {
        return getTimeDelta(new Date(), date);
    }

    /**
     * 获取指定时间与当前时间相差的时间，输出格式为xx天xx小时xx分钟xx秒
     *
     * @param date
     * @return
     */
    public static String getTimeDeltaToString(Date date) {
        int diff = getTimeDelta(date);
        long days = diff / (60 * 60 * 24);
        long hours = (diff - days * (60 * 60 * 24)) / (60 * 60);
        long minutes = (diff - days * (60 * 60 * 24) - hours * (60 * 60)) / 60;
        long seconds = (diff - days * (60 * 60 * 24) - hours * (60 * 60) - minutes * 60);
        StringBuilder result = new StringBuilder();
        if (days > 0) {
            result.append(date).append("天");
        }
        if (hours > 0) {
            result.append(hours).append("小时");
        }
        if (minutes > 0) {
            result.append(minutes).append("分");
        }
        if (seconds > 0) {
            result.append(seconds).append("秒");
        }
        return result.toString();
    }

    /**
     * 获取现在的时间
     *
     * @return Date
     */
    public static Date now() {
        return Calendar.getInstance().getTime();
    }

    /**
     * 获取现在的时间并以指定格式输出
     *
     * @param format 时间格式
     * @return Date
     */
    public static Date now(String format) {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return strToDate(formatter.format(now()), format);
    }

    /**
     * 获取指定日期是星期几的代码
     *
     * @param dt
     * @return 0=星期天
     */
    public static int getWeekCodeOfDate(Date dt) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        return w < 0 ? 0 : w;
    }

    /**
     * 获取指定日期是星期几
     *
     * @param dt
     * @return
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        return weekDays[getWeekCodeOfDate(dt)];
    }

    /**
     * 得到指定时间与当前时间之间相差的天数
     *
     * @param start 指定时间
     * @return 指定时间与当前时间之间相差的天数
     */
    public static long betweenDays(Date start) {
        LocalDate startDateInclusive = dateToLocalDate(start);
        return LocalDate.now().toEpochDay() - startDateInclusive.toEpochDay();
    }

    /**
     * 得到两个之间之间相差的天数
     *
     * @param start 开始时间
     * @param end 结束时间
     * @return 开始时间与结束时间相差的天数
     */
    public static long betweenDays(Date start, Date end) {
        LocalDate startDateInclusive = dateToLocalDate(start);
        LocalDate endDateExclusive = dateToLocalDate(end);
        return endDateExclusive.toEpochDay() - startDateInclusive.toEpochDay();
    }

    /**
     * 得到两个之间之间相差的天数
     *
     * @param startDate 开始时间
     * @param endDate 结束时间
     * @return 开始时间与结束时间相差的天数
     */
    public static long betweenDays(String startDate, String endDate) {
        Date start = DateUtils.strToDate(startDate, "yyyy-MM-dd");
        Date end = DateUtils.strToDate(endDate, "yyyy-MM-dd");
        LocalDate startDateInclusive = dateToLocalDate(start);
        LocalDate endDateExclusive = dateToLocalDate(end);
        return endDateExclusive.toEpochDay() - startDateInclusive.toEpochDay();
    }

    public static LocalDate dateToLocalDate(Date date) {
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault()).toLocalDate();
    }

    /**
     * 获取在参考时间的基础上增加或者减少秒数后的时间
     *
     * @param date 参考时间
     * @param secondAmount 秒数，如果是减少秒数传一个负数
     * @return 格式为 yyyy-MM-dd HH:mm:ss 的新时间
     */
    public static Date getDateBySecond(Date date, int secondAmount) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.SECOND, secondAmount);
        return formatDate(calendar.getTime(), "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 在当前日期上增加指定的天数
     *
     * @param day 天数
     * @return 增加天数后的日期
     */
    public static Date addDay(int day) {
        return addDay(now(), day);
    }

    /**
     * 判断时间是否在时间段内
     * @param nowTime
     * @param beginTime
     * @param endTime
     * @return
     */
    public static boolean belongCalendar(Date nowTime, Date beginTime, Date endTime) {
        Calendar date = Calendar.getInstance();
        date.setTime(nowTime);

        Calendar begin = Calendar.getInstance();
        begin.setTime(beginTime);

        Calendar end = Calendar.getInstance();
        end.setTime(endTime);

        return date.after(begin) && date.before(end);
    }

    /**
     * 在指定日期上加指定的天数
     *
     * @param date 基础日期
     * @param day 天数
     * @return 增加天数后的日期
     */
    public static Date addDay(Date date, int day) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_MONTH, day);
        return c.getTime();
    }

    /**
     * 在指定日期上加指定的分钟数
     *
     * @param date 基础日期
     * @param minute 分钟数
     * @return 增加分钟数后的日期
     */
    public static Date addMinute(Date date, int minute) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MINUTE, minute);
        return c.getTime();
    }

    /**
     * 将时间转换为时间戳
     * @param s
     * @return
     * @throws ParseException
     */
    public static String dateToStamp(String s) throws ParseException{
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = simpleDateFormat.parse(s);
        long ts = date.getTime();
        res = String.valueOf(ts);
        return res;
    }

    /**
     * 将时间戳转换为时间
     *
     * @param time 时间戳
     * @return 日期格式的时间
     */
    public static Date stampToDate(Long time) {
        return stampToDate(time, DEFAULT_DATETIME_FORMAT);
    }

    /**
     * 将时间戳转换为时间
     *
     * @param time 时间戳
     * @return 日期格式的时间
     */
    public static Date stampToDate(Long time, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        String d = dateFormat.format(time);
        Date date = null;
        try {
            date = dateFormat.parse(d);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 将时间戳转换为时间
     * @param s
     * @return
     */
    public static String stampToDate(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }

    /**
     * 获取当前日期的年月日
     * @return
     */
    public static String getCurrentDate(String format)
    {
    	Date curdate = new Date();
    	return dateToStr(curdate, format);
    }

    /**
     * 获取当前时间并以字符串
     * @return
     */
    public static String getNowDateTimeString()
    {
        Date curdate = new Date();
        return dateToStr(curdate, " yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 获取当前日期并以字符串
     * @return
     */
    public static String getNowDateString()
    {
        Date curdate = new Date();
        return dateToStr(curdate, " yyyy-MM-dd");
    }

    /**
     * 获取年
     * @return
     */
    public static String getYear()
    {
        Date curdate = new Date();
        return dateToStr(curdate, "yyyy");
    }
    /**
     * 获取月
     * @return
     */
    public static String getM()
    {
        Date curdate = new Date();
        return dateToStr(curdate, "MM");
    }

    /**
     * 获取日
     * @return
     */
    public static String getD()
    {
        Date curdate = new Date();
        return dateToStr(curdate, "dd");
    }

    /**
     * 获取是分秒
     * @return
     */
    public static String get()
    {
        Date curdate = new Date();
        return dateToStr(curdate, "HH:mm:ss");
    }


    /*
    * 获取昨天的日期
    * */
    public static String getYesterdayDateStr(){

        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        date = calendar.getTime();
        String yesterday = dateToStr(date, "yyyy-MM-dd");

        return  yesterday;
    }


    public static void main(String[] args) {

        Date date = new Date();
        for(int i = 0; i<1000;i++){
            int j = 0;
        }
        System.out.println(DateUtils.getTimeDeltaToString(date));





    }
}
