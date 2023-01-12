import Modal from 'react-modal';
import styles from '../styles/Home.module.css';
import Icon from '../components/Icon';
import { useEffect, useState } from 'react';
import StatsModal from './StatsModal';

const MODAL_SETTINGS: {
  [key: string]: {
    w: number;
  };
} = {
  support: {
    w: 350,
  },
  stats: {
    w: 700,
  },
  help: {
    w: 500,
  },
};

Modal.setAppElement('#__next');

const Header: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<string | undefined>(
    undefined
  );

  const closeModal = () => setModalIsOpen(undefined);
  return (
    <>
      <div className={styles.headerRow}>
        <h2>
          worldies<span className="highlighted-text">le</span>
        </h2>
        <div className={styles.headerIcons}>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('support')}
          >
            <Icon icon="heart" size={16} color="white" />
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('stats')}
          >
            <Icon icon="trophy" size={16} color="white" />
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('help')}
          >
            <Icon icon="question" size={16} color="white" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={!!modalIsOpen}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-body"
        htmlOpenClassName="overflow-hidden"
        style={
          modalIsOpen && MODAL_SETTINGS[modalIsOpen]
            ? {
                content: { width: MODAL_SETTINGS[modalIsOpen].w },
              }
            : {}
        }
      >
        <div className="modal-close" onClick={closeModal}>
          &times;
        </div>
        <StatsModal />
      </Modal>
    </>
  );
};

export default Header;
