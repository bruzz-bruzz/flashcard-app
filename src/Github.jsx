import './App.css'
export default function Github(props){
    return (
        <div className='p-4 text-center text-gray-500'>
            <h1>Made by bruzz-bruzz</h1>
            <h3><a href='https://github.com/bruzz-bruzz' className='underline' target="_blank">GitHub Profile</a></h3>
            <h4><a href={props.url} className='underline' target='_blank'>Github Repository</a></h4>
        </div>
    )
}