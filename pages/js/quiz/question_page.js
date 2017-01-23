			  
			  
			  
			  
			  
			  /******* إنشاء صفحة السؤال حسب الصفحات *******/
			  Page.create({
			  
			  id   : "question_page",
			  view: "pages/view/quiz/question_page.html",
			  title: " أجب على الأسئلة ",
			  first: false,
			  father: "select_page",
			  group: "quiz",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  pageAction.end();
			  
			  })
			  
			  });
			   