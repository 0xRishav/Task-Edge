import './TaskBlock.css';
import {pinElementActive, pinElementInActive} from '../task-input/icons'


function TaskBlock({task, tag, color, isTaskPinned, HandleTaskBlockPinClick,HandleAllTaskDelete, index, indTask, id}) {




  return (
    <div className="task-block" style={{backgroundColor: color}}>
      <div className="pin-delete-container">
        <div className="TaskBlock__pin" onClick = {()=>HandleTaskBlockPinClick(id)}>
        {isTaskPinned? pinElementActive : pinElementInActive}
        </div>
        
        <img src="https://img.icons8.com/ios-glyphs/30/000000/macos-close.png" onClick={()=>HandleAllTaskDelete(id)} alt="close"style={{marginLeft: "10px", cursor: "pointer"}}/>
      </div>
      <h4 className="task">{task}</h4>
      {tag!=='' && <p className="tag">{tag}</p>}
        
      
      

    </div>
  )
}

export default TaskBlock
