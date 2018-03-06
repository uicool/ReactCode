import React from 'react';
//Using a Third-Party Component
import Modal from 'react-modal';

const OptionModal = (props) => ( //return our jsx for our stateless functional components
    <Modal
        isOpen={!!props.selectedOption} 
        onRequestClose={props.handleClearSelectedOption}
        contentLablel="Selected Option"
        closeTimeoutMS={200}
        className="modal"
    >  
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick = {props.handleClearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;