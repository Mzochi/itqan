			  
			  
			  
			  
			  
			  /******* إنشاء صفحة السؤال حسب الأجزاء *******/
			  Page.create({
			  
			  id   : "question_juz",
			  view: "pages/view/quiz/question_juz.html",
			  title: "أجب على الأسئلة ",
			  first: false,
			  father: "select_juz",
			  group: "quiz",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  juzAction.end();
			 
			  
			  })
			  
			  });
			  
			  
			  
			  
			  