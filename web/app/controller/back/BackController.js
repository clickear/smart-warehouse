'use strict';
let Response = require('../../model/Response'),
    RestifyProxy = require('../../util/RestifyProxy');

let _appendChildren = function (nodes) {
    let html = [];
    html.push(`<ul module-menu="">`);
    for (let i in nodes) {
        html.push(`<li module-menu="${nodes[i].url}"
                    module-target="page">${nodes[i].name}`);
        if (nodes[i].children && nodes[i].children.length > 0) {
            html.push(_appendChildren(nodes[i].children));
        }
        html.push('</li>');
    }
    html.push('</ul>');
    return html.join('');
};
let _appendNodes = function (menuArray) {
    let html = [];
    for (let i in menuArray) {
        html.push(`<div class="sub noprint"
            module-menu="${menuArray[i].url}"
             module-target="page">
            <div class="menu-icon organization"></div>
            <span class="text">${menuArray[i].name}</span>`);
        if (menuArray[i].children && menuArray[i].children.length > 0) {
            html.push(_appendChildren(menuArray[i].children));
        }
        html.push(`</div>`);
    }
    return html.join('');
};


/**
 * 后台主页面
 */
module.exports.backPage = function () {
    let req = this.req;
    let user = req.user;
    if(user ==undefined ){
        let response = new Response();
        response.render('login');
        this.resolve(response);
        return false;
    }
    let menusNodes = JSON.parse(JSON.stringify(user.menus));
    let menuArray = [];
    let menuMap = {};
    for (let i = 0, l = menusNodes.length; i < l; i++) {
        menuMap[menusNodes[i].id] = menusNodes[i];
    }
    for (let i = 0, l = menusNodes.length; i < l; i++) {
        if (menuMap[menusNodes[i].parentId] && menusNodes[i].id != menusNodes[i].parentId) {
            if (!menuMap[menusNodes[i].parentId].children)
                menuMap[menusNodes[i].parentId].children = [];
            menuMap[menusNodes[i].parentId].children.push(menusNodes[i]);
        } else {
            menuArray.push(menusNodes[i]);
        }
    }
    let menuHtml = _appendNodes(menuArray);


    let menusNodes1 = JSON.parse(JSON.stringify(user.menus1));
    let menuArray1 = [];
    let menuMap1 = {};
    for (let i = 0, l = menusNodes1.length; i < l; i++) {
        menuMap1[menusNodes1[i].id] = menusNodes1[i];
    }
    for (let i = 0, l = menusNodes1.length; i < l; i++) {
        if (menuMap1[menusNodes1[i].parentId] && menusNodes1[i].id != menusNodes1[i].parentId) {
            if (!menuMap1[menusNodes1[i].parentId].children)
                menuMap1[menusNodes1[i].parentId].children = [];
            menuMap1[menusNodes1[i].parentId].children.push(menusNodes1[i]);
        } else {
            menuArray1.push(menusNodes1[i]);
        }
    }
    let menuHtml1 = _appendNodes(menuArray1);


    let menusNodes2 = JSON.parse(JSON.stringify(user.menus2));
    let menuArray2 = [];
    let menuMap2 = {};
    for (let i = 0, l = menusNodes2.length; i < l; i++) {
        menuMap2[menusNodes2[i].id] = menusNodes2[i];
    }
    for (let i = 0, l = menusNodes2.length; i < l; i++) {
        if (menuMap2[menusNodes2[i].parentId] && menusNodes2[i].id != menusNodes2[i].parentId) {
            if (!menuMap2[menusNodes2[i].parentId].children)
                menuMap2[menusNodes2[i].parentId].children = [];
            menuMap2[menusNodes2[i].parentId].children.push(menusNodes2[i]);
        } else {
            menuArray2.push(menusNodes2[i]);
        }
    }
    let menuHtml2 = _appendNodes(menuArray2);


    let menusNodes3 = JSON.parse(JSON.stringify(user.menus3));
    let menuArray3 = [];
    let menuMap3 = {};
    for (let i = 0, l = menusNodes3.length; i < l; i++) {
        menuMap3[menusNodes3[i].id] = menusNodes3[i];
    }
    for (let i = 0, l = menusNodes3.length; i < l; i++) {
        if (menuMap3[menusNodes3[i].parentId] && menusNodes3[i].id != menusNodes3[i].parentId) {
            if (!menuMap3[menusNodes3[i].parentId].children)
                menuMap3[menusNodes3[i].parentId].children = [];
            menuMap3[menusNodes3[i].parentId].children.push(menusNodes3[i]);
        } else {
            menuArray3.push(menusNodes3[i]);
        }
    }
    let menuHtml3 = _appendNodes(menuArray3);



    let reqData = {user, menuHtml,menuHtml1,menuHtml2,menuHtml3};
    let response = new Response();
    response.render('back/back', reqData);
    this.resolve(response);
};