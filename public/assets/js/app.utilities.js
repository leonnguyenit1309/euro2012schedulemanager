/**
 * 
 */
$(function(){
	
	/**
	 * Global settings
	 */	
	var applang = {
			datatable: {
				processing: "Đang tải dữ liệu."
			}
	};
	
	
	
	/**
	 * Utilities Functions
	 */
	
	/* Make a full site url from url and request data type: html or json */
	var site_url = function(uri, type) {
		
		type = typeof type !== 'undefined' ? type : "html";
		uri = typeof uri !== 'undefined' ? uri : baseurl;
		
		
		if (uri === baseurl) {
			return baseurl;
		}else {
			return baseurl + uri + "." + type;
		}	 
		
	};
	
	/* Redirect to a page by it uri */
	var go_to_page = function(uri) {
		window.location.replace(site_url(uri));
	};
	
});