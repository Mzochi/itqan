			  
			  
			  
			  
			  
			  /******* إنشاء صفحة الدرجات  *******/
			  Page.create({
			  
			  id   : "degree",
			  view: "pages/view/degree/degree.html",
			  title: " أجب على السؤال ",
			  first: true,
			  father: false,
			  group: "degree",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  })
			  
			  });
			   