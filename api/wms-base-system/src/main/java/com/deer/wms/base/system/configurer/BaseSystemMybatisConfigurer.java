package com.deer.wms.base.system.configurer;


import com.deer.wms.base.system.constant.BaseSystemConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class BaseSystemMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() { return BaseSystemConstant.MODEL_PACKAGE; }

    @Override
    public String getMapperLocations() {
        return BaseSystemConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return BaseSystemConstant.DAO_PACKAGE;
    }

}

