package com.deer.wms.bill.manage.configurer;
import com.deer.wms.intercept.annotation.UserAnnotationMethodArgumentResolver;
import com.deer.wms.intercept.intercept.AccessIntercept;
import com.deer.wms.project.seed.configurer.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import java.util.List;

/**
 * Created by Floki on 2017/9/29.
 */
@Configuration
public class BillManageWebMvcConfigurer extends WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AccessIntercept()).addPathPatterns("/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        super.addArgumentResolvers(argumentResolvers);
        argumentResolvers.add(new UserAnnotationMethodArgumentResolver());
    }
}
