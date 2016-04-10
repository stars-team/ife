/**
 * Created by xjweng on 2016/4/7 0007.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "",
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    console.log("renderChart start");
    var gram_wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
    //先擦除记录
    var childs = gram_wrap.childNodes;
    for(var j = childs.length-1; j >= 0; j--){
        gram_wrap.removeChild(childs.item(j));
    }
    //正常渲染
    for(var data in chartData){
        var data_box = document.createElement("div");
        data_box.setAttribute("class",'box ' + pageState["nowGraTime"]);
        var data_gram = document.createElement("div");
        data_gram.setAttribute("class","data_gram");
        data_gram.style.height = chartData[data] + "px" ;
        /*console.log(data_gram.style.height);*/
        data_gram.style.backgroundColor = getRandomColor();
        data_gram.setAttribute("title", data + ":" +chartData[data]);
        data_box.appendChild(data_gram);
        gram_wrap.appendChild(data_box);
    };

}
/**
 * 生成随机颜色
 */
function getRandomColor() {
    return  '#' +
        (function(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length == 6) ?  color : arguments.callee(color);
        })('');
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var typeNow = getTimeNow();
    console.log(typeNow);
    if(typeNow === pageState['nowGraTime']){
        return;
    }else {
    // 设置对应数据
        initAqiChartData();
    // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 获取当前时间类型
 */
function getTimeNow() {
    var types = document.getElementsByName("gra-time");
    var typeNow = "";
    //[].forEach.call()大法
    /*[].forEach.call(types,function (v) {
        //判断选中大法
        console.log(v.checked);
        if(v.checked == checked)
            typeNow = v.value;
    });*/
    console.log(types);
    for (var v = 0; v < types.length; v++){
        console.log(types[v].type);
        if (types[v].checked)
            typeNow = types[v].value;
    }
    console.log(typeNow);
    return typeNow;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var cityNow = document.getElementById("city-select").value;
    if(cityNow == pageState['nowSelectCity']){
        return;
    }else {
    // 设置对应数据
        initAqiChartData();
    // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var types = document.getElementsByName("gra-time");
    [].forEach.call(types,function(value) {
        value.addEventListener("click",graTimeChange);
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById("city-select");
    for(var city in aqiSourceData){
        var opt = document.createElement("option");
        opt.setAttribute("value",city);
        opt.innerHTML = city;
        select.appendChild(opt);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("click",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var type = getTimeNow();
    var city = document.getElementById("city-select").value;
    pageState['nowGraTime'] = type;
    pageState['nowSelectCity'] = city;
    // 处理好的数据存到 chartData 中

    switch (type){
        case "day":
            chartData = aqiSourceData[city];
            console.log("chartData length: " + chartData.length);
            break;
        case "week":
            chartData = {};
            var count = 0,total =0,week = 1,date,weekDay;
            for (var v in aqiSourceData[city]){
                date = new Date(v);
                weekDay = date.getDay();
                if(weekDay == 6){
                    count++;
                    total += aqiSourceData[city][v];
                    chartData["week"+week] = Math.round(total/count);
                    count = 0;
                    total = 0;
                    week++;
                }else {
                    count++;
                    total += aqiSourceData[city][v];
                }
            }
            //最后一波漏网
            chartData["week"+week] = Math.round(total/count);
            break;
        case "month":
            chartData = {};
            var count = 0, total = 0, month =-1,date;
            for (var v in aqiSourceData[city]){
                date = new  Date(v);
                if (month == -1){
                    month = date.getMonth() + 1;
                }else if (date.getMonth() + 1 != month){
                    chartData[month + "m"] = Math.round(total/count);
                    month = date.getMonth() + 1;
                    total = 0;
                    count = 0;
                }
                count++;
                total += aqiSourceData[city][v];
            }
            //最后一波漏网
            chartData[month + "m"] = Math.round(total/count);
            break;
        /*default:
            console.log("nowGraTime type:" + type +" error!");*/
    }
    //charData转成JSON格式
    console.log(JSON.stringify(chartData));
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();