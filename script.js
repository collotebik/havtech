var els=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){var o=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');o.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){o.observe(e)})}else{els.forEach(function(e){e.classList.add('on')})}
document.querySelectorAll('.row').forEach(function(x){var hv=matchMedia('(hover:hover)');function set(o){x.classList.toggle('open',o);x.setAttribute('aria-expanded',o)}
x.onclick=function(e){if(e.target.closest('a')||hv.matches)return;var o=!x.classList.contains('open');document.querySelectorAll('.row.open').forEach(function(y){y.classList.remove('open');y.setAttribute('aria-expanded','false')});set(o)};
x.onkeydown=function(e){if(e.target!==x)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();set(!x.classList.contains('open'))}};
x.onblur=function(){set(false)}});

(function(){var dw=document.getElementById('dw'),mb=document.getElementById('mb');function op(o){dw.hidden=!o;mb.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}mb.onclick=function(){op(dw.hidden)};dw.onclick=function(e){if(e.target===dw||e.target.closest('a')||e.target.closest('#dx'))op(false)};document.addEventListener('keydown',function(e){if(e.key==='Escape')op(false)})})();
document.querySelectorAll('.fq-q').forEach(function(b){b.onclick=function(){var it=b.parentNode,o=!it.classList.contains('open');document.querySelectorAll('.fi.open').forEach(function(x){x.classList.remove('open');x.firstChild.setAttribute('aria-expanded','false')});if(o){it.classList.add('open');b.setAttribute('aria-expanded','true')}}});
try{(function(){
var cv=document.getElementById('rb');if(!cv||!window.THREE)return;var hero=cv.parentNode,T=THREE,R;
try{R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
R.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));R.outputEncoding=T.sRGBEncoding;
var scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,100);cam.position.set(0,.2,6);cam.lookAt(0,0,0);
scene.add(new T.AmbientLight(0x9fd4d0,.55));var dl=new T.DirectionalLight(0xd9fff3,1.15);dl.position.set(-1.5,3,4);scene.add(dl);var rim=new T.PointLight(0x7de38b,2.4,5);rim.position.set(1.3,.8,2.2);scene.add(rim);scene.add(new T.HemisphereLight(0xd8fff4,0x061512,.5));
var root=new T.Group();scene.add(root);
function M(o){return new T.MeshStandardMaterial(o)}
/* dotted chassis textures */
var sz=512,cC=document.createElement('canvas'),cB=document.createElement('canvas');cC.width=cC.height=cB.width=cB.height=sz;
var xC=cC.getContext('2d'),xB=cB.getContext('2d');xC.fillStyle='#26363b';xC.fillRect(0,0,sz,sz);xB.fillStyle='#101c20';xB.fillRect(0,0,sz,sz);
for(var n=0;n<10000;n++){var x=Math.random()*sz,y=Math.random()*sz,r=.5+Math.random()*1.5,dk=Math.random()>.15;
xC.beginPath();xC.arc(x,y,r,0,Math.PI*2);xC.fillStyle=dk?'#122126':'#476166';xC.fill();xB.beginPath();xB.arc(x,y,r,0,Math.PI*2);xB.fillStyle=dk?'#050b0d':'#6f9390';xB.fill()}
var tC=new T.CanvasTexture(cC),tB=new T.CanvasTexture(cB);tC.encoding=T.sRGBEncoding;
[tC,tB].forEach(function(t){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(6,3)});
function chassis(){return M({color:'#25343a',map:tC,bumpMap:tB,bumpScale:.003,roughness:.28,metalness:.72,side:T.DoubleSide})}
/* contact shadow */
var sc=document.createElement('canvas');sc.width=sc.height=128;var sx=sc.getContext('2d'),gr=sx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(0,30,60,.55)');gr.addColorStop(1,'rgba(0,30,60,0)');sx.fillStyle=gr;sx.fillRect(0,0,128,128);
var shadow=new T.Mesh(new T.PlaneGeometry(1.9,.9),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-.79;root.add(shadow);
/* body */
var body=new T.Group();body.position.y=-.3;root.add(body);
body.add(new T.Mesh(new T.SphereGeometry(.43,64,64,0,Math.PI*2,Math.PI*.15,Math.PI*.85),chassis()));
var bev=new T.Mesh(new T.TorusGeometry(.235,.025,32,64),chassis());bev.position.y=.34;bev.rotation.x=Math.PI/2;body.add(bev);
var np=[[.1,-.05],[.215,-.05],[.28,.02],[.295,.045],[.27,.055],[.1,.055]].map(function(p){return new T.Vector2(p[0],p[1])});
var neck=new T.Mesh(new T.LatheGeometry(np,64),chassis());neck.position.y=.38;body.add(neck);
var head=new T.Group();head.position.y=.6;body.add(head);
head.add(new T.Mesh(new T.SphereGeometry(.28,64,64),M({color:'#111111',roughness:1,metalness:0})));
/* glowing glass screen */
var gu={color:{value:new T.Color('#7de38b')},power:{value:3.8},intensity:{value:1.35}};
head.add(new T.Mesh(new T.SphereGeometry(.3,64,64),new T.ShaderMaterial({uniforms:gu,transparent:true,blending:T.AdditiveBlending,depthWrite:false,
vertexShader:'varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vV=-mv.xyz;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*mv;}',
fragmentShader:'uniform vec3 color;uniform float power;uniform float intensity;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.0-max(dot(normalize(vV),normalize(vN)),0.0),power);gl_FragColor=vec4(color,f*intensity);}'})));
/* eyes */
var hp=[];for(var q=0;q<72;q++){var u=q/72*Math.PI*2,hx=16*Math.pow(Math.sin(u),3),hy=13*Math.cos(u)-5*Math.cos(2*u)-2*Math.cos(3*u)-Math.cos(4*u);hp.push(new T.Vector3(hx*.002,(hy+6)*.002,0))}
var heartCurve=new T.CatmullRomCurve3(hp,true),eyeMat=new T.MeshBasicMaterial({color:new T.Color('#d7ffe0')}),heartMat=new T.MeshBasicMaterial({color:'#7de38b'});eyeMat.toneMapped=false;heartMat.toneMapped=false;
function V3(x,y){return new T.Vector3(x,y,0)}
function half(sg){var w=.025,h=.035,r=.02,g=.005,p=new T.CurvePath();
p.add(new T.LineCurve3(V3(-w,sg*g),V3(-w,sg*(h-r))));p.add(new T.QuadraticBezierCurve3(V3(-w,sg*(h-r)),V3(-w,sg*h),V3(-w+r,sg*h)));
p.add(new T.LineCurve3(V3(-w+r,sg*h),V3(w-r,sg*h)));p.add(new T.QuadraticBezierCurve3(V3(w-r,sg*h),V3(w,sg*h),V3(w,sg*(h-r))));p.add(new T.LineCurve3(V3(w,sg*(h-r)),V3(w,sg*g)));return p}
var topP=half(1),botP=half(-1),eyes=[];
function mkEye(x,ry){var g=new T.Group();g.position.set(x,0,0);g.rotation.y=ry;g.scale.setScalar(1.1);
var he=new T.Mesh(new T.TubeGeometry(heartCurve,64,.0035,8,true),heartMat);he.visible=false;g.add(he);
var ng=new T.Group();ng.add(new T.Mesh(new T.TubeGeometry(topP,20,.0035,8,false),eyeMat));ng.add(new T.Mesh(new T.TubeGeometry(botP,20,.0035,8,false),eyeMat));g.add(ng);eyes.push({g:g,he:he,ng:ng});return g}
var face=new T.Group();face.position.set(0,-.02,.29);face.add(mkEye(-.07,-.2));face.add(mkEye(.07,.2));var smile=new T.Mesh(new T.TorusGeometry(.055,.006,10,24,Math.PI),new T.MeshBasicMaterial({color:'#7de38b',transparent:true,opacity:.85}));smile.rotation.z=Math.PI;smile.position.set(0,-.075,.012);face.add(smile);head.add(face);
/* ears with antennas */
var eb=M({color:'#33464b',roughness:.3,metalness:.7}),er=M({color:'#7de38b',roughness:.25,metalness:.6}),ec=M({color:'#18262b',roughness:.4,metalness:.6}),ab=M({color:'#718b8e',roughness:.3,metalness:.8}),as=M({color:'#9de6b0',roughness:.28,metalness:.65}),at=new T.MeshBasicMaterial({color:'#b9ffca'});
function ear(left){var d=left?-1:1,g=new T.Group();g.position.set(d*.29,0,0);g.scale.setScalar(1.3);
var a=new T.Mesh(new T.CylinderGeometry(.04,.04,.025,32),eb);a.rotation.z=Math.PI/2;g.add(a);
var b=new T.Mesh(new T.TorusGeometry(.032,.008,16,32),er);b.position.x=d*.012;b.rotation.z=Math.PI/2;g.add(b);
var c=new T.Mesh(new T.CylinderGeometry(.03,.03,.005,32),ec);c.position.x=d*.012;c.rotation.z=Math.PI/2;g.add(c);
var an=new T.Group();an.position.set(d*.015,.035,0);an.rotation.x=-.4;
var a1=new T.Mesh(new T.CylinderGeometry(.006,.008,.02,16),ab);a1.position.y=.01;an.add(a1);
var a2=new T.Mesh(new T.CylinderGeometry(.003,.003,.1,8),as);a2.position.y=.06;an.add(a2);
var a3=new T.Mesh(new T.SphereGeometry(.006,16,16),at);a3.position.y=.11;an.add(a3);g.add(an);return g}
head.add(ear(true));head.add(ear(false));
/* sizing: robot keeps its feet on the same line of the hero */
var vw=1;function resize(){var w=hero.clientWidth,h=hero.clientHeight;if(w<2||h<2)return;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
var vh=2*Math.tan(T.MathUtils.degToRad(cam.fov/2))*6;vw=vh*cam.aspect;var s=Math.min(1.1,vw/3.5)*1.05;root.scale.setScalar(s);root.position.y=.79*s-.237}
/* interaction */
var P={x:0,y:0,real:-1e9},loved=false,lt=0,ray=new T.Raycaster(),ndc=new T.Vector2();
function toNdc(e){var r=hero.getBoundingClientRect();return[(e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)]}
hero.addEventListener('pointermove',function(e){var p=toNdc(e);P.x=p[0];P.y=p[1];P.real=performance.now();ndc.set(p[0],p[1]);ray.setFromCamera(ndc,cam);hero.style.cursor=ray.intersectObject(body,true).length&&!e.target.closest('a,button')?'pointer':''});
hero.addEventListener('pointerdown',function(e){if(e.target.closest('a,button'))return;var p=toNdc(e);ndc.set(p[0],p[1]);ray.setFromCamera(ndc,cam);if(ray.intersectObject(body,true).length){loved=true;clearTimeout(lt);lt=setTimeout(function(){loved=false},2000)}});
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,vis=true,t=0,last=0,raf=0;
function lerp(a,b,k){return a+(b-a)*Math.min(1,k)}
function frame(dt){var now=performance.now(),idle=now-P.real>4000&&!reduced,tx=idle?Math.sin(t*.5)*.45:P.x,ty=idle?Math.sin(t*.7)*.12:P.y;
var maxX=vw/3.5;body.position.x=lerp(body.position.x,tx*maxX,.35*dt);var hv=Math.sin(t*1.2);body.position.y=-.14+hv*.05;root.rotation.z=Math.sin(t*.65)*.012;shadow.scale.setScalar(.9-hv*.08);shadow.material.opacity=.85-hv*.15;
var rx=tx-body.position.x/2.5,k1=10*dt,k2=20*dt;
body.rotation.y=lerp(body.rotation.y,-rx*.95,k1);body.rotation.x=lerp(body.rotation.x,-ty*.25,k1);body.rotation.z=lerp(body.rotation.z,-rx*.15,k1);
head.rotation.y=lerp(head.rotation.y,rx*1.8,k2);head.rotation.x=lerp(head.rotation.x,-ty*.3,k2);
var cyc=t%3;eyes.forEach(function(e){e.ng.visible=!loved;e.he.visible=loved;var sy=1;if(cyc<.45&&!loved){sy=Math.max(.05,1-Math.sin(cyc/.45*Math.PI))}e.g.scale.set(1.1,1.1*sy,1.1)});
R.render(scene,cam)}
function loop(now){var dt=last?Math.min(.1,(now-last)/1000):1/60;last=now;if(vis&&!document.hidden&&!hero.closest('main').hidden){t+=dt;frame(dt)}raf=requestAnimationFrame(loop)}
resize();if('ResizeObserver' in window)new ResizeObserver(resize).observe(hero);else window.addEventListener('resize',resize);
if('IntersectionObserver' in window)new IntersectionObserver(function(a){vis=a[0].isIntersecting}).observe(hero);
if(reduced){frame(.016)}else raf=requestAnimationFrame(loop);
window.__rb={frame:frame};
})()}catch(e){}
try{(function(){
var cards=document.querySelectorAll('.tilt'),fine=matchMedia('(hover:hover)').matches,red=matchMedia('(prefers-reduced-motion: reduce)').matches;
cards.forEach(function(c){
if(fine&&!red){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform='perspective(900px) rotateX('+((.5-y)*8).toFixed(2)+'deg) rotateY('+((x-.5)*10).toFixed(2)+'deg) translateY(-4px)';c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%')});
c.addEventListener('pointerleave',function(){c.style.transform=''})}
c.addEventListener('click',function(){if(!fine){var o=!c.classList.contains('open');cards.forEach(function(k){k.classList.remove('open')});if(o)c.classList.add('open')}});
c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('open')}})});
})()}catch(e){}
try{(function(){
var wraps=[].slice.call(document.querySelectorAll('.sk2')),red=matchMedia('(prefers-reduced-motion: reduce)').matches,tick=false;if(!wraps.length)return;
function cl(v){return Math.min(1,Math.max(0,v))}
function upd(){tick=false;if(red)return;var vh=window.innerHeight;wraps.forEach(function(wrap){if(!wrap.offsetParent)return;var cs=[].slice.call(wrap.querySelectorAll('.k2')),r=wrap.getBoundingClientRect(),p=cl(-r.top/Math.max(1,r.height-vh)),n=cs.length;
cs.forEach(function(c,i){var t=1-(n-i)*.05,st=i*.25,k=cl((p-st)/(1-st));c.firstElementChild.style.transform='scale('+(1+(t-1)*k).toFixed(4)+')';
var q=cl(1-c.getBoundingClientRect().top/vh),z=c.querySelector('.k2z');if(z)z.style.transform='scale('+(2-q).toFixed(3)+')'})})}
function req(){if(!tick){tick=true;requestAnimationFrame(upd)}}
window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);window.addEventListener('hashchange',function(){setTimeout(req,60)});req();
})()}catch(e){}
try{(function(){
var host=document.getElementById('osw'),cv=document.getElementById('os');if(!host||!cv||!window.THREE)return;var T=THREE,R;
try{R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
R.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
var scene=new T.Scene(),cam=new T.PerspectiveCamera(45,1,.1,100);cam.position.z=6.6;var root=new T.Group();scene.add(root);
var U={t:{value:0},px:{value:600}};
var vs='attribute float ph;attribute float sz;attribute vec3 col;uniform float t;uniform float px;varying vec3 vc;varying float va;void main(){vc=col;float tw=.55+.45*sin(t*1.6+ph*6.2831);va=tw;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=sz*px/-mv.z*(.75+.4*tw);gl_Position=projectionMatrix*mv;}';
var fs='varying vec3 vc;varying float va;void main(){vec2 c=gl_PointCoord-.5;float d=length(c);if(d>.5)discard;float a=smoothstep(.5,.0,d);gl_FragColor=vec4(vc,a*a*va);}';
function pts(pos,cols,szs,phs){var g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(new Float32Array(pos),3));g.setAttribute('col',new T.BufferAttribute(new Float32Array(cols),3));g.setAttribute('sz',new T.BufferAttribute(new Float32Array(szs),1));g.setAttribute('ph',new T.BufferAttribute(new Float32Array(phs),1));
return new T.Points(g,new T.ShaderMaterial({uniforms:U,vertexShader:vs,fragmentShader:fs,transparent:true,depthWrite:false,blending:T.AdditiveBlending}))}
/* particle synthesis sphere */
var N=3400,P=[],C=[],S=[],H=[];
for(var i=0;i<N;i++){var y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963,j=1.3+(Math.random()-.5)*.05;P.push(Math.cos(th)*r*j,y*j,Math.sin(th)*r*j);
var m=(y+1)/2,k=Math.random();C.push(.50+.30*m+.1*k,.36+.35*m,.95+.05*k);S.push(.022+Math.random()*.02);H.push(Math.random())}
var sphere=pts(P,C,S,H);root.add(sphere);
/* encrypted orbital rings with luminous data nodes */
var rings=[{r:1.7,tilt:[.5,0,.2],sp:.35,c:[.62,.55,1]},{r:1.98,tilt:[-.8,.3,0],sp:-.28,c:[.45,.65,1]},{r:2.28,tilt:[1.1,0,-.4],sp:.22,c:[.7,.5,1]},{r:2.62,tilt:[.2,.9,.3],sp:-.17,c:[.5,.6,1]}],spins=[];
rings.forEach(function(o,idx){var tg=new T.Group();tg.rotation.set(o.tilt[0],o.tilt[1],o.tilt[2]);var sg=new T.Group();tg.add(sg);root.add(tg);
var p=[],c=[],s=[],h=[],M=220;for(var q=0;q<M;q++){var a=q/M*Math.PI*2;p.push(Math.cos(a)*o.r,0,Math.sin(a)*o.r);c.push(o.c[0],o.c[1],o.c[2]);s.push(q%11===0?.045:.016);h.push(Math.random())}
sg.add(pts(p,c,s,h));
var np=[],nc=[],ns=[],nh=[],cnt=3;for(var w=0;w<cnt;w++){var b=w/cnt*Math.PI*2+idx;np.push(Math.cos(b)*o.r,0,Math.sin(b)*o.r);nc.push(1,.95,1);ns.push(.13);nh.push(Math.random())}
sg.add(pts(np,nc,ns,nh));spins.push({g:sg,sp:o.sp})});
/* sizing */
function resize(){var w=host.clientWidth,h=host.clientHeight;if(w<2||h<2)return;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();U.px.value=h*R.getPixelRatio()/(2*Math.tan(T.MathUtils.degToRad(22.5)));
var s=Math.min(1,w/h*1.05);root.scale.setScalar(Math.max(.62,s))}
var mx=0,my=0,tx=0,ty=0;window.addEventListener('pointermove',function(e){tx=e.clientX/window.innerWidth*2-1;ty=e.clientY/window.innerHeight*2-1});
var red=matchMedia('(prefers-reduced-motion: reduce)').matches,vis=false,t=0,last=0;
function frame(dt){t+=dt;U.t.value=t;mx+=(tx-mx)*Math.min(1,dt*2);my+=(ty-my)*Math.min(1,dt*2);root.rotation.y=t*.12+mx*.45;root.rotation.x=.22+my*.25;sphere.rotation.y=-t*.06;spins.forEach(function(o){o.g.rotation.y=t*o.sp});R.render(scene,cam)}
function loop(now){var dt=last?Math.min(.1,(now-last)/1000):.016;last=now;if(vis&&!document.hidden&&host.clientWidth>1)frame(dt);requestAnimationFrame(loop)}
var sec=host.parentNode;
if('IntersectionObserver' in window)new IntersectionObserver(function(a){vis=a[0].isIntersecting;if(vis)resize()}).observe(sec);else vis=true;
if('ResizeObserver' in window)new ResizeObserver(resize).observe(host);else window.addEventListener('resize',resize);
resize();if(red){frame(.016)}else requestAnimationFrame(loop);
window.__os={frame:frame};
})()}catch(e){}
var V={pricing:'v-pricing',contact:'v-contact',services:'v-services',faq:'v-faq',about:'v-about',process:'v-process',privacy:'v-privacy',terms:'v-terms'},A={'web-development':'services','custom-software':'services','it-solutions':'services',maintenance:'services'},T={pricing:'Pricing | Havtek',contact:'Contact | Havtek',services:'Services | Havtek',faq:'FAQ | Havtek',about:'About | Havtek',process:'Process | Havtek',privacy:'Privacy Policy | Havtek',terms:'Terms of Service | Havtek'},home=document.getElementById('top');
function route(h){if(typeof h!=='string')h=location.hash.slice(1);var vw=V[h]?h:(A[h]||null);home.hidden=!!vw;
Object.keys(V).forEach(function(k){document.getElementById(V[k]).hidden=(k!==vw)});
document.querySelectorAll('.hnav a').forEach(function(x){if(vw&&x.getAttribute('href')==='#'+vw)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')});
document.title=T[vw]||'Havtek | Technology that moves business forward';
var t=vw?(A[h]?document.getElementById(h):null):(h?document.getElementById(h):null);
if(t)t.scrollIntoView();else window.scrollTo({top:0,left:0,behavior:'instant'})}
window.addEventListener('hashchange',function(){route()});route();
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||a.hasAttribute('data-top'))return;var h=a.getAttribute('href').slice(1);if(!h||h==='content')return;e.preventDefault();try{location.hash=h}catch(x){}route(h)});
document.querySelectorAll('.seg button').forEach(function(x){x.onclick=function(){document.getElementById('v-pricing').setAttribute('data-p',x.getAttribute('data-p'));document.querySelectorAll('.seg button').forEach(function(y){y.setAttribute('aria-selected',y===x)})}});
document.addEventListener('click',function(e){var tp=e.target.closest&&e.target.closest('[data-top]');if(tp){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});return}var a=e.target.closest&&e.target.closest('[data-svc]');if(!a)return;document.getElementById('sv').value=a.getAttribute('data-svc');var ms=document.getElementById('ms'),p=a.getAttribute('data-plan');if(p&&!ms.value)ms.value='I’m interested in the '+p+'.'});
document.getElementById('f').onsubmit=async function(e){e.preventDefault();
var form=e.currentTarget,sv=document.getElementById('sv').value,n=document.getElementById('nm').value,m=document.getElementById('em').value,p=document.getElementById('ph').value,t=document.getElementById('ms').value,hp=document.getElementById('website').value,status=document.getElementById('fs'),button=form.querySelector('button[type="submit"]');
if(hp)return;
status.textContent='Sending your message…';button.disabled=true;
try{var response=await fetch('send-email.php',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({name:n,email:m,phone:p,service:sv,message:t,website:hp})});var result=await response.json();if(!response.ok||!result.ok)throw new Error(result.message||'Request failed');status.textContent='Thanks — your message has been sent. We’ll be in touch soon.';form.reset()}catch(err){status.textContent='We couldn’t send that just now. Please try again or contact info@havtek.co.ke.'}finally{button.disabled=false}};

/* Give the process journey a clear next step after the final card. */
(function(){var section=document.getElementById('process');if(!section||document.querySelector('.process-next'))return;var next=document.createElement('section');next.className='process-next';next.innerHTML='<div class="w"><p class="eye">READY WHEN YOU ARE</p><h2>Let’s turn your idea into a <em>working solution.</em></h2><p class="lead">Tell us what you need and we’ll help you choose the right next step.</p><a class="btn" href="#contact">Start a project ↗</a></div>';section.parentNode.appendChild(next)})();

/* Keep keyboard focus inside the mobile drawer and return it to the trigger. */
(function(){var dw=document.getElementById('dw'),mb=document.getElementById('mb'),dx=document.getElementById('dx');if(!dw||!mb)return;var last=null;function focusables(){return dw.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')}function open(){last=document.activeElement;setTimeout(function(){var f=focusables();if(f.length)f[0].focus()},0)}function close(){setTimeout(function(){if(last&&last.focus)last.focus()},0)}mb.addEventListener('click',function(){if(!dw.hidden)open()});if(dx)dx.addEventListener('click',close);dw.addEventListener('keydown',function(e){if(e.key==='Tab'){var f=focusables();if(!f.length)return;var first=f[0],lastEl=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastEl.focus()}else if(!e.shiftKey&&document.activeElement===lastEl){e.preventDefault();first.focus()}}});document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function(a){a.target='_blank';a.rel='noopener'})})();

(function(){var heading=document.querySelector('#process .phead h2');if(heading)heading.innerHTML='From first chat to <em>a working solution</em>'})();

/* Keep the homepage language aligned with the services Havtek actually offers. */
(function(){var badge=document.querySelector('.hbadge');if(badge&&badge.firstChild)badge.firstChild.textContent='Websites · Software · IT support';var fixed=document.querySelector('.stats div:nth-child(2)');if(fixed){var b=fixed.querySelector('b'),s=fixed.querySelector('span');if(b)b.textContent='Fixed quotes';if(s)s.textContent='Agreed before work starts'}var support=document.querySelector('#process .k2[style*="--i:3"] h3');if(support&&support.lastChild)support.lastChild.textContent='Launch & support';document.querySelectorAll('.tfh h4').forEach(function(h){if(h.textContent.trim()==='CONTACT')h.textContent='INFO'})})();

(function(){document.querySelectorAll('a[href="mailto:kibetcollins016@gmail.com"]').forEach(function(a){a.href='mailto:info@havtek.co.ke'});var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(n.nodeValue.indexOf('kibetcollins016@gmail.com')!==-1)n.nodeValue=n.nodeValue.replace(/kibetcollins016@gmail\.com/g,'info@havtek.co.ke')}})();

(function(){var root=document.documentElement,b=document.getElementById('theme-toggle');if(!b)return;var saved=localStorage.getItem('havtek-theme');if(saved==='dark'||saved==='light')root.setAttribute('data-theme',saved);function sync(){var dark=root.getAttribute('data-theme')==='dark';b.textContent=dark?'☀ Light':'☾ Dark';b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('aria-pressed',String(dark))}b.addEventListener('click',function(){var next=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',next);localStorage.setItem('havtek-theme',next);sync()});sync()})();

(function(){document.querySelectorAll('a[href]').forEach(function(a){if(a.getAttribute('href')==='#')return;a.target='_blank';a.rel='noopener noreferrer'})})();

