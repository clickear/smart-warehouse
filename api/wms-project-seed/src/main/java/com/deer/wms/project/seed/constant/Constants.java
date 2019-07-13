package com.deer.wms.project.seed.constant;

/**
 * 系统常量定义
 *
 * Created by Floki on 2017/9/28.
 */
public final class Constants {

    /**
     * Mapper插件基础接口的完全限定名
     */
    public static final String MAPPER_INTERFACE_REFERENCE = "Mapper";

    /**
     * Token：访问 token 字段的名称
     */
    public static final String TOKEN_ACCESS_KEY = "access-token";

    /**
     * 账号状态：启用
     */
    public static final String ACCOUNT_STATUS_ENABLE = "enable";

    /**
     * 账号状态：停用
     */
    public static final String ACCOUNT_STATUS_DISABLE = "disable";

    /**
     * 信息状态：正常的(启用)
     */
    public static final String INFO_STATE_NORMAL = "normal";

    /**
     * 信息状态：无效的(停用)
     */
    public static final String INFO_STATE_INVALID = "invalid";

    /**
     * 信息状态：已删除
     */
    public static final String INFO_STATE_DELETED = "deleted";

    /**
     * 系统参数类型：消息参数
     */
    public static final int SYSTEM_PARAM_MESSAGE = 1;

    /**
     * 系统参数类型：告警参数
     */
    public static final int SYSTEM_PARAM_ALARM = 2;

    /**
     * 企业类型：托盘运营商
     */
    public static final int COMPANY_TYPE_OPERATE = -1;

    /**
     * 企业类型：托盘生产商/供应商
     */
    public static final int COMPANY_TYPE_SUPPLIER = 1;

    /**
     * 企业类型：托盘投资商
     */
    public static final int COMPANY_TYPE_INVESTOR = 2;

    /**
     * 企业类型：代理商
     */
    public static final int COMPANY_TYPE_AGENT = 3;

    /**
     * 企业类型：托盘承租商/客户
     */
    public static final int COMPANY_TYPE_CUSTOMER = 4;

    /**
     * 企业类型：POI
     */
    public static final int COMPANY_TYPE_POI = 5;
    
    /**
     * 基站ID信息的Key(基站ID和仓储点ID绑定)
     */
    public static String BASE_STATION_KEY = "StationId:{0}:Info";
}
