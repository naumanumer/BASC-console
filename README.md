# BASIC Console

![BASIC console](BASIC%20console.png "BASIC console")

A console written in javascript for old BASIC languages. This project aims to provide console similar to old BASIC interpreters inside browser.

# Getting Started
## Running Code
* download code or clone it using
```
git clone https://github.com/naumanumer/BASIC-console.git
```
* open index.html file from the root of project with any broswer (but chrome is recomended)

## Dependencies
* jquery
NOTE: all te denpendencies are provided with code itself.

## Initializing

Initialize the console in your own html code:
```javascript
var bconsoleElement = document.getElementById('ELEMENT_ID_HERE');
var bconsole = new BASIC_console(bconsoleElement, 80);
bconsole.init();
```
you can use this to handle **Caret** properly:
```javascript
$("#console-input").keyup(function( e ) {
	 if(bconsole.isCaretShown){
	  if (e.keyCode == 13) {
		bconsole.insertLineBreak();
		$(this).val('');
		return false;
	  } else if (e.keyCode == 8){
		bconsole.backSpace();
		return false;
	  }
	  var text = $(this).val();
	  bconsole.write(text);
	  $(this).val('');
	 }
  });
 ```
 
## API references

`BASIC_console(element, width)`
	* `element: any` HTML DOM elemen
	* `width: int` Number of chars in a line. (each char have 8px width and 19px height);
### Props
* `.crntPos: {line: LINE_NO, char: ROW_NO}` current caret position.
* `.isCaretShown : boolean` true if caret is initialized

### Methods
* `.init()` Initialize `BASIC_console` in the given element while initializing `BASIC_console`
	* Takes no arguments.
* `.setBackground(color)` Sets background color.
	* `color: string` any valid css color.
* `.setForecolor(color)` Sets foreground color.
	* `color: string` any valid css color. (still no sets caret color).
* `.write(text)` write text to at `crntPos`.
	* `text: string` any string but `\n` is not rendered as new line.
* `.writeChar(char, pos)` write a char at specified position.
	* `char: string` any string made of one char. if lenght of char is more then 1 it will increase width of `tr`. char can be unicode char i.e.`&#9608;`.
	* `pos: {line: LINE_NO, char: ROW_NO}` the position at which char is rendered.
* `.writeAtLine(text, linenum)` write a text at specified line number.
	* `text: string` any string rendered same as `write`
	* `linenum: int` any valid line number
* `.insertLineBreak()` insert a line break.
	* Takes no argument.
* `.backSpace()` remove a char previous from `crntPos`. Remove last char from previous last if `crntPos` is at 0 index of a line.
	* Takes no argument.
* `.clear()` Clear the whole console.
	* Takes no argument. 
* `.clearLine(linenum)` clear specified line.
	* `linenum: int` any valid line number.
* `.scrollUp()` Scroll console content by one line.
	* Takes no argument. 
* `.cloneLine(linenum)` Returns text from specified line
	* `linenum: int` any valid line number.


# Contribute
if you want to contribute in the project feel free to **Fork** this project made chages and make a pull request.

# License
This project is Licensed under MIT License.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
