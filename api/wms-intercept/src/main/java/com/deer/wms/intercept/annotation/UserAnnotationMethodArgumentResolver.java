package com.deer.wms.intercept.annotation;

import com.deer.wms.intercept.common.data.CommonDataService;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * CurrentUserData 注解的方法参数解析器，实现 CurrentUserData 注解。
 *
 * Created by Floki on 2017/9/29.
 */
public class UserAnnotationMethodArgumentResolver implements HandlerMethodArgumentResolver {
    /**
     * 日志
     */
    private static Logger logger = LoggerFactory.getLogger(UserAnnotationMethodArgumentResolver.class);

    @Autowired
    private CommonDataService commonDataService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(User.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer container, NativeWebRequest webRequest, WebDataBinderFactory factory) throws Exception {
        String token = webRequest.getHeader(Constants.TOKEN_ACCESS_KEY);
        if (StringUtils.isEmpty(token)) {
            logger.debug("当前请求的 Header 中没有{}参数或者参数值为空", Constants.TOKEN_ACCESS_KEY);
            return null;
        }

        //有可能 commonDataService 为 null
        if (null == commonDataService) {
            HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
            BeanFactory beanFactory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
            commonDataService = (CommonDataService) beanFactory.getBean("commonDataService");
        }

        CurrentUser currentUser = commonDataService.getCurrentUserDataFromRedis(token);
        return currentUser;
    }
}
