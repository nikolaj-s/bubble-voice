
import { useDispatch, useSelector } from 'react-redux';

import ExpandedImageViewer from '../../../components/ExpandedImageViewer/ExpandedImageViewer';
import { clearExpandedImage, setExpandedImage, setImages } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import { useEffect } from 'react';

export const ExpandedImage = () => {

  const dispatch = useDispatch();

  const { expandedImage: image, expandedImageData: data, images} = useSelector(state => state.expandedImageSlice);

  const {currentOverlay} = useSelector(state => state.overlaySlice);

  const {filter, results} = useSelector(state => state.searchSlice);

  const {recommendations} = useSelector(state => state.userRecommendationsSlice);

  const {messages} = useSelector(state => state.textChannelSlice);

  useEffect(() => {

    let l_images = [];

    if (currentOverlay) {

      if (currentOverlay === 'search') {

        if (filter.path === 'images') {

          if (results[filter.path]?.length) {
            console.log(results[filter.path])
            l_images = results[filter.path]?.slice()?.map(img => img.src);
          } else {
            console.log(recommendations)
            l_images = recommendations?.slice()?.filter(i => i.type === 'image')?.map(i => i.src)
          }

        }

      }

    } else if (!messages.length) { 
      
      dispatch(setImages([]));

    } else {

      l_images = messages.slice().filter(message => message.image || message.images).flatMap(message => {

        if (message.image) return message.image;

        if (message.images) return message.images;

      })
      
    }

    dispatch(setImages(l_images));

    return () => {
      dispatch(setImages([]))
    }

  }, [messages, image, recommendations, filter, results, currentOverlay])

  const close = () => {
    dispatch(clearExpandedImage());
  }

  return (
    <>
    {image && (<ExpandedImageViewer onChange={(data) => {dispatch(setExpandedImage({image: data.src}))}} currentIndex={images.findIndex(i => i === image)} images={images} onClose={close} src={image} open={true} context={data ? {...data, src: image, type: 'image'} : {src: image, image: image, type: 'image'}} />)}
    </>
  );
};
  
