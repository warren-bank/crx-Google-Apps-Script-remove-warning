// ==UserScript==
// @name Google Apps Script
// @description Remove warning: "This application was created by another user, not by Google."
// @version 0.1.0
// @match *://script.google.com/macros/*
// @icon https://script.google.com/favicon.ico
// ==/UserScript==

// -----------------------------------------------------------------------------
// https://issuetracker.google.com/issues/63521070
//
//   status:
//   =======
//   - won't fix
//   - intended behavior
//
//   summary:
//   ========
//   - warning always displays on free accounts
//   - warning is only removed from paid accounts
//
//   notes:
//   ======
//   - one possible workaround is to wrap the web app in (yet another) iframe
//   - this technique only works with published /exec releases, but not /dev
// -----------------------------------------------------------------------------

// https://www.chromium.org/developers/design-documents/user-scripts

var payload = function(){
  var warning = document.querySelector('#warning.warning-bar')

  if (warning) warning.style.display = 'none'
}

var inject_payload = function(){
  var inline, script, head

  inline = document.createTextNode(
    '(' + payload.toString() + ')()'
  )

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

if (document.readyState === 'complete'){
  inject_payload()
}
else {
  document.onreadystatechange = function(){
    if (document.readyState === 'complete'){
      inject_payload()
    }
  }
}
