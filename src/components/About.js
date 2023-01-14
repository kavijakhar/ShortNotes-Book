import React from 'react'
// import noteContext from '../context/notes/NoteContext'

const About = () => {
  return (
    <>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex  my-3 flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h2>
            <p className="font-normal text-base leading-6 text-gray-600 ">A short note book app  allows users to quickly and easily create, organize, and access notes on their smartphones or tablets and desktops. These app typically feature a simple, user-friendly interface that makes it easy to create new notes, add text. this short note book app also offer the ability to login your account with your password across multiple devices, making it easy to access important information no matter where you are. </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img className="w-50" src="https://images.unsplash.com/photo-1505744386214-51dba16a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1906&q=80" alt="A group of People" />
          </div>
        </div>
      </div>

    </>
  )
}
export default About