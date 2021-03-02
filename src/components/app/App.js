import { useState } from 'react';
import { TaskInput, TaskBlock } from '../index'
import './App.css';


function App() {

  /************************ Hook for local storage ************************/
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}



/*************************** ALL CONSTS AND STATES ***************************************/



  // This state for all the tasks
  const [tasks, setTasks] = useLocalStorage('tasks',[]);


// These are all background colors
  const bgColors = ["#FF9082","#E9E7E7","#B3AAA5","#197838","#2FB5AA","#D72A59","#A7926F"]

  // This is bg color active for an individual task 
  const [bgColor, setBgColor] = useState('#FF9082');

  // These are all the tags and setTags function
  const [tags , setTags] = useLocalStorage('tags',['Work', 'Home','Study','Others']);

  // This is an id counter which is used to give an unique id to all the tasks
  const [idCounter, setIdCounter] = useState(0);

  // This is to check if the user is currently adding a tag 
  const [isAddtagActive, setIsTagActive] = useState(false);

  // This state is for checking and opening the tag modal
  const [isTagModalOpen,setIsTagModalOpen] = useState(false);

  // This state is for checking and opening the color modal
  const [isClrModalOpen,setIsClrModalOpen] = useState(false);

  // This state is to track the change of input for adding a tag
  const [addTagInput, setAddTagInput ] = useState('');

  // This state is to track the change of input for adding a task
  const [addTaskInput, setAddTaskInput] = useState('');

  // This is to check if task has to be pinned or not
  const [isPinned, setIsPinned] = useState(false);

  // This is to track which tag is active
  const [activeTag, setActiveTag] = useState('');


  // This is to check if the user is trying to filter the tasks
  const [isFilterActive, setIsFilterActive] = useState(false);

  // This state is to track which filter tag is active
  const [activeFilterTag, setActiveFilterTag] = useState('');

  // const [filteredPinnedArr, setFilteredPinnedArr] = useState([]);
  const [filteredAllArr, setFilteredAllArr] = useState([]);

  // Array for pinned tasks
  const pinnedTasks = tasks.filter(task=> task.isTaskPinned === true);

  // Array for pinned filtered tasks
  const filteredPinnedArr = filteredAllArr.filter(task=> task.isTaskPinned === true);

  


  /*************************** ALL FUNCTIONS ***************************************/


// This is to show the input field when user wants to add a tag
  const OpenAddTaskInput = ()=>{
    setIsTagActive(true);
  }

  // To track the input change of task
  const HandleTaskInputChange = (e) => {
    setAddTaskInput(e.target.value);
  }

  // To handle the delete button
  const HandleAllTaskDelete=(idToBeDeleted)=>{
    if(isFilterActive){
      setFilteredAllArr(filteredAllArr.filter((task)=> task.id!==idToBeDeleted));
    }else{
      setTasks(tasks.filter((task)=> task.id!==idToBeDeleted));
    }
  }

  // To handle the change in add tag input field
  const HandleAddTagInputChange = (e) => {
    setAddTagInput(e.target.value);
    console.log(e.target.value);
  }

  // To add the tag addition
  const HandleApplyTag=()=>{
    if(addTagInput === ''){
      setIsTagActive(false);
      return;
    }
    setTags([...tags, addTagInput]);
    setIsTagActive(false);
    setAddTagInput('');
  }

// To track selected tag
  const HandleTagClick = (i) => {
    setActiveTag(tags[i]);
    setIsTagModalOpen(false);
    setIsTagActive(false);
  }

// To track selected background color
  const HandleClrClick = (i) =>{
    setBgColor(bgColors[i]);
    setIsClrModalOpen(false);
  }

  // To handle the pin click in the input section
  const HandleInputPinClick = () => {
    setIsPinned(!isPinned);
  }


  // To handle add task btn
  // The task is an object of 5 keys : task->string, tag->string, color-> string,  isTaskPinned->boolean, id->integer
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

  // To handle filter buttons
  const HandleFilterClick = (i) => {
    if(i===-2){
      setIsFilterActive(false);
      setActiveFilterTag('All');
      return;
    }
    setActiveFilterTag(tags[i]);
    setIsFilterActive(true);
    // setFilteredPinnedArr(pinnedTasks.filter(pinnedTask=>pinnedTask.tag === tags[i]));
    setFilteredAllArr(tasks.filter(allTask=>allTask.tag === tags[i]));
  }

  // This is to handle the pin click in all the individual tasks
  const HandleTaskBlockPinClick = (i) =>{
    if(isFilterActive){
      let copyArray = [...filteredAllArr];
      copyArray[i].isTaskPinned = !copyArray[i].isTaskPinned;
      setFilteredAllArr([...copyArray]);
    }else{
      let copyArray = [...tasks];
      copyArray[i].isTaskPinned = !copyArray[i].isTaskPinned;
      setTasks([...copyArray]);
    }
  }


  // These functions are to handle the opening and closing of tag and color modals
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
            <div className="left-div-tags-wrapper">
            <h4 className={activeFilterTag === 'All' ? 'tag-active filter-tag' : 'filter-tag'} onClick={()=>HandleFilterClick(-2)}>All</h4>
            {
              tags.map((tag, index)=>(
                <h4 className={activeFilterTag === tag ? 'tag-active filter-tag' : 'filter-tag'} onClick={()=>HandleFilterClick(index)}>{tag}</h4>
              ))
            }
            </div>


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
