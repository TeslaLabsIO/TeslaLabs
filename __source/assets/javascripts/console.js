
	var con = function(obj){
		var wrapper,logger,ul;


		if($('#console-logger').length !=0){
			wrapper = $('#console-logger');
		}else{
			wrapper = $('<div>',{'id':'console-logger', 'style':'text-align:center;padding:5px;cursor:move;position:absolute;top:0;left:0;background-color:#FFF;border:1px solid #999'}).append('CONSOLE');
			logger = $('<div>',{'style':'text-align:left;border:1px solid #d9d9d9;font-size:10px;font-family:"Arial";overflow:auto;height:100px;width:200px '});

			ul = $('<ul>');
			wrapper.append(logger.append(ul));
		}

		if(typeof obj=="string"){
			wrapper.find('ul').append($('<li>',{'style':'margin-left:3px'}).text(obj));
			wrapper.find('ul').append($('<li>',{'style':'margin-left:10px'}).text("-------"));
			show();
			return true;
		}else{
			for(var prop in obj){
				if(!$.isFunction(obj[prop]) && !(typeof obj[prop]=="object")){
					wrapper.find('ul').append($('<li>',{'style':'margin-left:3px'}).text(prop + ' : ' + obj[prop]));
				}
			}
			wrapper.find('ul').append($('<li>',{'style':'margin-left:10px'}).text("-------"));
			show();

		}



		function show(){
			// wrapper.append(logger.html(ul));
			$(wrapper).draggable();
			$('body').append(wrapper)
		}
	}

