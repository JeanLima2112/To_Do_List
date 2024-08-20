import {Flex} from "@chakra-ui/react";
import Header from "../../components/header/Header"
import String from "../../components/phrase/String"
import axios from "axios"
import {useEffect, useState } from "react";
import { PhraseProps } from "../../types/Phrase";
import Search from "../../components/search/Search";
import TaskCard from "../../components/cards/TaskCard";




export default function Home(){
    const [phrase, setPharse] = useState <PhraseProps> ();
    useEffect(() =>{
        getPharse();
    },[]);

    const getPharse = (): Promise<void> => {
        return axios.get('https://api.adviceslip.com/advice')
            .then((res)=> {
            const { advice } = res.data.slip;
            const phraseData: PhraseProps ={
                advice
            }
            setPharse(phraseData)
            })
            
    }
    
    return(
        <Flex direction='column' gap='3rem' maxH='100dvh' padding='1rem' w='100%' alignItems='center'>
            <Header />
            {phrase && <String {...phrase}/>}
            <Search />
            <Flex w='100%' wrap='wrap' justifyContent='center' gap="2rem" overflowY="scroll">
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
               
            </Flex>
            
        </Flex>
    )
}