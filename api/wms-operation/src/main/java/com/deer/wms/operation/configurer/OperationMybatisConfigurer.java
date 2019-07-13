package com.deer.wms.operation.configurer;


import com.deer.wms.operation.constant.OperationConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;


/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class OperationMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return   OperationConstant.MODEL_PACKAGE; }

    @Override
    public String getMapperLocations() {
        return  OperationConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return  OperationConstant.DAO_PACKAGE;
    }

}

