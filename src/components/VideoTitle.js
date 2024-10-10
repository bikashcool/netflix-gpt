import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-[25%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
      <h1 className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</h1>

      <div className='my-3 md:m-0'>
        <button className="py-1 md:py-4 px-3 md:px-12 bg-white text-black text-xl rounded-md hover:bg-opacity-85">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className="hidden md:inline-block mx-3 p-4 px-12 bg-gray-500 bg-opacity-60 text-white text-xl rounded-md hover:bg-slate-700">
          <i className="fa-solid fa-circle-info"></i> More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
