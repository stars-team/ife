/**
 * Created by xjweng on 2016/4/13 0013.
 */
var num = new Array();

/**
 * 删除左右两端的空格
 */
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 根据按钮类型入队
 * @param btn_type
 */
function addNum(btn_type) {
    var num_in = trim(document.getElementById("num_in").value);
    console.log("addNum() action");
    //console.log(num_in);
    if(btn_type === "left_in"){
        if(num_in === "" || parseInt(num_in) != num_in || parseInt(num_in) < 10 || parseInt(num_in) > 100){
            alert("error input");
            return;
        }else if(num.length === 60){
            alert("the array length has arrived 60");
            return;
        }else {
            num.unshift(num_in);
        }
    }else if(btn_type === "right_in"){
        if(num_in === "" || parseInt(num_in) != num_in || parseInt(num_in) < 10 || parseInt(num_in) > 100){
            alert("error input");
            return;
        }else if(num.length === 60){
            alert("the array length has arrived 60");
            return;
        }else {
            num.push(num_in);
        }
    }else {
        return;
    }
}
/**
 * 入队封装
 * @param btn_type
 */
function addHandle(btn_type) {
    addNum(btn_type);
    renderQue();
}
/**
 * 根据按钮类型出队
 * @param btn_type
 */
function delHandle(btn_type) {
    if(btn_type === "left_out"){
        //num.shift();
        alert(num.shift());
    }else if(btn_type === "right_out"){
        alert(num.pop());
    }else {
        //任点一个传下标到btn_type
        alert(num.splice(btn_type,1));
    }
    renderQue();
}
/**
 * 渲染队列
 */
function renderQue() {
    //先擦除记录
    var que = document.getElementById("queue");
    var childs = que.childNodes;
    for (var j = childs.length - 1; j >= 0; j--){
        que.removeChild(childs.item(j));
    }
    //正常叠加
    for(var i in num){
        var data_box = document.createElement("div");
        data_box.setAttribute("class","data_box");
        var data_gram = document.createElement("div");
        data_gram.setAttribute("class","data_gram");
        data_gram.style.height = num[i]*3.8 + "px";
        data_gram.style.backgroundColor = getRandomColor();

        var nspan = document.createElement("span");
        nspan.innerHTML = num[i];
        
        data_gram.appendChild(nspan);
        data_box.appendChild(data_gram);
        que.appendChild(data_box);
    }
    //清空输入框
    document.getElementById("num_in").value = "";
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
 * 冒泡排序
 */
function bubSort() {
    
}
/**
 * 初始化函数
 */
function init() {
    //初始化入队事件，点击时调用addHandle
    document.getElementById("_in").addEventListener("click",function(event){
        console.log(event.target.id);
        addHandle.call(null,event.target.id);
        console.log(num);
    });

    //左右出,点击时调用delHandle
    document.getElementById("_out").addEventListener("click",function(event){
        console.log(event.target.id);
        delHandle.call(null,event.target.id);
        console.log(num);
    });

    //点击出
    document.getElementById("queue").addEventListener("click",function(event){
        event.target.id = "sel_del";
        var que = document.getElementById("queue").getElementsByClassName("data_gram");
        //获取点击元素下标
        for(var v = 0; v < que.length; v++){
            if(que[v].id === "sel_del"){
                delHandle.call(null,v);
            }
        }
        console.log(num);
    });
}

init();