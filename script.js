/*Welcome to the script file! Your 1st time here, you should update
  the BASIC INFO section to include your name and website/social 
  media link (if desired). Most of the time, you will just come
  here to update the POSTS ARRAY. However, you can also edit or
  add your own scripts to do whatever you like!*/

//TABLE OF CONTENTS
// 1. Basic Info
// 2. Posts Array
// 3. Creating HTML Sections to Be Inserted (Header, Footer, etc)
// 4. Inserting the Sections Into our Actual HTML Pages

//-----------------------------

//==[ 1. BASIC INFO ]==

let blogName = "bombylls";
let authorName = "bee wertheimer";
let authorLink = ""; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)

//-----------------------------

//==[ 2. POSTS ARRAY ]==

/*Each time you make a new post, add the filepath here at the top of postsArray.
  This will cause all the right links to appear and work.
  NOTE: It's important to follow this exact naming convention, because the scripts
  below are expecting it ( 'posts/YYYY-MM-DD-Title-of-Your-Post.html', ). You can
  alter the scripts if you want to use a different naming convention*/
/*UPDATE: as of version 1.3, you may omit the date if you would like. But if you
  use a date it must still follow that format.*/

let postsArray = [
  [
    "posts/2025-02-10-thoughts-on-blue-velvet.html",
    encodeURI("thoughts on blue velvet"),
  ],
  [
    "posts/2025-01-09-why-does-everyone-love-ttt.html",
    encodeURI("why does everyone love tomorrow, and tomorrow, and tomorrow?"),
  ],
  [
    "posts/2025-01-08-what-it-means-to-be-the-player-in-nso.html",
    encodeURI("what it means to be the player in needy streamer overload"),
  ],
  [
    "posts/2025-01-07-why-is-jenny-holzer-hiding-things-from-us.html",
    encodeURI("why is jenny holzer hiding things from us?"),
  ],
  ["posts/2025-01-06-hello-world.html", encodeURI("hello world!")],
];

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

/*CAUTION!! BEGINNING OF MORE ADVANCED SECTION!
  For default functionality, you DO NOT have to touch anything beyond this point.
  Things get more complicated here, so if you are unfamiliar with Javascript,
  your site may break. That's okay though, you can always paste back in the code
  from the Zonelets starter files :) */

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//==[ 3. GENERATING THE HTML SECTIONS TO BE INSERTED ]==

let url = window.location.pathname;

//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen.
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

//Check if you are in posts (if so, the links will have to go up a directory)
let relativePath = ".";
if (url.includes("posts/")) {
  relativePath = "..";
}

//Generate the Header HTML, a series of list items containing links.
//let headerHTML = '<ul> <li><a href="' + relativePath + '/index.html">Home</a></li>' +
//'<li><a href="' + relativePath + '/archive.html">Archive</a></li>' +
//'<li><a href="' + relativePath + '/about.html">About</a></li> </ul>';

let fontselectionHTML = 
'<link rel="preconnect" href="https://fonts.googleapis.com">' + 
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' + 
'<link href="https://fonts.googleapis.com/css2?family=Oldenburg&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">';

let headerHTML =
  '<div class="headercontainer">' +
  '<a href="https://bombylls.com"><img class="headerimage" src="logo.png"></img></a>' +
  '<div class="headerbuttons">' +
  '<a href="https://bombylls.com" style="text-decoration:none"> games </a>' +
  '<br>' +
  '<a href="https://bombylls.com/writing" style="text-decoration:none"> writing </a>' +
  "<br>" +
  '<a href="https://bombylls.com/about" style="text-decoration:none">  about  </a>' +
  "</div>" +
  "</div>";

//Generate the Footer HTML, which uses the variables defined in the BASIC INFO section above to list info about the site.
//Note: feel free to remove the references to Zonelets and Neocities! Just be careful not to delete any necessary HTML closing tags or other syntax.
//let footerHTML = "<hr><p>" + blogName + " is written by <a href='" + authorLink + "'>" + authorName + "</a>, built with <a href='https://zonelets.net/'>Zonelets</a>, and hosted by <a href='https://neocities.org/'>Neocities!</a></p>";
let footerHTML =
  '<div class="footercontainer">' +
  '<div class="footer">' +
  "this website was handmade using html and css. find me on " +
  '<a class="footer" href="https://bsky.app/profile/bombylls.com" target="_blank">bluesky</a> ' +
  " and " +
  '<a class="footer" href="https://bombylls.itch.io/" target="_blank">itch</a>.' +
  "<br>" +
  "email me at beewertheimer at gmail dot com" +
  "</div>";

//To do the following stuff, we want to know where we are in the posts array (if we're currently on a post page).
let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf("posts/"));
//Depending on the web server settings (Or something?), the browser url may or may not have ".html" at the end. If not, we must add it back in to match the posts array. (12-19-2022 fix)
if (!currentFilename.endsWith(".html")) {
  currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if (postsArray[i][0] === currentFilename) {
    currentIndex = i;
  }
}

//Convert the post url to readable post name. E.g. changes "2020-10-10-My-First-Post.html" to "My First Post"
//Or pass along the "special characters" version of the title if one exists
function formatPostTitle(i) {
  // Check if there is an alternate post title
  if (postsArray[i].length > 1) {
    //Remember how we had to use encodeURI for special characters up above? Now we use decodeURI to get them back.
    return decodeURI(postsArray[i][1]);
  } else {
    //If there is no alternate post title, check if the post uses the date format or not, and return the proper title
    if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
      return postsArray[i][0].slice(17, -5).replace(/-/g, " ");
    } else {
      return postsArray[i][0].slice(6, -5).replace(/-/g, " ");
    }
  }
}

//Get the current post title and date (if we are on a post page)
let currentPostTitle = "";
let niceDate = "";
if (currentIndex > -1) {
  currentPostTitle = formatPostTitle(currentIndex);
  //Generate the "nice to read" version of date
  if (postDateFormat.test(postsArray[currentIndex][0].slice(6, 17))) {
    let monthSlice = postsArray[currentIndex][0].slice(11, 13);
    let month = "";
    if (monthSlice === "01") {
      month = "Jan";
    } else if (monthSlice === "02") {
      month = "Feb";
    } else if (monthSlice === "03") {
      month = "Mar";
    } else if (monthSlice === "04") {
      month = "Apr";
    } else if (monthSlice === "05") {
      month = "May";
    } else if (monthSlice === "06") {
      month = "Jun";
    } else if (monthSlice === "07") {
      month = "Jul";
    } else if (monthSlice === "08") {
      month = "Aug";
    } else if (monthSlice === "09") {
      month = "Sep";
    } else if (monthSlice === "10") {
      month = "Oct";
    } else if (monthSlice === "11") {
      month = "Nov";
    } else if (monthSlice === "12") {
      month = "Dec";
    }
    niceDate =
      postsArray[currentIndex][0].slice(14, 16) +
      " " +
      month +
      ", " +
      postsArray[currentIndex][0].slice(6, 10);
  }
}

//Generate the Post List HTML, which will be shown on the "Archive" page.

function formatPostLink(i) {
  let postTitle_i = "";
  if (postsArray[i].length > 1) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
    if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
      postTitle_i = postsArray[i][0].slice(17, -5).replace(/-/g, " ");
    } else {
      postTitle_i = postsArray[i][0].slice(6, -5).replace(/-/g, " ");
    }
  }
  if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
    return (
      '<li><a href="' +
      relativePath +
      "/" +
      postsArray[i][0] +
      '">' +
      postsArray[i][0].slice(6, 16) +
      " \u00BB " +
      postTitle_i +
      "</a></li>"
    );
  } else {
    return (
      '<li><a href="' +
      relativePath +
      "/" +
      postsArray[i][0] +
      '">' +
      postTitle_i +
      "</a></li>"
    );
  }
}

let postListHTML = "<ul>";
for (let i = 0; i < postsArray.length; i++) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";

//Generate the Recent Post List HTML, which can be shown on the home page (or wherever you want!)
let recentPostsCutoff = 3; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let recentPostListHTML = "<h1>recent posts</h1><ul>";
let numberOfRecentPosts = Math.min(recentPostsCutoff, postsArray.length);
for (let i = 0; i < numberOfRecentPosts; i++) {
  recentPostListHTML += formatPostLink(i);
}
/*If you've written more posts than can fit in the Recent Posts List,
  then we'll add a link to the archive so readers can find the rest of
  your wonderful posts and be filled with knowledge.*/
if (postsArray.length > recentPostsCutoff) {
  recentPostListHTML +=
    '<li class="moreposts"><a href=' +
    relativePath +
    "/blog.html>\u00BB more posts</a></li></ul>";
} else {
  recentPostListHTML += "</ul>";
}

//Generate the Next and Previous Post Links HTML
let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

/*If you're on the newest blog post, there's no point to
 a "Next Post" link, right? And vice versa with the oldest 
 post! That's what the following code handles.*/
if (postsArray.length < 2) {
  nextprevHTML = '<a href="' + relativePath;
} else if (currentIndex === 0) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    '/index.html">home</a> | <a href="' +
    relativePath +
    "/" +
    prevlink +
    '">previous post \u00BB</a>';
} else if (currentIndex === postsArray.length - 1) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    "/" +
    nextlink +
    '">\u00AB next post</a> | <a href="' +
    relativePath +
    '/index.html">home</a>';
} else if (0 < currentIndex && currentIndex < postsArray.length - 1) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    "/" +
    nextlink +
    '">\u00AB next post</a> | <a href="' +
    relativePath +
    '/index.html">home</a> | <a href="' +
    relativePath +
    "/" +
    prevlink +
    '">previous post \u00BB</a>';
}

//-----------------------------

//==[ 4. INSERTING THE SECTIONS INTO OUR ACTUAL HTML PAGES ]==

/*Here we check if each relevant div exists. If so, we inject the correct HTML!
  NOTE: All of these sections are optional to use on any given page. For example, if there's 
  one particular blog post where we don't want the footer to appear, 
  we simply don't put a <div id="footer"> on that page.*/

if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}
if (document.getElementById("fontselection")) {
  document.getElementById("fontselection").innerHTML = fontselectionHTML;
}
if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogTitle;
}
if (document.getElementById("postTitleH1")) {
  document.getElementById("postTitleH1").innerHTML = currentPostTitle;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}

//Dynamically set the HTML <title> tag from the postTitle variable we created earlier
//The <title> tag content is what shows up on browser tabs
if (document.title === "Blog Post") {
  document.title = currentPostTitle;
}
