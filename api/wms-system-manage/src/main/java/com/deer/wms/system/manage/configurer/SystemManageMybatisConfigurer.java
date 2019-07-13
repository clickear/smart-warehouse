package com.deer.wms.system.manage.configurer;

import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;
import com.deer.wms.system.manage.constant.SystemManageConstant;
import org.springframework.context.annotation.Configuration;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
@Configuration
public class SystemManageMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return SystemManageConstant.MODEL_PACKAGE;
    }

    @Override
    public String getMapperLocations() {
        return SystemManageConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return SystemManageConstant.DAO_PACKAGE;
    }

}

