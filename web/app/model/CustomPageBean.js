'use strict';
class CustomPageBean {
  constructor (result) {
    let data = result.data || {};
    this.pageNumber = data.pageNum || 1;
    this.pageSize = data.pageSize || 20;
    this.total = 0;
    this.pages = 0;
    this.rows = [];
    this.code = 200;
    this.msg = '';
    this.code = result.code || 200;
    if (data.total && data.list) {
      this.rows = data.list;
      this.total = data.total;
      this.pages = data.pages;
    }
  }
}

module.exports = CustomPageBean;