window.addEventListener('load',function () {
	//1,实现瀑布流布局
	waterFull('main', 'box');
	
	//加载数据
	var timer1=null;
	window.addEventListener('scroll',function  () {
		
		clearInterval(timer1);
		//节流
		timer1=setInterval(function () {
			
			if(checkWillLoadNewBox()){//真
			//从网络请求数据
		//	console.log("加载");
			//假数据
			var dataArr=[
			{"src":"A0.jpg"},
			{"src":"A1.jpg"},
			{"src":"A2.jpg"},
			{"src":"A3.jpg"},
			{"src":"A4.jpg"},
			{"src":"A5.jpg"},
			{"src":"A6.jpg"},
			{"src":"A7.jpg"},
			{"src":"A8.jpg"},
			{"src":"A9.jpg"},
			{"src":"A10.jpg"}
			];
			
			//遍历数据
			for(var i=0;i<dataArr.length;i++){
				
				var newBox=document.createElement('div');
				newBox.className='box';
				myTool.$('main').appendChild(newBox);
				
				var newPic=document.createElement('div');
				newPic.className='pic';
				newBox.appendChild(newPic);
				
				var newImg=document.createElement('img');
				newImg.src='../img/tu/'+dataArr[i].src;
				newPic.appendChild(newImg);
				
			}
			
			//重新进行瀑布流布局
			
			waterFull('main', 'box');
			
		}
		
			
		},200);
		
		
		
		
		
	});
	
	
	
	
	
	//页面改变重新布局页面
	var timer=null;
	window.addEventListener('resize',function () {
	//	waterFull('main', 'box');
	//太耗费性能
	//节流
	clearInterval(timer);
		timer=setInterval(function () {
			waterFull('main', 'box');
			
		},200);
		
		
	});
	
});


function waterFull(parent, child) {
	//1.父盒子居中
	//获取标签
	var allBox=myTool.$(parent).getElementsByClassName(child);
	//console.log(allBox);
	//获取子盒子的宽度
	var boxWidth = allBox[0].offsetWidth;
	//console.log(boxWidth);
	
	
	//获取文档宽度
	var screenW=document.documentElement.clientWidth || document.body.clientWidth;
	//console.log(screenW);
	//求出列数
	var cols=parseInt(screenW/boxWidth);
	//1.父盒子居中
	myTool.$(parent).style.width=cols*boxWidth+'px';
	myTool.$(parent).style.margin='0 auto';
	
	
	//2.定位子盒子
	var heightArr=[],boxHeight=0,minBoxHeight=0;
	//遍历所有盒子
	for(var i=0;i<allBox.length;i++){
		boxHeight=allBox[i].offsetHeight;
		//判断
		if(i<cols){//第一行
			heightArr.push(boxHeight);
			
			allBox[i].style='';
			
			
		}else{//剩余行
			//取出数组中最矮的盒子的高度
			minBoxHeight=_.min(heightArr);
			//取出盒子在数组中的搜因
			minBoxIndex=getMinBoxIndex(heightArr,minBoxHeight);
			
			//剩余子盒子定位
			allBox[i].style.position='absolute';
			allBox[i].style.left=minBoxIndex*boxWidth+'px';
			allBox[i].style.top=minBoxHeight+'px';
			//更新高度
			heightArr[minBoxIndex]+=boxHeight;
			
		}
	}
	
	
	//console.log(heightArr,minBoxHeight,minBoxIndex);
	
	
	
}

//arr 数组，val最矮高度
function getMinBoxIndex (arr,val) {
	for(var i=0;i<arr.length;i++){
		
		if(arr[i]===val){
			return i;
		}
		
	}
	
	
}

function checkWillLoadNewBox() {
	
	//获取最后的盒子
	var allBox=myTool.$('main').getElementsByClassName('box');
	var lastBox=allBox[allBox.length-1];
	
	//获取最后的盒子高度的一半
	var lastBoxDis=lastBox.offsetHeight*0.5+lastBox.offsetTop;
	//console.log(lastBoxDis);
	
	//求页面高度
	var screenH=document.documentElement.clientHeight || document.body.clientHeight;
	//求出页面滚出浏览器高度
	var scrollTopH=myTool.scroll().top;
	//返回结果
	return lastBoxDis<=screenH+scrollTopH;
	
}