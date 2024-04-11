import './App.css'
import { Button, TextField } from '@mui/material'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';


function App() {

  const [show, setShow] = useState(false);

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBMI] = useState(0)

  const [isWeight, setisWeight] = useState(true)
  const [isHeight, setisHeight] = useState(true)

  const handleClose = () => {
    setShow(false)
    setWeight('')
    setHeight('')
    setBMI(0)
  }

  const validate = (e) => {

    const { name, value } = e.target

    if (!!value.match(/^\d{0,3}$/) && name == 'weight') {
      setWeight(value)
      setisWeight(true)
    }
    else if (!!value.match(/^[0-9]*\.[0-9]{1}$/) && name == 'height') {
      setHeight(value)
      setisHeight(true)
    }
    else {
      if (name == 'weight') {
        setWeight(value)
        setisWeight(false)
      }
      else {
        setHeight(value)
        setisHeight(false)
      }
    }


  }

  const handleShow = () => setShow(true);

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setBMI(0)
    setisWeight(true)
    setisHeight(true)
  }

  const calculateBMI = () => {
    const userHeight = height.split('.')
    const heightSquared = ((Number(userHeight[0]) * 0.3048) + (Number(userHeight[1]) * 0.0254)) ** 2
    setBMI(weight / heightSquared.toFixed(2))
    handleShow()
  }

  return (
    <>
      <div className='main-container'>
        <div className='form-container rounded shadow border'>
          <form action="" className='mt-3'>
            <h3 className='text-center mt-3'>BMI Calculator</h3>
            <div className='mt-3 d-flex w-100 justify-content-center align-items-center flex-column'>
              <TextField id="outlined-basic" label="Weight in Kg" variant="outlined" className='w-50'
                value={weight || ''} name="weight" onChange={(e) => validate(e)} />
              {!isWeight && <p className='text-danger height'>Please enter a valid weight</p>}

              <TextField id="outlined-basic" label="Height in feet.inch" variant="outlined" className='w-50 mt-3'
                value={height || ''} name="height" onChange={(e) => validate(e)} />
              {!isHeight && <p className='text-danger height'>Please enter a valid height</p>}

            </div>

            <div className='d-flex justify-content-center mt-5 mb-5'>
              <Button variant="contained" color="success" className='w-25 p-3' onClick={calculateBMI}
                disabled={isWeight && isHeight && weight != '' && height != '' ? false : true}>Calculate</Button>
              <Button variant="outlined" color="primary" className='w-25 p-3 ms-4'
                onClick={handleReset}>Reset</Button>
            </div>
          </form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>BMI Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>Your BMI - {bmi.toFixed(2)}</Modal.Body>

        {bmi.toFixed(2) < 18.5 && <p className='text-warning text-center'>You are UnderWeight</p>}
        {bmi.toFixed(2) < 18.5 && bmi.toFixed(2) <= 29.9 && <p className='text-primary text-center fs-2'>Health Tips</p>}
        {bmi.toFixed(2) < 18.5 && <ul className='text-warning text-center'>
          <li>Eat nutritious food</li>
          <li>Avoid Baked and oily Items</li>
          </ul>}

        {bmi.toFixed(2) > 18.5 && bmi.toFixed(2) <= 24.9 && <p className='text-success text-center'>You Weight is normal</p>}
        {bmi.toFixed(2) > 18.5 && bmi.toFixed(2) <= 24.9 && <p className='text-primary text-center fs-2'>Health Tips</p>}
        {bmi.toFixed(2) > 18.5 && bmi.toFixed(2) <= 24.9 && <ul className='text-warning text-center'>
          <li>Continue with Diet</li>
          <li>Avoid Baked and oily Items</li>
          <li>Avoid Sugar Items</li>
          </ul>}

        {bmi.toFixed(2) >=25 && bmi.toFixed(2) <= 29.9 && <p className='text-danger text-center'>You are OverWeight</p>}
        {bmi.toFixed(2) >=25 && bmi.toFixed(2) <= 29.9 && <p className='text-primary text-center fs-2'>Health Tips</p>}
        {bmi.toFixed(2) >=25 && bmi.toFixed(2) <= 29.9 && <ul className='text-warning text-center'>
          <li>Avoid Baked and oily Items</li>
          <li>Exercise Regularly</li>
          <li>Avoid Sugar Items</li>
          </ul>}

        {bmi.toFixed(2) >=30 && <p className='text-danger text-center'>You are Obesive</p>}
        {bmi.toFixed(2) >=30 && <p className='text-primary text-center fs-2'>Health Tips</p>}
        {bmi.toFixed(2) >=30 && <ul className='text-warning text-center'>
          <li>Avoid Baked and oily Items</li>
          <li>Exercise Regularly</li>
          <li>Avoid Sugar Items</li>
          </ul>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'orange' }}
            className='m-auto'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default App
