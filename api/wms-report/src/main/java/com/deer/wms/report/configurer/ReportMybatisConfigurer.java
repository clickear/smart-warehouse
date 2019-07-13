package com.deer.wms.report.configurer;


import com.deer.wms.report.constant.ReportConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class ReportMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() { return ReportConstant.MODEL_PACKAGE; }

    @Override
    public String getMapperLocations() {
        return ReportConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return ReportConstant.DAO_PACKAGE;
    }

}

