/**
 * D3 图提示说明：
*/
//var THEME = require('../../comments/VapChart/ChartTheme').TOOLTIP;
import * as d3 from 'd3'
var tooltip = null, PID = null;
var WIDTH = window.innerWidth - 200;
var HEIGHT = window.innerHeight - 80;

window.addEventListener('resize', function () {
    WIDTH = window.innerWidth - 200;
    HEIGHT = window.innerHeight - 80;
});

if (d3.select('#__v_tip').size() == 1) {
    tooltip = d3.select('#__v_tip');
} else {
    tooltip = d3.select('body').append('div').attr('id', '#__v_tip');
}
tooltip.style('position', 'fixed')
.style("opacity", 0)
.style('padding', '5px')
.style('left', '0')
.style('top', '0')
.style('height', 'auto')
.style('width', 'auto')
.style('pointer-events', 'none')
.style('display', 'block')
.style('border', '1px solid rgb(40,125,204)')
.style('background', 'rgba(4,28,50,0.9)')
.style('color', '#287dcc');

const showTooltip = (html)=> {
    window.clearTimeout(PID);
    tooltip.html(html);
    tooltip.style('opacity', 1)
    //d3.event 获取当前被点击区域的事件对象  clientx 事件属性返回当事件被触发时鼠标指针向对于浏览器x轴的距离
    var left = (d3.event.clientX - 48) + 'px', right = 'auto', top = (d3.event.clientY + 16) + 'px', bottom = 'auto';
    if (d3.event.clientX > WIDTH) {
        left = 'auto';
        right = (WIDTH + 200 - d3.event.clientX + 20) + 'px';
    }
    if (d3.event.clientY > HEIGHT) {
        top = 'auto';
        bottom = (HEIGHT + 80 - d3.event.clientY + 20) + 'px';
    }
    tooltip.style('left', left)
        .style('top', top)
        .style('right', right)
        .style('bottom', bottom);
}
const showToolTipByCoord = (x,y,html)=>{
    window.clearTimeout(PID);
    tooltip.html(html);
    tooltip.style('opacity', 1)
    var left = (x - 48) + 'px', right = 'auto', top = (y + 16) + 'px', bottom = 'auto';
    if (x> WIDTH) {
        left = 'auto';
        right = (WIDTH + 200 - x + 20) + 'px';
    }
    if (y > HEIGHT) {
        top = 'auto';
        bottom = (HEIGHT + 80 - y + 20) + 'px';
    }
    tooltip.style('left', left)
        .style('top', top)
        .style('right', right)
        .style('bottom', bottom);

}
const hideTooltip = (delay)=> {
    delay = delay || 1000;
    window.clearTimeout(PID);
    PID = window.setTimeout(function () {
        tooltip.transition()
            .duration(1000)
            .style('opacity', 0);
    }, delay);
}
export default {showTooltip,hideTooltip}