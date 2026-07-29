import './App.css'
import {useState,useEffect} from 'react'
import {useCookies} from 'react-cookie'
export default function App(){
  const [cookies,setCookie] = useCookies(['config'])
  const [fileData,setFileData] = useState({"No questions":"No Questions"})
  const [keys,setKeys] = useState(Object.keys(fileData))
  const [currIdx,setCurrIdx] = useState(0)
  const [currAnswer,setCurrAnswer] = useState("")
  const [currQues,setCurrQues] = useState(keys[currIdx])
  const [showConfig,setShowConfig] = useState(false)
  function shuffle(keys){
    let arr = keys
    for(let i = keys.length - 1; i > 0; i--){
      const idx = Math.floor(Math.random() * (i + 1))
      const temp = arr[idx]
      arr[idx] = arr[i]
      arr[i] = temp
    }
    setKeys(arr)
    setCurrAnswer(arr[0])
  }
  function readFile(file){
    if(!file){
      return
    }
    return new Promise((resolve,reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(JSON.parse(reader.result))
      } 
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsText(file)
    })
  }
  function back(){
    setCurrAnswer("")
    setCurrIdx(idx => {
      if(idx === 0){
        updateQuestion(idx)
        return idx
      } else {
        updateQuestion(idx - 1)
        return idx - 1
      }
    })
    updateQuestion()
  }
  function next(){
    setCurrAnswer("")
    setCurrIdx(idx => {
      if(idx < keys.length - 1){
        updateQuestion(idx + 1)
        return idx + 1
      } else {
        updateQuestion(idx)
        return idx
      }
    })
  }
  function updateQuestion(i){
    setCurrQues(keys[i])
  }
  function showAnswer(){
    if(currAnswer.length === 0) {
      setCurrAnswer(fileData[keys[currIdx]])
    } else {
      setCurrAnswer("")
    }
  }
  function testFormat(){
    const string = `
    {
    "test":"TEST"
    }
    `
    if(currAnswer.length === 0){
        setCurrAnswer(string)
    } else {
      setCurrAnswer("")
    }
  }
  function changeBinding(type,value){
    setCookie(type,value)
  }
  function reset(){
    shuffle(keys)
    setCurrAnswer("")
    setCurrIdx(0)
    updateQuestion(0)
  }
  useEffect(()=>{
    function handleKeystrokes(e){
      if(showConfig === false){
        if(e.key === cookies.backKeybinds){
          back()
        } else if(e.key === cookies.nextKeybinds){
          next()
        } else if(e.key === cookies.showAnswerKeybinds){
          showAnswer()
        } else if(e.key === cookies.testFormatKeybinds){
          testFormat()
        }
      }
    }
    window.addEventListener('keydown',handleKeystrokes)
    console.log(cookies)
  },[])
  return (
    <div className={`${cookies.mode === 'DARK' ? 'bg-gray-500 text-white' : 'bg-slate-500 text-black'} font-mono h-screen`}>
      <div className='flex justify-center items-center flex-col'> 
          <h3>Flashcard App</h3>
          <div className='flex justify-center items-center flex-col'>
            <div className='grid grid-cols-3 p-2'>
            <input type='file' className={`border m-2 ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} rounded-lg p-2 `} onChange={async (e)=>{
              const data = await readFile(e.target.files[0])
              setFileData(data)
              shuffle(Object.keys(data))
              setCurrIdx(0)
              setCurrAnswer('')
            }}/>
            <button className={`border m-2 ${cookies.mode === 'DARK' ? 'border-white-500 text-white-500' : 'border-gray-500 text-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>reset()}>Reset</button>
            <button  className={`border m-2 ${cookies.mode === 'DARK' ? 'border-white-500 text-white-500' : 'border-gray-500 text-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>setShowConfig(config=>!config)}>{showConfig === false ? 'Open settings' : "Close settings"}</button>
            </div>
            {showConfig === false && (
              <div className='flex justify-center items-center flex-col'>
              <p>{currIdx + 1} / {keys.length}</p>
              <h3 className='text-center w-4/5'>{currQues}</h3>
              <p className='text-center w-4/5'>{currAnswer}</p>
              <div className='grid grid-cols-2 p-2 gap-4'>
                  <button className={`border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>testFormat()}>test format</button>
                  <button className={`border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>showAnswer()}>show answer</button>
                  <button className={`border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>back()}>back</button>
                  <button className={`border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg hover:cursor-pointer`} onClick={()=>next()}>next</button>
              </div>
            </div>
            )}
            {showConfig === true && (
              <div className='flex justify-center items-center flex-col'>
                <p>Config</p>
                <div className='grid grid-cols-1'>
                <div className='inline'>
                  <label>test format keybind: {cookies.testFormatKeybinds} </label>
                  <input type='text' className={`m-2 border text-center border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg`} onChange={(e)=>changeBinding('testFormatKeybinds',e.target.value)} />
                </div>
                <div className='inline'>
                  <label>show answer keybind: {cookies.showAnswerKeybinds}</label>
                  <input type='text' className={`m-2 text-center border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg`} onChange={(e)=>changeBinding('showAnswerKeybinds',e.target.value)} />
                </div>
                <div className='inline'>
                  <label>back keybind: {cookies.backKeybinds}</label>
                  <input type='text' className={`m-2 text-center border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg`} onChange={(e)=>changeBinding('backKeybinds',e.target.value)} />
                </div>
                <div className='inline'>
                  <label>next keybind: {cookies.nextKeybinds}</label>
                  <input type='text' className={`m-2 text-center border ${cookies.mode === 'DARK' ? 'border-white-500' : 'border-gray-500'} p-2 rounded-lg`} onChange={(e)=>changeBinding('nextKeybinds',e.target.value)} />
                </div>
                <div className='inline'>
                  <label>mode: </label>
                  <select value={cookies.mode} className={`border ${cookies.mode === 'DARK' ? 'border-white-500 text-white-500':"border-gray-500 text-slate-500"} rounded-lg p-2`} onChange={(e)=>changeBinding('mode',e.target.value)}>
                    <option value="DARK" className={`${cookies.mode === 'DARK' ? 'bg-gray-500 text-white-500' : 'bg-slate-500 text-black-500'}`}>dark</option>
                    <option value="light"  className={`${cookies.mode === 'DARK' ? 'bg-gray-500 text-white-500' : 'bg-slate-500 text-black-500'}`}>light</option>
                  </select>
                </div>
              </div>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}