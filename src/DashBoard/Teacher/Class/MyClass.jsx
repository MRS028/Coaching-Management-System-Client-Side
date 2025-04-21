import { AlertTriangle } from 'lucide-react'
import React from 'react'

const MyClass = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Class Page</h1>
      <p className="text-lg text-red-500">🚧 This page is currently under maintenance. Please check back later!</p>
    </div>
  </div>
  )
}

export default MyClass
