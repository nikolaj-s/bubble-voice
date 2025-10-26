
import { useDispatch, useSelector } from 'react-redux';

import ExpandedImageViewer from '../../../components/ExpandedImageViewer/ExpandedImageViewer';
import { clearExpandedImage, setExpandedImage, setImages } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import { useEffect } from 'react';

export const ExpandedImage = () => {

  const dispatch = useDispatch();

  const { expandedImage: image, expandedImageData: data, images} = useSelector(state => state.expandedImageSlice);

  const {messages} = useSelector(state => state.textChannelSlice);

  useEffect(() => {

    if (!messages.length) { 
      
      dispatch(setImages([]));

    } else {

      let l_images = [];

      l_images = messages.slice().filter(message => message.image || message.images).flatMap(message => {

        if (message.image) return message.image;

        if (message.images) return message.images;

      })

      dispatch(setImages(l_images));
    }

  }, [messages, image])

  const close = () => {
    dispatch(clearExpandedImage());
  }

  return (
    <>
    {image && (<ExpandedImageViewer onChange={(data) => {dispatch(setExpandedImage({image: data.src}))}} currentIndex={images.findIndex(i => i === image)} images={images} onClose={close} src={image} open={true} context={data ? {...data, src: image, type: 'image'} : {src: image, image: image, type: 'image'}} />)}
    </>
  );
};
  
