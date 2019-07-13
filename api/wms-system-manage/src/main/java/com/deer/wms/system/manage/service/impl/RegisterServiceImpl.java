package com.deer.wms.system.manage.service.impl;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.message.model.ValidateRecord;
import com.deer.wms.message.service.ValidateRecordService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.exception.ServiceException;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.MD5Utils;
import com.deer.wms.project.seed.util.RandomUtil;
import com.deer.wms.system.manage.dao.UserInfoMapper;
import com.deer.wms.system.manage.model.company.Company;
import com.deer.wms.system.manage.model.user.UserInfo;
import com.deer.wms.system.manage.model.user.UserRegisterInfo;

import com.deer.wms.system.manage.service.*;
import tk.mybatis.mapper.entity.Condition;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Date;
import java.util.List;

/**
 * 用户注册服务实现类
 *
 * Created by Floki on 2017/10/1.
 */
@Service
public class RegisterServiceImpl implements RegisterService {

    /**
     * 企业信息管理服务
     */
    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyAttachmentService attachmentService;

    @Autowired
    private UserRoleService userRoleService;


    /**
     * 用户信息管理服务
     */
    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private ValidateRecordService validateRecordService;
    
    @Autowired
    private UserInfoMapper userInfoMapper;

    @Override
    @Transactional
    public void register(UserRegisterInfo register) {
//        //验证手机短信验证码
//        if (!validateRecordService.validateSmsCode("1", register.getMobile(), register.getSmsCode())) {
//            throw new ServiceException(CommonCode.SERVICE_ERROR, "短信验证码不正确或已失效");
//        }

//        UserInfo userInfo = userInfoService.findUserInfoByAccount(register.getMobile());
//        if (null != userInfo) {
//            throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被使用");
//        }
        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(register.getMobile());
        List<UserInfo> users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码已经被注册");
                }
            }
        }
        users = null;
        userInfo = new UserInfo();
        userInfo.setEmail(register.getEmail());
        users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "邮箱已经被注册");
                }
            }
        }

        //设置默认的创建人(系统注册=-2)
        int defaultUser = -2;

        //保存公司信息
        Company company = new Company();
        BeanUtils.copyProperties(register, company);
        company.setCreateUserId(defaultUser);
      /*  if (!StringUtils.isEmpty(register.getEstablishDate())) {
            company.setEstablishDate(DateUtils.strToDate(register.getEstablishDate(), DateUtils.DEFAULT_DATE_FORMAT));
        }*/
     /*   if (register.getCompanyType() == 1) {
            company.setRoleId(6);
            //托盘生产商才有供应能力
         //   company.setSupplyAbility(register.getSupplyAbility());
        } else if (register.getCompanyType() == 2) {
            company.setRoleId(5);
        } else if (register.getCompanyType() == 3) {
            company.setRoleId(2);
        } else if (register.getCompanyType() == 4) {
            company.setRoleId(7);
        }*/
        companyService.save(company);

        //保存用户信息(手机号码就是登录账号)
        String salt = RandomUtil.generateString(10);
        userInfo = new UserInfo();
        BeanUtils.copyProperties(register, userInfo);
        userInfo.setCompanyId(company.getCompanyId());
        userInfo.setAccount(register.getMobile());
        userInfo.setPassword(MD5Utils.encryptPassword(register.getMobile(), register.getPassword(), salt));
        userInfo.setSalt(salt);
        userInfo.setCreateUserId(defaultUser);
        userInfo.setCreateTime(new Date());
        userInfo.setModifyTime(new Date());
        userInfoService.save(userInfo);

        //保存用户角色信息
        userRoleService.addUserRole(userInfo.getUserId(), 2);     //2是企业运维管理角色

        String savePath = "/company/" + company.getCompanyId(); //公司附件保存路径
       /* //保存企业附件信息：营业执照图片
        attachmentService.saveAttachment(register.getBusinessLicenseFile(), company.getCompanyId(), userInfo.getUserId(), 1, savePath, false);

        //保存企业附件信息：法人身份证正面图片
        attachmentService.saveAttachment(register.getArtificialPersonIdCardPositiveFile(), company.getCompanyId(), userInfo.getUserId(), 2, savePath, false);

        //保存企业附件信息：法人身份证反面图片
        attachmentService.saveAttachment(register.getArtificialPersonIdCardOppositeFile(), company.getCompanyId(), userInfo.getUserId(), 3, savePath, false);
   */ }

    @Override
    @Transactional
    public void registerForWechat(UserRegisterInfo register) {
        //验证手机短信验证码
        if (!validateRecordService.validateSmsCode("1", register.getMobile(), register.getSmsCode())) {
            throw new ServiceException(CommonCode.SERVICE_ERROR, "短信验证码不正确或已失效");
        }
//        UserInfo userInfo = userInfoService.findUserInfoByAccount(register.getMobile());
//        if (null != userInfo) {
//            throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被使用");
//        }
        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(register.getMobile());
        List<UserInfo> users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码已经被注册");
                }
            }
        }
        users = null;
        userInfo = new UserInfo();
        userInfo.setEmail(register.getEmail());
        users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "邮箱已经被注册");
                }
            }
        }
        //设置默认的创建人(系统注册=-2)
        int defaultUser = -2;
        //保存公司信息
        Company company = new Company();
        BeanUtils.copyProperties(register, company);
        company.setCreateUserId(defaultUser);
        if (!StringUtils.isEmpty(register.getEstablishDate())) {
            company.setEstablishDate(DateUtils.strToDate(register.getEstablishDate(), DateUtils.DEFAULT_DATE_FORMAT));
        }
        companyService.save(company);
        //保存用户信息(手机号码就是登录账号)
        String salt = RandomUtil.generateString(10);
        userInfo = new UserInfo();
        BeanUtils.copyProperties(register, userInfo);
        userInfo.setCompanyId(company.getCompanyId());
        userInfo.setAccount(register.getMobile());
        userInfo.setPassword(MD5Utils.encryptPassword(register.getMobile(), register.getPassword(), salt));
        userInfo.setSalt(salt);
        userInfo.setCreateUserId(defaultUser);
        userInfoService.save(userInfo);
        //保存用户角色信息
        if (register.getCompanyType() == 1) {
            userRoleService.addUserRole(userInfo.getUserId(), 6);
        } else if (register.getCompanyType() == 2) {
            userRoleService.addUserRole(userInfo.getUserId(), 5);
        } else if (register.getCompanyType() == 3) {
            userRoleService.addUserRole(userInfo.getUserId(), 2);
        } else if (register.getCompanyType() == 4) {
            userRoleService.addUserRole(userInfo.getUserId(), 7);
        }
       /* String savePath = "/company/" + company.getCompanyId(); //公司附件保存路径
        if (!StringUtils.isEmpty(register.getBusinessLicenseFilePath())) {
            //保存企业附件信息：营业执照图片
            MultipartFile businessLicenseFile = fileToMultipartFile(register.getBusinessLicenseFilePath(), register.getBusinessLicenseFileContentType());
            attachmentService.saveAttachment(businessLicenseFile, company.getCompanyId(), userInfo.getUserId(), 1, savePath, false);
        }else{
            throw new ServiceException(CommonCode.SERVICE_ERROR, "请上传营业执照图片");
        }
        if (!StringUtils.isEmpty(register.getArtificialPersonIdCardPositiveFilePath())) {
            //保存企业附件信息：法人身份证正面图片
            MultipartFile artificialPersonIdCardPositiveFile = fileToMultipartFile(register.getArtificialPersonIdCardPositiveFilePath(), register.getArtificialPersonIdCardPositiveFileContentType());
            attachmentService.saveAttachment(artificialPersonIdCardPositiveFile, company.getCompanyId(), userInfo.getUserId(), 2, savePath, false);
        }else{
            throw new ServiceException(CommonCode.SERVICE_ERROR, "请上传法人身份证正面图片");
        }
        if (!StringUtils.isEmpty(register.getArtificialPersonIdCardOppositeFilePath())) {
            //保存企业附件信息：法人身份证反面图片
            MultipartFile artificialPersonIdCardOppositeFile = fileToMultipartFile(register.getArtificialPersonIdCardOppositeFilePath(), register.getArtificialPersonIdCardOppositeFileContentType());
            attachmentService.saveAttachment(artificialPersonIdCardOppositeFile, company.getCompanyId(), userInfo.getUserId(), 3, savePath, false);
        }else{
            throw new ServiceException(CommonCode.SERVICE_ERROR, "请上传法人身份证反面图片");
        }*/
    }

    @Override
    public FileInfo uploadCompanyFile(HttpServletRequest request) {
        FileInfo fileInfo = null;
        try {
            MultiValueMap<String, MultipartFile> multipartFileMultiValueMap = ((StandardMultipartHttpServletRequest) request).getMultiFileMap();
            String savePath = "/company/temp"; //公司附件，临时保存路径
            if(!multipartFileMultiValueMap.isEmpty()){
                MultipartFile file = multipartFileMultiValueMap.get("file").get(0);
                fileInfo = attachmentService.saveTempAttachment(file,savePath,true);
            }
        } catch (Exception e) {
            throw new ServiceException(CommonCode.SERVICE_ERROR, "上传失败");
        }
        return fileInfo;
    }

    private MultipartFile fileToMultipartFile(String filePath,String contentType){
        try {
            File file = new File(filePath);
            FileInputStream in_file = new FileInputStream(file);
            return new MockMultipartFile(file.getName(), file.getName(), contentType, in_file);
        } catch (Exception e) {
            ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR );
        }
        return null;
    }

	@Override
	public String nextStepValidate(UserRegisterInfo register) {

        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(register.getMobile());
        List<UserInfo> users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码已经被注册");
                }
            }
        }
        users = null;
        userInfo = new UserInfo();
        userInfo.setEmail(register.getEmail());
        users = userInfoMapper.select(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                    throw new ServiceException(CommonCode.SERVICE_ERROR, "邮箱已经被注册");
                }
            }
        }    
        Condition condition = new Condition(ValidateRecord.class);
        Condition.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("businessType", "1");
        criteria.andEqualTo("receiveObject", register.getMobile());
        criteria.andIsNull("validateTime");
        condition.setOrderByClause(" generate_time DESC ");

        List<ValidateRecord> list = validateRecordService.findByCondition(condition);
        if (null == list || list.isEmpty()) {
        	throw new ServiceException(CommonCode.SERVICE_ERROR, "短信验证码不正确或已失效");
        }
        ValidateRecord record = list.get(0);
        boolean isok = DateUtils.belongCalendar(new Date(), record.getGenerateTime(), record.getInvalidTime());
        if (record.getValidateCode().equalsIgnoreCase(register.getSmsCode()) && isok) {
            return "ok";
        } 

        throw new ServiceException(CommonCode.SERVICE_ERROR, "短信验证码不正确或已失效");
	}

}
