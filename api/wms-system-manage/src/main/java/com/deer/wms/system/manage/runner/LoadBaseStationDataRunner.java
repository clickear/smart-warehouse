package com.deer.wms.system.manage.runner;

import com.deer.wms.project.seed.util.RedisUtil;
import com.deer.wms.system.manage.dao.StorageBaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * 应用启动以后，调用本类实现 CommandLineRunner 接口 run 方法里面的代码。
 * 用于将设备信息加载到 Redis 中，便于数据中心处理数据时直接从 Redis 中获取，不用频繁的访问数据库
 *
 * Created by Floki on 2017/10/23.
 */
@Component
public class LoadBaseStationDataRunner implements CommandLineRunner {
    private static Logger logger = LoggerFactory.getLogger(LoadBaseStationDataRunner.class);

    @Autowired
    private RedisUtil redisUtil;
    
    @Autowired
    private StorageBaseMapper storageBaseMapper;

    @Override
    public void run(String... strings) throws Exception {
        // 加载基站ID和仓储点关联关系到redis中
     //   this.loadBaseStationIdListToRedis();
    }

    /**
     * 加载将基站ID和仓储点到 Redis
     */
 /*   private void loadBaseStationIdListToRedis()
    {
    	// 启动时，将基站ID和仓储点绑定，放到redis中
		List<StorageBase> storageBaseList = storageBaseMapper.selectAll();
		if(storageBaseList != null && storageBaseList.size() > 0)
		{
			for(StorageBase storageBase : storageBaseList)
			{
				String key = MessageFormat.format(Constants.BASE_STATION_KEY, storageBase.getBaseStationId());
		        try {
		        	redisUtil.set(key, String.valueOf( storageBase.getStorageId()) );
		        } catch (Exception e) {
		        	logger.warn("put base station info to redis exception : key={}, deviceId={}, message={}", key, storageBase.getBaseStationId(), e.getMessage());
		        }
			}
		}
    }*/
}
