import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = (props) => {

    const [startCount, setStartCount] = useState(0)
    const [isNextPage, setIsNextPage] = useState(false)
    let [isCountEgalIdx, setIsCountEgalIdx] = useState(false)
    
    let pageCurrent=props.numPage;
    let offset=10;
    let count=0;
    let start=0;
    let nbPages=0;
    
    const pagination = ()=>{
        const li=[];

        if (pageCurrent >= props.pages-offset) {
            count = props.pages-offset;
        }else{
            if (pageCurrent < 0) {
                count=0;
            }else{
                count = pageCurrent;
            }
        }
        if(isCountEgalIdx === false){
            if (pageCurrent === start+offset-1) {
                if (isNextPage === false) {
                    start = count;
                }else{
                    start = 0;
                    count = 0;
                }
            }else if(pageCurrent > start+offset-1){
                count = pageCurrent
                if (count + offset >= props.pages) {
                    count = props.pages-offset;
                }
                start=count
            }
            else{
                count=0;
            }
        }else {
            start=startCount+1; 
            count=startCount+1
            if (start < 0 ) {
                start = 0; 
            }
            if (count < 0) {
                count = 0;
            }
        }

        if (props.pages < offset) {
            nbPages=props.pages;
        }else{
            nbPages=count+offset;
        }

        for (let i=start; i < nbPages ; i++) 
        {
            li.push(
                <li key={i} className="items-center">
                <a onClick={()=>{onClickEvent(i)}} 
                    className={`inline-block w-10 h-10 text-center cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white
                                border border-gray-300 hover:bg-green-100 hover:text-gray-700 
                                ${pageCurrent === i ? "dark:bg-green-800":"dark:bg-gray-800"} 
                                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white`}>
                    {i+1}
                </a>
                </li>
            )
        }
        return li;
    }

    const onClickEvent = (page) => {
        props.setNumPage(page); // Permet de renvoyer au parent la page courrante.
        props.fetchEvents(page, props.category, props.search); 
        if (count === page ) {
            setIsCountEgalIdx(true);
            setStartCount(count-offset)
        }else{
            setIsCountEgalIdx(false)
        }
        pageCurrent=page;
    }

    const previousPage=()=>{
        let count = pageCurrent-1;
        if (count < 0) {count=0}
        props.fetchEvents(count, props.category, props.search);
        pageCurrent=count;
        setIsNextPage(false);
        if (start === count) {
            setIsCountEgalIdx(false)
        }
    }

    const nextPage=()=>{
        let count = pageCurrent+1

        // pages-1 car car au départ pages vaut 1, permet d'être raccord avec pageCurrent.
        if(count > props.pages-1){
            count-=1; // Evite de voir disparaitre la dernière page.
        }
        props.fetchEvents(count, props.category, props.search);
        pageCurrent=count;
        setIsNextPage(true);
        setIsCountEgalIdx(false)
    }

    useEffect(() => {
        pageCurrent=props.numPage;
        props.setCategory(props.category)
    },  [props.category])

    return (
        <>
        { props.pages ? <div className="flex justify-center my-9">
        <nav >
        <ul className="inline-flex items-center -space-x-px">
            <li>
            <a onClick={pageCurrent === 0 ? ()=>'' : ()=>previousPage()} className={`${pageCurrent === 0 ? "":"cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white"} inline-block w-10 h-10 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}><FontAwesomeIcon icon={faArrowLeft} /></a>
            </li>
                {pagination()}
            <li>
            <a onClick={pageCurrent+1 > props.pages-1 ? ()=>'' : ()=>nextPage()} className={`${pageCurrent+1 > props.pages-1 ? '':"cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white"} inline-block w-10 h-10 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}><FontAwesomeIcon icon={faArrowRight} /></a>
            </li>
        </ul>
        </nav>
        </div> : ''}
        </>
    )
}

export default Pagination