import PropTypes from 'prop-types'

const Header = ({ text }) => {
  return (
    <header>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
};

Header.defaultProps = {
    text: 'Baconators really do rule the world!'
}

Header.propTypes = {
    text: PropTypes.string,
}

export default Header;


