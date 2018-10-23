import Mock from 'mockjs'
const baseURL = "http://localhost:8888/"
const Random = Mock.Random
export const mapColor = Mock.mock(baseURL+'color',{
    'array':[
        {'areaName':'西藏','value|1-10':5},
        {'areaName':'青海','value|1-10':5},
        {'areaName':'湖北','value|1-10':5},
        {'areaName':'湖南','value|1-10':5},
        {'areaName':'黑龙江','value|1-10':5},
        {'areaName':'四川','value|1-10':5},
        {'areaName':'江苏','value|1-10':5},
        {'areaName':'上海','value|1-10':5},
        {'areaName':'浙江','value|1-10':5},
        {'areaName':'福建','value|1-10':5},
        {'areaName':'广西','value|1-10':5},
        {'areaName':'广东','value|1-10':5},
        {'areaName':'云南','value|1-10':5},
        {'areaName':'贵州','value|1-10':5},
        {'areaName':'宁夏','value|1-10':5},        
    ]
})
export const test = Mock.mock(baseURL+'test',{
    'array':[
        { 'areaName': '安徽', 'value|1-10': 2 },
        { 'areaName': '北京', 'value|1-10': 2 },
        { 'areaName': '重庆', 'value|1-10': 2 },
        { 'areaName': '福建', 'value|1-10': 2 },
        { 'areaName': '甘肃', 'value|1-10': 2 },
        { 'areaName': '广东', 'value|1-10': 2 },
        { 'areaName': '广西', 'value|1-10': 2 },
        { 'areaName': '贵州', 'value|1-10': 2 },
        { 'areaName': '海南', 'value|1-10': 2 },
        { 'areaName': '河北', 'value|1-10': 2 },
        { 'areaName': '黑龙江', 'value|1-10': 2 },
        { 'areaName': '河南', 'value|1-10': 2 },
        { 'areaName': '香港', 'value|1-10': 2 },
        { 'areaName': '湖北', 'value|1-10': 2 },
        { 'areaName': '湖南', 'value|1-10': 2 },
        { 'areaName': '江苏', 'value|1-10': 2 },
        { 'areaName': '江西', 'value|1-10': 2 },
        { 'areaName': '吉林', 'value|1-10': 2 },
        { 'areaName': '辽宁', 'value|1-10': 2 },
        { 'areaName': '澳门', 'value|1-10': 2 },
        { 'areaName': '内蒙古', 'value|1-10': 2 },
        { 'areaName': '宁夏', 'value|1-10': 2 },
        { 'areaName': '青海', 'value|1-10': 2 },
        { 'areaName': '山西', 'value|1-10': 2 },
        { 'areaName': '陕西', 'value|1-10': 2 },
        { 'areaName': '山东', 'value|1-10': 2 },
        { 'areaName': '上海', 'value|1-10': 2 },
        { 'areaName': '四川', 'value|1-10': 2 },
        { 'areaName': '台湾', 'value|1-10': 2 },
        { 'areaName': '天津', 'value|1-10': 2 },
        { 'areaName': '新疆', 'value|1-10': 2 },
        { 'areaName': '西藏', 'value|1-10': 2 },
        { 'areaName': '云南', 'value|1-10': 2 },
        { 'areaName': '浙江', 'value|1-10': 2 },
    ]
})
export const table = Mock.mock(baseURL+'table',{
    'table|20':[{
        'No|+1':1,
        'name':Random.cname(),
        'department':'数据安全',
        'ip':Random.ip(),
        'time':'@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'depType':'打印'
    }]
})
export const chart = Mock.mock(baseURL + 'chart',{
    'array': [
        { "x": "湖北", "y": 28,},
        { "x": "湖南", "y": 46,},
        { "x": "山东", "y": 19,},
        { "x": "陕西", "y": 33,},
        { "x": "甘肃", "y": 17,},
        { "x": "浙江", "y": 45,},
        { "x": "四川", "y": 26,},
        { "x": "北京", "y": 41,},
        { "x": "上海", "y": 17,},
     ]
});