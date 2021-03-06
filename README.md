# Floating Headers for iScroll

A smooth, glitch-free implementation of floating / sticky headers for iScroll. 

Our goal was to get as close as possible to the native feel of the UITableView's floating headers using HTML5.


## Demo
Don't just take our word for it, [check out the DEMO on your mobile device](http://jsbin.com/iscroll-floating-headers/14)


## Compability and Device Support
We test on the following devices and mobile browsers:

### Mobile browsers:
 * Mobile Safari on iOS 4 and upwards
 * Chrome on iOS 5 and upwards
 * Chrome on Android (ICS)
 * Android Browser since Gingerbread

### A-grade devices:
 * iPhone 4GS (iOS5)
 * iPhone 4G  (iOS5)
 * iPhone 3GS (iOS5)
 * iPad 3     (iOS5)
 * iPad 2     (iOS5)
 * Galaxy S3  (Ice Cream Sandwich)
 * Galaxy S2  (Gingerbread)
 * NEXUS S    (Jelly Bean)

### B grade devices (works but device performance is bad):
 * iPhone 3G       (iOS4)
 * Galaxy Tab 10.1 (Honeycomb)


## Usage
Include `iscroll_floating_headers.js` after `iscroll.js` in your JavaScript bundle or on your HTML page.
Include `iscroll_floating_headers.css` in your HTML `<head>` to enable the default skin used in the demo.

### HTML
Create a normal HTML list for your content and wrap it in a container. 

Add the style class `i4-ui-list to the scroll container to enable the default style. The default style assumes you have an unordered list.

Add `<header>` elements in your list where you want floating headers.

```html
<div id="myList" class="i4-ui-list">
	<ul>
		<header>C</header>
		<li>Special Agent Dale Cooper</li>
		<header>J</header>
		<li>Hank Jennings</li>
		<li>Leo Johnson</li>
		<li>Shelly Johnson</li>
		<header>H</header>
		<li>Donna Hayward </li>
		<li>Audrey Horne</li>
		<li>Benjamin Horne</li>
		<li>Big Ed Hurley</li>
		<header>P</header>
		<li>Jocelyn Packard</li>
		<li>Leland Palmer</li>
		<header>C</header>
		<li>Special Agent Dale Cooper</li>
		<header>J</header>
		<li>Hank Jennings</li>
		<li>Leo Johnson</li>
		<li>Shelly Johnson</li>
		<header>H</header>
		<li>Donna Hayward </li>
		<li>Audrey Horne</li>
		<li>Benjamin Horne</li>
		<li>Big Ed Hurley</li>
		<header>P</header>
		<li>Jocelyn Packard</li>
		<li>Leland Palmer</li>
	</ul>
</div>
```

### Javascript
Instantiate the list and pass in the scroll container DOM element. The first element in the container will be scrolled - this should be your list.

```javascript
new iScrollFloatingHeaders( document.getElementById('myList') )
```
That's it, no fancy configuration, it just works. 

_If you haven't used iScroll before, consider reading the "Getting Started" section of the [iScroll documentation](http://cubiq.org/iscroll-4)_


## Requirements
There's a hard dependency on iScroll. It has currently only been tested with the latest stable version of Zepto.
* iScroll 4.2.2
* Zepto.js 1.0rc1

Please let us know if you successfully use older versions of the above libraries.

## API
The list has a number of useful public methods:
* `refresh()`
Must be called whenever the content length changes.
* `scrollTo(pos, delay = 0)`
Animate a scroll to the specified Y-position with an optional delay before scroll occurs.
* `scrollToTop(delay = 0)`
Animate a scroll to the top of the list with an optional delay before scroll occurs.
* `scrollToElement(el, delay = 0)`
Animate a scroll to the specified list element with an optional delay before scroll occurs.
_Differs from the standard iScroll function in that it will try to scroll the element into the center of the viewport._


## Planned features
* Quickscroll - an index that appears as a bar on the right hand side of the table (for example, "a" through "z"). You can touch a particular label to jump to the target section.


## Implementation details
We use iScroll since the native `-webkit-overflow-scroll: touch;` scrolling on iOS5 only updates the Y-pos while a finger is touching the screen, thus making it impossible to position floating headers during a scroll momentum/bounce-back. Any ideas on how to make this work using just native scrolling are more than welcome!

Floating Headers for iScroll is developed by [14islands](http://14islands.com) (Twitter: [@14islands](https://twitter.com/14islands)). 

Licenced under the MIT licence. We welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request. Enjoy!
