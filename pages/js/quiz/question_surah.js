			  
			  
			  
			  
			  
			  /******* إنشاء صفحة السؤال حسب السور *******/
			  Page.create({
			  
			  id   : "question_surah",
			  view: "pages/view/quiz/question_surah.html",
			  title: " أجب على السؤال ",
			  first: false,
			  father: "select_surah",
			  group: "quiz",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  surahAction.end();
			  
			  })
			  
			  });
			   