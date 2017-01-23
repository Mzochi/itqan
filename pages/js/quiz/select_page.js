			  
			  
			  
			  
			  
			  /******* إنشاء صفحة اختيار نوع الاختبار *******/
			  Page.create({
			  
			  id   : "select_page",
			  view: "pages/view/quiz/select_page.html",
			  title: " حدد الصفحات ",
			  first: false,
			  father: "quiz_type",
			  group: "quiz",
			  
			  start: (function(){	
			  
			  animate.page_in();
			 
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  })
			  
			  });
			   