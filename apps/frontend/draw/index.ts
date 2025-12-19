
export function initDraw(canvas){

    const ctx=canvas.getContext("2d");
            
    if(!ctx) return;

    let clicked=false;

    let startX=0;
    let startY=0;
    canvas.addEventListener("mousedown",(e)=>{
        clicked=true;
        startX=e.clientX;
        startY=e.clientY;
    })

    canvas.addEventListener("mousup",(e)=>{
        clicked=false;
    })

    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
            const width=e.clientX-startX;
            const height=e.clientY-startY;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.strokeRect(startX,startY,width,height)
        }
    })
}