/**
 * Created by xjweng on 2016/4/5 0005.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

//判断是否字母汉字组成
function isZhOrEn(s){
    var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    return re.test(s);
}

//删除左右两端的空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city_name = trim(document.getElementById("aqi-city-input").value);
    var org_value = trim(document.getElementById("aqi-value-input").value);
    if(city_name==="" || city_name===null || org_value==="" || org_value===null){
        alert("please enter something!");
        return;
    }else if(isZhOrEn(city_name) && parseInt(org_value)==org_value){
        aqiData[city_name] = org_value;
        console.log("input this");
    }else{
        alert("Error Typing!");
        return;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    //先擦除记录
    var table_show = document.getElementById("aqi-table");
    var childs = table_show.childNodes;
    for(var j = childs.length-1; j >= 0; j--){
        table_show.removeChild(childs.item(j));
    }
    //正常叠加
    var thead = document.createElement("tr");
    thead.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    table_show.appendChild(thead);
    for(var i in aqiData){
        var tbody = document.createElement("tr");
        tbody.innerHTML = "<td>" + i + "</td><td>" + aqiData[i] + "</td><td><button>删除</button></td>";
        table_show.appendChild(tbody);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    console.log("addBtnHandle start");
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(index) {
    // do sth.
    delete aqiData[index];
    console.log(index);
    //去掉数组里面空元素
    for(var fi in aqiData)
    {
        if(aqiData[fi] === "" || typeof(aqiData[fi]) === "undefined")
        {
            aqiData.splice(fi,1);
            fi= fi-1;
        }
    }

    console.log("delhandle end");
    //console.log(aqiData.length);
    renderAqiList();
}

/*     此法报废
 function foradd(){
 var add_btn = document.getElementById("add-btn");
 add_btn.onclick = function () {
 console.log("add_btn click");
 addBtnHandle();
 };
 }
 function fordel(){
 console.log("del_btn");
 var del_btn = document.getElementById("aqi-table").getElementsByTagName("button");
 console.log(del_btn.length);

 for(var jk = 0; jk < del_btn.length; jk++){
 console.log("del_btn action");
 del_btn[jk].onclick = function(){
 console.log("del_btn onclick");
 var mark = this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
 console.log(mark);
 delBtnHandle(mark);
 };
 }
 }
 */

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click",function(event){
        if(event.target.nodeName.toLowerCase() == "button"){
            console.log("event:" + event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML);
            delBtnHandle.call(null,event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML);
        }
    });
}

init();