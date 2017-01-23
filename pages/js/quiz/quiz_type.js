			  
			  
			   
			 
                
           
			  
			  /******* إنشاء صفحة اختيار نوع الاختبار *******/
			  Page.create({
			  
			  id   : "quiz_type",
			  view: "pages/view/quiz/quiz_type.html",
			  title: " اختر طريقة الاختبار ",
			  first: true,
			  father: false,
			  group: "quiz",
			  
			  start: (function(){	
			   
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  })
			  
			  });
			   
			   
			  
			   