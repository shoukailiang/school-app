import logoImg from './school-logo.png';
import './index.module.scss';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImg} alt="" />
    </div>
  );
};

export default Logo;
