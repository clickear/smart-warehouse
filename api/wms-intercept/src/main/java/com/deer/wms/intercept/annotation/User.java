package com.deer.wms.intercept.annotation;

import java.lang.annotation.*;

/**
 * 当前用户数据的注解，作用在方法上，加上该注解将会获取根据请求中的token值获取当前用户的数据，
 * 但只在有 @Authority 注解下有效，当token有误时，该注解的返回值可能为null
 *
 * Created by Floki on 2017/9/29.
 */
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface User {

}
