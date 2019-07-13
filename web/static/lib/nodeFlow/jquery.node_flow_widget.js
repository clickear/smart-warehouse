'use strict';
/**
 * jQuery.node_flow
 * ISSUES:
 *  1.鼠标移动多个节点 *
 *  2.校验流程的合法性，以每个节点为中心向上遍历至流程的开始节点 *
 *  3.IE10不支持pointer-events属性，故无法绘制lasso *
 * @dependency $, Raphael, Raphael.connection, underscore, jquery.ui, jquery.scrollbar(https://github.com/gromo/jquery.scrollbar)
 */
(function ($, Raphael) {
    var TAG = 'tag';
    var ENUM_NODE_TYPE = {
        'line': 'line',//连线
        'node': 'node' //节点实体
    };
    var ENUM_CLASSES = {
        CANVAS_WRAPPER: 'm-canvas-wrap',
        CANVAS: 'm-canvas',
        TOOLBAR: 'm-toolbar',
        NODE_ITEM: 'm-graph-item',
        NODE_ITEM_SELECTED: 'selected',
        NODE_ITEM_INTERFACE: 'interface',
        LINE_ITEM: 'm-canvas-line',
        LINE_ITEM_DASHED: 'm-line-dashed',
        GRID_CANVAS: 'm-bg-grid',
        LASSO_RECT: 'm-lasso-rect',
        LASSO_RECT_ACTIVE: 'm-lasso-active'
    };
    var ENUM_CLASSES_DOT = {
        CANVAS_WRAPPER: ['.', ENUM_CLASSES.CANVAS_WRAPPER].join(''),
        CANVAS: ['.', ENUM_CLASSES.CANVAS].join(''),
        TOOLBAR: ['.', ENUM_CLASSES.TOOLBAR].join(''),
        NODE_ITEM: ['.', ENUM_CLASSES.NODE_ITEM].join(''),
        NODE_ITEM_SELECTED: ['.', ENUM_CLASSES.NODE_ITEM_SELECTED].join(''),
        NODE_ITEM_INTERFACE: ['.', ENUM_CLASSES.NODE_ITEM_INTERFACE].join(''),
        LINE_ITEM: ['.', ENUM_CLASSES.LINE_ITEM].join(''),
        LINE_ITEM_DASHED: ['.', ENUM_CLASSES.LINE_ITEM_DASHED].join(''),
        GRID_CANVAS: ['.', ENUM_CLASSES.GRID_CANVAS].join(''),
        LASSO_RECT: ['.', ENUM_CLASSES.LASSO_RECT].join(''),
        LASSO_RECT_ACTIVE: ['.', ENUM_CLASSES.LASSO_RECT_ACTIVE].join('')
    };

    var util = {
        /**
         * xss检查
         * @param str 检查替换目标字符串
         * @param reg
         * @returns {*}
         */
        xssCheck: function(str, reg) {
            return str ? ('' + str).replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
                if (b) {
                    return a;
                } else {
                    return {
                        '<': '&lt;',
                        '&': '&amp;',
                        '"': '&quot;',
                        '>': '&gt;',
                        "'": '&#39;',
                        'javascript:': '',
                        'jscript:': '',
                        'vbscript:': ''
                    }[a]
                }
            }) : '';
        },
        getWrapper: function () {
            return $(ENUM_CLASSES_DOT.CANVAS_WRAPPER);
        },
        getStorage: function () {
            var $wrap = util.getWrapper();
            var tag = $wrap.data(TAG);
            return $wrap.data(tag);
        },
        getEventEmitter: function () {
            return util.getStorage().eventEmitter;
        },
        getOption: function ($wrap) {
            $wrap = $wrap ? $wrap : util.getWrapper();
            var tag = $wrap.data(TAG);
            return $wrap.data(tag).option;
        },
        getRaphael: function ($wrap) {
            $wrap = $wrap ? $wrap : util.getWrapper();
            var tag = $wrap.data(TAG);
            return $wrap.data(tag).raphael;
        },
        getSVGNodes: function ($wrap) {
            $wrap = $wrap ? $wrap : util.getWrapper();
            var tag = $wrap.data(TAG);
            return $wrap.data(tag).svgNodes;
        },
        getRelations: function ($wrap) {
            $wrap = $wrap ? $wrap : util.getWrapper();
            var tag = $wrap.data(TAG);
            return $wrap.data(tag).relations;
        },
        getNodeTpl: function (type) {
            var tpl, option = util.getOption();
            if (type || $.isNumeric(type)) {
                $.each(option.nodeTpl, function (i, item) {
                    if (item.type == type) {
                        tpl = item;
                        return false;
                    }
                });
            }
            return tpl || option.nodeTpl;
        },
        /**
         * 获取节点模板rules
         * @param svgNode {Raphael.Element}
         */
        getNodeTplRules: function (svgNode) {
            var type = svgNode.attr('type'),
                rules = util.getNodeTpl(type).rules;
            if (!$.isPlainObject(rules)) {
                rules = {};
                util.trigger('error', Raphael.format('nodeTpl[{0}].rules is not defined!', type), 'getNodeTplRules');
            }
            return rules;
        },
        /**
         * 节点在画布内拖动事件
         * @param $dom
         */
        moveHandler4NodeItem: function ($dom) {
            var $wrap = $(ENUM_CLASSES_DOT.CANVAS_WRAPPER),
                raphael = util.getRaphael($wrap),
                pos = $dom.position(),
                x = pos.left,
                y = pos.top;
            if (Math.abs(x) < 5 && Math.abs(y) < 5) {
                return;
            }
            var id = $dom.data("id");
            raphael.getById(id).attr({x: x, y: y});
            util.updateRelations($wrap);
        },
        /**
         * 更新所有连线
         * @param $wrap
         */
        updateRelations: function ($wrap) {
            var raphael = util.getRaphael($wrap),
                relations = util.getRelations($wrap);
            $.each(relations, function (i, item) {
                raphael.connection(item);
            });
        },
        /**
         * 判断两个节点之间是否存在连线（无向）
         * @param elem1
         * @param elem2
         * @returns {boolean}
         */
        hasRelation: function (elem1, elem2) {
            var flag = false;
            $.each(util.getRelations(), function (key, item) {
                if ((item.from === elem1 && item.to === elem2) || (item.from === elem2 && item.to === elem1)) {
                    flag = true;
                    return false;//Exit loop
                }
            });
            return flag;
        },
        /**
         * 选中节点
         * @param $dom
         */
        doSelectNode: function ($dom) {
            var $wrap = util.getWrapper(),
                raphael = util.getRaphael($wrap);
            $(ENUM_CLASSES_DOT.CANVAS).find(ENUM_CLASSES_DOT.NODE_ITEM_SELECTED).removeClass(ENUM_CLASSES.NODE_ITEM_SELECTED).end()
                .find(Raphael.format('path{0}', ENUM_CLASSES_DOT.NODE_ITEM_SELECTED)).removeClass(ENUM_CLASSES.NODE_ITEM_SELECTED);
            $dom && $dom.addClass(ENUM_CLASSES.NODE_ITEM_SELECTED);
            raphael.currentSelectedItem = $dom;
        },
        isEmptyNode: function ($node) {
            var $wrap = util.getWrapper(),
                flag = true,
                rect = util.getRaphaelElementByNode($node),
                relations = util.getRelations($wrap);
            $.each(relations, function (k, item) {
                if (item.from === rect || item.to === rect) {
                    flag = false;
                    return false;
                }
            });
            return flag;
        },
        getRaphaelElementByNode: function ($node) {
            var $wrap = util.getWrapper(),
                id = $node.data('id'),
                svgNodes = util.getSVGNodes($wrap);
            return svgNodes[id];
        },
        /**
         * 节流函数
         * @param func
         * @param $dom
         * @param wait
         */
        throttle: function (func, $dom, wait) {
            var tag = 'tick',
                tick = $dom.data(tag);
            clearTimeout(tick);
            tick = setTimeout(func, wait || 90);
            $dom.data(tag, tick);
        },
        /**
         * 判断节点是否与线相交
         * @param $node
         * @returns {{flag: boolean, path: *}}
         */
        judgeNodeIntersectWithLine: function ($node) {
            var $wrap = $(ENUM_CLASSES_DOT.CANVAS_WRAPPER),
                relations = util.getRelations($wrap),
                svgNodes = util.getSVGNodes($wrap),
                flag = false,
                path = null;
            $.each(relations, function (k, item) {
                var box1 = item.line.getBBox(),
                    box2 = svgNodes[$node.data('id')].getBBox();
                if (util.intersectAlgorithm(box1, box2)) {
                    flag = true;
                    path = item;
                    return false;
                }
            });
            return {flag: flag, path: path};
        },
        /**
         * 矩形相交算法
         * @param box1
         * @param box2
         * @returns {boolean}
         */
        intersectAlgorithm: function (box1, box2) {
            //jquery.ui.droppable - touch
            var x1 = box1.x,
                y1 = box1.y,
                x2 = x1 + box1.width,
                y2 = y1 + box1.height,
                l = box2.x,
                t = box2.y,
                r = l + box2.width,
                b = t + box2.height;
            return (
                    ( y1 >= t && y1 <= b ) || // Top edge touching
                    ( y2 >= t && y2 <= b ) || // Bottom edge touching
                    ( y1 < t && y2 > b ) // Surrounded vertically
                ) && (
                    ( x1 >= l && x1 <= r ) || // Left edge touching
                    ( x2 >= l && x2 <= r ) || // Right edge touching
                    ( x1 < l && x2 > r ) // Surrounded horizontally
                );
        },
        /**
         * 更新svg节点prev和next指针
         * @param svgNode {Raphael.Element}
         * @param attr {string} 属性名称
         * @param val
         * @param isAdd {boolean} true-添加 false-删除 undefined-删除全部
         */
        updateNodePointer: function (svgNode, attr, val, isAdd) {
            var pos,
                tempVal,
                SPLITER = '_$$_',
                value = svgNode.attr(attr),
                tempArr = value ? value.split(SPLITER) : [];
            pos = $.inArray(val, tempArr);
            if (isAdd === true) {
                (pos === -1) && tempArr.push(val);
                tempVal = tempArr.join(SPLITER);
                svgNode.attr(attr + 'Number', tempArr.length);
            } else if (isAdd === false) {
                (pos > -1) && tempArr.splice(pos, 1);
                tempVal = tempArr.join(SPLITER);
                svgNode.attr(attr + 'Number', tempArr.length);
            } else {
                tempVal = null;
            }
            svgNode.attr(attr, tempVal);
        },
        /**
         * 触发自定义事件
         */
        trigger: function () {
            EventEmitter.prototype.trigger.apply(util.getEventEmitter(), Array.prototype.slice.call(arguments, 0));
        },
        /**
         * 为Raphael元素注册自定义属性
         * @param name
         * @param func
         */
        registerAttribute: function (name, func) {
            util.getRaphael().customAttributes[name] = func;
        },
        /**
         * 获取数据模板
         * @returns {{eventEmitter: null, option: null, currentSelectedItem: null, raphael: null, relations: {}, svgNodes: {}}}
         */
        getCacheTemplate: function () {
            var CACHE_TPL = {//模板
                eventEmitter: null,
                option: null,//配置项
                currentSelectedItem: null,//当前选中节点
                raphael: null,//Raphael实例
                relations: {},//节点映射关系，形如：{'relationID': {from:null, line:null, to:null}}
                svgNodes: {}//SVG节点，形如：{'nodeID':null}
            };
            return CACHE_TPL;
        }
    };

    var ui = {
        genSkeleton: function ($wrap) {
            var dom = [
                Raphael.format('<div class="{0}"></div>', ENUM_CLASSES.TOOLBAR),
                Raphael.format('<div class="m-scroller"><div id="m_canvas" class="{0}"></div></div>', ENUM_CLASSES.CANVAS)
            ];
            return $wrap.addClass(ENUM_CLASSES.CANVAS_WRAPPER).append(dom.join(''));
        },
        /**
         * 生成工具栏
         * （工具栏用于存放待拖拽节点）
         * @param $wrap
         */
        genToolbar: function ($wrap) {
            var $toolbar = $wrap.find(ENUM_CLASSES_DOT.TOOLBAR),
                $canvas = $wrap.find(ENUM_CLASSES_DOT.CANVAS),
                option = util.getOption($wrap),
                data = option.nodeTpl;
            $.each(data, function (i, node) {
                var $tpl = $(_.template(node.html)({data: node})).appendTo($toolbar);
                $tpl.draggable({
                    helper: 'clone',
                    revert: 'invalid',
                    cursor: 'move',
                    create: function () {
                        $(this).css('z-index', 99);
                    }
                });
            });
            $canvas.droppable({
                accept: Raphael.format('{0} {1}', ENUM_CLASSES_DOT.TOOLBAR, ENUM_CLASSES_DOT.NODE_ITEM),
                drop: function (e, ue) {
                    var $wrap = util.getWrapper(),
                        $thiz = $(this),
                        $parent = $thiz.parent(),
                        $helper = $(ue.helper),
                        wPos = $thiz.offset(),
                        uePos = ue.position,
                        pos = ue.offset,
                        $elem = ue.draggable,
                        type = $elem.data('type'),
                        nodeTpl = util.getNodeTpl(type);
                    //判断是否将元素拖动到容器的可视区域
                    if ((uePos.left + $helper.outerWidth()) <= $parent.width() && (uePos.top + $helper.outerHeight()) <= $parent.height()) {
                        ui.createNode($wrap, $.extend({}, nodeTpl, {
                            x: Math.max((pos.left - wPos.left), 0),
                            y: Math.max((pos.top - wPos.top), 0),
                            id: Raphael.createUUID()
                        }));
                    } else {
                        var elemOffset = $elem.position();
                        var $clone = $helper.clone().appendTo($helper.parent());
                        setTimeout(function () {
                            $clone.animate(
                                {
                                    left: elemOffset.left + 'px',
                                    top: elemOffset.top + 'px'
                                },
                                500,
                                function () {
                                    $clone.remove();
                                }
                            );
                        }, 1);
                    }
                }
            });
        },
        /**
         * 生成网格
         * @param $wrap
         */
        drawGrid: function ($wrap) {
            $wrap = $wrap ? $wrap : util.getWrapper();
            var option = util.getOption($wrap),
                $canvas = $wrap.find(ENUM_CLASSES_DOT.CANVAS),
                $grid = $(ENUM_CLASSES_DOT.GRID_CANVAS),
                grid = option.grid;
            if (!$grid.length) {
                $grid = $(Raphael.format('<canvas class="{0}"></canvas>', ENUM_CLASSES.GRID_CANVAS));
                $grid.attr({width: option.width, height: option.height}).appendTo($canvas);
            }
            if (grid.show) {
                var ctx = $grid.removeClass('hide').first()[0].getContext('2d');
                ctx.clearRect(0, 0, option.width, option.height);
                ctx.beginPath();
                ctx.strokeStyle = grid.stroke;
                ctx.fillStyle = grid.stroke;
                //绘制竖直线
                for (var i = 0; i <= option.width; i += grid.step) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, option.height);
                }
                //绘制水平线
                for (var j = 0; j <= option.height; j += grid.step) {
                    ctx.moveTo(0, j);
                    ctx.lineTo(option.width, j);
                }
                ctx.closePath();
                ctx.stroke();
            } else {
                $grid.addClass('hide');
            }
        },
        /**
         * 创建节点
         * @param $wrap
         * @param type
         * @param node
         */
        createNode: function ($wrap, node) {
            var $canvas = $wrap.find(ENUM_CLASSES_DOT.CANVAS);
            var $tpl = $(_.template(node.html)({data: node})).appendTo($canvas);
            //添加拖拽支持
            $tpl.draggable({
                containment: ENUM_CLASSES_DOT.CANVAS,
                cursor: 'move',
                classes: {
                    'ui-draggable-dragging': ENUM_CLASSES.NODE_ITEM_SELECTED
                },
                start: function () {
                    util.moveHandler4NodeItem($(this));
                    util.doSelectNode($(this));
                },
                drag: function () {
                    var $thiz = $(this),
                        option = util.getOption();
                    util.moveHandler4NodeItem($thiz);
                    option.dragToAppend && util.isEmptyNode($thiz) && util.throttle(function () {
                        var res = util.judgeNodeIntersectWithLine($thiz),
                            $lineItemDashed = $(Raphael.format('{0} path{1}', ENUM_CLASSES_DOT.CANVAS, ENUM_CLASSES_DOT.LINE_ITEM_DASHED));
                        if (res && res.flag) {
                            $lineItemDashed.removeClass('m-line-dashed');
                            $(res.path.line.node).addClass('m-line-dashed');
                            $thiz.data('dashedPath', res.path);
                        } else {
                            $thiz.removeData('dashedPath');
                            $lineItemDashed.removeClass('m-line-dashed');
                        }
                    }, $thiz, 40);
                },
                stop: function (e, ue) {
                    var rect,
                        $wrap = $(ENUM_CLASSES_DOT.CANVAS_WRAPPER),
                        $thiz = $(this),
                        id = $thiz.data('id'),
                        path = $thiz.data('dashedPath');
                    util.moveHandler4NodeItem($thiz);
                    if (path) {//在连线之间加入新节点
                        rect = util.getSVGNodes($wrap)[id];
                        //1. 绘制两条新的path连接线段 2.删除旧的path线段
                        ui.deleteGraph($(path.line.node), ENUM_NODE_TYPE.line);
                        ui.drawLine(path.from, rect);
                        ui.drawLine(rect, path.to);
                        $thiz.removeData('dashedPath');
                    }
                    setTimeout(function () {
                        ue.helper.trigger('click');
                    }, 10);
                }
            });
            $tpl.droppable({
                accept: ENUM_CLASSES_DOT.NODE_ITEM_INTERFACE,
                classes: {
                    'ui-droppable-hover': ENUM_CLASSES.NODE_ITEM_SELECTED
                },
                drop: function (e, ue) {
                    var $dom = ue.helper;
                    var $target = $(this);
                    var $parent = $dom.parent();
                    var dataId = $parent.data('id');
                    var tarDataId = $target.data('id');
                    var path = $dom.data('path');
                    var svgNodes = util.getSVGNodes();
                    path.to = svgNodes[tarDataId];

                    if (!util.hasRelation(path.from, path.to) && path.from !== path.to) {
                        var line = ui.drawLine(svgNodes[dataId], svgNodes[tarDataId], path);
                        line && $parent.addClass('ui-state-done');
                    }
                }
            });
            $tpl.bind('click', function () {
                util.doSelectNode($(this).focus());
            });
            $tpl.bind('mouseenter', function () {
                $(this).find(ENUM_CLASSES_DOT.NODE_ITEM_INTERFACE).removeClass('hide');
                return false;
            });
            $tpl.bind('mouseleave', function () {
                $(this).find(ENUM_CLASSES_DOT.NODE_ITEM_INTERFACE).addClass('hide');
                return false;
            });
            $tpl.find(ENUM_CLASSES_DOT.NODE_ITEM_INTERFACE).draggable({
                revert: 'invalid',
                containment: ENUM_CLASSES_DOT.CANVAS,
                cursor: "crosshair",
                helper: "clone",
                start: function (e, ue) {
                    var raphael = util.getRaphael();
                    var svgNodes = util.getSVGNodes();
                    var $dom = ue.helper;
                    var $parent = $dom.parent();
                    var dataId = $parent.data('id');
                    var tempRect = raphael.rect(node.x, node.y, 10, 10).attr({
                        fill: '#fff',
                        "fill-opacity": 0,
                        "stroke-width": 1,
                        "stroke-opacity": 0,
                        cursor: "crosshair"
                    });
                    var path = ui.drawFakeLine(svgNodes[dataId], tempRect);
                    $dom.css('opacity', 0).data('path', path).data('rect', tempRect);
                },
                drag: function (e, ue) {
                    var svgNodes = util.getSVGNodes();
                    var $dom = ue.helper;
                    var pos = ue.offset;
                    var $wrap = $dom.parents('.m-canvas');
                    var wPos = $wrap.offset();
                    var $parent = $dom.parent();
                    var dataId = $parent.data('id');
                    var tempRect = $dom.data('rect');
                    var path = $dom.data('path');
                    tempRect.attr({x: pos.left - wPos.left, y: pos.top - wPos.top});
                    //raphael.connection(svgNodes[dataId], tempRect, path);
                    ui.drawFakeLine(svgNodes[dataId], tempRect, path);
                },
                stop: function (e, ue) {
                    var $dom = ue.helper;
                    var $parent = $dom.parent();
                    var tempRect = $dom.data('rect');
                    var path = $dom.data('path');
                    tempRect.remove();
                    if ($parent.hasClass('ui-state-done')) {
                        $parent.removeClass('ui-state-done');
                    } else {
                        path.line.remove();
                    }
                }
            });
            //存储节点业务属性properties
            $tpl.data('properties', node.properties);
            //绘制svg节点
            var raphael = util.getRaphael();
            var svgNodes = util.getSVGNodes();
            var rect = raphael.rect(node.x, node.y, $tpl.width(), $tpl.height()).attr({
                fill: '#fff',
                "fill-opacity": 0,
                "stroke-width": 1,
                "stroke-opacity": 0,
                cursor: "move",
                id: node.id,
                type: node.type
            });
            rect.id = node.id;
            svgNodes[rect.id] = rect;
            //绑定自定义事件
            var myEvents = node.events;
            $.each(myEvents || {}, function (name, func) {
                if ($.isFunction(func)) {
                    $tpl.bind(name, func);
                }
            });
            //触发添加节点事件
            util.trigger('addNode', $tpl);
        },
        /**
         * 删除节点或者连线
         * @param $node
         * @param type 'line' or 'node'
         */
        deleteGraph: function ($node, type) {
            var id, relations = util.getRelations(), svgNodes = util.getSVGNodes();
            if (type === ENUM_NODE_TYPE.line) {
                id = $node.attr('id');
                //更新prev和next指针
                var from = relations[id].from.id;
                var to = relations[id].to.id;
                util.updateNodePointer(svgNodes[from], 'next', to, false);
                util.updateNodePointer(svgNodes[to], 'prev', from, false);
                //删除连线
                relations[id].line.remove();
                delete relations[id];
                //触发删除连线事件
                util.trigger('deleteRelation', svgNodes[from], svgNodes[to]);
            } else if (type === ENUM_NODE_TYPE.node) {
                //1. 删除节点的所有连线 2. 删除节点
                id = $node.data('id');
                var rect = svgNodes[id];
                $.each(relations, function (key, item) {
                    if (item.from === rect || item.to === rect) {
                        ui.deleteGraph($(item.line.node), ENUM_NODE_TYPE.line);
                    }
                });
                rect.remove();
                delete svgNodes[id];
                $node.remove();
                //绑定删除节点事件
                util.trigger('deleteNode', $node);
            } else {
                //do nothing
            }
            util.getStorage().currentSelectedItem = null;
        },
        /**
         * 绘制或者更新连线
         * @param from {Raphael.Element}
         * @param to {Raphael.Element}
         * @param path {Raphael.Element|null}
         * @param id {string}
         * @returns {Raphael.Element|undefined}
         */
        drawLine: function (from, to, path, id) {
            var $wrap = $(ENUM_CLASSES_DOT.CANVAS_WRAPPER),
                option = util.getOption(),
                line = option.line,
                raphael = util.getRaphael($wrap),
                relations = util.getRelations($wrap),
                uuid = path ? path.line.attr('id') : (id ? id : Raphael.createUUID());
            var preCheck = function (from, to) {
                var MAX_NUM = 99999,
                    fNodeRules = util.getNodeTplRules(from),
                //fRulesMaxInput = parseInt(fNodeRules.maxInput),
                    fRulesMaxOutput = parseInt(fNodeRules.maxOutput),
                    tNodeRules = util.getNodeTplRules(to),
                    tRulesMaxInput = parseInt(tNodeRules.maxInput),
                //tRulesMaxOutput = parseInt(tNodeRules.maxOutput),
                //fPrev = parseInt(from.attr('prevNumber')),
                    fNext = parseInt(from.attr('nextNumber')),
                //tNext = parseInt(to.attr('nextNumber')),
                    tPrev = parseInt(to.attr('prevNumber'));
                //fPrev = $.isNumeric(fPrev) ? fPrev : 0;
                fNext = $.isNumeric(fNext) ? fNext : 0;
                tPrev = $.isNumeric(tPrev) ? tPrev : 0;
                //tNext = $.isNumeric(tNext) ? tNext : 0;
                //fRulesMaxInput = $.isNumeric(fRulesMaxInput) ? fRulesMaxInput : MAX_NUM;
                fRulesMaxOutput = $.isNumeric(fRulesMaxOutput) ? fRulesMaxOutput : MAX_NUM;
                tRulesMaxInput = $.isNumeric(tRulesMaxInput) ? tRulesMaxInput : MAX_NUM;
                //tRulesMaxOutput = $.isNumeric(tRulesMaxOutput) ? tRulesMaxOutput : MAX_NUM;
                return (fRulesMaxOutput > fNext) && (tRulesMaxInput > tPrev);
            };
            if (preCheck(from, to)) {
                line = raphael.connection(from, to, path || Raphael.format('{0}|{1}|{2}', line['stroke'], line['stroke-width'], uuid));
                relations[uuid] = line;
                //更新prev和next指针
                util.updateNodePointer(from, 'next', to.attr('id'), true);
                util.updateNodePointer(to, 'prev', from.attr('id'), true);
                //绑定添加连线事件
                util.trigger('addRelation', from, to);
            } else {
                util.trigger('error', Raphael.format('Draw line failed from[{0}], to:[{1}]!', from.id, to.id), 'drawLine');
                line = undefined;
            }
            return line;
        },
        /**
         * 绘制或者更新临时连线（用于用户使用鼠标绘制连线时）
         * @param from
         * @param to
         * @param path
         * @param id
         * @param
         * @returns {{text, line, from, to}|*}
         */
        drawFakeLine: function (from, to, path, id) {
            var $wrap = $(ENUM_CLASSES_DOT.CANVAS_WRAPPER),
                line = util.getOption().line,
                raphael = util.getRaphael($wrap),
                uuid = id ? id : Raphael.createUUID();
            line = raphael.connection(from, to, path || Raphael.format('{0}|{1}|{2}', line['stroke'], line['stroke-width'], uuid));
            return line;
        },
        /**
         * 绘制套索
         */
        drawLasso: function () {
            $(Raphael.format('{0} svg', ENUM_CLASSES_DOT.CANVAS)).bind('mousedown.lasso', function (e) {
                if (this.tagName === e.target.tagName) {
                    var $thiz = $(this),
                        $wrap = $thiz.parent(),
                        raphael = util.getRaphael(),
                        x = e.offsetX,
                        y = e.offsetY;
                    //清除之前的lasso
                    $(ENUM_CLASSES_DOT.LASSO_RECT, $thiz).remove();
                    //为节点和<path>添加pointer-events:none
                    $wrap.find([ENUM_CLASSES_DOT.NODE_ITEM, 'path'].join(',')).each(function () {
                        $(this).css('pointer-events', 'none');
                    });
                    //开始绘制一个矩形，大小为1,1
                    var rect = raphael.rect(x, y, 1, 1).attr('class', ENUM_CLASSES.LASSO_RECT);
                    //记录下初始位置
                    $(rect.node).attr({ox: x, oy: y});
                    //缓存矩形，并打上标记status=down:表示开始绘制lasso
                    $thiz.addClass(ENUM_CLASSES.LASSO_RECT_ACTIVE).data('lasso', rect).data('status', 'down');
                    //更新节点样式
                    $wrap.find(Raphael.format('{0}{1}', ENUM_CLASSES_DOT.NODE_ITEM, ENUM_CLASSES_DOT.NODE_ITEM_SELECTED)).removeClass(ENUM_CLASSES.NODE_ITEM_SELECTED);
                    //绑定mousemove事件
                    $thiz.bind('mousemove.lasso', function (e) {
                        var $self = $(this);
                        requestAnimationFrame(function () {
                            //判断是否是因绘制lasso而引起的mousemove事件
                            if ($self.hasClass(ENUM_CLASSES.LASSO_RECT_ACTIVE) && $self.data('status')) {
                                var rect = $self.data('lasso'),
                                    $rect = $(rect.node),
                                    x = e.offsetX,
                                    y = e.offsetY,
                                    ox = $rect.attr('ox'),
                                    oy = $rect.attr('oy'),
                                    width = Math.abs(ox - x),
                                    height = Math.abs(oy - y);
                                if (x < ox) {
                                    rect.attr('x', x);
                                }
                                if (y < oy) {
                                    rect.attr('y', y);
                                }
                                rect.attr({width: width, height: height});
                                //status=move:表示正在绘制lasso
                                $self.data('status', 'move');
                            }
                        });
                        return false;
                    });
                }
                return false;
            }).bind('mouseup.lasso', function (e) {
                var $thiz = $(this),
                    $wrap = $thiz.parent();
                //解绑mousemove事件
                $thiz.unbind('mousemove.lasso').parent().trigger('focus');
                if ($thiz.hasClass(ENUM_CLASSES.LASSO_RECT_ACTIVE)) {
                    var rect = $thiz.data('lasso'),
                        box = rect.getBBox();
                    //遍历查找出与lasso相交的节点
                    $.each(util.getSVGNodes(), function (k, item) {
                        if (util.intersectAlgorithm(item.getBBox(), box)) {
                            $wrap.find(Raphael.format('{0}[data-id="{1}"]', ENUM_CLASSES_DOT.NODE_ITEM, k)).addClass(ENUM_CLASSES.NODE_ITEM_SELECTED);
                        }
                    });
                    //清除lasso
                    rect.remove();
                    //为节点和<path>还原pointer-events
                    $wrap.find([ENUM_CLASSES_DOT.NODE_ITEM, 'path'].join(',')).each(function () {
                        $(this).css('pointer-events', '');
                    });
                    $thiz.removeClass(ENUM_CLASSES.LASSO_RECT_ACTIVE).removeData('lasso');
                }
            });
            return false;
        }
    };

    var EventEmitter = function () {
        this._events = {};
    };
    EventEmitter.prototype = {
        bind: function (name, listener) {
            if ($.isFunction(listener)) {
                var listeners = this._events[name] || [];
                listeners.push(listener);
                this._events[name] = listeners;
            }
        },
        remove: function (name, listener) {
            if ($.isFunction(listener)) {
                var listeners = this._events[name] || [];
                var pos = $.inArray(listener, listeners);
                pos !== -1 && listeners.splice(pos, 1);
                this._events[name] = listeners;
            } else {
                this._events[name] = [];
            }
        },
        trigger: function (name) {
            var listeners = this._events[name] || [];
            if (listeners.length) {
                var args = Array.prototype.slice.call(arguments, 1);
                $.each(listeners, function (i, listener) {
                    listener.apply(null, args);
                });
            }
        }
    };

    var DEFAULTS = {
        ns: 'm-ns',//命名空间
        width: 1000,//画布尺寸
        height: 800,
        dragToAppend: false, //在两个节点中间添加一个新节点
        line: {//节点之间的连线（hover样式请通过CSS指定）
            'stroke-width': 4,
            stroke: '#4848fe'
        },
        grid: {//网格背景
            show: true,
            'stroke-width': 1,
            stroke: '#eee',
            step: 20 //步长
        },
        /**
         * 节点模板 （需要支持underscore.template语法）
         * 形如：[
         * {
         *  id:'',//标识
         *  type:'',//节点类型
         *  text:'',//节点文本
         *  html:'',//节点html代码
         *  events: {//自定义事件，支持所有jquery事件
         *      click:null,
         *      dbclick:null
         *  },
         *  rules: {
         *      maxInput: null, //表示当前节点作为终端节点最大允许的连线数 （null或者undefined表示不限制）
         *      maxOutput: null //表示当前节点作为起始节点最大允许的连线数 （null或者undefined表示不限制）
         *  }
         * }
         * ]
         * @Required
         */
        nodeTpl: [],
        /**
         * 数据
         * 形如：{
         *  nodes: [{id:'nodeID', text:'', type:'', x:'', y:'', prev:null, next:null}], //节点信息
         *  relations: [{id:'rID', from:'', to: ''}], //节点关系
         *  properties: {'nodeID': {cust_attr:''}, 'nodeID': {cust_attr:''}} //节点业务属性
         * }
         */
        data: {},
        events: {//自定义事件
            addNode: null,//节点新增事件
            deleteNode: null,//节点删除事件
            addRelation: null,//连线新增事件
            deleteRelation: null//连线删除事件
        },
        onComplete: null//插件初始化完成后的回调函数
    };

    var NodeFlow = function ($wrap) {
        this.dom = $wrap;
    };
    NodeFlow.prototype = {
        bind: function (name, handler) {
            return this.dom.node_flow('bind', name, handler);
        },
        getNextNodes: function ($node) {
            return this.dom.node_flow('getNextNodes', $node);
        },
        getPreviousNodes: function ($node) {
            return this.dom.node_flow('getPreviousNodes', $node);
        },
        getRaphaelElement: function ($node) {
            return this.dom.node_flow('getRaphaelElement', $node);
        },
        option: function (name, value) {
            return this.dom.node_flow('option', name, value);
        },
        serializeJSON: function () {
            return this.dom.node_flow('serializeJSON');
        },
        destroy: function () {
            return this.dom.node_flow('destroy');
        }
    };

    var methods = {
        /**
         * 初始化
         * @param option {object}
         * @param cb {function}
         * @returns {NodeFlow}
         */
        init: function (option, cb) {
            var promise = $.Deferred();
            $.when(function ($wrap, option, dtd) {//初始化
                    setTimeout(function(){
                        //生成dom结构
                        $wrap.empty();
                        ui.genSkeleton($wrap);
                        option = $.extend(true, {}, DEFAULTS, option);
                        var raphael = Raphael('m_canvas', option.width, option.height);
                        var cache = {raphael: raphael, option: option};
                        cache = $.extend(true, util.getCacheTemplate(), cache);
                        $wrap.data(TAG, option.ns).data(option.ns, cache);
                        dtd.resolve($wrap);
                    }, 1);
                    return dtd;
                }($(this), option, promise))
                .done(function ($wrap) {
                    //注册自定义属性
                    util.registerAttribute('id', function (id) {//增加ID属性
                        var $node = $(this.node);
                        $node.attr('id', id);
                        return {};
                    });
                    util.registerAttribute('prev', function (id) {//表示有哪些节点指向当前节点
                        return {};
                    });
                    util.registerAttribute('prevNumber', function (param) {//表示有多少节点指向当前节点
                        var $node = $(this.node);
                        $node.attr('prevNumber', param);
                        return {};
                    });
                    util.registerAttribute('next', function (id) {//表示有当前节点指向哪些节点
                        return {};
                    });
                    util.registerAttribute('nextNumber', function (param) {//表示有当前节点指向了多少节点
                        var $node = $(this.node);
                        $node.attr('nextNumber', param);
                        return {};
                    });
                    util.registerAttribute('type', function (type) {//表示节点类型
                        return {};
                    });
                    util.registerAttribute('shape-rendering', function (val) {
                        var $node = $(this.node);
                        $node.attr('shape-rendering', val);
                        return {};
                    });
                })
                .done(function ($wrap) {
                    //绘制网格
                    ui.drawGrid($wrap);
                    //渲染toolbar
                    ui.genToolbar($wrap);
                })
                .done(function ($wrap) {
                    //创建EventEmitter
                    var eventEmitter = new EventEmitter(),
                        events = util.getOption().events;
                    eventEmitter.bind('addNode', events.addNode);
                    eventEmitter.bind('deleteNode', events.deleteNode);
                    eventEmitter.bind('addRelation', events.addRelation);
                    eventEmitter.bind('deleteRelation', events.deleteRelation);
                    eventEmitter.bind('error', function (msg, method) {
                        console.error(msg, method);
                    });
                    util.getStorage().eventEmitter = eventEmitter;
                })
                .done(function ($wrap) {
                    //创建节点
                    var option = util.getOption(),
                        nodeTpl = util.getNodeTpl(),
                        relations = util.getRelations(),
                        svgNodes = util.getSVGNodes(),
                        data = option.data || {};
                    $.each(data.nodes || [], function (i, node) {
                        var temp = {};
                        $.each(nodeTpl, function (j, tpl) {
                            if (tpl.type == node.type) {
                                temp = {events: tpl.events, html: tpl.html, rules: tpl.rules};
                                return false;
                            }
                        });
                        ui.createNode($wrap, $.extend({}, node, temp));
                    });
                    //创建连线
                    $.each(data.relations || [], function (i, relation) {
                        var from = svgNodes[relation.from],
                            to = svgNodes[relation.to];
                        if (from && to && !util.hasRelation(from, to)) {
                            var path = ui.drawLine(from, to, undefined, relation.id);
                            path && (relations[relation.id] = path);
                        }
                    });
                    //创建套索
                    ui.drawLasso();
                })
                .done(function ($wrap) {
                    var $canvas = $(ENUM_CLASSES_DOT.CANVAS);
                    //绑定连线click事件
                    $canvas.on('click', ENUM_CLASSES_DOT.LINE_ITEM, function () {
                        util.doSelectNode($(this));
                    });
                    //为SVG绑定click事件
                    $canvas.on('click', 'svg', function (e) {
                        if (!$(e.target).hasClass(ENUM_CLASSES.LINE_ITEM) && $(this).data('status') !== 'move') {
                            util.doSelectNode();
                            $(this).removeData('status');
                        }
                    });
                    //为画布绑定键盘事件
                    $canvas.attr('tabindex', -1).bind('keyup', function (e) {//实现删除
                        if (e.keyCode === 46) {
                            var $selected = $(this).find(Raphael.format('path{0}', ENUM_CLASSES_DOT.NODE_ITEM_SELECTED));
                            if ($selected.length) {
                                ui.deleteGraph($selected, ENUM_NODE_TYPE.line);
                            } else if ($(this).find(Raphael.format('{0}{1}', ENUM_CLASSES_DOT.NODE_ITEM, ENUM_CLASSES_DOT.NODE_ITEM_SELECTED)).length) {
                                $selected = $(this).find(Raphael.format('{0}{1}', ENUM_CLASSES_DOT.NODE_ITEM, ENUM_CLASSES_DOT.NODE_ITEM_SELECTED));
                                $selected.each(function () {
                                    ui.deleteGraph($(this), ENUM_NODE_TYPE.node);
                                });
                            } else {
                                //Do nothing
                            }
                        }
                        return false;
                    }).bind('keydown', function (e) {//键盘方向键 - 移动节点位置 - 步长：1
                        if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
                            var step = 1;
                            var $selected = $(this).find(Raphael.format('{0}{1}', ENUM_CLASSES_DOT.NODE_ITEM, ENUM_CLASSES_DOT.NODE_ITEM_SELECTED));
                            //预先检查是否满足move条件
                            var preCheckMove = function ($selected, keyCode) {
                                var flag = true;
                                $selected.each(function () {
                                    var $thiz = $(this),
                                        pos = $thiz.position(),
                                        $offsetParent = $thiz.offsetParent(),
                                        width = $thiz.outerWidth(),//实时获取宽高
                                        height = $thiz.outerHeight(),
                                        pWidth = $offsetParent.outerWidth(),
                                        pHeight = $offsetParent.outerHeight();
                                    switch (keyCode) {
                                        case 37: {//left
                                            pos.left -= step;
                                            if (pos.left < 0) {
                                                flag = false;
                                                return false;
                                            }
                                            break;
                                        }
                                        case 38: {//top
                                            pos.top -= step;
                                            if (pos.top < 0) {
                                                flag = false;
                                                return false;
                                            }
                                            break;
                                        }
                                        case 39: {//right
                                            pos.left += step;
                                            if ((pos.left + width) > pWidth) {
                                                flag = false;
                                                return false;
                                            }
                                            break;
                                        }
                                        case 40: {//bottom
                                            pos.top += step;
                                            if ((pos.top + height) > pHeight) {
                                                flag = false;
                                                return false;
                                            }
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                });
                                return flag;
                            };
                            var processMove = function ($thiz, keyCode, step) {
                                requestAnimationFrame(function () {
                                    var pos = $thiz.position(),
                                        $offsetParent = $thiz.offsetParent(),
                                        width = $thiz.outerWidth(),//实时获取宽高
                                        height = $thiz.outerHeight(),
                                        pWidth = $offsetParent.outerWidth(),
                                        pHeight = $offsetParent.outerHeight();
                                    switch (keyCode) {
                                        case 37: {//left
                                            pos.left -= step;
                                            if (pos.left >= 0) {
                                                $thiz.css('left', pos.left);
                                                util.moveHandler4NodeItem($thiz);
                                            }
                                            break;
                                        }
                                        case 38: {//top
                                            pos.top -= step;
                                            if (pos.top >= 0) {
                                                $thiz.css('top', pos.top);
                                                util.moveHandler4NodeItem($thiz);
                                            }
                                            break;
                                        }
                                        case 39: {//right
                                            pos.left += step;
                                            if ((pos.left + width) <= pWidth) {
                                                $thiz.css('left', pos.left);
                                                util.moveHandler4NodeItem($thiz);
                                            }
                                            break;
                                        }
                                        case 40: {//bottom
                                            pos.top += step;
                                            if ((pos.top + height) <= pHeight) {
                                                $thiz.css('top', pos.top);
                                                util.moveHandler4NodeItem($thiz);
                                            }
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                })
                            };
                            if ($selected.length === 1) {//控制单个节点移动
                                processMove($selected, e.keyCode, step);
                            } else if ($selected.length > 1 && preCheckMove($selected, e.keyCode)) {//控制多个节点移动
                                $selected.each(function () {
                                    processMove($(this), e.keyCode, step);
                                });
                            } else {
                                //Do nothing
                            }
                        }
                        return false;
                    });
                })
                .done(function ($wrap) {
                    var option = util.getOption();
                    $wrap.find(ENUM_CLASSES_DOT.CANVAS).css({width: option.width, height: option.height});
                    $.isFunction(option.onComplete) && option.onComplete($wrap);
                    $.isFunction(cb) && cb($wrap);
                });
            return new NodeFlow(this);
        },
        /**
         * 获取指向当前节点的所有节点实例
         * @param $node {jQuery} 当前节点对象
         * @returns [{Raphael.Element}]
         */
        getPreviousNodes: function ($node) {
            var node = [],
                currNode = methods.getRaphaelElement.call(this, $node),
                prevNumber = currNode.attr('prevNumber');
            if (prevNumber) {
                var SPLITER = '_$$_',
                    svgNodes = util.getSVGNodes(),
                    prev = currNode.attr('prev'),
                    prevArr = prev ? prev.split(SPLITER) : [];
                $.each(prevArr, function (i, id) {
                    !!id && node.push(svgNodes[id]);
                });
            }
            return node;
        },
        /**
         * 获取当前节点所指向的所有节点实例
         * @param $node {jQuery} 当前节点对象
         * @returns [{Raphael.Element}]
         */
        getNextNodes: function ($node) {
            var node = [],
                currNode = methods.getRaphaelElement.call(this, $node),
                count = currNode.attr('nextNumber');
            if (count) {
                var SPLITER = '_$$_',
                    svgNodes = util.getSVGNodes(),
                    next = currNode.attr('next'),
                    nextArr = next ? next.split(SPLITER) : [];
                $.each(nextArr, function (i, id) {
                    !!id && node.push(svgNodes[id]);
                });
            }
            return node;
        },
        /**
         * 获取Raphael.Element实例
         * @param $node {jQuery} 节点对象
         * @returns {Raphael.Element}
         */
        getRaphaelElement: function ($node) {
            return util.getRaphaelElementByNode($node);
        },
        /**
         * 更新option状态
         * @param name
         * @param value
         * @returns {jQuery}
         */
        option: function (name, value) {
            var option = util.getOption(this),
                keyArr = name.split('\.'),
                field = name,
                attr = null;
            if (keyArr.length > 1) {
                field = keyArr[0];
                attr = keyArr[1];
            }
            switch (field) {
                case 'grid':
                {
                    if (typeof value !== 'undefined') {
                        attr && (option.grid[attr] = value);
                        !attr && (option.grid = value);
                        ui.drawGrid(this);
                    } else {
                        return !attr ? option.grid : option.grid[attr];
                    }
                    break;
                }
                case 'data':
                {
                    if (typeof value !== 'undefined' && attr === 'properties') {
                        $.extend(true, option.data.properties, value);
                    } else {
                        return !attr ? option.data : option.data[attr];
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
            return this;
        },
        /**
         * 序列化当前流程图状态
         * @returns {{nodes: Array, relations: Array}}
         */
        serializeJSON: function () {
            var svgNodes = util.getSVGNodes(this),
                relations = util.getRelations(this),
                res = {nodes: [], relations: []},
                nodes = [],
                relationArr = [];
            //组装nodes
            $.each(svgNodes, function (i, elem) {
                var id = elem.attr('id'),
                    $dom = $(Raphael.format('{0}[data-id="{1}"]', ENUM_CLASSES_DOT.NODE_ITEM, id));
                nodes.push({
                    id: id,
                    text: util.xssCheck($dom.data('text')),
                    type: $dom.data('type'),
                    x: elem.attr('x'),
                    y: elem.attr('y'),
                    prev: elem.attr('prev'),
                    next: elem.attr('next'),
                    properties: $dom.data('properties')
                });
            });
            //组装relations
            $.each(relations, function (i, elem) {
                var line = elem.line,
                    id = line.attr('id'),
                    from = elem.from.attr('id'),
                    to = elem.to.attr('id');
                relationArr.push({
                    id: id,
                    from: from,
                    to: to,
                });
            });
            res.nodes = nodes;
            res.relations = relationArr;
            return res;
        },
        /**
         * 销毁
         * @returns {jQuery}
         */
        destroy: function () {
            var tag = $(this).data(TAG);
            $(this).removeData(tag).empty().removeClass(ENUM_CLASSES.CANVAS_WRAPPER);
            return this;
        },
        /**
         * 绑定事件，包括：addNode|deleteNode|addRelation|deleteRelation
         */
        bind: function () {
            var emitter = util.getStorage().eventEmitter;
            emitter.bind.apply(emitter, arguments);
            return this;
        }
    };
    $.fn.node_flow = function (method, option) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ($.isPlainObject(method)) {
            return methods['init'].apply(this, arguments);
        } else {
            throw new Error('Method[' + (method) + '] is not supported!');
        }
    };
})(jQuery, Raphael);