import './App.css'
export default function Toast(props){
    return (
        <div className={`rounded-lg p-4 absolute right-5 bottom-5 font-mono ${props.ok === true ? 'bg-green-500' : 'bg-red-500'}`}>
            <p>{props.msg}</p>
        </div>
    )
}