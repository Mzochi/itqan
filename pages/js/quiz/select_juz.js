			  
			  
			  
			  
			  
			  /******* إنشاء صفحة اختيار نوع الاختبار *******/
			  Page.create({
			  
			  id   : "select_juz",
			  view: "pages/view/quiz/select_juz.html",
			  title: " حدد الأجزاء ",
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
			   