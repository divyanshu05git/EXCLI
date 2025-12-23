import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./Icon";
import { Circle, Eraser, Pencil, Square ,ArrowRight } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool='circle' | 'rect' | 'pencil' | 'arrow'

export function Canvas({
    roomId,
    socket
}:{
    socket:WebSocket
    roomId:string
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool,setSelectedTool]=useState<Tool>('circle');
    const [game,setGame] = useState<Game>()

    useEffect(()=>{
        game?.setTool(selectedTool);
    },[selectedTool,game])


    useEffect(() => {

        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }


    }, [canvasRef]);

    return <div style={{
        height:"100vh",
        overflow:"hidden"
    }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <div className="fixed top-4 left-1/4 -translate-x-[60%] z-50">
            <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
        </div>
    </div>
}

function Topbar({selectedTool,setSelectedTool}:{
    selectedTool:Tool,
    setSelectedTool:(s:Tool) => void
}){

    return  <div style={{
        position:"fixed",
        top:10,
        left:10
    }}>
        <div className="flex gap-t">
            <IconButton active={selectedTool=='pencil'} icon={<Pencil/>} onClick={()=>{setSelectedTool('pencil')}} ></IconButton>
            <IconButton active={selectedTool=='rect'} icon={<Square/>} onClick={()=>{setSelectedTool('rect')}}></IconButton>
            <IconButton active={selectedTool=='circle'} icon={<Circle/>} onClick={()=>{setSelectedTool('circle')}}></IconButton>
            <IconButton active={selectedTool=='arrow'} icon={<ArrowRight/>} onClick={()=>{setSelectedTool('arrow')}}></IconButton>
        </div>
        
    </div>
}