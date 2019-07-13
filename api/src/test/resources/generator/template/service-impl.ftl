package ${basePackage}.service.impl;

import ${basePackage}.dao.${modelNameUpperCamel}Mapper;
import ${basePackage}.model.${modelNameUpperCamel};
import ${basePackage}.model.${modelNameUpperCamel}Criteria;
import ${basePackage}.service.${modelNameUpperCamel}Service;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import ${basePackage}.model.${modelNameUpperCamel}Dto;

/**
 * Created by ${author} on ${date}.
 */
@Service
@Transactional
public class ${modelNameUpperCamel}ServiceImpl extends AbstractService<${modelNameUpperCamel}, ${type}> implements ${modelNameUpperCamel}Service {

    @Autowired
    private ${modelNameUpperCamel}Mapper ${modelNameLowerCamel}Mapper;


    @Override
    public List<${modelNameUpperCamel}Dto> findList(${modelNameUpperCamel}Criteria  criteria) {
        return ${modelNameLowerCamel}Mapper.findList(criteria);
    }
}
