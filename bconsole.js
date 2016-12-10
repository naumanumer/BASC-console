//
// Low Resolution Graphics (LoRes) Emulation
//

// Usage:
//
//   var lores = new LoRes( element, width, height )
//   lores.clear()
//   lores.setColor( color_index )
//   lores.plot( x, y )
//   lores.hlin( x1, x2, y )
//   lores.vlin( x1, x2, y )
//   lores.show( bool )
//   color_index = lores.getPixel( x, y )
//   { width: w, height: h } = lores.getScreenSize()

function BASIC_console(element, width) {

  var foreColor = "#999", backColor = "#212121",
    table, input,
    lines = 25,
    foreColor = "#fff",
    crntPos = { line: 0, char: 0 };

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
    for (var i = 0, len = text.length; i < len; i++) {
      this.writeChar(text[i], crntPos);

      if (crntPos.char < width - 1)
        crntPos.char++;
      else {
        crntPos.line++;
        crntPos.char = 0;
      }
    }
  };

  this.writeChar = function (char, pos) {
    var x = pos.char,
      y = pos.line;
    var td = document.getElementById(`line-${y}-col-${x}`);
    td.innerText = char[0];
  };

  this.writeAtLine = function (text, lineNum) {
    for (var char = 0; char < width; char++) {
      var td = document.getElementById(`line-${lineNum}-col-${char}`);
      if (text[char])
        td.innerText = text[char];
    }
  }

  this.inertLineBreak = function(){
    crntPos.line++;
    crntPos.char = 0;
  }

  this.backSpace = function(){
    this.writeChar(" ", {line: crntPos.line, char: crntPos.char-1});
    crntPos.char--;
  }

  this.clear = function () {
    for (var y = 0; y < lines; y++) {
      for (var x = 0; x < width; x++) {
        var td = document.getElementById(`line-${y}-col-${x}`);
        td.innerText = "";
      }
    }
    crntPos.line=0;
    crntPos.char=0;
  };

  this.clearLine = function (lineNum) {
    for (var i = 0; i < width; i++) {
      var td = document.getElementById(`line-${lineNum}-col-${i}`);
      td.innerText = "";
    }
  };

  this.scrollUp = function () {
    var nextLine = "";

    for (var i = 0; i < lines; i++) {
      nextLine = this.cloneLine(i + 1);
      this.clearLine(i);
      this.writeAtLine(nextLine, i);
    }

    crntPos.line--;
  };

  this.cloneLine = function (lineNum) {
    var text = "";
    for (var x = 0; x < width; x++) {
      var td = document.getElementById(`line-${lineNum}-col-${x}`);
      if (td) {
        if (td.innerText)
          text += td.innerText;
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
    return { width: width, height: lines };
  };

  this.getScreenSizeInPx = function () {
    return { width: $(table).width(), height: $(table).height() };
  }

  this.getColor = function () {
    return { fore: foreColor, back: backColor };
  };

  this.appendInput = function () {
    input = document.createElement('input');
    input.style.height = this.getScreenSizeInPx().height;
    input.style.width = this.getScreenSizeInPx().width;
    $(input).attr('id', 'console-input')
    element.appendChild(input);
  };


};
