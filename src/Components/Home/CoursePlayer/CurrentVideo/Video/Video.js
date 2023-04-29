import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
const Video = ({video}) => {
    console.log('vvvvv',video);
    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe width="100%" className="aspect-video" src={video?.url}
            title={video?.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
               {video?.title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on {moment(video?.createdAt).format('ll')}</h2>

            <div className="flex gap-4">
                <Link 
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                    {/* এসাইনমেন্ট */} Assignment
                </Link>
                <Link to={`/home/quizzes/${video?.id}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                    {/*কুইজে অংশগ্রহণ করুন*/}Quiz </Link> 
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
                {video?.description}
            </p>
        </div>
    </div>
    );
};

export default Video;