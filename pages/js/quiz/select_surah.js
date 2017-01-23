			  
			  
			  
			  
			  
			  /******* إنشاء صفحة اختيار نوع الاختبار *******/
			  Page.create({
			  
			  id   : "select_surah",
			  view: "pages/view/quiz/select_surah.html",
			  title: " حدد السور ",
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
			   