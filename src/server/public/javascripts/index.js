jQuery(document).ready(function() {
  jQuery('#form').on('submit', function(event) {
    event.preventDefault();

    let form = jQuery('#form');
    let data = form.serializeObject();

    jQuery
      .ajax(
        form.attr('action'),
        {
          contentType: 'application/json',
          method: 'POST',
          dataType: 'binary',
          processData: false,
          data: JSON.stringify(data),
        }
      )
      .then(
        function (result) {
          console.log('success', result);

          saveAs(result, data.filename);
        },
        function (error) {
          console.error('error', error);
        }
      );
  });

  $.fn.serializeObject = function() {
    const a = this.serializeArray();
    let o = {};

    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }

        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });

    return o;
  };
});
