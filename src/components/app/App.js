import { useState } from 'react';
import { TaskInput, TaskBlock } from '../index'
import './App.css';


function App() {


  const bgColors = ["#FF9082","#E9E7E7","#B3AAA5","#197838","#2FB5AA","#D72A59","#A7926F"]
  const [bgColor, setBgColor] = useState('#FF9082');
  const [tags , setTags] = useState(['Work', 'Home','Study','Others']);
  const [idCounter, setIdCounter] = useState(0);
  const [isAddtagActive, setIsTagActive] = useState(false);
  const [isTagModalOpen,setIsTagModalOpen] = useState(false);
  const [isClrModalOpen,setIsClrModalOpen] = useState(false);
  const [addTagInput, setAddTagInput ] = useState('');
  const [addTaskInput, setAddTaskInput] = useState('');

  const [isPinned, setIsPinned] = useState(false);

  const [activeTag, setActiveTag] = useState('');

  const [tasks, setTasks] = useState([]);

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [activeFilterTag, setActiveFilterTag] = useState('');
  const [filteredPinnedArr, setFilteredPinnedArr] = useState([]);
  const [filteredAllArr, setFilteredAllArr] = useState([]);

  const pinnedTasks = tasks.filter(task=> task.isTaskPinned === true)
  const OpenAddTaskInput = ()=>{
    setIsTagActive(true);
  }

  const HandleTaskInputChange = (e) => {
    setAddTaskInput(e.target.value);
  }

  const HandleAllTaskDelete=(idToBeDeleted)=>{
    setTasks(tasks.filter((task)=> task.id!==idToBeDeleted));
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

  const HandleTaskBlockPinClick = (i) =>{
    let copyArray = [...tasks];
    copyArray[i].isTaskPinned = !copyArray[i].isTaskPinned;
    setTasks([...copyArray]);
  }

  const HandleAddTaskBtn = () => {
    if(addTaskInput===''){
      return;
    }
    setTasks([...tasks,{
      task: addTaskInput,
      tag: activeTag,
      color: bgColor,
      isTaskPinned: isPinned,
      id: idCounter
    }]);
    setAddTaskInput('');
    setActiveTag('');
    setIsPinned(false);
    setIdCounter(idCounter + 1);
    console.log(tasks);
  }

  const HandleFilterClick = (i) => {
    setActiveFilterTag(tags[i]);
    setIsFilterActive(true);
    setFilteredPinnedArr(pinnedTasks.filter(pinnedTask=>pinnedTask.tag === tags[i]));
    setFilteredAllArr(tasks.filter(allTask=>allTask.tag === tags[i]));
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

  return (
    <div className="App">
      <div className="App__wrapper">
        <h1 style={{textAlign: "center", marginBottom: "2px"}}>Hey there👋, Welcome to Tasks Edge</h1>
        <h6 style={{textAlign: "center", color: "black", marginTop: "10px"}}>Note, Pin and Filter all of your Taks at one place</h6>
        <TaskInput  tags = {tags} isAddtagActive={isAddtagActive} OpenAddTaskInput = {OpenAddTaskInput} openTagModal={openTagModal} closeTagModal={closeTagModal} isTagModalOpen = {isTagModalOpen} HandleAddTagInputChange = {HandleAddTagInputChange} HandleApplyTag={HandleApplyTag} bgColors={bgColors} addTagInput={addTagInput} isClrModalOpen={isClrModalOpen} openClrModal={openClrModal} closeClrModal={closeClrModal} HandleTagClick={HandleTagClick}  bgColor = {bgColor} HandleClrClick={HandleClrClick} isPinned={isPinned} HandleInputPinClick = {HandleInputPinClick} HandleTaskInputChange = {HandleTaskInputChange} HandleAddTaskBtn={HandleAddTaskBtn} addTaskInput={addTaskInput}/>

        <div className="left-right-container">
          <div className="left-div">
            <h3>Fillter by Tags:</h3>
            {
              tags.map((tag, index)=>(
                <h4 className={activeFilterTag === tag ? 'tag-active filter-tag' : 'filter-tag'} onClick={()=>HandleFilterClick(index)}>{tag}</h4>
              ))
            }
          </div>
          <div className="right-div">
          {pinnedTasks.length !== 0 && <h2>Pinned</h2>}
        
        <div className="task-blocks-wrapper">
          {
            (isFilterActive? filteredPinnedArr : pinnedTasks)
            .map((individualTask, index)=>(
              <TaskBlock indTask = {individualTask} {...individualTask} HandleTaskBlockPinClick = {HandleTaskBlockPinClick} HandleAllTaskDelete={HandleAllTaskDelete} index={index} />
            ))
          }
        </div>

        {tasks.length !== 0 && <h2>All</h2>}
        <div className="task-blocks-wrapper">
          {(isFilterActive? filteredAllArr : tasks)
            .map((individualTask, index)=>(
              <TaskBlock {...individualTask} HandleTaskBlockPinClick = {HandleTaskBlockPinClick} HandleAllTaskDelete={HandleAllTaskDelete} index={index} />
            ))
          }
          </div>
        </div>

        </div>
      </div>



    </div>
  );
}

export default App;
