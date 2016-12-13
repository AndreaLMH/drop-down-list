//
function CopySelect(sel){
	this.sel=sel;
	this.hide();
	this.copy();

}
CopySelect.prototype={
	//隐藏所有的select
	hide:function(){
		for(var i=0,len=this.sel.length;i<len;i++){
			this.sel[i].style.display="none";
		}
	},
	copy:function(){//根据原有select模拟
		for(var i=0,len=this.sel.length;i<len;i++){
			//模仿：创建结构标签，放入数组
			var sel=this.sel[i],
				//console.log(sel)
				sIndex=sel.selectedIndex,
				//console.log(sIndex)
				sTxt=sel.options[sIndex].innerHTML,//选中项的文字
				aNode=["<h5>"+sTxt+"</h5>","<ul>"],
			//添加子菜单项的个数=原来select中option个数
				opts=sel.options;
				//console.log(sTxt)
			for(var m=0,ml=opts.length;m<ml;m++){
				aNode.push("<li value='"+m+"'>"+opts[m].innerHTML+"</li>");
			}
			aNode.push("</ul>");
			//将数组中的节点拼接成一个字符串，添加到页面中
			var menu=document.createElement("section");
			menu.innerHTML=aNode.join("");
			menu.className="menu";
			sel.parentNode.insertBefore(menu,sel);
			//点击显示或隐藏子菜单
			this.operate(menu);
		}
	},
	operate:function(menu){
		menu.onclick=function(){
			//显示或隐藏子菜单(UL)，通过H5有哦没有active这个样式来判断
			var h5=this.getElementsByTagName("h5")[0],
				ul=this.getElementsByTagName("ul")[0];
			if(h5.className!="active"){
				ul.style.display="block";
				h5.className="active";
			}else{
				ul.style.display="none";
				h5.className="";
			}
			//点子菜单，更改标题的文字
			//判断当前触发事件实际目标event.target
			if(event.target.nodeName=="LI"){
				h5.innerHTML=event.target.innerHTML;
				//让模仿的与原有的select建立关联
				//点击LI更改原有的select的selectedIndex
				sel.selectedIndex=event.target.getAttribute("value");
				//触发原有select的change事件
				sel.onchange();
			}
		}
	}
}
