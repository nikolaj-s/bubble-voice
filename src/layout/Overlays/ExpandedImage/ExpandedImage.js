
import { useDispatch, useSelector } from 'react-redux';

import ExpandedImageViewer from '../../../components/ExpandedImageViewer/ExpandedImageViewer';
import { clearExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';

export const ExpandedImage = () => {

  const dispatch = useDispatch();

  const image = useSelector(state => state.expandedImageSlice.expandedImage);

  const data = useSelector(state => state.expandedImageSlice.expandedImageData);


  const close = () => {
    dispatch(clearExpandedImage());
  }

  return (
    <>
    {image && (<ExpandedImageViewer onClose={close} src={image} open={true} context={data ? data : {src: image, image: image, type: 'image'}} />)}
    </>
  );
  };
  
