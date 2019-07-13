package com.deer.wms.api.configurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger 配置文件
 *
 * Created by Floki on 2017/8/10.
 */
@Configuration
@EnableSwagger2
public class ApiSwaggerConfigurer extends WebMvcConfigurerAdapter {

    /**
     * 注册swagger-ui.html
     *
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        /*registry.addResourceHandler("/webjars*")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");*/
    }

    @Bean
    public Docket createSystemManageRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("系统管理")
                .apiInfo(apiInfo("系统管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.system.manage"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createBaseSystemRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("基础管理")
                .apiInfo(apiInfo("基础管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.base.system"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createBillManageRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("单据")
                .apiInfo(apiInfo("单据服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.bill.manage"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createReportRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("报表服务")
                .apiInfo(apiInfo("报表服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.report"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createFinanceRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("财务")
                .apiInfo(apiInfo("财务服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.finance"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createOperationRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("业务")
                .apiInfo(apiInfo("业务服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.operation"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createWareTaskRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("仓库作业")
                .apiInfo(apiInfo("仓库作业服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.ware.task"))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    public Docket createDeviceManageRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("设备管理")
                .apiInfo(apiInfo("设备管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.deer.wms.device.manage"))
                .paths(PathSelectors.any())
                .build();
    }



    /*@Bean
    public Docket createSupplyRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("供应管理")
                .apiInfo(apiInfo("供应管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.supply"))
                .paths(PathSelectors.any())
                .build();
    }*/

    /*@Bean
    public Docket createOperationRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("运营管理")
                .apiInfo(apiInfo("运营管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.operation"))
                .paths(PathSelectors.any())
                .build();
    }*/

    /*@Bean
    public Docket createLeaseRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("租单管理")
                .apiInfo(apiInfo("租单管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.lease"))
                .paths(PathSelectors.any())
                .build();
    }*/

    /*@Bean
    public Docket createDataCenterRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("数据中心")
                .apiInfo(apiInfo("数据中心服务，主要负责接收、解析、校正、筛选、存储“中移物联网OneNet平台”推送给“智慧共享托盘应用管理系统”的数据，并向“智慧共享托盘应用管理系统”提供查询、发送指令等api接口。"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.data.center"))
                .paths(PathSelectors.any())
                .build();
    }*/

    /*@Bean
    public Docket createAssetRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("资产管理")
                .apiInfo(apiInfo("资产管理服务提供的 RestFul APIs"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.asset"))
                .paths(PathSelectors.any())
                .build();
    }*/

    /*@Bean
    public Docket createMessageRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("消息管理")
                .apiInfo(apiInfo("消息管理服务提供的 RestFul APIs，包括咨询、消息待办、联系客服、在线帮助等"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.chinamobile.pallet.message"))
                .paths(PathSelectors.any())
                .build();
    }*/

    private ApiInfo apiInfo(String description) {// 创建API的基本信息，这些信息会在Swagger UI中进行显示
        return new ApiInfoBuilder()
                .title("使用 Swagger2 构建的 RestFul APIs")// API 标题
                .description(description)// API描述
                .contact(new Contact("Floki", "", "1466181575@qq.com")) //联系人
                .version("1.0")// 版本号
                .build();
    }
}
