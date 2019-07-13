package com.deer.wms.api.configurer;

import com.deer.wms.base.system.constant.BaseSystemConstant;
import com.deer.wms.bill.manage.constant.BillManageConstant;
import com.deer.wms.device.manage.constant.DeviceManageConstant;
import com.deer.wms.file.constant.FileConstant;
import com.deer.wms.finance.constant.FinanceConstant;
import com.deer.wms.message.constant.MessageConstant;
import com.deer.wms.operation.constant.OperationConstant;
import com.deer.wms.project.seed.configurer.AbstractMybatisConfigurer;
import com.deer.wms.report.constant.ReportConstant;
import com.deer.wms.system.manage.constant.SystemManageConstant;
import com.deer.wms.ware.task.constant.WareTaskConstant;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Floki on 2017/9/30.
 */
@Configuration
public class ApiMybatisConfigurer extends AbstractMybatisConfigurer {

    @Override
    public  String getTypeAliasesPackage() {
        return SystemManageConstant.MODEL_PACKAGE;
    }

    @Override
    public String getMapperLocations() {
        return "classpath*:com/deer/wms/**/mapper/*.xml";
    }

    @Override
    public String getBasePackage() {
        return FileConstant.DAO_PACKAGE
                + ", " + SystemManageConstant.DAO_PACKAGE
                + ", " + MessageConstant.DAO_PACKAGE
                + ", " + BillManageConstant.DAO_PACKAGE
                + ", " + ReportConstant.DAO_PACKAGE
                + ", " + FinanceConstant.DAO_PACKAGE
                + ", " + OperationConstant.DAO_PACKAGE
                + ", " + BaseSystemConstant.DAO_PACKAGE
                + ", " + WareTaskConstant.DAO_PACKAGE
                + ", " + DeviceManageConstant.DAO_PACKAGE


                ;
    }
}
