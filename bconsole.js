function BASIC_console(element, width) {

  var backColor = "#212121",
    table, input,
    lines = 25,
    foreColor = "#fff",
    caretText = "&#9608;";

  this.crntPos = { line: 0, char: 0 };
  this.isCaretShown = false;

  this.init = function () {
    var x, y, tbody, tr, td;

    table = document.createElement('table');
    tbody = document.createElement('tbody');

    for (y = 0; y < lines; y++) {
      tr = document.createElement('tr');
      $(tr).attr('id', `line-${y}`)
      for (x = 0; x < width; x += 1) {
        td = document.createElement('td');
        $(td).attr('id', `line-${y}-col-${x}`)
        td.style.backgroundColor = backColor;
        td.style.color = foreColor;

        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    element.innerHTML = "";
    element.appendChild(table);
    this.appendInput();
  };

  this.setBackground = function (color) {
    backColor = color;
    for (y = 0; y < lines; y++) {
      for (x = 0; x < width; x += 1) {
        var td = document.getElementById(`line-${y}-col-${x}`);
        td.style.backgroundColor = color;
      }
    }
  };

  this.setForecolor = function (color) {
    foreColor = color;
    for (y = 0; y < lines; y++) {
      for (x = 0; x < width; x++) {
        var td = document.getElementById(`line-${y}-col-${x}`);
        td.style.color = color;
      }
    }
  };

  this.write = function (text) {
    if(this.isCaretShown)
      this.removeCaret();
    for (var i = 0, len = text.length; i < len; i++) {
      this.writeChar(text[i], this.crntPos);

      if (this.crntPos.char < width - 1){
        this.crntPos.char++;
      } else {
        this.crntPos.line++;
        this.crntPos.char = 0;
      }
    }
    if(this.isCaretShown)
      this.showCaret();
  };

  this.writeChar = function (char, pos) {
    var x = pos.char,
      y = pos.line;
    var td = document.getElementById(`line-${y}-col-${x}`);
    td.innerHTML = char;

  };

  this.writeAtLine = function (text, lineNum) {
    for (var char = 0; char < width; char++) {
      var td = document.getElementById(`line-${lineNum}-col-${char}`);
      if (text[char])
        td.innerHTML = text[char];
    }
  }

  this.insertLineBreak = function () {
    this.crntPos.line++;
    this.crntPos.char = 0;
    if(this.isCaretShown)
          this.refreshCaret();
  }

  this.backSpace = function () {
    if (this.crntPos.char - 1 < 0) {
      var current = { line: this.crntPos.line - 1, char: width - 1 }
      this.writeChar(" ", current);
      this.crntPos = current;
    } else {
      this.writeChar(" ", { line: this.crntPos.line, char: this.crntPos.char - 1 });
      this.crntPos.char--;
    }
    if(this.isCaretShown)
          this.refreshCaret();
  }

  this.clear = function () {
    for (var y = 0; y < lines; y++) {
      for (var x = 0; x < width; x++) {
        var td = document.getElementById(`line-${y}-col-${x}`);
        td.innerHTML = "";
      }
    }
    this.crntPos.line = 0;
    this.crntPos.char = 0;
    if(this.isCaretShown)
          this.refreshCaret();
  };

  this.clearLine = function (lineNum) {
    for (var i = 0; i < width; i++) {
      var td = document.getElementById(`line-${lineNum}-col-${i}`);
      td.innerHTML = "";
    }
    if(this.isCaretShown)
          this.refreshCaret();
  };

  this.scrollUp = function () {
    var nextLine = "";

    for (var i = 0; i < lines; i++) {
      nextLine = this.cloneLine(i + 1);
      this.clearLine(i);
      this.writeAtLine(nextLine, i);
    }

    this.crntPos.line--;
    if(this.isCaretShown)
          this.refreshCaret();
  };

  this.cloneLine = function (lineNum) {
    var text = "";
    for (var x = 0; x < width; x++) {
      var td = document.getElementById(`line-${lineNum}-col-${x}`);
      if (td) {
        if (td.innerHTML)
          text += td.innerHTML;
        else
          text += " ";
      }
    }
    return text;
  }

  this.cloneText = function () {
    var text = ""

    for (var i = 0; i < lines; i++) {
      var line = this.cloneLine(i);
      if (line)
        text += line + "\n";
    }

    return text;
  }

  this.getScreenSize = function () {
    return { width: $(table).width(), height: $(table).height() };
  }

  this.appendInput = function () {
    input = document.createElement('input');
    input.style.height = this.getScreenSizeInPx().height;
    input.style.width = this.getScreenSizeInPx().width;
    $(input).attr('id', 'console-input')
    element.appendChild(input);
  };

  this.showCaret = function () {
    var crntElement = this.getElementByPos(this.crntPos.line, this.crntPos.char);
    $(crntElement).addClass('blinking-cursor');
    $(crntElement).html(caretText);
    this.isCaretShown = true;
  }

  this.removeCaret = function () {
    var carettd = $('.blinking-cursor');
    $(carettd).html('');
    $(carettd).removeClass('blinking-cursor');
  }

  this.refreshCaret = function(){
    this.removeCaret();
    this.showCaret();
  }

  this.setCaretText = function(char){
    caretText = char[0];
    this.refreshCaret();
  }

  this.getElementByPos = function (line, char) {
    return document.getElementById(`line-${line}-col-${char}`);
  }

};
