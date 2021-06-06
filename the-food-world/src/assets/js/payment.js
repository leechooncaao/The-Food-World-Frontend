$(document).ready(() => {
    $('input[type="radio"]').click(function() {
        if($(this).attr('id') === 'credit'){
          $('#paypal-button').show();
        }else {
          $('#paypal-button').hide();
        };
      });
})