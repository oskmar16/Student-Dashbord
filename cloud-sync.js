(function(){
  "use strict";
  const CONFIG_KEY="min-hverdag-supabase-config";
  const DEFAULT_URL="https://pmgsmftbwvcjpoqpmqan.supabase.co";
  let client=null,user=null,channel=null,saveTimer=null,applyingRemote=false;

  const el=id=>document.getElementById(id);
  const readConfig=()=>{try{return {url:DEFAULT_URL,...JSON.parse(localStorage.getItem(CONFIG_KEY)||"{}")};}catch{return {url:DEFAULT_URL};}};
  const status=(message,type="")=>{const node=el("cloud-status");if(node){node.textContent=message;node.className=`cloud-status ${type}`.trim();}const footer=el("storage-status");if(footer)footer.textContent=user?"Synkronisert med Supabase":"Data lagres trygt lokalt";};
  const validConfig=config=>Boolean(config.url&&config.key&&window.supabase?.createClient);

  function showConfiguration(){const config=readConfig();el("supabase-url").value=config.url||DEFAULT_URL;el("supabase-key").value=config.key||"";updateAuthUi();}
  function saveConfiguration(){const config={url:el("supabase-url").value.trim(),key:el("supabase-key").value.trim()};if(config.key)localStorage.setItem(CONFIG_KEY,JSON.stringify(config));else localStorage.removeItem(CONFIG_KEY);initialize();}
  function updateAuthUi(){el("cloud-logout").hidden=!user;el("cloud-login").hidden=Boolean(user);if(user)status(`Tilkoblet som ${user.email||"innlogget bruker"}`,"online");else if(validConfig(readConfig()))status("Klar for innlogging. Data lagres lokalt frem til du logger inn.");else status("Ikke konfigurert – dataene er fortsatt trygge lokalt.");}

  async function initialize(){
    const config=readConfig();
    if(!validConfig(config)){client=null;user=null;updateAuthUi();return;}
    if(channel&&client)await client.removeChannel(channel);
    client=window.supabase.createClient(config.url,config.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    const {data:{session}}=await client.auth.getSession();user=session?.user||null;updateAuthUi();
    client.auth.onAuthStateChange((_event,session)=>{user=session?.user||null;updateAuthUi();if(user)setTimeout(syncInitial,0);});
    if(user)await syncInitial();
  }

  async function syncInitial(){
    if(!client||!user)return;
    status("Synkroniserer…","online");
    const {data:row,error}=await client.from("dashboard_state").select("payload,updated_at").eq("user_id",user.id).maybeSingle();
    if(error){status(`Kunne ikke synkronisere: ${error.message}`,"error");return;}
    if(row?.payload){applyingRemote=true;window.applyCloudDashboard(row.payload);applyingRemote=false;status("Synkronisert med Supabase","online");}
    else await pushNow();
    subscribe();
  }

  function subscribe(){
    if(!client||!user)return;
    if(channel)client.removeChannel(channel);
    channel=client.channel(`dashboard-${user.id}`).on("postgres_changes",{event:"UPDATE",schema:"public",table:"dashboard_state",filter:`user_id=eq.${user.id}`},payload=>{if(payload.new?.payload){applyingRemote=true;window.applyCloudDashboard(payload.new.payload);applyingRemote=false;status("Oppdatert fra en annen enhet","online");}}).subscribe();
  }

  async function pushNow(){
    if(!client||!user||applyingRemote)return;
    const payload=window.getDashboardData();
    const {error}=await client.from("dashboard_state").upsert({user_id:user.id,payload,updated_at:new Date().toISOString()},{onConflict:"user_id"});
    if(error)status(`Kunne ikke lagre i skyen: ${error.message}`,"error");else status("Alle endringer er synkronisert","online");
  }
  function schedule(){if(!client||!user||applyingRemote)return;clearTimeout(saveTimer);saveTimer=setTimeout(pushNow,600);}

  async function login(){
    saveConfiguration();const email=el("sync-email").value.trim();
    if(!validConfig(readConfig())){status("Lim inn prosjektadresse og publishable key først.","error");return;}
    if(!email){status("Skriv inn e-postadressen din.","error");return;}
    if(!client)await initialize();
    const redirectTo=location.protocol.startsWith("http")?`${location.origin}${location.pathname}`:undefined;
    const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:redirectTo,shouldCreateUser:true}});
    if(error)status(`Innlogging feilet: ${error.message}`,"error");else status("Innloggingslenken er sendt. Åpne den på denne enheten.","online");
  }
  async function logout(){if(client)await client.auth.signOut();user=null;updateAuthUi();}

  window.cloudDashboard={schedule,showConfiguration,saveConfiguration,pushNow};
  el("cloud-login").addEventListener("click",login);el("cloud-logout").addEventListener("click",logout);
  initialize().catch(error=>status(`Synkronisering feilet: ${error.message}`,"error"));
})();
