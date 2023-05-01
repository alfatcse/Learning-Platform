import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetVideoQuery, useGetVideosQuery } from '../../../../features/videos/videoAPI';
import Error from '../../../UI/Error';
import Loading from '../../../UI/Loading';
import Video from './Video/Video';

const CurrentVideo = () => {
    let VID;
    let content=null;
    const { vedioId } = useParams();
    const { data: Allvideo, isError:isAllVError, isLoading:AllVLoading, error:AllVError } = useGetVideosQuery();
    if(AllVLoading&&vedioId===undefined){
      content=<Loading></Loading>
    }
    if(isAllVError&&!AllVLoading&&vedioId===undefined){
        content=<Error message={'An Error Occurred'}></Error>
    }
    if(!isAllVError&&!AllVLoading&&Allvideo?.length>0&&vedioId===undefined){
        VID=Allvideo[0].id
    }
    else{
        VID=vedioId
    }
    const {data:video,isError, isLoading, error }=useGetVideoQuery(VID);
    if(isLoading){
        content=<Loading></Loading>
    }
    if(isError&&!isLoading){
        content=<Error message={'An Error Occurred'}></Error>
    }
    if(!isLoading&&!isError&&video?.id){
        content=<Video video={video}></Video>
    }
    return (
       <>{
        content
       }</>
    );
};

export default CurrentVideo;