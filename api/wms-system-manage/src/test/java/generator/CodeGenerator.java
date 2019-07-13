package generator;

import com.deer.wms.project.seed.generator.Generator;
import com.deer.wms.project.seed.generator.configurer.DatasourceConfigurer;
import com.deer.wms.project.seed.generator.configurer.Table;

/**
 * Created by Floki on 2017/9/29.
 */
public class CodeGenerator {
    public static void main(String[] args) {
        DatasourceConfigurer configurer = new DatasourceConfigurer();
        //设置数据库连接信息
        configurer.setUrl("jdbc:mysql://122.112.219.208:3306/deer_wms_v3?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false");
        configurer.setUserName("root");
        configurer.setPassword("_Xcl121728");
        configurer.setDiverClassName("com.mysql.jdbc.Driver");

        //设置需要生成代码的基础路径，生成的代码都会在该路径下面
        configurer.setBasePackage("com.deer.wms.system.manage");
        configurer.setAuthor("");

        //设置子模块名称(如果要生成子模块的代码，一定要设置该值，否则代码将会生成到父项目中了)
        configurer.setModuleName("/wms-system-manage");

        //设置需要生成的表
        configurer.getTables().add(new Table("inventory_report", null, "id", "Integer"));
        //configurer.getTables().add(new Table("company", null, "company_id", "Integer"));
        //configurer.getTables().add(new Table("company_attachment", null, "attachment_id", "Integer"));
        //configurer.getTables().add(new Table("system_param", null, "param_id", "Integer"));
        //configurer.getTables().add(new Table("alarm_param", null, "alarm_param_id", "Integer"));
        //configurer.getTables().add(new Table("user_role", null, "user_role_id", "Integer"));
        //configurer.getTables().add(new Table("role", null, "role_id", "Integer"));
        //configurer.getTables().add(new Table("resource", null, "resource_id", "Integer"));
        //configurer.getTables().add(new Table("resource_url", null, "url_id", "Integer"));
        //configurer.getTables().add(new Table("resource_url_param", null, "param_id", "Integer"));
        //configurer.getTables().add(new Table("permission", null, "permission_id", "Integer"));
        //configurer.getTables().add(new Table("company_storage", null, "storage_id", "Integer"));

        //生成代码
        Generator.genCode(configurer);
    }
}
