var dateFormat=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,a=/[^-+\dA-Z]/g,m=function(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t};return function(d,n,r){var y=dateFormat;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(d)||/\d/.test(d)||(n=d,d=void 0),d=d?new Date(d):new Date,isNaN(d))throw SyntaxError("invalid date");n=String(y.masks[n]||n||y.masks["default"]),"UTC:"==n.slice(0,4)&&(n=n.slice(4),r=!0);var s=r?"getUTC":"get",i=d[s+"Date"](),o=d[s+"Day"](),u=d[s+"Month"](),M=d[s+"FullYear"](),l=d[s+"Hours"](),T=d[s+"Minutes"](),h=d[s+"Seconds"](),c=d[s+"Milliseconds"](),g=r?0:d.getTimezoneOffset(),S={d:i,dd:m(i),ddd:y.i18n.dayNames[o],dddd:y.i18n.dayNames[o+7],m:u+1,mm:m(u+1),mmm:y.i18n.monthNames[u],mmmm:y.i18n.monthNames[u+12],yy:String(M).slice(2),yyyy:M,h:l%12||12,hh:m(l%12||12),H:l,HH:m(l),M:T,MM:m(T),s:h,ss:m(h),l:m(c,3),L:m(c>99?Math.round(c/10):c),t:12>l?"a":"p",tt:12>l?"am":"pm",T:12>l?"A":"P",TT:12>l?"AM":"PM",Z:r?"UTC":(String(d).match(e)||[""]).pop().replace(a,""),o:(g>0?"-":"+")+m(100*Math.floor(Math.abs(g)/60)+Math.abs(g)%60,4),S:["th","st","nd","rd"][i%10>3?0:(i%100-i%10!=10)*i%10]};return n.replace(t,function(t){return t in S?S[t]:t.slice(1,t.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.format=function(t,e){return dateFormat(this,t,e)};
function back(){location.href="/"}function loading(){$("#done").css("display","none"),$("#loading").css("display","block")}function done(){$("#done").css("display","block"),$("#loading").css("display","none")}function closeDialog(){$("#shadow-mask").css("display","none"),$("#image-upload-dialog").css("display","none")}function uploadImage(){function e(){var e,t=i.val();t.lastIndexOf("\\")?e=t.lastIndexOf("\\")+1:t.lastIndexOf("/")&&(e=t.lastIndexOf("/")+1),n.val(t.slice(e,t.length))}function t(){0!=n.val().length?a.hasClass("is-focused")||a.addClass("is-focused"):a.hasClass("is-focused")&&a.removeClass("is-focused")}$("#shadow-mask").css("display","block"),$("#image-upload-dialog").css("display","block");var a=$("#file_input_text_div"),i=$("#file_input"),n=$("#file_input_text");i.change(e),i.change(t)}function afterEditorPage(e){editor=ace.edit("editor"),editor.getSession().setUseWrapMode(!0),editor.$blockScrolling=1/0,sync(e)}function sync(e){socket||(socket=io()),e?$.get("cache?id="+e,function(e){e.date?$("#date").val(e.date):$("#date").val((new Date).format("yyyy-mm-dd HH:MM:ss")),$("#title").val(e.title),$("#tags").val(e.tags),$("#categories").val(e.categories),$("#date").parent().addClass("is-dirty"),$("#tags").parent().addClass("is-dirty"),$("#categories").parent().addClass("is-dirty"),editor.setValue(e.content,1)}):socket.on("init",function(e){e.date?$("#date").val(e.date):$("#date").val((new Date).format("yyyy-mm-dd HH:MM:ss")),$("#title").val(e.title),$("#tags").val(e.tags),$("#categories").val(e.categories),$("#date").parent().addClass("is-dirty"),$("#tags").parent().addClass("is-dirty"),$("#categories").parent().addClass("is-dirty"),editor.setValue(e.content,1)}),$("#title").on("change paste keyup",function(){loading();var t=$("#title").val(),a=$("#date").val(),i=$("#tags").val(),n=$("#categories").val(),o=TextSync.sync(editor.getValue()),s={title:t,date:a,tags:i,categories:n,data:o,key:e};socket.emit("syncText",s),socket.on("syncEnd",function(e){done()})}),editor.on("change",function(t){loading();var a=$("#title").val(),i=$("#date").val(),n=$("#tags").val(),o=$("#categories").val(),s=TextSync.sync(editor.getValue()),l={title:a,date:i,tags:n,categories:o,data:s,key:e};socket.emit("syncText",l),socket.on("syncEnd",function(e){done()})})}function insertImage(){var e=$("#file_input")[0].files[0];if(e){var t=new FormData;t.append("file",e),$("#upload-image-btn").prop("disabled",!0),$.ajax({type:"POST",url:"/editor/image",data:t,xhr:function(){var e=new window.XMLHttpRequest;return e.upload.addEventListener("progress",function(e){if(e.lengthComputable){var t=e.loaded/e.total;t=parseInt(100*t+""),$("#upload-image-btn").text(t+"%")}},!1),e},success:function(e){$("#upload-image-btn").prop("disabled",!1),$("#upload-image-btn").text("Insert Image"),editor.insert("\n![]("+e+")"),closeDialog()},cache:!1,contentType:!1,processData:!1}),$("#file_input").val(null),$("#file_input_text").val(null)}else alert("Please add image!")}function insertLink(){editor.insert("[]()")}function formatBlod(){var e=editor.selection.getRange(),t="**"+editor.getSelectedText()+"**";editor.session.replace(e,t)}function formatItalic(){var e=editor.selection.getRange(),t="*"+editor.getSelectedText()+"*";editor.session.replace(e,t)}function formatListNumbered(){var e=editor.selection.getRange(),t=editor.getSelectedText(),a=t.split("\n");t="";for(var i=1;i<=a.length;i++)t+=i+". "+a[i-1]+"\n";editor.session.replace(e,t)}function formatListBulleted(){var e=editor.selection.getRange(),t=editor.getSelectedText(),a=t.split("\n");t="";for(var i=1;i<=a.length;i++)t+="* "+a[i-1]+"\n";editor.session.replace(e,t)}function formatQuote(){var e=editor.selection.getRange(),t=editor.getSelectedText(),a=t.split("\n");t="";for(var i=1;i<=a.length;i++)t+="> "+a[i-1]+"\n";editor.session.replace(e,t)}function formatCode(){var e=editor.selection.getRange(),t="\n```\n"+editor.getSelectedText()+"\n```";editor.session.replace(e,t)}function redo(){editor.session.getUndoManager().redo(!0)}function undo(){editor.session.getUndoManager().undo(!0)}function preview(){if("block"===$("#editor").css("display")){var e=marked(editor.getValue());$("#preview").html(e),$("#preview").find("pre").each(function(e,t){hljs.highlightBlock(t)}),$("#editor").hide(),$("#preview").show(),$("#visibility").text("visibility_off")}else $("#editor").show(),$("#preview").hide(),$("#visibility").text("visibility")}function publish(){var e=$("#title").val(),t=editor.getValue(),a=$("#date").val(),i=$("#tags").val(),n=$("#key").val(),o=$("#categories").val();TextSync.sync(editor.getValue());a||(a=(new Date).format("yyyy-mm-dd HH:MM:ss"));var s={title:e,date:a,tags:i,categories:o,content:t,key:n};socket.emit("publish",s),socket.on("publishEnd",function(e){loading(),location.href="/"})}var editor=null,socket=null;
function afterIndexPage(){window.screen.width<=768&&($("#left").css("left","-48%"),$("#main").click(function(){$("#left").animate({left:"-48%"},60)}),$("#left").click(function(){$("#left").animate({left:"-48%"},60)})),$("#menu-btn").click(function(){console.log($("#left").css("left")),"0px"===$("#left").css("left")?window.screen.width<=768?$("#left").animate({left:"-48%"},60):$("#left").animate({left:"-14%"},60):$("#left").animate({left:"0"},60)}),$(".left-menu-row").click(function(){$(".left-menu-row").removeClass("active"),$(this).addClass("active")})}function afterPostPage(){$(document).ready(function(){$(".collapsible-header-right button").click(function(t){t.stopPropagation()})}),$(".collapsible-header").each(function(t){var e=!1,o=$(this).attr("id"),n=$(this).attr("key");$(this).click(function(){$(".collapsible-body").each(function(){$(this).hide()}),e?e=!1:($.get("post?id="+n,function(t){var e="#article-"+o+" .collapsible-body .markdown-body";t=marked(t),$(e).html(""),$(e).append(t),$("#article-"+o+" .collapsible-body").slideDown(60,"linear",function(){$(e).find("pre").each(function(t,e){hljs.highlightBlock(e)})})}),e=!0)})})}function exit(){location.href="/logout"}function toast(t,e,o,n){var i=document.querySelector("#snackbar"),a={message:t,timeout:e,actionHandler:o,actionText:n};i.MaterialSnackbar.showSnackbar(a)}function edit(t,e){stopEvent(t),location.href="/editor?id="+e}function stopEvent(t){return t?void(t.stopPropagation?t.stopPropagation():t.cancelBubble=!0):void alert("Your current browser isn't supported.")}function publish0(t,e){var o=$("#workspace").text();$("#article-"+e).remove(),$.get("editor/publish?workspace="+o+"&id="+t,function(t){toast(t,1e3)})}function stash(t,e){var o=$("#workspace").text();$("#article-"+e).remove(),$.get("editor/stash?workspace="+o+"&id="+t,function(t){toast(t,1e3)})}function _delete0(t,e,o){stopEvent(t),confirm("This article will be deleted permanently!")&&($("#article-"+o).remove(),$.get("editor/delete0?id="+e))}function _delete(t,e){var o=$("#workspace").text();$("#article-"+e).remove(),$.get("editor/delete?workspace="+o+"&id="+t,function(t){toast(t,1e3)})}function posts(){$.get("page/posts",function(t){$("#workspace").text("posts"),$("#main").html(t),componentHandler.upgradeDom()})}function drafts(){$.get("page/drafts",function(t){$("#workspace").text("drafts"),$("#main").html(t),componentHandler.upgradeDom()})}function trash(){$.get("page/trash",function(t){$("#workspace").text("trash"),$("#main").html(t),componentHandler.upgradeDom()})}function generate(){startLoading(),$.get("generate",function(t){stopLoad(),toast(t,2e3)})}function deploy(){startLoading(),$.get("deploy",function(t){stopLoad(),toast(t,2e3)})}function startLoading(){$("#progress").css("visibility","visible")}function stopLoad(){$("#progress").css("visibility","hidden")}function help(){window.open("https://github.com/tajpure/hexo-editor/wiki","_blank")}
!function(e){function t(){return"Markdown.mk_block( "+uneval(this.toString())+", "+uneval(this.trailing)+", "+uneval(this.lineNumber)+" )"}function r(){var e=require("util");return"Markdown.mk_block( "+e.inspect(this.toString())+", "+e.inspect(this.trailing)+", "+e.inspect(this.lineNumber)+" )"}function n(e){for(var t=0,r=-1;-1!==(r=e.indexOf("\n",r+1));)t++;return t}function i(e,t){function r(e){this.len_after=e,this.name="close_"+t}var n=e+"_state",i="strong"==e?"em_state":"strong_state";return function(l,s){if(this[n][0]==t)return this[n].shift(),[l.length,new r(l.length-t.length)];var a=this[i].slice(),c=this[n].slice();this[n].unshift(t);var o=this.processInline(l.substr(t.length)),h=o[o.length-1];this[n].shift();if(h instanceof r){o.pop();var u=l.length-h.len_after;return[u,[e].concat(o)]}return this[i]=a,this[n]=c,[t.length,t]}}function l(e){for(var t=e.split(""),r=[""],n=!1;t.length;){var i=t.shift();switch(i){case" ":n?r[r.length-1]+=i:r.push("");break;case"'":case'"':n=!n;break;case"\\":i=t.shift();default:r[r.length-1]+=i}}return r}function s(e){return d(e)&&e.length>1&&"object"==typeof e[1]&&!d(e[1])?e[1]:void 0}function c(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(e){if("string"==typeof e)return c(e);var t=e.shift(),r={},n=[];for(!e.length||"object"!=typeof e[0]||e[0]instanceof Array||(r=e.shift());e.length;)n.push(o(e.shift()));var i="";for(var l in r)i+=" "+l+'="'+c(r[l])+'"';return"img"==t||"br"==t||"hr"==t?"<"+t+i+"/>":"<"+t+i+">"+n.join("")+"</"+t+">"}function h(e,t,r){var n;r=r||{};var i=e.slice(0);"function"==typeof r.preprocessTreeNode&&(i=r.preprocessTreeNode(i,t));var l=s(i);if(l){i[1]={};for(n in l)i[1][n]=l[n];l=i[1]}if("string"==typeof i)return i;switch(i[0]){case"header":i[0]="h"+i[1].level,delete i[1].level;break;case"bulletlist":i[0]="ul";break;case"numberlist":i[0]="ol";break;case"listitem":i[0]="li";break;case"para":i[0]="p";break;case"markdown":i[0]="html",l&&delete l.references;break;case"code_block":i[0]="pre",n=l?2:1;var a=["code"];a.push.apply(a,i.splice(n,i.length-n)),i[n]=a;break;case"inlinecode":i[0]="code";break;case"img":i[1].src=i[1].href,delete i[1].href;break;case"linebreak":i[0]="br";break;case"link":i[0]="a";break;case"link_ref":i[0]="a";var c=t[l.ref];if(!c)return l.original;delete l.ref,l.href=c.href,c.title&&(l.title=c.title),delete l.original;break;case"img_ref":i[0]="img";var c=t[l.ref];if(!c)return l.original;delete l.ref,l.src=c.href,c.title&&(l.title=c.title),delete l.original}if(n=1,l){for(var o in i[1]){n=2;break}1===n&&i.splice(n,1)}for(;n<i.length;++n)i[n]=h(i[n],t,r);return i}function u(e){for(var t=s(e)?2:1;t<e.length;)"string"==typeof e[t]?t+1<e.length&&"string"==typeof e[t+1]?e[t]+=e.splice(t+1,1)[0]:++t:(u(e[t]),++t)}var f=e.Markdown=function(e){switch(typeof e){case"undefined":this.dialect=f.dialects.Gruber;break;case"object":this.dialect=e;break;default:if(!(e in f.dialects))throw new Error("Unknown Markdown dialect '"+String(e)+"'");this.dialect=f.dialects[e]}this.em_state=[],this.strong_state=[],this.debug_indent=""};e.parse=function(e,t){var r=new f(t);return r.toTree(e)},e.toHTML=function(t,r,n){var i=e.toHTMLTree(t,r,n);return e.renderJsonML(i)},e.toHTMLTree=function(e,t,r){"string"==typeof e&&(e=this.parse(e,t));var n=s(e),i={};n&&n.references&&(i=n.references);var l=h(e,i,r);return u(l),l};var g=f.mk_block=function(e,n,i){1==arguments.length&&(n="\n\n");var l=new String(e);return l.trailing=n,l.inspect=r,l.toSource=t,void 0!=i&&(l.lineNumber=i),l};f.prototype.split_blocks=function(e,t){e=e.replace(/(\r\n|\n|\r)/g,"\n");var r,i=/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,l=[],s=1;for(null!=(r=/^(\s*\n)/.exec(e))&&(s+=n(r[0]),i.lastIndex=r[0].length);null!==(r=i.exec(e));)"\n#"==r[2]&&(r[2]="\n",i.lastIndex--),l.push(g(r[1],r[2],s)),s+=n(r[0]);return l},f.prototype.processBlock=function(e,t){var r=this.dialect.block,n=r.__order__;if("__call__"in r)return r.__call__.call(this,e,t);for(var i=0;i<n.length;i++){var l=r[n[i]].call(this,e,t);if(l)return(!d(l)||l.length>0&&!d(l[0]))&&this.debug(n[i],"didn't return a proper array"),l}return[]},f.prototype.processInline=function(e){return this.dialect.inline.__call__.call(this,String(e))},f.prototype.toTree=function(e,t){var r=e instanceof Array?e:this.split_blocks(e),n=this.tree;try{for(this.tree=t||this.tree||["markdown"];r.length;){var i=this.processBlock(r.shift(),r);i.length&&this.tree.push.apply(this.tree,i)}return this.tree}finally{t&&(this.tree=n)}},f.prototype.debug=function(){var e=Array.prototype.slice.call(arguments);e.unshift(this.debug_indent),"undefined"!=typeof print&&print.apply(print,e),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log.apply(null,e)},f.prototype.loop_re_over_block=function(e,t,r){for(var n,i=t.valueOf();i.length&&null!=(n=e.exec(i));)i=i.substr(n[0].length),r.call(this,n);return i},f.dialects={},f.dialects.Gruber={block:{atxHeader:function(e,t){var r=e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(r){var n=["header",{level:r[1].length}];return Array.prototype.push.apply(n,this.processInline(r[2])),r[0].length<e.length&&t.unshift(g(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[n]}},setextHeader:function(e,t){var r=e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(r){var n="="===r[2]?1:2,i=["header",{level:n},r[1]];return r[0].length<e.length&&t.unshift(g(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[i]}},code:function(e,t){var r=[],n=/^(?: {0,3}\t| {4})(.*)\n?/;if(e.match(n)){e:for(;;){var i=this.loop_re_over_block(n,e.valueOf(),function(e){r.push(e[1])});if(i.length){t.unshift(g(i,e.trailing));break e}if(!t.length)break e;if(!t[0].match(n))break e;r.push(e.trailing.replace(/[^\n]/g,"").substring(2)),e=t.shift()}return[["code_block",r.join("\n")]]}},horizRule:function(e,t){var r=e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(r){var n=[["hr"]];return r[1]&&n.unshift.apply(n,this.processBlock(r[1],[])),r[3]&&t.unshift(g(r[3])),n}},lists:function(){function e(e){return new RegExp("(?:^("+c+"{0,"+e+"} {0,3})("+l+")\\s+)|(^"+c+"{0,"+(e-1)+"}[ ]{0,4})")}function t(e){return e.replace(/ {0,3}\t/g,"    ")}function r(e,t,r,n){if(t)return void e.push(["para"].concat(r));var i=e[e.length-1]instanceof Array&&"para"==e[e.length-1][0]?e[e.length-1]:e;n&&e.length>1&&r.unshift(n);for(var l=0;l<r.length;l++){var s=r[l],a="string"==typeof s;a&&i.length>1&&"string"==typeof i[i.length-1]?i[i.length-1]+=s:i.push(s)}}function n(e,t){for(var r=new RegExp("^("+c+"{"+e+"}.*?\\n?)*$"),n=new RegExp("^"+c+"{"+e+"}","gm"),i=[];t.length>0&&r.exec(t[0]);){var l=t.shift(),s=l.replace(n,"");i.push(g(s,l.trailing,l.lineNumber))}return i}function i(e,t,r){var n=e.list,i=n[n.length-1];if(!(i[1]instanceof Array&&"para"==i[1][0]))if(t+1==r.length)i.push(["para"].concat(i.splice(1,i.length-1)));else{var l=i.pop();i.push(["para"].concat(i.splice(1,i.length-1)),l)}}var l="[*+-]|\\d+\\.",s=/[*+-]/,a=new RegExp("^( {0,3})("+l+")[ 	]+"),c="(?: {0,3}\\t| {4})";return function(l,c){function o(e){var t=s.exec(e[2])?["bulletlist"]:["numberlist"];return p.push({list:t,indent:e[1]}),t}var h=l.match(a);if(h){for(var u,f,p=[],g=o(h),d=!1,_=[p[0].list];;){for(var b=l.split(/(?=\n)/),k="",m=0;m<b.length;m++){var y="",w=b[m].replace(/^\n/,function(e){return y=e,""}),$=e(p.length);if(h=w.match($),void 0!==h[1]){k.length&&(r(u,d,this.processInline(k),y),d=!1,k=""),h[1]=t(h[1]);var M=Math.floor(h[1].length/4)+1;if(M>p.length)g=o(h),u.push(g),u=g[1]=["listitem"];else{var x=!1;for(f=0;f<p.length;f++)if(p[f].indent==h[1]){g=p[f].list,p.splice(f+1,p.length-(f+1)),x=!0;break}x||(M++,M<=p.length?(p.splice(M,p.length-M),g=p[M-1].list):(g=o(h),u.push(g))),u=["listitem"],g.push(u)}y=""}w.length>h[0].length&&(k+=y+w.substr(h[0].length))}k.length&&(r(u,d,this.processInline(k),y),d=!1,k="");var S=n(p.length,c);S.length>0&&(v(p,i,this),u.push.apply(u,this.toTree(S,[])));var A=c[0]&&c[0].valueOf()||"";if(!A.match(a)&&!A.match(/^ /))break;l=c.shift();var I=this.dialect.block.horizRule(l,c);if(I){_.push.apply(_,I);break}v(p,i,this),d=!0}return _}}}(),blockquote:function(e,t){if(e.match(/^>/m)){var r=[];if(">"!=e[0]){for(var n=e.split(/\n/),i=[],l=e.lineNumber;n.length&&">"!=n[0][0];)i.push(n.shift()),l++;var a=g(i.join("\n"),"\n",e.lineNumber);r.push.apply(r,this.processBlock(a,[])),e=g(n.join("\n"),e.trailing,l)}for(;t.length&&">"==t[0][0];){var c=t.shift();e=g(e+e.trailing+c,c.trailing,e.lineNumber)}var o=e.replace(/^> ?/gm,""),h=(this.tree,this.toTree(o,["blockquote"])),u=s(h);return u&&u.references&&(delete u.references,_(u)&&h.splice(1,1)),r.push(h),r}},referenceDefn:function(e,t){var r=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(e.match(r)){s(this.tree)||this.tree.splice(1,0,{});var n=s(this.tree);void 0===n.references&&(n.references={});var i=this.loop_re_over_block(r,e,function(e){e[2]&&"<"==e[2][0]&&">"==e[2][e[2].length-1]&&(e[2]=e[2].substring(1,e[2].length-1));var t=n.references[e[1].toLowerCase()]={href:e[2]};void 0!==e[4]?t.title=e[4]:void 0!==e[5]&&(t.title=e[5])});return i.length&&t.unshift(g(i,e.trailing)),[]}},para:function(e,t){return[["para"].concat(this.processInline(e))]}}},f.dialects.Gruber.inline={__oneElement__:function(e,t,r){var n,i;t=t||this.dialect.inline.__patterns__;var l=new RegExp("([\\s\\S]*?)("+(t.source||t)+")");if(n=l.exec(e),!n)return[e.length,e];if(n[1])return[n[1].length,n[1]];var i;return n[2]in this.dialect.inline&&(i=this.dialect.inline[n[2]].call(this,e.substr(n.index),n,r||[])),i=i||[n[2].length,n[2]]},__call__:function(e,t){function r(e){"string"==typeof e&&"string"==typeof i[i.length-1]?i[i.length-1]+=e:i.push(e)}for(var n,i=[];e.length>0;)n=this.dialect.inline.__oneElement__.call(this,e,t,i),e=e.substr(n.shift()),v(n,r);return i},"]":function(){},"}":function(){},__escape__:/^\\[\\`\*_{}\[\]()#\+.!\-]/,"\\":function(e){return this.dialect.inline.__escape__.exec(e)?[2,e.charAt(1)]:[1,"\\"]},"![":function(e){var t=e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(t){t[2]&&"<"==t[2][0]&&">"==t[2][t[2].length-1]&&(t[2]=t[2].substring(1,t[2].length-1)),t[2]=this.dialect.inline.__call__.call(this,t[2],/\\/)[0];var r={alt:t[1],href:t[2]||""};return void 0!==t[4]&&(r.title=t[4]),[t[0].length,["img",r]]}return t=e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),t?[t[0].length,["img_ref",{alt:t[1],ref:t[2].toLowerCase(),original:t[0]}]]:[2,"!["]},"[":function b(e){var t=String(e),r=f.DialectHelpers.inline_until_char.call(this,e.substr(1),"]");if(!r)return[1,"["];var b,n,i=1+r[0],l=r[1];e=e.substr(i);var s=e.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(s){var a=s[1];if(i+=s[0].length,a&&"<"==a[0]&&">"==a[a.length-1]&&(a=a.substring(1,a.length-1)),!s[3])for(var c=1,o=0;o<a.length;o++)switch(a[o]){case"(":c++;break;case")":0==--c&&(i-=a.length-o,a=a.substring(0,o))}return a=this.dialect.inline.__call__.call(this,a,/\\/)[0],n={href:a||""},void 0!==s[3]&&(n.title=s[3]),b=["link",n].concat(l),[i,b]}return s=e.match(/^\s*\[(.*?)\]/),s?(i+=s[0].length,n={ref:(s[1]||String(l)).toLowerCase(),original:t.substr(0,i)},b=["link_ref",n].concat(l),[i,b]):1==l.length&&"string"==typeof l[0]?(n={ref:l[0].toLowerCase(),original:t.substr(0,i)},b=["link_ref",n,l[0]],[i,b]):[1,"["]},"<":function(e){var t;return null!=(t=e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))?t[3]?[t[0].length,["link",{href:"mailto:"+t[3]},t[3]]]:"mailto"==t[2]?[t[0].length,["link",{href:t[1]},t[1].substr("mailto:".length)]]:[t[0].length,["link",{href:t[1]},t[1]]]:[1,"<"]},"`":function(e){var t=e.match(/(`+)(([\s\S]*?)\1)/);return t&&t[2]?[t[1].length+t[2].length,["inlinecode",t[3]]]:[1,"`"]},"  \n":function(e){return[3,["linebreak"]]}},f.dialects.Gruber.inline["**"]=i("strong","**"),f.dialects.Gruber.inline.__=i("strong","__"),f.dialects.Gruber.inline["*"]=i("em","*"),f.dialects.Gruber.inline._=i("em","_"),f.buildBlockOrder=function(e){var t=[];for(var r in e)"__order__"!=r&&"__call__"!=r&&t.push(r);e.__order__=t},f.buildInlinePatterns=function(e){var t=[];for(var r in e)if(!r.match(/^__.*__$/)){var n=r.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");t.push(1==r.length?n:"(?:"+n+")")}t=t.join("|"),e.__patterns__=t;var i=e.__call__;e.__call__=function(e,r){return void 0!=r?i.call(this,e,r):i.call(this,e,t)}},f.DialectHelpers={},f.DialectHelpers.inline_until_char=function(e,t){for(var r=0,n=[];;){if(e.charAt(r)==t)return r++,[r,n];if(r>=e.length)return null;var i=this.dialect.inline.__oneElement__.call(this,e.substr(r));r+=i[0],n.push.apply(n,i.slice(1))}},f.subclassDialect=function(e){function t(){}function r(){}return t.prototype=e.block,r.prototype=e.inline,{block:new t,inline:new r}},f.buildBlockOrder(f.dialects.Gruber.block),f.buildInlinePatterns(f.dialects.Gruber.inline),f.dialects.Maruku=f.subclassDialect(f.dialects.Gruber),f.dialects.Maruku.processMetaHash=function(e){for(var t=l(e),r={},n=0;n<t.length;++n)if(/^#/.test(t[n]))r.id=t[n].substring(1);else if(/^\./.test(t[n]))r["class"]?r["class"]=r["class"]+t[n].replace(/./," "):r["class"]=t[n].substring(1);else if(/\=/.test(t[n])){var i=t[n].split(/\=/);r[i[0]]=i[1]}return r},f.dialects.Maruku.block.document_meta=function(e,t){if(!(e.lineNumber>1)&&e.match(/^(?:\w+:.*\n)*\w+:.*$/)){s(this.tree)||this.tree.splice(1,0,{});var r=e.split(/\n/);for(p in r){var n=r[p].match(/(\w+):\s*(.*)$/),i=n[1].toLowerCase(),l=n[2];this.tree[1][i]=l}return[]}},f.dialects.Maruku.block.block_meta=function(e,t){var r=e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(r){var n,i=this.dialect.processMetaHash(r[2]);if(""===r[1]){var l=this.tree[this.tree.length-1];if(n=s(l),"string"==typeof l)return;n||(n={},l.splice(1,0,n));for(a in i)n[a]=i[a];return[]}var c=e.replace(/\n.*$/,""),o=this.processBlock(c,[]);n=s(o[0]),n||(n={},o[0].splice(1,0,n));for(a in i)n[a]=i[a];return o}},f.dialects.Maruku.block.definition_list=function(e,t){var r,n,i=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,l=["dl"];if(n=e.match(i)){for(var s=[e];t.length&&i.exec(t[0]);)s.push(t.shift());for(var a=0;a<s.length;++a){var n=s[a].match(i),c=n[1].replace(/\n$/,"").split(/\n/),o=n[2].split(/\n:\s+/);for(r=0;r<c.length;++r)l.push(["dt",c[r]]);for(r=0;r<o.length;++r)l.push(["dd"].concat(this.processInline(o[r].replace(/(\n)\s+/,"$1"))))}return[l]}},f.dialects.Maruku.block.table=function k(e,t){var r,n,i=function(e,t){t=t||"\\s",t.match(/^[\\|\[\]{}?*.+^$]$/)&&(t="\\"+t);for(var r,n=[],i=new RegExp("^((?:\\\\.|[^\\\\"+t+"])*)"+t+"(.*)");r=e.match(i);)n.push(r[1]),e=r[2];return n.push(e),n},l=/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,s=/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;if(n=e.match(l))n[3]=n[3].replace(/^\s*\|/gm,"");else if(!(n=e.match(s)))return;var k=["table",["thead",["tr"]],["tbody"]];n[2]=n[2].replace(/\|\s*$/,"").split("|");var a=[];for(v(n[2],function(e){e.match(/^\s*-+:\s*$/)?a.push({align:"right"}):e.match(/^\s*:-+\s*$/)?a.push({align:"left"}):e.match(/^\s*:-+:\s*$/)?a.push({align:"center"}):a.push({})}),n[1]=i(n[1].replace(/\|\s*$/,""),"|"),r=0;r<n[1].length;r++)k[1][1].push(["th",a[r]||{}].concat(this.processInline(n[1][r].trim())));return v(n[3].replace(/\|\s*$/gm,"").split("\n"),function(e){var t=["tr"];for(e=i(e,"|"),r=0;r<e.length;r++)t.push(["td",a[r]||{}].concat(this.processInline(e[r].trim())));k[2].push(t)},this),[k]},f.dialects.Maruku.inline["{:"]=function(e,t,r){if(!r.length)return[2,"{:"];var n=r[r.length-1];if("string"==typeof n)return[2,"{:"];var i=e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!i)return[2,"{:"];var l=this.dialect.processMetaHash(i[1]),a=s(n);a||(a={},n.splice(1,0,a));for(var c in l)a[c]=l[c];return[i[0].length,""]},f.dialects.Maruku.inline.__escape__=/^\\[\\`\*_{}\[\]()#\+.!\-|:]/,f.buildBlockOrder(f.dialects.Maruku.block),f.buildInlinePatterns(f.dialects.Maruku.inline);var v,d=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)};v=Array.prototype.forEach?function(e,t,r){return e.forEach(t,r)}:function(e,t,r){for(var n=0;n<e.length;n++)t.call(r||e,e[n],n,e)};var _=function(e){for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0};e.renderJsonML=function(e,t){t=t||{},t.root=t.root||!1;var r=[];if(t.root)r.push(o(e));else for(e.shift(),!e.length||"object"!=typeof e[0]||e[0]instanceof Array||e.shift();e.length;)r.push(o(e.shift()));return r.join("\n\n")}}(function(){return"undefined"==typeof exports?(window.markdown={},window.markdown):exports}());
(function(){"use strict";function n(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function t(n,t){return n<<t|n>>>32-t}function r(r,e,u,i,o,f){return n(t(n(n(e,r),n(i,f)),o),u)}function e(n,t,e,u,i,o,f){return r(t&e|~t&u,n,t,i,o,f)}function u(n,t,e,u,i,o,f){return r(t&u|e&~u,n,t,i,o,f)}function i(n,t,e,u,i,o,f){return r(t^e^u,n,t,i,o,f)}function o(n,t,e,u,i,o,f){return r(e^(t|~u),n,t,i,o,f)}function f(t,r){t[r>>5]|=128<<r%32,t[(r+64>>>9<<4)+14]=r;var f,c,a,h,s,l=1732584193,d=-271733879,v=-1732584194,g=271733878;for(f=0;f<t.length;f+=16)c=l,a=d,h=v,s=g,l=e(l,d,v,g,t[f],7,-680876936),g=e(g,l,d,v,t[f+1],12,-389564586),v=e(v,g,l,d,t[f+2],17,606105819),d=e(d,v,g,l,t[f+3],22,-1044525330),l=e(l,d,v,g,t[f+4],7,-176418897),g=e(g,l,d,v,t[f+5],12,1200080426),v=e(v,g,l,d,t[f+6],17,-1473231341),d=e(d,v,g,l,t[f+7],22,-45705983),l=e(l,d,v,g,t[f+8],7,1770035416),g=e(g,l,d,v,t[f+9],12,-1958414417),v=e(v,g,l,d,t[f+10],17,-42063),d=e(d,v,g,l,t[f+11],22,-1990404162),l=e(l,d,v,g,t[f+12],7,1804603682),g=e(g,l,d,v,t[f+13],12,-40341101),v=e(v,g,l,d,t[f+14],17,-1502002290),d=e(d,v,g,l,t[f+15],22,1236535329),l=u(l,d,v,g,t[f+1],5,-165796510),g=u(g,l,d,v,t[f+6],9,-1069501632),v=u(v,g,l,d,t[f+11],14,643717713),d=u(d,v,g,l,t[f],20,-373897302),l=u(l,d,v,g,t[f+5],5,-701558691),g=u(g,l,d,v,t[f+10],9,38016083),v=u(v,g,l,d,t[f+15],14,-660478335),d=u(d,v,g,l,t[f+4],20,-405537848),l=u(l,d,v,g,t[f+9],5,568446438),g=u(g,l,d,v,t[f+14],9,-1019803690),v=u(v,g,l,d,t[f+3],14,-187363961),d=u(d,v,g,l,t[f+8],20,1163531501),l=u(l,d,v,g,t[f+13],5,-1444681467),g=u(g,l,d,v,t[f+2],9,-51403784),v=u(v,g,l,d,t[f+7],14,1735328473),d=u(d,v,g,l,t[f+12],20,-1926607734),l=i(l,d,v,g,t[f+5],4,-378558),g=i(g,l,d,v,t[f+8],11,-2022574463),v=i(v,g,l,d,t[f+11],16,1839030562),d=i(d,v,g,l,t[f+14],23,-35309556),l=i(l,d,v,g,t[f+1],4,-1530992060),g=i(g,l,d,v,t[f+4],11,1272893353),v=i(v,g,l,d,t[f+7],16,-155497632),d=i(d,v,g,l,t[f+10],23,-1094730640),l=i(l,d,v,g,t[f+13],4,681279174),g=i(g,l,d,v,t[f],11,-358537222),v=i(v,g,l,d,t[f+3],16,-722521979),d=i(d,v,g,l,t[f+6],23,76029189),l=i(l,d,v,g,t[f+9],4,-640364487),g=i(g,l,d,v,t[f+12],11,-421815835),v=i(v,g,l,d,t[f+15],16,530742520),d=i(d,v,g,l,t[f+2],23,-995338651),l=o(l,d,v,g,t[f],6,-198630844),g=o(g,l,d,v,t[f+7],10,1126891415),v=o(v,g,l,d,t[f+14],15,-1416354905),d=o(d,v,g,l,t[f+5],21,-57434055),l=o(l,d,v,g,t[f+12],6,1700485571),g=o(g,l,d,v,t[f+3],10,-1894986606),v=o(v,g,l,d,t[f+10],15,-1051523),d=o(d,v,g,l,t[f+1],21,-2054922799),l=o(l,d,v,g,t[f+8],6,1873313359),g=o(g,l,d,v,t[f+15],10,-30611744),v=o(v,g,l,d,t[f+6],15,-1560198380),d=o(d,v,g,l,t[f+13],21,1309151649),l=o(l,d,v,g,t[f+4],6,-145523070),g=o(g,l,d,v,t[f+11],10,-1120210379),v=o(v,g,l,d,t[f+2],15,718787259),d=o(d,v,g,l,t[f+9],21,-343485551),l=n(l,c),d=n(d,a),v=n(v,h),g=n(g,s);return[l,d,v,g]}function c(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function a(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return c(f(a(n),8*n.length))}function s(n,t){var r,e,u=a(n),i=[],o=[];for(i[15]=o[15]=void 0,u.length>16&&(u=f(u,8*n.length)),r=0;16>r;r+=1)i[r]=909522486^u[r],o[r]=1549556828^u[r];return e=f(i.concat(a(t)),512+8*t.length),c(f(o.concat(e),640))}function l(n){var t,r,e="0123456789abcdef",u="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),u+=e.charAt(t>>>4&15)+e.charAt(15&t);return u}function d(n){return unescape(encodeURIComponent(n))}function v(n){return h(d(n))}function g(n){return l(v(n))}function p(n,t){return s(d(n),d(t))}function C(n,t){return l(p(n,t))}function m(n,t,r){return t?r?p(t,n):C(t,n):r?v(n):g(n)}this.TextSync={dist:null,ChunkSize:64,sync:function(n){var t=this.cmp(n,this.dist);return this.dist=n,t},toChunks:function(n){for(var t=new Array,r=0,e=0;r<n.length;r+=this.ChunkSize,e++){var u=n.slice(r,r+this.ChunkSize),i=k.checksum(u,!0),o=m(u);t[e]={id:e,r:i,s:o,data:u}}return t},cmp:function(n,t){for(var r=this.toChunks(n),e=[],u=[],i=0;i<r.length;i++)e[r[i].r]=r[i];if(t)for(var o=0;o<t.length;o++){var f=t.slice(o,o+this.ChunkSize),c=k.checksum(f);if(e[c]){var a=e[c],h=m(f);h===a.s&&(a.find=!0,a.pos=o,o=o+this.ChunkSize-1)}}for(var s in e){var l=e[s];l.find?u[l.id]={id:l.id,pos:l.pos,data:null}:u[l.id]={id:l.id,pos:null,data:l.data.toString("ascii")}}return u}};var k={last:null,checksum:function(n,t){var r=this.strToBuffer(n),e=r.length,u=Math.pow(2,64),i=0,o=0,f=this.last;if(f&&!t)i=(f.a-f.buffer[0]+r[e-1])%u,o=(f.b-e*f.buffer[0]+i)%u,f={buffer:r,a:i,b:o,s:i+u*o},this.last=f;else{for(var c=0;e>=c+1;c++)i+=r[c],o+=(e-c)*r[c];i%=u,o%=u,f={buffer:r,a:i,b:o,s:i+u*o}}return f.s},strToBuffer:function(n){for(var t=[],r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return t}};"function"==typeof define&&define.amd?define(function(){return m}):"object"==typeof module&&module.exports?module.exports=m:$.md5=m}).call(this);