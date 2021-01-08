history.onpushstate = (e) => {
  console.log('onpushstate', e)
}

history.onreplacestate = (e) => {
  console.log('onreplacestate', e)
}

window.addEventListener('popstate', (e) => {
  console.log('popstate', e)
})