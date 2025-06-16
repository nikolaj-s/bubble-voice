
import { useNavigate, useLocation, } from 'react-router-dom';
import styles from './SubNav.module.css';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../../features/Mobile/mobileSlice';
import { setVoiceChannelFocused } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { NavButton } from '../../../components/ui/Buttons/NavButton/NavButton';

export const SubNav = ({basePath = '/dashboard', options = []}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const {focused} = useSelector(state => state.voiceChannelSlice);

  // Helper to normalize paths by removing trailing slashes.
  const normalizePath = (path) => path.replace(/\/+$/, '');

  const currentPath = normalizePath(location.pathname);

  const handleNavigate = (path) => {

    dispatch(toggleMobileMenu())

    dispatch(setVoiceChannelFocused(false));

    navigate(path)

  }

  return (
    <nav className={styles.subNav}>

      {options.map((option) => {

        const optionPathNormalized = normalizePath(option.path);

        const active = currentPath === optionPathNormalized && !focused;
  
        return (
          <NavButton action={() => {handleNavigate(option.path)}} icon={option.icon} active={active} name={option.label}  />
        );
      })}
      <LineSpacer margin={'15px 0px'} />
    </nav>
  );
};
