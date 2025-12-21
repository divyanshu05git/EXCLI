import { Square } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({
    icon,
    onClick,
    active=false
}:{
    icon:ReactNode,
    onClick:()=>void,
    active?:boolean
}){
    return <div className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-gray ${active?"text-red-400":"text-white"}`} onClick={onClick}>
        {icon}
    </div> 
}