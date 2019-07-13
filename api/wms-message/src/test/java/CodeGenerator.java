import com.deer.wms.project.seed.generator.Generator;
import com.deer.wms.project.seed.generator.configurer.DatasourceConfigurer;

/**
 * Created by Floki on 2017/9/29.
 */
public class CodeGenerator {
    public static void main(String[] args) {
        DatasourceConfigurer configurer = new DatasourceConfigurer();
        //设置数据库连接信息
        configurer.setUrl("jdbc:mysql://redoor.iask.in:33060/pallet");
        configurer.setUserName("root");
        configurer.setPassword("123456");
        configurer.setDiverClassName("com.mysql.jdbc.Driver");

        //设置需要生成代码的基础路径，生成的代码都会在该路径下面
        configurer.setBasePackage("com.chinamobile.pallet.message");
        configurer.setAuthor("WUXB");

        //设置子模块名称(如果要生成子模块的代码，一定要设置该值，否则代码将会生成到父项目中了)
        configurer.setModuleName("/pallet-message");

        //设置需要生成的表
        //configurer.getTables().add(new Table("consult", null, "consult_id", "Integer"));
        //configurer.getTables().add(new Table("help_category", null, "category_id", "Integer"));
        //configurer.getTables().add(new Table("help_content", null, "content_id", "Integer"));
        //configurer.getTables().add(new Table("validate_record", null, "record_id", "Long"));

        //生成代码
        Generator.genCode(configurer);
    }
}
