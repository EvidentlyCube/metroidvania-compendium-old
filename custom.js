jQuery.fn.shuffle = function () {
	var j;
	for (var i = 0; i < this.length; i++) {
		j = Math.floor(Math.random() * this.length);
		$(this[i]).before($(this[j]));
	}
	return this;
};

$(document).ready(init);

function init(){
	$('button.show-variants').click(function(){
		var $this = $(this);
		var newText = $this.attr('data-alt-text');
		var oldText = $this.text();
		$this.text(newText);
		$this.attr('data-alt-text', oldText);
		$this.toggleClass('toggled');
		$this.parent().parent().find('.variants-container').slideToggle();
		return false;
	});
	$('button.show-examples').click(function(){
		var $this = $(this);
		var newText = $this.attr('data-alt-text');
		var oldText = $this.text();
		$this.text(newText);
		$this.attr('data-alt-text', oldText);
		$this.toggleClass('toggled');
		$this.parent().parent().find('.examples').slideToggle();
		return false;
	});
	$('button.show-description').click(function(){
		var $this = $(this);
		var newText = $this.attr('data-alt-text');
		var oldText = $this.text();
		$this.text(newText);
		$this.attr('data-alt-text', oldText);
		$this.toggleClass('toggled');
		$this.parent().parent().find('.game-description').slideToggle();
		return false;
	});
}