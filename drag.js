window.onload = function () {
    let box = $("box");
    let wrap = $("wrap");

    //给绿色的div添加onmousedown事件
    box.onmousedown = function (ev) {

        let e = ev || window.event;

        //计算出鼠标按下的点到box的左侧边缘和上侧边缘
        let restLeft = e.clientX - wrap.offsetLeft - box.offsetLeft;
        let restTop = e.clientY - wrap.offsetTop - box.offsetTop;

        // 针对低版本IE的方法，setCapture方法在oBox元素和下面的元素中间添加了一个透明层
        if (box.setCapture) {
            box.setCapture();
        }

        //移动的时候计算left和top值，每次移动都会生效
        document.onmousemove = function (ev) {
            let e = ev || window.event;

            //计算出left值和top值
            let boxLeft = e.clientX - restLeft - wrap.offsetLeft;
            let boxTop = e.clientY - restTop - wrap.offsetTop;

            //限制范围
            let maxLeft = wrap.offsetWidth - box.offsetWidth;
            let maxTop = wrap.offsetHeight - box.offsetHeight;
            let minLeft = 0;
            let minTop = 0;

            if (boxLeft < minLeft) {
                boxLeft = minLeft;
            }
            if (boxLeft > maxLeft) {
                boxLeft = maxLeft;
            }
            if (boxTop < minTop) {
                boxTop = minTop;
            }
            if (boxTop > maxTop) {
                boxTop = maxTop;
            }

            //设置left，top值
            box.style.left = boxLeft + "px";
            box.style.top = boxTop + "px";
        };
        box.onmouseup = function () {
            //销毁onmousemove和onmouseup事件
            document.onmousemove = null;
            document.onmouseup = null;
            // 去掉透明层
            if (box.releaseCapture) {
                box.releaseCapture();
            }
        };
        //阻止浏览器默认行为
        return false;
    };


};
