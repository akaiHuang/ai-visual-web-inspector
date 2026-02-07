import{f as o}from"#entry";function l(e,r=200){const s=o(!1);return{isPressed:s,pressClose:()=>{s.value=!0,setTimeout(()=>{s.value=!1,e()},r)}}}export{l as u};
