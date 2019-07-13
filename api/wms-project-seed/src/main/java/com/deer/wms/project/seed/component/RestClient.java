package com.deer.wms.project.seed.component;

import org.springframework.http.client.OkHttpClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

/**
 * Created by Floki on 2017/10/14.
 */
@Component
public class RestClient {
    protected RestTemplate restTemplate;

    @PostConstruct
    public void init() {
        restTemplate = new RestTemplate();
        OkHttpClientHttpRequestFactory okHttpClientHttpRequestFactory = new OkHttpClientHttpRequestFactory();
        okHttpClientHttpRequestFactory.setConnectTimeout(5000);
        okHttpClientHttpRequestFactory.setReadTimeout(5000);
        okHttpClientHttpRequestFactory.setWriteTimeout(5000);
        restTemplate.setRequestFactory(okHttpClientHttpRequestFactory);
    }

}
