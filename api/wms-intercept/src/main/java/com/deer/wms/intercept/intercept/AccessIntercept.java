package com.deer.wms.intercept.intercept;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.common.data.CommonDataService;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 访问拦截，主要用于调用api接口前对访问权限的控制和处理
 *
 * Created by Floki on 2017/9/16.
 */
public class AccessIntercept extends HandlerInterceptorAdapter {
    /**
     * 日志
     */
    private static Logger logger = LoggerFactory.getLogger(AccessIntercept.class);

    @Autowired
    private CommonDataService commonDataService;

    /**
     * 拦截处理
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /**
         * 如果没有获取到权限控制的注解，说明当前访问目标不需要权限控制，直接放行通过，进入后面环节
         */
        Authority annotation = getAuthorityAnnotation(handler);
        if (null == annotation) {
            return true;
        }

        //设置响应请求的格式
        response.setContentType("text/html;charset=UTF-8");

        //获取请求对象Header中的token值
        String token = request.getHeader(Constants.TOKEN_ACCESS_KEY);
        if (StringUtils.isEmpty(token)) {
            response.getWriter().print(ResultGenerator.genFailResult(CommonCode.MISSING_PERMISSION_PARAMTER));
            return false;
        }

        //有可能 commonDataService 为 null
        if (null == commonDataService) {
            BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
            commonDataService = (CommonDataService) factory.getBean("commonDataService");
        }

        CurrentUser currentUser = commonDataService.getCurrentUserDataFromRedis(token);
        if (null == currentUser) {
            response.getWriter().print(ResultGenerator.genFailResult(CommonCode.TOKEN_INVALID));
            return false;
        }
        return true;
    }

    /**
     * 获取当前访问目标类或方法上的权限控制注解
     *
     * @param handler 当前访问目标的处理
     * @return 返回当前访问目标类或方法上的权限控制注解，如果返回null说明访问目标不需要权限控制
     */
    private Authority getAuthorityAnnotation(Object handler) {
        /*//获取当前访问目标类的权限控制注解
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Class<?> tClass = handlerMethod.getBeanType();
        Authority annotation = tClass.getAnnotation(Authority.class);

        //如果目标类没有权限控制注解，则获取当前访问方法的权限控制注解，如果都没有说明访问目标则不需要权限控制
        if (null == annotation) {
            Method method = handlerMethod.getMethod();
            annotation = method.getAnnotation(Authority.class);
        }*/
        return null;
    }
}
