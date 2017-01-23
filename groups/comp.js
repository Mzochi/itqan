






              /*****  إنشاء قروب المعلومات  *****/
			 
				  
			  
			  Group.create({
			  
			  id   : "comp",
			  first: false  ,
			  
			  start: (function(){
			  
			  animate.group_in();
 
			  }),
			  
			  
			  end: (function(){
			  
			  animate.group_out();
			  
			  }) 
			  
			  });
			  
			   