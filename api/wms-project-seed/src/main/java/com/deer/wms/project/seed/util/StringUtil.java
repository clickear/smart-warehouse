package com.deer.wms.project.seed.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class StringUtil {

    /**
     * 将对象中String属性 去掉前后空格
     * @param model
     */
    public static void trimObjectStringProperties(Object model){
        try {
            if(model instanceof String){
                ((String) model).trim();
            }else{
                Class<?> clazz = model.getClass();
                Field[] field = clazz.getDeclaredFields();        //获取实体类的所有属性，返回Field数组
                for(int j=0 ; j<field.length ; j++){     //遍历所有属性
                    String name = field[j].getName();    //获取属性的名字
                   // System.out.println("attribute name:"+name);
                    name = name.substring(0,1).toUpperCase()+name.substring(1); //将属性的首字符大写，方便构造get，set方法
                    String type = field[j].getGenericType().toString();    //获取属性的类型
                    if(type.equals("class java.lang.String")){   //如果type是类类型，则前面包含"class "，后面跟类名
                        Method m = model.getClass().getMethod("get"+name);
                        String value = (String) m.invoke(model);    //调用getter方法获取属性值
                        if(value != null){
                            String methodStr = "set"+name.toUpperCase().substring(0, 1)+name.substring(1);
                            Method method = clazz.getMethod(methodStr,new Class[]{field[j].getType()});
                            method.invoke(model, value.trim());//处理：将值trim
                        }
                    }
                }
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }


}
