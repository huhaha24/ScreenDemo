import React,{Component} from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import chinaInfo from '@config/mapInfo'
import { connect } from 'react-redux'
import {changeMap} from '../../redux/actions/RootAction'
import Ajax from './../../axios'
import Config from '@utils/mapUtils/__Config'
import VersionData from '@version/Config'
import MapBuilder from '@utils/mapUtils/__MapBuilder'
import Tip from '@utils/mapUtils/__Tip'
import './index.less'

var defs = require('@utils/mapUtils/style.html');
class ChinaMap extends Component{   
    getMapJson = (name)=>{
        try{
            let jsonMap = require('@config/map/'+name)[name];
            let id = 'v-'+this.props.mapName
            if(name == 'china'){//如果是中国地图的话就放大1.5倍，省份地图的话就放大1倍
                Config.GLOBAL_SCALE = VersionData.mapScale
            }else{
                Config.GLOBAL_SCALE = VersionData.provinceScale
            }
            if(document.getElementsByClassName('v-group-background')[0]){
                document.getElementById(id).removeChild(document.getElementsByClassName('v-group-background')[0])
                document.getElementById(id).removeChild(document.getElementsByClassName('v-group')[0])
            }
            this.initMap(jsonMap, this.mapRef,name)
            if('china'== name){
                Ajax.ajax({'url':'color'}).then(data =>{
                    this.setColors(data.array)
                })
                Ajax.ajax({ 'url': 'test' }).then(data => {
                    Config.GLOBAL_TIPS = data.array
                })
            }else{
                Tip.hideTooltip()
            }
        }catch(e){
            console.log("出现异常")
        }
    }
    initMap = (json, element,name)=>{
        //根元素，容器元素，根元素宽高，高度比例，容器元素高度 
        let ROOT, Container, WIDTH, HEIGHT, PHEIGHT, THEIGHT;
        //自定义配置
        [ROOT, WIDTH, HEIGHT] = [element, element.parentElement.clientWidth, element.parentElement.clientHeight];
        PHEIGHT = Math.cos(Math.PI * 2 * Config.RotateX / 360);
        THEIGHT = HEIGHT / PHEIGHT;
        Config.GLOBAL_BUILDER = new MapBuilder(json, element.parentElement);
        Config.GLOBAL_SVG = d3.select(element)
            .attr('width', WIDTH)
            .attr('height', THEIGHT)
            .attr('class','v-map')
            .attr('id','v-'+name)
        Config.GLOBAL_SVG.append('defs').html(defs);
        this.initData(json,WIDTH,THEIGHT,name);
    }
    initData = (json,WIDTH,THEIGHT,name)=>{
        let self = this
        let center = Config.GLOBAL_BUILDER.getCenter()
        let scale = Config.GLOBAL_BUILDER.getFullScale()
        let number = Config.GLOBAL_SCALE//设置地图的放大尺寸

        if (Config.Shadow) {
                let projectionBkg = d3.geoMercator()
                    .center(center)
                    .scale(scale * number)
                    //.translate([WIDTH / 2 + Config.Shadow.Left, THEIGHT / 2 + Config.Shadow.Top])
                    .translate([WIDTH / 2, THEIGHT / 2 ])
                let pathBkg = d3.geoPath().projection(projectionBkg)
                Config.GLOBAL_SVG.append('g')
                    .attr('class', 'v-group-background')
                    .attr('id', 'v-group-background')
                    .selectAll('path.v-item-background')
                    .data(json.features)
                    .enter()
                    .append('path')
                    .attr('class', 'v-item-background')
                    .attr('d', pathBkg);
            }
            let groupArea = Config.GLOBAL_SVG.append('g').attr('class', 'v-group')
            Config.GLOBAL_PROJECTION = d3.geoMercator()
                .center(center)
                .scale(scale * number)
                //.translate([WIDTH / 2+ Config.Shadow.Left, THEIGHT / 2+ Config.Shadow.Top])
                .translate([WIDTH / 2, THEIGHT / 2 ])
            let path = d3.geoPath().projection(Config.GLOBAL_PROJECTION)
            let shapes = groupArea.selectAll('g.v-item')
                .data(json.features)
                .enter()
                .append('g')
                .attr('id', d => '_area_' + (d.properties.adcode || d.properties.id || d.properties.name))
                .attr('class', 'v-item');

            shapes.append('path')
                .attr('class', 'v-area')
                .attr('d', path);  //运行到这里地图生成
            shapes.append('text')
                .attr('class', 'v-label')
                .attr('x', d => Config.GLOBAL_PROJECTION(Config.GLOBAL_BUILDER.getPoint(d.properties.name))[0])
                .attr('y', d => Config.GLOBAL_PROJECTION(Config.GLOBAL_BUILDER.getPoint(d.properties.name))[1] + 10)
                .text(d => d.properties.name)
            if ('china' == name) {
                shapes.on('mouseenter', function (d) {
                    d3.select(this).style('cursor', 'hand')
                    let value;
                    Config.GLOBAL_TIPS.map(item => {
                        if (item.areaName == d.properties.name) {
                            return value = item.value
                        }
                    })
                    Tip.showTooltip(`
                        <span class="v-tip-title">${d.properties.name}</span>
                        <span>test</span> : <span class="vapfont">${value}</span>
                    `)
                })
                shapes.on('mouseleave', function (d) {
                    Tip.hideTooltip()
                })
                shapes
                    .on('click', function (d) {
                        shapes.classed('v-item-selected', false);
                        d3.select(this).classed('v-item-selected', true);
                        if (d.properties.code) {
                            self.shapesClickHandle(d)
                        }
                    });
            }
    }
    //点击事件
    shapesClickHandle(d){
        const {dispatch} = this.props
        dispatch(changeMap(d.properties.code))
    }
    setColors = (arr) =>{
        Config.GLOBAL_SVG.selectAll('path.v-area')
            .classed('v-area-l1',false)
            .classed('v-area-l2',false)
            .classed('v-area-l3',false)
            .classed('v-area-l4',false)
            .classed('v-area-l5',false);
        if(arr.length<=0){
            return;
        }
        let min = _.minBy(arr,(o)=>(o.value)).value   
        let max = _.maxBy(arr,(o)=>(o.value)).value
        let scale = d3.scaleQuantile().domain([min,max]).range([1,2,3,4,5])
        arr.map(function (item) {
            let id = Config.GLOBAL_BUILDER.getId(item.areaName)
            if(id){
                Config.GLOBAL_SVG.select('#_area_' + id + ' .v-area').classed('v-area-l' +scale(item.value),true)
            }
        });
    }
    componentDidMount(){
        this.getMapJson(this.props.mapName)
        
    }
    componentWillUpdate({mapName}){
        this.getMapJson(mapName)
    }
    render(){
        return(
            <div className = 'map'>
                <svg ref={(r) => this.mapRef = r}></svg>
            </div>
        )
    }
}
export default connect()(ChinaMap)