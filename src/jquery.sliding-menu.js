(function(jQuery){
  var $ = jQuery;

  function setTransition(node, value){
    $(node).css({
      WebkitTransition : value,
      MozTransition    : value,
      MsTransition     : value,
      OTransition      : value,
      transition       : value
    });
  }

  var SlidingMenu = function(target, menu, options){
    this.target = target;

    // Set options: merge dicts
    this.options = $.extend({
      direction: 'left',
      transitionDuration: '0.3s'
    }, options);

    // Menu
    this.menu = $('<div class="sliding-menu">');
    this.menu.css({
      'position': 'fixed',
      'top': 0,
      'height': '100%',
      'overflow': 'auto'
    });
    this.menu.css(this.options.direction, 0);
    this.menu.append($(menu).clone());

    // Overlay
    this.overlay = $('<div class="sliding-menu-overlay">');
    this.overlay.css({
      'position': 'fixed',
      'top': 0,
      'width': '100%',
      'height': '100%'
    });
    this.overlay.css(this.options.direction, 0);

    // Add events to open/close menu
    this.target.on('click', $.proxy(this.open, this));
    this.overlay.on('click', $.proxy(this.close, this));
    $(window).on('resize', $.proxy(this.close, this));
  };

  SlidingMenu.prototype.wrapWithTransitions = function(fnc){
    // Wrap fnc function passed in parameters by transitions
    var self = this;
    var transition = 'all ' + self.options.transitionDuration + ' ease-in-out';

    $('body').delay(0).queue(function(){
      setTransition($('body'), transition);
      setTransition(self.menu, transition);
      setTransition(self.overlay, transition);
      $(this).dequeue();
    }).delay(50).queue(function(){
      fnc();

      transitionEnd($('body')).bind($.proxy(function(){
        transitionEnd($('body')).unbind();

        setTransition($('body'), '');
        setTransition(self.menu, '');
        setTransition(self.overlay, '');
        $(this).dequeue();
      }, this));
    });
  };

  SlidingMenu.prototype.open = function(){
    this.state = 'open';

    // Slide the body
    var self = this;
    $('body').clearQueue().queue(function(){
      // Append overlay and menu to body
      $('body').append(self.overlay, self.menu);

      // Set initial values
      self.menu.css(self.options.direction, (-self.menu.width()) + 'px');
      self.overlay.css('opacity', 0);
      $('body').css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      $('body').css(self.options.direction, '0px');

      $(this).dequeue();
    });
    this.wrapWithTransitions(function(){
      // Animate to the open state
      $('body').css(self.options.direction, self.menu.width() + 'px');
      self.menu.css(self.options.direction, '0px');
      self.overlay.css('opacity', 1);
    });
  };

  SlidingMenu.prototype.close = function(){
    if(this.state != 'open') return;
    this.state = 'close';

    var self = this;
    this.wrapWithTransitions(function(){
      // Animate to the close state
      self.overlay.css('opacity', 0);
      $('body').css(self.options.direction, '0px');
      self.menu.css(self.options.direction, (-self.menu.width()) + 'px');
    });
    $('body').queue(function(){
      // Detach overlay and menu from body
      self.menu.detach();
      self.overlay.detach();

      // Restore the initial css values
      $('body').css({
        'position': '',
        'overflow': ''
      });
      $('body').css(self.options.direction, '');
      self.menu.css(self.options.direction, '');
      self.overlay.css('opacity', '');
    });
  };

  jQuery.fn.slidingMenu = function(menu, options){
    if(typeof options != typeof {}) option = {};

    $(this).each(function(){
      new SlidingMenu($(this), menu, options);
    });
  };
})(jQuery);
