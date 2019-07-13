package com.deer.wms.message.configurer;

import com.deer.wms.message.constant.MessageConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class MessageMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return MessageConstant.MODEL_PACKAGE;
    }

    @Override
    public String getMapperLocations() {
        return MessageConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return MessageConstant.DAO_PACKAGE;
    }

}

