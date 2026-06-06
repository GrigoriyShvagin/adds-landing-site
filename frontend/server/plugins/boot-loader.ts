// Единственный загрузчик. Вставляется в <body> ДО #__nuxt, поэтому Vue его
// никогда не пересоздаёт — спиннер крутится непрерывно от первого кадра до того
// момента, как страница (вместе с картинками) полностью загрузится (window load).
// Никаких вторых лоадеров, никаких рывков от перезапуска анимации.
const LOADER = `
<div id="boot-loader">
  <img src="/logo-icon.png" alt="" />
  <div id="boot-loader-spinner"></div>
</div>
<style>
  #boot-loader{position:fixed;inset:0;z-index:99999;background:#1F0A4B;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;transition:opacity .4s ease}
  #boot-loader img{width:64px;height:auto;animation:bl-pulse 1.4s ease-in-out infinite}
  #boot-loader-spinner{width:32px;height:32px;border:3px solid rgba(255,255,255,.12);border-top-color:rgba(255,255,255,.7);border-radius:50%;animation:bl-spin .8s linear infinite}
  @keyframes bl-spin{to{transform:rotate(360deg)}}
  @keyframes bl-pulse{0%,100%{opacity:.55}50%{opacity:1}}
</style>
<script>(function(){function hide(){var e=document.getElementById('boot-loader');if(!e)return;e.style.opacity='0';setTimeout(function(){if(e)e.remove()},400)}if(document.readyState==='complete'){hide()}else{window.addEventListener('load',hide,{once:true})}setTimeout(hide,6000)})();</script>
`

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.bodyPrepend.push(LOADER)
  })
})
