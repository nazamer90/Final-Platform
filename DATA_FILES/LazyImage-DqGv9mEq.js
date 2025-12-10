import{r as t,j as v}from"./index-CcNjQh2v.js";const C=({src:c,alt:m,placeholder:g='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3ELoading...%3C/text%3E%3C/svg%3E',width:f,height:l,className:o,onLoad:s,onError:e})=>{const[w,x]=t.useState(g),[h,p]=t.useState(!1),[d,n]=t.useState(!1),r=t.useRef(null);return t.useEffect(()=>{if(!r.current)return;const i=new IntersectionObserver(y=>{y.forEach(u=>{if(u.isIntersecting){const a=u.target;a.src=c,a.onload=()=>{p(!0),x(c),s==null||s()},a.onerror=()=>{n(!0),e==null||e()},i.unobserve(a)}})},{rootMargin:"50px",threshold:.01});return i.observe(r.current),()=>{i.disconnect()}},[c,s,e]),v.jsx("img",{ref:r,src:g,alt:m,width:f,height:l,className:`
        ${o||""} 
        ${h?"opacity-100":"opacity-50"} 
        ${d?"opacity-50 bg-gray-200":""}
        transition-opacity duration-300
      `,style:{transition:"opacity 0.3s ease-in-out"},onError:i=>{n(!0),e==null||e()}})};export{C as L};
