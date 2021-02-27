import React from 'react'
import MaterialIcon from 'material-icons-react';
import './TaskInput.css';
import Modal from 'react-modal';
import {tagElement, pinElementActive, pinElementInActive} from './icons';


function TaskInput({ tags, isAddtagActive, OpenAddTaskInput,openTagModal, closeTagModal, isTagModalOpen,HandleAddTagInputChange, HandleApplyTag, bgColors, addTagInput, isClrModalOpen, openClrModal, closeClrModal, HandleTagClick, test, bgColor, HandleClrClick, isPinned, HandleInputPinClick, HandleTaskInputChange, HandleAddTaskBtn, addTaskInput }) {


  const tagModalCustomStyles = {
    content : {
      top : '50%',
      left : '50%',
      right : 'auto',
      bottom : 'auto',
      marginRight : '-50%',
      transform : 'translate(-50%, -50%)',
      width: '20%'
    }
  };
  const clrModalCustomStyles = {
    content : {
      top : '50%',
      left : '50%',
      right : 'auto',
      bottom : 'auto',
      marginRight : '-50%',
      transform : 'translate(-50%, -50%)'
    }
  };
  

  return (
    <div className='TaskInput'>
      <input type="text" placeholder="Type Task here" value = {addTaskInput} className = 'input-field' onChange={HandleTaskInputChange} />
      <div className="btn-container">

        <div onClick={openTagModal} className="icon-btns tag-btn">{tagElement}</div>

        <div className="icon-btns color-btn" onClick={openClrModal}><div className="color-btn-inner-div" style={{backgroundColor: bgColor}}></div></div>

        <div className="icon-btns pin-btn"  onClick={HandleInputPinClick}>{isPinned? pinElementActive : pinElementInActive}</div>

        <button className="add-btn" onClick={HandleAddTaskBtn}> <MaterialIcon color="white" icon="add"/> ADD</button>
        
      </div>
      <Modal
          isOpen={isTagModalOpen}
          onRequestClose={closeTagModal}
          style={tagModalCustomStyles}
          contentLabel="Tag Modal"
      >
        <div className="tag-modal-wrapper">
        {
          tags.map((tag,index) => (
            <p onClick = {()=>HandleTagClick(index)} className = "tags">{tag}</p>
          ))
        }
        {isAddtagActive && <input onChange={HandleAddTagInputChange} type="text" value={addTagInput}/>}
        {!isAddtagActive && <button onClick={OpenAddTaskInput} className="add-btn tag-add-btn"> <MaterialIcon  color="white" icon="add"/> Add Tag </button>}
        {isAddtagActive && <button onClick={HandleApplyTag} className="tag-apply-btn">Apply</button>}
        </div>

      </Modal>
      <Modal
          isOpen={isClrModalOpen}
          onRequestClose={closeClrModal}
          style={clrModalCustomStyles}
          contentLabel="Color Modal"
      >
        <div className="clr-modal-wrapper">
        {
        bgColors.map((color,index)=>(
          <div onClick={()=>HandleClrClick(index)} style={{background: color}} className="color-selector-div"></div>
        ))
      }
        </div>
      </Modal>

    </div>
  )
}

export default TaskInput
