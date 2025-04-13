import React from 'react'
import Swal from 'sweetalert2';

const Contact = () => {
const handlebtn = () => {
// alert("Good Day")
Swal.fire({
    title: "Drag me!",
    icon: "success",
    draggable: true
  });

}



  return (
    <div className='min-h-screen'>
      <p className='py-10 text-3xl mb-10'>This is contact Page</p>

      <button onClick={handlebtn} id='loginbtn' className='btn btn-primary'>Click Me</button>

    </div>
  )
}

export default Contact
