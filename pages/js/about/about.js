			  
			  
			  
			  
			  
			  /******* إنشاء صفحة المعلومات  *******/
			  Page.create({
			  
			  id   : "about",
			  view: "pages/view/about/about.html",
			  title: " عن البرنامج ",
			  first: true,
			  father: false,
			  group: "about",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  })
			  
			  });
			   