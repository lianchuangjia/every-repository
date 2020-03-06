
(function (w) {
	
	w.myTool={
		
	
		
	//得到id的函数	
    $:  function (id) {
		    	return typeof id ==='string'? document.getElementById(id):null;		    			    	
	},   	
	scroll: function () {
			
			if(window.pageYOffset!==null){//全兼容性
				return{
					"top":window.pageYOffset,
					"left":window.pageXOffset
				}
			}else if(document.compatMode=='CSS1Compat'){//w3c
				return{
					"top":document.documentElement.scrollTop,
					"left":window.documentElement.scrollLeft
				}
				
			}
			return{
				"top":document.body.scrollTop,
				"left":window.body.scrollLeft
			}
			
			
	},
	show:function (ele) {
		ele.style.display='block';
		
	},
	hide:function (ele) {
		ele.style.display='none';
		
	},
	client: function () {
		
			if(window.innerWidth!==null){//全兼容性
				return{
					"width":window.innerWidth,
					"height":window.innerHeight
				}
			}else if(document.compatMode=='CSS1Compat'){//w3c
				return{
					"width":document.documentElement.clientWidth,
					"height":window.documentElement.clientHeight
				
				}
				
			}
			return{
				"width":document.body.clientWidth,
				"height":window.body.clientHeight
			}
			
			
	}
	
	
	
	};
	
	
})(window);
