'use strict';
class PageBean {
    constructor(pageNumber, pageSize, totalCount, data) {
        this.pageNumber = pageNumber || 1;
        this.pageSize = pageSize || 10;
        this.totalCount = totalCount || 0;
        this.data = data || [];
    }

    init(pageNumber, pageSize, totalCount, pageData){
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.pageNumber = pageNumber;
        this.data = pageData;
        return this;
    }
}

module.exports = PageBean;