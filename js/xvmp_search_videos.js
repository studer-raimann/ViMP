var VimpSearch = {

	videos: [],

	base_link: "",

	toggle: function (mid, visible) {
		xoctWaiter.show();
		if (typeof visible == 'undefined') {
			visible = 1;
		}

		var checked = $('#xvmp_checkbox_' + mid)[0].checked === true ? 1 : 0;

		ajax_url = this.base_link;
		$.ajax({
			url: ajax_url,
			type: "GET",
			data: {
				cmd: 'toggleVideo',
				mid: mid,
				checked: checked,
				visible: visible
			}
		}).always(function(response) {
			try {
				response = JSON.parse(response);
			} catch (error) {
				response = '{"success" = false}';
			}

			if (response.success) {
				xoctWaiter.hide();
			} else {
				xoctWaiter.hide();
				alert('Authentication failed. Please log in again.');
			}
		});
	},

	add: function (event, mid, visible) {
		event.preventDefault();
		xoctWaiter.show();
		if (typeof visible == 'undefined') {
			visible = 1;
		}
		var remove_button = $('#xvmp_remove_'+mid);
		var add_button = $('#xvmp_add_'+mid);
		var row = $('#xvmp_row_'+mid);

		ajax_url = this.base_link;
		$.ajax({
			url: ajax_url,
			type: "GET",
			data: {
				cmd: 'addVideo',
				mid: mid,
				visible: visible
			}
		}).always(function(response) {
			try {
				response = JSON.parse(response);
			} catch (error) {
				response = '{"success" = false}';
			}

			if (response.success) {
				add_button.hide();
				remove_button.show();
				row.removeClass('xvmp_row_not_added');
				row.addClass('xvmp_row_added');
				xoctWaiter.hide();
			} else {
				xoctWaiter.hide();
				alert('Authentication failed. Please log in again.');
			}
		});
	},

	remove: function (event, mid) {
		event.preventDefault();
		xoctWaiter.show();

		var remove_button = $('#xvmp_remove_'+mid);
		var add_button = $('#xvmp_add_'+mid);
		var row = $('#xvmp_row_'+mid);

		ajax_url = this.base_link;
		$.ajax({
			url: ajax_url,
			type: "GET",
			data: {
				cmd: 'removeVideo',
				mid: mid
			}
		}).always(function(response) {
			try {
				response = JSON.parse(response);
			} catch (error) {
				response = '{"success" = false}';
			}

			if (response.success) {
				remove_button.hide();
				add_button.show();
				row.addClass('xvmp_row_not_added');
				row.removeClass('xvmp_row_added');
				xoctWaiter.hide();
			} else {
				xoctWaiter.hide();
				alert('Authentication failed. Please log in again.');
			}
		});
	},

	initEmptyFilterCheck: function () {
		$('input[name="cmd[applyFilter]"]').click(function(event) {
			has_filter_values = false;
			// check all filters for values
			$('table.ilTableFilter input').each(function(key, filter) {
				if ($(filter).val()) {
					has_filter_values = true;
				}
			});

			$('table.ilTableFilter select option:selected').each(function(key, filter) {
				if ($(filter).text() != 0) {
					console.log($(filter).text());
					has_filter_values = true;
				}
			});

			// if no filter has a value, send warning
			if (!has_filter_values) {
				window.alert('Bitte schränken Sie die Suche mithilfe der Filter ein.');
				event.preventDefault();
			}
		});
	}
}

