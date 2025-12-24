import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    points:{x:number;y:number}[];
} | {
    type:"arrow"
    startX:number
    startY:number
    endX:number
    endY:number
} | {
    type:"rhombus"
    centerX:number
    centerY:number
    width:number
    height:number
} | {
    type:"write"
    x:number
    y:number
    text:string
}

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[]
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    private pencilPoints:{x:number;y:number}[]=[];
    private isTyping=false;
    private currentText="";
    private textX=0
    private textY=0
    private showCursor=false;

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.initKeyboardHandlers();
    }
    
    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)

        window.removeEventListener("keydown",this.keyDownHandler)
    }

    setTool(tool: "circle" | "pencil" | "rect" | "arrow" | "rhombus" | "write") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        console.log(this.existingShapes);
        setInterval(() => {
            if (this.isTyping) {
                this.showCursor=!this.showCursor;
                this.clearCanvas()
            }
        }, 500);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShapes.push(parsedShape.shape)
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } 
            
            
            else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();                
            }


            else if(shape.type === "pencil"){
                this.ctx.strokeStyle="rgba(255,255,255)";
                this.ctx.lineWidth=2;
                this.ctx.lineCap="round";
                this.ctx.lineJoin="round";

                this.ctx.beginPath();
                const pts = shape.points;
                this.ctx.moveTo(pts[0].x, pts[0].y);

                for (let i = 1; i < pts.length; i++) {
                    this.ctx.lineTo(pts[i].x, pts[i].y);
                }

                this.ctx.stroke();
            }

            else if(shape.type === "arrow"){
                this.ctx.strokeStyle="rgba(255,255,255)";
                this.ctx.lineWidth=2;
                this.ctx.lineCap="round";
                this.ctx.lineJoin="round";

                const headLength=12;
                const angle = Math.atan2(shape.endY-shape.startY,shape.endX-shape.startX);

                this.ctx.beginPath();

                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);

                this.ctx.lineTo(
                    shape.endX - headLength * Math.cos(angle - Math.PI / 6),
                    shape.endY - headLength * Math.sin(angle - Math.PI / 6)
                );

                this.ctx.moveTo(shape.endX, shape.endY);
                this.ctx.lineTo(
                    shape.endX - headLength * Math.cos(angle + Math.PI / 6),
                    shape.endY - headLength * Math.sin(angle + Math.PI / 6)
                );

                this.ctx.stroke();
            }

            else if (shape.type === "rhombus") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.centerX, shape.centerY - shape.height / 2);
                this.ctx.lineTo(shape.centerX + shape.width / 2, shape.centerY);
                this.ctx.lineTo(shape.centerX, shape.centerY + shape.height / 2);
                this.ctx.lineTo(shape.centerX - shape.width / 2, shape.centerY);
                this.ctx.closePath();
                this.ctx.stroke();
            }

            else if(shape.type === "write"){
                this.ctx.fillStyle = "white";
                this.ctx.font=`16px Inter , sans-serif`
                this.ctx.fillText(shape.text,shape.x,shape.y);
            }

            if (this.isTyping && this.selectedTool === "write") {
                this.ctx.fillStyle = "white";
                this.ctx.font = "16px Inter, sans-serif";
                this.ctx.fillText(this.currentText, this.textX, this.textY);

                if (this.showCursor) {
                    const metrics = this.ctx.measureText(this.currentText);
                    const caretX = this.textX + metrics.width;

                    this.ctx.beginPath();
                    this.ctx.moveTo(caretX, this.textY - 14);
                    this.ctx.lineTo(caretX, this.textY + 4);
                    this.ctx.strokeStyle = "white";
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }

        })
    }

    mouseDownHandler = (e) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY

        if(this.selectedTool==="pencil"){
            this.pencilPoints=[{
                x:this.startX,
                y:this.startY
            }]
        }

        if(this.selectedTool === "write"){
            this.isTyping=true;
            this.currentText="";
            this.textX=this.startX;
            this.textY=this.startY;
        }


    }

    mouseUpHandler = (e) => {
        this.clicked = false
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        const selectedTool = this.selectedTool;
        const endX=e.clientX;
        const endY=e.clientY;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {

            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } 
        
        
        else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius,
            }
        }


        else if(selectedTool === "pencil"){
            shape={
                type:"pencil",
                points:this.pencilPoints
            };
            this.pencilPoints=[];
        }

        else if(selectedTool === "arrow"){
            shape={
                type:"arrow",
                startX:this.startX,
                startY:this.startY,
                endX:endX,
                endY:endY
            }
        }

        else if(selectedTool === "rhombus"){
            shape = {
                type: "rhombus",
                centerX: (this.startX + endX) / 2,
                centerY: (this.startY + endY) / 2,
                width: Math.abs(endX - this.startX),
                height: Math.abs(endY - this.startY),
            };
        }
        

        if (!shape) {
            return;
        }

        this.existingShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
    }

    mouseMoveHandler = (e) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255, 255, 255)"
            this.ctx.lineWidth=2;
            this.ctx.lineCap="round";
            this.ctx.lineJoin="round"
            const selectedTool = this.selectedTool;


            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);   
            } 


            else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();                
            }
            

            else if(selectedTool=="pencil"){
                const x=e.clientX;
                const y=e.clientY;

                this.pencilPoints.push({x,y});

                this.ctx.beginPath();
                const pts=this.pencilPoints;
                this.ctx.moveTo(pts[0].x,pts[0].y);

                for(let i=1;i<pts.length;i++){
                    this.ctx.lineTo(pts[i].x,pts[i].y);
                }

                this.ctx.stroke();
            }

            else if(selectedTool === "arrow"){
                const endX=e.clientX;
                const endY=e.clientY;

                const headLength=12;
                const angle = Math.atan2(endY -this.startY,endX-this.startX);

                this.ctx.beginPath();

                this.ctx.moveTo(this.startX,this.startY);
                this.ctx.lineTo(endX,endY);

                //left arrrow
                this.ctx.lineTo(
                    endX-headLength*Math.cos(angle-Math.PI/6),
                    endY-headLength*Math.sin(angle-Math.PI/6)
                )

                //move back to end
                this.ctx.moveTo(endX,endY)

                //right arrow
                this.ctx.lineTo(
                    endX-headLength*Math.cos(angle+Math.PI/6),
                    endY-headLength*Math.sin(angle+Math.PI/6)
                )

                this.ctx.stroke();

            }

            else if(selectedTool=='rhombus'){
                const endX=e.clientX
                const endY=e.clientY

                const  centerX=(this.startX + endX)/2
                const  centerY=(this.startY + endY)/2

                const width = Math.abs(endX-this.startX);
                const height = Math.abs(endY-this.startY);

                this.ctx.beginPath();
                this.ctx.moveTo(centerX,centerY-height/2);
                this.ctx.lineTo(centerX+width/2,centerY);
                this.ctx.lineTo(centerX, centerY + height / 2); 
                this.ctx.lineTo(centerX - width / 2, centerY); 
                this.ctx.closePath();
                this.ctx.stroke();
            }

        }
    }

    keyDownHandler =(e)=> {
        if(!this.isTyping) return;

        if(this.selectedTool !== "write") return;

        if(e.key === 'Enter'){
            const shape={
                type:"write",
                x:this.textX,
                y:this.textY,
                text:this.currentText
            }

            if(!shape) return ;

            this.existingShapes.push(shape);
            this.isTyping=false;

            this.socket.send(
                JSON.stringify({
                    type:"chat",
                    message: JSON.stringify({shape}),
                    roomId:this.roomId
                })
            )

            this.clearCanvas();
            return ;

        }

        if(e.key === "Backspace"){
            this.currentText=this.currentText.slice(0,-1);
        }
        else if(e.key.length === 1){
            this.currentText+=e.key;
        }

        this.clearCanvas();
        
    }


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)    

    }

    initKeyboardHandlers(){
        window.addEventListener("keydown",this.keyDownHandler)
    }
}