import Modal from 'react-modal';
import styles from '../styles/Home.module.css';
import Icon from '../components/Icon';
import { useState } from 'react';
import StatsModal from './StatsModal';
import SupportModal from './SupportModal';
import HelpModal from './HelpModal';
import { BasicAnswer } from '../custom-types';
import OnboardingModal from './OnboardingModal';

const MODAL_SETTINGS: {
  [key: string]: {
    w: number;
  };
} = {
  support: {
    w: 500,
  },
  stats: {
    w: 700,
  },
  help: {
    w: 600,
  },
  onboarding: {
    w: 700,
  },
};

// The following line is for aria accessibility
Modal.setAppElement('#__next');

const Header: React.FC<{ answer: BasicAnswer }> = ({ answer }) => {
  const [modalIsOpen, setModalIsOpen] = useState<string | undefined>(
    undefined
  );

  const closeModal = () => setModalIsOpen(undefined);
  return (
    <>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <h2>
            worldies<span className="highlighted-text">le</span>
            <span className={styles.headerBeta}>Beta</span>
          </h2>
        </div>
        <div className={styles.headerIcons}>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('support')}
          >
            <Icon icon="favorite_outline" size={24} color="white" />
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('stats')}
          >
            <Icon icon="bar_chart" size={24} color="white" />
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => setModalIsOpen('onboarding')}
          >
            <Icon icon="help_outline" size={24} color="white" />
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
        {modalIsOpen !== 'onboarding' ? (
          <div className="modal-close" onClick={closeModal}>
            &times;
          </div>
        ) : null}
        {modalIsOpen === 'stats' ? (
          <StatsModal answer={answer} />
        ) : null}
        {modalIsOpen === 'support' ? <SupportModal /> : null}
        {modalIsOpen === 'help' ? <HelpModal /> : null}
        {modalIsOpen === 'onboarding' ? <OnboardingModal /> : null}
      </Modal>
    </>
  );
};

export default Header;
