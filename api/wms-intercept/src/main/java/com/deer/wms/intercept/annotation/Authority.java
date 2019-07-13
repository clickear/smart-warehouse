package com.deer.wms.intercept.annotation;

import java.lang.annotation.*;

/**
 * 需要权限控制的注解，作用在类、方法上，加上此注解，将会受到访问拦截处理
 *
 * Created by Floki on 2017/9/29.
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Authority {
}
