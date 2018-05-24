/* image hover leave */
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);

/* active tel link only SP */
$(function() {
    if (!isPhone())
        return;

    $('li[data-action=call]').each(function() {
        var $ele = $(this);
        $ele.wrap('<a href="tel:' + $ele.data('tel') + '"></a>');
    });
});
function isPhone() {
    return (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0);
}
/* lntro tzikas loader */
$(document).ready(function(){
	$().introtzikas({
		line:'#6cc',
		speedwidth:2000,
		speedheight:800,
		bg:'#000'
	});
});