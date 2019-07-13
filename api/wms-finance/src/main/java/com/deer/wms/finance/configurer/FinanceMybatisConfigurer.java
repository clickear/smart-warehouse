package com.deer.wms.finance.configurer;

import com.deer.wms.finance.constant.FinanceConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class FinanceMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return   FinanceConstant.MODEL_PACKAGE; }

    @Override
    public String getMapperLocations() {
        return  FinanceConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return  FinanceConstant.DAO_PACKAGE;
    }

}

