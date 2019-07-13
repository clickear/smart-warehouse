import com.deer.wms.project.seed.generator.Generator;
import com.deer.wms.project.seed.generator.configurer.DatasourceConfigurer;
import com.deer.wms.project.seed.generator.configurer.Table;

/**
 * Created by Floki on 2017/9/29.
 */
public class DeviceCodeGenerator {
    public static void main(String[] args) {
        DatasourceConfigurer configurer = new DatasourceConfigurer();
        //设置数据库连接信息
        configurer.setUrl("jdbc:mysql://127.0.0.1:3306/deer_wms_v3?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false");
        configurer.setUserName("root");
        configurer.setPassword("123456");
        configurer.setDiverClassName("com.mysql.jdbc.Driver");

        //设置需要生成代码的基础路径，生成的代码都会在该路径下面
        configurer.setBasePackage("com.deer.wms.device.manage");
        configurer.setAuthor("GuoJingXun");

        //设置子模块名称(如果要生成子模块的代码，一定要设置该值，否则代码将会生成到父项目中了)
        configurer.setModuleName("/wms-device-manage");

        //设置需要生成的表



//        configurer.getTables().add(new Table("bill_master",null,"id","Integer"));
//        configurer.getTables().add(new Table("device_single",null,"device_single_id","Integer"));
//
//        configurer.getTables().add(new Table("check_project",null,"check_project_id","Integer"));
//        configurer.getTables().add(new Table("check_content",null,"check_content_id","Integer"));

        configurer.getTables().add(new Table("device_check_detail",null,"device_check_detail_id","Integer"));
        configurer.getTables().add(new Table("device_check_master",null,"device_check_master_id","Integer"));
        //生成代码
        Generator.genCode(configurer);
    }
}
