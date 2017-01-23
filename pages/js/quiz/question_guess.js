			  
			  
			  
			  
			  
			  /******* إنشاء صفحة السؤال حسب التخمين *******/
			  Page.create({
			  
			  id   : "question_guess",
			  view: "pages/view/quiz/question_guess.html",
			  title: " أجب على الأسئلة ",
			  first: false,
			  father: "select_guess",
			  group: "quiz",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  guessAction.end();
			  
			  })
			  
			  });
			   