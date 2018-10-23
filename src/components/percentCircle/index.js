import React,{Component} from 'react'
import DefaultConfig from './config'
import * as d3 from 'd3'
var defs = require('./percentCircle.html')
export default class PercentCircle extends Component{
    state = {
        radius :0
    }
    getCircleArc = ()=>{ //生成的圆环
        const {radius} = this.state
        const {width,height} = this.props.config
        let circle = d3.scaleLinear().range([0,2*Math.PI]).domain([0,1])
        let radii = d3.scaleLinear().range([0,radius]).domain([0,radius])
        let circleThickness = DefaultConfig.circleThickness * radius
        this.state.radius = radius
        return d3.arc()
            .startAngle(circle(0))
            .endAngle(circle(1))
            .outerRadius(radii(radius))
            .innerRadius(radii(radius-circleThickness))
    }
    init = ()=>{
        const {id,idname,width,height} = this.props.config
        let radius = Math.min(parseInt(width), parseInt(height))/2;
        this.state.radius = radius
        let textRiseScaleY = d3.scaleLinear()
            .range([radius*0.5,radius*0.8])
            .domain([0,1]);
        let node = d3.select(document.getElementById(id)) //找到当前的节点id
        node.append('defs').html(defs)
        let g = node.append('g')
        g.append('path').attr('d',this.getCircleArc())
        .style("fill", "url(#borderColor"+idname+")")
        .attr('transform','translate('+radius+','+radius+')');   //到这里  画一个环状图形
        g.append('text').text("50%")
        .attr("text-anchor", "middle")
        .attr("font-size", radius/2 + "px")
        .style("fill", DefaultConfig.textColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(DefaultConfig.textVertPosition)+')')
        .transition()
        .duration(1000).on('start', function(){
            d3.active(this).tween('text', () => {   //d3.active(node[, name]) 返回指定节点上名为name的活动的过渡
                let that = d3.select(this);  
                return function(p) {
                    that.text(parseInt(p *50)+'%');
                };
            });
        });
        g.append("text").html(function(){
            let y=textRiseScaleY(DefaultConfig.textVertPosition);
            let html = '';
            html += '<tspan'+' x='+radius+' y='+(y+55)+' style="text-decoration:overline"'+'>' +'test'+ '</tspan>';
            return html;
        })
        .attr('text-anchor','middle')
        .attr("font-size", radius*1/3 + "px")
        .style("fill", DefaultConfig.textColor);
        this.clipArea(g)
    }
    clipArea = (g)=>{
        const {idname} = this.props.config
        const {radius} = this.state
        let waveHeightScale = d3.scaleLinear()
            .range([0,DefaultConfig.waveHeight,0])   // [0,0.1,0]
            .domain([0,50,100])
        let waveHeight = 0.9*radius*waveHeightScale(50);
        //设置裁剪的样式
        let waveScaleX = d3.scaleLinear().range([0,3.6*radius]).domain([0,1]);
        let waveScaleY = d3.scaleLinear().range([0,0.1*radius]).domain([0,1]);
        let waveAnimateScale = d3.scaleLinear()
            .range([0, 1.8*radius]) //  1.8半径
            .domain([0,1]);  
        let data = [];
        for(let i = 0; i <= 80; i++){
            data.push({x: i/80, y: (i/(40))});
        }
        let waveRiseScale = d3.scaleLinear()
            .range([2*radius,0.01*radius])  //趋近2.0半径 ，趋近0.01
            .domain([0,1]);
        let clipA = d3.area()
            .x ((d) => { return waveScaleX(d.x); } )
            .y1((d) =>{ return waveScaleY(Math.sin(Math.PI*2*(DefaultConfig.waveOffset)*-1 + Math.PI*2*(1-DefaultConfig.waveCount) + d.y*2*Math.PI));} )
            .y0((d) => { return (2.8*radius + waveHeight); } );
        let wave = g.append("defs")  //clipPath 形成遮盖效果 ,对遮盖范围附上颜色，使其移动，可表现出水波效果
            .append("clipPath")
            .attr("id", "clipWave" + idname);
        wave.append("path")
            .datum(data)
            .attr("d", clipA)
            .transition()
            .ease(d3.easeLinear)  //设置或获取easing function(过渡方式)，默认为d3.easeCubic.缓冲函数。缓冲函数可让动画效果更自然，比如elastic缓冲函数可用以模拟弹性物体的运动。是一种插值函数的特例
            .duration(1200000)
            .on('start', function(){
                d3.active(this).tween('text', () => {
                    let that = d3.select(this);
                    return (p) => {
                        let tmp = p * 600000;
                        let t = (tmp % 2000)*100/2000;
                        that.attr('transform','translate(' +waveAnimateScale(t/100) +',0)');
                    };
                });
            });
        wave.attr('transform','translate('+(-1.7*radius)+','+waveRiseScale(0)+')')
            .transition()
            .duration(DefaultConfig.waveRiseTime)
            .attr('transform','translate('+(-1.7*radius)+','+waveRiseScale(0.5)+')')

        //填充一个圆 ,并进行裁剪clip-path
        let fillCircle = g.append("g")
            .attr("clip-path", "url(#clipWave" + idname + ")");
            fillCircle.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", 0.9*radius)
            .style("fill", "url(#circleColor"+idname+")");
    }
    componentDidMount(){
        this.init()
    }
    render(){
        return(
            <svg {...this.props.config}></svg>
        )
    }
}