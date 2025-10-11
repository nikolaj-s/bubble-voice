
import { useDispatch, useSelector } from 'react-redux';

import ExpandedImageViewer from '../../../components/ExpandedImageViewer/ExpandedImageViewer';
import { clearExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';

export const ExpandedImage = () => {

  const dispatch = useDispatch();

  const { expandedImage: image, expandedImageData: data, images} = useSelector(state => state.expandedImageSlice);

  const close = () => {
    dispatch(clearExpandedImage());
  }

  return (
    <>
    {image && (<ExpandedImageViewer onClose={close} src={image} open={true} context={data ? {...data, src: image, type: 'image'} : {src: image, image: image, type: 'image'}} />)}
    </>
  );
};
  
