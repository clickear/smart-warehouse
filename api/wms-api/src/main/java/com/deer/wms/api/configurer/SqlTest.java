package com.deer.wms.api.configurer;

public class SqlTest {
    public static void main(String[] args){
        for(int i=1000000000 ;i<1000003000;i++){

            System.out.print("INSERT INTO pallet(pallet_id,company_id,storage_id,duration_type,life_cycle_design,life_cycle_remaining,pallet_status,register_time,activate_time,modify_time,device_id,state,eID,is_bad,life_cycle_state) \n" +
                    "VALUES ("  + i + ",1,1,1,5,5,2,null,null,null," + i +",'0'," + "111111111111111"+i +",'0','0');");

        }

    }
}
