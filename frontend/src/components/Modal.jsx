/* eslint-disable */
import React, {useState} from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ExpenseForm from "./ExpenseForm"

const ModalComponent = (props) => {
    return (
      <>
        <Modal show={props.openModal} onHide={props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <ExpenseForm submitExpense={props.submitExpense}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default ModalComponent
