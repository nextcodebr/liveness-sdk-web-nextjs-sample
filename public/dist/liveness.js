var Liveness;(()=>{"use strict";var t={803:t=>{t.exports=class{constructor(t,e){e.height=Math.floor(.7778*e.width),this.config=e,this.token=e.token,this.videoWrapper=t,this.faceapiPath=e.faceapiPath,this.isShowPreview=e.isShowPreview,this.errorCallback=e.errorCallback,this.successCallback=e.successCallback,this.livenessUrlBase=e.livenessUrlBase,this.displaySize={width:e.width,height:e.height},this.livenessConfirmEndpoint=e.livenessConfirmEndpoint||"/liveness/v2"}async start(){await this.loadFaceApi(),await this.loadFaceApiModels(),this.setLiveness()}setLiveness(){this.setLoading(),this.createModalConfirmationWrapper().createModalConfirmation().createVideoElement().startVideo()}resetLiveness(){this.removeCanvas(),this.resetVideoWrapper(),this.closePreviewModal(),this.base64="",this.removeLoading(),this.setLiveness()}async loadFaceApi(){const t=document.createElement("script"),e=`${this.faceapiPath}/face-api.min.js`;return t.src=e,document.head.append(t),this}async loadFaceApiModels(){return setTimeout((async()=>{this.faceapi=faceapi,await this.faceapi.nets.tinyFaceDetector.loadFromUri(this.faceapiPath),await this.faceapi.nets.faceLandmark68Net.loadFromUri(this.faceapiPath),await this.faceapi.nets.faceRecognitionNet.loadFromUri(this.faceapiPath),await this.faceapi.nets.faceExpressionNet.loadFromUri(this.faceapiPath)}),100),this}startVideo(){return setTimeout((()=>{navigator.mediaDevices.getUserMedia({video:{}}).then((t=>{this.video.srcObject=t})).catch((t=>console.error(t)))}),100),this}createVideoElement(){return this.video=document.createElement("video"),this.video.style.width=this.config.width,this.video.style.height=this.config.height,this.video.style.transform="scaleX(-1)",this.video.setAttribute("muted",!0),this.video.setAttribute("autoplay",!0),this.videoWrapper.style.position="relative",this.videoWrapper.style.width=this.config.width,this.videoWrapper.style.height=this.config.height,this.videoWrapper.append(this.video),this.setVideoMask(),this.video.addEventListener("play",(()=>{this.createMessageBox(),this.loop()})),this}resetVideoWrapper(){const t=document.getElementById("video-wrapper");t&&(t.innerHTML="")}removeCanvas(){const t=document.getElementsByTagName("canvas")[0];t&&t.remove()}setVideoMask(){this.videoWrapper.insertAdjacentHTML("beforeend",this.createMask()),this.maskEllipse=document.getElementById("mask-ellipse"),this.svgMask=document.getElementById("svg-mask"),this.svgMask.style.width=this.config.width,this.svgMask.style.height=this.config.height}createMask(){return'<svg\n    id="svg-mask"\n    style="display: none;"\n    viewBox="0 0 720 560"\n    fill="none"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      id="mask-ellipse"\n      d="M457.5 250C457.5 288.479 446.435 323.21 428.671 348.256C410.904 373.308 386.589 388.5 360 388.5C333.411 388.5 309.096 373.308 291.329 348.256C273.565 323.21 262.5 288.479 262.5 250C262.5 211.521 273.565 176.79 291.329 151.744C309.096 126.692 333.411 111.5 360 111.5C386.589 111.5 410.904 126.692 428.671 151.744C446.435 176.79 457.5 211.521 457.5 250Z"\n      stroke="#B40000"\n      stroke-width="5"\n    />\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M30 10C18.9543 10 10 18.9543 10 30V533C10 544.046 18.9543 553 30 553H690C701.046 553 710 544.046 710 533V30C710 18.9543 701.046 10 690 10H30ZM360 391C415.228 391 460 327.872 460 250C460 172.128 415.228 109 360 109C304.772 109 260 172.128 260 250C260 327.872 304.772 391 360 391Z"\n      fill="#000"\n      fill-opacity="0.6"\n    />\n    <rect\n      x="12.5"\n      y="12.5"\n      width="695"\n      height="535"\n      stroke="white"\n      stroke-width="25"\n    />\n  </svg>'}loop(){const t=this.faceapi.createCanvasFromMedia(this.video);t.style.position="absolute",t.style.top=8,document.body.append(t),this.faceapi.matchDimensions(t,this.displaySize),this.svgMask.setAttribute("style","display: block; position:absolute; top: 0; left: 0;"),this.maskEllipse.setAttribute("style","display: block;");const e={width:Math.floor(this.config.width/3.6),height:Math.floor(this.config.height/2)};e.left=Math.floor(t.width/2-e.width/2),e.top=Math.floor(t.height/2-e.height/1.65);const i={width:Math.floor(.8*e.width),height:Math.floor(e.height/5)};i.left=Math.floor(e.left+e.width/2-i.width/2),i.top=Math.floor(e.top+.4*e.height);const s={width:Math.floor(.6*e.width),height:Math.floor(e.height/5)};s.left=Math.floor(e.left+e.width/2-s.width/2),s.top=Math.floor(e.top+.4*e.height);const n=t.getContext("2d");n.translate(t.width,0),n.scale(-1,1),this.config.isDebug&&this.draw(n,t,e,s,i);const o=t.getBoundingClientRect(),a={counter:0,inProgress:!1,done:!1},r=setInterval((async()=>{if(a.inProgress||a.done)return;a.inProgress=!0;const h=await this.faceapi.detectSingleFace(this.video,new this.faceapi.TinyFaceDetectorOptions).withFaceLandmarks().withFaceExpressions();if(this.removeLoading(),!h)return this.blockMask("Face não encontrada",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);const d=this.faceapi.resizeResults(h,this.displaySize);if(d&&d.expressions){const t=this.getExpression(d.expressions);if("neutral"!==t)return this.config.isDebug?this.blockMask(`Mantenha expressão neutra >> ${t}`,o,e.left,e.top,e.height,e.width):this.blockMask("Mantenha expressão neutra",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1)}if(d.detection){const h=this.getPose(d);if("front"!==h)return this.config.isDebug?this.blockMask(`Centralize seu rosto >> ${h}`,o,e.left,e.top,e.height,e.width):this.blockMask("Centralize seu rosto",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);const l=d.landmarks.getJawOutline();if(this.isRotatedFace(l[0],l[16]))return this.config.isDebug?this.blockMask("Centralize seu rosto >> rotacionado",o,e.left,e.top,e.height,e.width):this.blockMask("Centralize seu rosto",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);this.config.isDebug&&(this.draw(n,t,e,s,i),n.beginPath(),n.lineWidth="5",n.strokeStyle="green",n.moveTo(l[0].x,l[0].y),n.lineTo(l[16].x,l[16].y),n.stroke());const c={meanPosition:[l[0].x,l[0].y],frameBox:{isInside:!1},outterBox:{isInside:!1},innerBox:{isInside:!1}},p={meanPosition:[l[16].x,l[16].y],frameBox:{isInside:!1},outterBox:{isInside:!1},innerBox:{isInside:!1}};if(c.frameBox.isInside=this.isInside(c.meanPosition,{top:e.top,left:e.left,width:e.width,height:e.height}),p.frameBox.isInside=this.isInside(p.meanPosition,{top:e.top,left:e.left,width:e.width,height:e.height}),c.outterBox.isInside=this.isInside(c.meanPosition,{top:i.top,left:i.left,width:i.width,height:i.height}),p.outterBox.isInside=this.isInside(p.meanPosition,{top:i.top,left:i.left,width:i.width,height:i.height}),c.innerBox.isInside=this.isInside(c.meanPosition,{top:s.top,left:s.left,width:s.width,height:s.height}),p.innerBox.isInside=this.isInside(p.meanPosition,{top:s.top,left:s.left,width:s.width,height:s.height}),!c.frameBox.isInside||!p.frameBox.isInside)return this.blockMask("Posicione seu rosto dentro da moldura",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);if(!c.outterBox.isInside||!p.outterBox.isInside)return this.blockMask("Afaste seu rosto",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);if(c.innerBox.isInside||p.innerBox.isInside)return this.blockMask("Aproxime seu rosto",o,e.left,e.top,e.height,e.width),a.counter=0,void(a.inProgress=!1);this.msg.style="display: none;",this.activateEllipseMask(),a.counter+=1,a.inProgress=!1,a.counter>=2&&(a.done=!0,this.takePicture(t),clearInterval(r))}}),250)}activateEllipseMask(){this.maskEllipse.setAttribute("stroke","#0F0")}deactivateEllipseMask(){this.maskEllipse.setAttribute("stroke","#F00")}draw(t,e,i,s,n){t.clearRect(0,0,e.width,e.height),t.beginPath(),t.lineWidth="3",t.strokeStyle="blue",t.rect(i.left,i.top,i.width,i.height),t.stroke(),t.beginPath(),t.lineWidth="2",t.strokeStyle="blue",t.rect(s.left,s.top,s.width,s.height),t.stroke(),t.beginPath(),t.lineWidth="2",t.strokeStyle="red",t.rect(n.left,n.top,n.width,n.height),t.stroke()}getExpression(t){const e=[];for(const[i,s]of Object.entries(t))e.push({expression:i,confidence:s});const i=e.sort(((t,e)=>t.confidence-e.confidence)).pop();return i&&i.expression?i.expression:null}getPose(t){const e=this.getMeanPosition(t.landmarks.getRightEye()),i=this.getMeanPosition(t.landmarks.getLeftEye()),s=this.getMeanPosition(t.landmarks.getNose()),n=this.getMeanPosition(t.landmarks.getMouth()),o=(this.getTop(t.landmarks.getJawOutline())-n[1])/t.detection.box.height+.5,a=(i[0]+(e[0]-i[0])/2-s[0])/t.detection.box.width;let r="undetected";return t.detection.score>.3&&(r="front",o>.2?r="top":o<-.1?r="bottom":(a<-.04&&(r="left"),a>.04&&(r="right"))),r}isRotatedFace(t,e){return Math.abs(180*Math.atan2(e.y-t.y,e.x-t.x)/Math.PI)>7}getMeanPosition(t){return t.map((t=>[t.x,t.y])).reduce(((t,e)=>[t[0]+e[0],t[1]+e[1]])).map((e=>e/t.length))}getTop(t){return t.map((t=>t.y)).reduce(((t,e)=>Math.min(t,e)))}isInside(t=[],e={}){return!(t[1]<e.top||t[0]<e.left||t[1]>e.top+e.height||t[0]>e.left+e.width)}blockMask(t,e,i,s,n,o){const a={width:230,height:35};a.top=s+n+20,a.left=i+o/2-a.width/2,this.maskEllipse.setAttribute("stroke","#B40000"),this.msg.textContent=t,this.msg.style=`\n      padding: 10px;\n      color: #ba3939;\n      position: absolute;\n      text-align: center;\n      background: #ffe0e0;\n      top: ${a.top}px;\n      left: ${a.left}px;\n      width: ${a.width}px; \n      height: ${a.height}px;\n      border: 1px solid #a33a3a;\n      font-family: 'Prompt', sans-serif;\n    `}takePicture(t){const e=t.getContext("2d");t.style="display: none;",e.drawImage(this.video,0,0,t.width,t.height),this.base64=t.toDataURL("image/png"),this.isShowPreview?this.openPreviewModal():this.confirmPicture()}createMessageBox(){return this.msg=document.createElement("div"),this.videoWrapper.append(this.msg),this}createModalConfirmationWrapper(){return this.modalWrapper=document.createElement("div"),this.modalWrapper.style="\n    top: 0;\n    left: 0;\n    z-index: 10;\n    width: 100%;\n    height: 100%;\n    display: none;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background: rgba(20, 20, 20, 0.95);\n    ",this.modalWrapper.id="modalWrapper",document.body.append(this.modalWrapper),this}createModalConfirmation(){this.modalConfirmation=document.createElement("div"),this.modalConfirmation.style="\n    padding: 7px;\n    display: flex;\n    max-width: 720px;\n    background: white;\n    max-height: 560px;\n    border-radius: 7px;\n    position: relative;\n    align-items: center;\n    justify-content: center;\n    ";const t=document.createElement("button");t.textContent="Confirmar",t.style="\n    color: #555;\n    right: 10px;\n    width: 160px;\n    height: 50px;\n    bottom: 10px;\n    cursor: pointer;\n    background: #fff;\n    font-weight: 600;\n    border-radius: 7px;\n    margin-right: 10px;\n    border: 1px solid #222;\n    ";const e=document.createElement("button");e.textContent="Cancelar",e.style="\n    color: #444;\n    right: 10px;\n    width: 160px;\n    height: 50px;\n    bottom: 10px;\n    cursor: pointer;\n    background: #fff;\n    font-weight: 600;\n    border-radius: 7px;\n    margin-right: 10px;\n    border: 1px solid #222;\n    ";const i=document.createElement("div");return i.style="\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    display: flex;\n    padding: 10px 0;\n    position: absolute;\n    justify-content: center;\n    ",i.append(e),i.append(t),this.modalConfirmation.append(i),this.modalWrapper.append(this.modalConfirmation),t.addEventListener("click",(()=>{this.closePreviewModal(),this.confirmPicture()})),e.addEventListener("click",(()=>{this.cancelPicture()})),this}openPreviewModal(){const t=document.createElement("img");t.src=this.base64,t.style="\n      max-width: 720px;\n      min-width: 520px;\n      min-height: 360px;\n      max-height: 560px;\n      object-fit: cover;\n      border-radius: 7px;\n    ",this.modalConfirmation.append(t),this.modalWrapper.style.display="flex"}closePreviewModal(){const t=document.getElementById("modalWrapper");t&&t.remove()}cancelPicture(){this.resetLiveness()}setLoading(){this.videoWrapper.insertAdjacentHTML("beforeend",'<div id="spinner">\n        <div class="lds-ripple">\n          <div style="color: white"></div>\n          <div style="color: white"></div>\n        </div>\n        <style>\n        #spinner {\n          z-index: 40;\n          align-content: center;\n          width: 100%;\n          height: 100%;\n          display: flex;\n          position: absolute;\n          align-items: center;\n          justify-content: center;\n          background: rgba(20, 20, 20, 1);\n          top: 0;\n        }\n        .lds-ripple {\n          width: 80px;\n          height: 80px;\n          position: relative;\n        }\n        .lds-ripple div {\n          position: absolute;\n          border: 4px solid #000;\n          opacity: 1;\n          border-radius: 50%;\n          border-color: white;\n          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n        }\n        .lds-ripple div:nth-child(2) {\n          animation-delay: -0.5s;\n        }\n        @keyframes lds-ripple {\n          0% {\n            top: 36px;\n            left: 36px;\n            width: 0;\n            height: 0;\n            opacity: 1;\n            color: white;\n          }\n          100% {\n            top: 0px;\n            left: 0px;\n            width: 72px;\n            height: 72px;\n            opacity: 0;\n          }\n        }\n        </style>\n      </div>')}removeLoading(){const t=document.getElementById("spinner");t&&t.remove()}confirmPicture(){const t={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({base64:{key:this.base64.replace("data:image/png;base64,","")}})};this.setLoading();const e=`${this.livenessUrlBase}${this.livenessConfirmEndpoint}`;fetch(e,t).then((t=>t.json())).then((t=>{if(t&&t.error&&401===t.error.statusCode)return alert("Token inválido"),this.resetLiveness(),void this.errorCallback(t);let e=!1;t&&t.data&&t.data.real&&parseFloat(t.data.real)>.97&&(e=!0),t&&t.isAlive&&(e=!0),e?this.successCallback(t):this.errorCallback(t)})).catch((t=>{console.log("error",t),this.errorCallback(t)})).finally((()=>{this.resetLiveness(),this.removeLoading()}))}}}},e={},i=function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,i),o.exports}(803);Liveness=i})();
//# sourceMappingURL=liveness.js.map