
//  Tab Code UP!
chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
  for (let i = 0; i < tabs.length; i++) {
    // document.write(`<li>${tabs[i].url}</li>`);
    if(document.getElementById("lol") != null){
      var idPost=document.getElementById("lol").innerHTML += ` <li>${tabs[i].url}</li>`
  }
  }
});


//  Create Twitter Post
if(document.getElementById("TwitterPost") != null){
  var idPost=document.getElementById("TwitterPost").addEventListener("click" , myFunction)
}
function myFunction(){
  window.open("https://twitter.com/intent/tweet")
 
}

// Notion Page Creation

if(document.getElementById("notion") != null ){
  var getNotion = document.getElementById("notion").addEventListener("click", notionFunction)
}

function notionFunction(){
  window.open("https://notion.so/new")
}

if(document.getElementById("GetHelp") != null){
  var Help=document.getElementById("GetHelp").addEventListener("click" , getHelp)
}

function getHelp(){

}

if(document.getElementById("GmailInBox") != null){
  var GmailInbox= document.getElementById("GmailInBox").addEventListener("click", GmailInBox)
}

function GmailInBox(){
  window.open("https://mail.google.com/mail/u/0/")
}


if(document.getElementById("GithubRepo") != null){
  var GmailInbox= document.getElementById("GithubRepo").addEventListener("click", GithubRepo)
}


function GithubRepo(){
  window.open("https://github.com/new/")
}
function GetUrls()
{
chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++)
    {
      if(document.getElementById("lol") !=null){
        var BookMorks = document.getElementById("lol").innerHTML += "<a href='" + tabs[i].url + "' target='_blank'>" + "<b>" + tabs[i].title + "</b>" + "</a></br><button style=\"width:100%;height:30px;\" data-title=\""+tabs[i].title+"\" data-url=\""+tabs[i].url+"\">Bookmark above link</button>"
      }
        // document.write("<a href='" + tabs[i].url + "' target='_blank'>" + "<b>" + tabs[i].title + "</b>" + "</a></br><button style=\"width:100%;height:30px;\" data-title=\""+tabs[i].title+"\" data-url=\""+tabs[i].url+"\">Bookmark above link</button>");
    }
    var buttons = document.getElementsByTagName("button");
    for(var i=0; i<buttons.length; i++)
    {
        buttons[i].addEventListener('click',function(){addBookmark(this.getAttribute("data-url"), this.getAttribute("data-title"));})
    }
});
}
window.addEventListener("DOMContentLoaded", GetUrls());

var destFolder, bookmarkBar, finalMessage="";

chrome.bookmarks.getTree(findOrCreateDestinationFolder);

function findOrCreateDestinationFolder(rootNodes)
{
    var rootNode;
    if(rootNodes.length>0)
    {
        rootNode = rootNodes[0];
    }
    destFolder = findBookmarksFolder(rootNode, "Extension Bookmarks");
    if(!destFolder)
    {
        bookmarkBar = findBookmarksFolder(rootNode,"Bookmarks bar");
        chrome.bookmarks.create({parentId:bookmarkBar?bookmarkBar.id:"1",title:"Extension Bookmarks"}, function(bmk){
            destFolder=bmk;
            finalMessage += "Destination Folder created under Bookmarks bar.\n"
        });
    }
    else
    {
        finalMessage += "Destination Folder exists.\n"
    }
}

function findBookmarksFolder(rootNode, searchString)
{
    if(rootNode.url)
    {
        return null;
    }
    else if(rootNode.title.indexOf(searchString)>=0)
    {
        return rootNode;
    }
    for(var i=0; i<rootNode.children.length; i++)
    {
        var dest = findBookmarksFolder(rootNode.children[i], searchString);
        if(dest)
        {
            return dest;
        }
    }
    return null;
}

function addBookmark(bookmarkURL, bookmarktitle)
{
    if(destFolder)
    {
        chrome.bookmarks.create({title:bookmarktitle,parentId:destFolder.id,url:bookmarkURL});
        finalMessage += "Added bookmark.\n";
    }
    else
    {
        finalMessage += "Could not add bookmark.\n";
    }
    alert(finalMessage);
}

