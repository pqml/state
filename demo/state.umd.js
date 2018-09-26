!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){function t(t,e,n,r){this.fn=e,this.ctx=n||null,this.owner=t,this.once=!!r}function e(t,e){e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.ctx=e.fn=e.owner=null,e===t._first&&(t._first=e.next),e===t._last&&(t._last=e.prev)}function n(){}function r(t){this.current=t}function i(t,e){return t(e={exports:{}},e.exports),e.exports}n.prototype.dispatch=function(t,e,n,r,i){for(var s=this._first;s;)s.fn.call(s.ctx,t,e,n,r,i),s.once&&this.unlisten(s),s=s.next},n.prototype.listen=function(e,n,r){var i=new t(this,e,n,r);return this._first?(this._last.next=i,i.prev=this._last,this._last=i):(this._first=i,this._last=i),i},n.prototype.listenOnce=function(t,e){return this.listen(t,e,!0)},n.prototype.unlisten=function(n,r){if(n instanceof t)return e(this,n);r||(r=null);for(var i=this._first;i;)i.fn===n&&i.ctx===r&&e(this,i),i=i.next},n.prototype.unlistenAll=function(){var t=this._first;for(this._first=this._last=null;t;)e(this,t),t=t.next},(r.prototype=Object.create(n.prototype)).constructor=r,r.prototype.dispatch=void 0,r.prototype.set=function(t,e){if(e||this.current!==t){this.current=t;for(var n=this._first;n;)n.once&&this.unlisten(n),n.fn.call(n.ctx,this.current),n=n.next}},r.prototype.get=function(t){return this.current};var s=i(function(t){var e=function(t){this.items=[],this._name=t},n=e.prototype;n.emit=function(t,e,n,r,i,s,o,c){if(arguments.length>8)throw"max arguments reached";for(var a=this.items,h=this._name,f=0,u=a.length;f<u;f++)a[f][h](t,e,n,r,i,s,o,c);return this},n.dispatch=n.emit,n.run=n.emit,n.add=function(t){return t[this._name]&&(this.remove(t),this.items.push(t)),this},n.remove=function(t){var e=this.items.indexOf(t);return-1!==e&&this.items.splice(e,1),this},n.contains=function(t){return-1!==this.items.indexOf(t)},n.removeAll=function(){return this.items.length=0,this},n.destroy=function(){this.removeAll(),this.items=null,this._name=null},Object.defineProperties(n,{empty:{get:function(){return 0===this.items.length}},name:{get:function(){return this._name}}}),t.exports=e});class o{constructor(t,e=!1,n){this._fn=t,this._once=e,this._thisArg=n,this._next=this._prev=this._owner=null}detach(){return null!==this._owner&&(this._owner.detach(this),!0)}}function c(t,e){return t._head?(t._tail._next=e,e._prev=t._tail,t._tail=e):(t._head=e,t._tail=e),e._owner=t,e}var a=i(function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}function i(t,e,r,i,s){if("function"!=typeof r)throw new TypeError("The listener must be a function");var o=new function(t,e,n){this.fn=t,this.context=e,this.once=n||!1}(r,i||t,s),c=n?n+e:e;return t._events[c]?t._events[c].fn?t._events[c]=[t._events[c],o]:t._events[c].push(o):(t._events[c]=o,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function o(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),o.prototype.eventNames=function(){var t,r,i=[];if(0===this._eventsCount)return i;for(r in t=this._events)e.call(t,r)&&i.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},o.prototype.listeners=function(t){var e=this._events[n?n+t:t];if(!e)return[];if(e.fn)return[e.fn];for(var r=0,i=e.length,s=new Array(i);r<i;r++)s[r]=e[r].fn;return s},o.prototype.listenerCount=function(t){var e=this._events[n?n+t:t];return e?e.fn?1:e.length:0},o.prototype.emit=function(t,e,r,i,s,o){var c=n?n+t:t;if(!this._events[c])return!1;var a,h,f=this._events[c],u=arguments.length;if(f.fn){switch(f.once&&this.removeListener(t,f.fn,void 0,!0),u){case 1:return f.fn.call(f.context),!0;case 2:return f.fn.call(f.context,e),!0;case 3:return f.fn.call(f.context,e,r),!0;case 4:return f.fn.call(f.context,e,r,i),!0;case 5:return f.fn.call(f.context,e,r,i,s),!0;case 6:return f.fn.call(f.context,e,r,i,s,o),!0}for(h=1,a=new Array(u-1);h<u;h++)a[h-1]=arguments[h];f.fn.apply(f.context,a)}else{var l,p=f.length;for(h=0;h<p;h++)switch(f[h].once&&this.removeListener(t,f[h].fn,void 0,!0),u){case 1:f[h].fn.call(f[h].context);break;case 2:f[h].fn.call(f[h].context,e);break;case 3:f[h].fn.call(f[h].context,e,r);break;case 4:f[h].fn.call(f[h].context,e,r,i);break;default:if(!a)for(l=1,a=new Array(u-1);l<u;l++)a[l-1]=arguments[l];f[h].fn.apply(f[h].context,a)}}return!0},o.prototype.on=function(t,e,n){return i(this,t,e,n,!1)},o.prototype.once=function(t,e,n){return i(this,t,e,n,!0)},o.prototype.removeListener=function(t,e,r,i){var o=n?n+t:t;if(!this._events[o])return this;if(!e)return s(this,o),this;var c=this._events[o];if(c.fn)c.fn!==e||i&&!c.once||r&&c.context!==r||s(this,o);else{for(var a=0,h=[],f=c.length;a<f;a++)(c[a].fn!==e||i&&!c[a].once||r&&c[a].context!==r)&&h.push(c[a]);h.length?this._events[o]=1===h.length?h[0]:h:s(this,o)}return this},o.prototype.removeAllListeners=function(t){var e;return t?this._events[e=n?n+t:t]&&s(this,e):(this._events=new r,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=n,o.EventEmitter=o,t.exports=o}),h=function(){this.time=0};h.prototype.update=function(){this.time++};for(var f,u,l,p=function(t){var e={};for(var n in t)e[n]=new r(t[n]);return e=Object.freeze(e)}({updateStore:0}).updateStore,_=new s("update"),v=new class{constructor(){this._head=this._tail=void 0}handlers(t=!1){let e=this._head;if(t)return!!e;const n=[];for(;e;)n.push(e),e=e._next;return n}has(t){if(!(t instanceof o))throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");return t._owner===this}dispatch(){let t=this._head;if(!t)return!1;for(;t;)t._once&&this.detach(t),t._fn.apply(t._thisArg,arguments),t=t._next;return!0}add(t,e=null){if("function"!=typeof t)throw new Error("MiniSignal#add(): First arg must be a Function.");return c(this,new o(t,!1,e))}once(t,e=null){if("function"!=typeof t)throw new Error("MiniSignal#once(): First arg must be a Function.");return c(this,new o(t,!0,e))}detach(t){if(!(t instanceof o))throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");return t._owner!==this?this:(t._prev&&(t._prev._next=t._next),t._next&&(t._next._prev=t._prev),t===this._head?(this._head=t._next,null===t._next&&(this._tail=null)):t===this._tail&&(this._tail=t._prev,this._tail._next=null),t._owner=null,this)}detachAll(){let t=this._head;if(!t)return this;for(this._head=this._tail=null;t;)t._owner=null,t=t._next;return this}},d=new a,m=new n,w=document.querySelector("pre"),x=0;x<1e3;x++){var y=new h;_.add(y),m.listen(y.update,y),v.add(y.update,y),d.on("update",y.update,y),p.listen(y.update,y)}for(w.innerHTML+="1000 Events \n",w.innerHTML+="2000 Dispatches \n",w.innerHTML+="\n---\n\n",u=performance.now(),f=0;f<2e3;f++)m.dispatch();for(l=performance.now()-u,w.innerHTML+="Signal "+l+"ms \n",u=performance.now(),f=0;f<2e3;f++)p.set(0,!0);for(l=performance.now()-u,w.innerHTML+="StoreSignal "+l+"ms \n",w.innerHTML+="\n---\n\n",u=performance.now(),f=0;f<2e3;f++)_.emit();for(l=performance.now()-u,w.innerHTML+="MiniRunner "+l+"ms \n",u=performance.now(),f=0;f<2e3;f++)v.dispatch();for(l=performance.now()-u,w.innerHTML+="mini-signals "+l+"ms \n",u=performance.now(),f=0;f<2e3;f++)d.emit("update");l=performance.now()-u,w.innerHTML+="EventEmitter3 "+l+"ms \n"});
//# sourceMappingURL=state.umd.js.map
