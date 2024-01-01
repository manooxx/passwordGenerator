import React, { useCallback, useEffect, useState, useRef } from 'react'

const Home = () => {

    const [password, setPassword] = useState("")
    const [length, setLength] = useState(6)
    const [numsAllowed, setNumsAllowed] = useState(false)
    const [charsAllowed, setCharsAllowed] = useState(false)


    //useRef hook
    const passRef = useRef(null)

    const copyPass = useCallback(()=>{

        passRef.current?.select();
        passRef.current?.setSelectionRange(0,99);
        window.navigator.clipboard.writeText(password)
    },[password])


    const passGenerator = useCallback(() => {

        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numsAllowed) str += "0123456789"
        if (charsAllowed) str += "!@#$%&"

        for (let i = 1; i <= length; i++) {

            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)

        }
        setPassword(pass);


    }, [length, numsAllowed, charsAllowed, setPassword])


    useEffect (()=>{
         
        passGenerator();

    },[length, numsAllowed, charsAllowed, passGenerator])



    return (
        <div className='bg-indigo-950 w-full h-screen flex flex-col justify-center items-center gap-4'>

            <h1 className='text-6xl text-white font-bold'>Password Generator</h1>
            <div className='w-40 rounded-full h-1 bg-white'></div>

            <div className='w-1/2 h-32 bg-white mt-4'>

                <div className='flex flex-col py-2'>

                    <div className='flex p-3 justify-center items-center gap-3'>
                        <input className='border-4 border-indigo-700 w-full h-10 px-2' type="text" value={password} readOnly placeholder='PassWord' ref={passRef}/>



                        <button className=' bg-slate-700 w-1/4 h-10 px-2 items-center text-white duration-300 text-lg font-semibold hover:bg-indigo-500 ' onClick={copyPass}>Copy</button>

                    </div>

                    <div className='flex p-3 justify-evenly items-center gap-6 text-lg text-indigo-500 font-semibold'>
                        <div>
                            <input className='cursor-pointer' type="range" min={6} max={99} value={length} onChange={(e) => { setLength(e.target.value) }} />
                            <label >Length: {length}</label>
                        </div>

                        <div>
                            <input type="checkbox" defaultChecked={numsAllowed} id="numberInput" onChange={() => { setNumsAllowed((prev) => !prev) }} />
                            <label htmlFor="">Numbers</label>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked={charsAllowed} id="numberInput" onChange={() => { setCharsAllowed((prev) => !prev) }} />
                            <label htmlFor="">Characters</label>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home
