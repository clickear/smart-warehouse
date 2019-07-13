package com.deer.wms.system.manage.service.impl;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.file.service.FileService;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.message.service.ValidateRecordService;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.exception.ServiceException;
import com.deer.wms.project.seed.util.MD5Utils;
import com.deer.wms.project.seed.util.RandomUtil;
import com.deer.wms.project.seed.util.ToolMail;
import com.deer.wms.system.manage.dao.UserInfoMapper;
import com.deer.wms.system.manage.model.company.Company;
import com.deer.wms.system.manage.model.user.*;
import com.deer.wms.system.manage.service.CompanyService;
import com.deer.wms.system.manage.service.UserInfoService;
import com.deer.wms.system.manage.service.UserRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

/**
 * Created by WUXB on 2017/10/01.
 */
@Service
@Transactional
public class UserInfoServiceImpl extends AbstractService<UserInfo, Integer> implements UserInfoService {

	private static Logger logger = LoggerFactory.getLogger(UserInfoServiceImpl.class);

	@Autowired
	private UserInfoMapper userInfoMapper;

	@Autowired
	private CompanyService companyService;

	@Autowired
	private UserRoleService userRoleService;

	@Autowired
	private ValidateRecordService validateRecordService;

	@Autowired
	private FileService fileService;

	@Autowired
	private ToolMail toolMail;

	@Override
	public List<UserListVO> findUserFormList(UserInfoCriteria criteria) {
		List<UserListVO> list = userInfoMapper.selectUserFormList(criteria);
		return list;
	}

	@Override
	public UserInfo findUserInfoByAccount(String account) {
		/*
		 * Condition condition = new Condition(UserInfo.class);
		 * Condition.Criteria criteria = condition.createCriteria();
		 * criteria.andEqualTo("account", account);
		 * 
		 * List<UserInfo> list = findByCondition(condition);
		 */

		/*
		 * if (null == list || list.isEmpty()) { return null; }
		 */
		UserInfo userInfo = userInfoMapper.selectUserInfo(account);
		return userInfo;
	}

	@Override
	public UserDetail findUserDetailByAccount(String account) {
		if (StringUtils.isEmpty(account)) {
			return null;
		}
		return userInfoMapper.selectUserDetailByAccount(account);
	}

	@Override
	public UserInfoDetailVO findUserInfoDetailByUserId(Integer userId) {
		if (null == userId) {
			return null;
		}
		return userInfoMapper.selectUserInfoDetailVOByUserId(userId);
	}

	@Override
	public UserInfo validate(String account, String password) {
		// 验证账户是否存在
		UserInfo userInfo = findUserInfoByAccount(account);

		if (null == userInfo || !Constants.INFO_STATE_NORMAL.equals(userInfo.getState())) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "登录账号或密码错误");
		}

		// 验证密码是否正确
		String loginPassword = MD5Utils.encryptPassword(userInfo.getAccount(), password, userInfo.getSalt());
		System.out.println("密码："+loginPassword);
		System.out.println("密码："+userInfo.getPassword());
		if (!loginPassword.equals(userInfo.getPassword())) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "登录账号或密码错误");
		}

		// 验证账号状态是否正常
		if (Constants.ACCOUNT_STATUS_DISABLE.equals(userInfo.getAccountStatus())) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "登录账号被锁定");
		}

		// 验证账号信息状态是否正常
		if (!Constants.INFO_STATE_NORMAL.equals(userInfo.getState())) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "登录账号状态异常，请与系统管理员联系");
		}

		return userInfo;
	}

	@Override
	public void modifyPassword(UserPassword userPassword, CurrentUser currentUser) {
		UserInfo userInfo = findUserInfoByAccount(currentUser.getAccount());
		String password = MD5Utils.encryptPassword(userInfo.getAccount(), userPassword.getOldPassword(),
				userInfo.getSalt());
		if (!password.equals(userInfo.getPassword())) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "旧密码不正确");
		}

		String salt = RandomUtil.generateString(10);
		userInfo = new UserInfo();
		userInfo.setUserId(currentUser.getUserId());
		userInfo.setPassword(MD5Utils.encryptPassword(currentUser.getAccount(), userPassword.getPassword(), salt));
		userInfo.setSalt(salt);
		userInfo.setModifyUserId(currentUser.getUserId());
		userInfo.setModifyTime(new Date());

		super.update(userInfo);
	}

	@Override
	public void modifyUserData(UserData userData, CurrentUser currentUser) {
		// 修改个人信息
		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(currentUser.getUserId());
		userInfo.setEmail(userData.getEmail());

		// 如果头像图片文件不为空，说明要修改头像图片
		if (null != userData.getIconUrlFile()) {
			// 删除原有的头像图片
			if (!StringUtils.isEmpty(currentUser.getIconUrl())) {
				fileService.deleteFileByRelativePath(currentUser.getIconUrl());
			}

			String savePath = "/user/" + userInfo.getUserId();
			FileInfo fileInfo = fileService.createFile(userData.getIconUrlFile(), savePath, true);
			userInfo.setIconUrl(fileInfo.getUrl());
		}
		// super.update(userInfo);
		// 邮箱和头像地址只有一个不为空，责进行修改
		if (!(StringUtils.isEmpty(userInfo.getIconUrl()) && StringUtils.isEmpty(userInfo.getEmail()))) {
			userInfoMapper.updateUserInfoById(userInfo);
		}

		// 修改公司信息
		Company company = new Company();
		company.setCompanyId(currentUser.getCompanyId());
		company.setLinkmanAddress(userData.getLinkmanAddress());
		company.setLinkmanPhone(userData.getLinkmanPhone());
		company.setLng(userData.getLng());
		company.setLat(userData.getLat());

		// companyService.update(company);
		// 手机号和地址 只要有一个不为空，则进行修改
		if (!(StringUtils.isEmpty(userData.getLinkmanAddress()) && StringUtils.isEmpty(userData.getLinkmanPhone()))) {
			companyService.updateCompanyInfoById(company);
		}
	}

	@Override
	public void modifyUserInfoAccountState(Integer userId, String sate, CurrentUser currentUser) {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(userId);
		userInfo.setAccountStatus(sate);
		userInfo.setModifyUserId(currentUser.getUserId());
		userInfo.setModifyTime(new Date());
		super.update(userInfo);
	}

	@Override
	public void modifyUserInfoState(Integer userId, String sate, CurrentUser currentUser) {
		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(userId);
		userInfo.setState(sate);
		userInfo.setModifyUserId(currentUser.getUserId());
		userInfo.setModifyTime(new Date());
		super.update(userInfo);
	}

	@Override
	public void retrievalPassword(UserPasswordRetrieval retrieval) {
		UserInfo userInfo = new UserInfo();
		userInfo.setAccount(retrieval.getMobile());
		userInfo.setState("normal");
		userInfo.setAccountStatus("enable");
//		List<UserInfo> users = userInfoMapper.select(userInfo);
		UserInfo user = userInfoMapper.selectUserInfo(retrieval.getMobile());
		String salt = RandomUtil.generateString(10);
		// UserInfo userInfo = findUserInfoByAccount(retrieval.getMobile());
		if (null == user ) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码或邮箱未注册");
		}
		if (null != user && Constants.INFO_STATE_DELETED.equals( user.getState() ) ) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被删除");
		}
		if (null != user && Constants.ACCOUNT_STATUS_DISABLE.equals( user.getAccountStatus() ) ) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被停用");
		}
		if (null != user && !Constants.ACCOUNT_STATUS_DISABLE.equals(user.getAccountStatus())
				&& !Constants.INFO_STATE_DELETED.equals(user.getState())) {
			BeanUtils.copyProperties(user, userInfo);
		}
		userInfo=user;
		userInfo.setPassword(MD5Utils.encryptPassword(userInfo.getAccount(), retrieval.getPassword(), salt));
		userInfo.setSalt(salt);
		userInfo.setModifyUserId(userInfo.getUserId());
		userInfo.setModifyTime(new Date());
		super.update(userInfo);
	}

	@Override
	public void sendSmsCode(String mobile) {
		UserInfo userInfo = new UserInfo();
		userInfo.setAccount(mobile);
		userInfo.setState("normal");
		userInfo.setAccountStatus("enable");
		List<UserInfo> users = userInfoMapper.select(userInfo);
		// UserInfo userInfo = findUserInfoByAccount(mobile);
		if (null == users || users.isEmpty()) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码未注册");
		}
		// 验证账号状态是否正常
		if (users != null && !users.isEmpty()) {
			Integer count = 0;
			for (UserInfo user : users) {
				if (null != user && !Constants.INFO_STATE_DELETED.equals(user.getState())) {
					count++;
				}
			}
			if (count != 1) {
				throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被删除");
			}
			count = 0;
			for (UserInfo user : users) {
				if (null != user && !Constants.ACCOUNT_STATUS_DISABLE.equals(user.getAccountStatus())) {
					count++;
				}
			}
			if (count != 1) {
				throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被停用");
			}
		}
		validateRecordService.sendMobileValidateCode("2", mobile);
	}

	@Override
	public void sendEmailCode(String email) {
		// UserInfo userInfo = findUserInfoByAccount(email);
		UserInfo userInfo = new UserInfo();
		userInfo.setEmail(email);
		userInfo.setState("normal");
		userInfo.setAccountStatus("enable");
		List<UserInfo> users = userInfoMapper.select(userInfo);
		// UserInfo userInfo = findUserInfoByAccount(mobile);
		if (null == users || users.isEmpty()) {
			throw new ServiceException(CommonCode.SERVICE_ERROR, "邮箱未注册");
		}
		// 验证账号状态是否正常
		if (users != null && !users.isEmpty()) {
			Integer count = 0;
			for (UserInfo user : users) {
				if (null != user && !Constants.INFO_STATE_DELETED.equals(user.getState())) {
					count++;
				}
			}
			if (count != 1) {
				throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被删除");
			}
			count = 0;
			for (UserInfo user : users) {
				if (null != user && !Constants.ACCOUNT_STATUS_DISABLE.equals(user.getAccountStatus())) {
					count++;
				}
			}
			if (count != 1) {
				throw new ServiceException(CommonCode.SERVICE_ERROR, "账号已被停用");
			}
		}
		// 发送邮箱验证码
		String[] toAddress = new String[] { email };
		String code = RandomUtil.generateString(5);
		toolMail.sendMail(toAddress, "魔方托盘-忘记密码验证码", "您的验证码是：" + code);

		validateRecordService.saveValidateRecord("2", email, code);
	}

	@Override
	public void createUserInfo(UserInfoCreate create, CurrentUser currentUser) {
		// UserInfo userInfo = findUserInfoByAccount(create.getMobile());
		UserInfo userInfo = new UserInfo();
		userInfo.setAccount(create.getMobile());
		List<UserInfo> users = userInfoMapper.select(userInfo);
		if (users != null && !users.isEmpty()) {
			for (UserInfo user : users) {
				if (null != user && !user.getState().equals("deleted")) {
					throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码已经被注册");
				}
			}
		}
		users = null;
		userInfo = new UserInfo();
		userInfo.setEmail(create.getEmail());
		users = userInfoMapper.select(userInfo);
		if (users != null && !users.isEmpty()) {
			for (UserInfo user : users) {
				if (null != user && !user.getState().equals("deleted")) {
					throw new ServiceException(CommonCode.SERVICE_ERROR, "邮箱已经被注册");
				}
			}
		}
		// 保存用户信息和账户信息
		userInfo = new UserInfo();
		BeanUtils.copyProperties(create, userInfo);
		String salt = RandomUtil.generateString(10);
		userInfo.setAccount(create.getMobile());
		userInfo.setPassword(MD5Utils.encryptPassword(userInfo.getAccount(), create.getPassword(), salt));
		userInfo.setSalt(salt);
		userInfo.setCreateUserId(currentUser.getUserId());
		userInfo.setCreateTime(new Date());
		userInfo.setModifyTime(new Date());
		super.save(userInfo);

		// 添加用户角色信息
		if (null != create.getRoleId()) {
			userRoleService.addUserRole(userInfo.getUserId(), create.getRoleId());
		}
	}

	@Override
	public void modifyUserInfo(UserInfoModify modify, CurrentUser currentUser) {
		UserInfo userInfo = new UserInfo();
		BeanUtils.copyProperties(modify, userInfo);
		userInfo.setModifyUserId(currentUser.getUserId());
		userInfo.setModifyTime(new Date());
		super.update(userInfo);
	}
	
	@Override
	public List<UserInfo> selectByInfos(UserInfo userInfo){
		return userInfoMapper.select(userInfo);
	}
}
