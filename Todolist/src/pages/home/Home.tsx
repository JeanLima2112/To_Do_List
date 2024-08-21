import { Flex } from "@chakra-ui/react";
import Header from "../../components/header/Header";
import String from "../../components/phrase/String";
import axios from "axios";
import { useEffect, useState } from "react";
import { PhraseProps } from "../../types/Phrase";
import Search from "../../components/search/Search";
import TaskCard from "../../components/cards/TaskCard";
import { getToken } from "../login/tokenManager";
import { TaskProps } from "../../types/task";


export default function Home() {
  const [phrase, setPhrase] = useState<PhraseProps>();
  const [tasks, setTasks] = useState<TaskProps[]>([]); 

  useEffect(() => {
    getPhrase();
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });


      setTasks(response.data);

    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  };

  const getPhrase = (): Promise<void> => {
    return axios.get("https://api.adviceslip.com/advice").then((res) => {
      const { advice } = res.data.slip;
      const phraseData: PhraseProps = {
        advice,
      };
      setPhrase(phraseData);
    });
  };

  return (
    <Flex
      direction="column"
      gap="3rem"
      maxH="100dvh"
      padding="1rem"
      w="100%"
      alignItems="center"
    >
      <Header />
      {phrase && <String {...phrase} />}
      <Search />
      <Flex
        w="100%"
        wrap="wrap"
        justifyContent="center"
        gap="2rem"
        overflowY="scroll"
      >
        {tasks.map((task) => (
          <TaskCard 
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            expirationDate={task.expirationDate}
          />
        ))}
      </Flex>
    </Flex>
  );
}
