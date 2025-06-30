
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../features/Media/ExpandedImage/expandedImageSlice';
import ReactMarkdown from 'react-markdown';

export const Markdown = ({text}) => {

    const dispatch = useDispatch();

    // Custom component for image markdown
    const components = {
        img: ({node, ...props}) => (
        <img
            {...props}
            
            style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: 200, margin: 0, borderRadius: 'var(--border-radius)' }}
            onClick={() => dispatch(setExpandedImage({ image: props.src }))}
            alt={props.alt || 'User provided'}
        />
        )
    };

    return (
        <ReactMarkdown components={components}>
            {text}
        </ReactMarkdown>
    )
}
