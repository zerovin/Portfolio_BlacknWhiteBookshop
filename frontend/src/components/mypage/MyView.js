import { useEffect, useState } from "react"
import {getAll} from "../util/cookie"
import { Link } from "react-router-dom"

const MyView=()=>{
    const [images, setImages] = useState([])
    const [keys, setKeys] = useState([])

    useEffect(()=>{
        const cookies = getAll()
        const keys = Object.keys(cookies)
        const values = Object.values(cookies)

        const imgs=[]
        const klist = []
        let j = 0

        for(let i = keys.length-1;i>=0;i--){
            if(keys[i].startsWith("book_") && j<12){
                imgs.push(values[i])
                klist.push(keys[i])
                j++
            }
        }
        setImages(imgs)
        setKeys(klist)
    }, [])
    return(
        <div id="Myview">
            <div className="container">
                {images.length === 0 ? (
                    <p>최근 본 상품이 없습니다.</p>
                ) : (
                <div className="grid">
                    {images.map((src, idx)=>(
                        <div className="grid-item" key={idx}>
                            <Link to={`/book/detail/${keys[idx].replace("book_", "")}`}>
                                <img src={src} alt={`Book ${idx}`} />
                            </Link>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    )
}

export default MyView