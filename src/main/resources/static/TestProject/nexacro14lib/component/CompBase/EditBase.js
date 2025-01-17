﻿//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.1.html	
//
//==============================================================================

if (!nexacro.EditBase) {
	nexacro.EditClickEventInfo = function (obj, id, caretpos, button, alt_key, ctrl_key, shift_key, meta_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ClickEventInfo.call(this, obj, id || "oneditclick", button, alt_key, ctrl_key, shift_key, meta_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this.caretpos = (caretpos == null) ? 0 : caretpos;
	};

	var _pEditClickEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.EditClickEventInfo);
	nexacro.EditClickEventInfo.prototype = _pEditClickEventInfo;
	_pEditClickEventInfo._type_name = "EditClickEventInfo";

	delete _pEditClickEventInfo;
	_pEditClickEventInfo = null;

	nexacro.CanCharEventInfo = function (obj, id, chartext, pretext, posttext) {
		this.id = this.eventid = id || "cancharchange";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
	};
	var _pCanCharEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CanCharEventInfo);
	nexacro.CanCharEventInfo.prototype = _pCanCharEventInfo;
	_pCanCharEventInfo._type_name = "TextChangeEventInfo";

	_pCanCharEventInfo.set_chartext = function (v) {
		this.chartext = v;
	};

	delete _pCanCharEventInfo;
	_pCanCharEventInfo = null;

	nexacro.TextChangeEventInfo = function (obj, id, chartext, pretext, posttext, preimetext, postimetext) {
		this.id = this.eventid = id || "ontextchange";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
		this.preimetext = preimetext;
		this.postimetext = postimetext;
	};
	var _pTextChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TextChangeEventInfo);
	nexacro.TextChangeEventInfo.prototype = _pTextChangeEventInfo;
	_pTextChangeEventInfo._type_name = "TextChangeEventInfo";

	_pTextChangeEventInfo.set_chartext = function (v) {
		this.chartext = v;
	};

	delete _pTextChangeEventInfo;
	_pTextChangeEventInfo = null;

	nexacro.TextChangedEventInfo = function (obj, id, pretext, posttext) {
		this.id = this.eventid = id || "ontextchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.posttext = posttext;
	};
	var _pTextChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TextChangedEventInfo);
	nexacro.TextChangedEventInfo.prototype = _pTextChangedEventInfo;
	_pTextChangedEventInfo._type_name = "TextChangedEventInfo";

	delete _pTextChangedEventInfo;

	nexacro.EditBase = function (comp) {
		if (comp) {
			this.comp = comp;
		}

		this._init_eventhandler();
		this._init();
	};

	_pEditBase = nexacro.EditBase.prototype;
	_pEditBase._type_name = "EditBase";

	_pEditBase._old_text = "";
	_pEditBase._old_old_text = "";
	_pEditBase._text = "";
	_pEditBase._old_value = null;
	_pEditBase._old_old_value = null;
	_pEditBase._value = null;
	_pEditBase._focus_text = "";
	_pEditBase._focus_value = null;
	_pEditBase._old_focus_text = "";
	_pEditBase._old_focus_value = null;
	_pEditBase._strTab = "\t";
	_pEditBase._set_old_prop = false;
	_pEditBase._deleted_char = "";
	_pEditBase._is_on_killfocus = false;
	_pEditBase._is_apply_autoselect = false;
	_pEditBase._imefirsttxt = "";
	_pEditBase._select_text = "";
	_pEditBase._compositionstart_value = "";
	_pEditBase._compositionend_value = "";
	_pEditBase._bChangeFocusText = false;
	_pEditBase._bInsert = false;
	_pEditBase._is_insertkey = false;
	_pEditBase._is_cancel_event = false;
	_pEditBase._is_contextmenu = false;
	_pEditBase._is_mobile_drag = false;
	_pEditBase._mobile_elme_pos = 0;
	_pEditBase._is_ios_paste_composition = false;
	_pEditBase._do_focus = false;
	_pEditBase._skip_sys_focus = false;
	_pEditBase._clipdata = "";
	_pEditBase._skip_setcaret = false;
	_pEditBase._do_set_caret = false;
	_pEditBase._multi_inserttext = "";
	_pEditBase._is_multi_inserttext = true;
	_pEditBase._compositionend_newtext = "";

	_pEditBase._keycode = 0;
	_pEditBase._charcode = 0;
	_pEditBase._precharcode = 0;
	_pEditBase._altkey = false;
	_pEditBase._ctrlkey = false;
	_pEditBase._shiftkey = false;
	_pEditBase._metakey = false;

	_pEditBase._old_begin_pos = 0;
	_pEditBase._old_end_pos = 0;
	_pEditBase._begin_pos = 0;
	_pEditBase._end_pos = 0;
	_pEditBase._input_begin_pos = 0;

	_pEditBase._accept_keyinput_event = true;
	_pEditBase._accept_focus_event = true;
	_pEditBase._accept_blur_event = true;
	_pEditBase._accept_select_event = true;
	_pEditBase._accept_cut_process = true;
	_pEditBase._accept_text_changed_status = 0;

	_pEditBase._stat_mouse = null;
	_pEditBase._stat_focus = null;
	_pEditBase._stat_composition = null;
	_pEditBase._mouseflag = false;

	_pEditBase._is_undo = false;
	_pEditBase._undoStack = null;

	_pEditBase._textEventInfo = null;

	_pEditBase._set_timer_by_killfocus = false;
	_pEditBase._isPasteActionComplete = true;
	_pEditBase._is_ios_composition_touch = false;

	_pEditBase._on_input_mousedown = null;
	_pEditBase._on_input_mouseup = null;
	_pEditBase._on_input_mousemove = null;
	_pEditBase._on_input_touchstart = null;
	_pEditBase._on_input_touchmove = null;
	_pEditBase._on_input_touchend = null;

	_pEditBase._on_input_keydown = null;
	_pEditBase._on_input_keypress = null;
	_pEditBase._on_input_keyinput = null;
	_pEditBase._on_input_keyup = null;

	_pEditBase._on_input_focus = null;
	_pEditBase._on_input_blur = null;

	_pEditBase._on_input_copy = null;
	_pEditBase._on_input_cut = null;
	_pEditBase._on_input_paste = null;

	_pEditBase._on_input_compositionstart = null;
	_pEditBase._on_input_compositionend = null;
	_pEditBase._on_input_compositionupdate = null;

	_pEditBase._on_input_select = null;
	_pEditBase._on_input_selectionchange = null;

	_pEditBase._on_default_input_keyup = nexacro._emptyFn;
	_pEditBase._keyup_process_enter = nexacro._emptyFn;
	_pEditBase._focus_process = nexacro._emptyFn;
	_pEditBase._blur_process = nexacro._emptyFn;
	_pEditBase._mouseup_process = nexacro._emptyFn;
	_pEditBase._mousedown_process = nexacro._emptyFn;

	_pEditBase.onUpdateStyle = nexacro._emptyFn;
	_pEditBase.syncValue = nexacro._emptyFn;
	_pEditBase.insertTabChar = nexacro._emptyFn;
	_pEditBase.applyInputmode = nexacro._emptyFn;
	_pEditBase._changeFocusText = nexacro._emptyFn;

	_pEditBase._setLocale = nexacro._emptyFn;

	_pEditBase._init_eventhandler = function () {
		this._on_input_mousedown = this._on_default_input_mousedown;
		this._on_input_mouseup = this._on_default_input_mouseup;
		this._on_input_mousemove = this._on_default_input_mousemove;
		this._on_input_keydown = this._on_default_input_keydown;
		this._on_input_keypress = this._on_default_input_keypress;
		this._on_input_keyinput = this._on_default_input_keyinput;
		this._on_input_keyup = this._on_default_input_keyup;

		this._on_input_touchstart = this._on_default_input_touchstart;
		this._on_input_touchmove = this._on_default_input_touchmove;
		this._on_input_touchend = this._on_default_input_touchend;

		this._on_input_focus = this._on_default_input_focus;
		this._on_input_blur = this._on_default_input_blur;

		this._on_input_copy = this._on_default_input_copy;
		this._on_input_cut = this._on_default_input_cut;
		this._on_input_paste = this._on_default_input_paste;

		this._on_input_compositionstart = this._on_default_input_compositionstart;
		this._on_input_compositionend = this._on_default_input_compositionend;
		this._on_input_compositionupdate = this._on_default_input_compositionupdate;

		this._on_input_select = this._on_default_input_select;
		this._on_input_selectionchange = this._on_default_input_selectionchange;
	};

	_pEditBase._init = function (bInit) {
		this._old_text = "";
		this._text = "";
		this._old_value = null;
		this._value = null;
		this._focus_text = "";
		this._focus_value = null;
		this._set_old_prop = false;

		if (!bInit) {
			this._old_begin_pos = 0;
			this._old_end_pos = 0;
			this._begin_pos = 0;
			this._end_pos = 0;
		}
		else {
			this._old_begin_pos = this._nMaxedLength;
			this._old_end_pos = this._nMaxedLength;
			this._begin_pos = this._nMaxedLength;
			this._end_pos = this._nMaxedLength;
		}

		this._input_begin_pos = 0;
		this._skip_set_caret = false;
		this._accept_hangul = true;

		this._accept_focus_event = true;
		this._accept_blur_event = true;

		this._set_timer_by_killfocus = false;

		if (!this._stat_mouse) {
			this._stat_mouse = new nexacro.EditBase.Status("mouse");
		}
		else {
			this._stat_mouse.init();
		}

		if (!this._stat_focus) {
			this._stat_focus = new nexacro.EditBase.Status("focus");
		}
		else {
			this._stat_focus.init();
		}

		if (!this._stat_composition) {
			this._stat_composition = new nexacro.EditBase.CompositionStatus("composition");
		}
		else {
			this._stat_composition.init();
		}

		if (!this._undoStack) {
			this._undoStack = new nexacro.EditBase.UndoStack(this.comp);
		}
		else {
			this._undoStack.init();
		}

		if (!this._textEventInfo) {
			this._textEventInfo = new nexacro.EditBase.TextEventInfo(this.comp);
		}
		else {
			this._textEventInfo.init();
		}
	};

	_pEditBase._destroy = function () {
		this.comp = null;

		this._old_value = null;
		this._value = null;
		this._focus_value = null;

		this._stat_mouse = null;
		this._stat_focus = null;
		this._stat_composition = null;

		this._skip_setcaret = false;

		if (this._undoStack) {
			this._undoStack._destroy();
			this._undoStack = null;
		}

		if (this._textEventInfo) {
			this._textEventInfo._destroy();
			this._textEventInfo = null;
		}
	};

	_pEditBase._on_getAccessibilityAdditionalLabel = function () {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem && input_elem._wantAccessibilityAdditionalLabel) {
			if (!input_elem._wantAccessibilityAdditionalLabel()) {
				return "";
			}

			return "";
		}

		return "";
	};

	_pEditBase._on_getAccessibilityWholeLabel = function () {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem) {
			if (comp.text !== undefined && comp.value !== undefined) {
				return comp.text;
			}
		}

		return "";
	};

	_pEditBase._set_input_begin_pos = function (v) {
		this._input_begin_pos = v;
	};

	_pEditBase.setPosition = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var control = comp._control_element;

		var container_width = comp._client_width;
		var container_height = comp._client_height;

		if (elem && elem._handle) {
			if (container_width != 0 && container_height != 0) {
				var p = nexacro._getCachedPaddingObj("0 1 0 1");
				var align = comp.on_find_CurrentStyle_align(comp._pseudo);
				var padding = comp.on_find_CurrentStyle_padding(comp._pseudo);

				var valign = align.valign;
				var halign = align.halign;

				if (valign == "") {
					valign = nexacro.Component._default_left_align.valign;
				}

				elem.setElementPosition(0, 0);
				control.setElementPadding(padding);
				elem.setElementPadding(p);
				elem.setElementSize(container_width, container_height);
				elem.setElementAlignXY(halign, valign);
			}
		}
	};

	_pEditBase.setElementCaretPos = function (start, end, elem) {
		if (elem && elem._type == "date") {
			start = 0;
			end = elem.getElementValue().length;
		}

		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;

		this._begin_pos = start;
		this._end_pos = end;

		if (!this._is_composition() && !this.comp._input_element._is_ios_composition) {
			this._set_input_begin_pos(start);
		}

		if (elem) {
			if (!this._skip_set_caret) {
				pos = elem.setElementSetSelect(start, end);
			}
		}
	};

	if (nexacro.OS == "iOS") {
		var ver_arr = nexacro.OSVersion.split(".");
		var major_ver = ver_arr[0];

		if (major_ver < 7) {
			_pEditBase.getCompositionData = function (elem) {
				var value = elem.getElementValue();

				var start = this._input_begin_pos;
				var end = value.length - this._imefirsttxt.length;

				var data = value.substr(start, end);

				return data;
			};
		}
		else {
			_pEditBase.getCompositionData = function (elem) {
				var pos = elem.getElementCaretPos();
				if (!pos || pos == -1) {
					return "";
				}

				var value = elem.getElementValue();

				var start = this._input_begin_pos;
				var end = pos.begin - this._input_begin_pos;

				var data = value.substr(start, end);

				return data;
			};
		}
	}
	else {
		_pEditBase.getCompositionData = function (elem) {
			var pos = elem.getElementCaretPos();
			if (!pos || pos == -1) {
				return "";
			}

			var value = elem.getElementValue();

			var start = this._input_begin_pos;
			var end = pos.begin - this._input_begin_pos;
			if ((nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11) || nexacro.BrowserType == "Edge") {
				if (nexacro.BrowserType == "Edge") {
					if (value && this._is_hangul(value.substr(pos.begin - 1, 1))) {
						if (pos.begin - this._input_begin_pos > 1) {
							start = this._input_begin_pos;
							end = pos.begin - start;
						}
					}
				}

				if (end < 0) {
					start = this._input_begin_pos = this._input_begin_pos + end;
					end = pos.begin - this._input_begin_pos;
				}

				if (end == 0) {
					end = pos.begin + 1;
				}
			}

			var data = "";
			if ((nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11) || nexacro.BrowserType == "Edge") {
				if (this._value) {
					var r_v = this._value.substr(start);
					var r_len = r_v ? r_v.length : 0;
					var value_len = value.length;
					data = value.substr(start, value_len - start - r_len);
				}
				else {
					data = value.substr(start, end);
				}
			}
			else {
				data = value.substr(start, end);
			}

			return data;
		};
	}

	_pEditBase.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		if (nexacro.Browser == "IE" && this._pasteAction) {
			var compositionlen = 0;
			var compositiondata = this._stat_composition.getData(elem);
			if (compositiondata) {
				compositionlen = compositiondata.length;
			}

			if (!this._clipdata || this._clipdata.length <= 0) {
				var len = (element_text.length - text.length) + compositionlen;
			}
			else {
				var len = this._clipdata.length + compositionlen;
			}

			insertText = element_text.substr(this._begin_pos, len);

			elem.setElementBlur();
			elem.setElementFocus();
		}
		else if (this._pasteAction || this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
			var len = element_text.length - text.length;
			insertText = element_text.substr(this._begin_pos, len);
		}
		else if (this.getCompositionData(elem)) {
			insertText = this.getCompositionData(elem);
		}
		else {
			insertText = this._stat_composition.getData(elem);
		}

		return insertText;
	};

	_pEditBase.clearBuffer = function (text, begin, end) {
		if (text === null || text === undefined) {
			return;
		}

		var newText = text.substr(0, begin) + text.substr(end, text.length - end);
		this._setText(newText);
		this._setValue(newText);
		this.setElementCaretPos(begin, begin);
	};

	_pEditBase.restoreBuffer = function (text, begin, end) {
		if (text === null || text === undefined) {
			return;
		}

		this._setText(text);
		this._setValue(text);
		this.setElementCaretPos(begin, end);
	};

	_pEditBase.writeBuffer = function (elem) {
		var str = this._text;
		if (str === undefined || str === null) {
			str = "";
		}

		str = str.replace(/\r\n/g, "\n");

		var val = elem.getElementValue();
		val = val.replace(/\r\n/g, "\n");

		if (elem && val != str) {
			elem.setElementValue(str);
		}

		return str;
	};

	_pEditBase.setValue = function (v) {
		var elem = this.comp._input_element;

		if (nexacro._isNull(v) || v === "") {
			this._setText("");
			this._setValue(v);
			this._undoStack.push(v);

			if (elem) {
				if (nexacro.Browser == "Runtime") {
					this.setElementCaretPos(0, 0, elem);
				}
				else {
					this.setElementCaretPos(0, 0);
				}
			}
		}
		else {
			this._setText(v);
			this._setValue(v);
			this._undoStack.push(v, v, this._begin_pos, this._end_pos);
		}

		if (elem) {
			if (nexacro.OS == "iOS" && elem) {
				if (!this.comp.password) {
					elem.setElementInputType("text", true);
					elem.setElementInputTypeKeypad(this.comp.inputtype);
				}
			}

			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = false;
			}

			elem.setElementValue(v, true);

			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = true;
			}
		}
	};

	_pEditBase._on_default_input_mousedown = function (elem, altKey, ctrlKey, shiftKey, metaKey) {
		this._old_text = this._text;
		this._old_value = this._value;

		var mouse_stat = this._stat_mouse.getCurrentStatus();
		if (mouse_stat == "mousedown") {
			this._is_apply_autoselect = false;
		}

		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseDown);

		this._mousedown_process(elem);

		if (ctrlKey && !this._is_selected()) {
			this.comp.setSelect();
		}
	};

	_pEditBase._on_default_input_mousemove = function (elem) {
		if (this._text == elem.getElementValue() && !this._block_setcaret_mousemove) {
			this._setCaret(elem);
		}
	};

	_pEditBase._on_default_input_mouseup = function (elem, altKey, ctrlKey, shiftKey, metaKey) {
		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);
		this._stat_composition.init();
		this._compositionend_value = "";

		this._mouseup_process(elem);

		if (this._is_apply_autoselect) {
			this._is_apply_autoselect = false;
			elem._event_stop = true;
		}

		if (elem.readonly) {
			elem._deleteCaret();
		}
	};

	_pEditBase._on_default_input_touchstart = function (elem) {
		this._old_text = this._text;
		this._old_value = this._value;

		this._mousedown_process(elem);
	};

	_pEditBase._on_default_input_touchmove = function (elem) {
	};

	_pEditBase._on_default_input_touchend = function (elem) {
		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);
		this._setCaret(elem);

		if (elem.readonly) {
			elem._deleteCaret();
		}
	};

	_pEditBase._on_default_input_select = function (elem) {
		if (this._accept_select_event === false) {
			this._accept_select_event = true;
			return;
		}

		if (nexacro.BrowserType != "Edge") {
			this._setCaret(elem);
		}

		if (this._text && (this._begin_pos != this._end_pos)) {
			this._select_text = this._text.substring(this._begin_pos, this._end_pos);
		}
		else {
			this._select_text = "";
		}
	};

	_pEditBase._on_default_input_selectionchange = function (elem) {
		if (elem && elem._input_handle) {
			if (!this._is_composition() && !elem._is_ios_composition) {
				var node = elem._input_handle;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				this._begin_pos = node.selectionStart;
				this._end_pos = node.selectionEnd;

				this._set_input_begin_pos(this._begin_pos);
			}
		}

		if (this._text && (this._begin_pos != this._end_pos)) {
			this._select_text = this._text.substring(this._begin_pos, this._end_pos);
		}
	};

	_pEditBase._on_default_input_focus = function (elem, target) {
		var mouseflag = false;
		var mouse_status = this._stat_mouse.getCurrentStatus();
		var focus_status = this._stat_focus.getCurrentStatus();

		if (mouse_status == nexacro.EditBase.Status.MouseDown && focus_status != nexacro.EditBase.Status.Focus) {
			mouseflag = true;
		}

		if (this._accept_focus_event === false) {
			this._accept_focus_event = true;

			if (!this._skip_setcaret) {
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}

			this._skip_setcaret = false;
			if (!mouseflag && elem.readonly) {
				elem._deleteCaret();
			}

			return;
		}

		this._focus_process(elem, mouseflag);

		if (focus_status != nexacro.EditBase.Status.Focus) {
			if (!this.comp._activate_flag) {
				this._setFocusValue();
			}
		}

		if (mouseflag) {
			if (nexacro.BrowserType != "Edge" && nexacro.Browser != "IE") {
				elem._event_stop = true;
			}
		}

		if (!this._is_composition()) {
			this._compositionend_value = "";
			this._stat_composition.init();
		}

		this.comp._activate_flag = false;

		if (((nexacro.Browser == "Runtime") || (nexacro.Browser != "Runtime" && this._mouseflag && mouse_stat == "mousedown")) && 
			focus_status != nexacro.EditBase.Status.Focus && 
			this._stat_focus.getCurrentStatus() == nexacro.EditBase.Status.Focus) {
			var win = this.comp._getWindow();
			var focus_idx = win ? win._indexOfCurrentFocusPaths(this.comp) : 0;
			if (focus_idx < 0 && this.comp._is_subcontrol) {
				focus_idx = win ? win._indexOfCurrentFocusPaths(this.comp.parent) : 0;
			}
			if (focus_idx < 0 && nexacro.Browser == "Runtime" && !application._is_on_alert) {
				this.comp._on_focus(true);
			}
		}
	};

	_pEditBase._on_default_input_blur = function (elem, target) {
		if ((!this.comp._input_element.getRootWindowHandle()) || (target === elem._handle && elem.password)) {
			return true;
		}

		if (this._accept_blur_event === false) {
			this._accept_blur_event = true;
			return false;
		}

		if (this._is_on_killfocus && this._stat_mouse.getCurrentStatus() === nexacro.EditBase.Status.MouseDown) {
			this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);
		}

		this._blur_process(elem);

		this._stat_focus.setStatus(nexacro.EditBase.Status.Blur);

		return true;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10 && nexacro._getRealBrowserVersion() <= 10) {
		if (nexacro.OSVersion >= 6.0) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 10) {
				_pEditBase._on_default_input_keyinput = function (elem) {
					var mouse_stat = this._stat_mouse.getCurrentStatus();
					if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
						mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
						elem.setElementValue(this._value);
						return false;
					}

					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (this._is_cancel_event == true) {
						return false;
					}

					if (this._is_selected(elem) && this._select_text == "") {
						elem.setElementValue(this._text);
						this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						editbase_text = editbase_text.replace(/\r\n/g, "");
						editbase_text = editbase_text.replace(/\n/g, "");

						editbase_value = editbase_value.replace(/\r\n/g, "");
						editbase_value = editbase_value.replace(/\n/g, "");
					}

					if (element_value == editbase_text && element_value == editbase_value && (element_value == "" || element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					if (element_value == editbase_value && this._is_composition()) {
						return false;
					}

					if (!this._set_old_prop) {
						this._old_text = this._text;
						this._old_value = this._value;
						this._old_begin_pos = this._begin_pos;
						this._old_end_pos = this._end_pos;
					}

					if (this._is_selected() && !this._cutAction) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
						this._set_old_prop = true;

						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return false;
					}

					if (this._keycode == nexacro.KeyCode_ImeInput && (this._stat_composition.getCurrentStatus() != nexacro.EditBase.Status.CompositionEnd)) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();
						if (!this._is_composition()) {
							if (data != "　" && data != "") {
								this._on_input_compositionstart(data);
							}
							else {
								this.setElementCaretPos(this._old_begin_pos + 1, this._old_begin_pos + 1, elem);
								elem.setElementBlur();
								elem.setElementFocus();
								return false;
							}
						}
						else {
							if (this._is_hangul(data)) {
								if (pos.begin != this._begin_pos) {
									var insertText = data.substr(0, 1);

									this._on_input_compositionend(insertText);

									var ret = this._fire_text_event(insertText);

									data = this.getCompositionData(elem);
									if (data.length > 0) {
										this._on_input_compositionstart(data);
									}
								}
								else if (this._compositionend_value === element_value) {
									this._on_input_compositionend(data);
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
						else {
							this._on_input_compositionend(data);
						}
					}

					var insertText = "";

					insertText = this.getInsertText(elem);

					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;

					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					this._set_old_prop = false;
					this.onUpdateStyle(comp);
					this._isPasteActionComplete = true;
					if (this._do_set_caret) {
						this._setCaret(elem);
						this._do_set_caret = false;
					}

					return ret;
				};
			}
			else if (nexacro.BrowserVersion == 9) {
				_pEditBase._on_default_input_keyinput = function (elem) {
					var mouse_stat = this._stat_mouse.getCurrentStatus();
					if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
						mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
						elem.setElementValue(this._value);
						return false;
					}
					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						editbase_text = editbase_text.replace(/\r\n/g, "");
						editbase_text = editbase_text.replace(/\n/g, "");

						editbase_value = editbase_value.replace(/\r\n/g, "");
						editbase_value = editbase_value.replace(/\n/g, "");
					}

					if (element_value == editbase_text && element_value == editbase_value && (element_value == "" || element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					this._old_text = this._text;
					this._old_value = this._value;
					this._old_begin_pos = this._begin_pos;
					this._old_end_pos = this._end_pos;

					if (this._is_selected()) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
						this._begin_pos = this._old_begin_pos;
						this._end_pos = this._old_end_pos;
					}

					if (this._keycode == nexacro.KeyCode_ImeInput) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();
						if (!this._is_composition()) {
							if (data != "　") {
								this._on_input_compositionstart(data);
							}
						}
						else {
							if (this._is_hangul(data)) {
								if (pos.begin != this._begin_pos) {
									var insertText = data.substr(0, 1);

									this._on_input_compositionend(insertText);

									var ret = this._fire_text_event(insertText);

									data = this.getCompositionData(elem);

									if (data.length > 0) {
										this._on_input_compositionstart(data);
									}
								}
								else if (this._compositionend_value === element_value) {
									this._on_input_compositionend(data);
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
					}

					var insertText = this.getInsertText(elem);
					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;

					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					if (this._do_set_caret) {
						this._setCaret(elem);
						this._do_set_caret = false;
					}

					this.onUpdateStyle(comp);

					return ret;
				};
			}
			else {
				_pEditBase._on_default_input_keyinput = function (elem) {
					var mouse_stat = this._stat_mouse.getCurrentStatus();
					if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
						mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
						elem.setElementValue(this._value);
						return false;
					}

					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						if (typeof (editbase_text) == "string") {
							editbase_text = editbase_text.replace(/\r\n/g, "");
							editbase_text = editbase_text.replace(/\n/g, "");
						}
						if (typeof (editbase_value) == "string") {
							editbase_value = editbase_value.replace(/\r\n/g, "");
							editbase_value = editbase_value.replace(/\n/g, "");
						}
					}


					if (element_value == editbase_text && element_value == editbase_value && (element_value == "" || element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					if (!this._set_old_prop) {
						this._old_text = this._text;
						this._old_value = this._value;
						this._old_begin_pos = this._begin_pos;
						this._old_end_pos = this._end_pos;
					}

					if (this._is_selected() && !this._cutAction) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
						this._set_old_prop = true;

						return;
					}

					if (this._keycode == nexacro.KeyCode_ImeInput) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();

						if (!this._is_composition()) {
							if (data && data.charAt(data.length - 1) != "　") {
								if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
									this._on_input_compositionstart(data);
								}
							}
							else {
								this._on_input_compositionend(data);
							}
						}
						else {
							if (data && data.length > 0) {
								if (this._is_hangul(data)) {
									if (pos.begin != this._begin_pos) {
										var insertText = data.substr(0, 1);

										this._on_input_compositionend(insertText);

										var ret = this._fire_text_event(insertText);

										var newCompositionText = data.substring(1, data.length);
										if (newCompositionText.length > 0) {
											this._on_input_compositionstart(newCompositionText);
										}
									}
									else {
										this._on_input_compositionupdate(data);
									}
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
								if (pos.end == this._input_begin_pos && this._is_hangul(this._stat_composition.getData())) {
									this._on_input_compositionend("");
									this._stat_composition.init();
									this._compositionend_value = "";
								}
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
					}

					var insertText = this.getInsertText(elem);
					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;
					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					this._set_old_prop = false;
					if (this._do_set_caret) {
						this._setCaret(elem);
						this._do_set_caret = false;
					}
					this.onUpdateStyle(comp);

					return ret;
				};
			}
		}
		else {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;
					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var element_value = elem.getElementValue();
				var editbase_text = this._text;
				var editbase_value = this._value;

				if (!editbase_text) {
					editbase_text = "";
				}
				if (!editbase_value) {
					editbase_value = "";
				}

				if (!elem.usemultiline) {
					editbase_text = editbase_text.replace(/\r\n/g, "");
					editbase_text = editbase_text.replace(/\n/g, "");

					editbase_value = editbase_value.replace(/\r\n/g, "");
					editbase_value = editbase_value.replace(/\n/g, "");
				}

				if (element_value == editbase_text && element_value == editbase_value && (element_value == "" || element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
					this._setCaret(elem);
					return false;
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
					this._begin_pos = this._old_begin_pos;
					this._end_pos = this._old_end_pos;
				}

				if (this._keycode == nexacro.KeyCode_ImeInput) {
					var data = this.getCompositionData(elem);
					if (!this._is_composition()) {
						if (data != "　") {
							this._on_input_compositionstart(data);
						}
					}
					else {
						if (this._is_hangul(data)) {
							if (this._compositionend_value && (this._compositionend_value.length < element_value.length)) {
								var insertText = data.substr(0, 1);

								this._compositionend_value = element_value.substr(0, element_value.length - 1);
								this._on_input_compositionend(insertText);

								var ret = this._fire_text_event(insertText);
								data = data.substr(1, data.length - 1);

								if (data.length > 0) {
									this._on_input_compositionstart(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					if (!this._is_hangul(data)) {
						this._on_input_compositionupdate(data);
					}
				}

				var insertText = this.getInsertText(elem);
				var ret = this._fire_text_event(insertText);

				this._compositionend_value = element_value;

				if (!this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}

				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
				this.onUpdateStyle(comp);
				return ret;
			};
		}
	}
	else if (nexacro.OS == "iOS") {
		var ver_arr = nexacro.OSVersion.split(".");
		var major_ver = ver_arr[0];
		var minor_ver = ver_arr[1];
		if (major_ver < 7) {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;
					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var elem_value = elem.getElementValue();
				var base_text = this._text;
				var base_value = this._value;

				if (this._is_composition() && this._imefirsttxt == elem_value && (elem_value == "" || elem_value && (comp.maxlength == 0 || comp.maxlength >= elem_value.length))) {
					return false;
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
				}

				if (this._charcode >= 12593 && this._charcode <= 12643) {
					if (!this._is_composition()) {
						this._imefirsttxt = this._text;
						var data = this.getCompositionData(elem);

						this._on_input_compositionstart(data);
					}
					else {
						var data = this.getCompositionData(elem);

						if (this._compositionend_value && (this._compositionend_value.length < elem_value.length)) {
							var insertText = data.substr(0, 1);
							var newData_len = data.length - 1;

							var composition_front = elem_value.substr(0, this._begin_pos);
							var composition_rear = elem_value.substr(this._begin_pos + newData_len, elem_value.length - 1);

							this._compositionend_value = composition_front + composition_rear;
							this._on_input_compositionend(insertText);

							var ret = this._fire_text_event(insertText);
							data = data.substr(1, data.length - 1);

							if (data.length > 0) {
								this._imefirsttxt = this._compositionend_value;
								this._on_input_compositionstart(data);
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					if (!this._is_hangul(data)) {
						this._on_input_compositionupdate(data);
					}
				}

				var insertText = this.getInsertText(elem);

				var ret = this._fire_text_event(insertText);

				this._compositionend_value = elem_value;

				if (!this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}

				this.onUpdateStyle(comp);
				return ret;
			};
		}
		else {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					if (this.comp) {
						if (elem.password && elem.maxlength > 0 && this.comp.autoskip) {
							this._autoskip_from_text_event();
						}
					}

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var elem_value = elem.getElementValue();
				var pos = elem.getElementCaretPos();
				var base_text = this._text;
				var base_value = this._value;

				if (this._is_composition() && this._imefirsttxt == elem_value && (elem_value == "" || elem_value && (comp.maxlength == 0 || comp.maxlength >= elem_value.length))) {
					if (major_ver >= 13 && elem._keypad_type == "number") {
						if (pos.begin != pos.end && pos.end != this._end_pos) {
							this._begin_pos = this._end_pos = pos.end;
						}

						if (!(pos.begin == pos.end && pos.end == this._end_pos)) {
							return false;
						}
					}
					else {
						return false;
					}
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
				}

				if (this._charcode >= 12593 && this._charcode <= 12643) {
					if (!this._is_composition()) {
						this._imefirsttxt = this._text;

						var begin_pos = (!pos || pos == -1) ? 0 : pos.begin - 1;
						this._set_input_begin_pos(begin_pos);

						var data = this.getCompositionData(elem);
						this._on_input_compositionstart(data);
					}
					else {
						var data = this.getCompositionData(elem);
						var diff = this._begin_pos - this._input_begin_pos;

						if (diff != 1) {
							data = this._stat_composition.getData();
						}

						if (data.length <= 1) {
							if (data == "") {
								return false;
							}
						}

						if (this._compositionend_value && (this._compositionend_value.length < elem_value.length)) {
							var insertText = data.substr(0, 1);
							var newData_len = data.length - 1;

							if (diff == 1) {
								var composition_front = elem_value.substr(0, this._begin_pos);
								var composition_rear = elem_value.substr(this._begin_pos + newData_len, elem_value.length - 1);
								this._compositionend_value = composition_front + composition_rear;
							}

							this._on_input_compositionend(insertText);

							var ret = this._fire_text_event(insertText);
							data = data.substr(1, data.length - 1);

							if (diff != 1) {
								var begin = pos.end - 1;
								data = elem_value.slice(begin, begin + 1);
								this.setElementCaretPos(begin, begin);
							}

							if (data.length > 0) {
								this._imefirsttxt = this._compositionend_value;
								this._on_input_compositionstart(data);
								if (this._is_hangul(data)) {
									var strFront = this._text.substr(0, this._begin_pos);
									var strRear = this._text.substr(this._end_pos, this._text.length);
									var newText = strFront + data + strRear;
									this._compositionstart_value = data;

									this._setText(newText);
									elem.setElementValue(newText);
									elem.text = strFront + newText;
									this.setElementCaretPos(this._begin_pos + 1, this._begin_pos + 1, elem);
								}
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else if (this._is_composition() && this._charcode == 0 && (((major_ver == 10 && minor_ver >= 3) || (major_ver >= 11 && major_ver <= 12) || (major_ver >= 13 && pos.begin == pos.end && pos.end == this._end_pos)))) {
					if (this.getCompositionData(elem) == "") {
						this.setElementCaretPos(pos.end, pos.end, elem);
						this._old_begin_pos = pos.begin;
						this._old_end_pos = pos.begin;
					}

					var data = this.getCompositionData(elem);

					if (this._stat_composition._curr_stat == nexacro.EditBase.Status.CompositionUpdate) {
						if (this._stat_composition._prev_stat == nexacro.EditBase.Status.CompositionStart) {
							if (this._is_ios_composition_touch) {
								this._is_ios_composition_touch = false;
								elem.setElementValue(this._text);
								this.setElementCaretPos(this._old_end_pos, this._old_end_pos, elem);
								return false;
							}
						}

						if (this._stat_composition._prev_stat == nexacro.EditBase.Status.None) {
							if (this._is_ios_composition_touch) {
								if (data == "") {
									data = this._stat_composition.getData();
									this._set_input_begin_pos(pos.begin);
								}
							}
							else {
								if (data != "" && data != this._stat_composition.getData()) {
									var begin = this._input_begin_pos - (this._stat_composition.getData().length - data.length);
									data = this._stat_composition.getData();
									this._set_input_begin_pos(begin);
									this._old_begin_pos = begin;
									this._old_end_pos = begin;
									begin = null;
								}
							}
						}
					}

					if (major_ver >= 13 && data == "" && elem._keypad_type == "number") {
						data = this._stat_composition.getData();
					}

					this._on_input_compositionend(data);

					if (this._filteredtext && comp.displaynulltext != "" && pos.begin != pos.end && this._text != elem_value) {
						elem.setElementValue(this._text);
						var begin = pos.begin + this._text.length - this._textEventInfo.prechareventtext.length;
						this.setElementCaretPos(begin, begin, elem);
						elem._is_ios_composition = false;
						return false;
					}

					if (major_ver >= 13) {
						this._old_begin_pos = this._input_begin_pos;
						this._old_end_pos = this._input_begin_pos;
					}

					elem._is_ios_composition = false;
				}
				else {
					var data = this._stat_composition.getData(elem);
					if (this._is_composition() && this._is_hangul(data) && this._keycode != 8) {
						this._on_input_compositionend(data);
					}

					if (this._is_composition() && this._keycode != 8 && this._charcode == 0 && !((major_ver >= 10 && minor_ver >= 3) || major_ver >= 11)) {
						if (this.getCompositionData(elem) == "") {
							return false;
						}
					}

					if (!this._is_ios_paste_composition && !this._pasteAction) {
						if (this._filteredtext && this._stat_composition.getPreviousStatus() == nexacro.EditBase.Status.CompositionUpdate && !this._is_hangul(data) && base_text != elem_value) {
							elem.setElementValue(this._text);
							this.setElementCaretPos(pos.end - data.length, pos.end - data.length, elem);
							return false;
						}

						if (!this._is_composition() && !this._is_hangul(data) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
							this._old_begin_pos = pos.end - data.length;
							this._old_end_pos = pos.end - data.length;
						}
					}

					if (major_ver >= 13 && this._is_composition() && this._charcode !== nexacro.Event.KEY_BACKSPACE) {
						if (pos.begin == pos.end) {
							if (pos.end != this._end_pos && pos.end == this._input_begin_pos && this._text != elem_value) {
								return false;
							}

							if (this._filteredtext && this._stat_composition.getPreviousStatus() == nexacro.EditBase.Status.None && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
								if (data !== "") {
									this._on_input_compositionend(data);
								}
							}
						}
						else {
							if (pos.end == this._end_pos && elem_value == this._text) {
								return false;
							}
						}
					}
				}

				var insertText = this.getInsertText(elem);

				if (this._is_ios_paste_composition) {
					var begin = this._input_begin_pos;
					var pThis = this;

					if (!this._filteredtext) {
						begin += (this._textEventInfo.chartext.length - this._stat_composition.getPreviousData().length);
					}

					elem.setElementValue(base_text);
					nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
						pThis.setElementCaretPos(begin, begin, elem);
					});
					this._is_ios_paste_composition = false;
					this._compositionend_value = "";
					this._stat_composition.init();
					return false;
				}

				if (this._pasteAction) {
					if (major_ver >= 13 && insertText != this._clipdata) {
						insertText = this._clipdata;
						var newText = elem_value.slice(0, this._input_begin_pos) + insertText + elem_value.slice(pos.end);
						var begin = this._input_begin_pos + insertText.length;
						this._text = newText;
						elem.setElementValue(newText);
						this.setElementCaretPos(begin, begin, elem);
						this._set_input_begin_pos(begin - insertText.length);
					}

					if (this._stat_composition.getPreviousStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						var prev_data = this._stat_composition.getPreviousData();

						if (!this._is_hangul(prev_data)) {
							this._accept_blur_event = false;
							this._accept_focus_event = false;
							elem.setElementBlur();
							elem.setElementFocus();
							this._accept_blur_event = true;
							this._accept_focus_event = true;

							insertText = prev_data + insertText;

							this.setElementCaretPos(pos.end, pos.end);
							this._set_input_begin_pos(pos.end - insertText.length);
							this._old_begin_pos = this._input_begin_pos;
							this._old_end_pos = this._input_begin_pos;

							this._is_ios_paste_composition = true;
						}
					}
				}

				var ret = this._fire_text_event(insertText);

				this._compositionend_value = elem_value;

				if (!this._is_composition()) {
					if (major_ver >= 13 && elem._is_ios_composition_returned) {
						elem._is_ios_composition_returned = false;
						elem._on_sys_blur(elem._input_handle);
					}

					this._compositionend_value = "";
					this._stat_composition.init();
				}

				this.onUpdateStyle(comp);
				return ret;
			};
		}
	}
	else if (nexacro.Browser == "IE" && (nexacro.BrowserVersion == 11 || (nexacro.BrowserType == "IE10" && nexacro._getRealBrowserVersion() == 11))) {
		_pEditBase._on_default_input_keyinput = function (elem) {
			var mouse_stat = this._stat_mouse.getCurrentStatus();
			if (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition() && this._pasteAction)) {
				elem.setElementValue(this._value);
				return false;
			}

			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;
				return false;
			}

			if (elem.readonly) {
				elem.setElementValue(this._value);
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var comp = this.comp;
			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var editbase_text = this._text;
			var editbase_value = this._value;

			if (!editbase_text) {
				editbase_text = "";
			}
			if (!editbase_value) {
				editbase_value = "";
			}

			if (!this._is_composition() && elem_value == editbase_text && elem_value == editbase_value && (elem_value == "" || elem_value && (comp.maxlength == 0 || comp.maxlength >= this.getLength(elem, editbase_text)))) {
				this._setCaret(elem);
				this.onUpdateStyle(comp);

				if (elem.password && elem.maxlength > 0 && comp.autoskip) {
					this._autoskip_from_text_event();
				}

				return false;
			}

			this._old_old_text = this._old_text;
			this._old_old_value = this._old_value;
			this._old_text = this._text;
			this._old_value = this._value;
			this._old_begin_pos = this._begin_pos;
			this._old_end_pos = this._end_pos;

			if (this._is_selected()) {
				if (this._is_composition() || elem_pos.begin != elem_pos.end || this._input_begin_pos != elem_pos.begin) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
					this._begin_pos = this._old_begin_pos;
					this._end_pos = this._old_end_pos;
				}
			}

			var insertText = this.getInsertText(elem);
			var diff = elem_value.length - this._text.length;

			if (this._text.length == elem_value.length && this._text != elem_value) {
				var replaceText = elem_value.substr(this._begin_pos, elem_pos.begin - this._begin_pos);
				if (replaceText.length > 0) {
					var temp = replaceText;

					replaceText = this.applyInputmode(replaceText);

					if (comp.inputmode == "lower") {
						if (replaceText == temp.toLowerCase()) {
							replaceText = temp;
						}
					}
					else if (comp.inputmode == "upper") {
						if (replaceText == temp.toUpperCase()) {
							replaceText = temp;
						}
					}

					replaceText = this._apply_inputfilter(replaceText);

					replaceText = this._apply_inputtype(replaceText);
					if (replaceText == "") {
						this._is_insertkey = true;
						insertText = temp;
					}
					else {
						if (!this._is_selected()) {
							this.clearBuffer(this._text, this._begin_pos, this._begin_pos + 1);
							this.syncValue();
						}
						insertText = replaceText;
					}
				}
			}

			if (this._bInsert) {
				this._bInsert = false;
			}

			if (this._is_hangul(insertText) && (diff > insertText.length || insertText.length > 1)) {
				var insertTextlen = insertText.length;
				this._set_input_begin_pos(this._input_begin_pos - (diff - insertTextlen));
				if (this._input_begin_pos < 0) {
					this._set_input_begin_pos(0);
					this._text = this._old_text;
					this._old_text = this._old_old_text;
					this._old_value = this._old_old_value;
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
					if (diff > 1) {
						diff -= 1;
					}
				}
				insertText = elem_value.substr(this._input_begin_pos, diff);


				if (this._is_multi_inserttext) {
					this._multi_inserttext = insertText;
				}
				else {
					this._is_multi_inserttext = true;
				}
			}

			var ret = this._fire_text_event(insertText);
			if (!this._is_composition()) {
				this._stat_composition.init();
			}

			if (this._do_set_caret) {
				this._setCaret(elem);
				this._do_set_caret = false;
			}
			this.onUpdateStyle(comp);
			return ret;
		};
	}
	else {
		_pEditBase._on_default_input_keyinput = function (elem) {
			var mouse_stat = this._stat_mouse.getCurrentStatus();
			if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
				mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
				elem.setElementValue(this._value);
				return false;
			}

			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;
				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var comp = this.comp;
			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var editbase_text = this._text;
			var editbase_value = this._value;

			if (!editbase_text) {
				editbase_text = "";
			}
			if (!editbase_value) {
				editbase_value = "";
			}

			if (!this._is_composition() && elem_value == editbase_text && elem_value == editbase_value && (elem_value == "" || (elem_value && (comp.maxlength == 0 || comp.maxlength >= this.getLength(elem, editbase_text))))) {
				this._setCaret(elem);
				this.onUpdateStyle(comp);

				if (elem.password && elem.maxlength > 0 && comp.autoskip) {
					this._autoskip_from_text_event();
				}

				return false;
			}

			this._old_text = this._text;
			if (this._old_value != this._value) {
				this._old_value = this._value;
			}
			this._old_begin_pos = this._begin_pos;
			this._old_end_pos = this._end_pos;

			if (this._is_selected()) {
				if (this._is_composition() || elem_pos.begin != elem_pos.end || this._input_begin_pos != elem_pos.begin) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
					this._begin_pos = this._old_begin_pos;
					this._end_pos = this._old_end_pos;
				}
			}

			var insertText = this.getInsertText(elem);

			if (nexacro.Browser == "Runtime") {
				if (this._text.length == elem_value.length && this._text != elem_value) {
					var replaceText = elem_value.substr(this._begin_pos, elem_pos.begin - this._begin_pos);
					if (replaceText.length > 0) {
						var temp = replaceText;

						replaceText = this.applyInputmode(replaceText);

						if (comp.inputmode == "lower") {
							if (replaceText == temp.toLowerCase()) {
								replaceText = temp;
							}
						}
						else if (comp.inputmode == "upper") {
							if (replaceText == temp.toUpperCase()) {
								replaceText = temp;
							}
						}
						replaceText = this._apply_inputfilter(replaceText);

						replaceText = this._apply_inputtype(replaceText);
						if (replaceText == "") {
							this._is_insertkey = true;
							insertText = temp;
						}
						else {
							if (!this._is_selected()) {
								this.clearBuffer(this._text, this._begin_pos, this._begin_pos + 1);
								this.syncValue();
							}
							insertText = replaceText;
						}
					}
				}
			}

			if (nexacro.OS == "Android" && (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit"))) {
				if (comp.maxlength > 0 && this._select_text == "" && this._focus_value && this._focus_value.length >= comp.maxlength) {
					var input_text = elem_value.substr(elem_pos.end - 1, elem_value.length - this._text.length);

					if (this._is_composition()) {
						if (this._stat_composition._curr_stat == nexacro.EditBase.Status.CompositionUpdate) {
							var compositiondata = this._stat_composition._curr_data;

							if (this._is_hangul(compositiondata)) {
								this._input_begin_pos = this._mobile_elme_pos = elem_pos.begin;
								insertText = input_text;
							}
							else if (this._is_full_japaness(compositiondata) || this._is_half_japaness(compositiondata)) {
								if (elem_pos.begin != this._begin_pos) {
									insertText = input_text;
									this.setElementCaretPos(elem_pos.begin, elem_pos.begin);
									this._input_begin_pos = this._mobile_elme_pos = elem_pos.begin;
								}
							}

							if (!this._is_hangul(compositiondata) && !this._is_half_japaness(compositiondata) && !this._is_full_japaness(compositiondata)) {
								var _lg_flag = window.navigator.appVersion.indexOf("LG");

								if (_lg_flag < 0) {
									elem.setElementValue(null);
									elem.setElementValue(this._text);
									this.setElementCaretPos(this._mobile_elme_pos, this._mobile_elme_pos, elem);
								}
								_lg_flag = null;
							}

							if (!this._is_half_japaness(compositiondata) && !this._is_full_japaness(compositiondata)) {
								this._is_mobile_drag = true;
							}
						}
					}
					else {
						if (!this._pasteAction) {
							var begin_pos = elem_pos.begin - 1 < 0 ? 0 : elem_pos.begin - 1;
							this._input_begin_pos = this._mobile_elme_pos = begin_pos;
							this._is_mobile_drag = true;
						}
					}
					input_text = null;
				}
			}

			if (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit") || nexacro.Browser == "Runtime") {
				if (this._is_composition() && this._keycode == nexacro.KeyCode_ImeInput && this._stat_composition.getPreviousStatus() == nexacro.EditBase.Status.CompositionUpdate) {
					if (this._old_text == this._text && this._old_text == elem_value) {
						return false;
					}
				}
			}

			var ret = this._fire_text_event(insertText);
			if (!this._is_composition()) {
				this._stat_composition.init();
			}

			if (nexacro.BrowserType == "Edge") {
				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
				if (this._keycode != nexacro.KeyCode_ImeInput && this._text.length < 500) {
					this.onUpdateStyle(comp);
				}
			}
			else {
				this.onUpdateStyle(comp);
			}

			return ret;
		};
	}

	_pEditBase._on_input_keyinput_after = function () {
		if (this._isPasteActionComplete) {
			this._pasteAction = false;
			this._cutAction = false;
		}
	};

	_pEditBase._on_default_input_copy = function (elem) {
	};

	_pEditBase._on_default_input_cut = function (elem) {
		this._cutAction = true;

		var pos = elem.getElementCaretPos();
		var val = elem.getElementValue();

		if (!pos || pos == -1) {
			this._undoStack.push(val, val, 0, 0);
		}
		else {
			this._begin_pos = pos.begin;
			this._end_pos = pos.end;
			this._undoStack.push(val, val, pos.begin, pos.end);
		}

		if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis._on_input_keyinput(elem);
			});
		}
	};

	_pEditBase._on_default_input_paste = function (elem) {
		this._pasteAction = true;

		var pos = elem.getElementCaretPos();
		var val = elem.getElementValue();

		if ((nexacro.Browser == "IE" || nexacro.Browser == "Runtime") && this._is_composition()) {
			var pos1 = pos.begin;
			pos1 = pos1 - this.getCompositionData(elem).length;
			if (pos1 < 0) {
				pos1 = 0;
			}

			this._begin_pos = pos1;
		}

		if (!pos || pos == -1) {
			this._undoStack.push(val, val, 0, 0);
		}
		else {
			this._undoStack.push(val, val, pos.begin, pos.end);
		}

		if (nexacro.OS == "iOS") {
			if (elem._is_ios_composition) {
				elem._is_ios_composition = false;
			}
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			this._set_input_begin_pos(pos.begin);
		}
		else if (nexacro.Browser == "IE" || nexacro.Browser == "Runtime") {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			if (this._check_maxlength && !this._check_maxlength() && !this._select_text) {
				elem.setElementValue(this._value);
				this._set_input_begin_pos(pos.begin);
			}
		}
		else if (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) {
			if (this._is_composition()) {
				var chartext = val;
				chartext = this.applyInputmode(chartext);
				chartext = this._apply_inputfilter(chartext);
				chartext = this._apply_inputtype(chartext);

				if (val != chartext) {
					this._accept_focus_event = false;
					this._accept_blur_event = false;
					elem.setElementBlur();
					elem.setElementFocus();

					this._cancel_event_char_from_text_event(this._begin_pos, this._end_pos);
				}
			}
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (!(pThis._ctrlkey && pThis._keycode == 86)) {
					pThis.setElementCaretPos(pThis._old_begin_pos, pThis._old_begin_pos);
				}

				pThis._on_input_keyinput(elem);
			});
		}
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
		_pEditBase._on_default_input_compositionstart = function (data) {
			var elem = this.comp._input_element;
			var val = elem.getElementValue();

			if (data == "" || this._is_hangul(data)) {
				if (this._compositionstart_value.length != val.length) {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						var compositionend_char = val.substr(this._input_begin_pos, 1);


						this._is_multi_inserttext = false;
						this._on_default_input_compositionend(compositionend_char);
					}
				}
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
		_pEditBase._on_default_input_compositionstart = function (data) {
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditBase._on_default_input_compositionstart = function (data) {
			if (this._is_compositionfocus) {
				var elem = this.comp._input_element;

				this._is_compositionfocus = false;
				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.OS == "Android") {
		_pEditBase._on_default_input_compositionstart = function (data) {
			if (this._keycode == 0) {
				this._set_input_begin_pos(this.comp._input_element.getElementCaretPos().begin);
			}
			else {
				this._set_input_begin_pos(this._begin_pos);
			}
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else {
		_pEditBase._on_default_input_compositionstart = function (data) {
			var ver_arr = nexacro.OSVersion.split(".");
			var major_ver = ver_arr[0], input_element = this.comp._input_element;
			if (nexacro.OS == "iOS" && major_ver >= 13 && input_element && input_element._is_keydown === false) {
				if (this._setElementValue) {
					this._setElementValue(input_element, this._begin_pos, this._end_pos, true);
				}
				this._stat_composition.init();

				input_element._is_ios_composition = false;

				return;
			}
			this._set_input_begin_pos(this._begin_pos);
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}

	if (nexacro.BrowserType == "Edge") {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();

			if (data == "" || this._is_hangul(data)) {
				this._bInsert = true;

				if (data.length > 1) {
					var compositiondata = "";
					var len = data.length;
					for (var i = 0; i < len; i++) {
						if (!this._is_hangul(data[i])) {
							break;
						}
						compositiondata += data[i];
					}

					if (compositiondata.length > 0 || (compositiondata.length == 0 && data.length > 10)) {
						data = compositiondata;
					}

					compositiondata = null;
					len = null;
				}

				if (this._compositionstart_value.length != val.length) {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						this._on_default_input_compositionstart(data);
					}
				}

				if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart) {
					this._compositionstart_value = val;
				}
			}

			if (this._is_nipon(data)) {
				if (this._isJapaneseReComposition()) {
					var begin_pos = pos.begin - data.length;
					var old_strFront = this._text.substr(0, begin_pos);
					var old_strRear = this._text.substr(this._old_begin_pos, this._text.length);
					var strFront = val.substr(0, begin_pos);
					var strRear = val.substr(pos.begin, val.length);

					if (old_strRear != strRear) {
						old_strRear = strRear;
					}

					if (old_strFront == strFront && old_strRear == strRear) {
						var old_data = this._text.substr(begin_pos, this._text.length - old_strRear.length);

						if (old_data != data) {
							this._setValue(strFront + strRear);
							this._input_begin_pos = pos.begin - data.length;
						}
						else {
							if (this._text == val && pos.begin != this._input_begin_pos) {
								this._input_begin_pos = pos.begin;
							}
						}
					}
				}
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();

			if (data == "" || this._is_hangul(data)) {
				this._bInsert = true;
				if (this._compositionstart_value.length != val.length) {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						this._on_default_input_compositionstart(data);
					}
				}

				if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart) {
					this._compositionstart_value = val;
				}
			}

			if (this._isJapaneseReComposition()) {
				if (this._begin_pos == this._end_pos) {
					this._input_begin_pos = pos.begin - data.length;

					if (this.comp.maxlength > 0) {
						var strFront = this._text.substr(0, this._input_begin_pos);
						var strRear = this._text.substr(pos.begin, this._text.length);
						var value = strFront + strRear;
						this._setValue(value);

						strFront = strRear = value = null;
					}
				}
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			if (this._is_compositionfocus) {
				var elem = this.comp._input_element;

				this._is_compositionfocus = false;
				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else if (nexacro.Browser == "Gecko") {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			this._precharcode = this._charcode;

			if (this._isJapaneseReComposition()) {
				var elem = this.comp._input_element;
				var pos = elem.getElementCaretPos();

				this._input_begin_pos = pos.begin;
				this._begin_pos = pos.begin;
				elem = pos = null;
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else if (nexacro.OS == "Android") {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			this._precharcode = this._charcode;
			if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart) {
				var elem = this.comp._input_element;
				var pos = elem.getElementCaretPos();

				if (pos.begin == pos.end && pos.begin == this._input_begin_pos) {
					if (this._text == this._value && elem.getElementValue() == this._value) {
						var begin = pos.begin - data.length >= 0 ? pos.begin - data.length : 0;
						var end = pos.end;
						if (data == this._value.slice(begin, end)) {
							this._set_input_begin_pos(begin);
							var front_val = this._value.slice(0, begin);
							var rear_val = this._value.slice(end);
							this._setValue(front_val + rear_val);
						}
					}
				}
			}
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			var ver_arr = nexacro.OSVersion.split(".");
			var major_ver = ver_arr[0];
			if (nexacro.OS == "iOS" && major_ver >= 13 && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
				return;
			}
			this._precharcode = this._charcode;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}

	if (nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && (nexacro.BrowserVersion == 11 || (nexacro.BrowserType == "IE10" && nexacro._getRealBrowserVersion() == 11)))) {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._compositionstart_value = "";
			if (nexacro.BrowserType == "Edge" && data.length > 1) {
				var compositiondata = "";
				var len = data.length;
				for (var i = 0; i < len; i++) {
					if (!this._is_hangul(data[i])) {
						break;
					}
					compositiondata += data[i];
				}

				if (compositiondata.length > 0 || (compositiondata.length == 0 && data.length > 10)) {
					data = compositiondata;
				}

				compositiondata = null;
				len = null;
			}
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);

			if (this._bStatChangeOnly) {
				return;
			}

			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();
			var pThis = this;

			if (nexacro.BrowserType == "Edge") {
				if (this._value == val) {
					return;
				}
			}

			var front_val = val.substr(0, this._input_begin_pos);

			if (this._multi_inserttext) {
				data = this._multi_inserttext;
			}

			var data_len = data ? data.length : 1;
			var input_val = val.substr(this._input_begin_pos, data_len);
			var rear_val = val.substr(pos.end, val.length - pos.end);
			var newText = front_val + input_val + rear_val;

			if ((nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) && this._multi_inserttext) {
				this._compositionend_newtext = newText;
				this._multi_inserttext = "";
			}

			if (data == "" || this._is_hangul(data)) {
				if (this._stat_mouse.getCurrentStatus() != nexacro.EditBase.Status.MouseDown && this._bInsert) {
					this._accept_keyinput_event = false;
				}

				if (this._accept_keyinput_event) {
					if (!this._is_on_killfocus) {
						if (input_val == "") {
							newText = val;
						}
						else {
							if (this._stat_composition._prev_data != "" && this._stat_composition._curr_data == "") {
								newText = val;
								input_val = "";
							}
						}
					}

					this._fire_text_event(input_val);

					if (this._textEventInfo.chartext != input_val) {
						newText = front_val + this._textEventInfo.chartext + rear_val;
					}

					this._text = newText;
					this._value = newText;
					this._compositionend_newtext = "";
					return true;
				}
				else {
					this._accept_keyinput_event = true;
				}
			}

			this._compositionend_newtext = "";
		};
	}
	else if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro.BrowserVersion >= 53) {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._compositionstart_value = "";
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);

			if (this._bStatChangeOnly) {
				return;
			}

			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();
			var pThis = this;

			var front_val = val.substr(0, this._input_begin_pos);
			var input_val = val.substr(this._input_begin_pos, data.length);
			var rear_val = val.substr(pos.end, val.length - pos.end);
			var newText = front_val + input_val + rear_val;

			if (this._accept_keyinput_event) {
				var prev_data = this._stat_composition.getPreviousData();
				if (data != "" && data != prev_data && this._is_hangul(prev_data)) {
					input_val = prev_data;
				}

				if (this._old_value != this._value) {
					this._old_value = this._value;
				}

				this._fire_text_event(input_val);
				return true;
			}
			else {
				this._accept_keyinput_event = true;
			}
		};
	}
	else if (nexacro.OS == "Mac OS" && nexacro.Browser == "Safari") {
		var BrowserVersion = window.navigator.appVersion.split('Version/')[1];
		BrowserVersion = BrowserVersion.split(' ')[0];
		var major_ver = BrowserVersion.split('.');

		if (major_ver[0] >= 10 && major_ver[1] > 0 || major_ver[0] >= 11) {
			_pEditBase._on_default_input_compositionend = function (data) {
				this._compositionstart_value = "";
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);

				if (this._bStatChangeOnly) {
					return;
				}

				var elem = this.comp._input_element;
				var val = elem.getElementValue();
				var pos = elem.getElementCaretPos();
				var pThis = this;

				var front_val = val.substr(0, this._input_begin_pos);
				var input_val = val.substr(this._input_begin_pos, data.length);
				var rear_val = val.substr(pos.end, val.length - pos.end);
				var newText = front_val + input_val + rear_val;

				if (this._accept_keyinput_event) {
					if (this._is_hangul(data)) {
						input_val = data;
					}
					this._fire_text_event(input_val);
					return true;
				}
				else {
					this._accept_keyinput_event = true;
				}
			};
		}
		else {
			_pEditBase._on_default_input_compositionend = function (data) {
				this._precharcode = 0;
				this._compositionstart_value = "";
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);
			};
		}
		BrowserVersion = major_ver = null;
	}
	else if (nexacro._isDesktop() && nexacro.Browser == "Safari") {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._precharcode = 0;
			this._compositionstart_value = "";
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);

			if (this._is_compositionfocus) {
				var elem = this.comp._input_element;

				this._is_compositionfocus = false;
				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
				this._stat_composition.init();
			}
		};
	}
	else {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._precharcode = 0;
			this._compositionstart_value = "";
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);
		};
	}

	_pEditBase._fire_text_event = function (chartext) {
		var ret = true;
		var bInsert = true;
		var bCut = false;
		var bCancel = false;
		var bFilled = false;

		var comp = this.comp;
		var elem = comp._input_element;

		var text = this._cutAction ? this._old_text : this._text;


		var value = this._value;
		var autoskip = comp.autoskip;
		var text_info = this._textEventInfo;
		var newText = this._get_newText_from_text_event(chartext);

		if (!text) {
			text = "";
		}

		var begin_pos = this._input_begin_pos;
		var end_pos = begin_pos + chartext.length;
		var old_chartext = chartext;
		var evt_chartext = chartext;

		if (this._is_insertkey) {
			this._is_insertkey = false;
			newText = this._text;
			end_pos = this._end_pos;
		}

		var strFront = newText.substr(0, begin_pos);
		var strRear = newText.substr(end_pos, newText.length - end_pos);
		var preImeText = this._stat_composition.getPreviousData();
		var postImeText = this._stat_composition.getData();
		var preCharEventText = strFront + this._select_text + strRear;

		bFilled = this._check_maxlength();
		this._initinfo_from_text_event(chartext, newText, begin_pos, end_pos);

		if (this._check_filterable(chartext)) {
			chartext = this.applyInputmode(chartext);
			chartext = this._apply_inputfilter(chartext);
			chartext = this._apply_inputtype(chartext);
			if (old_chartext.length > 0 && chartext.length == 0) {
				bCancel = true;
				chartext = this._select_text;
			}

			this._select_text = "";

			if (!bCancel) {
				bInsert = this._check_maxlength_from_text_event(chartext);
				if (!bInsert) {
					chartext = "";
					newText = comp.text;
				}
				else {
					chartext = this._apply_maxlength_from_text_event(chartext);

					if (chartext != old_chartext) {
						bCut = true;
					}
				}
			}

			if (bInsert) {
				this._accept_text_changed_status = 0;
			}

			newText = strFront + chartext + strRear;
			var newTextlen = this.getLength(elem, newText, false, null, comp.lengthunit);
			if (comp.maxlength > 0 && newTextlen > comp.maxlength) {
				var strlen = newText.length;
				while (strlen > 0) {
					var curTxt = newText.slice(0, strlen--);
					var ret = this.getLength(null, curTxt, false, null, comp.lengthunit);
					if (ret <= comp.maxlength) {
						newText = curTxt;
						break;
					}
				}
			}
		}

		ret = this._after_filterprocess_from_text_event(chartext, newText, bInsert, bCut);

		if (this._is_composition()) {
			evt_chartext = "";
		}

		text_info.setTextInfo(evt_chartext, text, ret.newText, preImeText, postImeText, preCharEventText, ret.bInsert, ret.bCut);

		if (!bCancel) {
			ret = comp._on_fire_textchangeEventSet(text_info);

			if (ret.bTextchangeRet) {
				if (ret.fireCancharEvent) {
					if (ret.bCancahrchangeRet && ret.bOncharRet) {
						this._setValue(text_info.posttext);
						this.syncValue();

						if (!this._is_undo) {
							var undo_pos = begin_pos + chartext.length;
							this._undoStack.push(this._value, this._value, undo_pos, undo_pos);
						}
					}
					else {
						if (this._is_hangul(chartext)) {
							this._cancel_event_char_from_text_event(begin_pos, begin_pos);
						}
						else {
							this._setText(this._old_value);
							this._setValue(this._old_value);
							this.syncValue();

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}

						return ret;
					}
				}

				if (text_info.pretext != text_info.posttext || this._accept_text_changed_status == 1) {
					this._setText(text_info.posttext);
					this.syncValue();

					if (ret.bChangeInputValue) {
						elem.setElementValue(text_info.posttext);
					}

					comp.on_fire_ontextchanged(comp, this._old_text, this._text);
					if (this._accept_text_changed_status == 1) {
						this._accept_text_changed_status = 2;
					}

					if (comp._is_set_value) {
						this._updateEventInfo(text_info);
						comp._is_set_value = false;
					}
				}

				if (bFilled != this._check_maxlength() && bInsert && !this._pasteAction && this._is_hangul(chartext) && nexacro.Browser != "Runtime") {
					this._accept_text_changed_status = 1;
				}

				if (evt_chartext != text_info.chartext) {
					if (comp._setcaret) {
						begin_pos = this._begin_pos;
					}
					else {
						begin_pos += text_info.chartext.length;
					}
					elem.setElementValue(text_info.posttext);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				}
				else {
					if (comp._setcaret) {
						begin_pos = this._begin_pos;
					}
					else {
						begin_pos += chartext.length;
					}
					this._after_eventset_fired_from_text_event(begin_pos);
				}
			}
			else {
				this._cancel_event_textchange_from_text_event(begin_pos, end_pos);
			}
		}

		if (!ret.bInsert) {
			this._not_insert_from_text_event(begin_pos, end_pos);
		}

		if (ret.bCut) {
			this._cut_from_text_event(begin_pos, end_pos);
		}

		if (bCancel) {
			this._cancel_from_text_event(newText, begin_pos, end_pos);
		}

		if (autoskip && !bCancel) {
			this._autoskip_from_text_event(old_chartext);
		}

		return ret;
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.OSVersion >= 6.0) {
			if (nexacro.SystemLang == "ja") {
				if (nexacro.BrowserVersion >= 9) {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
						if (!this._is_selected()) {
							this._select_text = "";
						}
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						if (!this._is_on_killfocus) {
							if (!this._set_timer_by_killfocus) {
								this._accept_keyinput_event = false;
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								elem.setElementBlur();
								if (!this._is_on_killfocus) {
									elem.setElementFocus();
								}

								this._accept_keyinput_event = false;
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);

							this._accept_keyinput_event = true;
							this._accept_focus_event = true;
							this._accept_blur_event = true;
						}
						else {
							this._set_timer_by_killfocus = true;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(pThis._text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._text);
						this.syncValue();

						if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

							elem.setElementBlur();
							elem.setElementFocus();
						}

						if (this._pasteAction && (nexacro.BrowserVersion == 9 || nexacro.BrowserVersion == 10)) {
							elem.setElementValue(this._text);
							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							if (this._is_composition()) {
								elem.setElementBlur();
								elem.setElementFocus();
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);

							this._accept_keyinput_event = true;
							this._accept_focus_event = true;
							this._accept_blur_event = true;
						}
						else {
							elem.setElementValue(this._text);
						}
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
				else {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						if (!chartext && !this._is_composition() && !this._is_undo) {
							this._text = this._value;
							return {
								newText : this._value, 
								bInsert : bInsert, 
								bCut : bCut
							};
						}
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						if (!this._is_on_killfocus) {
							if (!this._set_timer_by_killfocus) {
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								if (!((this._keycode == nexacro.Event.KEY_BACKSPACE || this._keycode == nexacro.Event.KEY_DELETE) && this._text == "")) {
									elem.setElementBlur();

									elem.setElementValue(this._text);

									nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
										pThis._accept_focus_event = false;
										pThis.setElementCaretPos(begin_pos, begin_pos, elem);
									});
								}
							}
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._value);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementValue(this._text);

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._accept_focus_event = false;
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementValue(this._text);

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._accept_focus_event = false;
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
			}
			else {
				if (nexacro.BrowserVersion >= 9) {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else if (this._compositionend_newtext) {
							var newText = this._compositionend_newtext;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					if (nexacro.BrowserVersion == 11) {
						_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							this._old_begin_pos = begin_pos;
							this._old_end_pos = end_pos;

							var elem = this.comp._input_element;

							this._setText(this._old_value);
							this._setValue(this._old_value);
							this.syncValue();

							this._accept_keyinput_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();

							var pThis = this;
							var oldValue = this._old_value;
							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._setText(oldValue);
								pThis._setValue(oldValue);
								pThis.syncValue();

								elem.setElementValue(oldValue);
								pThis.setElementCaretPos(begin_pos, end_pos, elem);
							});
						};
					}
					else {
						_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
							this._old_begin_pos = begin_pos;
							this._old_end_pos = begin_pos;

							this._cancel_from_text_event(this._old_value, begin_pos, begin_pos);
						};
					}

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
						if (!this._is_selected()) {
							this._select_text = "";
						}
					};

					if (nexacro.BrowserType == "Edge") {
						_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							if (this._is_composition()) {
								this._accept_keyinput_event = false;

								this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
							this._accept_keyinput_event = true;
						};
					}
					else {
						_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
								this._accept_keyinput_event = false;
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

								elem.setElementBlur();
								elem.setElementFocus();
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						};
					}

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._text);
						this.syncValue();

						if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

							elem.setElementBlur();
							elem.setElementFocus();
						}

						if (this._pasteAction && (nexacro.BrowserVersion == 9 || nexacro.BrowserVersion == 10)) {
							elem.setElementValue(this._text);
							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						this._is_cancel_event = true;
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (nexacro.BrowserVersion == 11) {
							if (this._is_composition() || (nexacro.Browser == "IE" && this._keycode == 229)) {
								this._accept_keyinput_event = false;

								this._bStatChangeOnly = true;
								this._on_input_compositionend("");
								this._bStatChangeOnly = false;
								this._accept_keyinput_event = true;
							}
						}
						else {
							this._accept_keyinput_event = false;

							this._on_input_compositionend("");
						}

						this._accept_focus_event = false;
						this._accept_blur_event = false;

						if (nexacro.BrowserType != "Edge") {
							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
						if (this._is_cancel_event == true) {
							this._is_cancel_event = false;
						}
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
				else {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
						this._old_begin_pos = begin_pos;
						this._old_end_pos = end_pos;

						var elem = this.comp._input_element;

						this._setText(this._old_value);
						this._setValue(this._old_value);
						this.syncValue();

						this._accept_keyinput_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();

						var pThis = this;
						var oldValue = this._old_value;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							pThis._setText(oldValue);
							pThis._setValue(oldValue);
							pThis.syncValue();

							elem.setElementValue(oldValue);
							pThis.setElementCaretPos(begin_pos, end_pos, elem);
						});
					};

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._value);
						this.syncValue();

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					};

					_pEditBase._cancel_from_text_event = function (newText) {
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
			}
		}
		else {
			if (nexacro.SystemLang == "ja") {
				_pEditBase._get_newText_from_text_event = function (chartext) {
					var elem = this.comp._input_element;

					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
						var newText = this._compositionend_value;
					}
					else {
						var newText = elem.getElementValue();
					}

					return newText;
				};

				_pEditBase._initinfo_from_text_event = function (chartext, text, begin, end) {
					if (chartext && !this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
						this._value = text.substr(0, begin) + text.substr(end, text.length - end);
					}
				};
				_pEditBase._check_maxlength_from_text_event = function (chartext) {
					return this._check_maxlength();
				};

				_pEditBase._apply_maxlength_from_text_event = function (chartext) {
					return this._apply_maxlength(chartext);
				};

				_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
					if (!chartext && !this._is_composition() && !this._is_undo) {
						this._text = this._value;
						return {
							newText : this._value, 
							bInsert : false, 
							bCut : false
						};
					}
					return {
						newText : newText, 
						bInsert : bInsert, 
						bCut : bCut
					};
				};

				_pEditBase._after_eventset_fired_from_text_event = function (pos) {
					var elem = this.comp._input_element;

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(pos, pos, elem);
					}
				};

				_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

				_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._old_text);
					this._setValue(this._old_value);
					this.syncValue();

					if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
						this._accept_keyinput_event = false;
						this._accept_focus_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();
						elem.setElementFocus();
					}

					elem.setElementValue(this._text);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				};

				_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._text);
					this._setValue(this._value);
					this.syncValue();

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(newText);
					this._setValue(newText);
					this.syncValue();

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._autoskip_from_text_event = function (chartext) {
					var bFilled = this._check_maxlength();
					if (!bFilled) {
						this._apply_autoskip();
					}
				};
			}
			else {
				_pEditBase._get_newText_from_text_event = function (chartext) {
					var elem = this.comp._input_element;

					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
						var newText = this._compositionend_value;
					}
					else {
						var newText = elem.getElementValue();
					}

					return newText;
				};

				_pEditBase._initinfo_from_text_event = function (chartext, text, begin, end) {
					if (chartext && !this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
						this._value = text.substr(0, begin) + text.substr(end, text.length - end);
					}
				};
				_pEditBase._check_maxlength_from_text_event = function (chartext) {
					return this._check_maxlength();
				};

				_pEditBase._apply_maxlength_from_text_event = function (chartext) {
					return this._apply_maxlength2(chartext);
				};

				_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
					return {
						newText : newText, 
						bInsert : bInsert, 
						bCut : bCut
					};
				};

				_pEditBase._after_eventset_fired_from_text_event = function (pos) {
					if (!this._is_on_killfocus) {
						this.setElementCaretPos(pos, pos);
					}
				};

				_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
					this._old_begin_pos = begin_pos;
					this._old_end_pos = end_pos;

					var elem = this.comp._input_element;

					this._setText(this._old_value);
					this._setValue(this._old_value);
					this.syncValue();

					this._accept_keyinput_event = false;
					this._accept_blur_event = false;

					elem.setElementBlur();

					var pThis = this;
					var oldValue = this._old_value;
					nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
						pThis._setText(oldValue);
						pThis._setValue(oldValue);
						pThis.syncValue();

						elem.setElementValue(oldValue);
						pThis.setElementCaretPos(begin_pos, end_pos, elem);
					});
				};

				_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._old_text);
					this._setValue(this._old_value);
					this.syncValue();

					if (this._is_composition() || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11 && this._keycode == 229)) {
						this._accept_keyinput_event = false;
						this._accept_focus_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();
						elem.setElementFocus();
					}

					elem.setElementValue(this._text);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				};

				_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					if (!this._is_on_killfocus) {
						this._accept_keyinput_event = false;
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._text);
					this._setValue(this._value);
					this.syncValue();

					if (!this._is_on_killfocus) {
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._cancel_from_text_event = function (newText) {
					var elem = this.comp._input_element;

					this._setText(newText);
					this._setValue(newText);
					this.syncValue();

					if (!this._is_on_killfocus) {
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._autoskip_from_text_event = function (chartext) {
					var bFilled = this._check_maxlength();
					if (!bFilled) {
						if (!(chartext != "" && !this._is_hangul(chartext))) {
							this._accept_keyinput_event = false;
						}

						this._apply_autoskip();
					}
				};
			}
		}
	}
	else if (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) {
		_pEditBase._get_newText_from_text_event = function (chartext) {
			var elem = this.comp._input_element;
			var newText = elem.getElementValue();

			return newText;
		};

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._setText(this._old_value);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(begin_pos, end_pos, elem);
		};

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
			elem.setElementValue(this._text, true);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(begin_pos, begin_pos, elem);

			if (this._is_selected()) {
				this._select_text = this._text.substring(this._begin_pos, this._end_pos);
			}
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	else if (nexacro.Browser == "Gecko") {
		_pEditBase._get_newText_from_text_event = function (chartext) {
			var elem = this.comp._input_element;
			var newText = elem.getElementValue();

			return newText;
		};

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._old_begin_pos = begin_pos;
			this._old_end_pos = end_pos;

			this._cancel_from_text_event(this._old_value);
		};

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;


			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				elem.setElementBlur();
				elem.setElementFocus();
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				elem.setElementBlur();
				elem.setElementFocus();
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
			if (!this._accept_cut_process) {
				this._accept_cut_process = true;
				return;
			}

			var elem = this.comp._input_element;

			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				this._accept_keyinput_event = false;
				this._accept_cut_process = false;

				elem.setElementBlur();
				elem.setElementFocus();

				this._accept_keyinput_event = true;
			}

			if (this._old_begin_pos != this._old_end_pos) {
				this._accept_select_event = false;
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(begin_pos, begin_pos, elem);

			if (this._is_selected()) {
				this._select_text = this._text.substring(this._begin_pos, this._end_pos);
			}
			this._accept_cut_process = true;
			this._accept_focus_event = true;
			this._accept_blur_event = true;
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	else {
		if (nexacro.OS == "iOS") {
			_pEditBase._get_newText_from_text_event = function (chartext) {
				var elem = this.comp._input_element;
				var newText = elem.getElementValue();

				if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
					newText = this._compositionend_value;
				}
				else if (major_ver >= 13 && elem._keypad_type == "number") {
					if (this._value) {
						newText = this._value.slice(0, this._input_begin_pos) + chartext + this._value.slice(this._input_begin_pos);
					}
					else {
						newText = chartext;
					}
				}

				return newText;
			};
		}
		else {
			_pEditBase._get_newText_from_text_event = function (chartext) {
				var elem = this.comp._input_element;
				var newText = elem.getElementValue();

				return newText;
			};
		}

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		if (nexacro.Browser == "Safari") {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._setText(this._old_value);
				this._setValue(this._old_value);
				this.syncValue();

				this._accept_focus_event = false;
				this._accept_blur_event = false;
				this._accept_keyinput_event = false;

				elem.setElementBlur();
				elem.setElementValue("");
				elem.setElementFocus();

				elem.setElementValue(this._text);
				this.setElementCaretPos(begin_pos, end_pos, elem);
			};
		}
		else if (nexacro.Browser == "MobileSafari") {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._setText(this._old_value);
				this._setValue(this._old_value);
				this.syncValue();

				this._accept_keyinput_event = false;

				this._on_default_input_compositionend("");

				this.setElementCaretPos(0, 0, elem);
				elem.setElementValue("", true);

				this._old_begin_pos = begin_pos;
				this._old_end_pos = end_pos;
				this._begin_pos = begin_pos;
				this._end_pos = end_pos;
				this._set_input_begin_pos(begin_pos);

				var pThis = this;
				var oldValue = this._old_value;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis._setText(oldValue);
					pThis._setValue(oldValue);
					pThis.syncValue();

					pThis._old_value = oldValue;
					pThis._old_text = oldValue;

					elem.setElementValue(oldValue, true);
					pThis.setElementCaretPos(begin_pos, end_pos, elem);

					pThis._compositionend_value = elem.getElementValue();
				});
			};
		}
		else {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._old_begin_pos = begin_pos;
				this._old_end_pos = end_pos;

				this._cancel_from_text_event(this._old_value);
			};
		}

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;

			if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") {
				elem.setElementValue(null);
			}
			elem.setElementValue(this._text);
			if (nexacro.Browser == "Safari") {
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}
			else if (nexacro.Browser == "Runtime") {
				if (this._keycode != nexacro.Event.KEY_BACKSPACE) {
					this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
				}
			}
			else {
				this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
			}
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;
			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") {
				elem.setElementValue(null);
			}
			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;
			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari" && !this._pasteAction) {
				elem.setElementValue(null);
			}
			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	;

	_pEditBase._is_composition = function () {
		if (this._stat_composition) {
			return (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate);
		}
		else {
			return false;
		}
	};

	_pEditBase._is_selected = function (elem) {
		if (!elem) {
			return (this._begin_pos != this._end_pos);
		}
		else {
			if ((nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11)) && !this._pasteAction) {
				var elem_value = elem.getElementValue();

				return ((this._begin_pos != this._end_pos) && ((!this._value || !elem_value) || (this._value && elem_value && elem_value.length <= this._value.length)));
			}
			else {
				return (this._begin_pos != this._end_pos);
			}
		}
	};

	_pEditBase._is_cleared = function (elem) {
		var cur_text = elem.getElementValue();
		if (cur_text == "" && cur_text != this._text) {
			return true;
		}
		return false;
	};

	_pEditBase._is_hangul = function (v) {
		var r = new RegExp("[\\uac00-\\ud7af\\u3130-\\u318f\\u1100-\\u11ff]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditBase._is_nipon = function (v) {
		var regexp_nipon = /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]|[\uFF01-\uFFEF]|[\u3000-\u3002]|[\u300C]|[\u300D]|[\u309B]|[\u309C]|[\u2010-\u201F]/;
		var regexp_hanja = /[\u2E80-\u2EFF]|[\u3400-\u4DBF]|[\u4E00-\u9FBF]|[\uF900-\uFAFF]|[\u20000-\u2A6DF]|[\u2F8000-\u2FA1F]/;
		var regexp_ascii = /[\u0000-\u007F]/;
		var regexp_greek = /[\u0370-\u03FF]/;

		if (regexp_nipon.test(v) || regexp_hanja.test(v)) {
			return true;
		}

		if (this._keycode == 229) {
			if (regexp_ascii.test(v)) {
				return true;
			}
			if (regexp_greek.test(v)) {
				return true;
			}
		}

		return false;
	};
	_pEditBase._check_filterable = function (data) {
		if (data == null) {
			return false;
		}

		if (this._is_hangul(data) || !this._is_composition()) {
			return true;
		}

		return false;
	};

	_pEditBase._set_enable = function (v) {
		if (this.comp && this.comp._input_element) {
			this.comp._input_element.setElementEnable(v);
		}
	};

	_pEditBase._setText = function (v) {
		if (!nexacro._isNull(v)) {
			if (!(typeof v == "string")) {
				v = nexacro._toString(v);
			}
			v = v.replace(/\r\n/g, "\n");
		}
		else {
			v = "";
		}
		this._text = v;
	};

	_pEditBase._setValue = function (v) {
		if (!nexacro._isNull(v)) {
			if (!(typeof v == "string")) {
				v = nexacro._toString(v);
			}
		}
		this._value = v;
	};

	_pEditBase._getText = function () {
		return this._text;
	};

	_pEditBase._getValue = function () {
		return this._value;
	};

	_pEditBase._getFocusText = function () {
		return this._focus_text;
	};

	_pEditBase._getFocusValue = function () {
		return this._focus_value;
	};

	_pEditBase._setCaret = function (elem) {
		var pos = elem.getElementCaretPos();

		if (pos && pos != -1) {
			this._old_begin_pos = this._begin_pos;
			this._old_end_pos = this._end_pos;

			this._begin_pos = pos.begin;
			this._end_pos = pos.end;

			if (!this._is_composition() && !elem._is_ios_composition) {
				this._set_input_begin_pos(pos.begin);
			}
		}
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		_pEditBase._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;
				this.setElementCaretPos(0, text.length, elem);
				this.onUpdateStyle(comp);
			}
		};
	}
	else if (nexacro.OS == "Android") {
		_pEditBase._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var pThis = this;
				var text = this._select_text = this._text;
				this._is_apply_autoselect = true;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis.setElementCaretPos(0, text.length, elem);
				}, 0);
			}
		};
	}
	else {
		_pEditBase._apply_autoselect = function (elem, mflag) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;

				this._is_apply_autoselect = true;


				this.setElementCaretPos(0, text.length, elem);
			}
		};
	}

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari" || nexacro.Browser == "IE") {
		_pEditBase._apply_autoskip = function () {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis.comp.on_apply_autoskip();
			}, 0);
		};
	}
	else {
		_pEditBase._apply_autoskip = function () {
			var comp = this.comp;
			comp.on_apply_autoskip();
		};
	}

	_pEditBase.applyInputmode = function (v) {
		if (!v) {
			return v;
		}

		var gbn = this.comp.inputmode;

		if (gbn) {
			switch (gbn.toLowerCase()) {
				case "upper":
					v = v.toUpperCase();
					break;
				case "lower":
					v = v.toLowerCase();
					break;
				default:
					break;
			}
		}
		return v;
	};

	_pEditBase._setFocusValue = function () {
		this._focus_text = this._text;
		this._focus_value = this._value;
	};

	_pEditBase._calcCaret = function (pos, halign, pretext, posttext) {
		if (pos && pos != -1) {
			var begin = pos.begin;

			var pre_len = pretext.length;
			var post_len = posttext.length;

			if (pre_len > post_len) {
				var diff_len = pre_len - post_len;
				var is_odd = diff_len % 2 ? true : false;

				if (halign == "center") {
					if (is_odd) {
						var post_caret = begin - diff_len;

						if (post_caret < 0) {
							begin = 0;
						}
						else if (post_caret >= post_len) {
							begin = post_len;
						}
						else {
							begin = post_caret + 1;
						}
					}
					else {
						var correct_caret = diff_len / 2;
						var post_caret = begin - correct_caret;

						if (post_caret <= 0) {
							begin = 0;
						}
						else if (post_caret >= post_len) {
							begin = post_len;
						}
						else {
							begin = post_caret;
						}
					}
				}
				else if (halign == "right") {
					if ((begin - diff_len) <= 0) {
						begin = 0;
					}
					else {
						begin -= diff_len;
					}
				}
			}
			else if (pre_len < post_len) {
				begin = pos.begin;
			}
		}
		else {
			var begin = 0;
		}

		return {
			begin : begin, 
			end : begin
		};
	};

	_pEditBase._updateCaretPos = function () {
		var comp = this.comp;
		if (comp) {
			this._set_input_begin_pos(!nexacro._isNull(comp.text) ? comp.text.length : -1);

			if (comp._old_selection) {
				comp._old_selection[0] = comp._old_selection[1] = this._input_begin_pos;
			}
		}
		comp = null;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
		_pEditBase._apply_style = function (elem) {
			var comp = this.comp;
			if (comp && comp._is_created) {
				var bWidthChange = (elem.width <= 0) ? false : true;
				var cur_width = elem.width;

				elem.setElementSize((cur_width > 0) ? cur_width = cur_width - 1 : cur_width, elem.height);

				nexacro.OnceCallbackTimer.callonce(this.comp, function () {
					elem.setElementSize(bWidthChange ? cur_width + 1 : cur_width, elem.height);
				}, 0);
			}
		};
	}
	else {
		_pEditBase._apply_style = nexacro._emptyFn;
	}

	_pEditBase._apply_elementtype = function (elem) {
		if (elem && !elem.password) {
			elem.setElementInputType(this.comp.inputtype);
			elem.setElementInputTypeKeypad(this.comp.inputtype);
		}
	};

	_pEditBase._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (elem_value.length == (this._text.length - 1)) {
			if (this._keycode == 0) {
				if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
					return true;
				}
			}
		}

		return false;
	};

	_pEditBase._setAccessibilityNotifyLabel = function () {
		var comp = this.comp;
		if (comp) {
			comp._refreshAccessibilityValue();
			var accessibility = comp.on_find_CurrentStyle_accessibility(comp._pseudo);
			var label = comp._getAccessibilityLabel(accessibility);
			if (comp.value == null && comp.displaynulltext.length > 0) {
				label = label + " " + comp.displaynulltext;
				comp._setAccessibilityLabel(label);
			}
			return label;
		}
		return null;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
		_pEditBase._isJapaneseReComposition = function () {
			var ret = false;
			var data = this._stat_composition.getData();
			var curr_stat = this._stat_composition.getCurrentStatus();

			if (!this._is_hangul(data) && curr_stat == nexacro.EditBase.Status.CompositionStart && data != "" && this._keycode == nexacro.KeyCode_ImeInput) {
				ret = true;
			}

			data = null, curr_stat = null;
			return ret;
		};
	}
	else if (nexacro.BrowserType == "Edge") {
		_pEditBase._isJapaneseReComposition = function () {
			var ret = false;
			var curr_stat = this._stat_composition.getCurrentStatus();

			if (curr_stat == nexacro.EditBase.Status.CompositionStart && (this._old_begin_pos == this._old_end_pos) && (this._begin_pos == this._end_pos) && (this._input_begin_pos && this._begin_pos)) {
				ret = true;
			}

			curr_stat = null;
			return ret;
		};
	}
	else if (nexacro.Browser == "Gecko") {
		_pEditBase._isJapaneseReComposition = function () {
			var ret = false;
			var data = this._stat_composition.getData();
			var curr_stat = this._stat_composition.getCurrentStatus();
			var pos = this.comp._input_element.getElementCaretPos();

			if (!this._is_hangul(data) && curr_stat == nexacro.EditBase.Status.CompositionStart && data != "" && (this._input_begin_pos == this._begin_pos)
				 && (this._begin_pos == this._end_pos) && (this._begin_pos != pos.begin)) {
				ret = true;
			}

			pos = null, data = null, curr_stat = null;
			return ret;
		};
	}
	else {
		_pEditBase._isJapaneseReComposition = nexacro._emptyFn;
	}

	_pEditBase._updateEventInfo = function (text_info, textEvt, charEvt) {
		var _value = nexacro._isNull(this._value) ? "" : this._value;
		if (text_info) {
			text_info.chartext = _value;
			text_info.posttext = this._value;
			text_info.postimetext = "";
		}
		if (textEvt) {
			textEvt.chartext = _value;
			textEvt.posttext = _value;
		}
		if (charEvt) {
			charEvt.chartext = _value;
			charEvt.posttext = _value;
		}
		_value = null;
	};

	delete _pEditBase;
	_pEditBase = null;

	nexacro.EditNormal = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._pre_char = "";

		this._typeRegex = undefined;
		this._typeRegex1 = undefined;
	};

	_pEditNormal = nexacro._createPrototype(nexacro.EditBase, nexacro.EditNormal);
	nexacro.EditNormal.prototype = _pEditNormal;

	_pEditNormal._type_name = "EditNormal";

	_pEditNormal._filterRegexMap = {
		alpha : "a-zA-Z", 
		comma : ",", 
		digit : "0-9", 
		symbol : "!\"#$%&'()*\\/;:<=>?@\\[\\\\\\]\\^_`{|}~'\\\\\\u20a9", 
		sign : "+\\-", 
		space : " \t", 
		dot : "."
	};

	_pEditNormal._typeRegexMap = {
		alpha : "a-zA-Z", 
		comma : ",", 
		digit : "0-9", 
		dot : ".", 
		english : "a-zA-Z", 
		symbol : "!\"#$%&+,.'()*\\-/;:<=>?@[\\\\\\]\\^_`{|}~'\\u20a9", 
		number : "0-9\\-.,", 
		numberandenglish : "0-9\\-.,\\a-zA-Z", 
		sign : "+\\-", 
		space : " \t", 
		half : "\\uff61-\\uff9f\\uffe8-\\uffee\\!\"#$%&'()*+,\\-./;:<=>?@[\\\\\\]\\^_`{|}~'\\a-zA-Z\\0-9+", 
		full : "\\uff01-\\uff60\\uffe0-\\uffe6"
	};

	_pEditNormal._destroy = function () {
		this._filterRegexMap = null;
		this._typeRegexMap = null;

		this._typeRegex = null;
		this._typeRegex1 = null;

		nexacro.EditBase.prototype._destroy.call(this);
	};

	_pEditNormal.getWCharLen = function (v) {
		var c = v.charCodeAt(0);

		if (((c & 0xff80) == 0) || c == 0x20a9) {
			return 1;
		}
		else if ((c & 0xff00) < 0x0800) {
			return 2;
		}
		else {
			return 3;
		}
	};

	_pEditNormal._is_english = function (v) {
		var r = new RegExp("[\\u0041-\\u007a]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_half_japaness = function (v) {
		var r = new RegExp("[\\uff61-\\uff9f]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_full_japaness = function (v) {
		var r = new RegExp("[\\u3041-\\u30f6\\uff10-\\uff5a\\u3000]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_dakuten = function (v) {
		var r = new RegExp("\\uff9e");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_handakuten = function (v) {
		var r = new RegExp("\\uff9f");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal.setInputfilter = function (strInputfilter) {
		var arr = strInputfilter.split(",");
		var buffer = "";
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var regex = this._filterRegexMap[arr[i]];
			if (regex) {
				buffer += regex;
			}
		}
		if (buffer.length) {
			this._filterRegex = new RegExp("[" + buffer + "]");
		}
		else {
			this._filterRegex = undefined;
		}
	};

	_pEditNormal.setInputType = function (v) {
		var arr = v.split(/\s*,\s*/);
		var buffer = "";
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var regex = this._typeRegexMap[arr[i]];
			if (regex) {
				buffer += regex;
			}
		}

		if (buffer.length) {
			this._typeRegex = new RegExp("[" + buffer + "]");
			if (v.indexOf("full") != -1) {
				var f = this._typeRegexMap["half"];
				this._typeRegex1 = new RegExp("[" + f + "]");
			}

			if (!(v.indexOf("full") != -1 || v.indexOf("normal") != -1)) {
				this._accept_hangul = false;
			}
		}
		else {
			this._typeRegex = undefined;
			this._typeRegex1 = undefined;
		}
	};

	_pEditNormal.syncValue = function () {
		var comp = this.comp;
		var elem = comp._input_element;

		comp.value = this._value;

		if (comp.password) {
			comp.text = this._text.replace(/./gi, "*");
			if (elem) {
				elem.setElementPassword(comp.password);
			}
		}
		else {
			comp.text = this._text;
		}
	};

	_pEditNormal.setSelectText = function (elem, v) {
		if (v && v.length > 0) {
			var comp = this.comp;
			var start = this._begin_pos !== undefined ? this._begin_pos : 0;
			var end = this._end_pos !== undefined ? this._end_pos : 0;

			if (start == end) {
				return "";
			}

			var curTxt = this._text;
			if (comp.maxlength && !((+comp.maxlength) != (+comp.maxlength))) {
				var ret = this.getLength(elem, curTxt);
				if (comp.maxlength <= ret) {
					return "";
				}
			}

			var ret = [];
			var c = "";

			for (var i = 0, n = v.length; i < n; i++) {
				c = v.charAt(i);

				if (this._filterRegex) {
					if (this._filterRegex.test(c)) {
						continue;
					}
				}
				if (this._typeRegex) {
					if (!this._typeRegex.test(c)) {
						if (comp.inputtype == "full") {
							if (this.getWCharLen(c) == 1 || this._typeRegex1.test(c)) {
								continue;
							}
						}
						else {
							continue;
						}
					}

					if (comp.inputtype != "full" && this.getWCharLen(c) > 1) {
						continue;
					}
				}
				ret.push(c);
			}

			var selText = comp.getSelectedText();
			var str = ret.join("");
			if (str.length > 0) {
				var newText = curTxt.substring(0, start) + str + curTxt.substr(end);
				if (this._text != newText) {
					this._setText(newText);

					this.writeBuffer(elem);
					this._setValue(this._text);
					this.syncValue();

					this._begin_pos = start;
					this._end_pos = start + str.length;

					elem.setElementSetSelect(this._begin_pos, this._end_pos);
				}

				return selText;
			}
		}
		return "";
	};

	_pEditNormal.applyInputmode = function (v) {
		if (!v) {
			return v;
		}

		var gbn = this.comp.inputmode;
		var text = "";
		var i = 0;
		var v_len = v.length;
		if (gbn) {
			switch (gbn.toLowerCase()) {
				case "upper":
					{

						for (i = 0; i < v_len; i++) {
							var c = v.charAt(i);
							var len = this.getWCharLen(c);
							if (len == 1) {
								c = c.toUpperCase();
							}

							text += c;
						}
					}
					break;
				case "lower":
					{

						for (i = 0; i < v_len; i++) {
							var c = v.charAt(i);
							var len = this.getWCharLen(c);
							if (len == 1) {
								c = c.toLowerCase();
							}

							text += c;
						}
					}
					break;
				default:
					{

						text = v;
					}
					break;
			}
		}
		return text;
	};

	_pEditNormal.setLengthunit = function (v) {
		this._lengthunit = v;
	};

	_pEditNormal.getLength = function (elem, str, bStr, checkLen, unitGbn) {
		if (str === undefined) {
			return 0;
		}

		if (unitGbn === undefined) {
			unitGbn = this._lengthunit;
		}
		if (bStr) {
			if (unitGbn == "utf8") {
				return this.utf8ByteCount(elem, str, bStr, checkLen);
			}
			else if (unitGbn == "ascii") {
				return this.asciiByteCount(elem, str, bStr, checkLen);
			}
			else {
				var comp = this.comp;

				if (checkLen === undefined) {
					checkLen = comp.maxlength;
				}
				var ret = str;
				if (checkLen < str.length) {
					ret = ret.substring(0, checkLen);
				}
				return {
					"len" : str.length, 
					"str" : ret
				};
			}
		}
		else {
			if (unitGbn == "utf8") {
				return this.utf8ByteCount(elem, str);
			}
			else if (unitGbn == "ascii") {
				return this.asciiByteCount(elem, str);
			}
			else {
				return str.length;
			}
		}
	};

	_pEditNormal.utf8Len = function (codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint < 0) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint <= 0x7F) {
			return 1;
		}
		if (codePoint <= 0x7FF) {
			return 2;
		}
		if (codePoint <= 0xFFFF) {
			return 3;
		}
		if (codePoint <= 0x1FFFFF) {
			return 4;
		}
		if (codePoint <= 0x3FFFFFF) {
			return 5;
		}
		if (codePoint <= 0x7FFFFFFF) {
			return 6;
		}
		throw new Error("Illegal argument: " + codePoint);
	};

	_pEditNormal.isHighSurrogate = function (codeUnit) {
		return codeUnit >= 0xD800 && codeUnit <= 0xDBFF;
	};

	_pEditNormal.isLowSurrogate = function (codeUnit) {
		return codeUnit >= 0xDC00 && codeUnit <= 0xDFFF;
	};

	_pEditNormal.toCodepoint = function (highCodeUnit, lowCodeUnit) {
		if (!this.isHighSurrogate(highCodeUnit)) {
			throw new Error("Illegal argument: " + highCodeUnit);
		}
		if (!this.isLowSurrogate(lowCodeUnit)) {
			throw new Error("Illegal argument: " + lowCodeUnit);
		}
		highCodeUnit = (0x3FF & highCodeUnit) << 10;
		var u = highCodeUnit | (0x3FF & lowCodeUnit);
		return u + 0x10000;
	};

	_pEditNormal.utf8ByteCount = function (elem, str, bRetStr, checkLen) {
		if (str === undefined) {
			return 0;
		}

		var count = 0;

		if (bRetStr) {
			var comp = this.comp;

			if (checkLen === undefined) {
				checkLen = comp.maxlength;
			}
			var stopPos = str.length;
			for (var i = 0, n = str.length; i < n; i++) {
				var ch = str.charCodeAt(i);
				if (this.isHighSurrogate(ch)) {
					var high = ch;
					var low = str.charCodeAt(++i);
					count += this.utf8Len(this.toCodepoint(high, low));
				}
				else {
					count += this.utf8Len(ch);
				}
				if (checkLen == count) {
					stopPos = i;
					break;
				}
				else if (checkLen < count) {
					stopPos = i - 1;
					break;
				}
			}
			return {
				"len" : count, 
				"str" : str.substring(0, stopPos + 1)
			};
		}

		for (var i = 0, n = str.length; i < n; i++) {
			var ch = str.charCodeAt(i);

			if (this.isHighSurrogate(ch)) {
				var high = ch;
				var low = str.charCodeAt(++i);
				count += this.utf8Len(this.toCodepoint(high, low));
			}
			else {
				count += this.utf8Len(ch);
			}
		}
		return count;
	};

	_pEditNormal.asciiByteCount = function (elem, str, bRetStr, checkLen) {
		if (str === undefined) {
			return 0;
		}

		var j = 0, val;
		if (bRetStr) {
			var comp = this.comp;

			if (checkLen === undefined) {
				checkLen = comp.maxlength;
			}
			var stopPos = str.length;
			for (var i = 0, n = str.length; i < n; i++) {
				val = str.charCodeAt(i);
				var char = str.substr(i, 1);
				if (val > 255 && !this._is_half_japaness(char)) {
					j++;
					if (checkLen >= j) {
						stopPos = i - 1;
					}
				}
				j++;
				if (checkLen >= j) {
					stopPos = i;
				}
			}
			return {
				"len" : j, 
				"str" : str.substring(0, stopPos + 1)
			};
		}
		else {
			for (var i = 0, n = str.length; i < n; i++) {
				val = str.charCodeAt(i);
				var char = str.substr(i, 1);
				if (val > 255 && !this._is_half_japaness(char)) {
					j++;
				}
				j++;
			}
			return j;
		}
	};

	_pEditNormal.deleteChar = function (bBack) {
		var text = this._text ? this._text : "";

		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;

		if (bBack) {
			if (begin_pos == end_pos) {
				if (nexacro.OS == "iOS") {
					var v = text.substr(begin_pos - 1 < 0 ? 0 : begin_pos - 1, 1);
					if (this._is_dakuten(v) || this._is_handakuten(v)) {
						var i = begin_pos - 1;

						while (this._is_dakuten(v) || this._is_handakuten(v)) {
							i--;
							if (i < 0) {
								break;
							}
							v = text.substr(i < 0 ? 0 : i, 1);
						}

						begin_pos = i;
					}
					else {
						begin_pos--;
					}
				}
				else {
					begin_pos--;
				}
			}
		}
		else {
			if (begin_pos == end_pos) {
				end_pos++;
			}
		}

		var strFront = text.substr(0, begin_pos);
		var strRear = text.substr(end_pos, text.length - end_pos);
		var newText = strFront + strRear;

		if (text != newText) {
			this._setText(newText);

			if ((nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11)) && 
				this._is_composition()) {
				var _begin_pos = _end_pos = this._input_begin_pos;

				if (bBack) {
					if (--_begin_pos < 0) {
						_begin_pos = 0;
					}
				}
				else {
					++_end_pos;
				}
				var f_v = this._value ? this._value.substr(0, _begin_pos) : "";
				var r_v = this._value ? this._value.substr(_end_pos) : "";
				this._setValue(f_v + r_v);
				this.setElementCaretPos(_begin_pos, _begin_pos);
				return true;
			}

			if (nexacro.OS != "iOS" || (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari" && !this._is_composition())) {
				this._setValue(newText);
			}
			this.setElementCaretPos(begin_pos, begin_pos);

			return true;
		}
		else {
			return false;
		}
	};

	_pEditNormal._on_default_input_keydown = function (elem, keyCode, altKey, ctrlKey, shiftKey, metaKey) {
		var E = nexacro.Event;
		var comp = this.comp;
		if (!comp) {
			return false;
		}

		var readonly = comp.readonly;

		var ret = true;

		if (readonly == true) {
			this.onUpdateStyle(comp);
			if (ctrlKey && keyCode == 67 || ctrlKey && keyCode == 65) {
				return true;
			}

			return false;
		}

		var _input_begin_pos = this._input_begin_pos;
		if (this._check_maxlength()) {
			this._setCaret(elem);

			if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
				this._input_begin_pos = _input_begin_pos;
			}
		}

		if (keyCode == nexacro.KeyCode_ImeInput) {
			if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
				if (nexacro.OSVersion < 6.0 && !this._is_composition()) {
					this._set_input_begin_pos(this._old_begin_pos);
				}
			}

			if (nexacro.BrowserType == "Edge") {
				if (this._is_composition() && this._is_hangul(this.getCompositionData(elem))) {
					if (this._accept_hangul) {
						if (this._stat_composition.getPreviousStatus() == nexacro.EditBase.Status.CompositionEnd) {
							var data = this.getCompositionData(elem);
							this._on_input_compositionend(data);
							this._fire_text_event(data);
							this._on_input_compositionstart(data);
						}
					}
				}
			}
		}
		else {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					if (keyCode == E.KEY_BACKSPACE || keyCode == E.KEY_DELETE) {
						if (this._is_hangul(data)) {
							this._on_input_compositionend("");
							this._stat_composition.init();
							this._compositionend_value = "";
						}
					}
					else if (keyCode == E.KEY_SPACE || keyCode == E.KEY_ESC || (keyCode >= E.KEY_PAGE_UP && keyCode <= E.KEY_DOWN)) {
						if (this._is_hangul(data)) {
							this._on_input_compositionend(data);
							this._fire_text_event(data);
							this._on_input_keyinput(elem);
						}
					}
				}
			}
			else {
				if (this._is_composition() && ((keyCode == E.KEY_BACKSPACE && (nexacro.Browser != "MobileSafari" || (nexacro.Browser == "MobileSafari" && this._is_hangul(this.getCompositionData(elem)))))
					 || keyCode == E.KEY_DELETE || (nexacro.OS != "iOS" && keyCode == E.KEY_SPACE) || (keyCode >= E.KEY_PAGE_UP && keyCode <= E.KEY_DOWN))) {
					if (this._is_hangul(this.getCompositionData(elem))) {
						this._on_input_compositionend("");
						this._stat_composition.init();
						this._compositionend_value = "";
					}
				}

				if (nexacro.BrowserType == "Edge" && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
					var data = this._stat_composition.getData();
					if (this._is_hangul(data)) {
						this._on_input_compositionend(data);
						this._fire_text_event(data);
					}
				}
			}

			if (!shiftKey) {
				var pos = elem.getElementCaretPos();
				if (pos != -1) {
					if (keyCode == E.KEY_LEFT) {
						if (pos.begin > 0) {
							this._set_input_begin_pos(this._begin_pos = this._end_pos = elem.getElementCaretPos().begin - 1);
						}
					}
					else if (keyCode == E.KEY_RIGHT) {
						if (pos.begin < this._text.length) {
							this._set_input_begin_pos(this._begin_pos = this._end_pos = elem.getElementCaretPos().begin + 1);
						}
					}
				}
			}

			if (keyCode == E.KEY_TAB) {
				if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					this._on_input_compositionend(data);
					this._fire_text_event(data);
				}

				if (comp.acceptstab || (ctrlKey && !comp.acceptstab)) {
					this.insertTabChar(elem);
					this._on_input_keyinput(elem);

					elem._event_stop = true;
					return false;
				}
			}

			if (ctrlKey && (keyCode == 90)) {
				if ((nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10) || nexacro.Browser != "IE") {
					this._is_undo = true;
					this._undoStack.doUndo();
					this._setCaret(elem);
					if (!this._is_composition()) {
						this._stat_composition.init();
						this._on_input_keyinput(elem);
					}
				}
				else {
					this._stat_composition.init();
					this._on_input_keyinput(elem);

					this._is_undo = true;
					this._undoStack.doUndo();
					this._setCaret(elem);
				}

				this._on_input_keyinput(elem);
				this._is_undo = false;

				elem._event_stop = true;
				return false;
			}
			else if (ctrlKey && (keyCode == 89)) {
				this._is_undo = true;
				this._undoStack.doRedo();
				this._setCaret(elem);
				if (!this._is_composition()) {
					this._stat_composition.init();
					this._on_input_keyinput(elem);
				}
				this._on_input_keyinput(elem);
				this._is_undo = false;

				elem._event_stop = true;
				return false;
			}
		}

		if (keyCode == 229) {
			this._accept_select_event = false;
		}

		var movefocus = false;
		if (keyCode == E.KEY_TAB && comp && comp.acceptstab == false) {
			movefocus = true;
		}

		if (nexacro.BrowserType == "Edge") {
			if (!this._is_composition()) {
				this.onUpdateStyle(comp, movefocus);
			}
		}
		else {
			this.onUpdateStyle(comp, movefocus);
		}

		this._keycode = keyCode;
		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;
	};

	_pEditNormal._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey, metaKey) {
		var k = charCode || keyCode;
		var ret = true;
		var bEvtRet;
		var bFireEvt = false;
		var bPrevent = false;
		var bMaxlength = false;
		var bFilterchar = false;

		var comp = this.comp;
		var cur_text = elem.getElementValue();
		var text = this._text ? this._text : "";
		var text_info = this._textEventInfo;

		var begin_pos = this._input_begin_pos;
		var end_pos = this._end_pos;
		var undo_pos = begin_pos;

		this._charcode = charCode;

		if (!comp) {
			return false;
		}

		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		var _is_enter_hangul = false;

		if ((nexacro.OS == "iOS" || nexacro.BrowserType == "Edge") && (k == nexacro.Event.KEY_ENTER)) {
			var iospos = this._begin_pos - 1 >= 0 ? this._begin_pos - 1 : 0;
			var ioschartext = "";
			if (text != elem.text) {
				ioschartext = text.substr(iospos, 1);
			}
			if (this._is_hangul(ioschartext) && this._begin_pos > 0) {
				_is_enter_hangul = true;
			}
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			var ret1 = this.deleteChar(k == 8 ? true : false);
			this._select_text = "";

			if ((nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11)) && k == nexacro.Event.KEY_BACKSPACE) {
				this._set_input_begin_pos(this._begin_pos);
			}

			text_info.setTextInfo("", text, this._text, "", "", text);
			undo_pos = this._begin_pos;
			bFireEvt = ret1;
		}
		else if (k != nexacro.KeyCode_ImeInput && (k != nexacro.Event.KEY_ENTER || _is_enter_hangul) && charCode != 0) {
			if (elem.password && elem.maxlength > 0 || _is_enter_hangul) {
				var chartext = String.fromCharCode(k);
				if (_is_enter_hangul) {
					chartext = ioschartext;
				}
				var old_chartext = chartext;

				chartext = this.applyInputmode(chartext);

				chartext = this._apply_inputfilter(chartext);

				chartext = this._apply_inputtype(chartext);

				if (old_chartext != chartext && chartext.length == 0) {
					bFireEvt = false;
					bFilterchar = true;
				}
				else {
					if (_is_enter_hangul) {
						var strFront = text.substr(0, iospos);
						var strRear = text.substr(this._end_pos, text.length - this._end_pos);
						var newText = strFront + ioschartext + strRear;

						text_info.setTextInfo(ioschartext, text, newText, "", "", text);
						undo_pos = iospos;

						bFireEvt = true;

						this._compositionend_value = newText;
						this._on_input_compositionend(ioschartext);

						if (nexacro.Browser == "MobileSafari") {
						}
					}
					else {
						var strFront = text.substr(0, begin_pos);
						var strRear = text.substr(end_pos, text.length - end_pos);
						var newText = strFront + chartext + strRear;

						text_info.setTextInfo("", text, newText, "", "", text);
						undo_pos = begin_pos + text_info.chartext.length;

						if (newText.length > elem.maxlength) {
							bMaxlength = true;
						}
						bFireEvt = true;
						if (nexacro.Browser == "MobileSafari") {
							this._accept_keyinput_event = false;
						}
					}
				}
			}

			if ((nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") && keyCode == 27) {
				if (cur_text != text) {
					text_info.setTextInfo("", text, cur_text, "", "", text);
					bFireEvt = true;
				}
			}
		}

		if (bFireEvt) {
			var textEvt = new nexacro.TextChangeEventInfo(comp, "ontextchange", text_info.chartext, text_info.pretext, nexacro._isNull(text_info.posttext) ? "" : text_info.posttext, text_info.preimetext, text_info.postimetext);
			bEvtRet = comp.on_fire_ontextchange(textEvt);

			if (comp._is_set_value) {
				this._updateEventInfo(text_info, textEvt);
				comp._is_set_value = false;
			}

			var is_ios_composition = false;
			if (bEvtRet) {
				if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") {
					var curr_stat = this._stat_composition.getCurrentStatus();
					if (k == 8 && curr_stat != nexacro.EditBase.Status.CompositionEnd && curr_stat != "none") {
						bEvtRet = false;
						is_ios_composition = true;
					}
				}

				if (bEvtRet) {
					bEvtRet = comp.on_fire_cancharchange(comp, textEvt.chartext, textEvt.pretext, textEvt.posttext);
				}
				if (comp._is_set_value) {
					this._updateEventInfo(text_info, textEvt);
					comp._is_set_value = false;
				}
				if (bEvtRet || !bEvtRet && is_ios_composition) {
					if (bEvtRet) {
						var charEvt = new nexacro.TextChangeEventInfo(comp, "onchar", textEvt.chartext, text_info.prechareventtext, textEvt.posttext);
						if ((nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") || nexacro.BrowserType == "Edge") {
							bEvtRet = comp.on_fire_onchar(text_info, charEvt);

							if (bEvtRet && text_info.chartext != charEvt.chartext) {
								text_info.chartext = charEvt.chartext;
								if (nexacro.BrowserType == "Edge") {
									var strFront = text_info.pretext.substr(0, this._input_begin_pos - 1);
								}
								else {
									var strFront = text_info.pretext.substr(0, this._input_begin_pos);
								}
								var strRear = text_info.pretext.substr(end_pos, text_info.pretext.length - end_pos);

								if (comp._is_set_value) {
									this._updateEventInfo(text_info, textEvt);
									comp._is_set_value = false;
									strFront = textEvt.posttext;
									strRear = "";
									textEvt.posttext = strFront + charEvt.chartext + strRear;
								}

								text_info.posttext = strFront + charEvt.chartext + strRear;

								this._setText(text_info.posttext);
								elem.setElementValue(text_info.posttext);
								this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
							}
							else {
								if (comp._is_set_value) {
									this._updateEventInfo(text_info, textEvt);
									comp._is_set_value = false;
								}
							}
						}
						else {
							bEvtRet = comp.on_fire_onchar(text_info, charEvt);
							if (comp._is_set_value) {
								this._updateEventInfo(text_info, textEvt);
								comp._is_set_value = false;
							}
						}
					}

					if (bEvtRet || !bEvtRet && is_ios_composition) {
						if (bMaxlength) {
							bEvtRet = false;
						}
						else if (text_info.pretext != text_info.posttext) {
							if (nexacro.OS != "iOS" || (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari" && !this._is_composition())) {
								this._setText(text_info.posttext);

								if (nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11)) {
									if (!this._is_composition()) {
										this._setValue(text_info.posttext);
									}
								}
								else {
									this._setValue(text_info.posttext);
								}

								if (nexacro.Browser != "Runtime" && elem
									 && (keyCode == nexacro.Event.KEY_DELETE || keyCode == nexacro.Event.KEY_BACKSPACE)) {
									if (!((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && this._is_composition())) {
										elem.setElementValue(this._text, true);
									}

									this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
									elem._event_stop = true;
								}
								else {
									this.setElementCaretPos(this._begin_pos, this._begin_pos);
								}
								this.syncValue();
							}

							if (!this._is_undo) {
								this._undoStack.push(this._value, this._text, undo_pos, undo_pos);
							}

							comp._textchanging = true;
							comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
							comp._textchanging = false;
						}
						else {
							if (_is_enter_hangul) {
								this._setText(text_info.posttext);
								this._setValue(text_info.posttext);
								this.setElementCaretPos(this._begin_pos, this._begin_pos);
								this.syncValue();

								if (!this._is_undo) {
									this._undoStack.push(this._value, this._text, undo_pos, undo_pos);
								}

								comp._textchanging = true;
								comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
								comp._textchanging = false;
							}
							else {
								ret = false;
								bPrevent = true;
							}
						}

						if (comp._is_set_value) {
							this._updateEventInfo(text_info);
							comp._is_set_value = false;
						}
					}
				}
			}

			if (!bEvtRet && !is_ios_composition) {
				ret = false;
				bPrevent = true;

				this._setText(text);
				this._setValue(text);
				this.syncValue();

				this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);

				if (this._is_selected()) {
					this._select_text = this._text.substring(this._begin_pos, this._end_pos);
				}
			}

			if (elem.password && elem.maxlength > 0 && comp.autoskip) {
				if (bMaxlength) {
					this._autoskip_from_text_event(chartext);
				}
			}

			is_ios_composition = null;
		}
		else if ((nexacro.OS == "iOS" && ((this.comp.inputtype == "number" && !(keyCode == nexacro.Event.KEY_ENTER)) || (charCode >= 12593 && charCode <= 12643))) || keyCode == nexacro.Event.KEY_SPACE) {
			bPrevent = this._check_keypressPrevent(keyCode);
			if (bPrevent) {
				ret = false;
			}
		}

		if (bFilterchar && (nexacro.Browser == "MobileSafari" || nexacro.Browser == "Safari")) {
			ret = false;
			bPrevent = true;

			this._setText(text);
			this._setValue(text);
			this.syncValue();

			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);

			if (this._is_selected()) {
				this._select_text = this._text.substring(this._begin_pos, this._end_pos);
			}
		}

		if (bPrevent) {
			elem._event_stop = true;
		}

		this.onUpdateStyle(this.comp);
		return ret;
	};

	_pEditNormal._on_default_input_keyup = function (elem, keycode, altKey, ctrlKey, shiftKey, metaKey) {
		var comp = this.comp;
		var k = keycode;
		var curTxt = this._val;

		this._accept_select_event = true;
		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;

		if ((nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") && nexacro.BrowserVersion >= 9 && (k == 8 || k == 46)) {
			this._text = elem.getElementValue();
		}

		if ((k == 0 || k == 13) || (ctrlKey && k == 90)) {
			if (!curTxt || (curTxt && !this._is_hangul(curTxt.charAt(this._begin_pos)))) {
				if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
					if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						this._on_input_compositionend(data);

						this._fire_text_event(data);
						this.onUpdateStyle(this.comp);
					}
				}
			}
		}

		if (k == 13) {
			var elem_val = elem.getElementValue();
			if (((nexacro.Browser == "IE" && nexacro.BrowserVersion == 9) || nexacro.OS == "iOS") && 
				elem_val != this._value && !this._is_composition()) {
				this._setText(elem_val);
				this._setValue(elem_val);
				this.syncValue();
			}

			this._keyup_process_enter(elem);
		}

		if (k == 27) {
			if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
				if (this._is_composition()) {
					var data = this._stat_composition.getData();

					if (this._is_hangul(data)) {
						this._on_input_compositionend("");
					}
					else {
						this._on_input_compositionend(data);
					}
					this._fire_text_event(data);
				}
			}
		}

		if (k == 8) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11 || nexacro.BrowserType == "Edge") {
				if (this._is_composition()) {
					if (this._text == "" && this.getCompositionData(elem) == "") {
						this._on_input_compositionend("");
						this._fire_text_event("");
					}
				}
			}
			else if (nexacro.Browser == "IE" && nexacro.OSVersion >= 6.0) {
				var pos = elem.getElementCaretPos();
				if (this._is_composition() && (pos.begin != this._begin_pos)) {
					if ((this._compositionstart_value == this._text) && (this.getCompositionData(elem) == "")) {
						this._on_input_compositionend("");
						this._fire_text_event("");
					}
				}
			}
			else {
				if (this._is_composition()) {
					if ((this._compositionstart_value == this._text) && (this.getCompositionData(elem) == "")) {
						this._on_input_compositionend("");
						this._fire_text_event("");
					}
				}
			}
		}

		if (nexacro.Browser == "IE" && nexacro.OSVersion < 6.0) {
			var data = this.getCompositionData(elem);
			if ((keycode == 121 || keycode == 120) && this._is_composition() && !this._is_hangul(data)) {
				this._on_input_compositionupdate(data);
			}
			else {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis._setCaret(elem);
				}, 0);
			}
		}
		else if (nexacro.OS == "iOS") {
			if (this._filteredtext) {
				this._filteredtext = false;
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}
			else {
				this._setCaret(elem);
			}
		}
		else {
			if (!(nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11))) {
				var bInsert = this._check_maxlength_from_text_event();
				if (!bInsert) {
					var node_value = null;
					if (elem._input_handle && nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
						node_value = elem._input_handle.value;
					}

					var comp_text = this._text;
					var maxlength = this.comp.maxlength;
					if (maxlength && (comp_text.length > maxlength || (node_value && node_value.length > maxlength))) {
						if (!(this._is_composition() && !this._is_hangul(this.getCompositionData(elem)))) {
							var text = comp_text.substr(0, maxlength);

							elem.setElementValue(text);
						}
					}
				}
			}

			if (nexacro.BrowserType == "Edge" && this._is_composition()) {
				if (this._is_hangul(this.getCompositionData(elem)) && this._is_selected && !this._is_selected()) {
					this._setCaret(elem);
				}
				else {
					var pThis = this;
					setTimeout(function () {
						pThis._setCaret(elem);
					}, 0);
				}
			}
			else {
				if (nexacro.BrowserType == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 11)) {
					if (this._keycode != 229 || (this._keycode == 229 && this._accept_hangul)) {
						this._setCaret(elem);
					}
				}
				else {
					this._setCaret(elem);
				}
			}
		}


		var selected = this._is_selected();
		if (!shiftKey && (k >= 37 && k <= 40) && !selected) {
			this._select_text = "";
		}

		if (!this._is_composition()) {
			this._compositionend_value = "";
			this._stat_composition.init();
		}

		this._charcode = 0;

		if (nexacro.OS == "Android" && (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && this._is_mobile_drag) {
			var _lg_flag = window.navigator.appVersion.indexOf("LG");
			var elem_text = elem.getElementValue();

			if (_lg_flag > 0) {
				if (this._is_composition()) {
					if (!this._is_hangul(this.getCompositionData(elem))) {
						var text_array = elem_text.split(this._textEventInfo.postimetext);
						var len = text_array.length;

						elem_text = "";
						for (var i = 0; i < len; i++) {
							if (text_array[i] != "") {
								elem_text += text_array[i];
							}
						}

						elem.setElementValue(null);
						elem.setElementBlur();
						elem.setElementFocus();
						elem.setElementValue(elem_text);
						elem._input_handle.value = elem_text;

						this.setElementCaretPos(this._mobile_elme_pos, this._mobile_elme_pos, elem);
						this.clearBuffer(elem_text, this._mobile_elme_pos, this._mobile_elme_pos);

						text_array = len = null;
					}
				}
				else {
					elem.setElementValue(null);
					elem.setElementValue(elem_text);
					this.setElementCaretPos(this._mobile_elme_pos, this._mobile_elme_pos, elem);
				}
			}
			else {
				elem.setElementValue(null);
				elem.setElementValue(elem_text);
				this.setElementCaretPos(this._mobile_elme_pos, this._mobile_elme_pos, elem);

				if (this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}
			}
			this._is_mobile_drag = false;
			elem_text = _lg_flag = null;
		}
	};

	_pEditNormal._check_maxlength = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var value = this._value;

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			if (value.length) {
				var str = this.getLength(elem, value, true);

				if (comp.maxlength <= str.len) {
					return false;
				}
			}
		}
		return true;
	};

	_pEditNormal._check_maxlength2 = function (insertText) {
		if (!insertText || insertText.length == 0) {
			return true;
		}

		var comp = this.comp;
		var elem = comp._input_element;
		var value = elem.getElementValue();

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var begin_pos = this._input_begin_pos;
			var end_pos = begin_pos + insertText.length;
			value = value.substr(0, begin_pos) + value.substr(end_pos, value.length - end_pos);

			if (value.length) {
				var str = this.getLength(elem, value, true);

				if (comp.maxlength <= str.len) {
					return false;
				}
			}
		}
		return true;
	};

	_pEditNormal._apply_maxlength = function (insertText) {
		var comp = this.comp;
		var elem = comp._input_element;
		var text = insertText;
		var value = this._value;

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var str = this.getLength(elem, value, true);

			if (comp.maxlength > str.len) {
				text = this.getLength(elem, insertText, true, comp.maxlength - str.len).str;
			}
		}

		return text;
	};

	_pEditNormal._apply_maxlength2 = function (insertText) {
		var comp = this.comp;
		var elem = comp._input_element;
		var text = insertText;
		var value = elem.getElementValue();

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var begin_pos = this._input_begin_pos;
			var end_pos = begin_pos + insertText.length;
			value = value.substr(0, begin_pos) + value.substr(end_pos, value.length - end_pos);

			var str = this.getLength(elem, value, true);

			if (comp.maxlength > str.len) {
				text = this.getLength(elem, insertText, true, comp.maxlength - str.len).str;
			}
		}

		return text;
	};

	_pEditNormal._apply_inputfilter = function (v) {
		if (!v) {
			v = "";
		}

		var len = v ? v.length : 0;
		var valArr = v.split("");
		var text = [];

		for (var i = 0; i < len; i++) {
			var c = valArr[i];

			if (this._filterRegex) {
				if (this._filterRegex.test(c)) {
					continue;
				}
			}
			text.push(c);
		}

		text = text.join("");

		return text;
	};

	_pEditNormal._apply_inputtype = function (v) {
		if (!v) {
			v = "";
		}

		v = v.replace(/\r\n/g, "\n");

		var inputtype = this.comp.inputtype;
		var len = v ? v.length : 0;
		var valArr = v.split("");
		var text = [];

		for (var i = 0; i < len; i++) {
			var c = valArr[i];

			if (c != '\n' && this._typeRegex) {
				if (!this._typeRegex.test(c)) {
					if (inputtype.indexOf("full") != -1) {
						if (this.getWCharLen(c) == 1 || (this._typeRegex1 && this._typeRegex1.test(c))) {
							continue;
						}
					}
					else {
						continue;
					}
				}
				if ((inputtype.indexOf("full") == -1) && this.getWCharLen(c) > 1) {
					if (!(this._is_half_japaness(c))) {
						continue;
					}
				}
			}
			text.push(c);
		}

		text = text.join("");

		return text;
	};

	_pEditNormal._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		if (elem._is_ios_composition_returned) {
			this._setCaret(elem);
			elem._is_ios_composition_returned = false;
		}
		else {
			this._setText(cur_text);
		}

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		if (nexacro.Browser == "Safari") {
			if (this._is_composition()) {
				this._is_compositionfocus = true;
			}
			else {
				this._is_compositionfocus = false;
			}
		}

		if (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) {
			if (this._is_composition()) {
				elem.setElementValue(null);
				elem.setElementValue(cur_text);
				this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
			}
		}

		if (nexacro.OS != "iOS") {
			this._apply_autoselect(elem, mflag);
			this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
		}
	};

	_pEditNormal._blur_process = function (elem) {
		if (this._is_composition()) {
			var skip = false;
			if ((nexacro.Browser == "IE" || nexacro.BrowserType == "Edge") && 
				this._value == elem.getElementValue()) {
				skip = true;
			}

			if (!skip) {
				if (this.getCompositionData(elem)) {
					var data = this.getCompositionData(elem);
				}
				else {
					var data = this._stat_composition.getData(elem);
					if (nexacro.Browser != "MobileSafari" && data == elem.getElementValue()) {
						data = "";
					}
				}

				if (nexacro.BrowserType == "Edge" && data == "" && this._is_hangul(this._stat_composition.getData())) {
					data = this._stat_composition.getData();
				}

				var proc_fire_text_event = this._on_input_compositionend(data);

				elem.setInputElementCompositeClear();

				if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") {
					if (elem._is_ios_composition_returned) {
						var maxlength = this.comp.maxlength;
						var begin_pos = this._input_begin_pos;
						var len = (data != "") ? (begin_pos + data.length) : (begin_pos + elem.getElementValue().length);

						if (this._input_begin_pos < this._end_pos && len > this._end_pos) {
							this._is_ios_composition_touch = true;
						}

						if (maxlength > 0) {
							if (this._focus_text.length >= maxlength) {
								if (this.comp._bind_event) {
									if (this._old_text == this._focus_text) {
										elem.setElementValue(null);
										elem.setElementValue(this._focus_text);
									}
								}
								else {
									if (this._old_text == this._focus_text) {
										elem.setElementValue(null);
										elem.setElementValue(this._focus_text);
									}
									else {
										if (this._focus_value && this._focus_value == this._value) {
											elem.setElementValue(null);
											elem.setElementValue(this._focus_value);
										}
									}
								}
							}
							else if (this._focus_text.length <= maxlength && this._value >= maxlength) {
								elem.setElementValue(null);
								elem.setElementValue(this._value);
							}
						}

						elem._is_ios_composition = false;
						maxlength = null;
						begin_pos = null;
						len = null;
					}

					if (this.comp.maxlength > 0 && this._is_ios_composition_touch && !elem._is_ios_composition_returned && data != "") {
						this._is_ios_composition_touch = false;
						data = "";
					}

					if (data != "" && this._filteredtext) {
						if (this._text == elem.getElementValue() && !elem._is_ios_composition_returned) {
							data = "";
							elem._is_ios_composition = false;
						}

						if (!this._is_hangul(data) && !this._is_on_killfocus && this._focus_text == elem.getElementValue()) {
							data = "";
						}
					}
				}
				if (!proc_fire_text_event) {
					this._fire_text_event(data);
				}
			}

			this._stat_composition.init();
			this._compositionend_value = "";

			this.onUpdateStyle(this.comp);
		}



		if (nexacro.BrowserType == "Edge" && !this._is_composition()) {
			var data = this._stat_composition.getData();
			if (this._is_hangul(data) && this._charcode != nexacro.Event.KEY_ENTER) {
				this._fire_text_event(data);
				this._stat_composition.init();
				this._compositionend_value = "";
				this.onUpdateStyle(this.comp);
			}
		}

		this._setCaret(elem);

		if (nexacro.Browser == "Gecko") {
			if (this._is_composition()) {
				if (this._is_on_killfocus) {
					elem.setElementBlur();
				}
			}
		}
	};

	_pEditNormal._mouseup_process = function (elem) {
		var caret = elem.getElementCaretPos();

		if (this._is_composition() || ((caret.begin != this._begin_pos && caret.end != this._end_pos) && nexacro.Browser != "Runtime")) {
			elem._useTimer = false;
			this._setCaret(elem);

			if (nexacro.BrowserType == "Edge" && caret.begin == caret.end) {
				this.comp._setcaret = false;
			}

			if (nexacro.BrowserType == "Edge") {
				if (this._text) {
					if (this._begin_pos == this._end_pos) {
						this._select_text = "";
					}
					else {
						this._select_text = this._text.substring(this._begin_pos, this._end_pos);
					}
				}
			}
		}
		else if (nexacro._isDesktop() && nexacro.Browser == "Runtime") {
			elem._useTimer = false;
			this._setCaret(elem);

			if (this._text) {
				if (this._begin_pos == this._end_pos) {
					this._select_text = "";
				}
				else {
					this._select_text = this._text.substring(this._begin_pos, this._end_pos);
				}
			}
		}
		else {
			elem._useTimer = true;

			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (!pThis._pasteAction) {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
						var cur_text = elem.getElementValue();
						if (cur_text == "" && cur_text != pThis._text) {
							pThis._setText(cur_text);
							pThis._setValue(cur_text);
							pThis.syncValue();
						}
					}

					pThis._setCaret(elem);

					if (pThis._text) {
						if (pThis._begin_pos == pThis._end_pos) {
							pThis._select_text = "";
						}
						else {
							pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
						}
					}
				}
				else {
					pThis._do_set_caret = true;
				}
			});
		}
	};

	_pEditNormal._mousedown_process = function (elem) {
		if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE" || nexacro.Browser == "Runtime") {
			this._accept_select_event = true;
			if (this._is_composition()) {
				var data = this._stat_composition.getData();

				if (nexacro.Browser == "IE" || nexacro.Browser == "Runtime") {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						var bCandidateChange = (this._end_pos - this._input_begin_pos) == data.length ? false : true;
						if (bCandidateChange) {
							data = this.getInsertText(elem);
						}
					}
				}

				if (this._is_hangul(data) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
					this._accept_keyinput_event = false;
				}

				this._on_input_compositionend(data);

				this._fire_text_event(data);

				this._compositionend_value = "";
				this._stat_composition.init();

				if (!this._is_hangul(data)) {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
						this._accept_focus_event = false;
						elem.setElementBlur();
						elem.setElementFocus();
					}
					else if (nexacro.BrowserType == "Edge") {
						var editbase_text = this._text;
						elem.setElementValue(null);
						elem.setElementBlur();
						elem.setElementFocus();
						this._setText(editbase_text);
						elem.setElementValue(editbase_text);
						editbase_text = null;
					}
				}
			}
		}
	};

	_pEditNormal._keyup_process_enter = function (elem) {
		if (nexacro.Browser == "Runtime") {
			this._setText(elem.getElementValue());
		}
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text) {
			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);
		}

		if (nexacro.BrowserType == "Edge" || nexacro.OS == "iOS") {
			var elem_val = elem.getElementValue();
			if (elem_val != cur_text) {
				elem.setElementValue(cur_text);
			}
		}
	};

	_pEditNormal._check_keypressPrevent = function (keyCode) {
		var ret = false;
		var chartext = String.fromCharCode(keyCode);
		var old_chartext = chartext;

		chartext = this._apply_inputfilter(chartext);

		chartext = this._apply_inputtype(chartext);

		if (old_chartext != chartext) {
			ret = true;
		}

		return ret;
	};

	delete _pEditNormal;
	_pEditNormal = null;

	nexacro.MultilineEdit = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}
	};

	_pMultilineEdit = nexacro._createPrototype(nexacro.EditNormal, nexacro.MultilineEdit);
	nexacro.MultilineEdit.prototype = _pMultilineEdit;

	_pMultilineEdit._type_name = "MultilineEdit";

	_pMultilineEdit.setPosition = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var control = comp._control_element;

		var container_width = comp._client_width;
		var container_height = comp._client_height;
		if (container_width == 0 || container_height == 0) {
			return;
		}

		if (elem && elem._handle) {
			var p = nexacro._getCachedPaddingObj("0 0 0 0");
			var align = comp.on_find_CurrentStyle_align(comp._pseudo);
			var padding = comp.on_find_CurrentStyle_padding(comp._pseudo);

			var valign = nexacro.Component._default_textarea_align.valign;
			var halign = align.halign;
			if ((comp.wordwrap == "none" || comp.wordwrap == "false" || comp.wordwrap == false) && (comp._scrollbars == 2 || comp._scrollbars == 3 || comp._scrollbars == 8 || comp._scrollbars == 12 || comp._scrollbars == 32)) {
				halign = nexacro.Component._default_textarea_align.halign;
			}

			elem.setElementPosition(0, 0, true);
			elem.setElementSize(container_width, container_height);
			if (padding && (padding.top || padding.right || padding.bottom || padding.left)) {
				elem.setElementPadding(padding);
			}
			else {
				elem.setElementPadding(p);
			}
			elem.setElementAlignXY(halign, valign);
		}
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		_pMultilineEdit._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;
				var scrolltop = comp._input_element.getScrollTop();
				comp._scrolltop = scrolltop;
				var scrollleft = comp._input_element.getScrollLeft();

				this.setElementCaretPos(0, text.length, elem);

				if (scrolltop != comp._input_element.getScrollTop()) {
					comp._input_element.setScrollTop(scrolltop);
				}
				if (scrollleft != comp._input_element.getScrollLeft()) {
					comp._input_element.setScrollLeft(scrollleft);
				}
				this.onUpdateStyle(comp);
			}
		};
	}
	else if (nexacro.OS == "Android") {
		_pMultilineEdit._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var pThis = this;
				var text = this._select_text = this._text;
				this._is_apply_autoselect = true;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis.setElementCaretPos(0, text.length, elem);
				}, 0);
			}
		};
	}
	else {
		_pMultilineEdit._apply_autoselect = function (elem, mflag) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;
				this._is_apply_autoselect = true;


				this.setElementCaretPos(0, text.length, elem);

				if (nexacro.Browser == "Gecko") {
					var h_pos = comp.hscrollbar ? comp.hscrollbar.pos : 0;
					var v_pos = comp.vscrollbar ? comp.vscrollbar.pos : 0;

					nexacro.OnceCallbackTimer.callonce(comp, function () {
						if (comp.vscrollbar) {
							comp.vscrollbar.set_pos(v_pos);
						}
						if (comp.hscrollbar) {
							comp.hscrollbar.set_pos(h_pos);
						}
					}, 70);
				}
			}
		};
	}

	_pMultilineEdit.onUpdateStyle = function (comp, movefocus) {
		var scrolltop = 0;
		var scrollleft = 0;
		if (movefocus == true) {
			if (nexacro.OS == "Windows" && nexacro.Browser == "Runtime"
				 && comp && comp._input_element) {
				scrolltop = comp._input_element.getScrollTop();
				scrollleft = comp._input_element.getScrollLeft();
			}
			else {
				movefocus = false;
			}
		}

		this.setPosition();

		if (nexacro.SystemLang == "ja") {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
				comp._update_scroll();
			}
		}

		if (comp._refform) {
			nexacro.OnceCallbackTimer.callonce(comp, function () {
				if (movefocus == true) {
					if (comp.vscrollbar) {
						comp._input_element.setScrollTop(scrolltop);
					}
					if (comp.hscrollbar) {
						comp._input_element.setScrollLeft(scrollleft);
					}
				}

				comp._update_scroll();
			});
		}
		else {
			comp._update_scroll();
		}
	};

	_pMultilineEdit.onResetHScroll = function (comp) {
		comp._reset_hscroll();
	};

	_pMultilineEdit.insertTabChar = function (elem) {
		var newText = elem.getElementValue();
		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;

		var strFront = newText.substr(0, this._begin_pos);
		var strRear = newText.substr(this._end_pos, newText.length - this._end_pos);
		newText = strFront + this._strTab + strRear;

		begin_pos = begin_pos + this._strTab.length;

		this._text = newText;
		elem.setElementValue(newText);
		this.setElementCaretPos(begin_pos, begin_pos, elem);
	};

	_pMultilineEdit._keyup_process_enter = function (elem) {
		return;
	};

	_pMultilineEdit._on_getAccessibilityAdditionalLabel = function (direction) {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem && input_elem._wantAccessibilityAdditionalLabel) {
			if (!input_elem._wantAccessibilityAdditionalLabel()) {
				return "";
			}

			if (comp.text !== undefined && comp.value !== undefined) {
				if (!direction) {
					direction = 0;
				}
				return comp._getCaretLineString(null, direction);
			}
		}

		return "";
	};

	delete _pMultilineEdit;
	_pMultilineEdit = null;

	nexacro.EditMaskString = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._mask_PassWDST = "{";
		this._mask_PassWDED = "}";
		this._mask_MARKCHAR = "_";
		this._mask_PASSCHAR = "*";
		this._chkEmpty = String.fromCharCode(0x08);

		this._isPWInput = false;
		this._cPassChar = null;
		this._cMaskChar = null;

		this._value = null;
		this._text = "";
		this._strMaskedValue = [];

		this._bufMask = [];
		this._bufPass = [];
		this._strMask = [];

		this._keypress = false;
	};

	_pEditMaskString = nexacro._createPrototype(nexacro.EditBase, nexacro.EditMaskString);
	nexacro.EditMaskString.prototype = _pEditMaskString;

	_pEditMaskString._type_name = "EditMaskString";

	_pEditMaskString._maskChr = {
		"@" : /[\u0020-\u00ff]/, 
		"#" : /[0-9]/, 
		"*" : /[a-zA-Z]/, 
		"9" : /[a-zA-Z0-9]/, 
		"A" : /[A-Z]/, 
		"a" : /[a-z]/, 
		"Z" : /[A-Z0-9]/, 
		"z" : /[a-z0-9]/, 
		"!" : /[0-9]/
	};

	if (nexacro.OS != "iOS" && nexacro.OS != "Mac OS" && !((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop())) {
		_pEditMaskString._on_default_input_compositionstart = nexacro._emptyFn;
		_pEditMaskString._on_default_input_compositionupdate = nexacro._emptyFn;
		_pEditMaskString._on_default_input_compositionend = nexacro._emptyFn;
	}

	_pEditMaskString._init = function (bInit) {
		nexacro.EditBase.prototype._init.call(this, bInit);

		if (!this._cPassChar) {
			this._cPassChar = this._mask_PASSCHAR;
		}
		if (!this._cMaskChar) {
			this._cMaskChar = this._mask_MARKCHAR;
		}

		this._value = null;
		this._text = "";
		this._strMaskedValue = [];

		this._bufMask = [];
		this._bufPass = [];
		this._strMask = [];
	};

	_pEditMaskString._destroy = function () {
		this._cPassChar = null;
		this._cMaskChar = null;

		this._strMaskedValue = null;

		this._bufMask = null;
		this._bufPass = null;
		this._strMask = null;
		this._maskChr = null;

		nexacro.EditBase.prototype._destroy.call(this);
	};

	_pEditMaskString.setMask = function (strMask, bInit) {
		this._init(bInit);

		var bQuote = false;
		var bEscape = false;
		var bPasswd = false;

		var nLen = strMask.length;
		var cMasks = strMask.split("");
		var defs = this._maskChr;
		var Mask = 0;
		var i = 0;
		var nIdx = 0;

		for (i = 0; i < nLen; i++) {
			Mask = 0;

			if (bEscape == false && cMasks[i] == "'") {
				if (bQuote == false) {
					bQuote = true;
				}
				else {
					bQuote = false;
				}
				continue;
			}

			if (bEscape == false && cMasks[i] == "\\" && !bQuote) {
				bEscape = true;
				continue;
			}
			else if (bEscape) {
				bEscape = false;
			}
			else if (bQuote == false) {
				if (defs[cMasks[i]]) {
					Mask = defs[cMasks[i]];
				}
				if (cMasks[i] == this._mask_PassWDST) {
					bPasswd = true;
					continue;
				}
				if (cMasks[i] == this._mask_PassWDED) {
					bPasswd = false;
					continue;
				}
			}
			this._bufMask[nIdx] = Mask;
			this._bufPass[nIdx] = bPasswd;
			this._strMask[nIdx] = cMasks[i];
			nIdx++;
		}
		this._nMaxedLength = strMask.length;
	};

	_pEditMaskString.setValue = function (strValue) {
		var elem = this.comp._input_element;

		if (nexacro._isNull(strValue)) {
			this._setValue(strValue);
			this._setMaskedValue(this.makeMaskedValue(""));
			this._setText(this.makeText(this._strMaskedValue));
		}
		else {
			this._setValue(strValue.toString());
			this._setMaskedValue(this.makeMaskedValue(this._value));
			this._setText(this.makeText(this._strMaskedValue));
		}

		this._undoStack.push(this._value, this._text);

		if (elem) {
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskString.isFilled = function () {
		var bufMask = this._bufMask;
		var nLen = bufMask.length;
		var val = this._strMaskedValue;

		if (nLen == 0) {
			return false;
		}

		for (var i = 0; i < nLen; i++) {
			if (bufMask[i] != 0 && val[i] == this._chkEmpty) {
				return false;
			}
		}
		return true;
	};

	_pEditMaskString.inputText = function (txt) {
		var isMax = false;
		var nLeft = this._begin_pos;
		var nRight = this._end_pos;

		var strText = this._text;
		var strMaskedValue = this._strMaskedValue.concat();

		if (nLeft != nRight) {
		}
		else {
			nLeft = this.findNextPos(strMaskedValue, nLeft - 1);
		}

		if (this._nMaxedLength <= nLeft) {
			isMax = true;
		}

		var nNewLeft = nLeft;
		var nLen = txt.length;
		var tmpArr = txt.split("");

		if (!isMax) {
			for (var i = 0; i < nLen; i++) {
				nNewLeft = this.onInputChar(strMaskedValue, tmpArr[i], nNewLeft);
			}

			strText = this.makeText(strMaskedValue);
		}

		return {
			newText : strText, 
			newMaskedValue : strMaskedValue, 
			end : nNewLeft
		};
	};

	_pEditMaskString.onInputChar = function (strMaskedValue, c, nPos) {
		var bUse = true;
		var Mask = this._bufMask[nPos];
		var strMask = this._strMask[nPos];
		if (Mask !== undefined && Mask != 0) {
			if (strMask == "A" || strMask == "Z") {
				c = c.toUpperCase();
			}
			else if (strMask == "a" || strMask == "z") {
				c = c.toLowerCase();
			}
			if (!Mask.test(c)) {
				bUse = false;
			}
		}
		else {
			return nPos;
		}

		if (bUse) {
			strMaskedValue[nPos] = c;
			nPos = this.findNextPos(strMaskedValue, nPos);
		}

		return nPos;
	};

	_pEditMaskString.deleteChar = function (bBack) {
		var text = this._text;
		var begin = this._begin_pos;
		var end = this._end_pos;

		if (bBack) {
			if (end == begin && begin != 0) {
				begin--;
			}
			this.clearBuffer2(this._text, this._strMaskedValue, begin, end);
		}
		else {
			if (end == begin && end < text.length) {
				end++;
			}
			this.clearBuffer2(this._text, this._strMaskedValue, begin, end);
		}
	};

	_pEditMaskString.syncValue = function () {
		var comp = this.comp;

		comp.value = this._value;
		comp.text = this._text;
	};

	_pEditMaskString.getValue = function () {
		if (!this._value) {
			return;
		}

		var str = this._value;

		if (this._nTrimType) {
			if (this._nTrimType == 1) {
				str = str.replace(/^\s+/, "");
			}
			else if (this._nTrimType == 2) {
				str = str.replace(/\s+$/, "");
			}
			else if (this._nTrimType == 3) {
				str = str.replace(/^\s+/, "");
				str = str.replace(/\s+$/, "");
			}
			return str;
		}
		return str;
	};

	_pEditMaskString.makeMaskedValue = function (strValue) {
		var strMask = this._strMask;
		var bufMask = this._bufMask;
		var defs = this._maskChr;

		strValue = strValue.split("");
		var maskLen = strMask.length;
		var nLen = strValue.length;

		var bOverlappedValue = false;
		var strMaskedValue = [];
		var Mask;
		var c, i, j;

		if (nLen == maskLen) {
			for (i = 0; i < nLen; i++) {
				if (bufMask[i] == 0 && strValue[i] == strMask[i]) {
					continue;
				}
				else if (bufMask[i] == 0) {
					break;
				}
			}
			if (i == strValue.length) {
				bOverlappedValue = true;
			}
		}

		for (i = 0, j = 0; i < maskLen; i++) {
			c = strMask[i];
			Mask = bufMask[i];

			if (Mask != 0 && defs[c]) {
				do {
					c = strValue[j];
					j++;
				} while (c && !Mask.test(c) && !(c == this._FillMaskChar) && !(c == "\u200e"));

				if (nexacro._isNull(c) || (c == this._FillMaskChar)) {
					c = this._chkEmpty;
				}
			}
			else if (bOverlappedValue && strMask[i] == c) {
				j++;
			}
			strMaskedValue[i] = c;
		}

		return strMaskedValue;
	};

	_pEditMaskString.makeText = function (strMaskedValue) {
		var i;
		var strText = [];
		var c;
		var Mask, Pass, strMask;

		var nLen = this._strMask.length;
		for (i = 0; i < nLen; i++) {
			c = strMaskedValue[i];
			Mask = this._bufMask[i];
			Pass = this._bufPass[i];
			strMask = this._strMask[i];
			if (Mask != 0) {
				if (nexacro._isNull(c) || c == this._chkEmpty || c == this._FillMaskChar) {
					c = this._cMaskChar;
				}
				else if (Pass) {
					c = this._cPassChar;
					this._isPWInput = true;
				}
				else if (strMask == "A" || strMask == "Z") {
					c = c.toUpperCase();
				}
				else if (strMask == "a" || strMask == "z") {
					c = c.toLowerCase();
				}
			}
			strText[i] = c;
		}

		return strText.join("");
	};

	_pEditMaskString.makeValue = function (strMaskedValue) {
		var i, j;
		var c;
		var Mask;
		var nLen = this._strMask.length;
		var strValue = [];

		for (i = 0, j = 0; i < nLen; i++) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				c = strMaskedValue[i];
				if (!nexacro._isNull(c) && c != this._chkEmpty) {
					strValue[j] = c;
					j++;
				}
				else if (!nexacro._isNull(this._FillMaskChar)) {
					strValue[j] = this._FillMaskChar;
					j++;
				}
			}
		}

		var newStr = strValue.join("");

		if (this._nTrimType) {
			if (this._nTrimType == 1) {
				newStr = newStr.replace(/^\s+/, "");
			}
			else if (this._nTrimType == 2) {
				newStr = newStr.replace(/\s+$/, "");
			}
			else if (this._nTrimType == 3) {
				newStr = newStr.replace(/^\s+/, "");
				newStr = newStr.replace(/\s+$/, "");
			}
		}

		return newStr;
	};

	_pEditMaskString.findFirstInputPos = function (strMaskedValue) {
		var i;
		var nLen = this._strMask.length;
		var c;
		var bHasSpace = false;

		for (i = 0; i < nLen; i++) {
			var Mask = this._bufMask[i];
			if (Mask != 0) {
				bHasSpace = true;
				c = strMaskedValue[i];
				if (c == this._chkEmpty || nexacro._isNull(c)) {
					return i;
				}
			}
		}

		if (bHasSpace) {
			return this.findPrevPos(strMaskedValue, nLen) + 1;
		}

		return 0;
	};

	_pEditMaskString.findNextPos = function (strMaskedValue, nPos) {
		var i;
		var nLen = this._strMask.length;
		var Mask;

		for (i = nPos + 1; i < nLen; i++) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				return i;
			}
		}
		for (i = 0; i < nLen; i++) {
			if (this._bufMask[i] != 0) {
				return this.findPrevPos(strMaskedValue, nLen) + 1;
			}
		}

		return nLen;
	};

	_pEditMaskString.findPrevPos = function (strMaskedValue, nPos) {
		var i;
		var nLen = this._strMask.length;
		var Mask;
		for (i = nPos - 1; i >= 0; i--) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				return i;
			}
		}
		for (i = nLen - 1; i >= 0; i--) {
			if (this._bufMask[i] != 0) {
				return this.findFirstInputPos(strMaskedValue);
			}
		}

		return 0;
	};

	_pEditMaskString.writeBuffer = function (elem) {
		var str;
		if (this._text) {
			str = this._text;
		}
		else {
			str = "";
		}
		var comp = this.comp;
		var displaynulltext = comp.displaynulltext;

		var val = elem.getElementValue();
		if (elem && val != str) {
			elem.setElementValue(str);
		}

		return str;
	};

	_pEditMaskString.clearBuffer = function (strText, begin, end) {
		var newText = strText.substr(0, begin) + strText.substr(end, strText.length - end);

		this._setMaskedValue(this.makeMaskedValue(newText));
		this._setText(newText);
		this._setValue(newText);
		this.setElementCaretPos(begin, begin);
	};

	_pEditMaskString.clearBuffer2 = function (strText, strMaskedValue, begin, end) {
		var nCaret = -1;
		var Mask;
		var cMask;
		var strDeleted = [];
		for (var nPos = begin; nPos < end; nPos++) {
			Mask = this._bufMask[nPos];
			cMask = this._strMask[nPos];
			if (Mask != 0 && cMask != "^") {
				strDeleted.push(strMaskedValue[nPos]);
				strMaskedValue[nPos] = this._chkEmpty;
				strText[nPos] = this._cMaskChar;
				if (nCaret == -1) {
					nCaret = nPos;
				}
			}
			else {
				if ((end - begin) < 2) {
					var nDelLength = 0;
					var nCurrentPos = nPos;
					while (this._bufMask[nCurrentPos] == 0 || this._strMask[nCurrentPos] == "^") {
						nCurrentPos--;
						nDelLength++;
					}

					strDeleted.push(strMaskedValue[nPos - nDelLength]);
					strMaskedValue[nPos - nDelLength] = this._chkEmpty;
					strText[nPos - nDelLength] = this._cMaskChar;

					if (nCaret == -1) {
						nCaret = nPos - nDelLength;
					}
				}
				else {
					strDeleted.push(strMaskedValue[nPos]);
					if (nCaret == -1) {
						nCaret = nPos;
					}
				}
			}
		}

		if (nCaret == -1) {
			nCaret = begin;
		}

		this._deleted_char = strDeleted.join("");
		this._setMaskedValue(strMaskedValue);
		this._setText(this.makeText(this._strMaskedValue));
		if (strText != this._text) {
			this._setValue(this.makeValue(this._strMaskedValue));
		}
		this.setElementCaretPos(nCaret, nCaret);
	};

	_pEditMaskString._setMaskedValue = function (v) {
		this._strMaskedValue = v;
	};

	_pEditMaskString._set_old_info = function () {
		this._old_text = this._text;
		this._old_value = this._value;

		this._oldMaskedValue = this._strMaskedValue;

		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;
	};

	_pEditMaskString._apply_input_filter = function (txt) {
		var isChange = false;
		var isMax = false;
		var nLeft = this._begin_pos;
		var nRight = this._end_pos;

		var strText = this._text;
		var strMaskedValue = this._strMaskedValue.concat();

		if (nLeft != nRight) {
		}
		else {
			nLeft = this.findNextPos(strMaskedValue, nLeft - 1);
		}

		if (this._nMaxedLength <= nLeft) {
			isMax = true;
		}

		var nNewLeft = nLeft;
		var nLen = txt.length;
		var tmpArr = txt.split("");

		if (!isMax) {
			for (var i = 0; i < nLen; i++) {
				nNewLeft = this.onInputChar(strMaskedValue, tmpArr[i], nNewLeft);
			}

			strText = this.makeText(strMaskedValue);
		}

		for (var i = 0, n = strMaskedValue.length; i < n; i++) {
			if (strMaskedValue[i] != this._strMaskedValue[i]) {
				isChange = true;
				break;
			}
		}

		if (isChange) {
			this._setMaskedValue(strMaskedValue);
			this._setText(this.makeText(this._strMaskedValue));
			this._setValue(this.makeValue(this._strMaskedValue));
		}
		this.setElementCaretPos(nNewLeft, nNewLeft);
	};

	_pEditMaskString._check_value = function () {
		var maskedValue = this._strMaskedValue;
		var bufMask = this._bufMask;
		var bNull = true;

		for (var i = 0, n = maskedValue.length; i < n; i++) {
			if (bufMask[i] != 0 && maskedValue[i] != this._chkEmpty) {
				bNull = false;
			}
		}

		return bNull;
	};

	_pEditMaskString.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		var old_text = this._text;
		var cur_text = elem.getElementValue();
		var str_mask = this._strMask;
		var len = element_text.length - text.length;
		var deleted_char_length = this._deleted_char.length;

		if (this._pasteAction) {
			if (len == 0) {
				var bFind = false;
				for (var i = 0, n = element_text.length; i < n; i++) {
					if (!bFind && element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						insertText += element_text[i];
					}
				}
			}
			else if (len < 0) {
				var strFront = text.substr(0, this._begin_pos);
				var strRear = text.substr(this._begin_pos + deleted_char_length, text.length - (this._begin_pos + deleted_char_length));

				insertText = element_text.substr(strFront.length, element_text.length - (strFront.length + strRear.length));
			}
			else {
				insertText = element_text.substr(this._begin_pos, len + deleted_char_length);
			}
		}
		else if (this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
			if (len == 0) {
				var bFind = false;

				for (var i = 0, n = element_text.length; i < n; i++) {
					if (element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						break;
					}
				}
			}
			else if (len < 0) {
				var strFront = text.substr(0, this._begin_pos);
				var strRear = text.substr(this._begin_pos + deleted_char_length, text.length - (this._begin_pos + deleted_char_length));

				insertText = element_text.substr(strFront.length, element_text.length - (strFront.length + strRear.length));
			}
			else {
				insertText = element_text.substr(this._begin_pos, len);
			}
		}
		else {
			insertText = this._stat_composition.getData(elem);
			if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && insertText && insertText.length > 1) {
				var _len = insertText.length;
				insertText = insertText.substr(_len - 1, _len);
			}
		}

		return insertText;
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		_pEditMaskString._setElementValue = function (elem, begin, end, caretApply, valApply) {
			if (valApply) {
				elem.setElementValue(this._text, true);
			}
			else {
				elem.setElementValue(this._text);
			}

			if (caretApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else if (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
		_pEditMaskString._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				var pThis = this;
				this.setElementCaretPos(begin, end, elem);
				nexacro.OnceCallbackTimer.callonce(this.comp, function () {
					pThis._accept_focus_event = false;
					pThis.setElementCaretPos(begin, end, elem);
				});
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else {
		_pEditMaskString._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro.OSVersion >= 10.0) {
					this.setElementCaretPos(begin, end, elem);
					var pThis = this;
					nexacro.OnceCallbackTimer.callonce(this.comp, function () {
						pThis._accept_focus_event = false;
						pThis.setElementCaretPos(begin, end, elem);
					});
				}
				else if (nexacro.OS == "Android" && (nexacro.OSVersion == "4.4.2" || nexacro.OSVersion == "6.0.1" || nexacro.OSVersion == "7.0") && (nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit"))) {
					this.setElementCaretPos(begin, end, elem);
					var pThis = this;
					nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
						pThis._accept_focus_event = false;
						pThis.setElementCaretPos(begin, end, elem);
					});
				}
				else {
					this.setElementCaretPos(begin, end, elem);
				}
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}

	_pEditMaskString._changeFocusText = function (elem) {
		var cur_val = this._value;
		var cur_text = elem.getElementValue();
		var cur_pos = elem.getElementCaretPos();

		if (!cur_val) {
			this._setMaskedValue(this.makeMaskedValue(""));
		}
		else {
			this._setMaskedValue(this.makeMaskedValue(cur_val));
		}

		var focus_text = this.makeText(this._strMaskedValue);

		this._setText(focus_text);
		this.syncValue();

		if (cur_text != focus_text) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				this._accept_blur_event = false;
			}

			elem.setElementValue(cur_val);
		}
	};

	_pEditMaskString._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (this._select_text.length == 0 && (elem_value.length == (this._text.length - 1))) {
			if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskString._mousedown_process = function (elem) {
		this._oldMaskedValue = this._strMaskedValue.concat();
	};

	_pEditMaskString._mouseup_process = function (elem) {
		if (this._is_composition()) {
			this._setCaret(elem);
		}
		else {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (!pThis._pasteAction) {
					pThis._setCaret(elem);

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
						var cur_text = elem.getElementValue();
						if (cur_text == "" && cur_text != pThis._text) {
							pThis._setMaskedValue(pThis.makeMaskedValue(cur_text));
							pThis._setText(pThis.makeText(pThis._strMaskedValue));
							if (pThis._value) {
								pThis._setValue(pThis.makeValue(pThis._strMaskedValue));
							}
							pThis.syncValue();

							pThis._setElementValue(elem, pThis._begin_pos, pThis._end_pos);
							pThis.setElementCaretPos(pThis._begin_pos, pThis._begin_pos, elem);
						}
					}

					if (pThis._text) {
						if (pThis._begin_pos == pThis._end_pos) {
							pThis._select_text = "";
						}
						else {
							pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
						}
					}
				}
				else {
					pThis._do_set_caret = true;
				}
			});
		}
	};

	_pEditMaskString._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		if (!this._bChangeFocusText) {
			this._changeFocusText(elem);
			this._bChangeFocusText = true;
		}
		else {
			this._setText(cur_text);
		}

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		this._apply_autoselect(elem, mflag);
		this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
	};

	_pEditMaskString._blur_process = function (elem) {
		var cur_text = elem.getElementValue();

		if (!this._value) {
			this._setMaskedValue(this.makeMaskedValue(""));
		}
		else {
			this._setMaskedValue(this.makeMaskedValue(this._value));
		}

		var blur_text = this.makeText(this._strMaskedValue);

		this._setText(blur_text);
		this.syncValue();
		this._bChangeFocusText = false;

		if (cur_text != blur_text || !this._value) {
			elem.setElementValue(this._value);
		}
	};

	_pEditMaskString._keyup_process_enter = function (elem) {
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text || focus_val != cur_val) {
			if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = false;
			}

			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);

			this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
		}
	};

	_pEditMaskString._on_default_input_keydown = function (elem, keyCode, altKey, ctrlKey, shiftKey, metaKey) {
		var comp = this.comp;

		this._setCaret(elem);

		this._keycode = keyCode;
		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;

		if (ctrlKey && (keyCode == 90)) {
			this._is_undo = true;
			this._undoStack.doUndo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
		else if (ctrlKey && (keyCode == 89)) {
			this._is_undo = true;
			this._undoStack.doRedo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}

		if (!comp._accept_keydown_event(keyCode)) {
			elem._event_stop = true;
		}
	};

	_pEditMaskString._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey, metaKey) {
		var ret = true;
		var k = charCode || keyCode;
		var comp = this.comp;

		if (!comp) {
			return false;
		}
		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			var preValue = this._value;
			var preText = this._text;
			var delInfo = this.deleteChar(k == 8 ? true : false);
			var postText = this._text;

			var text_info = this._textEventInfo;
			text_info.setTextInfo("", preText, postText, "", "", preText);

			ret = comp.on_fire_ontextchange(text_info);
			if (ret) {
				ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext);

				if (ret) {
					ret = comp.on_fire_onchar(text_info);
				}

				if (ret) {
					this.syncValue();

					this._setElementValue(elem, this._begin_pos, this._end_pos, true, true);

					if (text_info.pretext != text_info.posttext) {
						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						comp._textchanging = true;
						comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
						comp._textchanging = false;
					}
				}
			}

			if (!ret) {
				this._setMaskedValue(this._oldMaskedValue);
				this._setText(preText);
				this._setValue(preValue);
				this.syncValue();

				this.setElementCaretPos(this._begin_pos, this._end_pos);
			}

			this._select_text = "";
			elem._event_stop = true;
		}
		else if (nexacro.OS == "iOS") {
			this._keypress = true;
		}
		return ret;
	};

	_pEditMaskString._on_default_input_keyup = function (elem, keycode, altKey, ctrlKey, shiftKey, metaKey) {
		var comp = this.comp;

		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;


		if (!shiftKey && (keycode >= 35 && keycode <= 40)) {
			this._select_text = "";
		}

		if (keycode == 13) {
			this._keyup_process_enter(elem);
			return;
		}

		if (nexacro.BrowserType != "Edge") {
			this._setCaret(elem);
		}
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.BrowserVersion == 10) {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
					mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
					elem.setElementValue(this._value);
					return false;
				}

				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);

					if (!this._cutAction) {
						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return;
					}
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
				this._isPasteActionComplete = true;

				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
			};
		}
		else if (nexacro.BrowserVersion >= 9) {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
					mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
					elem.setElementValue(this._value);
					return false;
				}

				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
			};
		}
		else {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && 
					mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition())) {
					elem.setElementValue(this._value);
					return false;
				}
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);

					if (!this._cutAction) {
						return;
					}
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
			};
		}
	}
	else if (nexacro.OS == "iOS") {
		_pEditMaskString._on_default_input_keyinput = function (elem) {
			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (major_ver >= 13 && !this._pasteAction && (elem._is_keydown === false || this._keycode == nexacro.Event.KEY_BACKSPACE)) {
				this._setElementValue(this.comp._input_element, this._begin_pos, this._end_pos, true);
				this._stat_composition.init();
				return false;
			}

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer2(elem_value, this._strMaskedValue, elem_pos.begin, elem_pos.begin + 1);
			}

			if (elem._type == "date") {
				insertText = elem_value;
			}
			else {
				insertText = this.getInsertText(elem);

				if (this._is_composition()) {
					if (this._keypress) {
						insertText = insertText.substr(insertText.length - 1, 1);
						this._keypress = false;
					}
					else {
						if (major_ver >= 13 && elem_pos.begin != elem_pos.end) {
							insertText = insertText.substr(insertText.length - 1, 1);
						}
						else {
							insertText = "";
						}
					}
				}

				if (major_ver >= 13 && this._pasteAction && insertText != this._clipdata) {
					insertText = this._clipdata;
					if (this._input_begin_pos != this._begin_pos) {
						this.setElementCaretPos(this._input_begin_pos, this._input_begin_pos);
					}
				}
			}

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}
	else {
		_pEditMaskString._on_default_input_keyinput = function (elem) {
			var mouse_stat = this._stat_mouse.getCurrentStatus();
			if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition()))) {
				elem.setElementValue(this._value);
				return false;
			}

			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (!this._is_selected()) {
				this._select_text = "";
			}

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer2(elem_value, this._strMaskedValue, elem_pos.begin, elem_pos.begin + 1);
			}

			if (elem._type == "date") {
				insertText = elem_value;
			}
			else {
				insertText = this.getInsertText(elem);
			}

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}

	_pEditMaskString._fire_text_event = function (chartext) {
		var comp = this.comp;
		var elem = comp._input_element;
		var elem_value = elem.getElementValue();

		var text_info = this._textEventInfo;
		var autoskip = comp.autoskip;
		var bFilled = false;

		if (this._is_undo) {
			this._setMaskedValue(this.makeMaskedValue(elem_value));
			this._setText(this.makeText(this._strMaskedValue));
			this._setValue(this.makeValue(this._strMaskedValue));
		}
		else {
			this._apply_input_filter(chartext);
		}

		text_info.setTextInfo(chartext, this._old_text, this._text, "", "", this._old_text);

		var ret = comp.on_fire_ontextchange(text_info);
		if (ret) {
			ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext, text_info.pretext);
			if (ret) {
				ret = comp.on_fire_onchar(text_info);
				if (ret) {
					if (text_info.pretext != text_info.posttext || this._isPWInput) {
						this._isPWInput = false;
						this.syncValue();

						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						this._setElementValue(elem, this._begin_pos, this._end_pos, true);

						comp.on_fire_ontextchanged(comp, this._old_text, this._text);
					}
					else {
						this._setElementValue(elem, this._begin_pos, this._end_pos, true);
					}
				}
			}
		}

		if (this._is_composition()) {
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
		}

		if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && this._stat_composition._curr_stat == nexacro.EditBase.Status.CompositionEnd) {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis._accept_keyinput_event = false;
				pThis._accept_blur_event = false;
				pThis._accept_focus_event = false;
				elem.setElementBlur();
				elem.setElementFocus();
				pThis._accept_blur_event = false;
				pThis._accept_focus_event = false;
				elem.setElementBlur();
				elem.setElementFocus();
				pThis._accept_keyinput_event = true;

				pThis._setElementValue(elem, pThis._begin_pos, pThis._begin_pos, true);
				pThis._stat_composition.init();
			});
		}

		if (!ret) {
			this._setMaskedValue(this._oldMaskedValue);
			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._setElementValue(elem, this._old_begin_pos, this._old_end_pos, true);

			return;
		}


		if (autoskip) {
			bFilled = this.isFilled();
			if (bFilled) {
				this._apply_autoskip();
			}
		}
	};

	delete _pEditMaskString;
	_pEditMaskString = null;

	nexacro.EditMaskNumber = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._dispComponent = false;
		this._dispComma = false;
		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMin = -1;
		this._nDecimalMax = 0;

		this._default_grouping = [3];
		this._default_decimal_point = ".";
		this._default_thousands_sep = ",";
		this._default_positive_sign = "";
		this._default_negative_sign = "-";
		this._default_positive_sign_posn = 1;
		this._default_negative_sign_posn = 1;

		this._positive_sign = this._default_positive_sign;
		this._negative_sign = this._default_negative_sign;
		this._positive_sign_posn = this._default_positive_sign_posn;
		this._negative_sign_posn = this._default_negative_sign_posn;

		this._grouping = this._default_grouping;
		this._strPoint = this._default_decimal_point;
		this._strSeparator = this._default_thousands_sep;
		this._nSignType = 3;

		this._keypress = false;
	};

	_pEditMaskNumber = nexacro._createPrototype(nexacro.EditBase, nexacro.EditMaskNumber);
	nexacro.EditMaskNumber.prototype = _pEditMaskNumber;

	_pEditMaskNumber._type_name = "EditMaskNumber";

	_pEditMaskNumber._init = function () {
		nexacro.EditBase.prototype._init.call(this);

		this._dispComponent = false;
		this._dispComma = false;
		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMin = -1;
		this._nDecimalMax = 0;
	};

	_pEditMaskNumber.isFilled = function () {
		var nLength = this._text.length;
		var nPoint = this._text.indexOf(this._strPoint);

		if (this._nDecimalMax == -1) {
			return false;
		}
		else if (this._nDecimalMax == 0) {
			if (this._nMax > 0 && (this._nMax <= nLength)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if (nPoint == -1) {
				return false;
			}
			if ((nLength - nPoint - 1) >= this._nDecimalMax) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskNumber.filterChar = function (c) {
		if (this.isDigit(c)) {
			return c;
		}
		else if (c == this._strPoint) {
			return c;
		}
		else if (c == this._strSeparator) {
			return c;
		}
		else if (c == '-' && (this._nSignType == 3 || this._nSignType == 0)) {
			return c;
		}
		else if (c == '+' && (this._nSignType == 3 || this._nSignType == 1)) {
			return c;
		}

		return "";
	};

	_pEditMaskNumber.setMask = function (strMask) {
		var strSMask = this.trimLeft(strMask);
		var cSignMask = strSMask.charAt(0);

		if (cSignMask == '!') {
			this._nSignType = 2;
		}
		else if (cSignMask == '+') {
			this._nSignType = 1;
		}
		else if (cSignMask == '-') {
			this._nSignType = 0;
		}
		else {
			this._nSignType = 3;
		}

		if (strMask.length <= 0) {
			this._nMin = 0;
			this._nMax = 0;
			this._nDecimalMax = -1;
			this._nDecimalMin = 0;

			return;
		}

		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMax = 0;
		this._nDecimalMin = 0;
		this._dispComma = (strMask.indexOf(",") >= 0);

		var c;
		var bFindPoint = false;
		for (var i = 0, n = strMask.length; i < n; i++) {
			c = strMask.charAt(i);
			if (c == '.') {
				bFindPoint = true;
			}
			else if (c == '#' || c == '0' || c == '9' || c == ',') {
				if (bFindPoint) {
					this._nDecimalMax++;
					if (c == '0') {
						this._nDecimalMin = this._nDecimalMax;
					}
				}
				else {
					if (c == '0' || (this._nMin > 0 && c != ',')) {
						this._nMin++;
					}

					this._nMax++;
				}
			}
		}
	};

	_pEditMaskNumber.setDisplayMask = function (strMask) {
		var c, i;
		var bFindNineMask = false;
		var bFindPoint = false;
		var strMaskLen = strMask.length;
		var strSMask = this.trimLeft(strMask);
		var cSignMask = strSMask.charAt(0);
		var intNineMaskCnt = 0;
		var decNineMaskCnt = 0;

		this._init();

		this._dispComponent = true;

		if (cSignMask == '!') {
			this._nSignType = 2;
		}
		else if (cSignMask == '+') {
			this._nSignType = 1;
		}
		else if (cSignMask == '-') {
			this._nSignType = 0;
		}
		else {
			this._nSignType = 3;
		}

		if (strMask.length <= 0) {
			this._dispComma = true;

			this._nDecimalMax = -1;
			this._nDecimalMin = 0;
		}
		else {
			this._dispComma = (strMask.indexOf(this._default_thousands_sep) >= 0);

			for (i = 0; i < strMaskLen; i++) {
				c = strMask.charAt(i);
				if (c == this._default_decimal_point) {
					bFindPoint = true;
				}
				else if (c == "#" || c == "0" || c == "9") {
					if (bFindPoint) {
						this._nDecimalMax++;
						if (c == "0") {
							this._nDecimalMin = this._nDecimalMax;
						}
						else if (c == "9") {
							decNineMaskCnt++;
						}
					}
					else {
						if (c == "9") {
							intNineMaskCnt++;
							this._nMin = 1;
						}
						else if (c == "0" || this._nMin > 0) {
							this._nMin++;
						}

						this._nMax++;
					}
				}
			}
		}
	};

	_pEditMaskNumber.syncValue = function () {
		var comp = this.comp;

		comp.value = this._value;
		comp.text = this._text;
	};

	_pEditMaskNumber.getValue = function () {
		return this._value;
	};
	_pEditMaskNumber.setValue = function (strValue) {
		var elem = this.comp ? this.comp._input_element : null;

		if (nexacro._isNull(strValue)) {
			this._setValue(strValue);
			this._setText(this.makeText("", false));
		}
		else {
			strValue = strValue.toString();
			strValue = strValue.replace(this._default_decimal_point, this._strPoint);

			this._setValue(this.normalizeValue(strValue, true, true));
			this._setText(this.makeText(this._value, false));
		}

		this._undoStack.push(this._value, this._text);

		if (elem) {
			if (nexacro.OS == "iOS" && elem) {
				elem.setElementInputType("text", true);
				elem.setElementInputTypeKeypad(this.comp.type);
			}
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskNumber.deleteChar = function (bBack) {
		var text = this._text;
		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;
		var ret = {
		};

		if (bBack) {
			if (end_pos == begin_pos && begin_pos != 0) {
				begin_pos--;

				var delText = text.charAt(begin_pos);
				if (delText == this._strSeparator) {
					begin_pos--;
				}
			}
			this.clearBuffer(text, begin_pos, end_pos);
		}
		else {
			if (end_pos == begin_pos && begin_pos != text.length) {
				var delText = text.charAt(end_pos);
				if (delText == this._strSeparator) {
					end_pos++;
				}
				end_pos++;
			}
			this.clearBuffer(text, begin_pos, end_pos);
		}
	};

	_pEditMaskNumber.makeText = function (strValue, bEditing) {
		if (bEditing === undefined) {
			bEditing = true;
		}

		var nSign = 0;
		var nSignPos = -1;
		var bPoint = false;
		var nDecimalLen = 0;
		var nIntegerLen = 0;

		var strText = strValue;

		var ret = this.split(strText);
		nSign = ret.sign;
		bPoint = ret.pointexist;
		var strNumber = ret.numVal;
		var strDecimal = ret.decVal;

		nIntegerLen = strNumber.length;
		nDecimalLen = strDecimal ? strDecimal.length : 0;

		if (this._nMin > nIntegerLen) {
			var tmpStr = "";
			for (var i = 0, n = this._nMin - nIntegerLen; i < n; i++) {
				tmpStr += "0";
			}
			if (!bEditing) {
				strNumber = tmpStr + strNumber;
			}
		}

		if (this._nDecimalMin > nDecimalLen) {
			var tmpStr = "";
			for (var i = 0, n = this._nDecimalMin - nDecimalLen; i < n; i++) {
				tmpStr += "0";
			}
			if (!bEditing) {
				strDecimal = strDecimal + tmpStr;
			}
		}
		else if (this._nDecimalMax != -1 && this._nDecimalMax < nDecimalLen) {
			if (!bEditing && (this._nLimitType != 3 + 1 || this._nDecimalMax == 0)) {
				strDecimal = strDecimal.substring(0, this._nDecimalMax) + strDecimal.substr(nDecimalLen, strDecimal.length);
			}
		}

		if (this._dispComma) {
			strNumber = this.applyComma(strNumber);
		}

		if (nSign < 0) {
			strSign = this._negative_sign;
			nSignPos = this._negative_sign_posn;
		}
		else if (nSign > 0) {
			strSign = this._positive_sign;
			nSignPos = this._negative_sign_posn;
		}
		else {
			strSign = "";
		}

		if (strDecimal.length > 0) {
			strNumber += this._strPoint;
			strNumber += strDecimal;
		}
		else {
			if (bEditing && bPoint && this._nDecimalMax > 0) {
				strNumber += this._strPoint;
			}
			else if (!bEditing && bPoint) {
				var nLen = strNumber.length;
				this._begin_pos = (this._begin_pos > nLen) ? nLen : this._begin_pos;
				this._end_pos = (this._end_pos > nLen) ? nLen : this._begin_pos;
			}
		}

		switch (nSignPos) {
			case 0:
				strNumber = "(" + strNumber + ")";
				break;
			case 1:
			case 3:
			case 4:
				strNumber = strSign + strNumber;
				break;
			case 2:
				strNumber += strSign;
				break;
			default:
				strNumber = strSign + strNumber;
				break;
		}

		return strNumber;
	};

	_pEditMaskNumber.makeDisplayText = function (strValue, bApplyLocale) {
		var ret = this.split(strValue, bApplyLocale);

		var i, zeroLen;
		var tmpStr = "";
		var nSignPos = -1;
		var nSign = ret.sign;
		var bPoint = ret.pointexist;
		var strInteger = ret.numVal;
		var strDecimal = ret.decVal;
		var nIntegerLen = strInteger.length;
		var nDecimalLen = strDecimal ? strDecimal.length : 0;

		if (this._nMin > nIntegerLen) {
			zeroLen = this._nMin - nIntegerLen;
			for (i = 0; i < zeroLen; i++) {
				tmpStr += "0";
			}

			strInteger = tmpStr + strInteger;
		}
		else if (this._nMin == 0 && this._nMin != this._nMax) {
			if (strInteger == "0") {
				strInteger = "";
			}
		}

		if (this._nDecimalMin > nDecimalLen) {
			tmpStr = "";
			zeroLen = this._nDecimalMin - nDecimalLen;
			for (i = 0; i < zeroLen; i++) {
				tmpStr += "0";
			}

			strDecimal = strDecimal + tmpStr;
		}
		else if (this._nDecimalMax != -1 && this._nDecimalMax < nDecimalLen) {
			if ((this._nLimitType != 3 + 1 || this._nDecimalMax == 0)) {
				strDecimal = strDecimal.substring(0, this._nDecimalMax) + strDecimal.substr(nDecimalLen, strDecimal.length);
			}
		}

		if (this._dispComma) {
			strInteger = this.applyComma(strInteger);
		}

		if (strDecimal.length > 0) {
			strInteger += this._strPoint;
			strInteger += strDecimal;
		}

		if (nSign < 0) {
			strSign = this._negative_sign;
			nSignPos = this._negative_sign_posn;
		}
		else if (nSign > 0) {
			strSign = this._positive_sign;
			nSignPos = this._negative_sign_posn;
		}
		else {
			strSign = "";
		}

		switch (nSignPos) {
			case 0:
				strInteger = "(" + strInteger + ")";
				break;
			case 1:
			case 3:
			case 4:
				strInteger = strSign + strInteger;
				break;
			case 2:
				strInteger += strSign;
				break;
			default:
				strInteger = strSign + strInteger;
				break;
		}

		return strInteger;
	};

	_pEditMaskNumber.normalizeValue = function (strValue, bTrim, bValue) {
		if (strValue.length <= 0) {
			return strValue;
		}

		if (this._dispComponent && isFinite(strValue) == false) {
			return strValue;
		}

		if (bTrim === undefined) {
			bTrim = true;
		}

		strValue = this.removeMask(strValue, bValue);
		if (strValue.charAt(strValue.length - 1) == this._strPoint) {
			strValue = strValue + "0";
		}

		if (bTrim) {
			var bSign = (strValue.charAt(0) == '-') ? 1 : 0;

			while (strValue.charAt(0 + bSign) == '0'
				 && strValue.charAt(1 + bSign) != this._strPoint
				 && strValue.length != (1 + bSign)) {
				strValue = strValue.substring(0, 0 + bSign) + strValue.substr(0 + bSign + 1, strValue.length);
			}

			var nPoint = strValue.indexOf(this._strPoint);
			if (nPoint >= 0) {
				var i;
				for (i = strValue.length - 1; i > nPoint + 1; i--) {
					if (strValue.charAt(i) != '0') {
						break;
					}
				}
				strValue = strValue.substring(0, i + 1);
			}
		}

		if (strValue.charAt(0) == '+') {
			strValue = strValue.substr(1);
		}
		else if (strValue.length <= 0 || parseFloat(strValue) == 0.0) {
			if (strValue.charAt(0) == '-') {
				strValue = strValue.substr(1);
			}
		}

		strValue = strValue.replace(this._strPoint, this._default_decimal_point);

		return strValue;
	};

	_pEditMaskNumber.split = function (strText, bApplyLocale) {
		var nBegin = 0;
		var nSign;
		if ((nBegin = strText.indexOf('+')) >= 0) {
			nSign = +1;
			nBegin = 1;
		}
		else if ((nBegin = strText.indexOf('-')) >= 0) {
			nSign = -1;
			nBegin = 1;
		}
		else {
			nSign = 0;
			nBegin = 0;
		}

		var nPoint;
		nPoint = strText.indexOf(this._strPoint, nBegin);

		var strNumber = "", bPoint, strDecimal = "";
		if (nPoint < 0) {
			strNumber = strText.substr(nBegin);
			bPoint = false;
		}
		else {
			strNumber = strText.substr(nBegin, nPoint - nBegin);
			strDecimal = strText.substr(nPoint + 1);
			bPoint = true;
		}
		return {
			"sign" : nSign, 
			"pointexist" : bPoint, 
			"numVal" : strNumber, 
			"decVal" : strDecimal
		};
	};

	_pEditMaskNumber.writeBuffer = function (elem) {
		var str = this._text;
		var comp = this.comp;
		var displaynulltext = comp.displaynulltext;

		var val = elem.getElementValue();

		if (elem && val != str) {
			elem.setElementValue(str);

			var elem_val = elem.getElementValue();
		}

		return str;
	};

	_pEditMaskNumber.clearBuffer = function (text, begin, end) {
		var tmpText = text.substr(0, begin) + text.substr(end, text.length - end);
		var intText = tmpText;
		var decText = "";

		var newValue = this.normalizeValue(tmpText, false);

		var point_idx = tmpText.indexOf(this._strPoint);
		if (point_idx > 0) {
			intText = tmpText.substring(0, point_idx);
			decText = tmpText.substring(point_idx + 1, tmpText.length);
		}

		var intValue = this.normalizeValue(intText, false);
		var newText = this.makeText(intValue, true);

		if (intText.length != newText.length) {
			var tmp = intText.length - newText.length;
			if (begin != 0) {
				begin = begin - tmp;
			}
		}

		if (point_idx > 0) {
			newText = newText + this._strPoint + decText;
		}

		this._setText(newText);
		this._setValue(newValue);
		this.setElementCaretPos(begin, begin);
	};

	_pEditMaskNumber.clearBuffer2 = function (str, start, end) {
		if (start == end) {
			return {
				"text" : str, 
				"end" : end
			};
		}

		if (start > end) {
			var tmpVal = start;
			start = end;
			end = tmpVal;
		}

		var strTemp = str.substr(start, end - start);
		var strPost = str.substring(0, start) + str.substring(end);
		var pstrDeleted = strTemp;
		if (strTemp.indexOf(this._strPoint) > 0) {
			strTemp = this.makeText(this.normalizeValue(strPost));
			end = this.findIndex(strPost, strTemp, start, true);
			strPost = strTemp;

			if (end < 0) {
				end = 0;
			}
			else if (strTemp.length < end) {
				end = strTemp.length;
			}
		}
		else if (this._is_selected() && pstrDeleted == this._strSeparator) {
			end = start;
			strPost = str;
		}
		else {
			var nPoint = strPost.indexOf(this._strPoint);
			if (nPoint < 0) {
				nPoint = strPost.length;
			}
			if (start <= nPoint) {
				strTemp = this.makeText(this.normalizeValue(strPost));
				end = this.findIndex(strPost, strTemp, start, false);
				strPost = strTemp;
			}
			else {
				end = start;
				var nAppendCount = this._nDecimalMin - (strPost.length - (nPoint + 1));
				var addstr = "";
				if (nAppendCount > 0) {
					for (var i = 0; i < nAppendCount; i++) {
						addstr += "0";
					}
				}
				strPost += addstr;
			}
		}
		return {
			"text" : strPost, 
			"end" : end, 
			"pstrDeleted" : pstrDeleted
		};
	};

	_pEditMaskNumber.isDigit = function (c) {
		if (!this._digit) {
			this._digit = /[0-9]/;
		}
		if (this._digit.test(c)) {
			return true;
		}
		return false;
	};


	_pEditMaskNumber.isPlusSign = function (c) {
		if (c == "+") {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isMinusSign = function (c) {
		if (c == "-") {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isComma = function (c) {
		if (c == this._strPoint) {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isSign = function (c) {
		if (this.isPlusSign(c) || this.isMinusSign(c)) {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.trim = function (str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};

	_pEditMaskNumber.trimLeft = function (str) {
		return str.replace(/^\s\s*/, '');
	};

	_pEditMaskNumber.trimRight = function (str) {
		return str.replace(/\s\s*$/, '');
	};

	_pEditMaskNumber.removeMask = function (str, bValue) {
		str = this.trim(str);
		var ntxtLen = str.length;
		var i;
		var bPoint = false;
		var bInside = false;
		var buf = [];

		if (bValue) {
			for (i = 0; i < ntxtLen; i++) {
				var c = str.charAt(i);
				if ((c == '+' || c == '-') && (bInside === false)) {
					buf.push(c);
					bInside = true;
				}
				else if (this.isDigit(c)) {
					buf.push(c);
					bInside = true;
				}
				else if (c == this._strPoint && bPoint === false) {
					buf.push(c);
					bPoint = true;
					bInside = true;
				}
				else if (c != this._strSeparator) {
					if (!this._pasteAction) {
						return "";
					}
				}
			}
		}
		else {
			for (i = 0; i < ntxtLen; i++) {
				var c = str.charAt(i);
				if ((c == '+' || c == '-') && (bInside === false)) {
					buf.push(c);
					bInside = true;
				}
				else if (this.isDigit(c)) {
					buf.push(c);
					bInside = true;
				}
				else if (c == this._strPoint) {
					if (bPoint === false) {
						buf.push(c);
						bPoint = true;
						bInside = true;
					}
				}
				else if (c != this._strSeparator) {
					if (!this._pasteAction) {
						return "";
					}
				}
			}
		}
		return buf.join("");
	};

	_pEditMaskNumber.applyComma = function (strNumber) {
		var grouping = this._grouping;
		var thousands_sep = this._strSeparator;
		if (thousands_sep.length > 0) {
			var dec_buf = strNumber.split("");
			var dec_size = strNumber.length;
			var out_size = (thousands_sep.length + 1) * strNumber.length;
			var out_buf = [];
			var cur_group = 0, d_size = dec_size;
			var endpos = out_size;
			var groupingIdx = 0;
			while (grouping[groupingIdx] && d_size > 0) {
				var g = grouping[groupingIdx];
				if (g == "\\") {
					groupingIdx++;
					g = parseInt(grouping[groupingIdx]) | 0;
				}
				if (g > 0) {
					cur_group = g;
					while (g-- > 0 && d_size > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
					if (d_size > 0) {
						out_buf[--endpos] = thousands_sep;
					}
				}
				else if (g == 0 && d_size > cur_group) {
					g = cur_group;
					while (g-- > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
					if (d_size > 0) {
						out_buf[--endpos] = thousands_sep;
					}
				}
				else if (g == 0 && d_size <= cur_group && d_size > 0) {
					g = d_size;
					while (g-- > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
				}
				else {
					break;
				}


				if (grouping.length == 2 && groupingIdx == 0) {
					groupingIdx++;
				}
			}
			return out_buf.slice(endpos, out_size + endpos).join("");
		}
		return strNumber;
	};

	_pEditMaskNumber.findIndex = function (strSource, strTarget, nPos, bDeleteComma) {
		var nFindPos = 0;

		var nSource = strSource.indexOf(this._strPoint);
		var nTarget = strTarget.indexOf(this._strPoint);
		if (nSource < 0) {
			nSource = strSource.length - 1;
		}
		if (nTarget < 0) {
			nTarget = strTarget.length - 1;
		}

		if (bDeleteComma) {
			var regexpr = new RegExp(this._strSeparator, "g");
			var xstrSource = strSource;
			if (this._dispComma) {
				xstrSource = xstrSource.replace(regexpr, "");
			}

			var xstrTarget = strTarget.substring(0, nTarget + 1);
			if (this._dispComma) {
				xstrTarget = xstrTarget.replace(regexpr, "");
			}
			xstrTarget.replace(this._strPoint, "");

			var nFixPos = nPos + xstrTarget.length - xstrSource.length;

			if (this._dispComma) {
				var nCount = nSource - nPos;
				for (var i = nPos; i < nSource; i++) {
					if (strSource.charAt(i) == this._strSeparator) {
						nCount--;
					}
					if (strTarget.charAt(i) == this._strSeparator) {
						nCount++;
					}
				}
				nFindPos = nTarget - nCount;

				if (strTarget.indexOf(this._strPoint) >= 0) {
					nFindPos = nTarget;
				}
			}
			else {
				nFindPos = nFixPos;
			}
		}
		else {
			if (nPos == nSource) {
				nFindPos = nTarget;
			}
			else if (this._dispComma) {
				var nCount = nSource - nPos;
				for (var i = nPos; i < nSource; i++) {
					if (strSource.charAt(i) == this._strSeparator) {
						nCount--;
					}
					if (strTarget.charAt(i) == this._strSeparator) {
						nCount++;
					}
				}
				nFindPos = nTarget - nCount;
			}
			else {
				nFindPos = nTarget - (nSource - nPos);
			}
		}

		return nFindPos;
	};

	_pEditMaskNumber.onInputDigit = function (strText, xchNum, nCaret) {
		var nPoint = strText.indexOf(this._strPoint);
		var bPoint = nPoint >= 0;
		if (!bPoint) {
			nPoint = strText.length;
		}

		var origin_caret = nCaret;

		if (nPoint < nCaret) {
			if (!this.isLimit(strText)) {
				strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
				nCaret++;
			}
		}
		else {
			if (!this.isLimit(strText)) {
				if (this._dispComma) {
					if (!this._is_composition()) {
						strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
					}
					else {
						strText = strText.substring(0, this._begin_pos) + xchNum + strText.substr(this._begin_pos, strText.length);
						nCaret = this._begin_pos;
					}
					nCaret++;
					nPoint++;
					var nOldLength = strText.length;
					var nIndex = strText.indexOf("-");
					var strSign = "";

					if (0 <= nIndex) {
						strSign += "-";
					}
					if (strSign != "") {
						strText = this.normalizeValue(strText);
						if (strText.charAt(1) == 0) {
							strText = strSign + strText;
						}
						strText = this.makeText(strText);
					}
					else {
						strText = this.makeText(this.normalizeValue(strText));
					}
					var nNewLength = strText.length;

					nPoint = strText.indexOf(this._strPoint);

					if (nOldLength != nNewLength) {
						nCaret++;

						if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && this._is_composition()) {
							if (nexacro.OSVersion >= 10) {
								this._accept_keyinput_event = false;
							}
						}
					}
				}
				else {
					if (!this._is_composition()) {
						strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
					}
					else {
						strText = strText.substring(0, this._begin_pos) + xchNum + strText.substr(this._begin_pos, strText.length);
						nCaret = this._begin_pos;
						this._set_input_begin_pos(this._begin_pos);
					}
					nCaret++;
					nPoint++;
				}
			}
		}


		if (nPoint > this._nMin && nPoint > 1) {
			if (strText.charAt(0) == '0') {
				if (strText.charAt(1) == this._strSeparator) {
					strText = strText.substr(2);
					nCaret -= 2;
				}
				else if ((this._nMin <= 0) && (strText.charAt(1) != this._strPoint)) {
					strText = strText.substr(1);
					nCaret--;
				}
			}
			else if (strText.charAt(0) == '+' || strText.charAt(0) == '-') {
				if (strText.charAt(1) == '0' && strText.charAt(2) == '0') {
					strText = strText.substring(0, 1) + strText.substr(2, strText.length);
					nCaret--;
				}
			}
		}

		var elem = this.comp._input_element;
		var elem_val = elem.getElementValue();
		var elem_val1 = this.makeText(this.normalizeValue(elem_val));

		if (this._text && elem_val.length == this._text.length && !this._pasteAction) {
			if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && this._stat_composition.getCurrentStatus() != nexacro.EditBase.Status.None) {
				strText = elem_val1;
				nCaret = this._begin_pos;
			}
			else {
				var ch = this._text.charAt(origin_caret);
				var digit = this.isDigit(ch);

				if (!digit) {
					strText = this._text.substring(0, origin_caret + 1) + xchNum + this._text.substr(origin_caret + 2, this._text.length);
					nCaret = origin_caret + 2;
				}
				else {
					strText = elem_val1;
					nCaret = origin_caret + 1;
				}
			}
		}

		return {
			"text" : strText, 
			"pos" : nCaret
		};
	};

	_pEditMaskNumber.isLimit = function (strText) {
		var nLength = strText.length;
		var nPoint = strText.indexOf(this._strPoint);
		var nIntLength = 0;
		var nDecLength = 0;
		if (nPoint != -1) {
			nIntLength = nPoint;
			nDecLength = nLength - (nPoint + 1);
		}

		var bSign = (strText.charAt(0) == '-' || strText.charAt(0) == '+') ? true : false;
		if (bSign) {
			nLength--;
			if (this._end_pos <= nPoint) {
				nIntLength--;
			}
		}

		if (this._nLimitType == 3) {
			if (this._nDecimalMax == 0 || nPoint == -1) {
				return (nLength >= this._nMax);
			}

			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._end_pos <= nPoint) {
					return (nIntLength >= this._nMax);
				}
				else if (this._end_pos > nPoint) {
					return (nDecLength >= this._nDecimalMax);
				}
				else {
					return false;
				}
			}
		}
		else if (this._nLimitType == 2) {
			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._begin_pos > nPoint) {
					return (nDecLength >= this._nDecimalMax);
				}
			}
			else if (this._nMax > 0 && this._nDecimalMax == 0 && nPoint > 0) {
				if (this._begin_pos > nPoint) {
					return (nDecLength >= this._nDecimalMax);
				}
			}
		}
		else if (this._nLimitType == 1) {
			if (this._nDecimalMax == 0 || nPoint == -1) {
				return (nLength >= this._nMax);
			}
			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._end_pos <= nPoint) {
					return (nIntLength >= this._nMax);
				}
				else {
					return false;
				}
			}
		}
		else if (this._nLimitType == 0) {
			return false;
		}
		return false;
	};

	_pEditMaskNumber._set_old_info = function () {
		this._old_text = this._text;
		this._old_value = this._value;
		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;
	};

	_pEditMaskNumber._is_maskchar = function (c) {
		if (this.isDigit(c) || c == this._strPoint) {
			return c;
		}
		else if (this.isSign(c) && (this._nSignType == 3 || this._nSignType == 0)) {
			return c;
		}
		else if (this.isSign(c) && (this._nSignType == 3 || this._nSignType == 1)) {
			return c;
		}

		return "";
	};

	_pEditMaskNumber._apply_filter = function (ch) {
		var bChange = false;
		var ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var filterChar = this._is_maskchar(ch);

		if (this.isSign(filterChar)) {
			ret = this._apply_sign_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}
		else if (this.isComma(filterChar)) {
			ret = this._apply_comma_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}
		else if (this.isDigit(filterChar)) {
			ret = this._apply_digit_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}

		return ret;
	};

	_pEditMaskNumber._apply_sign_filter = function (c, value, text, begin_pos) {
		var firstText = text.charAt(0);

		if (this.isPlusSign(c) && (this._nSignType == 1 || this._nSignType == 3)) {
			if (this.isPlusSign(firstText)) {
				value = this.normalizeValue(text, true);
				text = this.makeText(value);
				begin_pos -= 1;
			}
			else if (this.isMinusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = c + this.makeText(value);
			}
			else {
				text = c + this.makeText(value);
				begin_pos += 1;
			}
		}
		else if (this.isMinusSign(c) && (this._nSignType == 0 || this._nSignType == 3)) {
			if (this.isMinusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = this.makeText(value);
				begin_pos -= 1;
			}
			else if (this.isPlusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = c + this.makeText(value);
			}
			else {
				value = c + this.normalizeValue(text, true);
				text = this.makeText(value);
				begin_pos += 1;
			}
		}

		return {
			value : value, 
			text : text, 
			caret : begin_pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._apply_comma_filter = function (c, value, text, begin_pos) {
		var bNormalize = true;
		var comma_idx = value.indexOf(this._default_decimal_point);

		if (comma_idx == -1) {
			var bInput = true;
			var dec_begin_pos = (this._is_composition() ? this._begin_pos : this._input_begin_pos);
			var intText = text.substr(0, dec_begin_pos);
			var decText = text.substr(dec_begin_pos);
			var decLen = decText.length;

			if (this._nDecimalMax == 0) {
				bInput = false;
			}
			else if (text.indexOf(c) > -1) {
				bInput = false;
			}
			else if (this._nLimitType == 2 || this._nLimitType == 3) {
				bInput = (decLen <= this._nDecimalMax) ? true : false;
			}

			if (bInput) {
				text = intText + c + decText;
				if (decLen == 0) {
					bNormalize = false;
				}
			}
		}

		if (bNormalize) {
			value = this.normalizeValue(text, false);
		}

		if (comma_idx > -1 || (comma_idx == -1 && bInput)) {
			begin_pos = text.indexOf(c) + 1;
		}

		return {
			value : value, 
			text : text, 
			caret : begin_pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._apply_digit_filter = function (c, value, text, begin_pos) {
		var ret = this.onInputDigit(text, c, begin_pos);
		var text = ret.text;

		return {
			value : this.normalizeValue(text), 
			text : text, 
			caret : ret.pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._setLocale = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);

		this._strPoint = locale_info.decimal_point;

		if (locale_info.thousands_sep) {
			this._strSeparator = locale_info.thousands_sep;
		}
		else {
			this._strSeparator = this._default_thousands_sep;
		}

		if (!locale_info.grouping || locale_info.grouping[0] == 0) {
			this._grouping = this._default_grouping;
		}
		else {
			this._grouping = locale_info.grouping;
		}

		if (locale_info.positive_sign) {
			this._positive_sign = locale_info.positive_sign;
		}
		else {
			this._positive_sign = this._default_positive_sign;
		}

		if (locale_info.negative_sign) {
			this._negative_sign = locale_info.negative_sign;
		}
		else {
			this._negative_sign = this._default_negative_sign;
		}

		if (locale_info.p_sign_posn != undefined || locale_info.p_sign_posn != null) {
			this._positive_sign_posn = locale_info.p_sign_posn;
		}
		else {
			this._positive_sign_posn = this._default_positive_sign_posn;
		}

		if (locale_info.n_sign_posn != undefined || locale_info.n_sign_posn != null) {
			this._negative_sign_posn = locale_info.n_sign_posn;
		}
		else {
			this._negative_sign_posn = this._default_negative_sign_posn;
		}
	};

	_pEditMaskNumber.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		var old_text = this._text;
		var cur_text = elem.getElementValue();

		if ((nexacro.Browser != "Runtime" || (this._keycode != 8 && this._keycode != 46)) && (this._pasteAction || this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None)) {
			var len = element_text.length - text.length;

			if (len == 0) {
				var bFind = false;

				for (var i = 0, n = element_text.length; i < n; i++) {
					if (element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						break;
					}
				}
			}
			else {
				var old_pos = this._old_begin_pos;
				var pos = this._begin_pos;

				if (old_pos != pos) {
					insertText = element_text.substr(old_pos, len - (old_pos - pos));
				}
				else {
					insertText = element_text.substr(this._begin_pos, len);
				}
			}
		}
		else if (this._is_composition() && !(nexacro.OS == "Windows" && nexacro.Browser == "Safari")) {
			var pos = elem.getElementCaretPos();
			insertText = element_text.substring(this._begin_pos, pos.end);
		}
		else {
			insertText = this._stat_composition.getData(elem);
		}

		return insertText;
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, caretApply, valApply) {
			if (valApply) {
				elem.setElementValue(this._text, true);
			}
			else {
				elem.setElementValue(this._text);
			}

			if (caretApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis._accept_focus_event = false;
					pThis.setElementCaretPos(begin, end, elem);
				});
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}

	_pEditMaskNumber._changeFocusText = function (elem) {
		var cur_val = this._value;
		var cur_text = elem.getElementValue();
		var cur_pos = elem.getElementCaretPos();
		var focus_text = "";

		if (!cur_val) {
			focus_text = this.makeText("", true);
		}
		else {
			if (elem.readonly) {
				focus_text = this.makeText(cur_val, false);
			}
			else {
				focus_text = this.makeText(cur_val, true);
			}
		}

		this._setText(focus_text);
		this.syncValue();

		if (elem && cur_text != focus_text) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				this._accept_blur_event = false;
			}

			elem.setElementValue(cur_val);

			if (nexacro.Browser == "Gecko") {
				this.setElementCaretPos(cur_pos.begin, cur_pos.end, elem);
			}
		}
	};

	_pEditMaskNumber._check_keypressPrevent = function (keyCode) {
		var ret = false;
		var filter_ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var chartext = String.fromCharCode(keyCode);
		var old_chartext = chartext;

		filter_ret = this._apply_filter(chartext);

		if (!filter_ret.bChange) {
			ret = true;
		}

		return ret;
	};

	_pEditMaskNumber._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (elem_value.length == (this._text.length - 1)) {
			if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskNumber._mouseup_process = function (elem) {
		if (this._is_composition()) {
			this._setCaret(elem);
		}
		else {
			var pThis = this;

			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (!pThis._pasteAction) {
					pThis._setCaret(elem);

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
						var cur_text = elem.getElementValue();
						if (cur_text == "" && cur_text != pThis._text) {
							pThis._setText(pThis.makeText(cur_text, true));
							if (pThis._value) {
								pThis._setValue(pThis.normalizeValue(pThis._text));
							}
							pThis.syncValue();

							pThis._setElementValue(elem, pThis._begin_pos, pThis._end_pos);
							pThis.setElementCaretPos(pThis._begin_pos, pThis._begin_pos, elem);
						}
					}

					if (pThis._text) {
						if (pThis._begin_pos == pThis._end_pos) {
							pThis._select_text = "";
						}
						else {
							pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
						}
					}
				}
				else {
					pThis._do_set_caret = true;
				}
			});
		}
	};

	_pEditMaskNumber._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		if (!this._bChangeFocusText) {
			this._changeFocusText(elem);
			this._bChangeFocusText = true;
		}
		else {
			this._setText(cur_text);
		}

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		this._apply_autoselect(elem, mflag);
		this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
	};

	_pEditMaskNumber._blur_process = function (elem) {
		var cur_text = elem.getElementValue();

		if (!this._value) {
			var blur_text = this.makeText("", false);
		}
		else {
			var blur_text = this.makeText(this._value, false);
		}

		this._setText(blur_text);
		this.syncValue();
		this._bChangeFocusText = false;

		if (cur_text != blur_text || !this._value) {
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskNumber._keyup_process_enter = function (elem) {
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text || focus_val != cur_val) {
			if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = false;
			}

			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);

			this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
		}
	};

	_pEditMaskNumber._on_default_input_keydown = function (elem, keyCode, altKey, ctrlKey, shiftKey, metaKey) {
		var elemVal = elem.getElementValue();


		if (!((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && keyCode == 229 && this.isLimit(elemVal))) {
			this._setCaret(elem);
		}

		this._keycode = keyCode;
		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;

		if (ctrlKey && (keyCode == 90)) {
			this._is_undo = true;
			this._undoStack.doUndo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
		else if (ctrlKey && (keyCode == 89)) {
			this._is_undo = true;
			this._undoStack.doRedo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
	};

	_pEditMaskNumber._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey, metaKey) {
		var ret = true;
		var k = charCode || keyCode;
		var comp = this.comp;
		var text_info = this._textEventInfo;
		var evt_fire = false;

		if (!comp) {
			return false;
		}
		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		this._set_old_info();

		if (keyCode == nexacro.Event.KEY_SPACE) {
			var text = nexacro._isNull(this._value) ? this.makeText("", false) : this.makeText(this._value, false);

			this._filteredtext = false;
			text_info.setTextInfo("", this._old_text, text, "", "", this._old_text);
			evt_fire = true;
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			this.deleteChar(k == 8 ? true : false);
			text_info.setTextInfo("", this._old_text, this._text, "", "", this._old_text);
			evt_fire = true;
		}

		if (evt_fire) {
			ret = comp.on_fire_ontextchange(text_info);
			if (ret) {
				ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext);

				if (ret) {
					ret = comp.on_fire_onchar(text_info);
				}

				if (ret) {
					this._setText(text_info.posttext);
					this._setValue(this.normalizeValue(text_info.posttext));
					this.syncValue();

					if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && (nexacro.BrowserVersion == 10 || nexacro.BrowserVersion == 9)) {
						this._accept_keyinput_event = false;
					}

					if (!((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop() && this._is_composition())) {
						elem.setElementValue(this._text, true);
					}
					this.setElementCaretPos(this._end_pos, this._end_pos, elem);

					if (text_info.pretext != text_info.posttext) {
						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._end_pos, this._end_pos);
						}

						comp._textchanging = true;
						comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
						comp._textchanging = false;
					}
				}
			}

			if (!ret) {
				this._setText(this._old_text);
				this._setValue(this.normalizeValue(this._old_text));
				this.syncValue();

				this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);
			}

			this._select_text = "";
			elem._event_stop = true;
		}
		else if (nexacro.OS == "iOS") {
			bPrevent = this._check_keypressPrevent(keyCode);

			if (bPrevent) {
				elem._event_stop = true;
			}

			this._keypress = true;
		}

		return ret;
	};

	_pEditMaskNumber._on_default_input_keyup = function (elem, keycode, altKey, ctrlKey, shiftKey, metaKey) {
		var comp = this.comp;

		this._altkey = altKey;
		this._ctrlkey = ctrlKey;
		this._shiftkey = shiftKey;
		this._metakey = metaKey;

		if (!shiftKey && (keycode >= 37 && keycode <= 40)) {
			this._select_text = "";
		}

		if (keycode == 13) {
			this._keyup_process_enter(elem);

			return;
		}

		if (nexacro.OS == "iOS" || nexacro.OS == "Android") {
			if (this._filteredtext) {
				this._filteredtext = false;
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}
			else {
				this._setCaret(elem);
			}
		}
		else {
			if (nexacro.BrowserType != "Edge") {
				this._setCaret(elem);
			}
		}
	};

	if (nexacro.BrowserType == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.BrowserVersion == 10) {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition()))) {
					elem.setElementValue(this._value);
					return false;
				}

				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				if (!this._set_old_prop) {
					this._set_old_info();
				}

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
					this._set_old_prop = true;

					if (!this._cutAction) {
						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return;
					}
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}

				this._set_old_prop = false;
			};
		}
		else if (nexacro.BrowserVersion >= 9) {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition()))) {
					elem.setElementValue(this._value);
					return false;
				}

				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();

				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				if (this._do_set_caret) {
					this._setCaret(elem);
					this._do_set_caret = false;
				}
			};
		}
		else {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				var mouse_stat = this._stat_mouse.getCurrentStatus();
				if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition()))) {
					elem.setElementValue(this._value);
					return false;
				}

				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				if (!this._set_old_prop) {
					this._set_old_info();
				}

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
					this._set_old_prop = true;

					return;
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				this._set_old_prop = false;
			};
		}
	}
	else if (nexacro.OS == "iOS") {
		_pEditMaskNumber._on_default_input_keyinput = function (elem) {
			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}
			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (major_ver >= 13 && !this._pasteAction && (elem._is_keydown === false || this._keycode == nexacro.Event.KEY_BACKSPACE)) {
				if (elem_value == text) {
					nexacro.__setDOMNodeValue(elem._input_handle, null);
				}
				elem.setElementValue(this._text);
				this._stat_composition.init();
				return false;
			}

			if (major_ver >= 13 && elem_value == "" && this._is_composition() && elem._is_keydown) {
				var compositiondata = this._stat_composition.getData(elem);
				if (compositiondata) {
					compositiondata = compositiondata.substr(compositiondata.length - 1, 1);
					compositiondata = this._is_maskchar(compositiondata);

					var newText = text + compositiondata;

					this._setText(newText);
					this._setValue(this.normalizeValue(this._text));

					if (elem_value == text) {
						nexacro.__setDOMNodeValue(elem._input_handle, null);
					}
					this._setElementValue(elem, elem_pos.end, elem_pos.end, true);
					this._stat_composition.init();

					if (compositiondata == "") {
						return false;
					}
				}
			}

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer(text, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer(elem_value, elem_pos.begin, elem_pos.end);
			}

			insertText = this.getInsertText(elem);

			if (this._is_composition()) {
				if (this._keypress) {
					insertText = insertText.substr(insertText.length - 1, 1);
					this._keypress = false;
				}
				else {
					if (major_ver >= 13 && elem_pos.begin != elem_pos.end) {
						insertText = insertText.substr(insertText.length - 1, 1);
					}
					else {
						insertText = "";
					}
				}
			}

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}
	else {
		_pEditMaskNumber._on_default_input_keyinput = function (elem) {
			var mouse_stat = this._stat_mouse.getCurrentStatus();
			if ((nexacro.SystemLang == "ja" || nexacro.SystemLang == "ja-JP") && (mouse_stat == "mousedown" && !(nexacro.BrowserType == "Edge" && this._is_composition()))) {
				elem.setElementValue(this._value);
				return false;
			}

			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer(text, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer(elem_value, elem_pos.begin, elem_pos.end);
			}

			insertText = this.getInsertText(elem);

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}

	_pEditMaskNumber._fire_text_event = function (chartext) {
		var comp = this.comp;
		var elem = comp._input_element;
		var elem_value = elem.getElementValue();

		var text_info = this._textEventInfo;
		var autoskip = comp.autoskip;
		var bFilter = false;
		var bFilled = false;
		var changeChartext = false;
		var ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};

		if (this._is_undo) {
			this._setText(elem_value);
			this._setValue(this.normalizeValue(this._text));
		}
		else if (this._pasteAction) {
			var i = 0;
			while (i < chartext.length) {
				var ch = chartext.charAt(i);

				ret = this._apply_filter(ch);

				if (ret.bChange) {
					this._setValue(ret.value);
					this._setText(ret.text);
					this.setElementCaretPos(ret.caret, ret.caret);
				}
				i++;
			}
			if (elem_value != this._text) {
				this.setValue(this._text);
			}
		}
		else {
			ret = this._apply_filter(chartext);

			if (ret.bChange) {
				this._setValue(ret.value);
				this._setText(ret.text);
				this.setElementCaretPos(ret.caret, ret.caret);
			}
		}

		if (elem_value != this._text) {
			bFilter = true;
			this._filteredtext = true;
		}

		text_info.setTextInfo(chartext, this._old_text, this._text, "", "", this._old_text);

		var ret = comp.on_fire_ontextchange(text_info);
		if (ret) {
			ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext, text_info.pretext);
			if (ret) {
				ret = comp.on_fire_onchar(text_info);
				if (ret) {
					if (elem_value != text_info.posttext) {
						changeChartext = true;
					}

					if (text_info.pretext != text_info.posttext) {
						this.syncValue();

						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						this.setElementCaretPos(this._begin_pos, this._end_pos, elem);

						comp.on_fire_ontextchanged(comp, this._old_text, this._text);
					}
				}
			}
		}

		if (!ret) {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._setElementValue(elem, this._old_begin_pos, this._old_end_pos, true);

			return;
		}

		if (bFilter || changeChartext) {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this.syncValue();

			if ((nexacro.OS == "Mac OS" || ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && nexacro._isDesktop())) && bFilter && this._stat_composition._curr_stat == nexacro.EditBase.Status.CompositionEnd && !this._is_hangul(chartext)) {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					var caret_pos = elem.getElementCaretPos();
					if ((nexacro.Browser == "Chrome" || (nexacro.Browser == "Edge" && nexacro.BrowserType == "Webkit")) && caret_pos.begin != pThis._begin_pos && caret_pos.begin > pThis._begin_pos) {
						pThis._setCaret(elem);
					}
					pThis._accept_keyinput_event = false;
					pThis._accept_blur_event = false;
					pThis._accept_focus_event = false;
					elem.setElementBlur();
					elem.setElementFocus();
					pThis._accept_blur_event = false;
					pThis._accept_focus_event = false;
					elem.setElementBlur();
					elem.setElementFocus();
					pThis._accept_keyinput_event = true;

					pThis._setElementValue(elem, pThis._begin_pos, pThis._begin_pos, true);
					pThis._stat_composition.init();
				});
			}
			else if (nexacro.OS != "Mac OS" && nexacro.Browser == "Safari" && bFilter && this._stat_composition._curr_stat == nexacro.EditBase.Status.CompositionEnd && !this._is_hangul(chartext)) {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					nexacro.__setDOMNodeValue(elem._input_handle, null);
					pThis._setElementValue(elem, pThis._begin_pos, pThis._begin_pos, true);
					pThis._is_compositionfocus = true;
				});
			}
			else {
				this._setElementValue(elem, this._begin_pos, this._end_pos, true);
			}
		}

		if (nexacro.OS != "Mac OS" && nexacro.Browser == "Safari") {
			if (!bFilter && this._is_composition() && !this._is_hangul(chartext) && this._stat_composition._curr_stat != "none") {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					nexacro.__setDOMNodeValue(elem._input_handle, null);
					pThis._setElementValue(elem, pThis._begin_pos, pThis._begin_pos, true);
					pThis._is_compositionfocus = true;
				});
			}
		}

		if (autoskip) {
			bFilled = this.isFilled();
			if (bFilled) {
				this._apply_autoskip();
			}
		}
	};

	delete _pEditMaskNumber;
	_pEditMaskNumber = null;

	nexacro.EditMaskDate = function (comp) {
		nexacro.EditMaskString.call(this, comp);
	};

	_pEditMaskDate = nexacro._createPrototype(nexacro.EditMaskString, nexacro.EditMaskDate);
	nexacro.EditMaskDate.prototype = _pEditMaskDate;

	_pEditMaskDate._type_name = "EditMaskDate";

	_pEditMaskDate._maskChr = {
		"y" : /[0-9]/, 
		"M" : /[0-9]/, 
		"d" : /[0-9]/, 
		"h" : /[0-9]/, 
		"H" : /[0-9]/, 
		"m" : /[0-9]/, 
		"s" : /[0-9]/, 
		"l" : /[0-9]/, 
		"~" : /[uAC00-\uFAFF]/, 
		"^" : /[uAC00-\uFAFF]/
	};

	delete _pEditMaskDate;
	_pEditMaskDate = null;


	nexacro.EditBase.Status = function (id) {
		this.id = id;
		this.init();
	};

	var _pEditBaseStatus = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.Status);
	nexacro.EditBase.Status.prototype = _pEditBaseStatus;
	_pEditBaseStatus._type_name = "EditBaseStatus";

	_pEditBaseStatus._prev_stat = "";
	_pEditBaseStatus._curr_stat = "";

	_pEditBaseStatus.init = function () {
		this._prev_stat = nexacro.EditBase.Status.None;
		this._curr_stat = nexacro.EditBase.Status.None;
	};

	_pEditBaseStatus.setStatus = function (status) {
		this._prev_stat = this._curr_stat;
		this._curr_stat = status;
	};

	_pEditBaseStatus.getCurrentStatus = function () {
		return this._curr_stat;
	};

	_pEditBaseStatus.getPreviousStatus = function () {
		return this._prev_stat;
	};

	delete _pEditBaseStatus;
	_pEditBaseStatus = null;

	nexacro.EditBase.CompositionStatus = function (id) {
		nexacro.EditBase.Status.call(this, id);
	};
	var _pEditBaseCompositionStatus = nexacro._createPrototype(nexacro.EditBase.Status, nexacro.EditBase.CompositionStatus);
	nexacro.EditBase.CompositionStatus.prototype = _pEditBaseCompositionStatus;
	_pEditBaseCompositionStatus._type_name = "EditBaseCompositionStatus";

	_pEditBaseCompositionStatus._prev_stat = "";
	_pEditBaseCompositionStatus._curr_stat = "";
	_pEditBaseCompositionStatus._prev_data = "";
	_pEditBaseCompositionStatus._curr_data = "";

	_pEditBaseCompositionStatus.init = function () {
		this._prev_stat = nexacro.EditBase.Status.None;
		this._curr_stat = nexacro.EditBase.Status.None;
		this._prev_data = "";
		this._curr_data = "";
	};

	_pEditBaseCompositionStatus.setStatus = function (status, data) {
		this._prev_stat = this._curr_stat;
		this._curr_stat = status;
		this._prev_data = this._curr_data;
		this._curr_data = data;
	};

	_pEditBaseCompositionStatus.getData = function () {
		return this._curr_data;
	};

	_pEditBaseCompositionStatus.getPreviousData = function () {
		return this._prev_data;
	};

	delete _pEditBaseCompositionStatus;
	_pEditBaseCompositionStatus = null;

	nexacro.EditBase.Status.None = "none";
	nexacro.EditBase.Status.MouseDown = "mousedown";
	nexacro.EditBase.Status.MouseUp = "mouseup";
	nexacro.EditBase.Status.Click = "click";
	nexacro.EditBase.Status.Select = "select";
	nexacro.EditBase.Status.MouseMove = "mousemove";
	nexacro.EditBase.Status.MouseDrag = "drag";
	nexacro.EditBase.Status.MouseDragMove = "dragmove";
	nexacro.EditBase.Status.MouseDrop = "drop";
	nexacro.EditBase.Status.NoSelectDrag = "noselectdrag";

	nexacro.EditBase.Status.Focus = "focus";
	nexacro.EditBase.Status.Blur = "blur";

	nexacro.EditBase.Status.CompositionStart = "start";
	nexacro.EditBase.Status.CompositionUpdate = "update";
	nexacro.EditBase.Status.CompositionEnd = "end";

	nexacro.EditBase.UndoStack = function (comp) {
		this.init();

		this.comp = comp;
	};

	var _pEditBaseUndoStack = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.UndoStack);
	nexacro.EditBase.UndoStack.prototype = _pEditBaseUndoStack;
	_pEditBaseUndoStack._type_name = "EditBaseUndoStack";

	_pEditBaseUndoStack.undoStack = [{
		value : 0, 
		selectionStart : 0, 
		selectionEnd : 0
	}];
	_pEditBaseUndoStack.comp = null;
	_pEditBaseUndoStack.undoPosition = 0;

	_pEditBaseUndoStack.init = function () {
		this.undoStack = [{
			value : 0, 
			text : 0, 
			selectionStart : 0, 
			selectionEnd : 0
		}];

		this.undoPosition = 0;
	};

	_pEditBaseUndoStack._destroy = function () {
		this.comp = null;
		this.undoStack = null;
	};

	_pEditBaseUndoStack.push = function (value, text, start, end) {
		if (!text) {
			if (!value) {
				text = "";
			}
			else {
				text = value;
			}
		}

		var undoItem = {
			value : value, 
			text : text, 
			selectionStart : start, 
			selectionEnd : end
		};
		var curUndoItem = this.undoStack[this.undoPosition];

		if (curUndoItem.value === value) {
			this.refreshUndoItem(undoItem);
		}
		else {
			this.undoStack.length = ++this.undoPosition;
			this.undoStack.push(undoItem);
		}
	};

	_pEditBaseUndoStack.restoreUndoItem = function (item) {
		var elem = this.comp._input_element;
		if (elem) {
			elem.text = item.text;
			elem.value = item.value;

			elem._updateInputValue();
			elem.setElementSetSelect(item.selectionStart, item.selectionEnd);
		}
	};

	_pEditBaseUndoStack.refreshUndoItem = function (item) {
		var bChange = false;
		var curUndoItem = this.undoStack[this.undoPosition];

		if (curUndoItem.value !== item.value || curUndoItem.text !== item.text || curUndoItem.selectionStart !== item.selectionStart || curUndoItem.selectionEnd !== item.selectionEnd) {
			bChange = true;
		}

		if (bChange) {
			this.undoStack[this.undoPosition] = item;
		}
	};

	_pEditBaseUndoStack.doUndo = function () {
		if (this.comp && this.comp.readonly) {
			return;
		}
		if (this.undoPosition > 1) {
			this.restoreUndoItem(this.undoStack[--this.undoPosition]);
		}
	};

	_pEditBaseUndoStack.doRedo = function () {
		if (this.comp && this.comp.readonly) {
			return;
		}
		if (this.undoPosition < this.undoStack.length - 1) {
			this.restoreUndoItem(this.undoStack[++this.undoPosition]);
		}
	};

	delete _pEditBaseUndoStack;
	_pEditBaseUndoStack = null;

	nexacro.EditBase.TextEventInfo = function (comp) {
		this.init();

		this.comp = comp;
	};

	var _pEditBaseTextEventInfo = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.TextEventInfo);
	nexacro.EditBase.TextEventInfo.prototype = _pEditBaseTextEventInfo;
	_pEditBaseTextEventInfo._type_name = "EditBaseTextEventInfo";

	_pEditBaseTextEventInfo.init = function () {
		this.chartext = null;

		this.pretext = null;
		this.posttext = null;

		this.preimetext = null;
		this.postimetext = null;

		this.prechareventtext = null;

		this.bInsert = true;
		this.bCut = false;
	};

	_pEditBaseTextEventInfo._destroy = function () {
		this.comp = null;

		this.chartext = null;

		this.pretext = null;
		this.posttext = null;

		this.preimetext = null;
		this.postimetext = null;

		this.prechareventtext = null;

		this.bInsert = true;
		this.bCut = false;
	};

	_pEditBaseTextEventInfo.setTextInfo = function (chartext, pretext, posttext, preimetext, postimetext, prechareventtext, bInsert, bCut) {
		this.chartext = chartext;

		this.pretext = pretext;
		this.posttext = posttext;

		this.preimetext = preimetext;
		this.postimetext = postimetext;

		this.prechareventtext = prechareventtext;

		this.bInsert = bInsert;
		this.bCut = bCut;
	};

	delete _pEditBaseTextEventInfo;
	_pEditBaseTextEventInfo = null;
}
