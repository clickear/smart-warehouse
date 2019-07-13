package com.company;

import mypackage.CommonService;
import mypackage.CommonService_Service;

public class Main {

    public static void main(String[] args) {
	// write your code here
        CommonService_Service  commonService_service=new CommonService_Service();
        CommonService commonService=commonService_service.getCommonServiceImplPort();
        String  sdbd=commonService.invoke("dhiedef","D001062chuku","master","{\"contractNo\":\"CZ20190416004\",\"itemMasterId\":\"9\",\"warecode\":\"CK2-175825\",\"remark\":\"589454151\",\"userid\":\"07f277dd-02bc-4bd1-9f6f-05f6402cb017\",\"addtime\":\"2019-04-20 16:58:28\",\"chaunyunid\":\"d7c3869a-821c-4e8c-a65b-2e10851f0ca9\",\"mold\":\"长租\",\"billdetai\":[{\"material\":\"IM26174911\",\"quantity\":\"2\",\"batch\":\"2019-4-20\"}]}\n");
        System.out.println(sdbd);
    }
}
