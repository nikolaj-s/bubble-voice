
import { useDispatch, useSelector } from 'react-redux';

import ExpandedImageViewer from '../../../components/ExpandedImageViewer/ExpandedImageViewer';

export const ExpandedImage = ({ close = () => {} }) => {

    const image = useSelector(state => state.expandedImageSlice.expandedImage);

    const data = useSelector(state => state.expandedImageSlice.expandedImageData);
   
    return (
      <div data-context={data ? JSON.stringify({...data, src: image, type: 'imageSearchResult'}) : JSON.stringify({src: image, type: 'image'})}>
        <ExpandedImageViewer src={image} onClose={close} />
      </div>
    );
  };
  
