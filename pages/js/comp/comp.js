			  
			  
			  
			  
			  
			  /******* إنشاء صفحة المنافسة  *******/
			  Page.create({
			  
			  id   : "comp",
			  view: "pages/view/comp/comp.html",
			  title: " المنافسات ",
			  first: true,
			  father: false,
			  group: "comp",
			  
			  start: (function(){	
			  
			  animate.page_in();
			  
			  }),
			  
			  end: (function(){
			  
			  animate.page_out();
			  
			  })
			  
			  });
			   