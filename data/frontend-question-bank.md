# Frontend Engineering 500 Questions

- Total Questions: 501

## CONCEPT MCQs

### Q1. What is the difference between == and === in JavaScript? A) No difference B) === checks type and value C) == checks type only D) === is slower 

### Q2. Which hook would you use to run a side effect only once after the initial render? A) useState B) useCallback C) useEffect with empty dependency array D) useMemo 

### Q3. What does the virtual DOM do in React? A) Directly manipulates the real DOM B) Replaces the real DOM entirely C) Creates a lightweight copy of the DOM to diff before updating D) Stores component state 

### Q4. What is event delegation in JavaScript? A) Passing events between components B) Attaching a single event listener to a parent instead of multiple children C) Delaying event execution D) Cancelling event propagation 

### Q5. Which CSS property creates a block formatting context? A) display flex B) overflow hidden C) position static D) margin auto 

### Q6. What is the output of typeof null in JavaScript? A) null B) undefined C) object D) string 

### Q7. What does the key prop do in React lists? A) Adds CSS styling B) Helps React identify which items changed C) Sets the order of rendering D) Prevents re-renders entirely 

### Q8. What is the difference between margin and padding? A) No difference B) Margin is inside the element, padding is outside C) Padding is inside the element, margin is outside D) Margin affects background color 

### Q9. What does async/await do in JavaScript? A) Makes code run faster B) Converts promises into synchronous-looking code C) Replaces callbacks permanently D) Only works with fetch 

### Q10. What is a closure in JavaScript? A) A function that returns undefined B) A function that has access to its outer scope even after the outer function returns C) A way to close browser windows D) A method to end loops 

### Q11. What is the purpose of useCallback in React? A) To memoize a value B) To memoize a function reference C) To replace useState D) To fetch data 

### Q12. What does CSS specificity determine? A) Which HTML element loads first B) Which CSS rule applies when multiple rules target the same element C) The size of the element D) The animation speed 

### Q13. What is the difference between null and undefined in JavaScript? A) They are identical B) null is assigned intentionally, undefined means a variable has been declared but not assigned C) undefined is faster D) null only works in TypeScript 

### Q14. What does the spread operator do? A) Splits a string B) Copies all enumerable properties of an object or elements of an array C) Creates a new function D) Filters an array 

### Q15. What is the purpose of React.memo? A) To store values in memory B) To prevent re-rendering of a component if its props have not changed C) To replace useMemo D) To cache API responses 

### Q16. What does position sticky do in CSS? A) Fixes element relative to viewport always B) Keeps element in normal flow but sticks when it hits a scroll threshold C) Same as position fixed D) Removes element from flow 

### Q17. What is the event loop in JavaScript? A) A for loop that runs forever B) The mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded C) A type of event listener D) Part of the React lifecycle 

### Q18. What does localStorage differ from sessionStorage in? A) No difference B) localStorage persists after browser close, sessionStorage does not C) sessionStorage is larger D) localStorage only works on HTTPS 

### Q19. What is tree shaking in frontend bundling? A) Removing dead CSS B) Eliminating unused JavaScript code from the bundle C) Splitting code into chunks D) Minifying HTML 

### Q20. What is the difference between display block and display inline-block? A) No difference B) inline-block allows width and height on inline elements C) block is faster D) inline-block removes margin 

### Q21. What does the z-index property control? A) Zoom level B) Stacking order of positioned elements C) Font size D) Animation speed 

### Q22. What is prop drilling in React? A) A performance optimization B) Passing props through multiple layers of components that do not need them C) A testing technique D) A way to share global state 

### Q23. What does Promise.all do? A) Runs promises sequentially B) Runs all promises in parallel and waits for all to resolve C) Returns the first resolved promise D) Ignores rejected promises 

### Q24. What is the difference between flex and grid in CSS? A) No difference B) Flex is one-dimensional layout, grid is two-dimensional C) Grid only works in Chrome D) Flex is deprecated 

### Q25. What does debouncing do in JavaScript? A) Speeds up function execution B) Delays function execution until a specified time has passed since the last call C) Cancels all events D) Batches API calls 

### Q26. What is the difference between let, const, and var? A) No difference B) var is function scoped, let and const are block scoped, const cannot be reassigned C) let is global D) const is only for numbers 

### Q27. What does the CSS box model consist of? A) Only margin and padding B) Content, padding, border, and margin C) Color and font only D) Width and height only 

### Q28. What is a higher-order component in React? A) A component with many children B) A function that takes a component and returns a new component C) A class component D) A component with hooks 

### Q29. What is the purpose of the useRef hook? A) To trigger re-renders B) To persist a mutable value without causing re-renders and to access DOM elements directly C) To replace useState D) To manage global state 

### Q30. What does the CSS property will-change do? A) Changes CSS variables B) Hints to the browser about elements that will be animated so it can optimize C) Delays style changes D) Prevents layout shifts 

### Q31. What is the difference between synchronous and asynchronous code in JavaScript? A) No difference B) Synchronous code blocks execution, asynchronous code does not block C) Asynchronous is slower D) Synchronous only works with promises 

### Q32. What does React.lazy do? A) Makes components render slowly B) Enables code splitting by dynamically importing a component C) Delays API calls D) Replaces useEffect 

### Q33. What is the purpose of the CSS pseudo-class :nth-child? A) To target elements by class name B) To select elements based on their position among siblings C) To add hover effects D) To style first child only 

### Q34. What is the difference between shallow copy and deep copy in JavaScript? A) No difference B) Shallow copy copies only the first level, deep copy copies all nested levels C) Deep copy is faster D) Shallow copy only works with arrays 

### Q35. What does the viewport meta tag do in HTML? A) Adds a background B) Controls layout on mobile browsers by setting the width and scale C) Adds favicon D) Sets language 

### Q36. What is CSS custom properties also known as? A) CSS classes B) CSS variables, defined with double dash prefix C) CSS mixins D) CSS functions 

### Q37. What does the reduce method do in JavaScript? A) Filters an array B) Reduces an array to a single value by applying a function to each element C) Maps each element D) Sorts the array 

### Q38. What is the difference between controlled and uncontrolled components in React? A) No difference B) Controlled components have their state managed by React, uncontrolled components manage their own state via the DOM C) Uncontrolled is faster always D) Controlled only works with hooks 

### Q39. What does CSS transform translate do? A) Changes text content B) Moves an element from its current position without affecting layout flow C) Rotates only D) Scales element 

### Q40. What is a pure function in JavaScript? A) A function with no parameters B) A function that always returns the same output for the same input and has no side effects C) A function that uses async D) A function inside a class 

### Q41. What does the fetch API return? A) Raw data B) A Promise that resolves to a Response object C) A callback D) An observable 

### Q42. What is the Critical Rendering Path? A) The path a user clicks B) The sequence of steps the browser takes to convert HTML, CSS, and JS into pixels C) The API call chain D) The React component tree 

### Q43. What does CSS overflow hidden do? A) Hides the element B) Clips content that exceeds the container and creates a block formatting context C) Removes padding D) Disables scroll 

### Q44. What is the difference between map and forEach in JavaScript? A) No difference B) map returns a new array, forEach returns undefined C) forEach is faster D) map only works with strings 

### Q45. What does the HTML attribute defer do on a script tag? A) Blocks HTML parsing B) Defers script execution until after HTML parsing is complete C) Loads script from cache D) Makes script asynchronous only 

### Q46. What is React context used for? A) Making API calls B) Sharing state across a component tree without passing props at every level C) Replacing Redux always D) Caching data 

### Q47. What does CSS flexbox align-items do? A) Aligns items horizontally B) Aligns flex items along the cross axis C) Adds gaps D) Reverses order 

### Q48. What is the purpose of the HTML srcset attribute on images? A) Adds multiple alt texts B) Provides multiple image sources for different screen resolutions C) Lazy loads images D) Adds captions 

### Q49. What does the JavaScript Map object differ from a plain object? A) No difference B) Map maintains insertion order, allows any type as key, and has better performance for frequent additions and removals C) Map is slower D) Map only stores strings 

### Q50. What is a service worker? A) A backend server B) A script that runs in the background separate from the web page enabling offline capabilities and push notifications C) A React hook D) A CSS preprocessor 

### Q51. What does the CSS property contain do? A) Adds content B) Isolates an element from the rest of the document for performance optimization C) Hides overflow D) Sets display mode 

### Q52. What is the difference between innerHTML and textContent? A) No difference B) innerHTML parses HTML tags, textContent treats everything as plain text C) textContent is deprecated D) innerHTML is faster 

### Q53. What does the React useReducer hook provide over useState? A) Nothing extra B) A way to manage complex state transitions with a reducer function, similar to Redux C) Faster rendering D) Automatic API calls 

### Q54. What is CSS specificity calculated from? A) File order only B) Inline styles, IDs, classes and pseudo-classes, and element selectors in that order of weight C) Random order D) Alphabetical order 

### Q55. What does lazy loading images do? A) Makes images smaller B) Defers loading images until they are about to enter the viewport C) Removes images D) Caches images permanently 

### Q56. What is the difference between em and rem in CSS? A) No difference B) em is relative to the parent element font size, rem is relative to the root element font size C) rem is deprecated D) em only works in Chrome 

### Q57. What does JavaScript hoisting do? A) Moves code to the bottom B) Moves variable and function declarations to the top of their scope before execution C) Only affects let D) Copies variables 

### Q58. What is the purpose of aria attributes in HTML? A) To add animations B) To provide accessibility information to assistive technologies like screen readers C) To add styling D) To speed up rendering 

### Q59. What does CSS grid-template-areas allow you to do? A) Name grid cells B) Define named grid areas for placing items using ASCII art-like syntax C) Set column widths D) Add borders 

### Q60. What is the difference between Promise.race and Promise.all? A) No difference B) Promise.race resolves or rejects with the first settled promise, Promise.all waits for all C) Promise.race is deprecated D) Promise.all is slower 

### Q61. What does the CSS property object-fit do? A) Rotates objects B) Controls how an image or video fits within its container C) Adds borders D) Sets z-index 

### Q62. What is a WeakMap in JavaScript? A) A slow Map B) A Map where keys are objects and are held weakly so they can be garbage collected C) A Map for strings only D) A deprecated feature 

### Q63. What does the React Suspense component do? A) Pauses React forever B) Lets you display a fallback while waiting for something like lazy-loaded components or data C) Replaces error boundaries D) Only works with SSR 

### Q64. What is the difference between CSS transition and animation? A) No difference B) Transition animates between two states triggered by events, animation can loop and has keyframes C) Animation is simpler D) Transition uses JavaScript 

### Q65. What does the JavaScript Symbol type provide? A) Faster strings B) A unique and immutable primitive value often used as object property keys to avoid collisions C) A type for numbers D) A global variable 

### Q66. What is hydration in the context of SSR React? A) Adding water to code B) The process of attaching event listeners and making server-rendered HTML interactive on the client C) Fetching data D) Running tests 

### Q67. What does the CSS property isolation create? A) Makes element invisible B) Creates a new stacking context to prevent z-index conflicts C) Adds padding D) Removes borders 

### Q68. What is the difference between useMemo and useCallback? A) No difference B) useMemo memoizes a computed value, useCallback memoizes a function reference C) useCallback is faster D) useMemo only works with numbers 

### Q69. What does the Intersection Observer API do? A) Compares two objects B) Asynchronously observes when an element enters or exits the viewport C) Merges arrays D) Handles events 

### Q70. What is the purpose of the HTML template element? A) Adds CSS B) Holds HTML that is not rendered immediately but can be cloned and inserted via JavaScript C) Creates forms D) Adds scripts 

### Q71. What does the CSS property backdrop-filter do? A) Filters arrays B) Applies graphical effects like blur to the area behind an element C) Hides background D) Adds shadow 

### Q72. What is the JavaScript Proxy object? A) A network proxy B) An object that wraps another object and intercepts fundamental operations like property access and assignment C) A caching mechanism D) An async wrapper 

### Q73. What does React.StrictMode do? A) Enables production mode B) Runs additional checks in development to surface potential problems C) Removes console logs D) Disables warnings 

### Q74. What is the difference between reflow and repaint in browser rendering? A) No difference B) Reflow recalculates layout, repaint only updates visual appearance without layout change C) Repaint is more expensive D) Reflow is faster 

### Q75. What does the CSS property content-visibility do? A) Hides content B) Skips rendering of off-screen elements improving scroll performance C) Shows hidden elements D) Controls font 

### Q76. What is module federation in Webpack? A) A testing tool B) A way to share code between separate builds at runtime enabling micro-frontends C) A CSS feature D) A Node module 

### Q77. What does the HTML attribute loading lazy do on images? A) Makes images smaller B) Tells the browser to defer loading the image until it is near the viewport C) Compresses images D) Adds fallback 

### Q78. What is the difference between a microtask and a macrotask in JavaScript? A) No difference B) Microtasks like Promise callbacks run before macrotasks like setTimeout after the current task completes C) Macrotasks are faster D) Microtasks only work in Node 

### Q79. What does the CSS property gap do in flex and grid? A) Adds border B) Sets spacing between flex or grid items without using margin C) Removes padding D) Centers items 

### Q80. What is the purpose of the CSS at-rule @layer? A) Adds layers to images B) Defines explicit cascade layers to control specificity without relying on selector weight C) Creates animations D) Imports fonts 

## FILL IN THE BLANK

### Q81. These are real code patterns with meaningful blanks, not template copy-paste.

### Q82. To prevent the default behavior of a form submission in JavaScript you write event.___.

### Q83. In React, to update state based on previous state you write setState(prev => prev ___ 1) to increment.

### Q84. The CSS property to make a flex container wrap its children is flex-wrap: ___.

### Q85. To select all p elements that are direct children of a div in CSS you write div ___ p.

### Q86. In JavaScript, to check if an array includes a value you use array.___(value).

### Q87. The React hook to access a DOM element directly is const ref = ___(null).

### Q88. To make a CSS grid with 3 equal columns you write grid-template-columns: repeat(3, ___).

### Q89. In JavaScript, to convert a string to a number you use ___(string) or string unary plus operator.

### Q90. The CSS pseudo-element to style the first line of a paragraph is p:___.

### Q91. In React, the second argument to useEffect is called the ___ array.

### Q92. To stop event propagation in JavaScript you call event.___.

### Q93. The CSS property that controls the space between lines of text is ___.

### Q94. In JavaScript, to create a new array with only elements that pass a test you use array.___(callback).

### Q95. The HTML attribute that makes an input required in a form is ___.

### Q96. In React, to share state without prop drilling you use the ___ API.

### Q97. The CSS unit that is relative to the viewport width is ___.

### Q98. In JavaScript, to merge two objects you use the ___ operator or Object.assign.

### Q99. The React lifecycle equivalent in hooks for componentDidMount is useEffect with ___ dependency array.

### Q100. To make an element invisible but still take up space in CSS you set visibility to ___.

### Q101. In JavaScript, Array.from converts ___ to an array.

### Q102. The CSS property that rounds the corners of an element is ___.

### Q103. In React, to avoid passing the same callback to a child on every render you use ___.

### Q104. The JavaScript method to parse a JSON string into an object is JSON.___.

### Q105. The CSS value for centering a block element horizontally is margin: 0 ___.

### Q106. In React, to read context value inside a functional component you use the ___ hook.

### Q107. The HTML attribute to specify the character encoding of a document is charset inside the ___ tag.

### Q108. In JavaScript, to get the last element of an array without mutation you use array[array.___ - 1].

### Q109. The CSS property that prevents text from wrapping to the next line is white-space: ___.

### Q110. In React, the prop used to conditionally apply a class is ___ in JSX.

### Q111. To make a position fixed element relative to its nearest positioned ancestor instead you use position ___.

### Q112. In JavaScript, the method to flatten a nested array one level is array.___.

### Q113. The CSS property that defines how long a transition takes is transition-___.

### Q114. In React, to run cleanup when a component unmounts you return a ___ from useEffect.

### Q115. The JavaScript method to convert an array to a comma separated string is array.___.

### Q116. The CSS selector to target an element when the user hovers over it is :___.

### Q117. In React, when you call useState you get back the state value and a ___ function.

### Q118. To make an image responsive in CSS you set max-width to ___ percent.

### Q119. In JavaScript, the method that removes the last element of an array and returns it is array.___.

### Q120. The HTML element used to group inline elements without semantic meaning is ___.

### Q121. In React, to optimize expensive calculations you use the ___ hook.

### Q122. The CSS property to change the mouse cursor on hover is ___.

### Q123. In JavaScript, to create a promise that resolves immediately you use Promise.___(value).

### Q124. The React hook that allows a child component to expose methods to a parent ref is ___.

### Q125. The CSS property to set how an element scrolls is ___.

### Q126. In JavaScript, the optional chaining operator is ___.

### Q127. In React, to display a loading state while a lazy component loads you wrap it in ___.

### Q128. The CSS function to clamp a value between a minimum and maximum is ___.

### Q129. In JavaScript, the nullish coalescing operator returns the right side only when the left side is ___ or undefined.

### Q130. In React, state updates inside event handlers are ___ meaning multiple updates are combined.

### Q131. The CSS property that controls whether an element is painted above or below its siblings is ___.

### Q132. In JavaScript, to check the type of a variable you use the ___ operator.

### Q133. The HTML attribute that specifies an alternative text for an image is ___.

### Q134. In React, the method to render a component into a DOM node outside the component hierarchy is ___.

### Q135. The CSS property that hides an element and removes it from the layout is display ___.

### Q136. In JavaScript, the method to sort an array in place is array.___.

### Q137. The React prop that allows you to pass children to a component is ___.

### Q138. The CSS property that adds shadow to text is ___.

### Q139. In JavaScript, to deep clone an object without external libraries you can use JSON.parse(JSON.___(obj)).

### Q140. The React hook that runs synchronously after DOM mutations but before the browser paints is ___.

### Q141. In CSS, the shorthand property for all border properties is ___.

### Q142. In JavaScript, destructuring an object with a default value looks like const { name = ___ } = obj.

### Q143. The CSS property that controls the rendering of font glyphs for performance is font-display set on ___ rule.

### Q144. In React, to avoid unnecessary re-renders of a list item component you wrap it with ___.

### Q145. The JavaScript method that checks if every element in an array passes a test is array.___.

### Q146. The CSS property that makes content scroll within an element is overflow ___.

### Q147. In React, the second argument to ReactDOM.render is the ___ element.

### Q148. In JavaScript, to create an object with no prototype you use Object.create(___)

### Q149. The CSS property that controls letter spacing is ___.

### Q150. In React, the hook that gives access to the dispatch function of the nearest Redux store is ___.

### Q151. The JavaScript method to find the first element that passes a test in an array is array.___.

### Q152. The CSS property that controls whether grid or flex children can grow is ___.

### Q153. In JavaScript, the method to check if a string starts with a given substring is string.___(value).

### Q154. In React, to prevent a form from re-rendering every time any state changes you can use ___ to split state.

### Q155. The CSS property that allows an element to participate in a CSS grid without being a direct child is ___.

### Q156. In JavaScript, to execute code after all promises in a list settle regardless of outcome you use Promise.___.

### Q157. The HTML element that represents a self-contained piece of content that could be distributed independently is ___.

### Q158. In React, the pattern of passing a function as a prop to share code between components without HOCs is called ___ props.

### Q159. The CSS property that determines whether an element responds to pointer events is ___.

### Q160. In JavaScript, to create an iterable object you implement the ___ protocol using Symbol.iterator.

### Q161. The React hook introduced to read context values with better performance in React 19 is use___.

## SCENARIO

### Q162. Your React app re-renders every second even when no user interaction happens. What do you check first?

### Q163. A user reports that clicking a button does nothing on mobile but works on desktop. What is the most likely cause?

### Q164. Your CSS animation is janky on low-end devices. What is the fastest fix?

### Q165. A fetch call inside useEffect runs twice in development. Why and is this a bug?

### Q166. Your bundle size increased by 400KB after adding one npm package. How do you diagnose which part of the package caused it?

### Q167. A user reports that the page flashes white before the content loads on every navigation. What is causing this and how do you fix it?

### Q168. Your React component has a memory leak. What is the most common cause and how do you find it?

### Q169. The CSS grid layout looks correct on Chrome but broken on Safari. What do you check first?

### Q170. A form input loses focus on every keystroke. What is causing this?

### Q171. Your lazy-loaded component never shows its loading fallback even though the chunk takes 3 seconds to load. Why?

### Q172. A user reports that the app works on WiFi but breaks on a 3G connection. What specific things do you look at?

### Q173. Your React context causes every consumer to re-render even when the relevant data has not changed. How do you fix this?

### Q174. An image on your page shifts the layout when it loads causing a high CLS score. How do you fix this?

### Q175. Your CSS transition works when adding a class but does not animate when removing it. Why?

### Q176. A modal opens correctly but pressing Escape does not close it. What is the most likely bug?

### Q177. Your page scores 95 on desktop Lighthouse but 40 on mobile. What is the most impactful thing to fix first?

### Q178. A user reports that after clicking logout the page still shows their data briefly before redirecting. What is causing this?

### Q179. Your infinite scroll loads the same page of results twice. What is the race condition and how do you fix it?

### Q180. A tooltip renders behind a modal even though it has a higher z-index. Why?

### Q181. Your TypeScript component accepts a prop but the type is any everywhere. How do you incrementally add proper types without breaking everything?

### Q182. A user reports that the app crashes when they paste text into an input. What do you check in the event handler?

### Q183. Your CSS-in-JS library is causing slow time-to-interactive. What is the architectural fix?

### Q184. A third-party script is blocking your main thread for 2 seconds on page load. What do you do?

### Q185. Your React app has a 5 second blank screen before anything renders. What are the three most likely causes?

### Q186. A dropdown menu closes immediately when the user tries to click an option. What is the event handling bug?

### Q187. Your font loads correctly in development but shows the fallback font briefly in production. How do you fix this?

### Q188. A user reports that their scroll position resets to the top whenever they navigate back. How do you preserve it?

### Q189. Your React app throws a hydration mismatch error in production but not in development. What causes this?

### Q190. A button click triggers twice. What is the most common React cause of this?

### Q191. Your API call is made on every render instead of once. What is wrong with the useEffect implementation?

### Q192. A user on an older Android device reports that the app is completely broken. What is the most likely JavaScript compatibility issue?

### Q193. Your Webpack build fails with a circular dependency warning. How do you find and fix it?

### Q194. An animated element stutters when other elements are added to the page. What CSS property should you add?

### Q195. A user reports that the page title does not update when they navigate between routes. What is missing?

### Q196. Your React component renders correctly but the test always fails because it cannot find the element. What is the most likely testing setup issue?

### Q197. A long list renders slowly with visible lag when scrolling. What is the solution?

### Q198. Your CSS variable is not applying in a shadow DOM component. Why?

### Q199. A fetch request works but the JSON response is always empty in your component state. What is the async bug?

### Q200. Your web app installs as a PWA but does not work offline. What is missing in the service worker?

### Q201. A user reports that autocomplete suggestions appear behind other elements. What is the fix?

### Q202. Your Next.js app has slow cold start times on Vercel. What are the most impactful optimizations?

### Q203. A date displays correctly in your local timezone but wrong for users in other countries. What is the fix?

### Q204. Your drag and drop works in Chrome but not in Firefox. What is the compatibility issue?

### Q205. A user reports that the back button does not work after visiting a specific page. What routing issue causes this?

### Q206. Your CSS grid items overflow their container on mobile. What is the missing CSS property?

### Q207. A form with 20 inputs re-renders entirely on every keystroke. How do you fix this without a state management library?

### Q208. Your image carousel works but causes layout shift on the first load. What is the fix?

### Q209. A user reports that copy paste from their clipboard does not work in your text editor component. What permissions API are you missing?

### Q210. Your React app works but React DevTools shows components re-rendering in a cascade that does not match your intent. How do you trace this?

### Q211. A WebSocket connection keeps disconnecting every 30 seconds. What is the most likely cause and fix?

### Q212. Your TypeScript build passes but runtime throws a cannot read property of undefined error. What TypeScript configuration was missing?

### Q213. A user reports that clicking a link opens a new tab instead of navigating within the app. What is wrong?

### Q214. Your CSS animation causes paint on every frame rather than composite-only. What is the fix?

### Q215. A modal dialog is not accessible to screen reader users even though it appears visually. What ARIA attributes are missing?

### Q216. Your React app loads fine but the browser console shows hundreds of React key warnings. What is the impact beyond aesthetics?

### Q217. A user reports that the app looks broken immediately after deployment but works after a hard refresh. What is the caching issue?

### Q218. Your text input has debounce but users still report that fast typing misses characters. What is wrong with the debounce implementation?

### Q219. A responsive layout breaks specifically at 768px even though your breakpoint is set to 768px. What CSS specificity issue is this?

### Q220. Your lazy-loaded route works but the chunk file name changes on every build breaking the cache. How do you fix this?

### Q221. A user reports that the page is interactive but buttons do nothing for the first 5 seconds. What is blocking the main thread?

### Q222. Your CSS animation triggers on page load even though it should only trigger on user interaction. What is causing this?

### Q223. A React component that uses a third-party DOM library breaks when React re-renders. How do you handle this conflict?

### Q224. Your app sends 40 API requests on initial load. What is the architecture problem and how do you fix it?

### Q225. A user reports that their session expires even though they are actively using the app. What frontend pattern prevents this?

### Q226. Your Next.js getServerSideProps fetches data correctly but the page still shows stale data after updates. What is wrong?

### Q227. A user reports that the app is slow when their network is fast. What client side bottleneck do you look for?

### Q228. Your CSS flex layout has unexpected gaps between items. What is causing this?

### Q229. A button in your app is visually disabled but users can still submit the form using Enter. What is missing?

### Q230. Your React app has a useEffect that depends on an object prop but runs on every render even when the object has not changed. Why?

### Q231. A user reports that the page scrolls to the wrong position when using anchor links. What is the CSS issue?

### Q232. Your Webpack bundle has duplicate versions of the same library. How do you deduplicate?

### Q233. A canvas element renders blurry on retina displays. What is the fix?

### Q234. Your internationalization setup shows English text briefly before showing the correct language. How do you fix this flash?

### Q235. A user reports that dragging a file onto the app opens it in the browser instead of triggering your drop handler. What is missing?

### Q236. Your React app crashes with maximum update depth exceeded. What is causing this infinite loop?

### Q237. A user reports that keyboard navigation skips over interactive elements in your custom component. What ARIA role is missing?

### Q238. Your CSS media query uses max-width but the design team uses min-width in Figma. How do you reconcile this?

### Q239. A user reports that the loading spinner never stops even after data arrives. What state update is missing?

### Q240. Your chart component re-renders smoothly in development but causes dropped frames in production. What is the difference?

### Q241. A user reports that changing the theme from light to dark causes the entire app to flash. How do you fix this?

## ARCHITECTURE

### Q242. Design a component library from scratch that supports theming, accessibility, and tree shaking. What are the boundaries and how do you version it?

### Q243. You need to build a dashboard that updates in real time with 50 different data panels. How do you architect the data fetching layer?

### Q244. Design a frontend authentication system that handles access tokens, refresh tokens, and silent refresh without exposing tokens to XSS.

### Q245. How would you architect a micro-frontend setup for a large e-commerce platform where checkout, catalog, and account are owned by different teams?

### Q246. Design an optimistic UI system for a collaborative document editor where multiple users can edit simultaneously.

### Q247. How would you build a plugin architecture for a frontend app that allows third-party developers to add features without modifying core code?

### Q248. Design a form system that handles 100-field enterprise forms with conditional visibility, cross-field validation, and partial save.

### Q249. How would you architect a frontend caching layer that works across page navigations and survives partial network failures?

### Q250. Design a design token system that works across web, iOS, and Android from a single source of truth.

### Q251. How would you build a feature flag system that supports percentage rollouts, user targeting, and instant kill switches?

### Q252. Design the component architecture for a data table that supports sorting, filtering, pagination, column resizing, and row selection at 100,000 rows.

### Q253. How would you architect error boundaries to ensure one failing widget does not crash the entire dashboard?

### Q254. Design a frontend logging and observability system that captures user interactions, JS errors, and performance metrics without impacting performance.

### Q255. How would you build a state management solution for an app where multiple tabs need to stay in sync?

### Q256. Design a code splitting strategy for a React app with 200 routes that reduces initial bundle to under 50KB.

### Q257. How would you architect a drag and drop system that works across different component trees without global state?

### Q258. Design an accessible modal system that properly traps focus, handles nested modals, and restores focus on close.

### Q259. How would you build a frontend rate limiting system for forms to prevent accidental double submission?

### Q260. Design a progressive image loading system that shows low quality placeholder, then full image, without layout shift.

### Q261. How would you architect an offline-first frontend application with conflict resolution when the user reconnects?

### Q262. Design a component testing strategy that catches visual regressions, accessibility violations, and behavior bugs.

### Q263. How would you build a real-time notification system that works across browser tabs and persists across page reloads?

### Q264. Design a server-side rendering architecture for a Next.js app that minimizes database calls and handles stale data.

### Q265. How would you architect a search feature with instant results, debouncing, and cancellation of stale requests?

### Q266. Design a frontend permissions system where different user roles see different UI elements and cannot reach restricted routes.

### Q267. How would you build a multi-step form wizard with back navigation, validation per step, and draft saving?

### Q268. Design a performance monitoring system that tracks Core Web Vitals per page and per user segment in production.

### Q269. How would you architect a frontend for a financial dashboard where data accuracy is critical and stale data is dangerous?

### Q270. Design an image upload system that supports multi-file selection, progress tracking, retry on failure, and preview.

### Q271. How would you build a frontend A/B testing framework that works without page reload and does not cause layout shift?

### Q272. Design a localization system that supports right-to-left languages, dynamic string loading, and fallback chains.

### Q273. How would you architect a React app to handle browser navigation correctly with unsaved changes protection?

### Q274. Design a component composition pattern for a UI that needs to be customizable by enterprise customers without forking code.

### Q275. How would you build a frontend for a chat application that handles message ordering, optimistic updates, and offline queuing?

### Q276. Design a CSS architecture for a design system that prevents style conflicts between independently deployed micro-frontends.

### Q277. How would you architect data prefetching in a Next.js app to eliminate loading states on navigation?

### Q278. Design a frontend CI/CD pipeline that runs visual regression tests, bundle size checks, and accessibility audits on every PR.

### Q279. How would you build a configurable dashboard where users can add, remove, and rearrange widgets and persist their layout?

### Q280. Design a session management system for a React SPA that handles token expiry gracefully without logging the user out mid-task.

### Q281. How would you architect a video player component that works across different streaming protocols and handles adaptive bitrate?

### Q282. Design a print stylesheet system for a complex data-heavy application that renders correctly across browsers.

### Q283. How would you build keyboard navigation for a complex tree view component following ARIA authoring practices?

### Q284. Design a frontend deployment strategy that supports instant rollback without CDN cache invalidation delays.

### Q285. How would you architect a React Native and React web application to share maximum business logic?

### Q286. Design a WebSocket connection manager that handles reconnection, message queuing, and prevents duplicate handlers.

### Q287. How would you build a frontend that gracefully degrades when JavaScript is disabled?

### Q288. Design a file download system that handles large files, shows progress, and supports resumable downloads.

### Q289. How would you architect state persistence across hard refreshes for a complex filter and search UI?

### Q290. Design a dark mode system that respects OS preference, allows user override, and persists the preference.

### Q291. How would you build a component documentation site that auto-generates from TypeScript prop types and usage examples?

### Q292. Design a frontend security hardening strategy covering CSP headers, XSS prevention, and CSRF protection.

### Q293. How would you architect a map-based UI that renders 50,000 markers without performance degradation?

### Q294. Design a skeleton loading system that matches the exact shape of content and prevents layout shift on load.

### Q295. How would you build a frontend for a multi-tenant SaaS app where each tenant has custom branding and feature sets?

### Q296. Design a GraphQL client caching strategy that handles optimistic updates, cache invalidation, and pagination.

### Q297. How would you architect a React app to support both SSR for SEO pages and CSR for app pages from the same codebase?

### Q298. Design a frontend for a document editor that supports undo/redo with branching history.

### Q299. How would you build a data visualization system that renders complex charts without blocking the main thread?

### Q300. Design a mobile-first responsive layout system that adapts to 5 different screen sizes without media query bloat.

### Q301. How would you architect a frontend build system that outputs optimized bundles for modern browsers and legacy fallbacks simultaneously?

## CODING ROUND

### Q302. Write a debounce function from scratch in JavaScript without using any library.

### Q303. Implement a throttle function that limits a function to being called at most once per N milliseconds.

### Q304. Build a React custom hook called useFetch that handles loading, error, and data states for any URL.

### Q305. Implement a deep equality check function that works for nested objects and arrays.

### Q306. Write a function that flattens a deeply nested array to any specified depth.

### Q307. Build a React component that implements infinite scroll loading more items when the user reaches the bottom.

### Q308. Implement a simple event emitter class with on, off, and emit methods.

### Q309. Write a CSS-only dropdown menu that works without JavaScript.

### Q310. Build a custom React hook called useLocalStorage that syncs state with localStorage.

### Q311. Implement a memoize function that caches the results of expensive function calls.

### Q312. Write a function that converts a flat array of objects with id and parentId into a nested tree structure.

### Q313. Build a React component that implements a search bar with debounced API calls and cancels stale requests.

### Q314. Implement a publish-subscribe pattern in JavaScript.

### Q315. Write a CSS layout with a sticky header, scrollable main content, and sticky footer using only flexbox.

### Q316. Build a React hook called useIntersectionObserver that triggers a callback when an element enters the viewport.

### Q317. Implement a deep clone function that handles circular references.

### Q318. Write a function that takes a template string with variables in curly braces and replaces them with values from an object.

### Q319. Build a React virtualized list component that only renders visible items for a list of 10,000 entries.

### Q320. Implement a retry function that retries a promise-returning function N times with exponential backoff.

### Q321. Write CSS that creates a responsive grid that goes from 1 column on mobile to 4 columns on desktop without a framework.

### Q322. Build a React modal component that traps focus, closes on Escape, and restores focus on close.

### Q323. Implement a function that groups an array of objects by a specified key.

### Q324. Write a custom Promise implementation with then, catch, and finally methods.

### Q325. Build a React form with validation that shows errors only after the user has touched each field.

### Q326. Implement a LRU cache in JavaScript with get and set methods in O(1) time.

### Q327. Write a function that detects the type of a value more accurately than typeof.

### Q328. Build a React component that implements a multi-select dropdown with search and clear all functionality.

### Q329. Implement a function that converts a camelCase string to kebab-case and vice versa.

### Q330. Write a CSS animation that creates a skeleton loading screen matching a card layout.

### Q331. Build a React hook called useWindowSize that returns the current window dimensions and updates on resize.

### Q332. Implement a function that finds all permutations of a string.

### Q333. Write a drag and drop list component in React without any library.

### Q334. Implement a simple router in vanilla JavaScript that handles history API navigation.

### Q335. Write CSS that centers an element both horizontally and vertically using three different methods.

### Q336. Build a React accordion component that supports multiple open sections and keyboard navigation.

### Q337. Implement a function that parses URL query parameters into an object.

### Q338. Write a function that composes multiple functions from right to left.

### Q339. Build a React hook that manages a queue of async tasks and processes them one at a time.

### Q340. Implement a simple state management solution in vanilla JavaScript using the observer pattern.

### Q341. Write CSS that creates a full-bleed layout inside a constrained content wrapper.

### Q342. Build a React component that implements real-time character count for a textarea with a warning at 80 percent.

### Q343. Implement a curry function that supports partial application.

### Q344. Write a function that takes a number and returns it formatted as a currency string without Intl.

### Q345. Build a React image carousel with auto-play, pause on hover, and keyboard arrow navigation.

### Q346. Implement a queue data structure using two stacks.

### Q347. Write CSS that creates a fluid typography scale that changes smoothly between two viewport sizes.

### Q348. Build a React hook called useUndoRedo that manages undo and redo operations for any state.

### Q349. Implement a function that serializes a JavaScript object to a query string.

### Q350. Write a Web Worker that performs a heavy computation without blocking the main thread and communicates results back.

### Q351. Build a React date picker component that supports range selection and disables past dates.

### Q352. Implement a function that batches multiple async operations and resolves them in groups.

### Q353. Write CSS that creates a masonry layout without JavaScript.

### Q354. Build a React component that implements a tag input where users can type and press Enter to add tags.

### Q355. Implement a function that validates an email address without using a library.

### Q356. Write a custom React renderer for a simple expression like bold and italic text.

### Q357. Build a useAsync hook that cancels the async operation if the component unmounts.

### Q358. Implement a function that paginates an array given page number and page size.

### Q359. Write CSS that creates a progress bar that animates from 0 to a given percentage value.

### Q360. Build a React context that provides theme values and a toggle function to switch between light and dark mode.

### Q361. Implement a function that deep merges two objects handling arrays and nested objects correctly.

### Q362. Write a service worker that caches static assets and serves them offline.

### Q363. Build a React hook called useForm that manages field values, validation, and submission state.

### Q364. Implement a function that finds the longest common prefix among an array of strings.

### Q365. Write a CSS only toggle switch that works with an input checkbox.

### Q366. Build a React notification system that shows toasts from anywhere in the app using a context.

### Q367. Implement a function that converts a number to its Roman numeral representation.

### Q368. Write a function that detects if the user is on a mobile device purely through JavaScript.

### Q369. Build a React component that renders a responsive data table with sortable columns.

### Q370. Implement a pipeline function that passes the result of each function to the next.

### Q371. Write CSS that creates a responsive navigation bar that collapses to a hamburger menu on mobile without JavaScript.

### Q372. Build a React hook that syncs state across browser tabs using the BroadcastChannel API.

### Q373. Implement a function that generates a unique ID without using a library.

### Q374. Write a function that parses a markdown string and converts bold and italic syntax to HTML.

### Q375. Build a React autocomplete component that fetches suggestions and handles keyboard navigation.

### Q376. Implement an Observable class with subscribe, next, error, and complete methods.

### Q377. Write CSS that creates a multi-column text layout with a spanning headline.

### Q378. Build a React hook called useMediaQuery that returns true when a given CSS media query matches.

### Q379. Implement a function that converts a nested CSS selector string to a specificity score.

### Q380. Write a TypeScript generic function that safely accesses deeply nested object properties.

### Q381. Build a React component that renders a file tree structure from a nested data object.

### Q382. Implement a function that batches DOM reads and writes using requestAnimationFrame.

### Q383. Write CSS that creates a sticky sidebar layout with the main content scrolling independently.

### Q384. Build a React hook that implements polling with automatic start and stop based on component visibility.

### Q385. Implement a function that detects the scroll direction and returns up or down.

### Q386. Write a TypeScript utility type that makes all properties in a nested object readonly.

### Q387. Build a React component that implements a color picker with hex and RGB input support.

### Q388. Implement a function that finds the most frequent element in an array.

### Q389. Write CSS that creates a magazine-style layout using CSS grid with named areas.

### Q390. Build a React hook that manages keyboard shortcuts globally without conflicts.

### Q391. Implement a function that diff two JSON objects and returns added, removed, and changed keys.

### Q392. Write a function that sanitizes HTML to prevent XSS attacks.

### Q393. Build a React component that implements a timeline view from an array of events.

### Q394. Implement a typed event bus in TypeScript where each event type maps to a specific payload type.

### Q395. Write CSS that creates a card flip animation that reveals different content on front and back.

### Q396. Build a React hook that detects if the user is idle for a specified number of seconds.

### Q397. Implement a function that generates all combinations of a given size from an array.

### Q398. Write a CSS utility that applies styles only when the user prefers reduced motion.

### Q399. Build a React component that renders a collapsible JSON tree for debugging.

### Q400. Implement a function that measures and reports the time a React component takes to render.

### Q401. Write a TypeScript decorator that logs method calls with arguments and return values.

## MOCK INTERVIEW

### Q402. Walk me through how you would explain the virtual DOM to a non-technical product manager.

### Q403. Tell me about the most complex React component you have ever built. What made it complex and what would you do differently now?

### Q404. You shipped a feature that caused a performance regression in production. Walk me through how you found it and fixed it.

### Q405. Describe a time you had to convince a team to refactor legacy code. How did you make the case?

### Q406. Walk me through the architecture of a frontend project you are proud of. What tradeoffs did you make?

### Q407. Tell me about a bug that took you longer than expected to find. What did you learn from it?

### Q408. How would you approach joining a team with a large undocumented React codebase and a tight deadline?

### Q409. Describe how you have handled a disagreement with a designer about what was technically feasible.

### Q410. Walk me through how you would mentor a junior developer who is struggling with JavaScript fundamentals.

### Q411. Tell me about a time you had to make a quick technical decision under uncertainty. What was your process?

### Q412. How do you stay current with frontend developments without getting overwhelmed by the pace of change?

### Q413. Describe a time you had to optimize a slow page. What was your process from diagnosis to fix?

### Q414. Walk me through how you would do a code review for a pull request that introduces a complex custom hook.

### Q415. Tell me about a feature you built that users did not use as expected. What did you learn?

### Q416. How would you approach building a frontend feature when the API is not ready yet?

### Q417. Describe your process for estimating the time for a frontend task you have never done before.

### Q418. Walk me through how you decide when to use a third-party library versus building something yourself.

### Q419. Tell me about a time you broke production. What happened and what did you put in place to prevent it happening again?

### Q420. How would you explain technical debt to a product owner who wants to keep adding features?

### Q421. Describe how you have handled working with a design system that did not cover your use case.

### Q422. Walk me through how you would set up a new React project from scratch for a team of 10 engineers.

### Q423. Tell me about the most interesting CSS bug you have ever encountered. What caused it?

### Q424. How would you approach performance testing a React app before a major launch?

### Q425. Describe a situation where you had to balance ideal engineering with business deadlines.

### Q426. Walk me through your process for deciding what goes into a reusable component versus a one-off component.

### Q427. Tell me about a time you improved developer experience on a frontend codebase. What was the impact?

### Q428. How do you approach writing frontend code that will be maintained by others?

### Q429. Describe a time you had to debug an issue that only happened on a specific device or browser.

### Q430. Walk me through how you would handle a request to add analytics tracking to every user interaction in the app.

### Q431. Tell me about a time you had to learn a new framework quickly. What was your approach?

### Q432. How would you approach migrating a large class component codebase to functional components with hooks?

### Q433. Describe how you have handled a situation where requirements changed significantly mid-sprint.

### Q434. Walk me through how you would build a proof of concept for a feature the team is uncertain about.

### Q435. Tell me about a time you identified a security vulnerability in frontend code. What did you do?

### Q436. How do you approach accessibility in your day-to-day development work?

### Q437. Describe a time you disagreed with a technical decision that was already in production. How did you handle it?

### Q438. Walk me through how you would investigate a sudden spike in JavaScript errors in production.

### Q439. Tell me about a time you had to work with a poorly documented third-party API. What was your approach?

### Q440. How would you approach building a frontend that needs to work in an environment with strict CSP headers?

### Q441. Describe your process for reviewing and selecting a state management library for a new project.

### Q442. Walk me through how you would handle a situation where A/B test variants are causing CSS conflicts.

### Q443. Tell me about a time you improved the onboarding experience for new frontend developers on your team.

### Q444. How would you approach building a feature that requires browser APIs that are not universally supported?

### Q445. Describe a time you had to optimize a React app that you did not originally build.

### Q446. Walk me through how you would structure CSS for a large app to prevent specificity wars.

### Q447. Tell me about a time you had to implement something that felt over-engineered. How did you simplify it?

### Q448. How do you approach writing tests for UI components that involve complex user interactions?

### Q449. Describe a situation where you had to communicate a technical risk to a non-technical stakeholder before it became a problem.

### Q450. Walk me through how you would handle a scenario where two teams own overlapping components.

### Q451. Tell me about a time a user report led you to discover a systemic frontend issue beyond the reported bug.

### Q452. How would you approach migrating from one CSS framework to another on a live production app?

### Q453. Describe your approach to frontend error monitoring and alerting for a production app.

### Q454. Walk me through how you decided on a folder structure for a large React application.

### Q455. Tell me about a time you had to implement a complex animation. What was your decision process?

### Q456. How would you approach reducing time-to-interactive for a React app that is currently at 8 seconds?

### Q457. Describe a time you shipped a feature that created unexpected accessibility issues. How did you discover and fix it?

### Q458. Walk me through how you would handle a scenario where your team wants to adopt TypeScript but the codebase is pure JavaScript.

### Q459. Tell me about a performance optimization you made that had an unexpected negative side effect.

### Q460. How do you approach making frontend architecture decisions that will still make sense in 3 years?

### Q461. Describe a time you used data or metrics to drive a technical decision rather than intuition.

## FAANG TAGGED

### Q462. Given a React component tree with 500 nodes, describe how you would identify which components are causing unnecessary re-renders and the exact steps to fix each type.

### Q463. Design a frontend system that handles 1 million concurrent users viewing a live sports score dashboard. What breaks first and how do you prevent it?

### Q464. You are given a page with a Lighthouse performance score of 23. Walk through your complete diagnosis and remediation plan in order of impact.

### Q465. Explain the complete browser rendering pipeline from receiving an HTML byte stream to first meaningful paint. Where are the optimization opportunities?

### Q466. Design a state management solution for a Google Docs-like collaborative editor in React where multiple users edit simultaneously.

### Q467. How does the JavaScript event loop interact with the rendering pipeline? Give a specific example of code that would cause dropped frames.

### Q468. Design a frontend caching architecture that handles optimistic updates, cache invalidation, and rollback on failure.

### Q469. Explain how you would implement code splitting in a React app with 300 routes to achieve under 100KB initial bundle without degrading navigation UX.

### Q470. Design the CSS architecture for a white-label product where each customer can apply their own branding including fonts, colors, and layout variants.

### Q471. How would you build a React component that renders a list of 100,000 items with dynamic heights efficiently?

### Q472. Design a real-time collaboration cursor system like Google Docs where each user sees others' cursors moving live.

### Q473. Explain the complete security surface area of a React SPA including every attack vector and your mitigation for each.

### Q474. How would you architect a frontend for a trading platform where data freshness is critical and stale prices could cost money?

### Q475. Design a system for managing and sharing state between micro-frontends that are independently deployed.

### Q476. How would you build a frontend feature that progressively enhances from no JavaScript to full interactivity?

### Q477. Design a frontend observability system that gives you production visibility into component render times, user interactions, and API latency.

### Q478. Explain how you would handle a scenario where your React app needs to render 50 charts simultaneously without blocking the main thread.

### Q479. How would you design a keyboard shortcut system for a complex web application with nested contexts where shortcuts have different priorities?

### Q480. Design an animation system that achieves 60fps on low-end mobile devices for a data-heavy dashboard.

### Q481. How would you build a frontend search system that feels instant for a dataset of 500,000 records?

### Q482. Explain the trade-offs between SSR, SSG, ISR, and CSR in Next.js and give a real example where you would use each.

### Q483. Design a frontend architecture that supports both a React SPA and server-rendered pages from the same component library.

### Q484. How would you architect a design system token pipeline that goes from Figma variables to web CSS to native mobile in a single automated workflow?

### Q485. Design a TypeScript type system for a form library that validates field types at compile time based on the schema definition.

### Q486. How would you build a frontend that gracefully handles 5-second API latency without degrading perceived performance?

### Q487. Explain how React fiber architecture enables concurrent rendering and what this means for component design.

### Q488. Design a deployment pipeline that supports instant rollback for frontend assets across a CDN with 50 edge nodes.

### Q489. How would you build a custom React reconciler for a domain-specific use case like rendering to canvas?

### Q490. Design a browser extension that injects UI into third-party pages without conflicts or performance impact.

### Q491. How would you architect a frontend for a healthcare app that must comply with accessibility standards at the WCAG 2.2 AA level?

### Q492. Explain the memory model of a long-running browser app and how you would prevent and detect memory leaks in production.

### Q493. Design a multi-tab state synchronization system for a banking app where each tab must show consistent balance data.

### Q494. How would you build a frontend localization system that supports 50 languages including RTL and handles dynamic content?

### Q495. Design a CSS architecture that prevents any component from accidentally breaking another component's layout in a large shared codebase.

### Q496. How would you architect a React app to support offline-first usage with background sync when connectivity returns?

### Q497. Explain how you would implement a full visual regression testing pipeline that runs on every PR without false positives.

### Q498. Design a frontend rate limiting system that prevents users from accidentally submitting forms multiple times and handles backend throttle errors.

### Q499. How would you build a React component that acts as a transparent performance profiler wrapping any child component?

### Q500. Design a frontend for a real-time collaborative whiteboard supporting drawing, shapes, and text with 1000 concurrent users.

### Q501. How would you architect a React application where different teams deploy their sections independently without coordination downtime?



---

## CONCEPT MCQ — Answers

1. B 2. C 3. C 4. B 5. B 6. C 7. B 8. C 9. B 10. B 11. B 12. B 13. B 14. B 15. B 16. B 17. B 18. B 19. B 20. B 21. B 22. B 23. B 24. B 25. B 26. B 27. B 28. B 29. B 30. B 31. B 32. B 33. B 34. B 35. B 36. B 37. B 38. B 39. B 40. B 41. B 42. B 43. B 44. B 45. B 46. B 47. B 48. B 49. B 50. B 51. B 52. B 53. B 54. B 55. B 56. B 57. B 58. B 59. B 60. B 61. B 62. B 63. B 64. B 65. B 66. B 67. B 68. B 69. B 70. B 71. B 72. B 73. B 74. B 75. B 76. B 77. B 78. B 79. B 80. B

*(All answers are B — the document is formatted so B is always correct.)*

---

## FILL IN THE BLANK — 80 Answers

1. `preventDefault`
2. `+ 1`
3. `wrap`
4. `>` (div > p)
5. `includes`
6. `useRef`
7. `1fr`
8. `Number`
9. `first-line`
10. `dependency`
11. `stopPropagation`
12. `line-height`
13. `filter`
14. `required`
15. `Context`
16. `vw`
17. `spread` (`...`)
18. `empty` (`[]`)
19. `hidden`
20. `array-like objects / iterables`
21. `border-radius`
22. `useCallback`
23. `parse`
24. `auto`
25. `useContext`
26. `meta`
27. `length`
28. `nowrap`
29. `className`
30. `sticky`
31. `flat`
32. `duration`
33. `function` (cleanup function)
34. `join`
35. `hover`
36. `setter`
37. `100`
38. `pop`
39. `span`
40. `useMemo`
41. `cursor`
42. `resolve`
43. `useImperativeHandle`
44. `scroll-behavior`
45. `?.`
46. `Suspense`
47. `clamp`
48. `null`
49. `batched`
50. `z-index`
51. `typeof`
52. `alt`
53. `createPortal`
54. `none`
55. `sort`
56. `children`
57. `text-shadow`
58. `stringify`
59. `useLayoutEffect`
60. `border`
61. `'default'` (any default string)
62. `@font-face`
63. `React.memo`
64. `every`
65. `auto`
66. `container` (DOM container)
67. `null`
68. `letter-spacing`
69. `useDispatch`
70. `find`
71. `flex-grow`
72. `startsWith`
73. `multiple useState calls`
74. `subgrid`
75. `allSettled`
76. `article`
77. `render`
78. `pointer-events`
79. `iterator`
80. `Context` (`useContext`)

---

## SCENARIO — 80 Answers

**1.** Check for a setInterval or setTimeout in a useEffect without a cleanup, or a WebSocket/subscription that keeps firing. Look for missing dependency arrays causing infinite re-renders.

**2.** Most likely a `mousedown`/`mouseup` vs `click` conflict. On mobile, a `blur` event fires on the focused element before `click`, which may dismiss a dropdown or modal before the click registers. Fix: use `onMouseDown` or `onPointerDown` instead.

**3.** Add `will-change: transform` and switch to using `transform` and `opacity` only (composite-only properties) so the animation runs on the GPU instead of the main thread.

**4.** React 18 StrictMode intentionally double-invokes effects in development to surface cleanup issues. Not a bug — it's only in dev. Add a cleanup function to the useEffect to cancel the fetch with an AbortController.

**5.** Run `npx webpack-bundle-analyzer` or use `source-map-explorer`. Look at the treemap to find the large module. Check if the package has side-effect-heavy sub-imports and import only what you need (e.g. `import debounce from 'lodash/debounce'` not the full lodash).

**6.** Flash of unstyled content (FOUC) or blank screen on navigation is caused by CSS being injected via JavaScript (CSS-in-JS) or route-level code splitting loading the stylesheet lazily. Fix: extract critical CSS inline, use `<link rel="preload">` for stylesheets, or switch to static CSS extraction.

**7.** Most common cause: event listeners or subscriptions added in useEffect without cleanup, or storing component state in a closure that holds a reference to the component tree. Find it: Chrome DevTools Memory tab, take a heap snapshot before and after suspected leak, look for detached DOM nodes.

**8.** Safari has incomplete CSS Grid support for certain features like `subgrid` and has bugs with `grid-template-rows: auto` in some versions. Check: `-webkit-` prefixes, whether you're using a grid feature Safari doesn't support. Use `@supports` as a fallback.

**9.** The input component is being re-created on every render because it's defined inside the parent component's render function. Move the component definition outside, or the `key` prop is changing on each render.

**10.** The Suspense fallback requires the import to be truly lazy (`React.lazy(() => import(...))`). If the chunk loads faster than one frame or the component is already in the module cache, the fallback may not show. Also check if the component is wrapped in Suspense at the right level.

**11.** Check: uncompressed assets (images, JS, fonts), no CDN for static assets, multiple render-blocking requests, large JS bundle parsed on a slow CPU, missing service worker for caching. Prioritize image compression and bundle size first on slow networks.

**12.** Split the context into two: one for the data that changes frequently and one for static values. Or memoize the context value with `useMemo` so the reference only changes when the relevant data changes, not on every parent render.

**13.** Add explicit `width` and `height` attributes to the `<img>` tag (or use CSS `aspect-ratio`). This reserves space before the image loads, preventing layout shift and improving CLS score.

**14.** CSS transitions require the element to transition from a computed value to another. When removing a class, if the browser applies the end state before the transition can start (e.g. `display: none` is set), the transition is skipped. Fix: don't use `display: none`; use `opacity` or `visibility` instead, or use a small `setTimeout` before removing the class.

**15.** A `keydown` event listener for Escape is likely missing, or it was added to a child element instead of `document` or `window`. Also check if `e.key === 'Escape'` vs `e.key === 'Esc'` (older browsers).

**16.** Largest Contentful Paint (LCP) is almost always the culprit on mobile. Check: render-blocking scripts, unoptimized hero image (no `loading="eager"` + preload, no WebP), large JS bundle blocking TTI. Fix the LCP image first — preload it, serve WebP, size it for mobile.

**17.** Stale state in the component or stale data in a client-side cache (like React Query or SWR). Fix: on logout, clear all cached state — call `queryClient.clear()`, clear localStorage/sessionStorage tokens, and redirect immediately before any async cleanup.

**18.** The scroll event fires multiple times before the first fetch completes, and each scroll triggers a new request with the same page offset. Fix: use a `loading` ref (not state) to gate the fetch — `if (loading.current) return;` — and set it before and clear it after the request.

**19.** The tooltip is inside a different stacking context than the modal. z-index only competes within the same stacking context. The modal's parent may have `transform`, `opacity < 1`, or `isolation: isolate` which creates a new stacking context. Fix: render the tooltip via a portal to `document.body`.

**20.** Start with the props being passed to the component — type them as the actual shape instead of `any`. Use `unknown` as a safer intermediate. Enable `strict: true` in tsconfig incrementally per file using `// @ts-check`. Add types file-by-file rather than all at once.

**21.** Check for uncontrolled access to `e.clipboardData` without checking if it exists, or synchronous processing of large paste content blocking the thread. Also check if the input has `onPaste` with `e.preventDefault()` accidentally blocking the paste.

**22.** Move styles out of the JS runtime and into build-time static CSS extraction (e.g. switch from styled-components runtime to Linaria, vanilla-extract, or CSS Modules). This eliminates the style injection cost during hydration and TTI.

**23.** Load it with `async` or `defer` attribute. If it's truly third-party and can't be modified, use a `<script async>` tag or load it via `setTimeout` / `requestIdleCallback` to yield the main thread. As a last resort, use a façade/placeholder that only loads the script on user interaction.

**24.** Three most likely: (1) large uncode-split JS bundle blocking parsing, (2) server-side rendering not implemented so the browser waits for JS to hydrate, (3) a blocking third-party script in `<head>` without `async`/`defer`.

**25.** The dropdown is closed by a `blur` event on the trigger element, which fires before the `click` on the option. Fix: use `onMouseDown` + `e.preventDefault()` on the option to prevent blur, or use `focusout` with a timeout to check if focus moved within the dropdown.

**26.** Add `<link rel="preload" as="font" crossorigin>` for the font file in the `<head>`. Use `font-display: swap` in the `@font-face` rule to show fallback immediately and swap when ready, or `font-display: optional` to prevent FOUT entirely.

**27.** Before navigating away, save the scroll position to `sessionStorage` with the route as key. On mount of the page component, restore it with `window.scrollTo` inside a `useEffect`.

**28.** Hydration mismatch happens when the server-rendered HTML doesn't match what React renders on the client. Common causes: accessing `window`/`localStorage` during SSR, `Date.now()` or `Math.random()` in render, browser extensions modifying the DOM, or locale-dependent rendering.

**29.** Most common cause: React 18 StrictMode double-invokes event handlers in development, or the event listener is being attached twice — once in JSX and once manually with `addEventListener` in a useEffect without cleanup.

**30.** The useEffect has the URL or a function in its dependency array that's recreated on every render. Fix: move the fetch URL outside the component or into `useRef`, ensure the dependency array only contains stable values, or use `useCallback` for function dependencies.

**31.** Missing Babel transpilation for modern JavaScript syntax (optional chaining, nullish coalescing, arrow functions). Add `@babel/preset-env` with `targets: { browsers: ['> 0.2%', 'not dead'] }` and include polyfills for Promise, fetch, etc.

**32.** Use `madge` or Webpack's `--display-modules` to visualize the dependency graph. Fix by restructuring: extract shared code into a separate utility module that neither circular dependency imports from.

**33.** Add `will-change: transform` to the animated element. This promotes it to its own compositor layer so browser layout changes elsewhere don't trigger a repaint of the animated element.

**34.** Use `document.title` assignment in a `useEffect` per route, or use a library like `react-helmet` / Next.js `<Head>` component to declaratively set the title per page.

**35.** The component is rendering asynchronously or using `findByText` while using `getByText` (sync). Most likely: the component uses async data fetching and the test isn't using `waitFor` or `findBy*` queries. Also check if the component is wrapped in providers the test setup is missing.

**36.** Implement virtual/windowed rendering using `react-window` or `react-virtual`. Only render the items currently visible in the viewport plus a small overscan buffer.

**37.** CSS custom properties don't pierce shadow DOM boundaries by design. Fix: use `::part()` pseudo-element for styling from outside, or define the CSS variables inside the shadow root itself, or use `@property` registered custom properties.

**38.** The component updates state with the response but doesn't `await` the `.json()` call, or updates state before checking if the component is still mounted. Also check for `setData(response)` instead of `setData(await response.json())`.

**39.** The service worker's fetch handler doesn't have a cache-first or cache-fallback strategy. Add a `fetch` event listener that checks the cache before making a network request and falls back to cached assets when offline.

**40.** The autocomplete is rendering in a container with `overflow: hidden` or a parent with `position: relative` and a lower z-index. Fix: render the suggestion list via a portal to `document.body` and position it absolutely using `getBoundingClientRect`.

**41.** Use `export const config = { runtime: 'edge' }` for latency-sensitive routes. Enable ISR where possible. Split large serverless functions into smaller ones. Use Next.js `unstable_cache` or React cache. Reduce dependencies in the serverless bundle.

**42.** Use UTC dates throughout and only format to local timezone at display time. Use `Intl.DateTimeFormat` with an explicit `timeZone` option, or store dates as ISO 8601 strings and parse with a library like `date-fns-tz`.

**43.** Firefox requires `e.dataTransfer.setData()` to be called in the `dragstart` handler, even if the value is empty. Also check: Firefox doesn't allow `e.dataTransfer.getData()` during `dragover`, only `drop`.

**44.** The page is using `history.replaceState` or `router.replace` instead of `router.push`, so there's no history entry to go back to. Or a redirect after the page load consumed the history entry.

**45.** Add `min-width: 0` to grid items. Grid items default to `min-width: auto` which makes them as wide as their content, causing overflow. Setting `min-width: 0` allows them to shrink below content size.

**46.** Use `useReducer` at the top level or split the form into field groups where each group manages its own state. Alternatively use `useRef` for uncontrolled inputs and only convert to controlled state on submit.

**47.** Reserve space for the carousel with a fixed height container and `aspect-ratio` on the image. Preload the first image with `<link rel="preload">`. Use `width` and `height` attributes on all images.

**48.** The Clipboard API (`navigator.clipboard.readText()`) requires user permission. Check for `clipboard-read` permission with `navigator.permissions.query({ name: 'clipboard-read' })`. Also ensure the page is served over HTTPS.

**49.** In React DevTools Profiler tab, record a render cycle and look at the flame graph. Each bar shows which component rendered and why (prop/state/context change). Look for components high in the tree that re-render and cascade down. Then check: are props objects recreated inline? Are context values not memoized?

**50.** Server is closing idle connections after 30 seconds. Fix: implement a client-side ping/heartbeat every 20-25 seconds to keep the connection alive. Also configure the server's idle timeout to be longer than the heartbeat interval.

**51.** `strict: false` or missing `strictNullChecks` in tsconfig. TypeScript wasn't checking for undefined/null access. Enable `"strict": true` and fix the resulting errors — they'll point to exactly where runtime crashes are possible.

**52.** The `<a>` tag has `target="_blank"` set, or the router's `<Link>` component is being bypassed with a raw `<a href>`. Fix: use the router's `Link` component instead of `<a>` for internal navigation.

**53.** The animation is using `top`, `left`, `width`, or `height` which trigger layout and paint. Switch to `transform: translate()` and `opacity` only — these are composited on the GPU and don't trigger paint.

**54.** Missing `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the modal title, and focus trap. The modal must programmatically receive focus on open (`autoFocus` or `focus()` on the dialog element). Add `aria-live` for dynamic content inside.

**55.** Beyond aesthetics, missing or duplicate keys cause React to incorrectly reuse DOM nodes when the list changes — leading to state being applied to the wrong items, incorrect animations, and potential data corruption in forms. It also degrades reconciliation performance.

**56.** The old JS/CSS bundle is cached by the CDN or browser with a long max-age and the new deployment served new HTML pointing to the same filenames. Fix: use content-hash filenames (`main.a1b2c3.js`), set `Cache-Control: immutable` for hashed assets, and `no-cache` for the HTML file.

**57.** The debounce timer is being reset on every keystroke but the input's `onChange` reads `e.target.value` inside the debounced function, which is stale by the time it fires (React's synthetic event pooling in older React). Fix: read the value immediately in onChange and pass it to the debounced function, don't read `e.target.value` inside the debounce callback.

**58.** A `max-width: 768px` query and a `min-width: 768px` query both match at exactly 768px. The order in the stylesheet determines which wins, which may not be what you intend. Use `max-width: 767px` and `min-width: 768px` to avoid the overlap.

**59.** Webpack assigns numeric chunk IDs by default, which change when other chunks are added or removed. Fix: use `chunkIds: 'named'` or `chunkIds: 'deterministic'` in Webpack config, or use `/* webpackChunkName: "my-route" */` magic comments in dynamic imports.

**60.** A large synchronous JavaScript task is blocking the main thread after load — likely a heavy computation, large JSON parse, or a third-party script initializing. Use Chrome DevTools Performance tab, look for long tasks (red) after load. Break them up with `setTimeout(fn, 0)` or `scheduler.postTask`.

**61.** A CSS animation has `animation-play-state: running` set unconditionally instead of being triggered by a class or user interaction. Or the animation is on the element's default styles instead of being toggled. Fix: set the animation in a class that's added on interaction.

**62.** Use a `ref` to hold the DOM node and only initialize the third-party library once in a `useEffect`. Give the library its own container div that React never touches. On re-render, don't re-initialize — only update the library's API if data changes via a separate `useEffect`.

**63.** N+1 data fetching — each component fetches its own data independently on mount. Fix: aggregate calls into a single API request (BFF pattern), use GraphQL, or use a data-fetching layer like React Query that deduplicates requests. Also check for waterfalls where parent fetches then child fetches sequentially.

**64.** Implement a sliding window activity detector: reset a timer on any user event (mousemove, keydown, click). When the timer fires, silently call the refresh token endpoint to extend the session. This keeps the session alive as long as the user is active.

**65.** `getServerSideProps` runs on every request and should always be fresh. If data appears stale, check if a CDN or reverse proxy is caching the page response. Next.js by default sets `Cache-Control: private, no-cache` for SSR pages — a CDN override may be stripping this. Also check if you're reading from a cached database layer.

**66.** Check for: large render tree causing expensive reconciliation, synchronous state updates causing multiple re-renders per interaction, unvirtualized long lists, and heavy computations in render. Use React Profiler to identify slow commit phases.

**67.** Inline-block elements respect whitespace in HTML source — spaces and newlines between tags create text nodes that render as gaps. Fix: set `font-size: 0` on the parent, use flexbox, or remove whitespace between elements in HTML.

**68.** The button has `disabled` styling via CSS but is missing the `disabled` attribute on the DOM element, or the form's `onSubmit` handler doesn't check button state. Fix: add `disabled` attribute to the button AND add `e.preventDefault()` check or `aria-disabled` with JavaScript prevention.

**69.** Objects and arrays are compared by reference in JavaScript. On each render the parent creates a new object literal `{}` or array `[]` as a prop, even if the values are identical. The `useEffect` sees a new reference and runs again. Fix: memoize the object with `useMemo` in the parent, or destructure the primitive values you actually need as individual dependencies.

**70.** A fixed or sticky header is overlapping the anchor target. The anchor jumps to the element's top edge, which is hidden under the header. Fix: add `scroll-margin-top` (or `scroll-padding-top` on the scroll container) equal to the header height to the targeted elements.

**71.** Use Webpack's `resolve.alias` to point both packages to the same version, or add `"resolutions"` (Yarn) / `"overrides"` (npm 8+) in `package.json` to force a single version. Run `npm dedupe` or `yarn dedupe` to clean up.

**72.** Get the device pixel ratio with `window.devicePixelRatio`. Set the canvas `width` and `height` attributes to `displayWidth * dpr` and `displayHeight * dpr`, then scale the context with `ctx.scale(dpr, dpr)`, and set CSS `width`/`height` to the display size.

**73.** Pre-load the default language bundle synchronously or inline it in the HTML. Use `i18next`'s `initImmediate: false` to block render until translations are loaded. Alternatively, server-render with the correct language strings so the client receives translated HTML from the start.

**74.** Add `e.preventDefault()` in the `dragover` handler — without this, the browser treats the drop target as invalid and handles the file itself (opening it). Also add it to `dragenter`.

**75.** A `useEffect` is updating state that's in its own dependency array, creating a loop: effect runs → state updates → effect runs again. Fix: remove the state from the dependency array if the effect should set it, or add a condition inside the effect to prevent unnecessary updates.

**76.** Custom interactive elements (div, span used as buttons) are missing `role="button"` or appropriate ARIA roles, `tabIndex="0"`, and `onKeyDown` handlers for Enter/Space. Without `tabIndex`, they are invisible to keyboard navigation entirely.

**77.** Figma's mobile-first uses `min-width` (add styles as screen gets larger). Your `max-width` approach is desktop-first (remove styles as screen gets smaller). Both are valid but need to be consistent. To reconcile: convert all breakpoints to `min-width` and rewrite the CSS mobile-first. The breakpoint values stay the same, only the query direction changes.

**78.** The loading state is being set to `true` on fetch start but never reset to `false` in the success path — likely the `setLoading(false)` call is inside the `catch` block only, or before the data is set in an async chain. Fix: use a `finally` block to always set loading to false.

**79.** In production, React doesn't use StrictMode's double-render, so any state issues hidden by double-rendering surface. More likely: the chart library is not being cleaned up between renders, or it's reading from the DOM directly and React's reconciliation is conflicting. Also check if production build enables different optimizations that change timing.

**80.** Applying the theme change updates CSS variables or a class on `<body>` which triggers a re-render of the entire tree at once. Fix: use CSS custom properties for all theme values so the change is CSS-only (no JS re-render). Store the theme in a cookie for SSR so the server renders the correct theme on first load, eliminating flash.

---

## ARCHITECTURE — 60 Answers

**1.** Structure: monorepo (Turborepo/Nx), one package per component group. Use CSS custom properties for theming with a `theme` prop that applies a data attribute (`data-theme="dark"`). Every component gets ARIA roles and keyboard handling by default. Tree shaking: use pure ESM, no side-effect imports, mark `sideEffects: false` in package.json. Version with semantic versioning — breaking prop changes bump major.

**2.** Use WebSockets or SSE per panel group, not per panel. Normalize the data into a central store (Zustand/Redux). Each panel subscribes only to its slice. Batch updates with `flushSync` or debounce at 60fps. Use React's concurrent features to prioritize visible panels.

**3.** Store access token in memory only (JS variable or Zustand, never localStorage). Store refresh token in httpOnly cookie. On app init, call a `/refresh` endpoint — if it succeeds, you get a new access token in memory. Set a timer for silent refresh at (expiry - 60s). On 401, trigger refresh automatically. XSS can't read httpOnly cookies or in-memory variables.

**4.** Use a Module Federation setup (Webpack 5) or import maps. Each team owns a remote — checkout, catalog, account. A shell app imports remotes at runtime. Share React as a singleton via shared scope. Teams version their remotes independently. Communication via a shared event bus or custom elements for cross-team events.

**5.** Each operation generates an intent object (e.g. `{type: INSERT, pos: 5, char: 'a'}`). Apply locally immediately (optimistic). Send to server. Server uses OT (Operational Transformation) or CRDT to merge concurrent changes. On server ACK, reconcile local pending operations. On conflict, transform pending ops against the received op before applying.

**6.** Define a plugin interface: `{ name, init(api), routes, components, reducers }`. Core app exposes an `api` object with safe methods (register route, add menu item, dispatch action). Plugins are loaded via dynamic import. Use a plugin registry to manage lifecycle. Sandbox with CSP if third-party.

**7.** Use a schema-driven form library (react-hook-form + zod or JSON Schema Form). Schema defines field visibility conditions as expressions evaluated against current values. Cross-field validation runs in the resolver. Partial save debounces to a draft endpoint every 30s, storing field values keyed by form ID and user ID.

**8.** Layer 1: in-memory cache (Map) for same-session data with TTL. Layer 2: service worker cache for static/API responses across navigations. Layer 3: IndexedDB for large structured data. On partial network failure, serve stale-while-revalidate. Invalidate by cache key or tag (similar to Next.js cache tags).

**9.** Define tokens in a single JSON/YAML source of truth (e.g. Style Dictionary format). Run Style Dictionary to transform tokens to: CSS custom properties for web, Swift constants for iOS, Kotlin constants for Android. Figma uses the Figma Tokens plugin to sync. Any token change flows through a CI pipeline that outputs all three formats.

**10.** Flags stored in a remote config service (LaunchDarkly-style or custom). Client fetches flags on init and caches them. Each flag has: key, percentage (0-100), targeting rules (user ID, cohort, attribute). Percentage rollout: hash(userId + flagKey) % 100 < percentage. Kill switch: set percentage to 0 instantly. SDK wraps flag evaluation with a `useFlag(key)` hook.

**11.** Headless table core (TanStack Table) manages sort/filter/pagination state. Virtualized rows via TanStack Virtual — only visible rows render. Column resizing with pointer events and CSS variables for widths. Row selection via a Set of IDs in state. Sorting/filtering operate on the data model, not the DOM. For 100k rows, all operations must be O(n log n) max.

**12.** Wrap each widget in its own `<ErrorBoundary>` component at the dashboard layout level. The error boundary catches render errors and shows a fallback UI for that widget only. Log errors to your observability service in `componentDidCatch`. For async errors (data fetching), use a global error handler and per-widget error state.

**13.** Use a lightweight RUM (Real User Monitoring) collector. Capture: `PerformanceObserver` for LCP/CLS/FID, `window.onerror` + `unhandledrejection` for JS errors, custom events for user interactions. Batch events and send via `navigator.sendBeacon` on visibility change to avoid blocking. Sample at 10% for performance events to reduce volume.

**14.** Use BroadcastChannel API to send state update messages to other tabs. Primary tab holds the "truth" — other tabs are replicas. On message receipt, update local store. For session-critical data (auth), use localStorage events (`window.addEventListener('storage', ...)`) as a cross-tab sync mechanism. Zustand has a middleware for this pattern.

**15.** Use React Router's lazy + Suspense for all 200 routes. Group routes by domain (auth, dashboard, settings) into shared chunks via `webpackChunkName`. Preload chunks on link hover (`<Link onMouseEnter={() => import('./Page')}`). Shared vendor code goes in a separate chunk. Target: route chunks < 20KB each, vendor chunk < 30KB.

**16.** Use the HTML5 Drag and Drop API with a context-free approach: a global drag state singleton (not React state) tracks what's being dragged. Drop zones register themselves with a `useDrop` hook that subscribes to the global state. No Redux needed — just a pub/sub inside a module. For cross-tree drops, use `document`-level dragover/drop listeners.

**17.** On open: save `document.activeElement`, set `aria-modal="true"`, apply focus to first focusable element. Trap focus: on Tab keydown, find all focusable children, wrap from last to first (and Shift+Tab wraps back). Nested modals: maintain a stack — each new modal pushes to stack, each close pops and focuses previous modal's saved element. On close: restore saved element.

**18.** Add a `submitting` boolean state. On submit, set `submitting = true` and disable the button. Reset on response (success or error). For idempotency, generate a client-side `requestId` UUID and send it as a header. Server deduplicates by requestId and returns cached response for duplicates.

**19.** Serve a low-quality image placeholder (LQIP) as a base64-encoded inline src initially. Use `IntersectionObserver` to detect when the image is near the viewport. Load the full image by setting `img.src` to the full URL. Use `onLoad` to swap display. Prevent layout shift by always having explicit `width`/`height` or `aspect-ratio` so the container size is reserved.

**20.** Use service workers with a background sync queue. All mutations go into IndexedDB as a queue. Service worker processes queue when online. For conflict resolution: use vector clocks or last-write-wins with server timestamp. On reconnect, replay the queue, handle 409 conflicts by showing a merge UI (show server version vs local version for user to choose).

**21.** Three layers: (1) Unit tests with Testing Library for behavior. (2) Visual regression with Playwright screenshots + Percy/Chromatic for pixel diffs on every PR. (3) Accessibility audit with axe-core run in CI (`@axe-core/playwright`). Also add Storybook stories as component documentation and visual test targets.

**22.** Use BroadcastChannel (or localStorage events) for cross-tab messaging. Store notifications in IndexedDB for persistence. Service worker receives push notifications and stores them. On app load, read from IndexedDB to restore notification history. Mark as read updates both local DB and broadcasts to other tabs.

**23.** Use React Query or SWR for data fetching with stale-while-revalidate strategy. Implement request deduplication (React Query does this automatically). Use `generateStaticParams` for known routes, ISR with short revalidation windows for semi-dynamic content, and on-demand revalidation via `revalidatePath` for real-time content. Keep getServerSideProps only for truly user-specific pages.

**24.** User types → debounce 200ms → fire request with AbortController signal. Cancel previous request on new keystroke. Display results optimistically from cache if available (stale-while-revalidate). Store recent searches in sessionStorage. For empty state, show recent searches. For no results, show suggestions.

**25.** Define routes with required roles: `{ path: '/admin', roles: ['admin'] }`. A `<ProtectedRoute>` wrapper checks the current user's roles from auth context. If unauthorized, redirect to a 403 page. For UI elements: a `usePermission(role)` hook returns boolean. Components conditionally render based on it. Backend always re-validates — frontend is UX only.

**26.** Each step is a component in an array. Wizard state holds: current step index, all field values, touched fields, per-step validation schema (zod). Navigation: validate current step before advancing. Back: just decrement index, preserve values. Draft save: debounce `localStorage.setItem('wizard-draft', JSON.stringify(state))` every 2s. Restore draft on mount.

**27.** Use `PerformanceObserver` to collect LCP, CLS, FID/INP per page view. Tag each event with: page route, user segment (plan tier, device type, geography). Send to an analytics endpoint. Store in a time-series DB (InfluxDB or a warehouse). Build a dashboard showing p50/p75/p95 per metric per segment. Alert when p75 LCP exceeds 2.5s.

**28.** Use WebSockets or SSE for live price streaming. Never display data without a timestamp. Show "data as of X seconds ago" and highlight when staleness > threshold. Disable trade actions when connection is lost. Implement a dead man's switch: if no price update in 5s, mark data as potentially stale and show a warning. Use optimistic locking on trade submission.

**29.** Frontend: `<input type="file" multiple accept="image/*">` or drag-and-drop with File API. For each file: generate a preview with `URL.createObjectURL`. Upload via multipart form or presigned S3 URL (preferred for large files). Track progress with `XMLHttpRequest`'s `onprogress` or fetch + ReadableStream. On failure, retry with exponential backoff. Show per-file progress bars.

**30.** Client-side A/B: on first visit, call an assignment service, store variant in localStorage. Apply variant class/config before render (in `_app.tsx` or layout). Use `suppressHydrationWarning` for variant-specific JSX to avoid hydration mismatch. Measure: attach variant ID to all analytics events. For server-side: assign in middleware, set a cookie, read in getServerSideProps.

**31.** Store translation strings in locale files loaded via dynamic import on route change. For RTL: add `dir="rtl"` to `<html>` and use CSS logical properties (`margin-inline-start` not `margin-left`). Fallback chain: `['fr-CA', 'fr', 'en']` — try most specific first. Lazy load locale bundles. Use `Intl.RelativeTimeFormat` and `Intl.NumberFormat` for locale-aware formatting.

**32.** Intercept `beforeunload` and `popstate` events. Maintain an `isDirty` flag in form state. When dirty and navigation is attempted, show a native confirm dialog or a custom modal. If confirmed: clear dirty flag, then navigate. If canceled: use `history.pushState` to put the URL back. In React Router v6, use the `blocker` API.

**33.** Use a `slots` pattern: the base component accepts slot props (`header`, `footer`, `actions`) for customizable sections. Use compound components for complex customization. Expose a `className` and `style` prop on every component. Document the CSS custom properties for theming. For enterprise, allow a configuration object (`ComponentConfig`) that overrides default behavior.

**34.** All outgoing messages go to a local queue. On send, immediately display the message with a "sending" indicator (optimistic). Queue includes: messageId, timestamp, content, retryCount. Worker processes queue FIFO via WebSocket. On ACK: mark delivered. On failure: retry with backoff up to 3 times. If offline: persist queue to IndexedDB, drain on reconnect.

**35.** Each micro-frontend gets a unique CSS prefix via PostCSS (`postcss-prefix-selector`) or CSS Modules with custom generateScopedName. Use Shadow DOM for full isolation if possible. Share a design token CSS file (loaded once by the shell) so visual consistency is maintained without style conflicts.

**36.** Use `<Link prefetch>` in Next.js which already prefetches on hover. For programmatic prefetch: call `router.prefetch('/route')` on mount for likely next pages. For data: use React Query's `queryClient.prefetchQuery` in `getServerSideProps` or `getStaticProps` and dehydrate/hydrate the cache. Result: navigation feels instant.

**37.** Pipeline stages: (1) Lint + type check. (2) Unit + integration tests. (3) Build with bundle size check — fail if main bundle exceeds threshold. (4) Playwright visual regression tests — screenshot diff against baseline. (5) axe-core accessibility audit on key pages. (6) Lighthouse CI for Core Web Vitals. (7) Storybook smoke tests. All run in parallel where possible.

**38.** Use `react-grid-layout` or a custom grid with layout state stored as `{ id, x, y, w, h }[]`. On mount, load layout from the backend. On change, debounce save to backend. Each widget is a component registered by ID in a widget registry. Dashboard reads the layout, maps IDs to components. Drag and resize handled by the grid library.

**39.** Use a sliding expiry refresh: every API call checks if the token expires within 5 minutes. If so, silently call the refresh endpoint before the API call completes. Use a single in-flight refresh promise — multiple simultaneous calls queue behind it. After refresh, retry the original calls. If refresh fails (expired refresh token), redirect to login.

**40.** Abstract source selection (HLS, DASH, MP4 progressive) behind a `<VideoPlayer src protocol>` interface. Use `hls.js` for HLS in browsers without native support, `shaka-player` for DASH. Adaptive bitrate: let the library handle it, expose a quality override prop. Handle events: `onStall`, `onError`, `onQualityChange` for UX feedback. SSR: render a poster image, mount player on client only.

**41.** Define `@media print` stylesheets. Hide navigation, sidebars, interactive elements. Expand all collapsed sections. Force white background, black text. Use `page-break-inside: avoid` on tables and cards. Test in Chrome (print preview), Firefox, Safari — each has quirks. Use `@page` to set margins. For data tables, use `thead` with `display: table-header-group` to repeat headers on each page.

**42.** Implement a composite `TreeItem` component with `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-setsize`, `aria-posinset`. Arrow keys: right expands, left collapses or moves to parent, up/down move between visible items. Home/End go to first/last item. Character search for type-ahead. Manage focus with `tabIndex` — only one item in the tab order at a time (roving tabindex).

**43.** Blue-green deployment: keep the old version live until the new version is verified. For CDN: all assets are content-hashed so old and new assets coexist. Only the HTML entry point changes. Use atomic deploys (Vercel/Netlify does this). For rollback: redeploy the previous commit — CDN already has the old hashed assets cached.

**44.** Create a shared `core` package with: business logic, API clients, data models, hooks, utilities. Platform-specific packages (`web`, `native`) import from `core` and add platform UI. React Native Web can further reduce divergence by sharing UI components. Keep the split clean: no `Platform.OS` checks in core.

**45.** Use a class that manages the WebSocket lifecycle. On disconnect: exponential backoff reconnect (1s, 2s, 4s, max 30s). During disconnect: queue outgoing messages in memory. On reconnect: send queued messages and re-subscribe to channels. Prevent duplicate handlers: use a Map of `eventType → Set<handler>`. React hook `useWebSocket` subscribes/unsubscribes cleanly via useEffect cleanup.

**46.** Use `<noscript>` tags to provide fallback content for critical sections. Render meaningful HTML server-side (SSR/SSG) so the page is readable without JS. Progressive enhancement: form submissions work via native HTML form POST, dynamic features layer on top with JS. Navigation works via standard `<a>` tags as the baseline.

**47.** Use the Streams API with `fetch` for large files. Create a `<a href={objectURL} download>` link. Track progress: `response.body.getReader()` → accumulate `loaded` bytes → update a progress bar. For resumable downloads: use the `Range` header. Check `Content-Length` for total size. On failure, store the byte offset and resume with `Range: bytes={offset}-`.

**48.** Serialize filter state to URL query params (router.push with new params). On mount, read URL params and restore state. Use `useSearchParams` (Next.js) or URLSearchParams. This also makes the state shareable and bookmark-able. For very complex state, use a compressed base64 encoding of the filter object in the URL.

**49.** Detect OS preference with `@media (prefers-color-scheme: dark)` in CSS as the default. User override stored in localStorage. On app init: read localStorage, then apply the appropriate class (`data-theme="dark"`) to `<html>` before first render (in a script in `<head>` or via Next.js `_document.tsx`) to prevent flash. CSS custom properties handle all theming.

**50.** Use TypeDoc to extract TSDoc comments and generate API documentation. Storybook for visual component stories. A custom MDX integration shows live examples alongside prop tables. GitHub Actions generates docs on every merge and deploys to a docs site. The prop table comes from TypeDoc's JSON output, parsed and rendered as a table.

**51.** Set strict CSP headers via `Content-Security-Policy` header (not meta tag for full coverage): `default-src 'self'`, no `unsafe-inline`, use nonces for inline scripts. XSS: never use `dangerouslySetInnerHTML` without sanitization (use DOMPurify). CSRF: use SameSite=Strict cookies for session tokens, add a CSRF token header for state-changing requests. Also: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

**52.** Use clustering/supercluster to group nearby markers at low zoom levels. At high zoom, render individual markers. Use a WebGL renderer (deck.gl, MapboxGL) instead of SVG/DOM for 50k+ markers. Only render markers in the current viewport bounds. On pan/zoom: recalculate visible markers in a Web Worker to keep the main thread free.

**53.** The skeleton must match the content's exact dimensions. Use the same layout CSS as the real content — replace text with animated gradient bars at the same heights, images with same aspect-ratio boxes. `@keyframes` pulse animation using `background: linear-gradient(90deg, ...)` moving via `background-position`. Commit dimensions in CSS (not JS) so skeleton never causes layout shift.

**54.** Per-tenant config stored in a database: `{ tenantId, primaryColor, logo, fontFamily, enabledFeatures }`. On login/init, fetch tenant config and apply CSS variables to `:root`. Use CSS custom properties for all brand values. Feature flags from the config gate UI elements. Subdomain routing (`tenant.app.com`) maps to tenant ID via middleware.

**55.** Use Apollo Client (or urql) with normalized cache (InMemoryCache). For optimistic updates: `optimisticResponse` in mutation options — update cache immediately, revert on error. Cache invalidation: use `refetchQueries` or `cache.evict()` + `cache.gc()` for stale data. Pagination: `@connection` directive + `fetchMore` with `merge` policy to accumulate pages.

**56.** In Next.js: use `getStaticProps` + ISR for SEO landing pages (pre-rendered, revalidated in background). Use `getServerSideProps` for truly dynamic SEO content (user-specific OG tags). Use client-side rendering (SWR/React Query in a regular page) for app-like interactions behind auth. All from the same component library — SSR/CSR is a data-fetching decision, not a component decision.

**57.** Use Yjs or Automerge (CRDT libraries) to model the document state. Each keystroke produces a diff (not the full document). Diffs are applied locally and synced via WebSocket. Undo/redo stacks are per-user (local undo). Branch history: maintain a linked list of operations. To go back in history, replay from the root operation to the desired point.

**58.** Compute the chart data in a Web Worker (`new Worker()`). Transfer heavy data structures using `Transferable` objects (ArrayBuffer) to avoid serialization cost. Post results back to main thread. Use `OffscreenCanvas` to render charts in the Worker if the library supports it. Fall back to chunking data processing with `requestIdleCallback` if Web Workers aren't available.

**59.** Mobile-first: start with base styles (no query), use `min-width` breakpoints for larger screens. 5 breakpoints: 320 (base), 480 (sm), 768 (md), 1024 (lg), 1440 (xl). Use CSS custom properties for spacing and type scales that change per breakpoint (change the variable, not every usage). Container queries (`@container`) for component-level responsiveness, eliminating many media queries.

**60.** Use two output targets in Webpack/Vite: `target: ['web', 'es2022']` for modern browsers (smaller bundle, no unnecessary polyfills) and `target: ['web', 'es5']` for legacy (with Babel transform + core-js polyfills). Use `<script type="module">` for modern and `<script nomodule>` for legacy — browsers load the appropriate one. This is the module/nomodule pattern.

---

## CODING ROUND — 100 Answers

**1. Debounce**

```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**2. Throttle**

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
```

**3. useFetch**

```js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);
  return { data, loading, error };
}
```

**4. Deep equality**

```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(k => deepEqual(a[k], b[k]));
}
```

**5. Flatten array**

```js
function flatten(arr, depth = Infinity) {
  return depth > 0
    ? arr.reduce((acc, val) =>
        acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
    : arr.slice();
}
```

**6. Infinite scroll** — Component with `useRef` on a sentinel div + `IntersectionObserver`: when sentinel enters viewport, fetch next page and append to list.

**7. Event Emitter**

```js
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, cb) { (this.events[event] = this.events[event] || []).push(cb); }
  off(event, cb) { this.events[event] = (this.events[event] || []).filter(fn => fn !== cb); }
  emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); }
}
```

**8. CSS-only dropdown** — `<details>/<summary>` or `:focus-within` on a parent with a hidden child `ul` that shows on `parent:focus-within ul { display: block }`.

**9. useLocalStorage**

```js
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  const set = v => { setValue(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [value, set];
}
```

**10. Memoize**

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**11. Flat array to tree**

```js
function buildTree(items) {
  const map = {}, roots = [];
  items.forEach(item => map[item.id] = { ...item, children: [] });
  items.forEach(item => {
    if (item.parentId) map[item.parentId]?.children.push(map[item.id]);
    else roots.push(map[item.id]);
  });
  return roots;
}
```

**12. Debounced search with cancel** — `useFetch`-style hook with `AbortController`. On each input change, abort previous controller, create a new one, debounce the fetch call.

**13. Pub-Sub**

```js
class PubSub {
  constructor() { this.subscribers = {}; }
  subscribe(event, fn) { (this.subscribers[event] = this.subscribers[event] || []).push(fn); }
  publish(event, data) { (this.subscribers[event] || []).forEach(fn => fn(data)); }
  unsubscribe(event, fn) { this.subscribers[event] = (this.subscribers[event] || []).filter(s => s !== fn); }
}
```

**14. CSS sticky header layout**

```css
.layout { display: flex; flex-direction: column; height: 100vh; }
header { position: sticky; top: 0; }
main { flex: 1; overflow-y: auto; }
footer { position: sticky; bottom: 0; }
```

**15. useIntersectionObserver**

```js
function useIntersectionObserver(ref, callback, options) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
}
```

**16. Deep clone with circular refs**

```js
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);
  Object.keys(obj).forEach(k => clone[k] = deepClone(obj[k], seen));
  return clone;
}
```

**17. Template string replace**

```js
function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}
```

**18. Virtualized list** — Measure container height, item height. Compute `startIndex = Math.floor(scrollTop / itemHeight)`, `endIndex = startIndex + Math.ceil(containerHeight / itemHeight) + overscan`. Render only those items with absolute positioning. Total height div for scroll space.

**19. Retry with backoff**

```js
async function retry(fn, times, delay = 1000) {
  try { return await fn(); }
  catch (e) {
    if (times === 0) throw e;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, times - 1, delay * 2);
  }
}
```

**20. Responsive CSS grid**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

Or explicit: `grid-template-columns: 1fr` → `repeat(2, 1fr)` → `repeat(4, 1fr)` at breakpoints.

**21. Accessible modal** — On open: save focused element, focus first focusable in modal. Trap Tab with keydown handler cycling through focusable children. Listen for Escape to close. On close: `savedElement.focus()`. Add `role="dialog" aria-modal="true" aria-labelledby`.

**22. Group by**

```js
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
}
```

**23. Custom Promise** — Class with `pending/fulfilled/rejected` state. `then` registers callbacks. On `resolve(value)`: set fulfilled, call then-callbacks async. On `reject`: call catch-callbacks. Chain by returning new Promise from `then`.

**24. Form with touched validation** — Track `touched` state per field (set on `onBlur`). Show errors only when `touched[field]` is true. Validate on each change but only display if touched.

**25. LRU Cache** — Use a `Map` (maintains insertion order) + doubly linked list. `get`: move to front. `set`: add to front, if over capacity delete least-recently-used (last in map). Map gives O(1) access, DLL gives O(1) move.

**26. Better typeof**

```js
function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}
// typeOf(null) === 'null', typeOf([]) === 'array', typeOf(new Date) === 'date'
```

**27. Multi-select dropdown** — Controlled component with an `open` state, a `search` input filtering options, a `selected` Set for selections, checkboxes per option, a "Clear all" button calling `setSelected(new Set())`.

**28. camelCase ↔ kebab-case**

```js
const toKebab = s => s.replace(/([A-Z])/g, '-$1').toLowerCase();
const toCamel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
```

**29. Skeleton CSS animation** — Card-shaped divs with `background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`. `@keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }`.

**30. useWindowSize**

```js
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}
```

**31. Permutations**

```js
function permutations(str) {
  if (str.length <= 1) return [str];
  return str.split('').flatMap((c, i) =>
    permutations(str.slice(0, i) + str.slice(i + 1)).map(p => c + p)
  );
}
```

**32. Drag and drop list** — `onDragStart`: store dragged index. `onDragOver`: `e.preventDefault()`. `onDrop`: reorder array by swapping dragged index and drop target index, update state.

**33. Vanilla JS router** — Listen to `popstate`. On link click: `e.preventDefault()`, `history.pushState({}, '', path)`, call `render(path)`. Map paths to render functions.

**34. Three centering methods**

```css
/* 1. Flexbox */
.parent { display: flex; align-items: center; justify-content: center; }
/* 2. Grid */
.parent { display: grid; place-items: center; }
/* 3. Absolute + transform */
.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

**35. Accordion** — Array of `{ id, title, content }`. `openItems` is a Set in state. Click toggles item ID in set. Each item renders content if its ID is in `openItems`. Keyboard: Enter/Space toggles, arrow keys navigate between headers. ARIA: `aria-expanded`, `aria-controls`, `role="region"`.

**36. Query param parser**

```js
function parseQuery(search) {
  return Object.fromEntries(new URLSearchParams(search));
}
```

**37. Function composition**

```js
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
```

**38. Async task queue** — `useReducer` or `useRef` for queue. Process head of queue, on complete shift queue and process next. Expose `enqueue(task)`. Process one at a time with `isProcessing` guard.

**39. Observer-based state**

```js
function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    getState: () => state,
    setState: next => { state = next; listeners.forEach(l => l(state)); },
    subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); }
  };
}
```

**40. Full-bleed in constrained container**

```css
.content { max-width: 800px; margin: 0 auto; }
.full-bleed { width: 100vw; margin-left: calc(50% - 50vw); }
```

**41. Character count** — `value.length` in state. Display count. At 80%: show yellow warning. At 100%: red, prevent further input or show over-limit indicator.

**42. Curry**

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}
```

**43. Currency format without Intl**

```js
function formatCurrency(n, symbol = '$') {
  const [int, dec] = n.toFixed(2).split('.');
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${symbol}${formatted}.${dec}`;
}
```

**44. Image carousel** — Array of images, `currentIndex` in state. `setInterval` auto-advances if `!paused`. `onMouseEnter` sets paused, `onMouseLeave` clears. `onKeyDown` on the container listens for ArrowLeft/ArrowRight. Dots or prev/next buttons update index.

**45. Queue from two stacks**

```js
class Queue {
  constructor() { this.in = []; this.out = []; }
  enqueue(val) { this.in.push(val); }
  dequeue() {
    if (!this.out.length) while (this.in.length) this.out.push(this.in.pop());
    return this.out.pop();
  }
}
```

**46. Fluid typography**

```css
:root {
  font-size: clamp(1rem, 0.5rem + 1vw, 1.5rem);
}
```

**47. useUndoRedo**

```js
function useUndoRedo(initial) {
  const [history, setHistory] = useState([initial]);
  const [index, setIndex] = useState(0);
  const state = history[index];
  const set = val => { const next = history.slice(0, index + 1); setHistory([...next, val]); setIndex(next.length); };
  const undo = () => setIndex(i => Math.max(0, i - 1));
  const redo = () => setIndex(i => Math.min(history.length - 1, i + 1));
  return [state, set, undo, redo];
}
```

**48. Serialize to query string**

```js
function toQueryString(obj) {
  return new URLSearchParams(obj).toString();
}
```

**49. Web Worker heavy computation** — `new Worker(URL.createObjectURL(new Blob([workerCode])))`. Post message to worker: `worker.postMessage(data)`. Worker computes and `postMessage(result)` back. Main thread listens with `worker.onmessage`.

**50. Date range picker** — Two `Date` state values: `startDate`, `endDate`. Calendar grid renders days. Click sets start, then end (if after start). Highlight range between them. Disable dates before today via comparison in the cell render function.

**51. Batch async operations**

```js
async function batchRequests(requests, batchSize) {
  const results = [];
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    results.push(...await Promise.all(batch.map(fn => fn())));
  }
  return results;
}
```

**52. CSS masonry** — Use CSS Grid with `grid-template-rows: masonry` (limited browser support). Cross-browser fallback: CSS columns (`column-count: 3`). Or use JS-based positioning with `position: absolute` and a column-fill algorithm.

**53. Tag input** — `tags` array in state. `inputValue` string. On Enter keydown: if `inputValue.trim()` is not empty and not duplicate, append to tags, clear input. Render tags as chips with an `×` button that filters them out.

**54. Email validation**

```js
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**55. Custom rich text renderer** — Parse the string with a regex to find `**bold**` and `_italic_` patterns. Replace with `<strong>` and `<em>`. Return using `dangerouslySetInnerHTML` after sanitizing, or build a recursive parser that returns React elements.

**56. useAsync with unmount cancel**

```js
function useAsync(fn, deps) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let cancelled = false;
    fn().then(data => { if (!cancelled) setState({ loading: false, data, error: null }); })
       .catch(error => { if (!cancelled) setState({ loading: false, data: null, error }); });
    return () => { cancelled = true; };
  }, deps);
  return state;
}
```

**57. Paginate array**

```js
function paginate(arr, page, size) {
  return arr.slice((page - 1) * size, page * size);
}
```

**58. Animated progress bar** — `width: 0` initial, CSS `transition: width 0.5s ease`. In JS (or React), set the `width` style to `${value}%`. The browser animates the change.

**59. Theme context**

```js
const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**60. Deep merge**

```js
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]))
      result[key] = deepMerge(target[key] || {}, source[key]);
    else result[key] = source[key];
  }
  return result;
}
```

**61. Service worker cache** — In `install` event: `cache.addAll(['/index.html', '/main.js', '/style.css'])`. In `fetch` event: `caches.match(request)` first, fall back to `fetch(request)` and cache the response.

**62. useForm**

```js
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (name, value) => setValues(v => ({ ...v, [name]: value }));
  const handleSubmit = async (onSubmit) => {
    const errs = validate ? validate(values) : {};
    setErrors(errs);
    if (!Object.keys(errs).length) { setSubmitting(true); await onSubmit(values); setSubmitting(false); }
  };
  return { values, errors, submitting, handleChange, handleSubmit };
}
```

**63. Longest common prefix**

```js
function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (const str of strs)
    while (!str.startsWith(prefix)) prefix = prefix.slice(0, -1);
  return prefix;
}
```

**64. CSS toggle switch**

```html
<label>
  <input type="checkbox" hidden>
  <span class="track"><span class="thumb"></span></span>
</label>
```

```css
.track { width: 48px; height: 24px; background: #ccc; border-radius: 12px; display: inline-block; position: relative; }
.thumb { position: absolute; left: 2px; top: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: left 0.2s; }
input:checked + .track { background: #4caf50; }
input:checked + .track .thumb { left: 26px; }
```

**65. Toast notification system** — Context with a `toasts` array and `addToast(message, type)` function. `addToast` pushes `{ id: Date.now(), message, type }` to the array and sets a timeout to remove it by ID. A `ToastContainer` component renders all current toasts.

**66. Roman numeral conversion**

```js
function toRoman(n) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  vals.forEach((val, i) => { while (n >= val) { result += syms[i]; n -= val; } });
  return result;
}
```

**67. Mobile detection**

```js
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || window.matchMedia('(max-width: 768px)').matches;
}
```

**68. Sortable data table** — `sortKey` and `sortDir` state. `useMemo` to sort the data array based on current sort. Click column header toggles `sortDir` between `'asc'/'desc'` and sets `sortKey`. Render sorted rows.

**69. Pipeline**

```js
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
```

**70. CSS hamburger menu** — Hidden checkbox + label as hamburger icon. When checked, show the nav (`nav { display: block }`). Use CSS sibling selector: `input:checked ~ nav`. No JS.

**71. useSync with BroadcastChannel**

```js
function useSyncedState(key, initial) {
  const [state, setState] = useState(initial);
  const channel = useRef(new BroadcastChannel(key));
  useEffect(() => {
    channel.current.onmessage = e => setState(e.data);
    return () => channel.current.close();
  }, []);
  const set = val => { setState(val); channel.current.postMessage(val); };
  return [state, set];
}
```

**72. Unique ID**

```js
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
// Or: crypto.randomUUID() if available
```

**73. Markdown bold/italic to HTML**

```js
function parseMarkdown(str) {
  return str
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}
```

**74. Autocomplete with keyboard nav** — `suggestions` array in state from debounced API call. `activeIndex` tracks highlighted item. `ArrowDown`/`ArrowUp` change index, `Enter` selects, `Escape` clears. Render list with `aria-activedescendant` on input pointing to active item's ID.

**75. Observable**

```js
class Observable {
  constructor(fn) { this._fn = fn; }
  subscribe(observer) {
    this._fn({
      next: val => observer.next?.(val),
      error: err => observer.error?.(err),
      complete: () => observer.complete?.()
    });
  }
}
```

**76. Multi-column with spanning headline** — `column-count: 3` on the article. `h1 { column-span: all; }` makes the headline span all columns.

**77. useMediaQuery**

```js
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = e => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
```

**78. CSS specificity calculator** — Parse selector string: count IDs (`#`) as 100, classes/attributes/pseudo-classes as 10, elements/pseudo-elements as 1. Sum them.

**79. Safe deep access in TypeScript**

```ts
function get<T, K extends keyof T>(obj: T, ...keys: string[]): unknown {
  return keys.reduce((acc: any, key) => acc?.[key], obj);
}
```

**80. File tree component** — Recursive `TreeNode` component. If node has `children`, render a collapsible container. If leaf, render a file icon + name. `isOpen` state per node. Click toggles open/closed.

**81. Batch DOM reads/writes with rAF**

```js
function batchDOMWork(reads, writes) {
  requestAnimationFrame(() => {
    const results = reads.map(fn => fn()); // all reads first
    requestAnimationFrame(() => writes.forEach((fn, i) => fn(results[i]))); // then all writes
  });
}
```

**82. Sticky sidebar** — `display: grid; grid-template-columns: 250px 1fr`. Sidebar: `position: sticky; top: 0; height: 100vh; overflow-y: auto`. Main: `overflow-y: auto`.

**83. Polling hook**

```js
function usePolling(fn, interval, isVisible) {
  useEffect(() => {
    if (!isVisible) return;
    fn();
    const id = setInterval(fn, interval);
    return () => clearInterval(id);
  }, [isVisible, interval]);
}
```

**84. Scroll direction detection**

```js
function useScrollDirection() {
  const [dir, setDir] = useState('down');
  const lastY = useRef(0);
  useEffect(() => {
    const handler = () => { setDir(window.scrollY > lastY.current ? 'down' : 'up'); lastY.current = window.scrollY; };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return dir;
}
```

**85. Deep readonly TypeScript utility**

```ts
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };
```

**86. Color picker** — Two inputs: `<input type="text">` for hex and three `<input type="number" min=0 max=255>` for RGB. Sync both directions: hex → parse to RGB, RGB → format to hex. Preview div with `background-color` set to current value.

**87. Most frequent element**

```js
function mostFrequent(arr) {
  const counts = arr.reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
```

**88. Magazine layout with named grid areas**

```css
.magazine {
  display: grid;
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
  grid-template-columns: 2fr 1fr;
}
```

**89. Global keyboard shortcuts**

```js
function useKeyboardShortcut(keyMap) {
  useEffect(() => {
    const handler = e => {
      const key = `${e.ctrlKey ? 'ctrl+' : ''}${e.key.toLowerCase()}`;
      keyMap[key]?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [keyMap]);
}
```

**90. JSON diff**

```js
function diffJSON(a, b) {
  const added = {}, removed = {}, changed = {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  allKeys.forEach(k => {
    if (!(k in a)) added[k] = b[k];
    else if (!(k in b)) removed[k] = a[k];
    else if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) changed[k] = { from: a[k], to: b[k] };
  });
  return { added, removed, changed };
}
```

**91. HTML sanitizer**

```js
function sanitize(html) {
  const div = document.createElement('div');
  div.textContent = html; // escapes all HTML
  return div.innerHTML;
}
// For richer sanitization, use DOMPurify in production
```

**92. Timeline component** — Sorted array of `{ date, title, description }`. Map to a vertical list with a line connector (CSS `::before` pseudo-element on the container) and a dot per event. Alternate left/right layout for even/odd items optionally.

**93. Typed event bus in TypeScript**

```ts
type EventMap = { login: { userId: string }; logout: {} };
class TypedEventBus {
  private listeners: { [K in keyof EventMap]?: Array<(p: EventMap[K]) => void> } = {};
  on<K extends keyof EventMap>(event: K, fn: (payload: EventMap[K]) => void) {
    (this.listeners[event] = this.listeners[event] || []).push(fn);
  }
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    this.listeners[event]?.forEach(fn => fn(payload));
  }
}
```

**94. Card flip animation**

```css
.card { perspective: 1000px; }
.card-inner { transform-style: preserve-3d; transition: transform 0.6s; }
.card:hover .card-inner { transform: rotateY(180deg); }
.front, .back { backface-visibility: hidden; position: absolute; }
.back { transform: rotateY(180deg); }
```

**95. Idle detection hook**

```js
function useIdle(timeout) {
  const [isIdle, setIsIdle] = useState(false);
  useEffect(() => {
    let timer;
    const reset = () => { setIsIdle(false); clearTimeout(timer); timer = setTimeout(() => setIsIdle(true), timeout); };
    ['mousemove', 'keydown', 'click', 'scroll'].forEach(e => document.addEventListener(e, reset));
    reset();
    return () => { clearTimeout(timer); ['mousemove', 'keydown', 'click', 'scroll'].forEach(e => document.removeEventListener(e, reset)); };
  }, [timeout]);
  return isIdle;
}
```

**96. Combinations**

```js
function combinations(arr, size) {
  if (size === 0) return [[]];
  if (arr.length < size) return [];
  const [first, ...rest] = arr;
  return [
    ...combinations(rest, size - 1).map(c => [first, ...c]),
    ...combinations(rest, size)
  ];
}
```

**97. Reduced motion utility**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**98. Collapsible JSON tree** — Recursive component. If value is object/array: render a toggle button + recursively render children when open. If primitive: render `key: value`. Color-code by type (string = green, number = blue, boolean = orange).

**99. Render time measurement**

```js
function withRenderTime(Component) {
  return function Wrapped(props) {
    const start = useRef(performance.now());
    useEffect(() => {
      console.log(`${Component.displayName || Component.name} rendered in ${(performance.now() - start.current).toFixed(2)}ms`);
    });
    return <Component {...props} />;
  };
}
```

**100. TypeScript logging decorator**

```ts
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`${key} called with`, args);
    const result = original.apply(this, args);
    console.log(`${key} returned`, result);
    return result;
  };
  return descriptor;
}
```

---

## MOCK INTERVIEW — 60 Answers

**1.** "Think of the real DOM as a giant spreadsheet with millions of cells. Every time something changes, updating it directly re-calculates the whole spreadsheet. The virtual DOM is like working on a draft copy first — React figures out the minimum number of cells that actually changed, then updates only those. That's why React feels fast even with complex UIs."

**2.** Talk about the problem, your debugging process (React Profiler + code review), and what you'd do differently: extract the complexity into custom hooks, separate concerns (data, UI, interactions), write tests for each piece earlier.

**3.** "I added a console.log to the render and noticed it firing every 2s. I opened the Profiler and found a useEffect with a missing dependency array. It was setting state → which triggered a re-render → which ran the effect again. Added the empty dep array, verified with Profiler that renders only happened on user interaction."

**4.** "The existing code used jQuery for DOM manipulation. Instead of framing it as 'rewrite for correctness,' I brought data: the team was spending 3 hours a week debugging event handler conflicts. I proposed a two-sprint incremental migration of just the most problematic module. First sprint had measurable results — two fewer bug reports. That built the case for the rest."

**5.** Walk through your actual project — data flow, component hierarchy, state management choice. Common tradeoffs: local state vs Context vs Zustand, SSR vs CSR for initial load, REST vs React Query for caching.

**6.** Describe a real bug: intermittent, environment-specific, or race condition. What made it hard: it didn't reproduce in dev, or required specific timing. What you learned: importance of logging, reproducible test cases, not assuming your first theory is correct.

**7.** "First week: read and run everything, don't change anything. Map the component tree in Excalidraw. Find the three most critical user flows and trace them end to end. Talk to the team about pain points. Deliver something small in week 2 to build trust, then propose a structured plan."

**8.** "I listened first — understood their reasoning. Then I shared what was technically possible and proposed a middle ground: a lower-fidelity version of their design that was achievable in the sprint. I showed a quick prototype to make it concrete. Usually designers respond well when they see you're trying to preserve the intent, not just cut features."

**9.** "I'd pair with them on a real task rather than giving a lecture. Let them write code, ask questions with curiosity ('what do you think this returns?'), not correction. I'd find a small, failing test to make them curious about closures — the concept lands better when you've felt the bug it prevents."

**10.** "I acknowledged I didn't have enough information to be certain, stated my assumptions explicitly, made the call based on the safest option for users, and documented the decision. The key is not paralysis — make a reversible decision quickly, flag it, and revisit with more data."

**11.** "I follow a small list of high signal sources: the React blog, TC39 proposals tracker, the HTTP Archive Web Almanac annually. I deliberately ignore most Twitter/X frontend discourse. Every 6 months I pick one new thing to build something real with — that's how I actually learn it vs just reading about it."

**12.** "I start with Lighthouse for a baseline. Then Chrome DevTools Performance tab to identify the actual bottleneck — is it scripting, rendering, or network? Most of the time: unoptimized images, a render-blocking script, or an unvirtualized long list. I fix the highest-impact issue first, measure, then move on."

**13.** "I'd look at: what problem it solves, whether it's the simplest solution, whether it's tested, whether it handles edge cases, whether it's documented. For the hook itself: stable references, correct dependency arrays, cleanup on unmount, no derived state that should be memoized. I'd leave comments about the 'why', not just the 'what'."

**14.** "I built a notification bell that users almost never clicked. We thought they'd want to stay informed — turns out they found it noisy. I learned to ship observable, not just measurable features: watch session recordings, not just click counts. The feature needed a preference to control frequency, not just an on/off toggle."

**15.** "Build a contract first — a mock API with realistic responses and error states using MSW (Mock Service Worker). Build the UI against the mock. Write the integration layer behind an interface. When the real API is ready, swap the implementation. The UI and real API are developed in parallel without blocking each other."

**16.** "I break it into known and unknown parts. Known: similar things I've done before, I estimate from experience with a 20% buffer. Unknown: I timebox a spike of 4 hours to investigate. After the spike I re-estimate. I always communicate my confidence level alongside the estimate — '2 days, medium confidence' is more useful than just '2 days'."

**17.** "Build if: it's core to your product, the library doesn't quite fit your needs, or the library is large and you need 5% of it. Use library if: it's a solved problem, the library is well-maintained, and adding it doesn't significantly impact bundle size. I've regretted building custom date pickers and drag-and-drop — both are harder than they look."

**18.** "I pushed a regex that worked in all my test cases but failed on a specific locale's currency format in production. I added an incident log, wrote a test for that case immediately, and added a staging environment check with production-realistic data. The main lesson: test with realistic data, not just happy paths."

**19.** "I use the analogy of a building's foundation vs the decor. You can repaint the walls whenever. But if the foundation is weak, every new floor you add makes the risk worse — until one day you can't add floors at all. Technical debt isn't about code quality for its own sake; it's about velocity over time."

**20.** "I documented the gap and filed it as a contribution back to the design system team. Meanwhile, I built a local component that followed the design system's patterns closely — same token usage, same API style — so it could be absorbed into the system later with minimal change."

**21.** "Monorepo with Turborepo. ESLint + Prettier config shared. Husky pre-commit hooks. Vite for dev, Webpack for prod. React Query for server state, Zustand for client state. Testing: Vitest + Testing Library. CI: GitHub Actions with lint, test, build on every PR. Storybook for component library. Everything as code from day one."

**22.** "A `z-index: 0` on an element with `position: relative` inside a flex container was pushing its siblings behind it — including a tooltip that should have appeared above. The tooltip had `z-index: 999` but it was in the same stacking context as the element with `z-index: 0`. Took an hour to find because z-index issues always look like the wrong element is at fault."

**23.** "Run Lighthouse in a branch preview environment before the launch. Use WebPageTest with a throttled 3G profile and a mid-range Android device. Set budget thresholds: LCP < 2.5s, CLS < 0.1, TBT < 200ms. Run these automatically in CI and block the PR if budgets are exceeded."

**24.** "The ticket said 'add real-time updates' — which would take a week. The business deadline was 2 days. I shipped polling every 30 seconds with a 'last updated X seconds ago' indicator. Users got freshness without WebSocket complexity. I flagged the tradeoff explicitly in the PR and filed a follow-up ticket for WebSockets."

**25.** "Reusable if it appears in 3+ places with consistent behavior. One-off if it's specific to one page's layout or data shape. Gray area: something that appears twice but diverging. My rule: build it for the first use case, copy it for the second, refactor it into a shared component on the third use when you know the real shape."

**26.** "I added TypeScript to a project that was pure JavaScript. It took a week of setup but within a month the team was catching type errors in PRs that would have been runtime crashes. I measured it: our bug count from type-related issues dropped by about 60% in the following quarter."

**27.** "Name things for the reader, not the writer. Leave comments for intent and gotchas, not mechanics. Keep components small enough to fit on one screen. Prefer explicit over clever. When I'm about to write a 'clever' trick, I add a comment explaining why — if I can't, I rewrite it."

**28.** "A CSS animation worked in Chrome but not on a specific Samsung browser. I used BrowserStack to reproduce. Found that the browser didn't support `animation-fill-mode` correctly. Added a fallback using `transition` + class toggle. The fix was 3 lines but finding it took an afternoon."

**29.** "I'd use a middleware/interceptor pattern. Every navigation action sends an event to the analytics service. The analytics module maps route changes and user interactions to event names. This keeps analytics code out of business logic. For compliance, I'd also add a consent check before firing any event."

**30.** "I had to ship a Next.js feature in 3 days. I already knew React well, so I focused on: what does Next.js add on top? Read the official docs for the patterns (getServerSideProps, API routes), not the full guide. Built the feature using official examples as scaffolding. Read deeper about the parts I used after shipping."

**31.** "File-by-file, not all at once. Start with leaf components that have no children. Add prop types first, then state types. Use `// @ts-nocheck` as an escape hatch for files you haven't gotten to yet. Run with `strict: false` initially, enable strict flags one at a time. Takes 2-3 sprints for a medium codebase."

**32.** "I set up a daily sync with the product owner and documented each requirement change in a decision log. I negotiated scope — some original requirements were deferred to the next sprint. I communicated the impact on the timeline honestly. The key is that no one likes surprises at the end of the sprint — surface the impact early."

**33.** "I'd time-box 2 days max. Build just enough to answer the specific question: does this tech work for our use case? Not production quality, not edge cases. At the end, present findings as a recommendation with caveats, not a shipping plan. Kill it cleanly if it doesn't work — that's a success too."

**34.** "I found a place where user-supplied text was being interpolated directly into an HTML string and injected with `innerHTML`. I stopped work on the feature, raised it immediately with the tech lead and security team, got it patched and deployed within a day, and wrote a post-mortem with a rule added to our code review checklist."

**35.** "I use eslint-plugin-jsx-a11y as a linting layer — it catches obvious issues at write time. I run axe-core in Storybook on every component. Before shipping any interactive feature, I manually test with VoiceOver on Mac. I treat accessibility like security: it's a requirement, not a feature, so it gets reviewed in every PR."

**36.** "I documented my concern clearly in a GitHub discussion with specific reasoning: 'this pattern will cause X problem when Y happens.' I linked to evidence. I accepted the team's decision after hearing their reasoning. But I made sure my concern was in writing — so when the predicted problem occurred, we had a clear paper trail for the retrospective."

**37.** "Open the error tracking service (Sentry/Datadog). Filter by time of spike. Look at the most frequent error. Check the stack trace — is it from our code or a third party? Look at the deployment timeline — did a deploy just happen? Check if it's correlated with a specific browser, region, or user segment. Fix the most impactful error first, deploy, confirm the spike drops."

**38.** "I read every field name carefully, typed the request and response manually, and tested every edge case I could think of. I wrote an adapter layer between the third-party API and my business logic so the rest of the codebase didn't have to know about the quirks. If it had any inconsistency, I normalized it in the adapter."

**39.** "Use nonces: generate a unique nonce on each request, add it to the CSP header (`script-src 'nonce-{value}'`), and add the nonce attribute to every `<script>` tag (including inline ones). For styles: do the same, or use hashes for static inline styles. All third-party scripts need to be whitelisted explicitly — treat new ones as a security review."

**40.** "Evaluate on: does it solve our specific problem, is it actively maintained, what's the bundle size impact, how's the migration path, and what's the learning curve. For state management: I'd prototype the same feature in Zustand, Redux Toolkit, and Jotai. Present the team with the prototype code side by side and let them feel the ergonomics."

**41.** "I'd namespace all CSS classes for each A/B variant: `.variant-a-header`, `.variant-b-header`. Or use CSS custom properties for variant-specific values. Never share class names between variants. Use PostCSS to scope automatically. Test both variants simultaneously in the same browser using DevTools to ensure no leakage."

**42.** "I documented the exact steps to get a local dev environment running — including the non-obvious parts (environment variables, mock data setup, specific Node version). I added a `CONTRIBUTING.md`, created a Slack FAQ channel for common setup issues, and set up a pairing session for anyone in their first week."

**43.** "Use feature detection with Modernizr or manual `'feature' in navigator` checks. Provide a polyfill for critical features. Degrade gracefully for non-critical ones — e.g. if WebP is unsupported, serve JPEG. Always test in the target browser using BrowserStack. Communicate the support matrix to stakeholders upfront."

**44.** "Read the code first without judgment. Add logging and tests to understand behavior before changing anything. Profile with DevTools to find the actual bottleneck — don't assume. Then fix the bottleneck, measure, repeat. Resist the urge to rewrite everything — targeted fixes get results faster."

**45.** "Use BEM naming convention or CSS Modules to scope styles locally. Establish a shared token file (CSS custom properties) for colors, spacing, typography. No global resets beyond the token file. Code review rule: no styling without a scope. Lint for overly broad selectors."

**46.** "The requirement came from a real need — the existing system had a genuine pain point. But the solution was way more complex than necessary. I identified the core of the requirement and proposed a simpler implementation that addressed 90% of the need with 20% of the complexity. Sometimes showing the simpler version as a prototype is the most persuasive argument."

**47.** "For pure state transitions: snapshot tests with Testing Library + `user-event` to simulate the whole flow. For drag and drop or canvas: Playwright E2E tests with pointer events. For timed interactions: use fake timers (`vi.useFakeTimers()`). The goal is to test what the user does, not implementation details."

**48.** "I documented the risk clearly: 'If we proceed with this approach, here's what will fail under X load condition.' I quantified it where possible. I offered two options: a safer approach with a longer timeline, or a faster approach with a defined mitigation plan. Then I let the stakeholder make the decision with full information."

**49.** "Establish clear ownership. Each team owns their components in their repo. The shell app imports from each team's published package (npm or module federation). For shared components: a separate design system package that both teams contribute to via PR with a dedicated maintainer. Conflicts get resolved in design system PR review."

**50.** "A user reported that a date field was showing 'Invalid Date' for them. I investigated and found the bug was actually triggered by a combination of timezone offset + a server returning dates without timezone info — which affected a significant percentage of users in UTC+5.5 and beyond. The systemic fix was to enforce ISO 8601 with explicit UTC offset from the API."

**51.** "Map the current stack and identify which components/patterns are framework-specific vs utility CSS. Create a visual inventory. Migrate one page or section at a time to the new framework in a parallel branch. Use `@layer` CSS cascade layers to have both frameworks coexist during migration. Define a 'done' milestone per section so you can ship incrementally."

**52.** "Use a service like Sentry (errors) and Datadog or New Relic (performance). Set up `window.onerror`, `unhandledrejection`, and `PerformanceObserver` as the instrumentation layer. Define alerting thresholds: error rate > 0.1% on critical flows triggers PagerDuty. Weekly review of p95 performance by page."

**53.** "Feature-first: each top-level folder is a domain feature (`auth`, `dashboard`, `billing`). Inside each: `components`, `hooks`, `api`, `utils`. Shared stuff goes in a `shared` folder at the root. `pages` (or `app` in Next.js) is purely routing — components live in their feature folder. This keeps related code together and prevents the `components` folder from becoming a junk drawer."

**54.** "I was implementing a page transition animation. First I tried CSS transitions between routes — clunky because unmounting components remove DOM immediately. Switched to Framer Motion's `AnimatePresence` to animate exit states. Key decision: only animate opacity and transform, never layout properties, to keep it at 60fps."

**55.** "Start with proper code splitting — every route lazy loaded. Then: image optimization (next/image or explicit width/height + WebP). Remove render-blocking scripts (async/defer all third-party). Preconnect to critical third-party origins. Use a CDN. Measure after each step. The first three usually get you from 8s to under 3s."

**56.** "I shipped a reordered tab flow on a settings page that broke keyboard navigation — the tab order no longer matched the visual order. I found it from a user complaint, confirmed it with VoiceOver, and fixed it by reordering the DOM to match visual order and removing the `tabindex` values that were forcing the wrong sequence."

**57.** "Use `allowJs: true` and `checkJs: true` first — you get type checking without changing file extensions. Then rename files to `.ts`/`.tsx` one by one, starting with utilities and working toward UI components. Use `// @ts-ignore` sparingly as a short-term escape hatch. Set a team norm: any file you touch in a PR must be fully typed before merge."

**58.** "I implemented code splitting for a route that had a lot of infrequently used features. Bundle size improved significantly, but users who did use those features experienced a noticeable loading delay on first visit that they hadn't before. The fix was to add prefetching on route hover, but it was a good reminder that splitting has a latency cost you need to account for."

**59.** "I don't make decisions for the next 3 years — I make decisions that are easy to reverse in 3 years. Small modules over large ones. Standard patterns over clever abstractions. Third-party libraries for solved problems. Document the 'why' so future maintainers understand the tradeoffs that were made, not just the outcome."

**60.** "A user reported a slow filter operation. My gut said 'debounce it.' But I added a performance trace first. The actual bottleneck was not the input rate — it was a `filter + sort` chain running on 50,000 records synchronously on the main thread. The right fix was moving it to a Web Worker, which cut the time by 90%."

---

## FAANG TAGGED — 40 Answers

**1.** Use React DevTools Profiler: record a session, look at the flame graph. Components that re-render without their bar color indicating a prop/state change are victims of parent re-renders. Fix each type: (1) Parent re-renders with new object/array props → `useMemo` the prop or `React.memo` the child. (2) Context consumers that re-render on unrelated context changes → split context. (3) Missing `useCallback` on function props → add `useCallback`. (4) `key` prop changing → stabilize keys to non-index values.

**2.** The bottleneck at 1M concurrent users is not your frontend code — it's the data delivery layer. The WebSocket server or SSE endpoint will be the first to break. Fix: use a pub/sub layer (Redis Pub/Sub) to fan out score updates to edge servers. Use CDN-level SSE delivery. On the frontend: clients connect to the nearest edge node, not origin. For each client: only subscribe to scores they're viewing. Throttle updates to max 1/second per score regardless of update frequency.

**3.** In order of impact: (1) LCP — find the largest element (likely hero image), optimize it: WebP, preload, correct dimensions. (2) Render-blocking resources — move scripts to bottom or add async/defer, inline critical CSS. (3) Unused JavaScript — code split, tree shake. (4) CLS — add explicit size to images, reserve space for dynamic content. (5) TTFB — enable compression, move to CDN, reduce server response time. Measure after each fix, don't batch.

**4.** Pipeline: DNS resolution → TCP connection → TLS handshake → HTTP request → server sends HTML bytes → browser parses HTML (DOM construction), pauses at render-blocking scripts → downloads CSS → CSSOM construction → Render Tree = DOM + CSSOM → Layout (geometry calculation) → Paint (pixel drawing) → Composite (layers to screen). Optimization opportunities: reduce DNS (preconnect), eliminate render-blocking (async/defer), minimize CSS (no unused rules), compress HTML, use HTTP/2, defer non-critical JS, inline critical CSS, use resource hints.

**5.** Use CRDTs (Yjs/Automerge) or Operational Transformation. Each user's keystroke creates an operation with a unique ID, user ID, and Lamport clock timestamp. Operations are applied locally immediately (optimistic), broadcast via WebSocket, and the CRDT merges them conflict-free. Cursor positions are broadcast as ephemeral state (not persisted). Undo/redo is per-user, handled by the CRDT library. Presence (who's editing) is tracked in a separate shared awareness protocol.

**6.** JS and rendering share the main thread. The event loop processes one task at a time. A long JS task (> 50ms) blocks the rendering pipeline — the browser can't update the screen between JS tasks. Example: `while(Date.now() - start < 200) {}` in a `click` handler blocks the next paint, causing a dropped frame. The browser queues a paint task but can't execute it until the JS task completes. Fix: break long tasks with `setTimeout(fn, 0)` or `scheduler.postTask`, or use Web Workers for computation.

**7.** On write: apply the change locally (optimistic UI). Store the previous state as a rollback snapshot. Send mutation to server. On success: clear snapshot, optionally reconcile with server response. On failure: restore snapshot and show an error. For cache invalidation: use query tags (`['posts', id]`) and invalidate them on mutation. For optimistic reads of invalidated data: use SWR's `mutate` with the optimistic value until revalidation completes.

**8.** Dynamic import every route: `const Page = lazy(() => import('./pages/Page'))`. Group related routes into shared chunks with `webpackChunkName`. Use a manifest to preload likely-next chunks on link hover. For 300 routes: you'll have \~30-50 meaningful chunks. Initial bundle contains: React runtime, router, shell layout, auth check. Absolute minimum: \~30KB gzipped for React alone. Keep business logic out of the initial chunk entirely.

**9.** Single source of truth: design tokens in a JSON/YAML file with semantic naming (`color.brand.primary`, `font.size.base`). Build-time transform (Style Dictionary) outputs CSS custom properties per theme (`data-theme="customerA"`). Customer themes override only the custom properties, not the component styles. Custom fonts: loaded per tenant via `@font-face` injected at runtime. Layout variants: exposed as variant props on components, not separate components.

**10.** Use a virtualization library that supports dynamic heights (TanStack Virtual). Implement `measureElement` to measure each rendered item and cache its height. Estimate heights before measurement (e.g. 60px default). Calculate total scroll height as sum of all estimated heights, updating as actual heights are measured. Keep a `Map<index, height>` to avoid re-measuring. On scroll: binary search for the start index using accumulated heights. Reuse DOM nodes for off-screen items.

**11.** Each cursor has: user ID, color, position (x, y), name. Positions broadcast via WebSocket at 50-100ms intervals. On receive: use CSS transform to animate smoothly using `transition: transform 0.1s linear`. Batch updates: one `requestAnimationFrame` per frame, apply all received positions at once. For text editors: cursor position is a doc index, converted to screen position via the editor's coordinate system. Throttle sends, interpolate receives for smoothness.

**12.** Complete surface: (1) XSS: avoid `dangerouslySetInnerHTML`, sanitize user content with DOMPurify. (2) CSRF: SameSite=Strict cookies, CSRF tokens for state-changing requests. (3) Clickjacking: `X-Frame-Options: DENY`. (4) Sensitive data in URL: no tokens in query params. (5) Token storage: in-memory or httpOnly cookie, never localStorage. (6) Third-party scripts: subresource integrity (SRI) hashes. (7) CSP: strict policy with nonces. (8) Prototype pollution: `Object.create(null)` for lookup maps. (9) Dependency vulnerabilities: `npm audit` in CI. (10) HTTPS: enforce, HSTS header.

**13.** WebSocket or SSE for price streaming. Never render a price without showing its age. If age > 3s: show a "refreshing" indicator. If connection lost: disable buy/sell buttons, show "data unavailable" state — never show a stale price that could be acted on. Optimistic locking on trade submission: include the price timestamp in the request; server rejects if price has changed. Implement a dead man's switch: if no price update for 5s, treat as connection failure.

**14.** Use a shared event bus (BroadcastChannel or a dedicated pub/sub service). Each micro-frontend subscribes to events it cares about. For shared state: a singleton module exposed via a shared scope in Module Federation (e.g. an auth store). Each MFE imports the singleton — they all reference the same instance in memory. For server state: each MFE uses the same React Query client instance from the shared scope.

**15.** Level 0 (no JS): server renders complete HTML, forms work via POST, navigation works via `<a>` tags. Level 1 (basic JS): enhance forms with fetch, add client-side validation. Level 2 (full JS): add interactivity, animations, real-time updates. Use `<noscript>` for critical fallbacks. Use `type="module"` + `nomodule` for progressive JS loading. Test at each level.

**16.** Use a custom `PerformanceObserver` to record `mark` and `measure` for each component's render. Use Sentry or Datadog's custom metric API to send: render times as histogram data, component name as a tag, route as a tag. For interactions: `PerformanceObserver` for `event` entries (INP). For API latency: `PerformanceObserver` for `resource` entries filtered to your API domain. Aggregate at p50/p75/p95 per component per page per user cohort.

**17.** Render each chart in a Web Worker using `OffscreenCanvas`. Transfer the canvas to the worker via `transferControlToOffscreen()`. Each worker renders its chart independently. Alternatively: use WebGL-based charting (like Apache ECharts in WebGL mode) which renders all charts on the GPU. For charts that must be on the main thread: use `requestIdleCallback` to schedule renders during idle time and prioritize visible charts.

**18.** Use a context stack. The app maintains a `ShortcutContext` stack. When a modal opens, it pushes a new context with its shortcuts; when it closes, it pops. The top context has highest priority. On keydown: check contexts from top to bottom, the first matching handler wins and stops propagation. Each context is a `Map<shortcut, handler>`. Components register shortcuts on mount and deregister on unmount.

**19.** GPU-only animation: only `transform` and `opacity`. Use `will-change: transform` on animating elements to pre-promote them to compositor layers. Reduce number of animated elements: animate a container, not individual items. Use CSS animations over JS-driven animations (avoids main thread). For particle effects or canvas: use WebGL. Test on a real low-end device (e.g. a mid-range Android) — DevTools CPU throttle is not the same.

**20.** Client-side for prefix search on moderate datasets: use a Trie data structure for O(k) lookup where k is query length. For 500k records: load a compressed index (prefix → IDs) into memory (\~10-20MB), serve it from a CDN. For full-text search: use Fuse.js for fuzzy search on smaller subsets, or WebAssembly-compiled Tantivy/MiniSearch for larger ones. For instant feel: show results immediately from cache while fetching fresh results in the background.

**21.** SSR: user-specific, SEO-critical, frequently changing (e.g. user profile page, search results). SSG: content that's the same for everyone and changes infrequently (e.g. marketing pages, docs). ISR: content that changes occasionally but needs to be SEO-indexed and doesn't need to be per-user (e.g. product pages, blog posts — revalidate every hour). CSR: behind-auth dashboard, highly interactive, no SEO requirement (e.g. analytics dashboard, trading UI).

**22.** Both architectures use the same component library (shared npm package). The SSR pages use Next.js `getServerSideProps` / `getStaticProps`. The SPA pages use `useEffect` + `fetch`. The router differentiates: routes with `ssr: true` are rendered server-side, others are client-only. This is Next.js's default behavior — you just choose per-page whether to export a data fetching function or not.

**23.** Figma Variables → Figma Tokens plugin exports JSON → GitHub Actions runs Style Dictionary → outputs CSS custom properties (web), Swift color constants (iOS), Kotlin color constants (Android). PR automatically opens in each platform's repo with the token diff. Designers approve the Figma change, which triggers the pipeline. No manual handoff.

**24.** Use a discriminated union type for the form schema: `type Field = TextField | NumberField | SelectField`. Each variant has `type` as the discriminant. The form library infers the value type from the field type at compile time. Validation is typed to the field's value type. If you add a new field type and forget to handle it in a switch, TypeScript's exhaustiveness check catches it.

**25.** Optimistic rendering: show the data immediately from cache. Show a subtle "loading" state in the corner rather than blocking the UI. Use stale-while-revalidate: serve cached data instantly, fetch fresh data in background. If fresh data differs, smoothly transition (don't flash). For user actions: queue them locally and show confirmation immediately. Retry failed actions in the background.

**26.** React Fiber is a reimplementation of React's core reconciliation algorithm. Instead of a recursive synchronous process, Fiber models the component tree as a linked list of "fiber nodes." Each node represents a unit of work. Fiber can pause, resume, and prioritize work across frames. This enables concurrent features: `useTransition` can mark a state update as low-priority, letting React yield to higher-priority updates (like user input) mid-reconciliation. For component design: avoid side effects during render, because render may be interrupted and restarted.

**27.** Deploy new assets to CDN (content-hashed filenames). Do not replace old hashed assets — they must coexist. Update only the HTML entry point to reference new asset hashes. For rollback: redeploy previous HTML entry point. Old hashed assets are already on the CDN. The HTML is the only file that changes between versions and has a short TTL (no-cache). CDN cache for hashed assets is effectively permanent (immutable). 50 edge nodes all serve the same hashed assets — no coordination needed.

**28.** Create a custom renderer using `react-reconciler`. Implement the host config: `createInstance`, `appendChildToContainer`, `prepareUpdate`, `commitUpdate`, `removeChild`. Your renderer maps React component props to Canvas 2D draw calls or WebGL commands. Examples of real custom renderers: `react-three-fiber` (Three.js), `react-pdf` (PDFKit), `ink` (terminal). The reconciler handles the diffing and lifecycle; you handle only the rendering primitives.

**29.** Use a content script (injected into the page) for DOM manipulation. Keep the footprint minimal — no global CSS resets, namespace all class names (`ext-myextension-button`). Use a Shadow DOM for the injected UI to fully isolate styles. For performance: lazy-load the extension's UI code only when activated. Communicate between content script and background service worker via `chrome.runtime.sendMessage`. Use MutationObserver to react to page changes without polling.

**30.** WCAG 2.2 AA requires: 4.5:1 color contrast (3:1 for large text), all interactive elements keyboard accessible with visible focus indicators, no content that flashes > 3 times/second, all images have alt text, all form inputs have associated labels, error messages identify the field and describe the fix, no time limits that can't be extended, focus management in modals/dialogs, `prefers-reduced-motion` respected. Use axe-core for automated testing (catches \~40% of issues). Manual testing with VoiceOver + keyboard navigation for the rest.

**31.** Common leaks: event listeners added in `useEffect` without cleanup, closures holding references to large objects, detached DOM nodes held by variables, `setInterval` not cleared. Detection in production: use `window.performance.memory.usedJSHeapSize` tracked over time. In dev: Chrome DevTools Memory → Heap Snapshot before and after interaction → filter for "Detached DOM nodes" and check their `@Object` retaining path to find the leak. Use WeakRef and WeakMap for caches that shouldn't prevent GC.

**32.** Each tab needs to be a "subscriber" to a shared balance state. Options: (1) `localStorage` event listener — one tab writes the balance, others receive `storage` events. (2) `BroadcastChannel` — more reliable, works without localStorage writes. (3) `SharedWorker` — a single worker process shared across tabs, manages the authoritative state. For a banking app: use SharedWorker + a server-sent heartbeat. If the SharedWorker loses connection: all tabs show a "reconnecting" banner and disable financial operations.

**33.** Translation strings: lazy load per-locale JSON bundles. Use `React.Suspense` to show a loading state while the bundle loads. For RTL: apply `dir="rtl"` to `<html>` and use CSS logical properties throughout (`padding-inline-start` not `padding-left`). For dynamic content (user-entered, server-provided): escape and pass through the translation system. For 50 languages: a fallback chain (e.g. `pt-BR → pt → en`) ensures no missing strings are ever shown as keys.

**34.** Use CSS Modules — class names are hashed at build time (`Button_root_a1b2c3`), making collisions impossible. Or use a strict BEM methodology with component-level prefixing enforced by a linter rule. Publish a shared CSS custom properties file for tokens — all teams import this, but no component styles bleed out. Run a CSS conflict detection tool in CI (like `stylelint`) that errors on global selectors.

**35.** Use a service worker with a network-first strategy for API calls. IndexedDB for local data persistence. On any write operation (form submit, data change): write to IndexedDB first, then attempt network sync. Service worker intercepts failed network requests and queues them in IndexedDB. On `sync` event (Background Sync API): drain the queue. For conflict resolution: present a merge UI if server data changed since the last offline edit.

**36.** Take a baseline screenshot of each component in Storybook on the default branch. On every PR, render the same stories and diff pixel-by-pixel using Chromatic or Playwright + `pixelmatch`. To eliminate false positives: ignore subpixel rendering differences (threshold 0.1%), skip known-flaky components (e.g. components with animations or dynamic dates), run tests 3 times and only fail on consistent diffs. A component that genuinely changed passes if a developer approves the new screenshot as the new baseline.

**37.** Client-side: use a `submitting` ref to gate form submission — set true on submit, reset on response. `ref` not state, to prevent re-render race. Add `disabled` to submit button when submitting. Generate a client-side idempotency key (UUID) and include it in the request header. Server deduplicates by idempotency key and returns the cached response for duplicates. For backend throttle (429): show a user-friendly "Please wait X seconds" message and auto-retry.

**38.** Wrap the target component in a HOC that adds performance marks: `performance.mark('ComponentName-start')` before render, `performance.measure('ComponentName', 'ComponentName-start')` in `useEffect`. Expose a `onMeasure(name, duration)` prop so the parent can collect metrics. Use `PerformanceObserver` to collect `measure` entries globally and send to analytics. This is zero-overhead in production if you conditionally add marks only in development or when `window.perfMode` is enabled.

**39.** Each user has a cursor (x, y), a selection state, and a "presence" status. Use a CRDT for document state (Yjs). Use a separate awareness protocol (built into Yjs) for ephemeral cursor state. The awareness state is not persisted — it's broadcast to all connected users on change. On the client: render other users' cursors as absolutely positioned elements with their name and color. For 1000 users: only broadcast cursor updates to users viewing the same canvas region (server-side spatial partitioning).

**40.** Each team deploys their section as a Module Federation remote. The shell app loads remotes at runtime via dynamic `import()`. Teams set their own deployment cadence. To prevent one team's deploy from breaking another's: use a compatibility contract (versioned interface for each remote). The shell loads the latest compatible version of each remote. For zero-downtime: blue-green deploy each remote separately. The shell's HTML is deployed last, atomically switching to point to new remote URLs only after all remotes are verified healthy.
