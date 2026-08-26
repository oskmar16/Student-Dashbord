let deferredInstallPrompt=null;
const installButton=document.getElementById("install-app-btn");
if("serviceWorker" in navigator&&location.protocol!=="file:")window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(error=>console.warn("Service worker kunne ikke registreres",error)));
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstallPrompt=event;installButton.hidden=false;});
installButton?.addEventListener("click",async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;installButton.hidden=true;});
window.addEventListener("appinstalled",()=>{deferredInstallPrompt=null;installButton.hidden=true;});
