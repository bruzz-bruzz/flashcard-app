import './App.css'
import {useState,useEffect} from 'react'
import {useCookies} from 'react-cookie'
import Github from './Github'
export default function App(){
  const [cur,setCur] = useState(0)
  const [data,setData] = useState<{[key:string]:string}>({"HELLO":"WORLD"})
  const [cookies,setCookie] = useCookies()
  const [questions,setQuestions] = useState<string[]>(Object.keys(data))
  const [showConfig,setShowConfig] = useState(false)
  const [ans,setAns] = useState("")
  const [keybinds,setKeybinds] = useState<{[key:string]:string}>({
    backKeybinds:cookies.backKeybinds,
    nextKeybinds:cookies.nextKeybinds,
    showAnswerKeybinds:cookies.showAnswerKeybinds,
    testFormatKeybinds:cookies.testFormatKeybinds
  })
  function shuffle(arr:string[]){
    let keys = arr
    for(let i = arr.length - 1; i > 0; i--){
      const idx = Math.floor(Math.random() * (i + 1))
      const temp = keys[idx]
      keys[idx] = keys[i]
      keys[i] = temp
    }
    return keys
  }
  function readFile(file:File):Promise<string[]> | undefined{
    if(!file){return }
    return new Promise((resolve,reject)=>{
      const reader = new FileReader()
      reader.onload = () => {
        const res = reader.result as string
        resolve(res.split('\n'))
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsText(file)
    })
  }
  function reset(){
    setCur(0)
    setQuestions(shuffle([...Object.keys(data)]))
  }
  function back(){
    setAns("")
    setCur(idx => idx === 0 ? idx : idx - 1)
  }
  function updateAnswer(){
    setAns(ans => ans.length === 0 ? data[questions[cur]] : "")
  }
  function next(){
    setAns("")
    setCur(idx => idx < questions.length - 1 ? idx + 1 : idx)
  }
  function changeBindings(type:string,value:string){
    setCookie(type,value)
    setKeybinds({
      ...keybinds,
      [type]:value
    })
  }
  useEffect(()=>{
    function handleKeys(e:KeyboardEvent){
      if(showConfig === false){
        if(e.key === keybinds.backKeybinds){
          back()
        } else if(e.key === keybinds.nextKeybinds){
          next()
        } else if(e.key === keybinds.showAnswerKeybinds){
          updateAnswer()
        } else if(e.key === keybinds.testFormatKeybinds){}
      }
    }
    window.addEventListener('keydown',handleKeys)
    return () => {
      window.removeEventListener('keydown',handleKeys)
    }
  },[data,keybinds,cur,cookies,questions,showConfig,ans])
  return (
    <div className='h-screen bg-[#383838] text-white font-["Comic_Sans_MS"]'>
      <div className='flex justify-center items-center flex-col'>
        <h3>Flashcard App</h3>
        <div className='grid grid-cols-3 gap-2 p-4'>
          <input type='file' className='text-center border border-white-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4
         file:rounded-md file:border-0
         file:text-sm
         file:bg-[#383838] file:text-white-300
         hover:file:bg-slate-600
         cursor-pointer' onChange={async (e)=>{
            if(e.target.files){
              const ret = await readFile(e.target.files[0]) as string[]
              let res:{[key:string]:string} = {}
              while(ret.length > 0){  
                let k = ret.shift() as string
                let d = ''
                if(ret.length > 0){
                  d = ret.shift() as string
                }
                if(k.length > 0 && d.length > 0){
                  res[k] = d
                }
              } 
              setData(res)
              setQuestions(shuffle(Object.keys(res)))
              setCur(0) 
              setAns("")
            }
          }} />
          <button className='border border-white-300 rounded-lg p-2' onClick={()=>{
            reset()
          }}>Reset</button>
          <button className='border border-white-300 rounded-lg p-2' onClick={()=>setShowConfig(config => !config)}>{showConfig === false ? 'Open config' : "Close config" }</button>
        </div>
        {showConfig === false && (
          <div className='flex justify-center items-center flex-col'>
            <p>{cur + 1} / {questions.length}</p>
            <p>{questions[cur]}</p>
            <p className={`text-center w-9/10`}>{ans}</p>
            <div className='grid grid-cols-2 p-2 gap-4'>
              <button className='p-4 border border-white-300 rounded-lg p-2'>test format</button>
              <button className='p-4 border border-white-300 rounded-lg p-2' onClick={()=>{
                updateAnswer()
                }}>show answer</button>
              <button className='p-4 border border-white-300 rounded-lg p-2' onClick={()=>back()}>back</button>
              <button className='p-4 border border-white-300 rounded-lg p-2' onClick={()=>next()}>next</button>
            </div>
            </div>
        )}
        {showConfig === true && (
          <div className='flex justify-center items-center flex-col'>
            <p>Config</p>
            <div className='grid grid-cols-1 gap-2 p-2'>
              <div className='inline m-2'>
                <label>test format keybind:</label>
                <input type='text' onChange={(e)=>changeBindings('testFormatKeybinds',e.target.value)} className='border border-white-300 rounded-lg p-2 text-center' value={cookies.testFormatKeybinds !== undefined ? cookies.testFormatKeybinds : 'None currently'} />
              </div>
              <div className='inline m-2'>
                <label>show answer keybind:</label>
                <input type='text' onChange={(e)=>changeBindings('showAnswerKeybinds',e.target.value)} className='border border-white-300 rounded-lg p-2 text-center' value={cookies.showAnswerKeybinds !== undefined ? cookies.showAnswerKeybinds : 'None currently'} />
              </div>
              <div className='inline m-2'>
                <label>back keybind:</label>
                <input type='text' onChange={(e)=>changeBindings('backKeybinds',e.target.value)} className='border border-white-300 rounded-lg p-2 text-center' value={cookies.backKeybinds !== undefined ? cookies.backKeybinds : 'None currently'} />
              </div>
              <div className='inline m-2'>
                <label>next keybind:</label>
                <input type='text' onChange={(e)=>changeBindings('nextKeybinds',e.target.value)} className='border border-white-300 rounded-lg p-2 text-center' value={cookies.nextKeybinds !== undefined ? cookies.nextKeybinds : 'None currently'} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Github repoURL='A' profileURL='A' />
    </div>
  )
}
