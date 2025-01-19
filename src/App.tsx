import { ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
type DetailsObject={
  id:number;
  text:string;
  isCompleted:boolean;
}
function App() {
  
  const [input,setInput]=useState<string>("");
  const [editingId,setEditingId]=useState<number | null>(null);
  const [editingText,setEditingText]=useState<string>("");
  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value);
  }

  const [arr,setArr]=useState<DetailsObject[]>([]);

  function handleTask(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(!input) return alert("Add task")
     const obj:DetailsObject={
      id:Math.random()*1000,
      text:input!,
      isCompleted:false,
     }
     setArr((prev:DetailsObject[])=>{
      return [...prev,obj]
     })
     setInput("");
  }
  function deleteTask(id:number){
    setArr((prev)=>{
      return prev.filter((task)=>task.id!==id)
    })
  }
function startEditing(id:number,text:string){
  setEditingId(id);
  setEditingText(text);
}
function saveEditing(id:number|null){
  if (!editingText.trim()) {
    alert("Task cannot be empty!");
    return;
  }
  setArr((prev)=>{
    return prev.map((task)=>{
      return task.id===id?{...task,text:editingText}:task
    })
  })
  setEditingId(null);
  setEditingText("");
}

function cancelEditing(){
  setEditingId(null);
  setEditingText("");
}

function checkBox(id:DetailsObject["id"]){
   setArr((prev)=>{
    return prev.map((task)=>{
      return task.id===id ? {...task,isCompleted:!task.isCompleted} : task ;
    })
   })
}

  return (
  <div className='min-h-screen bg-slate-200 p-4'>
    <div className='container max-w-3xl bg-white mx-auto h-[calc(100vh-100px)] mt-8 shadow-md flex flex-col justify-between'>
      <div className="overflow-y-auto mx-2 mt-2 border-2 rounded-sm p-2">
        {
          arr.length>0?arr.map((task:DetailsObject)=>(
            <Task isCompleted={task.isCompleted} key={task.id} id={task.id} text={task.text} startEditing={startEditing} saveEditing={saveEditing} deleteTask={deleteTask} editingid={editingId} editingText={editingText} cancelEditing={cancelEditing} checkBox={checkBox}/>
          )):(<div className="text-center p-2 bg-slate-200">No tasks added yet!</div>)
        }
      </div>
      <div className="mx-2">
        <input value={input} placeholder="Enter task in here" onChange={onChange} className="outline-none w-full  my-2 p-3 bg-slate-300 rounded-md"/>
        <button onClick={handleTask} className="w-full my-2 bg-blue-700 hover:bg-blue-400 rounded-md p-2 font-medium text-gray-300">Add task</button>
      </div>
    </div>
  </div>
)
}

export default App
 
export function Task({text,id,deleteTask,checkBox,isCompleted,editingid,editingText,startEditing,cancelEditing,saveEditing}:{text:string;id:number;deleteTask:(id:number)=>void;editingid:number|null;editingText:string; startEditing:(id:number,text:string)=>void; cancelEditing:()=>void;saveEditing:(id:number|null)=>void;checkBox:(id:number)=>void;isCompleted:boolean}){
 function delTask(){
    deleteTask(id);
 }
  return (
    <div className={`p-2 flex justify-between items-center mb-2 bg-slate-200 ${isCompleted? "bg-red-200":""}`}>
      {editingid===id?(<div className="flex items-center">
        <input value={editingText} className="outline-none bg-white mr-2 p-2 rounded-md" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
           startEditing(id,e.target.value)
        }}/>
        <button onClick={() => saveEditing(id)} className="bg-green-500 px-2 py-1 rounded-md">Save</button>
        <button onClick={cancelEditing} className="bg-red-500 px-2 py-1 rounded-md ml-2">Cancel</button>
      </div>):<p className={`overflow-hidden ${isCompleted?"line-through":""}`} title={text}>{text}</p>}
          
          <div className="flex items-center">
            <input type="checkbox" checked={isCompleted} onChange={()=>checkBox(id)}/>
            <button onClick={()=>startEditing(id,text)}><MdEdit className="ml-2 md:ml-4 "/></button>
            <button onClick={delTask}><MdDelete className="size-5 ml-2 md:ml-4 "/></button>
          </div>
    </div>
  )
}