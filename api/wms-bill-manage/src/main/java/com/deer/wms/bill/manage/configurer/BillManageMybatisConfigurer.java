package com.deer.wms.bill.manage.configurer;


import com.deer.wms.bill.manage.constant.BillManageConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class BillManageMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return   BillManageConstant.MODEL_PACKAGE; }

    @Override
    public String getMapperLocations() {
        return  BillManageConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return  BillManageConstant.DAO_PACKAGE;
    }

}

