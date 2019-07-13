(function () {
    function getArrow(r, size, delta, x1, y1, x2, y2) {
        var angle = r.angle(x1, y1, x2, y2);//获得两点之间的角度
        var a45 = r.rad(angle - delta)//角度转换成弧度

        var a45m = r.rad(angle + delta);

        var x2a = Number(x2) + Math.cos(a45) * size;

        var y2a = Number(y2) + Math.sin(a45) * size;

        var x2b = Number(x2) + Math.cos(a45m) * size;

        var y2b = Number(y2) + Math.sin(a45m) * size;

        return [Number(x2a.toFixed(3)), Number(y2a.toFixed(3)), Number(x2b.toFixed(3)), Number(y2b.toFixed(3))];
    };

    Raphael.fn.connection = function (obj1, obj2, line, text) {

        if (obj1.line && obj1.from && obj1.to) {
            line = obj1;
            obj1 = line.from;
            obj2 = line.to;

            text = line.text;
        }

        var bb1 = obj1.getBBox(),
            bb2 = obj2.getBBox(),
            p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
                {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
                {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
                {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
                {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
                {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
                {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
                {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
            d = {}, dis = [];

        for (var i = 0; i < 4; i++) {
            for (var j = 4; j < 8; j++) {
                var dx = Math.abs(p[i].x - p[j].x),
                    dy = Math.abs(p[i].y - p[j].y);
                if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                    dis.push(dx + dy);
                    d[dis[dis.length - 1]] = [i, j];
                }
            }
        }

        if (dis.length == 0) {
            var res = [0, 4];
        } else {
            res = d[Math.min.apply(Math, dis)];
        }

        var x1 = p[res[0]].x,
            y1 = p[res[0]].y,
            x4 = p[res[1]].x,
            y4 = p[res[1]].y;
        dx = Math.max(Math.abs(x1 - x4) / 2, 30);
        dy = Math.max(Math.abs(y1 - y4) / 2, 30);
        var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
            y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
            x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
            y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);

        x1 = x1.toFixed(3);
        y1 = y1.toFixed(3);
        x4 = x4.toFixed(3);
        y4 = y4.toFixed(3);
        var arrow = getArrow(Raphael, 10, 20, x3, y3, x4, y4);

        //var path = ["M", x1, y1, "C", x2, y2, x3, y3, x4, y4, "L", arrow[0], arrow[1], "M", x4, y4, "L", arrow[2], arrow[3]].join(",");
        var cx = (arrow[0] + arrow[2]) / 2;
        var cy = (arrow[1] + arrow[3]) / 2;
        var path = ["M", x1, y1, "C", x2, y2, x3, y3, cx, cy, "M", x4, y4, "L", arrow[0], arrow[1], "L", arrow[2], arrow[3], "Z"].join(",");

        if (line && line.line) {
            line.line.attr({path: path});
            return line;
        } else {
            return {
                text: text,
                line: line && line.split && this.path(path).attr({
                    stroke: line.split("|")[0],
                    fill: "none",
                    "class": "m-canvas-line",
                    "stroke-width": line.split("|")[1] || 1,
                    "id": line.split("|")[2]
                }),
                from: obj1,
                to: obj2
            };
        }
    };

})();