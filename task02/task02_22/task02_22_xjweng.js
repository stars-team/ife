/**
 * Created by xjweng on 2016/7/27 0027.
 */
var btn = document.getElementsByTagName('input'),
    preBtn = btn[0],
    inBtn = btn[1],
    postBtn = btn[2],
    treeRoot = document.getElementsByClassName('root')[0],
    childList = [],
    timer = null;

window.onload = function () {
    
    preBtn.onclick = function () {
        reset(); //恢复元素默认值
        preOrder(treeRoot);
        changeColor();
    }
    inBtn.onclick = function () {
        reset();
        inOrder(treeRoot);
        changeColor();

    }
    postBtn.onclick = function () {
        reset();
        postOrder(treeRoot);
        changeColor();
    }
}
//前序遍历,根左右
function preOrder(node) {
    if(!(node == null)){
        childList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
//中序遍历，左根右
function inOrder(node) {
    if(!(node == null)){
        inOrder(node.firstElementChild);
        childList.push(node);
        inOrder(node.lastElementChild);
    }
}
//后序遍历，左右根
function postOrder(node) {
    if(!(node == null)){
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        childList.push(node);
    }
}
//颜色变化
function changeColor() {
    var i = 0;
    childList[i].style.backgroundColor = 'blue';
    timer = setInterval(function (argument) {
        i++;
        if (i < childList.length){
            childList[i-1].style.backgroundColor = '#fff';
            childList[i].style.backgroundColor = 'blue';
        }else{
            clearInterval(timer);
            //最后一个元素
            childList[childList.length - 1].style.backgroundColor = '#fff';
        }
    },500);
}
//初始化样式
function reset() {
    childList = [];
    clearInterval(timer);
    var childs = document.getElementsByTagName('div');
    for (var i = 0; i < childs.length; i++){
        childs[i].style.backgroundColor = '#fff';
    }
}