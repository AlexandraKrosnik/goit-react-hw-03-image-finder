import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBackground } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('scroll', this.hiddenScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.hiddenScroll);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  hiddenScroll = () => {
    window.scrollTo(0, 0);
  };
  render() {
    const { children, onClose } = this.props;
    return createPortal(
      <Overlay
        onClick={e => {
          if (e.target.nodeName !== 'IMG') {
            onClose();
          }
        }}
      >
        <ModalBackground>{!!children && children}</ModalBackground>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
