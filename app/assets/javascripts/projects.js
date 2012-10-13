baseURL = "http://localhost:3000";


$(function() {
	$blocks = $('.blocks').isotope({
		animationOptions: {
		duration: 250,
		easing: 'easeOutExpo',
		queue: false
		},
		animationEngine : 'jquery',
		masonry: {columnWidth: 45}
	});


	$('.blocks').find('li .corner').click(function(){
		toggleBlock($(this).parent().parent());
	});


	Pusher.log = function(message) {
		if (window.console && window.console.log) window.console.log(message);
	};

	//Flash fallback logging - don't include this in production
	WEB_SOCKET_DEBUG = true;

	var pusher = new Pusher('1d429354391310d97281');
	var channel = pusher.subscribe('test_channel');

	channel.bind('notification', function(data) {
		console.log(data.repository.name);
		toggleBlock($('.'+data.repository.name).parent());
		setTimeout(function(){toggleBlock($('.'+data.repository.name).parent());},500);
		
	});

});



function toggleBlock(block){
	$o = block;
	$o.toggleClass('expanded');
	$blocks.isotope('reLayout');
	//$('#graph').toggle();
}


function sendPayload(testPort, repoName){
	var options = {
		host: 'localhost',
		port: testPort,
		path: '/payload',
		method: 'POST'
	};


	// GitHub sample payload
		var payload = {"payload": {
			"before": "5aef35982fb2d34e9d9d4502f6ede1072793222d",
			"repository": {
				"url": "http://github.com/defunkt/github",
				"name": repoName,
				"description": "You're lookin' at it.",
				"watchers": 5,
				"forks": 2,
				"private": 1,
				"owner": {
					"email": "chris@ozmm.org",
					"name": "defunkt"
				}
			},
			"commits": [
				{
				"id": "41a212ee83ca127e3c8cf465891ab7216a705f59",
				"url": "http://github.com/defunkt/github/commit/41a212ee83ca127e3c8cf465891ab7216a705f59",
				"author": {
					"email": "chris@ozmm.org",
					"name": "Chris Wanstrath"
				},
				"message": "okay i give in",
				"timestamp": "2008-02-15T14:57:17-08:00",
				"added": ["filepath.rb"]
				},
				{
				"id": "de8251ff97ee194a289832576287d6f8ad74e3d0",
				"url": "http://github.com/defunkt/github/commit/de8251ff97ee194a289832576287d6f8ad74e3d0",
				"author": {
					"email": "chris@ozmm.org",
					"name": "Chris Wanstrath"
				},
				"message": "update pricing a tad",
				"timestamp": "2008-02-15T14:36:34-08:00"
				}
			],
			"after": "de8251ff97ee194a289832576287d6f8ad74e3d0",
			"ref": "refs/heads/master"
		}};

	var frm = $(document.createElement('form'));
	var dat = JSON.stringify(payload);

	console.log(payload);

	var pusher = new Pusher('1d429354391310d97281');
	var channel = pusher.subscribe('test-channel');
	channel.bind('pusher:subscription_succeeded', function() {
		var triggered = channel.trigger('event1', payload);
	});

// $.post(
// 'http://' + options.host + ':' + options.port + options.path,
//	frm.attr("action"),
//	dat,
//	function(data) {
//		alert("Response: " + data);
//	}
// );
}




function getProject(id){
	$.getJSON(baseURL + "/projects/" + id, function(data){
		$m = $('#editModal');

		$m.find('h2').text(data.name);
		$m.find('.description').text(data.description);
		$m.find('.slug').text(data.slug);
		$m.reveal({
			animation: 'fade', //fade, fadeAndPop, none
			animationSpeed: 150, //how fast animations are
			closeOnBackgroundClick: true, //if you click background will modal close?
			dismissModalClass: 'close-reveal-modal' //the class of a button or element that will close an open modal);
		});
	});


}

