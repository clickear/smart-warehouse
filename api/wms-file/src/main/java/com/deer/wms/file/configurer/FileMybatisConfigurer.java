package com.deer.wms.file.configurer;

import com.deer.wms.file.constant.FileConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;

/**
 * Mybatis & Mapper & PageHelper 配置
 */
//@Configuration
public class FileMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return FileConstant.MODEL_PACKAGE;
    }

    @Override
    public String getMapperLocations() {
        return FileConstant.MAPPER_LOCATIONS;
    }

    @Override
    public String getBasePackage() {
        return FileConstant.DAO_PACKAGE;
    }

}

