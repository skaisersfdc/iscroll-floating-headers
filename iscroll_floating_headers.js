// Generated by CoffeeScript 1.3.3
(function() {
  var root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.iScrollFloatingHeaders = (function() {

    iScrollFloatingHeaders.prototype.AUTO_SCROLL_SPEED = 500;

    iScrollFloatingHeaders.prototype.SCROLL_TO_ELEMENT_OFFSET = 0;

    iScrollFloatingHeaders.prototype.PIXEL_OVERLAP = 1;

    iScrollFloatingHeaders.prototype.y = void 0;

    iScrollFloatingHeaders.prototype.scrolling = false;

    iScrollFloatingHeaders.prototype.animating = false;

    iScrollFloatingHeaders.prototype.hidden = false;

    iScrollFloatingHeaders.prototype.headers = [];

    iScrollFloatingHeaders.prototype.sticky = null;

    function iScrollFloatingHeaders(el) {
      var _this = this;
      this.el = el;
      this._onScrollEnd = __bind(this._onScrollEnd, this);

      this._onScroll = __bind(this._onScroll, this);

      this._onScrollStart = __bind(this._onScrollStart, this);

      this.$el = $(this.el);
      this._findHeaders();
      this.SCROLL_TO_ELEMENT_OFFSET = this.$el.height() * 0.33;
      this.scrollHeight = this.$el.children(':first-child').height() - this.$el.height();
      this.$headers.each(function(i, item) {
        return _this.headers.push({
          $el: $(item),
          y: $(item).offset().top - _this.$el.offset().top,
          text: $(item).text(),
          i: i
        });
      });
      this.iscroll = new iScroll(this.el, {
        hScroll: false,
        vScrollbar: false,
        hScrollbar: false,
        useTransition: false,
        onBeforeScrollStart: function(e) {
          var target;
          target = e.target;
          while (target.nodeType !== 1) {
            target = target.parentNode;
          }
          if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            return e.preventDefault();
          } else {
            return e.stopPropagation();
          }
        },
        onScrollStart: this._onScrollStart,
        onScrollEnd: this._onScrollEnd
      });
      this._updateFloatingHeader();
      this._enableQuickScroll();
    }

    iScrollFloatingHeaders.prototype._onScrollStart = function() {
      this._updateFloatingHeader();
      if (!this.scrolling) {
        this.scrolling = true;
        return this._onScroll();
      }
    };

    iScrollFloatingHeaders.prototype._onScroll = function() {
      if (this.scrolling) {
        setTimeout(this._onScroll, 0);
      }
      if (this.iscroll.y !== this.y) {
        this.y = this.iscroll.y;
        return this._updateFloatingHeader();
      }
    };

    iScrollFloatingHeaders.prototype._onScrollEnd = function() {
      var _ref;
      this.scrolling = false;
      this._updateFloatingHeader();
      return this._setStickyText((_ref = this.sticky) != null ? _ref.text : void 0);
    };

    iScrollFloatingHeaders.prototype._findHeaders = function() {
      this.$headers = $('header', this.$el);
      this.headerColor = this.$headers.css('color');
      this.headerBackground = this.$headers.css('background-color');
      this.headerHeight = this.$headers.height();
      this.$sticky = $('<header class="sticky">');
      return this.$el.append(this.$sticky);
    };

    iScrollFloatingHeaders.prototype._updateFloatingHeader = function() {
      var currentHeader, delta, header, nextHeader, prevHeader, yOffset, _i, _len, _ref, _ref1, _ref2,
        _this = this;
      currentHeader = null;
      _ref = this.headers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        header = _ref[_i];
        if (header.y + this.y <= 0) {
          currentHeader = header;
        }
      }
      if (typeof this.y === "undefined" || currentHeader === null) {
        this._setStickyText((_ref1 = this.headers[0]) != null ? _ref1.text : void 0);
        if ((_ref2 = this.headers[0]) != null) {
          _ref2.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
        }
        this.$sticky.css('-webkit-transform', 'translate3d(0, -1000px, 0)');
        this.hidden = true;
        this.sticky = void 0;
      } else if (currentHeader !== this.sticky) {
        prevHeader = this.sticky;
        this.sticky = currentHeader;
        if (this.hidden || this.iscroll.dirY > 0) {
          if (this.hidden) {
            this.hidden = false;
          }
          this._setStickyText(currentHeader != null ? currentHeader.text : void 0);
          setTimeout(function() {
            currentHeader.$el.css('-webkit-transform', 'translate3d(100%, 0, 0)');
            return _this.$sticky.css('-webkit-transform', 'translate3d(0, 0, 0)');
          }, 0);
        } else if (this.iscroll.dirY < 0) {
          if (prevHeader != null) {
            prevHeader.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
          }
          this._setStickyText(currentHeader != null ? currentHeader.text : void 0);
        } else {

        }
      }
      if ((this.sticky != null) && this.headers.length > this.sticky.i + 1) {
        nextHeader = this.headers[this.sticky.i + 1];
        delta = nextHeader.y + this.y;
        if (delta > 0 && delta < this.headerHeight) {
          if (!this.animating) {
            this.animating = true;
          }
          yOffset = this.headerHeight - delta - this.PIXEL_OVERLAP;
          return this.$sticky.css('-webkit-transform', 'translate3d(0, -' + yOffset + 'px, 0)');
        } else if (this.animating) {
          this.animating = false;
          if (this.iscroll.dirY < 0) {
            return this.$sticky.css('-webkit-transform', 'translate3d(0, 0, 0)');
          }
        }
      }
    };

    iScrollFloatingHeaders.prototype._setStickyText = function(text) {
      var _this = this;
      if (this.stickyText !== text) {
        return setTimeout(function() {
          _this.$sticky.text(text);
          return _this.stickyText = text;
        }, 0);
      }
    };

    iScrollFloatingHeaders.prototype._enableQuickScroll = function() {
      var _this = this;
      this.quickscroll = $('<sidebar>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</sidebar>');
      this.$el.append(this.quickscroll);
      return this.quickscroll.on('touchmove', function(e) {
        var percentage, scrollPos;
        e.stopPropagation();
        e.preventDefault();
        percentage = (e.touches[0].pageY - _this.quickscroll.offset().top) / _this.quickscroll.height();
        percentage = Math.min(1, Math.max(percentage, 0));
        scrollPos = -_this.scrollHeight * percentage;
        _this.iscroll.dirY = 0;
        _this._onScrollStart();
        return _this.iscroll.scrollTo(0, scrollPos, 0);
      });
    };

    /* Public functions
    */


    iScrollFloatingHeaders.prototype.refresh = function() {
      var _this = this;
      return setTimeout(function() {
        return _this.iscroll.refresh();
      }, 0);
    };

    iScrollFloatingHeaders.prototype.scrollTo = function(pos, delay) {
      var _this = this;
      if (delay == null) {
        delay = 0;
      }
      return setTimeout(function() {
        return _this.iscroll.scrollTo(0, pos, _this.AUTO_SCROLL_SPEED);
      }, delay);
    };

    iScrollFloatingHeaders.prototype.scrollToTop = function(delay) {
      var _this = this;
      if (delay == null) {
        delay = 0;
      }
      return setTimeout(function() {
        return _this.scrollTo(0);
      }, delay);
    };

    iScrollFloatingHeaders.prototype.scrollToElement = function(el, delay) {
      var _this = this;
      if (delay == null) {
        delay = 0;
      }
      return setTimeout(function() {
        _this.iscroll.scrollToElement(el, 0);
        return setTimeout(function() {
          if (_this.iscroll.y + _this.SCROLL_TO_ELEMENT_OFFSET > 0) {
            _this._onScrollStart();
            return _this.iscroll.scrollTo(0, 0, _this.AUTO_SCROLL_SPEED);
          } else if (_this.iscroll.y + _this.scrollHeight > 0) {
            _this._onScrollStart();
            return _this.iscroll.scrollTo(0, _this.iscroll.y + _this.SCROLL_TO_ELEMENT_OFFSET, _this.AUTO_SCROLL_SPEED);
          }
        }, delay);
      }, 0);
    };

    return iScrollFloatingHeaders;

  })();

}).call(this);
