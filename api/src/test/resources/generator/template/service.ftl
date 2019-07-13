package ${basePackage}.service;

import ${basePackage}.model.${modelNameUpperCamel};
import ${basePackage}.model.${modelNameUpperCamel}Criteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import ${basePackage}.model.${modelNameUpperCamel}Dto;

/**
 * Created by ${author} on ${date}.
 */
public interface ${modelNameUpperCamel}Service extends Service<${modelNameUpperCamel}, ${type}> {


    List<${modelNameUpperCamel}Dto> findList(${modelNameUpperCamel}Criteria  criteria) ;

}
