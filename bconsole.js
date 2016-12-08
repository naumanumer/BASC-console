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

function BASIC_console(element, char_width) {

  var COLORS, // Apple II to HTML color table
      loresPixel = [], // element references
      pixels = [], // color values
      color = 0, // current color
      table,
      crntpos = [{line: 0},{col: 0}]
      lines = 25;

  function init() {
    var x, y, tbody, tr, td;

    //pixels = [];
    //pixels.length = width * height;
    //loresPixel = [];
    //loresPixel.length = width * height;

    table = document.createElement('table');
    
alert("565");
    tbody = document.createElement('tbody');
    for (y = 0; y < lines; y ++) {
      tr = document.createElement('tr');
      //tr.setAttribute('id', 'line-'+y);
      for (x = 0; x < char_width; x += 1) {
        td = document.createElement('td');
        //td.setAttribute('id', 'line-'+y+'--col'+x);
        
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    element.innerHTML = "";
    element.appendChild(table);
  }

  this.setBackground = function(color){
      table.style.backgroundColor = color;
  }

  this.setForecolor = function(color){
      table.style.color = color;
  }

  this.write = function(text){
      var element = document.getElementById('line-0--col-0');
      alert("df"+element);
  }

  this.clear = function() {
    var x, y, pixel;
    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        pixel = loresPixel[y * width + x];
        pixel.style.backgroundColor = "black";
        pixels[y * width + x] = 0;
      }
    }

  };

  function plot(x, y) {
    var pixel = loresPixel[y * width + x];
    if (pixel) {
      pixel.style.backgroundColor = COLORS[color];
      pixels[y * width + x] = color;
    }
  }

  this.plot = function(x, y) {
    plot(x, y);
  };

  this.getPixel = function(x, y) {
    if (0 <= x && x < width &&
            0 <= y && y < height) {

      return pixels[y * width + x];
    } else {
      return 0;
    }
  };

  this.hlin = function(x1, x2, y) {
    var x;
    if (x1 > x2) {
      x = x1;
      x1 = x2;
      x2 = x;
    }

    for (x = x1; x <= x2; x += 1) {
      plot(x, y);
    }
  };

  this.vlin = function(y1, y2, x) {
    var y;
    if (y1 > y2) {
      y = y1;
      y1 = y2;
      y2 = y;
    }

    for (y = y1; y <= y2; y += 1) {
      plot(x, y);
    }
  };

  this.getScreenSize = function() {
    return { width: width, height: height };
  };

  this.show = function(state) {
    element.style.visibility = state ? "visible" : "hidden";
  };


  init();
  
}
