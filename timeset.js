function generate_times(){
	var times = [];
	var str;
	
	for(i = 8; i < 24; i++){
		if(i < 12){
			str = i + ":00am";
		}else{
			if(i == 12){
				str = "12:00pm";
			}else{
				var j = i % 12;
				str = j + ":00pm";
			}
		}
		var obj = {};
		obj["start"] = i + ":00";
		obj["end"] = (i+1) + ":00";
		obj["cname"] = str;
		obj["room"] = "";
		times.push(obj);
	}
	
	return times;
}

function format_item(obj, width){
	if(obj["campus"] == "Livingston"){
		color = "#FF8300";
	}else if(obj["campus"] == "Busch"){
		color = "#4169E1";
	}else if(obj["campus"] == "CAC"){
		color = "#FFD700";
	}

	if(obj["time"]){
		return "<div class=\"elem\" style=\"background-color: " + color + "; width: " + width + "px; top: " + convert_time_to_raw_y(obj["start"]) + "px; height: " + convert_to_height(obj["start"],obj["end"]) + "px;\">" + obj["cname"] + "<br />" + obj["time"] + "<br />" + obj["room"] + "<br />" + "<\/div>"	
	}else{
		return "<div class=\"elem\" style=\"width: " + width + "px; top: " + convert_time_to_raw_y(obj["start"]) + "px; height: " + convert_to_height(obj["start"],obj["end"]) + "px;\">" + obj["cname"] + "<br />" + "<\/div>"
	}
}

function convert_time_to_raw_y(obj){
	var height = $("#container").height();
	var colon_pos = obj.indexOf(":");
	var hours = (parseInt(obj.substring(0, colon_pos)) - 8) * 60;
	var minutes = hours + parseInt(obj.substring(colon_pos + 1));
	var ratio = minutes / (16 * 60);
	return Math.floor(ratio * height);
}

function convert_to_height(start, end){
	var height1 = convert_time_to_raw_y(start);
	var height2 = convert_time_to_raw_y(end);
	return height2 - height1;
}
