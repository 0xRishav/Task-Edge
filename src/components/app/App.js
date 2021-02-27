import { useState } from 'react';
import { TaskInput } from '../index'
import './App.css';


function App() {
  const bgColors = ["#FF9082","#E9E7E7","#B3AAA5","#197838","#2FB5AA","#D72A59","#A7926F"]
  const [bgColor, setBgColor] = useState('#FF9082');
  const [tags , setTags] = useState(['Work', 'Home', 'Others']);
  const [isAddtagActive, setIsTagActive] = useState(false);
  const [isTagModalOpen,setIsTagModalOpen] = useState(false);
  const [isClrModalOpen,setIsClrModalOpen] = useState(false);
  const [addTagInput, setAddTagInput ] = useState('');
  const [addTaskInput, setAddTaskInput] = useState('');

  const [isPinned, setIsPinned] = useState(false);

  const [activeTag, setActiveTag] = useState('');

  const [tasks, setTasks] = useState([]);

  const OpenAddTaskInput = ()=>{
    setIsTagActive(true);
  }

  const HandleTaskInputChange = (e) => {
    setAddTaskInput(e.target.value);
  }

  const HandleAddTagInputChange = (e) => {
    setAddTagInput(e.target.value);
    console.log(e.target.value);
  }
  const HandleApplyTag=()=>{
    if(addTagInput === ''){
      setIsTagActive(false);
      return;
    }
    setTags([...tags, addTagInput]);
    setIsTagActive(false);
    setAddTagInput('');
  }

  const HandleTagClick = (i) => {
    setActiveTag(tags[i]);
    setIsTagModalOpen(false);
    setIsTagActive(false);
  }

  const HandleClrClick = (i) =>{
    setBgColor(bgColors[i]);
    setIsClrModalOpen(false);
  }

  const HandleInputPinClick = () => {
    setIsPinned(!isPinned);
  }

  const HandleAddTaskBtn = () => {
    if(addTaskInput===''){
      return;
    }
    setTasks([...tasks,{
      task: addTaskInput,
      tag: activeTag,
      color: bgColor,
      isTaskPinned: isPinned
    }]);
    setAddTaskInput('');
    console.log(tasks);
  }

  function openTagModal() {
    setIsTagModalOpen(true);
  }

  function closeTagModal(){
    setIsTagModalOpen(false);
    setIsTagActive(false);
  }
  function openClrModal() {
    setIsClrModalOpen(true);
  }

  function closeClrModal(){
    setIsClrModalOpen(false);
    
  }

  const test = () =>{
    console.log(activeTag);
    console.log(isPinned);
  }  
  return (
    <div className="App">
      <div className="App__wrapper">
        <TaskInput  tags = {tags} isAddtagActive={isAddtagActive} OpenAddTaskInput = {OpenAddTaskInput} openTagModal={openTagModal} closeTagModal={closeTagModal} isTagModalOpen = {isTagModalOpen} HandleAddTagInputChange = {HandleAddTagInputChange} HandleApplyTag={HandleApplyTag} bgColors={bgColors} addTagInput={addTagInput} isClrModalOpen={isClrModalOpen} openClrModal={openClrModal} closeClrModal={closeClrModal} HandleTagClick={HandleTagClick} test={test} bgColor = {bgColor} HandleClrClick={HandleClrClick} isPinned={isPinned} HandleInputPinClick = {HandleInputPinClick} HandleTaskInputChange = {HandleTaskInputChange} HandleAddTaskBtn={HandleAddTaskBtn} addTaskInput={addTaskInput}/>
      </div>
    
    </div>
  );
}

export default App;
