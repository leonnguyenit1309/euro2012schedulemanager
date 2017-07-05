/**
 * Metis - Bootstrap-Admin-Template v2.3.2
 * Author : puikinsh
 * Copyright 2016
 * Licensed under MIT (https://github.com/puikinsh/Bootstrap-Admin-Template/blob/master/LICENSE.md)
 */


/*  =========== METIS BUTTON =========== */
 ;(function($, Metis) {
 	var $button = $('.inner a.btn');
 	Metis.metisButton = function() {
 		$.each($button, function() {
 			$(this).popover({
 				placement: 'bottom',
 				title: this.innerHTML,
 				content: this.outerHTML,
 				trigger: (Metis.isTouchDevice) ? 'touchstart' : 'hover'
 			});
 		});
 	};
 	return Metis;
 })(jQuery, Metis || {});


/*  =========== METIS DASHBOARD =========== */
;(function($) {
	"use strict";
	Metis.dashboard = function() {

	//----------- BEGIN FULLCALENDAR CODE -------------------------*/

	/* Clalendar in dashboard */
	if ( $('#calendar-dashboard').length ) {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var calendar = $('#calendar-dashboard').fullCalendar({
			header: {
				left: 'prev,today,next,',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent', {
						title: title,
						start: start,
						end: end,
						allDay: allDay
	                }, true // make the event "stick"
	                );
				}
				calendar.fullCalendar('unselect');
			},
			editable: true,
			events: [{
				title: 'All Day Event',
				start: new Date(y, m, 1),
				className: 'label label-success'
			}, {
				title: 'Long Event',
				start: new Date(y, m, d - 5),
				end: new Date(y, m, d - 2),
				className: 'label label-info'
			}, {
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d - 3, 16, 0),
				allDay: false,
				className: 'label label-warning'
			}, {
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d + 4, 16, 0),
				allDay: false,
				className: 'label label-inverse'
			}, {
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false,
				className: 'label label-important'
			}, {
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			}, {
				title: 'Birthday Party',
				start: new Date(y, m, d + 1, 19, 0),
				end: new Date(y, m, d + 1, 22, 30),
				allDay: false
			}, {
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}]
		});
	}


	/*----------- END FULLCALENDAR CODE -------------------------*/

	/*-------------------- Click Scroll ----------------*/

	/*-------------------- End Click Scroll ----------------*/
    };
    return Metis;
})(jQuery);


/* ====== METIS SORTABLE ======= */
;(function($, Metis) {
	if (!$().sortable) {
		return;
	}
	// var $sortable = $('.inner [class*=col-]');
	Metis.metisSortable = function() {
		// $sortable.sortable({
		// 	placeholder: "ui-state-highlight"
		// }).disableSelection();



		/*----------- BEGIN TABLESORTER CODE -------------------------*/
		/* required jquery.tablesorter.min.js*/

		/* Two table in dashboard */
		

		/*----------- END TABLESORTER CODE -------------------------*/

	};
	return Metis;
})(jQuery, Metis || {});


/* ====== METIS TABLEDATA ======= */
;(function($) {
	"use strict";
	Metis.MetisTable = function() {
		/*----------- BEGIN TABLESORTER CODE -------------------------*/
		/* required jquery.tablesorter.min.js*/
		//$(".top-5-matches-sortableTable").tablesorter();
		//$(".top-5-goals-sortableTable").tablesorter();
		/*----------- END TABLESORTER CODE -------------------------*/

		/*----------- BEGIN datatable CODE -------------------------*/
//		var tblListNations = $('#tbl-list-nations').DataTable({
//			"pageLength": 5,
//			"lengthMenu": [ [5, 10, 20, -1], [5, 10, 20, "All"] ],
//			columnDefs: [
//				{ targets: [0, 1, 2], "searchable": true},
//				{ targets: [3], "orderable": false, "searchable": false}
//			]
//		});
		
//		var tblListNations = $('#tbl-list-nations').DataTable({
//			 "processing": true,
//		        "ajax": "http://localhost:8080/Euro2012ScheduleManager/dashboard/nations/getall.json",
//		        "columns": [
//		            { "data": "nationCode" },
//		            { "data": "nationName" },
//		            { data:function(row, type, set){
//		            	return '<a href="' + site_url('/dashboar/nations') + '" >' + row.nationCode + '</a>';
//		            } },
//		            {data:function(row, type, set){
//		            	var edit_link = site_url('/dashboard/nations/edit/' + row.nationCode, 'json');		            	
//		            	return '<a href="' + edit_link + '" ><i></i>&nbspCập nhật</a>';
//		            } }
//		        ],
//			"pageLength": 5,
//			"lengthMenu": [ [5, 10, 20, -1], [5, 10, 20, "All"] ],
//			columnDefs: [
//				{ targets: [0, 1, 2], "searchable": true},
//				{ targets: [3], "orderable": false, "searchable": false}
//			]
//		});

		/*----------- END datatable CODE -------------------------*/
    };
    return Metis;
})(jQuery);



/*  =========== METIS Form General =========== */
;(function($) {
	"use strict";
	Metis.formGeneral = function() {
		$('.with-tooltip').tooltip({
			selector: ".input-tooltip"
		});
		/*----------- BEGIN autosize CODE -------------------------*/
		if ($('#autosize').length) {
			$('#autosize').autosize();
		}
		/*----------- END autosize CODE -------------------------*/
		/*----------- BEGIN inputlimiter CODE -------------------------*/
		$('#limiter').inputlimiter({
			limit: 140,
			remText: 'You only have %n character%s remaining...',
			limitText: 'You\'re allowed to input %n character%s into this field.'
		});
		/*----------- END inputlimiter CODE -------------------------*/
		/*----------- BEGIN tagsInput CODE -------------------------*/
		$('#tags').tagsInput();
		/*----------- END tagsInput CODE -------------------------*/
		/*----------- BEGIN chosen CODE -------------------------*/
		$(".chzn-select").chosen({
			width: "250px"
		});
		/*----------- END chosen CODE -------------------------*/
    };
    return Metis;
})(jQuery);


;(function($) {
	"use strict";
	Metis.formValidation = function() {
		/*----------- BEGIN validationEngine CODE -------------------------*/
		$('#popup-validation').validationEngine();
		/*----------- END validationEngine CODE -------------------------*/
		/*----------- BEGIN validate CODE -------------------------*/
		$('#inline-validate').validate({
			rules: {
				required: "required",
				email: {
					required: true,
					email: true
				},
				date: {
					required: true,
					date: true
				},
				url: {
					required: true,
					url: true
				},
				password: {
					required: true,
					minlength: 5
				},
				confirm_password: {
					required: true,
					minlength: 5,
					equalTo: "#password"
				},
				agree: "required",
				minsize: {
					required: true,
					minlength: 3
				},
				maxsize: {
					required: true,
					maxlength: 6
				},
				minNum: {
					required: true,
					min: 3
				},
				maxNum: {
					required: true,
					max: 16
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			}
		});
		$('#block-validate').validate({
			rules: {
				required2: "required",
				email2: {
					required: true,
					email: true
				},
				date2: {
					required: true,
					date: true
				},
				url2: {
					required: true,
					url: true
				},
				password2: {
					required: true,
					minlength: 5
				},
				confirm_password2: {
					required: true,
					minlength: 5,
					equalTo: "#password2"
				},
				agree2: "required",
				digits: {
					required: true,
					digits: true
				},
				range: {
					required: true,
					range: [5, 16]
				}
			},
			errorClass: 'help-block',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			}
		});
		/*----------- END validate CODE -------------------------*/
	};
	return Metis;
})(jQuery);;
(function($, Metis) {
	"use strict";
	Metis.formWizard = function() {
		/*----------- BEGIN uniform CODE -------------------------*/
		$('#fileUpload').uniform();
		/*----------- END uniform CODE -------------------------*/
		/*----------- BEGIN plupload CODE -------------------------*/
		$("#uploader").pluploadQueue({
			runtimes: 'html5,html4',
			url: 'form-wysiwyg.html',
			max_file_size: '128kb',
			unique_names: true,
			filters: [{
				title: "Image files",
				extensions: "jpg,gif,png"
			}]
		});
		/*----------- END plupload CODE -------------------------*/
		/*----------- BEGIN formwizard CODE -------------------------*/
		$("#wizardForm").formwizard({
			formPluginEnabled: true,
			validationEnabled: true,
			focusFirstInput: true,
			formOptions: {
				beforeSubmit: function(data) {
					$.gritter.add({
                        // (string | mandatory) the heading of the notification
                        title: 'data sent to the server',
                        // (string | mandatory) the text inside the notification
                        text: $.param(data),
                        sticky: false
                    });
					return false;
				},
				dataType: 'json',
				resetForm: true
			},
			validationOptions: {
				rules: {
					server_host: "required",
					server_name: "required",
					server_user: "required",
					server_password: "required",
					table_prefix: "required",
					table_collation: "required",
					username: {
						required: true,
						minlength: 3
					},
					usermail: {
						required: true,
						email: true
					},
					pass: {
						required: true,
						minlength: 6
					},
					pass2: {
						required: true,
						minlength: 6,
						equalTo: "#pass"
					}
				},
				errorClass: 'help-block',
				errorElement: 'span',
				highlight: function(element, errorClass, validClass) {
					$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
				}
			}
		});
		/*----------- END formwizard CODE -------------------------*/
	};
	return Metis;
})(jQuery, Metis || {});;
(function($) {
	"use strict";
	Metis.formWysiwyg = function() {
		/*----------- BEGIN wysihtml5 CODE -------------------------*/
		$('#wysihtml5-team').wysihtml5();
		$('#wysihtml5-edit-team').wysihtml5();
		/*----------- END wysihtml5 CODE -------------------------*/
    	};
    return Metis;
})(jQuery);;
(function($) {
	"use strict";
	Metis.MetisCalendar = function() {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var hdr = {};
		if ($(window).width() <= 767) {
			hdr = {
				left: 'title',
				center: 'month,agendaWeek,agendaDay',
				right: 'prev,today,next'
			};
		} else {
			hdr = {
				left: '',
				center: 'title',
				right: 'prev,today,month,agendaWeek,agendaDay,next'
			};
		}
		var initDrag = function(e) {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim(e.text()), // use the element's text as the event title
                className: $.trim(e.children('span').attr('class')) // use the element's children as the event class
            };
            // store the Event Object in the DOM element so we can get to it later
            e.data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            e.draggable({
            	zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
        };
        var addEvent = function(title, priority) {
        	title = title.length === 0 ? "Untitled Event" : title;
        	priority = priority.length === 0 ? "label label-default" : priority;
        	var html = $('<li class="external-event"><span class="' + priority + '">' + title + '</span></li>');
        	jQuery('#external-events').append(html);
        	initDrag(html);
        };
        /* initialize the external events
        -----------------------------------------------------------------*/
        $('#external-events li.external-event').each(function() {
        	initDrag($(this));
        });
        $('#add-event').click(function() {
        	var title = $('#title').val();
        	var priority = $('input:radio[name=priority]:checked').val();
        	addEvent(title, priority);
        });
        /* initialize the calendar
        -----------------------------------------------------------------*/
        $('#calendar').fullCalendar({
        	header: hdr,
        	editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function(date) { // this function is called when something is dropped
                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');
                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);
                // assign it the date that was reported
                copiedEventObject.start = date;
                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            windowResize: function(event, ui) {
            	$('#calendar').fullCalendar('render');
            }
        });
    };
    return Metis;
})(jQuery);;
(function($) {
	"use strict";
	Metis.MetisFile = function() {
		/*----------- BEGIN elfinder CODE -------------------------*/
		var elf = $('#elfinder').elfinder({
            url: 'assets/elfinder-2.0-rc1/php/connector.php' // connector URL (REQUIRED)
                // lang: 'de',             // language (OPTIONAL)
            }).elfinder('instance');
		/*----------- END elfinder CODE -------------------------*/
	};
	return Metis;
})(jQuery);

/* ====== METIS MAPS ======= */
;(function($) {
	"use strict";
	Metis.MetisMaps = function() {	};
	return Metis;
})(jQuery);





/* ====== METIS PRICING ======= */
;(function($, Metis) {
	"use strict";
	var _updateClass = function(el, c) {
		el.removeClass("primary success danger warning info default").addClass(c);
	};
	Metis.MetisPricing = function() {};
	return Metis;
})(jQuery, Metis || {});


/* ====== METIS PROGRESS ======= */
;(function($, Metis) {
	Metis.MetisProgress = function() {
		// var $bar = $('.progress .progress-bar');
		// $.each($bar, function() {
		// 	var $this = $(this);
		// 	$this.animate({
		// 		width: $(this).attr('aria-valuenow') + '%'
		// 	}).popover({
		// 		placement: 'bottom',
		// 		title: 'Source',
		// 		content: this.outerHTML
		// 	});
		// });
	};
	return Metis;
})(jQuery, Metis);