(function($) {
    $.fn.spasticNav = function(options) {
        options = $.extend({overlap: 0, speed: 500, reset: 300, color: '#01a58d', easing: 'easeOutExpo'}, options);
        return this.each(function() {
            var nav = $(this), currentPageItem = $('.active', nav), blob, reset;
            $('<li id="blob"></li>').css({width: currentPageItem.outerWidth(), height: '4px', left: currentPageItem.position().left, bottom: '2px', backgroundColor: options.color}).appendTo(this);
            blob = $('#blob', nav);
            $('#nav>li:not(#blob)').hover(function() {
                clearTimeout(reset);
                blob.animate({left: $(this).position().left, width: $(this).width()}, {duration: options.speed, easing: options.easing, queue: false});
            }, function() {
                reset = setTimeout(function() {
                    blob.animate({width: currentPageItem.outerWidth(), left: currentPageItem.position().left}, options.speed)
                }, options.reset);
            });
        });
    };
})(jQuery);
(function(b) {
    function d(a) {
        this.input = a;
        a.attr("type") == "password" && this.handlePassword();
        b(a[0].form).submit(function() {
            if (a.hasClass("placeholder") && a[0].value == a.attr("placeholder"))
                a[0].value = ""
        })
    }
    d.prototype = {show: function(a) {
            if (this.input[0].value === "" || a && this.valueIsPlaceholder()) {
                if (this.isPassword)
                    try {
                        this.input[0].setAttribute("type", "text")
                    } catch (b) {
                        this.input.before(this.fakePassword.show()).hide()
                    }
                this.input.addClass("placeholder");
                this.input[0].value = this.input.attr("placeholder")
            }
        }, hide: function() {
            if (this.valueIsPlaceholder() && this.input.hasClass("placeholder") && (this.input.removeClass("placeholder"), this.input[0].value = "", this.isPassword)) {
                try {
                    this.input[0].setAttribute("type", "password")
                } catch (a) {
                }
                this.input.show();
                this.input[0].focus()
            }
        }, valueIsPlaceholder: function() {
            return this.input[0].value == this.input.attr("placeholder")
        }, handlePassword: function() {
            var a = this.input;
            a.attr("realType", "password");
            this.isPassword = !0;
            if (b.browser.msie && a[0].outerHTML) {
                var c = b(a[0].outerHTML.replace(/type=(['"])?password\1/gi, "type=$1text$1"));
                this.fakePassword = c.val(a.attr("placeholder")).addClass("placeholder").focus(function() {
                    a.trigger("focus");
                    b(this).hide()
                });
                b(a[0].form).submit(function() {
                    c.remove();
                    a.show()
                })
            }
        }};
    var e = !!("placeholder"in document.createElement("input"));
    b.fn.placeholder = function() {
        return e ? this : this.each(function() {
            var a = b(this), c = new d(a);
            c.show(!0);
            a.focus(function() {
                c.hide()
            });
            a.blur(function() {
                c.show(!1)
            });
            b.browser.msie && (b(window).load(function() {
                a.val() && a.removeClass("placeholder");
                c.show(!0)
            }), a.focus(function() {
                if (this.value == "") {
                    var a = this.createTextRange();
                    a.collapse(!0);
                    a.moveStart("character", 0);
                    a.select()
                }
            }))
        })
    }
})(jQuery);
!function() {
    var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty, d = function(a, b) {
        function d() {
            this.constructor = a
        }
        for (var e in b)
            c.call(b, e) && (a[e] = b[e]);
        return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
    };
    SelectParser = function() {
        function SelectParser() {
            this.options_index = 0, this.parsed = []
        }
        return SelectParser.prototype.add_node = function(a) {
            return"OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
        }, SelectParser.prototype.add_group = function(a) {
            var b, c, d, e, f, g;
            for (b = this.parsed.length, this.parsed.push({array_index:b, group:!0, label:this.escapeExpression(a.label), children:0, disabled:a.disabled}), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++)
                c = f[d], g.push(this.add_option(c, b, a.disabled));
            return g
        }, SelectParser.prototype.add_option = function(a, b, c) {
            return"OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({array_index: this.parsed.length, options_index: this.options_index, value: a.value, text: a.text, html: a.innerHTML, selected: a.selected, disabled: c === !0 ? c : a.disabled, group_array_index: b, classes: a.className, style: a.style.cssText})) : this.parsed.push({array_index: this.parsed.length, options_index: this.options_index, empty: !0}), this.options_index += 1) : void 0
        }, SelectParser.prototype.escapeExpression = function(a) {
            var b, c;
            return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {"<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function(a) {
                return b[a] || "&amp;"
            })) : a
        }, SelectParser
    }(), SelectParser.select_to_array = function(a) {
        var b, c, d, e, f;
        for (c = new SelectParser, f = a.childNodes, d = 0, e = f.length; e > d; d++)
            b = f[d], c.add_node(b);
        return c.parsed
    }, AbstractChosen = function() {
        function AbstractChosen(a, b) {
            this.form_field = a, this.options = null != b ? b : {}, AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
        }
        return AbstractChosen.prototype.set_default_values = function() {
            var a = this;
            return this.click_test_action = function(b) {
                return a.test_active_click(b)
            }, this.activate_action = function(b) {
                return a.activate_field(b)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
        }, AbstractChosen.prototype.set_default_text = function() {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text
        }, AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }, AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }, AbstractChosen.prototype.input_focus = function() {
            var a = this;
            if (this.is_multiple) {
                if (!this.active_field)
                    return setTimeout(function() {
                        return a.container_mousedown()
                    }, 50)
            } else if (!this.active_field)
                return this.activate_field()
        }, AbstractChosen.prototype.input_blur = function() {
            var a = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                return a.blur_test()
            }, 100))
        }, AbstractChosen.prototype.results_option_build = function(a) {
            var b, c, d, e, f;
            for (b = "", f = this.results_data, d = 0, e = f.length; e > d; d++)
                c = f[d], b += c.group ? this.result_add_group(c) : this.result_add_option(c), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(c.text));
            return b
        }, AbstractChosen.prototype.result_add_option = function(a) {
            var b, c;
            return a.search_match ? this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = "" !== a.style.cssText ? ' style="' + a.style + '"' : "", '<li class="' + b.join(" ") + '"' + c + ' data-option-array-index="' + a.array_index + '">' + a.search_text + "</li>") : "" : ""
        }, AbstractChosen.prototype.result_add_group = function(a) {
            return a.search_match || a.group_match ? a.active_options > 0 ? '<li class="group-result">' + a.search_text + "</li>" : "" : ""
        }, AbstractChosen.prototype.results_update_field = function() {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, AbstractChosen.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, AbstractChosen.prototype.results_search = function() {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, AbstractChosen.prototype.winnow_results = function() {
            var a, b, c, d, e, f, g, h, i, j, k, l, m;
            for (this.no_results_clear(), e = 0, g = this.get_search_text(), a = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), d = this.search_contains?"":"^", c = new RegExp(d + a, "i"), j = new RegExp(a, "i"), m = this.results_data, k = 0, l = m.length; l > k; k++)
                b = m[k], b.search_match = !1, f = null, this.include_option_in_results(b) && (b.group && (b.group_match = !1, b.active_options = 0), null != b.group_array_index && this.results_data[b.group_array_index] && (f = this.results_data[b.group_array_index], 0 === f.active_options && f.search_match && (e += 1), f.active_options += 1), (!b.group || this.group_search) && (b.search_text = b.group ? b.label : b.html, b.search_match = this.search_string_match(b.search_text, c), b.search_match && !b.group && (e += 1), b.search_match ? (g.length && (h = b.search_text.search(j), i = b.search_text.substr(0, h + g.length) + "</em>" + b.search_text.substr(h + g.length), b.search_text = i.substr(0, h) + "<em>" + i.substr(h)), null != f && (f.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0)));
            return this.result_clear_highlight(), 1 > e && g.length ? (this.update_results_content(""), this.no_results(g)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, AbstractChosen.prototype.search_string_match = function(a, b) {
            var c, d, e, f;
            if (b.test(a))
                return!0;
            if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))
                for (e = 0, f = d.length; f > e; e++)
                    if (c = d[e], b.test(c))
                        return!0
        }, AbstractChosen.prototype.choices_count = function() {
            var a, b, c, d;
            if (null != this.selected_option_count)
                return this.selected_option_count;
            for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++)
                a = d[b], a.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, AbstractChosen.prototype.choices_click = function(a) {
            return a.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, AbstractChosen.prototype.keyup_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)
                        return this.keydown_backstroke();
                    if (!this.pending_backstroke)
                        return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    if (a.preventDefault(), this.results_showing)
                        return this.result_select(a);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
                }
        }, AbstractChosen.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, AbstractChosen.prototype.include_option_in_results = function(a) {
            return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
        }, AbstractChosen.browser_is_supported = function() {
            return"Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, AbstractChosen.default_multiple_text = "Select Some Options", AbstractChosen.default_single_text = "Select an Option", AbstractChosen.default_no_result_text = "No results match", AbstractChosen
    }(), a = jQuery, a.fn.extend({chosen: function(b) {
            return AbstractChosen.browser_is_supported() ? this.each(function() {
                var c, d;
                c = a(this), d = c.data("chosen"), "destroy" === b && d ? d.destroy() : d || c.data("chosen", new Chosen(this, b))
            }) : this
        }}), Chosen = function(c) {
        function Chosen() {
            return b = Chosen.__super__.constructor.apply(this, arguments)
        }
        return d(Chosen, c), Chosen.prototype.setup = function() {
            return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, Chosen.prototype.set_up_html = function() {
            var b, c;
            return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = {"class": b.join(" "), style: "width: " + this.container_width() + ";", title: this.form_field.title}, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
        }, Chosen.prototype.register_observers = function() {
            var a = this;
            return this.container.bind("mousedown.chosen", function(b) {
                a.container_mousedown(b)
            }), this.container.bind("mouseup.chosen", function(b) {
                a.container_mouseup(b)
            }), this.container.bind("mouseenter.chosen", function(b) {
                a.mouse_enter(b)
            }), this.container.bind("mouseleave.chosen", function(b) {
                a.mouse_leave(b)
            }), this.search_results.bind("mouseup.chosen", function(b) {
                a.search_results_mouseup(b)
            }), this.search_results.bind("mouseover.chosen", function(b) {
                a.search_results_mouseover(b)
            }), this.search_results.bind("mouseout.chosen", function(b) {
                a.search_results_mouseout(b)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(b) {
                a.search_results_mousewheel(b)
            }), this.form_field_jq.bind("chosen:updated.chosen", function(b) {
                a.results_update_field(b)
            }), this.form_field_jq.bind("chosen:activate.chosen", function(b) {
                a.activate_field(b)
            }), this.form_field_jq.bind("chosen:open.chosen", function(b) {
                a.container_mousedown(b)
            }), this.search_field.bind("blur.chosen", function(b) {
                a.input_blur(b)
            }), this.search_field.bind("keyup.chosen", function(b) {
                a.keyup_checker(b)
            }), this.search_field.bind("keydown.chosen", function(b) {
                a.keydown_checker(b)
            }), this.search_field.bind("focus.chosen", function(b) {
                a.input_focus(b)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function(b) {
                a.choices_click(b)
            }) : this.container.bind("click.chosen", function(a) {
                a.preventDefault()
            })
        }, Chosen.prototype.destroy = function() {
            return a(document).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, Chosen.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }, Chosen.prototype.container_mousedown = function(b) {
            return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(document).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, Chosen.prototype.container_mouseup = function(a) {
            return"ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
        }, Chosen.prototype.search_results_mousewheel = function(a) {
            var b, c, d;
            return b = -(null != (c = a.originalEvent) ? c.wheelDelta : void 0) || (null != (d = a.originialEvent) ? d.detail : void 0), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
        }, Chosen.prototype.blur_test = function() {
            return!this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, Chosen.prototype.close_field = function() {
            return a(document).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, Chosen.prototype.activate_field = function() {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, Chosen.prototype.test_active_click = function(b) {
            return this.container.is(a(b.target).closest(".chosen-container")) ? this.active_field = !0 : this.close_field()
        }, Chosen.prototype.results_build = function() {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = SelectParser.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, Chosen.prototype.result_do_highlight = function(a) {
            var b, c, d, e, f;
            if (a.length) {
                if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e)
                    return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
                if (f > c)
                    return this.search_results.scrollTop(c)
            }
        }, Chosen.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, Chosen.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results())
        }, Chosen.prototype.update_results_content = function(a) {
            return this.search_results.html(a)
        }, Chosen.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
        }, Chosen.prototype.set_tab_index = function() {
            var a;
            return this.form_field.tabIndex ? (a = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = a) : void 0
        }, Chosen.prototype.set_label_behavior = function() {
            var b = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function(a) {
                return b.is_multiple ? b.container_mousedown(a) : b.activate_field()
            }) : void 0
        }, Chosen.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, Chosen.prototype.search_results_mouseup = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0
        }, Chosen.prototype.search_results_mouseover = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0
        }, Chosen.prototype.search_results_mouseout = function(b) {
            return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, Chosen.prototype.choice_build = function(b) {
            var c, d, e = this;
            return c = a("<li />", {"class": "search-choice"}).html("<span>" + b.html + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {"class": "search-choice-close", "data-option-array-index": b.array_index}), d.bind("click.chosen", function(a) {
                return e.choice_destroy_link_click(a)
            }), c.append(d)), this.search_container.before(c)
        }, Chosen.prototype.choice_destroy_link_click = function(b) {
            return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
        }, Chosen.prototype.choice_destroy = function(a) {
            return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, Chosen.prototype.results_reset = function() {
            return this.form_field.options[0].selected = !0, this.selected_option_count = null, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, Chosen.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, Chosen.prototype.result_select = function(a) {
            var b, c, d;
            return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? b.removeClass("active-result") : (this.result_single_selected && (this.result_single_selected.removeClass("result-selected"), d = this.result_single_selected[0].getAttribute("data-option-array-index"), this.results_data[d].selected = !1), this.result_single_selected = b), b.addClass("result-selected"), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(c.text), (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[c.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
        }, Chosen.prototype.single_set_selected_text = function(a) {
            return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(a)
        }, Chosen.prototype.result_deselect = function(a) {
            var b;
            return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[b.options_index].value}), this.search_field_scale(), !0)
        }, Chosen.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, Chosen.prototype.get_search_text = function() {
            return this.search_field.val() === this.default_text ? "" : a("<div/>").text(a.trim(this.search_field.val())).html()
        }, Chosen.prototype.winnow_results_set_highlight = function() {
            var a, b;
            return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0
        }, Chosen.prototype.no_results = function(b) {
            var c;
            return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), c.find("span").first().html(b), this.search_results.append(c)
        }, Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }, Chosen.prototype.keydown_arrow = function() {
            var a;
            return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
        }, Chosen.prototype.keyup_arrow = function() {
            var a;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, Chosen.prototype.keydown_backstroke = function() {
            var a;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, Chosen.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, Chosen.prototype.keydown_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
                    break;
                case 13:
                    a.preventDefault();
                    break;
                case 38:
                    a.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    a.preventDefault(), this.keydown_arrow()
                }
        }, Chosen.prototype.search_field_scale = function() {
            var b, c, d, e, f, g, h, i, j;
            if (this.is_multiple) {
                for (d = 0, h = 0, f = "position:absolute; left: -1000px; top: -1000px; display:none;", g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], i = 0, j = g.length; j > i; i++)
                    e = g[i], f += e + ":" + this.search_field.css(e) + ";";
                return b = a("<div />", {style: f}), b.text(this.search_field.val()), a("body").append(b), h = b.width() + 25, b.remove(), c = this.container.outerWidth(), h > c - 10 && (h = c - 10), this.search_field.css({width: h + "px"})
            }
        }, Chosen
    }(AbstractChosen)
}.call(this);
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function($) {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'], toBind = ('onwheel'in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'], slice = Array.prototype.slice, nullLowestDeltaTimeout, lowestDelta;
    if ($.event.fixHooks) {
        for (var i = toFix.length; i; ) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }
    var special = $.event.special.mousewheel = {version: '3.1.9', setup: function() {
            if (this.addEventListener) {
                for (var i = toBind.length; i; ) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        }, teardown: function() {
            if (this.removeEventListener) {
                for (var i = toBind.length; i; ) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }, getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent'in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        }, getPageHeight: function(elem) {
            return $(elem).height();
        }, settings: {adjustOldDeltas: true}};
    $.fn.extend({mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        }, unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }});
    function handler(event) {
        var orgEvent = event || window.event, args = slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';
        if ('detail'in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta'in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY'in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX'in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }
        if ('axis'in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }
        delta = deltaY === 0 ? deltaX : deltaY;
        if ('deltaY'in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX'in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }
        if (deltaY === 0 && deltaX === 0) {
            return;
        }
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.deltaMode = 0;
        args.unshift(event, delta, deltaX, deltaY);
        if (nullLowestDeltaTimeout) {
            clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
        return($.event.dispatch || $.event.handle).apply(this, args);
    }
    function nullLowestDelta() {
        lowestDelta = null;
    }
    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }}
));
(function(t) {
    t.extend(t.fn, {validate: function(e) {
            if (!this.length)
                return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(e) {
                function s() {
                    var s;
                    return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0
                }
                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
            })), i)
        }, valid: function() {
            if (t(this[0]).is("form"))
                return this.validate().form();
            var e = !0, i = t(this[0].form).validate();
            return this.each(function() {
                e = e && i.element(this)
            }), e
        }, removeAttrs: function(e) {
            var i = {}, s = this;
            return t.each(e.split(/\s/), function(t, e) {
                i[e] = s.attr(e), s.removeAttr(e)
            }), i
        }, rules: function(e, i) {
            var s = this[0];
            if (e) {
                var r = t.data(s.form, "validator").settings, n = r.rules, a = t.validator.staticRules(s);
                switch (e) {
                    case"add":
                        t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
                        break;
                    case"remove":
                        if (!i)
                            return delete n[s.name], a;
                        var u = {};
                        return t.each(i.split(/\s/), function(t, e) {
                            u[e] = a[e], delete a[e]
                        }), u
                    }
            }
            var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
            if (o.required) {
                var l = o.required;
                delete o.required, o = t.extend({required: l}, o)
            }
            return o
        }}), t.extend(t.expr[":"], {blank: function(e) {
            return!t.trim("" + t(e).val())
        }, filled: function(e) {
            return!!t.trim("" + t(e).val())
        }, unchecked: function(e) {
            return!t(e).prop("checked")
        }}), t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
        return 1 === arguments.length ? function() {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            e = e.replace(RegExp("\\{" + t + "\\}", "g"), function() {
                return i
            })
        }), e)
    }, t.extend(t.validator, {defaults: {messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "span", focusInvalid: !0, errorContainer: t([]), errorLabelContainer: t([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
            }, onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            }, onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            }, onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            }, highlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
            }, unhighlight: function(e, i, s) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
            }}, setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        }, messages: {required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: t.validator.format("Please enter no more than {0} characters."), minlength: t.validator.format("Please enter at least {0} characters."), rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."), range: t.validator.format("Please enter a value between {0} and {1}."), max: t.validator.format("Please enter a value less than or equal to {0}."), min: t.validator.format("Please enter a value greater than or equal to {0}.")}, autoCreateRanges: !1, prototype: {init: function() {
                function e(e) {
                    var i = t.data(this[0].form, "validator"), s = "on" + e.type.replace(/^validate/, "");
                    i.settings[s] && i.settings[s].call(i, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i = this.groups = {};
                t.each(this.settings.groups, function(e, s) {
                    "string" == typeof s && (s = s.split(/\s/)), t.each(s, function(t, s) {
                        i[s] = e
                    })
                });
                var s = this.settings.rules;
                t.each(s, function(e, i) {
                    s[e] = t.validator.normalizeRule(i)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            }, form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++)
                    this.check(e[t]);
                return this.valid()
            }, element: function(e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var i = this.check(e) !== !1;
                return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            }, showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e)
                        this.errorList.push({message: e[i], element: this.findByName(i)[0]});
                    this.successList = t.grep(this.successList, function(t) {
                        return!(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            }, numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            }, objectLength: function(t) {
                var e = 0;
                for (var i in t)
                    e++;
                return e
            }, hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            }, valid: function() {
                return 0 === this.size()
            }, size: function() {
                return this.errorList.length
            }, focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {
                    }
            }, findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            }, elements: function() {
                var e = this, i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return!this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            }, clean: function(e) {
                return t(e)[0]
            }, errors: function() {
                var e = this.settings.errorClass.replace(" ", ".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            }, reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            }, prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            }, elementValue: function(e) {
                var i = t(e).attr("type"), s = t(e).val();
                return"radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
            }, check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, s = t(e).rules(), r = !1, n = this.elementValue(e);
                for (var a in s) {
                    var u = {method: a, parameters: s[a]};
                    try {
                        if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
                            r = !0;
                            continue
                        }
                        if (r = !1, "pending" === i)
                            return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                        if (!i)
                            return this.formatAndAdd(e, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o
                    }
                }
                return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0)
            }, customDataMessage: function(e, i) {
                return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
            }, customMessage: function(t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            }, findDefined: function() {
                for (var t = 0; arguments.length > t; t++)
                    if (void 0 !== arguments[t])
                        return arguments[t];
                return void 0
            }, defaultMessage: function(e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            }, formatAndAdd: function(e, i) {
                var s = this.defaultMessage(e, i.method), r = /\$?\{(\d+)\}/g;
                "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({message: s, element: e}), this.errorMap[e.name] = s, this.submitted[e.name] = s
            }, addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            }, defaultShowErrors: function() {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var i = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++)
                        this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++)
                        this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function() {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            }, showLabel: function(e, i) {
                var s = this.errorsFor(e);
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
            }, errorsFor: function(e) {
                var i = this.idOrName(e);
                return this.errors().filter(function() {
                    return t(this).attr("for") === i
                })
            }, idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            }, validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            }, checkable: function(t) {
                return/radio|checkbox/i.test(t.type)
            }, findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            }, getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case"select":
                        return t("option:selected", i).length;
                    case"input":
                        if (this.checkable(i))
                            return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            }, depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            }, dependTypes: {"boolean": function(t) {
                    return t
                }, string: function(e, i) {
                    return!!t(e, i.form).length
                }, "function": function(t, e) {
                    return t(e)
                }}, optional: function(e) {
                var i = this.elementValue(e);
                return!t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            }, startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            }, stopRequest: function(e, i) {
                this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {old: null, valid: !0, message: this.defaultMessage(e, "remote")})
            }}, classRuleSettings: {required: {required: !0}, email: {email: !0}, url: {url: !0}, date: {date: !0}, dateISO: {dateISO: !0}, number: {number: !0}, digits: {digits: !0}, creditcard: {creditcard: !0}}, addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        }, classRules: function(e) {
            var i = {}, s = t(e).attr("class");
            return s && t.each(s.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        }, attributeRules: function(e) {
            var i = {}, s = t(e), r = s[0].getAttribute("type");
            for (var n in t.validator.methods) {
                var a;
                "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0)
            }
            return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
        }, dataRules: function(e) {
            var i, s, r = {}, n = t(e);
            for (i in t.validator.methods)
                s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
            return r
        }, staticRules: function(e) {
            var i = {}, s = t.data(e.form, "validator");
            return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
        }, normalizeRules: function(e, i) {
            return t.each(e, function(s, r) {
                if (r === !1)
                    return delete e[s], void 0;
                if (r.param || r.depends) {
                    var n = !0;
                    switch (typeof r.depends) {
                        case"string":
                            n = !!t(r.depends, i.form).length;
                            break;
                        case"function":
                            n = r.depends.call(i, i)
                    }
                    n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
                }
            }), t.each(e, function(s, r) {
                e[s] = t.isFunction(r) ? r(i) : r
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        }, normalizeRule: function(e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }), e = i
            }
            return e
        }, addMethod: function(e, i, s) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        }, methods: {required: function(e, i, s) {
                if (!this.depend(s, i))
                    return"dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
            }, email: function(t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            }, url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            }, date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
            }, dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            }, number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            }, digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            }, creditcard: function(t, e) {
                if (this.optional(e))
                    return"dependency-mismatch";
                if (/[^0-9 \-]+/.test(t))
                    return!1;
                var i = 0, s = 0, r = !1;
                t = t.replace(/\D/g, "");
                for (var n = t.length - 1; n >= 0; n--) {
                    var a = t.charAt(n);
                    s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r
                }
                return 0 === i % 10
            }, minlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s
            }, maxlength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || s >= r
            }, rangelength: function(e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                return this.optional(i) || r >= s[0] && s[1] >= r
            }, min: function(t, e, i) {
                return this.optional(e) || t >= i
            }, max: function(t, e, i) {
                return this.optional(e) || i >= t
            }, range: function(t, e, i) {
                return this.optional(e) || t >= i[0] && i[1] >= t
            }, equalTo: function(e, i, s) {
                var r = t(s);
                return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    t(i).valid()
                }), e === r.val()
            }, remote: function(e, i, s) {
                if (this.optional(i))
                    return"dependency-mismatch";
                var r = this.previousValue(i);
                if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {url: s} || s, r.old === e)
                    return r.valid;
                r.old = e;
                var n = this;
                this.startRequest(i);
                var a = {};
                return a[i.name] = e, t.ajax(t.extend(!0, {url: s, mode: "abort", port: "validate" + i.name, dataType: "json", data: a, success: function(s) {
                        n.settings.messages[i.name].remote = r.originalMessage;
                        var a = s === !0 || "true" === s;
                        if (a) {
                            var u = n.formSubmitted;
                            n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors()
                        } else {
                            var o = {}, l = s || n.defaultMessage(i, "remote");
                            o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o)
                        }
                        r.valid = a, n.stopRequest(i, a)
                    }}, s)), "pending"
            }}}), t.format = t.validator.format
})(jQuery), function(t) {
    var e = {};
    if (t.ajaxPrefilter)
        t.ajaxPrefilter(function(t, i, s) {
            var r = t.port;
            "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s)
        });
    else {
        var i = t.ajax;
        t.ajax = function(s) {
            var r = ("mode"in s ? s : t.ajaxSettings).mode, n = ("port"in s ? s : t.ajaxSettings).port;
            return"abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments)
        }
    }
}(jQuery), function(t) {
    t.extend(t.fn, {validateDelegate: function(e, i, s) {
            return this.bind(i, function(i) {
                var r = t(i.target);
                return r.is(e) ? s.apply(r, arguments) : void 0
            })
        }})
}(jQuery);
!function(a, b, c) {
    a.fn.jScrollPane = function(d) {
        function e(d, e) {
            function f(b) {
                var e, h, j, l, m, n, q = !1, r = !1;
                if (P = b, Q === c)
                    m = d.scrollTop(), n = d.scrollLeft(), d.css({overflow: "hidden", padding: 0}), R = d.innerWidth() + tb, S = d.innerHeight(), d.width(R), Q = a('<div class="jspPane" />').css("padding", sb).append(d.children()), T = a('<div class="jspContainer" />').css({width: R + "px", height: S + "px"}).append(Q).appendTo(d);
                else {
                    if (d.css("width", ""), q = P.stickToBottom && C(), r = P.stickToRight && D(), l = d.innerWidth() + tb != R || d.outerHeight() != S, l && (R = d.innerWidth() + tb, S = d.innerHeight(), T.css({width: R + "px", height: S + "px"})), !l && ub == U && Q.outerHeight() == V)
                        return d.width(R), void 0;
                    ub = U, Q.css("width", ""), d.width(R), T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                Q.css("overflow", "auto"), U = b.contentWidth ? b.contentWidth : Q[0].scrollWidth, V = Q[0].scrollHeight, Q.css("overflow", ""), W = U / R, X = V / S, Y = X > 1, Z = W > 1, Z || Y ? (d.addClass("jspScrollable"), e = P.maintainPosition && (ab || db), e && (h = A(), j = B()), g(), i(), k(), e && (y(r ? U - R : h, !1), x(q ? V - S : j, !1)), H(), E(), N(), P.enableKeyboardNavigation && J(), P.clickOnTrack && o(), L(), P.hijackInternalLinks && M()) : (d.removeClass("jspScrollable"), Q.css({top: 0, left: 0, width: T.width() - tb}), F(), I(), K(), p()), P.autoReinitialise && !rb ? rb = setInterval(function() {
                    f(P)
                }, P.autoReinitialiseDelay) : !P.autoReinitialise && rb && clearInterval(rb), m && d.scrollTop(0) && x(m, !1), n && d.scrollLeft(0) && y(n, !1), d.trigger("jsp-initialised", [Z || Y])
            }
            function g() {
                Y && (T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))), a('<div class="jspCap jspCapBottom" />'))), eb = T.find(">.jspVerticalBar"), fb = eb.find(">.jspTrack"), $ = fb.find(">.jspDrag"), P.showArrows && (jb = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", m(0, -1)).bind("click.jsp", G), kb = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", m(0, 1)).bind("click.jsp", G), P.arrowScrollOnHover && (jb.bind("mouseover.jsp", m(0, -1, jb)), kb.bind("mouseover.jsp", m(0, 1, kb))), l(fb, P.verticalArrowPositions, jb, kb)), hb = S, T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                    hb -= a(this).outerHeight()
                }), $.hover(function() {
                    $.addClass("jspHover")
                }, function() {
                    $.removeClass("jspHover")
                }).bind("mousedown.jsp", function(b) {
                    a("html").bind("dragstart.jsp selectstart.jsp", G), $.addClass("jspActive");
                    var c = b.pageY - $.position().top;
                    return a("html").bind("mousemove.jsp", function(a) {
                        r(a.pageY - c, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", q), !1
                }), h())
            }
            function h() {
                fb.height(hb + "px"), ab = 0, gb = P.verticalGutter + fb.outerWidth(), Q.width(R - gb - tb);
                try {
                    0 === eb.position().left && Q.css("margin-left", gb + "px")
                } catch (a) {
                }
            }
            function i() {
                Z && (T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))), a('<div class="jspCap jspCapRight" />'))), lb = T.find(">.jspHorizontalBar"), mb = lb.find(">.jspTrack"), bb = mb.find(">.jspDrag"), P.showArrows && (pb = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", m(-1, 0)).bind("click.jsp", G), qb = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", m(1, 0)).bind("click.jsp", G), P.arrowScrollOnHover && (pb.bind("mouseover.jsp", m(-1, 0, pb)), qb.bind("mouseover.jsp", m(1, 0, qb))), l(mb, P.horizontalArrowPositions, pb, qb)), bb.hover(function() {
                    bb.addClass("jspHover")
                }, function() {
                    bb.removeClass("jspHover")
                }).bind("mousedown.jsp", function(b) {
                    a("html").bind("dragstart.jsp selectstart.jsp", G), bb.addClass("jspActive");
                    var c = b.pageX - bb.position().left;
                    return a("html").bind("mousemove.jsp", function(a) {
                        t(a.pageX - c, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", q), !1
                }), nb = T.innerWidth(), j())
            }
            function j() {
                T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                    nb -= a(this).outerWidth()
                }), mb.width(nb + "px"), db = 0
            }
            function k() {
                if (Z && Y) {
                    var b = mb.outerHeight(), c = fb.outerWidth();
                    hb -= b, a(lb).find(">.jspCap:visible,>.jspArrow").each(function() {
                        nb += a(this).outerWidth()
                    }), nb -= c, S -= c, R -= b, mb.parent().append(a('<div class="jspCorner" />').css("width", b + "px")), h(), j()
                }
                Z && Q.width(T.outerWidth() - tb + "px"), V = Q.outerHeight(), X = V / S, Z && (ob = Math.ceil(1 / W * nb), ob > P.horizontalDragMaxWidth ? ob = P.horizontalDragMaxWidth : ob < P.horizontalDragMinWidth && (ob = P.horizontalDragMinWidth), bb.width(ob + "px"), cb = nb - ob, u(db)), Y && (ib = Math.ceil(1 / X * hb), ib > P.verticalDragMaxHeight ? ib = P.verticalDragMaxHeight : ib < P.verticalDragMinHeight && (ib = P.verticalDragMinHeight), $.height(ib + "px"), _ = hb - ib, s(ab))
            }
            function l(a, b, c, d) {
                var e, f = "before", g = "after";
                "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? g = b : b == g && (f = b, e = c, c = d, d = e), a[f](c)[g](d)
            }
            function m(a, b, c) {
                return function() {
                    return n(a, b, this, c), this.blur(), !1
                }
            }
            function n(b, c, d, e) {
                d = a(d).addClass("jspActive");
                var f, g, h = !0, i = function() {
                    0 !== b && vb.scrollByX(b * P.arrowButtonSpeed), 0 !== c && vb.scrollByY(c * P.arrowButtonSpeed), g = setTimeout(i, h ? P.initialDelay : P.arrowRepeatFreq), h = !1
                };
                i(), f = e ? "mouseout.jsp" : "mouseup.jsp", e = e || a("html"), e.bind(f, function() {
                    d.removeClass("jspActive"), g && clearTimeout(g), g = null, e.unbind(f)
                })
            }
            function o() {
                p(), Y && fb.bind("mousedown.jsp", function(b) {
                    if (b.originalTarget === c || b.originalTarget == b.currentTarget) {
                        var d, e = a(this), f = e.offset(), g = b.pageY - f.top - ab, h = !0, i = function() {
                            var a = e.offset(), c = b.pageY - a.top - ib / 2, f = S * P.scrollPagePercent, k = _ * f / (V - S);
                            if (0 > g)
                                ab - k > c ? vb.scrollByY(-f) : r(c);
                            else {
                                if (!(g > 0))
                                    return j(), void 0;
                                c > ab + k ? vb.scrollByY(f) : r(c)
                            }
                            d = setTimeout(i, h ? P.initialDelay : P.trackClickRepeatFreq), h = !1
                        }, j = function() {
                            d && clearTimeout(d), d = null, a(document).unbind("mouseup.jsp", j)
                        };
                        return i(), a(document).bind("mouseup.jsp", j), !1
                    }
                }), Z && mb.bind("mousedown.jsp", function(b) {
                    if (b.originalTarget === c || b.originalTarget == b.currentTarget) {
                        var d, e = a(this), f = e.offset(), g = b.pageX - f.left - db, h = !0, i = function() {
                            var a = e.offset(), c = b.pageX - a.left - ob / 2, f = R * P.scrollPagePercent, k = cb * f / (U - R);
                            if (0 > g)
                                db - k > c ? vb.scrollByX(-f) : t(c);
                            else {
                                if (!(g > 0))
                                    return j(), void 0;
                                c > db + k ? vb.scrollByX(f) : t(c)
                            }
                            d = setTimeout(i, h ? P.initialDelay : P.trackClickRepeatFreq), h = !1
                        }, j = function() {
                            d && clearTimeout(d), d = null, a(document).unbind("mouseup.jsp", j)
                        };
                        return i(), a(document).bind("mouseup.jsp", j), !1
                    }
                })
            }
            function p() {
                mb && mb.unbind("mousedown.jsp"), fb && fb.unbind("mousedown.jsp")
            }
            function q() {
                a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), $ && $.removeClass("jspActive"), bb && bb.removeClass("jspActive")
            }
            function r(a, b) {
                Y && (0 > a ? a = 0 : a > _ && (a = _), b === c && (b = P.animateScroll), b ? vb.animate($, "top", a, s) : ($.css("top", a), s(a)))
            }
            function s(a) {
                a === c && (a = $.position().top), T.scrollTop(0), ab = a;
                var b = 0 === ab, e = ab == _, f = a / _, g = -f * (V - S);
                (wb != b || yb != e) && (wb = b, yb = e, d.trigger("jsp-arrow-change", [wb, yb, xb, zb])), v(b, e), Q.css("top", g), d.trigger("jsp-scroll-y", [-g, b, e]).trigger("scroll")
            }
            function t(a, b) {
                Z && (0 > a ? a = 0 : a > cb && (a = cb), b === c && (b = P.animateScroll), b ? vb.animate(bb, "left", a, u) : (bb.css("left", a), u(a)))
            }
            function u(a) {
                a === c && (a = bb.position().left), T.scrollTop(0), db = a;
                var b = 0 === db, e = db == cb, f = a / cb, g = -f * (U - R);
                (xb != b || zb != e) && (xb = b, zb = e, d.trigger("jsp-arrow-change", [wb, yb, xb, zb])), w(b, e), Q.css("left", g), d.trigger("jsp-scroll-x", [-g, b, e]).trigger("scroll")
            }
            function v(a, b) {
                P.showArrows && (jb[a ? "addClass" : "removeClass"]("jspDisabled"), kb[b ? "addClass" : "removeClass"]("jspDisabled"))
            }
            function w(a, b) {
                P.showArrows && (pb[a ? "addClass" : "removeClass"]("jspDisabled"), qb[b ? "addClass" : "removeClass"]("jspDisabled"))
            }
            function x(a, b) {
                var c = a / (V - S);
                r(c * _, b)
            }
            function y(a, b) {
                var c = a / (U - R);
                t(c * cb, b)
            }
            function z(b, c, d) {
                var e, f, g, h, i, j, k, l, m, n = 0, o = 0;
                try {
                    e = a(b)
                } catch (p) {
                    return
                }
                for (f = e.outerHeight(), g = e.outerWidth(), T.scrollTop(0), T.scrollLeft(0); !e.is(".jspPane"); )
                    if (n += e.position().top, o += e.position().left, e = e.offsetParent(), /^body|html$/i.test(e[0].nodeName))
                        return;
                h = B(), j = h + S, h > n || c ? l = n - P.horizontalGutter : n + f > j && (l = n - S + f + P.horizontalGutter), isNaN(l) || x(l, d), i = A(), k = i + R, i > o || c ? m = o - P.horizontalGutter : o + g > k && (m = o - R + g + P.horizontalGutter), isNaN(m) || y(m, d)
            }
            function A() {
                return-Q.position().left
            }
            function B() {
                return-Q.position().top
            }
            function C() {
                var a = V - S;
                return a > 20 && a - B() < 10
            }
            function D() {
                var a = U - R;
                return a > 20 && a - A() < 10
            }
            function E() {
                T.unbind(Bb).bind(Bb, function(a, b, c, d) {
                    var e = db, f = ab, g = a.deltaFactor || P.mouseWheelSpeed;
                    return vb.scrollBy(c * g, -d * g, !1), e == db && f == ab
                })
            }
            function F() {
                T.unbind(Bb)
            }
            function G() {
                return!1
            }
            function H() {
                Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(a) {
                    z(a.target, !1)
                })
            }
            function I() {
                Q.find(":input,a").unbind("focus.jsp")
            }
            function J() {
                function b() {
                    var a = db, b = ab;
                    switch (c) {
                        case 40:
                            vb.scrollByY(P.keyboardSpeed, !1);
                            break;
                        case 38:
                            vb.scrollByY(-P.keyboardSpeed, !1);
                            break;
                        case 34:
                        case 32:
                            vb.scrollByY(S * P.scrollPagePercent, !1);
                            break;
                        case 33:
                            vb.scrollByY(-S * P.scrollPagePercent, !1);
                            break;
                        case 39:
                            vb.scrollByX(P.keyboardSpeed, !1);
                            break;
                        case 37:
                            vb.scrollByX(-P.keyboardSpeed, !1)
                    }
                    return e = a != db || b != ab
                }
                var c, e, f = [];
                Z && f.push(lb[0]), Y && f.push(eb[0]), Q.focus(function() {
                    d.focus()
                }), d.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(d) {
                    if (d.target === this || f.length && a(d.target).closest(f).length) {
                        var g = db, h = ab;
                        switch (d.keyCode) {
                            case 40:
                            case 38:
                            case 34:
                            case 32:
                            case 33:
                            case 39:
                            case 37:
                                c = d.keyCode, b();
                                break;
                            case 35:
                                x(V - S), c = null;
                                break;
                            case 36:
                                x(0), c = null
                        }
                        return e = d.keyCode == c && g != db || h != ab, !e
                    }
                }).bind("keypress.jsp", function(a) {
                    return a.keyCode == c && b(), !e
                }), P.hideFocus ? (d.css("outline", "none"), "hideFocus"in T[0] && d.attr("hideFocus", !0)) : (d.css("outline", ""), "hideFocus"in T[0] && d.attr("hideFocus", !1))
            }
            function K() {
                d.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
            }
            function L() {
                if (location.hash && location.hash.length > 1) {
                    var b, c, d = escape(location.hash.substr(1));
                    try {
                        b = a("#" + d + ', a[name="' + d + '"]')
                    } catch (e) {
                        return
                    }
                    b.length && Q.find(d) && (0 === T.scrollTop() ? c = setInterval(function() {
                        T.scrollTop() > 0 && (z(b, !0), a(document).scrollTop(T.position().top), clearInterval(c))
                    }, 50) : (z(b, !0), a(document).scrollTop(T.position().top)))
                }
            }
            function M() {
                a(document.body).data("jspHijack") || (a(document.body).data("jspHijack", !0), a(document.body).delegate("a[href*=#]", "click", function(c) {
                    var d, e, f, g, h, i, j = this.href.substr(0, this.href.indexOf("#")), k = location.href;
                    if (-1 !== location.href.indexOf("#") && (k = location.href.substr(0, location.href.indexOf("#"))), j === k) {
                        d = escape(this.href.substr(this.href.indexOf("#") + 1));
                        try {
                            e = a("#" + d + ', a[name="' + d + '"]')
                        } catch (l) {
                            return
                        }
                        e.length && (f = e.closest(".jspScrollable"), g = f.data("jsp"), g.scrollToElement(e, !0), f[0].scrollIntoView && (h = a(b).scrollTop(), i = e.offset().top, (h > i || i > h + a(b).height()) && f[0].scrollIntoView()), c.preventDefault())
                    }
                }))
            }
            function N() {
                var a, b, c, d, e, f = !1;
                T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(g) {
                    var h = g.originalEvent.touches[0];
                    a = A(), b = B(), c = h.pageX, d = h.pageY, e = !1, f = !0
                }).bind("touchmove.jsp", function(g) {
                    if (f) {
                        var h = g.originalEvent.touches[0], i = db, j = ab;
                        return vb.scrollTo(a + c - h.pageX, b + d - h.pageY), e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5, i == db && j == ab
                    }
                }).bind("touchend.jsp", function() {
                    f = !1
                }).bind("click.jsp-touchclick", function() {
                    return e ? (e = !1, !1) : void 0
                })
            }
            function O() {
                var a = B(), b = A();
                d.removeClass("jspScrollable").unbind(".jsp"), d.replaceWith(Ab.append(Q.children())), Ab.scrollTop(a), Ab.scrollLeft(b), rb && clearInterval(rb)
            }
            var P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb = this, wb = !0, xb = !0, yb = !1, zb = !1, Ab = d.clone(!1, !1).empty(), Bb = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            "border-box" === d.css("box-sizing") ? (sb = 0, tb = 0) : (sb = d.css("paddingTop") + " " + d.css("paddingRight") + " " + d.css("paddingBottom") + " " + d.css("paddingLeft"), tb = (parseInt(d.css("paddingLeft"), 10) || 0) + (parseInt(d.css("paddingRight"), 10) || 0)), a.extend(vb, {reinitialise: function(b) {
                    b = a.extend({}, P, b), f(b)
                }, scrollToElement: function(a, b, c) {
                    z(a, b, c)
                }, scrollTo: function(a, b, c) {
                    y(a, c), x(b, c)
                }, scrollToX: function(a, b) {
                    y(a, b)
                }, scrollToY: function(a, b) {
                    x(a, b)
                }, scrollToPercentX: function(a, b) {
                    y(a * (U - R), b)
                }, scrollToPercentY: function(a, b) {
                    x(a * (V - S), b)
                }, scrollBy: function(a, b, c) {
                    vb.scrollByX(a, c), vb.scrollByY(b, c)
                }, scrollByX: function(a, b) {
                    var c = A() + Math[0 > a ? "floor" : "ceil"](a), d = c / (U - R);
                    t(d * cb, b)
                }, scrollByY: function(a, b) {
                    var c = B() + Math[0 > a ? "floor" : "ceil"](a), d = c / (V - S);
                    r(d * _, b)
                }, positionDragX: function(a, b) {
                    t(a, b)
                }, positionDragY: function(a, b) {
                    r(a, b)
                }, animate: function(a, b, c, d) {
                    var e = {};
                    e[b] = c, a.animate(e, {duration: P.animateDuration, easing: P.animateEase, queue: !1, step: d})
                }, getContentPositionX: function() {
                    return A()
                }, getContentPositionY: function() {
                    return B()
                }, getContentWidth: function() {
                    return U
                }, getContentHeight: function() {
                    return V
                }, getPercentScrolledX: function() {
                    return A() / (U - R)
                }, getPercentScrolledY: function() {
                    return B() / (V - S)
                }, getIsScrollableH: function() {
                    return Z
                }, getIsScrollableV: function() {
                    return Y
                }, getContentPane: function() {
                    return Q
                }, scrollToBottom: function(a) {
                    r(_, a)
                }, hijackInternalLinks: a.noop, destroy: function() {
                    O()
                }}), f(e)
        }
        return d = a.extend({}, a.fn.jScrollPane.defaults, d), a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
            d[this] = d[this] || d.speed
        }), this.each(function() {
            var b = a(this), c = b.data("jsp");
            c ? c.reinitialise(d) : (a("script", b).filter('[type="text/javascript"],:not([type])').remove(), c = new e(b, d), b.data("jsp", c))
        })
    }, a.fn.jScrollPane.defaults = {showArrows: !1, maintainPosition: !0, stickToBottom: !1, stickToRight: !1, clickOnTrack: !0, autoReinitialise: !1, autoReinitialiseDelay: 500, verticalDragMinHeight: 0, verticalDragMaxHeight: 99999, horizontalDragMinWidth: 0, horizontalDragMaxWidth: 99999, contentWidth: c, animateScroll: !1, animateDuration: 300, animateEase: "linear", hijackInternalLinks: !1, verticalGutter: 4, horizontalGutter: 4, mouseWheelSpeed: 3, arrowButtonSpeed: 0, arrowRepeatFreq: 50, arrowScrollOnHover: !1, trackClickSpeed: 0, trackClickRepeatFreq: 70, verticalArrowPositions: "split", horizontalArrowPositions: "split", enableKeyboardNavigation: !0, hideFocus: !1, keyboardSpeed: 0, initialDelay: 300, speed: 30, scrollPagePercent: .8}
}(jQuery, this);
(function(r, G, f, v) {
    var J = f("html"), n = f(r), p = f(G), b = f.fancybox = function() {
        b.open.apply(this, arguments)
    }, I = navigator.userAgent.match(/msie/i), B = null, s = G.createTouch !== v, t = function(a) {
        return a && a.hasOwnProperty && a instanceof f
    }, q = function(a) {
        return a && "string" === f.type(a)
    }, E = function(a) {
        return q(a) && 0 < a.indexOf("%")
    }, l = function(a, d) {
        var e = parseInt(a, 10) || 0;
        d && E(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }, w = function(a, b) {
        return l(a, b) + "px"
    };
    f.extend(b, {version: "2.1.5", defaults: {padding: 15, margin: 20, width: 800, height: 600, minWidth: 100, minHeight: 100, maxWidth: 9999, maxHeight: 9999, pixelRatio: 1, autoSize: !0, autoHeight: !1, autoWidth: !1, autoResize: !0, autoCenter: !s, fitToView: !0, aspectRatio: !1, topRatio: 0.5, leftRatio: 0.5, scrolling: "auto", wrapCSS: "", arrows: !0, closeBtn: !0, closeClick: !1, nextClick: !1, mouseWheel: !0, autoPlay: !1, playSpeed: 3E3, preload: 3, modal: !1, loop: !0, ajax: {dataType: "html", headers: {"X-fancyBox": !0}}, iframe: {scrolling: "auto", preload: !0}, swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"}, keys: {next: {13: "left", 34: "up", 39: "left", 40: "up"}, prev: {8: "right", 33: "down", 37: "right", 38: "down"}, close: [27], play: [32], toggle: [70]}, direction: {next: "left", prev: "right"}, scrollOutside: !0, index: 0, type: null, href: null, content: null, title: null, tpl: {wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>', image: '<img class="fancybox-image" src="{href}" alt="" />', iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                        (I ? ' allowtransparency="true"' : "") + "></iframe>", error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>', closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>', next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>', prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'}, openEffect: "fade", openSpeed: 250, openEasing: "swing", openOpacity: !0, openMethod: "zoomIn", closeEffect: "fade", closeSpeed: 250, closeEasing: "swing", closeOpacity: !0, closeMethod: "zoomOut", nextEffect: "elastic", nextSpeed: 250, nextEasing: "swing", nextMethod: "changeIn", prevEffect: "elastic", prevSpeed: 250, prevEasing: "swing", prevMethod: "changeOut", helpers: {overlay: !0, title: !0}, onCancel: f.noop, beforeLoad: f.noop, afterLoad: f.noop, beforeShow: f.noop, afterShow: f.noop, beforeChange: f.noop, beforeClose: f.noop, afterClose: f.noop}, group: {}, opts: {}, previous: null, coming: null, current: null, isActive: !1, isOpen: !1, isOpened: !1, wrap: null, skin: null, outer: null, inner: null, player: {timer: null, isActive: !1}, ajaxLoad: null, imgPreload: null, transitions: {}, helpers: {}, open: function(a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))
                return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                    var k = {}, g, h, j, m, l;
                    "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {href: c.data("fancybox-href") || c.attr("href"), title: c.data("fancybox-title") || c.attr("title"), isDom: !0, element: c}, f.metadata && f.extend(!0, k, c.metadata())) : k = c);
                    g = d.href || k.href || (q(c) ? c : null);
                    h = d.title !== v ? d.title : k.title || "";
                    m = (j = d.content || k.content) ? "html" : d.type || k.type;
                    !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
                    q(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : q(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
                    j || ("inline" === m ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g && k.isDom) && (m = "inline", j = c));
                    f.extend(k, {href: g, type: m, content: j, title: h, selector: l});
                    a[e] = k
                }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        }, cancel: function() {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current || b._afterZoomOut(a))
        }, close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        }, play: function(a) {
            var d = function() {
                clearTimeout(b.player.timer)
            }, e = function() {
                d();
                b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
            }, c = function() {
                d();
                p.unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1))
                    b.player.isActive = !0, p.bind({"onCancel.player beforeClose.player": c, "onUpdate.player": e, "beforeLoad.player": d}), e(), b.trigger("onPlayStart")
            } else
                c()
        }, next: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        }, prev: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        }, jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a)))
        }, reposition: function(a, d) {
            var e = b.current, c = e ? e.wrap : null, k;
            c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k)))
        }, update: function(a) {
            var d = a && a.type, e = !d || "orientationchange" === d;
            e && (clearTimeout(B), B = null);
            b.isOpen && !B && (B = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), B = null)
            }, e && !s ? 0 : 300))
        }, toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")), b.update())
        }, hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        }, showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                if (27 === (a.which || a.keyCode))
                    a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({position: "absolute", top: 0.5 * d.h + d.y, left: 0.5 * d.w + d.x}))
        }, getViewport: function() {
            var a = b.current && b.current.locked || !1, d = {x: n.scrollLeft(), y: n.scrollTop()};
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height());
            return d
        }, unbindEvents: function() {
            b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            n.unbind(".fb")
        }, bindEvents: function() {
            var a = b.current, d;
            a && (n.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c = e.which || e.keyCode, k = e.target || e.srcElement;
                if (27 === c && b.coming)
                    return!1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function(d, k) {
                    if (1 < a.group.length && k[c] !== v)
                        return b[d](k[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, k))
                        return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap"); )
                    j = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < k)
                        b.prev(0 < g ? "down" : "left");
                    else if (0 > g || 0 > k)
                        b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        }, trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)
                    return!1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a]))
                        b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                });
                p.trigger(a)
            }
        }, isImage: function(a) {
            return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        }, isSWF: function(a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        }, _start: function(a) {
            var d = {}, e, c;
            a = l(a);
            e = b.group[a] || null;
            if (!e)
                return!1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {closeBtn: !1, closeClick: !1, nextClick: !1, arrows: !1, mouseWheel: !1, keys: null, helpers: {overlay: {closeClick: !1}}});
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))
                b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c)
                    return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c)
                    d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && s && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {skin: f(".fancybox-skin", d.wrap), outer: f(".fancybox-outer", d.wrap), inner: f(".fancybox-inner", d.wrap)});
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, w(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)
                        return b._error("content")
                } else if (!e)
                    return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        }, _error: function(a) {
            f.extend(b.coming, {type: "html", autoWidth: !0, autoHeight: !0, minWidth: 0, minHeight: 0, scrolling: "no", hasError: a, content: b.coming.tpl.error});
            b._afterLoad()
        }, _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width = this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        }, _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {url: a.href, error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                }, success: function(d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }}))
        }, _loadIframe: function() {
            var a = b.coming, d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function() {
                f(this).data("ready", 1);
                s || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        }, _preloadImages: function() {
            var a = b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)
                f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        }, _afterLoad: function() {
            var a = b.coming, d = b.current, e, c, k, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d))
                    a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    k = a.scrolling;
                    f.extend(b, {wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d});
                    g = a.href;
                    switch (c) {
                        case"inline":
                        case"ajax":
                        case"html":
                            a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case"image":
                            e = a.tpl.image.replace("{href}", g);
                            break;
                        case"swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                                e += '<param name="' + a + '" value="' + b + '"></param>';
                                h += " " + a + '="' + b + '"'
                            }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                    }
                    (!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === k ? "scroll" : "no" === k ? "hidden" : k);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (b.isOpened) {
                        if (d.prevMethod)
                            b.transitions[d.prevMethod]()
                    } else
                        f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        }, _setDimension: function() {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, k = b.skin, g = b.inner, h = b.current, c = h.width, j = h.height, m = h.minWidth, u = h.minHeight, n = h.maxWidth, p = h.maxHeight, s = h.scrolling, q = h.scrollOutside ? h.scrollbarWidth : 0, x = h.margin, y = l(x[1] + x[3]), r = l(x[0] + x[2]), v, z, t, C, A, F, B, D, H;
            e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            x = l(k.outerWidth(!0) - k.width());
            v = l(k.outerHeight(!0) - k.height());
            z = y + x;
            t = r + v;
            C = E(c) ? (a.w - z) * l(c) / 100 : c;
            A = E(j) ? (a.h - t) * l(j) / 100 : j;
            if ("iframe" === h.type) {
                if (H = h.content, h.autoHeight && 1 === H.data("ready"))
                    try {
                        H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find("body"), q && F.css("overflow-x", "hidden"), A = F.outerHeight(!0))
                    } catch (G) {
                    }
            } else if (h.autoWidth || h.autoHeight)
                g.addClass("fancybox-tmp"), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass("fancybox-tmp");
            c = l(C);
            j = l(A);
            D = C / A;
            m = l(E(m) ? l(m, "w") - z : m);
            n = l(E(n) ? l(n, "w") - z : n);
            u = l(E(u) ? l(u, "h") - t : u);
            p = l(E(p) ? l(p, "h") - t : p);
            F = n;
            B = p;
            h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p));
            z = a.w - y;
            r = a.h - r;
            h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight && "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p)));
            if (h.fitToView)
                if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio)
                    for (; (a > z || y > r) && (c > m && j > u) && !(19 < d++); )
                        j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height();
                else
                    c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r)));
            q && ("auto" === s && j < A && c + x + q < z) && (c += q);
            g.width(c).height(j);
            e.width(c + x);
            a = e.width();
            y = e.height();
            e = (a > z || y > r) && c > m && j > u;
            c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
            f.extend(h, {dim: {width: w(a), height: w(y)}, origWidth: C, origHeight: A, canShrink: e, canExpand: c, wPadding: x, hPadding: v, wrapSpace: y - k.outerHeight(!0), skinSpace: k.height() - j});
            !H && (h.autoHeight && j > u && j < p && !c) && g.height("auto")
        }, _getPosition: function(a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3], g = b.wrap.height() + c[0] + c[2], c = {position: "absolute", top: c[0], left: c[3]};
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        }, _afterZoomIn: function() {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        }, _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {group: {}, opts: {}, router: !1, current: null, isActive: !1, isOpened: !1, isOpen: !1, isClosing: !1, wrap: null, skin: null, outer: null, inner: null});
            b.trigger("afterClose", a)
        }});
    b.transitions = {getOrigPosition: function() {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, j = a.wPadding, m = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)
                c.top -= m.y, c.left -= m.x;
            return c = {top: w(c.top - h * a.topRatio), left: w(c.left - j * a.leftRatio), width: w(f + j), height: w(g + h)}
        }, step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace, h = c.skinSpace;
            if ("width" === f || "height" === f)
                e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" === f ? c : c - g * e - h * e))
        }, zoomIn: function() {
            var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, k = f.extend({opacity: 1}, d);
            delete k.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(k, {duration: "none" === e ? 0 : a.openSpeed, easing: a.openEasing, step: c ? this.step : null, complete: b._afterZoomIn})
        }, zoomOut: function() {
            var a = b.current, d = a.closeEffect, e = "elastic" === d, c = {opacity: 0.1};
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c, {duration: "none" === d ? 0 : a.closeSpeed, easing: a.closeEasing, step: e ? this.step : null, complete: b._afterZoomOut})
        }, changeIn: function() {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {opacity: 1}, f = b.direction, g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = w(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = w(l(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn})
        }, changeOut: function() {
            var a = b.previous, d = a.prevEffect, e = {opacity: 0.1}, c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function() {
                    f(this).trigger("onReset").remove()
                }})
        }};
    b.helpers.overlay = {defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0}, overlay: null, fixed: !1, el: f("html"), create: function(a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        }, open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (n.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (f(a.target).hasClass("fancybox-overlay"))
                    return b.isActive ? b.close() : d.close(), !1
            });
            this.overlay.css(a.css).show()
        }, close: function() {
            var a, b;
            n.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {overlay: null, fixed: !1})
        }, update: function() {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        }, onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        }, beforeShow: function(a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function() {
                return"fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(e).scrollLeft(c));
            this.open(a)
        }, onUpdate: function() {
            this.fixed || this.update()
        }, afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }};
    b.helpers.title = {defaults: {type: "float", position: "bottom"}, beforeShow: function(a) {
            var d = b.current, e = d.title, c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (q(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case"inside":
                        c = b.skin;
                        break;
                    case"outside":
                        c = b.wrap;
                        break;
                    case"over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }};
    f.fn.fancybox = function(a) {
        var d, e = f(this), c = this.selector || "", k = function(g) {
            var h = f(this).blur(), j = d, k, l;
            !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l + '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
        };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function() {
        var a, d;
        f.scrollbarWidth === v && (f.scrollbarWidth = function() {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(), b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        if (f.support.fixedPosition === v) {
            a = f.support;
            d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var e = 20 === d[0].offsetTop || 15 === d[0].offsetTop;
            d.remove();
            a.fixedPosition = e
        }
        f.extend(b.defaults, {scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body")});
        a = f(r).width();
        J.addClass("fancybox-lock-test");
        d = f(r).width();
        J.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var
            utils = (function() {
                return{escapeRegExChars: function(value) {
                        return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    }, createNode: function(containerClass) {
                        var div = document.createElement('div');
                        div.className = containerClass;
                        div.style.position = 'absolute';
                        div.style.display = 'none';
                        return div;
                    }};
            }()), keys = {ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
    function Autocomplete(el, options) {
        var noop = function() {
        }, that = this, defaults = {autoSelectFirst: false, appendTo: 'body', serviceUrl: null, lookup: null, onSelect: null, width: 'auto', minChars: 1, maxHeight: 300, deferRequestBy: 0, params: {}, formatResult: Autocomplete.formatResult, delimiter: null, zIndex: 9999, type: 'GET', noCache: false, onSearchStart: noop, onSearchComplete: noop, onSearchError: noop, containerClass: 'autocomplete-suggestions', tabDisabled: false, dataType: 'text', currentRequest: null, triggerSelectOnValidInput: true, preventBadQueries: true, lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
                return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
            }, paramName: 'query', transformResult: function(response) {
                return typeof response === 'string' ? $.parseJSON(response) : response;
            }};
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {selected: 'autocomplete-selected', suggestion: 'autocomplete-suggestion'};
        that.hint = null;
        that.hintValue = '';
        that.selection = null;
        that.initialize();
        that.setOptions(options);
    }
    Autocomplete.utils = utils;
    $.Autocomplete = Autocomplete;
    Autocomplete.formatResult = function(suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';
        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };
    Autocomplete.prototype = {killerFn: null, initialize: function() {
            var that = this, suggestionSelector = '.' + that.classes.suggestion, selected = that.classes.selected, options = that.options, container;
            that.element.setAttribute('autocomplete', 'off');
            that.killerFn = function(e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };
            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);
            container = $(that.suggestionsContainer);
            container.appendTo(options.appendTo);
            if (options.width !== 'auto') {
                container.width(options.width);
            }
            container.on('mouseover.autocomplete', suggestionSelector, function() {
                that.activate($(this).data('index'));
            });
            container.on('mouseout.autocomplete', function() {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });
            container.on('click.autocomplete', suggestionSelector, function() {
                that.select($(this).data('index'));
            });
            that.fixPosition();
            that.fixPositionCapture = function() {
                if (that.visible) {
                    that.fixPosition();
                }
            };
            $(window).on('resize.autocomplete', that.fixPositionCapture);
            that.el.on('keydown.autocomplete', function(e) {
                that.onKeyPress(e);
            });
            that.el.on('keyup.autocomplete', function(e) {
                that.onKeyUp(e);
            });
            that.el.on('blur.autocomplete', function() {
                that.onBlur();
            });
            that.el.on('focus.autocomplete', function() {
                that.onFocus();
            });
            that.el.on('change.autocomplete', function(e) {
                that.onKeyUp(e);
            });
        }, onFocus: function() {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        }, onBlur: function() {
            this.enableKillerFn();
        }, setOptions: function(suppliedOptions) {
            var that = this, options = that.options;
            $.extend(options, suppliedOptions);
            that.isLocal = $.isArray(options.lookup);
            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }
            $(that.suggestionsContainer).css({'max-height': options.maxHeight + 'px', 'width': options.width + 'px', 'z-index': options.zIndex});
        }, clearCache: function() {
            this.cachedResponse = {};
            this.badQueries = [];
        }, clear: function() {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        }, disable: function() {
            var that = this;
            that.disabled = true;
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        }, enable: function() {
            this.disabled = false;
        }, fixPosition: function() {
            var that = this, offset, styles;
            if (that.options.appendTo !== 'body') {
                return;
            }
            offset = that.el.offset();
            styles = {top: (offset.top + that.el.outerHeight()) - 2 + 'px', left: offset.left + 'px'};
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }
            $(that.suggestionsContainer).css(styles);
        }, enableKillerFn: function() {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        }, disableKillerFn: function() {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        }, killSuggestions: function() {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function() {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        }, stopKillSuggestions: function() {
            window.clearInterval(this.intervalId);
        }, isCursorAtEnd: function() {
            var that = this, valLength = that.el.val().length, selectionStart = that.element.selectionStart, range;
            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        }, onKeyPress: function(e) {
            var that = this;
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }
            if (that.disabled || !that.visible) {
                return;
            }
            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (e.which === keys.TAB && that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }, onKeyUp: function(e) {
            var that = this;
            if (that.disabled) {
                return;
            }
            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }
            clearInterval(that.onChangeInterval);
            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    that.onChangeInterval = setInterval(function() {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        }, onValueChange: function() {
            var that = this, options = that.options, value = that.el.val(), query = that.getQuery(value), index;
            if (that.selection) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }
            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        }, findSuggestionIndex: function(query) {
            var that = this, index = -1, queryLowerCase = query.toLowerCase();
            $.each(that.suggestions, function(i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });
            return index;
        }, getQuery: function(value) {
            var delimiter = this.options.delimiter, parts;
            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        }, getSuggestionsLocal: function(query) {
            var that = this, options = that.options, queryLowerCase = query.toLowerCase(), filter = options.lookupFilter, limit = parseInt(options.lookupLimit, 10), data;
            data = {suggestions: $.grep(options.lookup, function(suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })};
            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }
            return data;
        }, getSuggestions: function(q) {
            var response, that = this, options = that.options, serviceUrl = options.serviceUrl, params, cacheKey;
            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;
            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }
            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
            } else if (!that.isBadQuery(q)) {
                if (options.onSearchStart.call(that.element, options.params) === false) {
                    return;
                }
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }
                that.currentRequest = $.ajax({url: serviceUrl, data: params, type: options.type, dataType: options.dataType}).done(function(data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            }
        }, isBadQuery: function(q) {
            if (!this.options.preventBadQueries) {
                return false;
            }
            var badQueries = this.badQueries, i = badQueries.length;
            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }
            return false;
        }, hide: function() {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        }, suggest: function() {
            if (this.suggestions.length === 0) {
                this.hide();
                return;
            }
            var that = this, options = that.options, formatResult = options.formatResult, value = that.getQuery(that.currentValue), className = that.classes.suggestion, classSelected = that.classes.selected, container = $(that.suggestionsContainer), beforeRender = options.beforeRender, html = '', index, width;
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }
            $.each(that.suggestions, function(i, suggestion) {
                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
            container.html(html);
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.children().first().addClass(classSelected);
            }
            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }
            container.show();
            that.visible = true;
            that.findBestHint();
        }, findBestHint: function() {
            var that = this, value = that.el.val().toLowerCase(), bestMatch = null;
            if (!value) {
                return;
            }
            $.each(that.suggestions, function(i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return!foundMatch;
            });
            that.signalHint(bestMatch);
        }, signalHint: function(suggestion) {
            var hintValue = '', that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        }, verifySuggestionsFormat: function(suggestions) {
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function(value) {
                    return{value: value, data: null};
                });
            }
            return suggestions;
        }, processResponse: function(result, originalQuery, cacheKey) {
            var that = this, options = that.options;
            result.suggestions = that.verifySuggestionsFormat(result.suggestions);
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }
            that.suggestions = result.suggestions;
            that.suggest();
        }, activate: function(index) {
            var that = this, activeItem, selected = that.classes.selected, container = $(that.suggestionsContainer), children = container.children();
            container.children('.' + selected).removeClass(selected);
            that.selectedIndex = index;
            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }
            return null;
        }, selectHint: function() {
            var that = this, i = $.inArray(that.hint, that.suggestions);
            that.select(i);
        }, select: function(i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        }, moveUp: function() {
            var that = this;
            if (that.selectedIndex === -1) {
                return;
            }
            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }
            that.adjustScroll(that.selectedIndex - 1);
        }, moveDown: function() {
            var that = this;
            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }
            that.adjustScroll(that.selectedIndex + 1);
        }, adjustScroll: function(index) {
            var that = this, activeItem = that.activate(index), offsetTop, upperBound, lowerBound, heightDelta = 25;
            if (!activeItem) {
                return;
            }
            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;
            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }
            that.el.val(that.getValue(that.suggestions[index].value));
            that.signalHint(null);
        }, onSelect: function(index) {
            var that = this, onSelectCallback = that.options.onSelect, suggestion = that.suggestions[index];
            that.currentValue = that.getValue(suggestion.value);
            if (that.currentValue !== that.el.val()) {
                that.el.val(that.currentValue);
            }
            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;
            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        }, getValue: function(value) {
            var that = this, delimiter = that.options.delimiter, currentValue, parts;
            if (!delimiter) {
                return value;
            }
            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);
            if (parts.length === 1) {
                return value;
            }
            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        }, dispose: function() {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }};
    $.fn.autocomplete = function(options, args) {
        var dataKey = 'autocomplete';
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }
        return this.each(function() {
            var inputElement = $(this), instance = inputElement.data(dataKey);
            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));
Array.prototype.indexOf = function(o, i) {
    for (var j = this.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; i < j && this[i] !== o; i++)
        ;
    return j <= i ? -1 : i;
};
$.fn.extend({flash: function(opt) {
        var has, cv, ie;
        function attr(a, b) {
            return' ' + a + '="' + b + '"';
        }
        function param(a, b) {
            return'<param name="' + a + '" value="' + b + '" />';
        }
        var p = navigator.plugins;
        if (p && p.length) {
            var f = p['Shockwave Flash'];
            if (f) {
                has = true;
                if (f.description)
                    cv = f.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".");
            }
            if (p['Shockwave Flash 2.0']) {
                has = true;
                cv = '2.0.0.11';
            }
        } else {
            try {
                var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            } catch (e) {
                try {
                    var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    cv = [6, 0, 21];
                    has = true;
                } catch (e) {
                }
                ;
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (e) {
                }
                ;
            }
            if (axo != null) {
                cv = axo.GetVariable("$version").split(" ")[1].split(",");
                has = true;
                ie = true;
            }
        }
        $(this).each(function() {
            if (has) {
                var e = $(this), s = $.extend({'id': e.attr('id'), 'class': e.attr('class'), 'width': e.width(), 'height': e.height(), 'src': e.attr('href'), 'classid': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000', 'pluginspace': 'get.adobe.com/flashplayer', 'availattrs': ['id', 'class', 'width', 'height', 'src'], 'availparams': ['src', 'bgcolor', 'quality', 'allowscriptaccess', 'allowfullscreen', 'flashvars', 'wmode'], 'version': '9.0.24'}, opt), a = s.availattrs, b = s.availparams, rv = s.version.split('.'), o = '<object';
                if (!s.codebase) {
                    s.codebase = 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + rv.join(',');
                }
                if (s.express) {
                    for (var i in cv) {
                        if (parseInt(cv[i]) > parseInt(rv[i])) {
                            break;
                        }
                        if (parseInt(cv[i]) < parseInt(rv[i])) {
                            s.src = s.express;
                        }
                    }
                }
                if (s.flashvars) {
                    s.flashvars = unescape($.param(s.flashvars));
                }
                a = ie ? a.concat(['classid', 'codebase']) : a.concat(['pluginspage']);
                for (k in a) {
                    var n = (k == a.indexOf('src')) ? 'data' : a[k];
                    o += s[a[k]] ? attr(n, s[a[k]]) : '';
                }
                ;
                o += '>';
                for (k in b) {
                    var n = (k == b.indexOf('src')) ? 'movie' : b[k];
                    o += s[b[k]] ? param(n, s[b[k]]) : '';
                }
                ;
                o += '</object>';
                e.replaceWith(o);
            }
            return this;
        });
    }});
$(document).ready(function() {
    $('.header-div li:nth-child(2)').css({'padding': '5px 2.27273%', 'width': '60.6%'});
    $('.tr-div > ul > li:nth-child(2)').css({'width': '12%'});
    $('.tr-div > ul > li:nth-child(3)').css({'width': '36.2909%'});
    $('.previews li a').hover(function(e) {
        $(this).find('.description').fadeIn(300, function() {
            dinamic_height();
        });
    }, function(e) {
        $(this).find('.description').fadeOut(300);
    });
    function dinamic_height() {
        if ($.exists('.description')) {
            $('.description').each(function(index, element) {
                $(this).innerHeight($(this).closest('figure').find('img').height());
            });
        }
        ;
    }
    ;
    dinamic_height();
    function anchor_function() {
        if ($.exists('#full-cast-link')) {
            $('#full-cast-link').on('click', function() {
                var href_link = $(this).attr('href');
                y = $(href_link).offset().top;
                $('body,html').animate({scrollTop: y}, 'slow');
                return false;
            });
        }
        ;
    }
    ;
    anchor_function()
    $('#main-nav > ul > li').hover(function(e) {
        if ($(this).find('a').attr('rel') === 'submenu') {
            $('.submenu').slideDown(300);
            $('.hover-element').slideDown(300);
            var h = $('.submenu').outerHeight();
            $(this).append('<span class="cover-span"><span>');
            $('.cover-span').css({'position': 'absolute', 'top': '2.1em', 'left': '0', 'height': h, 'width': '100%', 'z-index': '98'});
        }
        ;
    }, function(e) {
        $('.submenu').slideUp(300);
        $('.hover-element').slideUp(300);
        $('.cover-span').remove();
    });
    $('#main-nav > ul > li> a').click(function(e) {
        if ($(this).attr('rel') === 'submenu') {
            return false;
        }
    });
    function spastic() {
        if (screen.width > '480') {
            $('#nav').spasticNav();
        }
        ;
    }
    ;
    spastic();
    function media_function() {
        if (screen.width >= '768' && screen.width < '1024') {
        }
        ;
        if (screen.width < '768' && screen.width > '980') {
        }
        ;
    }
    ;
    media_function()
    function setEqualHeight(columns, x, y) {
        var tallestcolumn = 0;
        columns.each(function() {
            currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        });
        columns.innerHeight(tallestcolumn - x * y);
    }
    setEqualHeight($(".column1"), 0, 0);
    $(window).resize(function() {
        dinamic_height();
        $('#blob').remove();
        spastic();
        anchor_function();
        setEqualHeight($(".column1"), 0, 0);
        media_function();
    });
    if ($.exists('.button')) {
        $('.button').on('click', function() {
            if ($('.more').css('display') == 'block') {
                $('.bottom-div').removeClass('bottom-div');
                $('.more').prev('.tr-div').addClass('bottom-div');
                $('.more').slideUp();
                $(this).text('See more');
            } else {
                $('.bottom-div').removeClass('bottom-div');
                $('.more .tr-div:last-child').addClass('bottom-div');
                $('.more').slideDown();
                $(this).text('Close');
            }
            ;
        });
    }
    ;
    if ($.exists('.scroll-pane')) {
        $('.scroll-pane').jScrollPane({verticalDragMaxHeight: 300});
    }
    ;
    if ($.exists('.chosen')) {
        $('.chosen').chosen({no_results_text: "Nothing not found", max_selected_options: 10, disable_search_threshold: 10});
    }
    ;
    if ($.exists('#discussion_form')) {
        add_comment();
    }
    ;
    $('#search_movies_form').find("input[name='q']").autocomplete({serviceUrl: '/hint', minChars: 3, delimiter: /(,|;)\s*/, maxHeight: 210, zIndex: 99999, deferRequestBy: 300, params: {}, onSelect: function(data, value) {
        }, });
    if ($.exists('#myplayer')) {
        $('#myplayer').flash({'src': '/uploads/gddflvplayer.swf', 'width': '640', 'height': '480', 'allowfullscreen': 'true', 'allowscriptaccess': 'always', 'wmode': 'transparent', 'flashvars': {'vdo': vdo, 'sound': '50', 'splashscreen': splashscreen, 'autoplay': 'false', 'clickTAG': 'false', 'endclipaction': ''}});
    }
});
jQuery.exists = function(selector) {
    return($(selector).length > 0);
};
function add_comment() {
    var insert = false, form = $('#discussion_form');
    var month = Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var name = form.find('#name'), text = form.find('#comment'), type = form.find('input[name="type"]').val();
    if (type == 'movie') {
        var url = '/add_comment';
    } else if (type == 'serie') {
        var url = '/tv-series/add_comment';
    } else if (type == 'actor') {
        var url = '/persons/add_comment';
    } else if (type == 'xxx') {
        var url = '/xxx/add_comment';
    } else {
        return false;
    }
    form.validate({submitHandler: function() {
            if (!insert) {
                $.ajax({url: url, data: form.serialize(), type: "post", dataType: "json", beforeSend: function() {
                        insert = true;
                    }, success: function(resp) {
                        insert = false;
                        if (resp !== null) {
                            if (resp.status == 'true') {
                                var date = new Date();
                                date = month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
                                var comment = '<article class="some-comment"><header><h6>' + name.val() + ' <time>' + date + '</time></h6></header><div class="content-comment"><i class="point"></i><p>' + text.val() + '</p></div></article>';
                                if ($.exists('article.some-comment')) {
                                    $('article.some-comment:first').before(comment);
                                } else {
                                    $('.scroll-pane').append(comment);
                                }
                                form.trigger('reset');
                            }
                        }
                    }, error: function() {
                        insert = false;
                    }});
            }
            return false;
        }, focusInvalid: false, focusCleanup: true, rules: {name: {required: true}, email: {required: false, email: true}, comment: {required: true}}, messages: {name: {required: ""}, email: {required: "", email: ""}, comment: {required: ""}}, errorPlacement: function(error, element) {
            element.parent().children('span').css('display', 'block');
            element.click(function() {
                element.parent().children('span').hide();
            });
            element.focusout(function() {
                element.parent().children('span').hide();
            });
        }});
}
;