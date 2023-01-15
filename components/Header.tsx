import Modal from 'react-modal';
import styles from '../styles/Home.module.css';
import Icon from '../components/Icon';
import { useState } from 'react';
import StatsModal from './StatsModal';
import SupportModal from './SupportModal';
import HelpModal from './HelpModal';

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
    w: 700,
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
        <div className={styles.headerLeft}>
          {/* <div className={styles.headerIcon}>
            <svg
              version="1.2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 510 343"
              width="35.7"
              height="24"
            >
              <title>earth-svg</title>
              <defs>
                <image
                  width="226"
                  height="212"
                  id="img1"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADUCAMAAAC27Q9VAAAAAXNSR0IB2cksfwAAAs1QTFRFAAAAPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqWPsqW4I6ODAAAAO90Uk5TAA0gBgELMmmbpc2iXi8CHlSc1ub/5dCRSRpk3fz5Pm/S998/Omqo2/TBtOz6/cw9/pojRedwbLzktjHu7wmsFM8w6lVjBEDA7ViSuuj28Wgtblyq+DeyG4AP6cR5s4IHHEt1r8j7vjlSmeHeT1fHZ8mrWZ3i9ZdGFhkuWoQXEJ+1bbHgiCba8MOKnvPXwmGj2V+uidPyYLmtv4Uhczt2ESvjBYPYeh0zjYcsynx+zpBWEwi3DIZyuzjUd+tRCtFrTdVmYsWnFaYqoV2kNCW9uB9IdIs8J1ugcUoAqSnceJRllYw1ew59y1NOR5gik0xo1zYUAAAKxElEQVR4nO2d+X9U5RXGJzETdMoWZpKamiHJUGCCM3ADQ0OZQUioBkkyhBiQkIgBAoEERIUBSRA1lEUj1ZIMGLtINFERGlyoAkHAVomttdJqW02LbWntYpe/oe87+3Lv3O3Mfc+k+f58Ce+TPJ9z3/Pe856j02EmLZ1yA+tlJIsMfeaYG28yGAxfuXHsuPEZrJeTBCZMzJpkNPnJzvnqzbmsFwRN2tduyTNFYs6ZzHpNgBCH5hcUmmKxTGG9MCDS0r8+ddp0a5xAQtEI0OgLMDNutdn5BBJmzmK9QrVEBhheuOLZrNeoirQ50xzmRAIJxrmsV6kY4tBvlMwT0Uf55nzWS1WEP8A4JQg0mVz5C1gvVy6BAGPmJAkk3LaQ9ZJlIhpg4lhUynrNsiABxigWYGIpW8x61ZKRHGBicH6L9cqlQh3qki/QZLLms166BG5Pm3BHfvkSmxKBqSFx9p1LKyqrlOkjuJexFiBCWvXy2yoVy6OU1bDWkAD6Crwrp1aVQJJRrWCtQxgaYMpU6iOsvJu1EF7UBZgouFV1rNXwQQPMauUBJor6O1iriad0VsM9q2HkEZxr7mUtKIqMxrXr1jc5NoAJNJk2NrMWFUXups0t1jzxZcugdcvtrFWFIAFm63p5KYQUhYj2pyTA3GcVOmNSjBWNQhpgAF6AsXCV2zCEGl+Aub8S4gUYK7DsAQyJon72g9t3eGADjI88z307dz3EWp5ud1v7niZpR0wy8RhWPcxaHTHo3q2P5EC+/8L6ljz62DjW8gjN6zr2JUGe3VNQ9O2a/XrG6miAWXnAJvmMUDK2g4cevzOT/aEpCTBP7PDA6zN1Pongz+cPMPcnJcC4D39nL2t1/w8BZmHNU08nQR6SAEMd+t0jbvg3PAkwXRgCjM+h3UnYwXhRBBh6BPPg0sPgORIVePgoggBDM6RjrU7wFMlkqsIRYNKqlz/jgFdHUoiWQwgcCnPGy0tlz7NTEAQYoDNeHiYdWfY9BGku/cxZmwR5tS1PfP8HE1irU/yZU5RCZ8UPZz3HWp5OxWfOxHD7MAQYH8ezemvhBSIJMJTnF3fA6+OQBBg/i3OA1dmyy1/IRxBgQkzsAxVoc5T0N7+IIcCEeAnUpXmGlyenj2etKZqME7wlr8owHut/hbWgeKachNKHK8CEqTvRCaGOBJg9qAJMBOkG9QI980oamhtRBZhI1qrNes2tHXvQBZhIFixXJ9BZcaoZpz1D6H+kXF6edWDamGrWCkTRn1aojyucVPxq22uvsxYgjkKJnt435h4/w3rx0tD/WL4+W+tK3AEmGv2bcgUueevUWeQBJoZXPbL+gOdSIcDEcHyRdIGuY+dTIsDE8PBmqZ8MBzumNrJerTIudEuQVzV4MgUdGuTtzfEXJKNxXpx2aVMqOjTE5XcSCkSaIcni9Z8I7sTNO1Cc8QLQwFsna3ZWnEdxxgvBmYbuOIGdfVjOeGHQ7yqJjjk46ihgOdtQ7gruc7DUUUCzt/Snp3vetVgs9T0jy6HRLMykIPkKMcooo4ySfEpLS+fPb2O9imThuzfQU2CxDGx8L3/ObtbLSQKRF5NsnU8vXXuF9YqgOdodc+2jsAJBwT8U1KEz43sb2IfeZ70yKKhDa/lSOu6ZdNZrAyDx1bmq4tTPWcWuzrn6Uzzm7G3/mVhZmmFy6ra+Iw79+QcOEYHk7fHs26xXqhTi0ENWKQfVhl+wXqoiaOmy1PYUlVtZr1Y2ckuXbcWsVywX+aXL733Ies2ykNICLpb61JFIS5d/2StTH6EgZSRShyq6PpcqEqlDa5UINJk+SgGJvuJ6BQ4NMHSVtQBRFDvUT2cXawEJ8bX46VHX4sfxK9YqEgHR4ocr2c9ahjAS0ggJ1P4a6Td44tCxNznUCzSZSpD2SSUOrZeURojS146x2I52uXNAyCO4u9BV2wHfgHR9jO5YA/gGpG0PtsMpFZs0PrjBnc+zlhSJ0jRCkLzB9VtQHYar3KTF6VvS9NgneNqk6ZQlusLYPU1rUPW3h76ju8GIrfAc+I6ufSa2q3OwDjVlH+tHVfZKHHoJMoZy05EVhup/89vf9R2E07dhYwOqwtDdbe0fX+wEbBQzb8anmD4k0j44FyE7NaG73Lmw5qkDgPrMLdtxlS7vbjsK2akJXekydWgBYKMfJC3gIgB2qBdb6TJwLzEzttJl6F5i+Irrm9d1WOD0mdxFqBwaaKcJpw9JD7EwtKoJsJ0mjh5iUXz2CKRBEbX48UEd2jMI+BI8gGyTRjtK9xaCORRjGgHb8JWkEZg+goI3fB1NIzQGepOGMY3ohkwjRvwmDVca4d+kSZ+LKAq6NAJ4k4bQobCbNNqKGNN4KN8mrQwwxKB0aBWgQ73aOHQ4ApFH4R2qSQwdjkboMXCHFmrl0OF4eJ/LvQDq0A3ZBs0dKqLxahdku1BX0YmbNUl0hRTySHzpiBtMn+0drfrgCArkETmuBMyiB7Xr1JRQYYzE3N9DJYOadWril0UrXTfV1LRv+cMVfZTG3C6IZqHkJa9dLzF+hXSSwi0tTueg5dpQ/ydp4cfHXwaJNK6Kz9k69Oofr0Xmtd7yP4UqIB76M4BA9g49nxOTuHPey8Hf+JxrKuXZrQb2Dp3JE06uTQ38q0uqKmRoO83FbB0qXIu9b6r/muNdKk5mbNpVNfHLI2Q+3iq4vid9FwGq31As0LroumZVTfzyMvSZqyyJ3nhFf6ESB5Tp4zrLP52tjTxBhRMmZk1P3JXP+dcviERFZ6RV2jV8FXQoLUQT/QR4aIUiiTYtO0oLOlTajSv7m/fqqutlCnS+9TcNG74KOlRiMS+XVaf78FE5+rRs+JrIoUbJpZLnyJ9DtI1mGE0bvqp0aJBJu3S6sVJf/do2fBV2qLytiuOyTrfi7xIezNNwk5YgEfzH+kq5xbyr/6nTPfeC2FOabtIEHdq49vOTt8rUF5Com9KU8Blztral5/wKfd1vlJxN9H1JfmbdthbhJ7TcpCWwqPID3nO+e4AL/iVgcLu3fO6/tZInpFBdnQj3wGu+H321mO8AzobGoSrqROxrAiHkyvW4Lkgp71A/Bz4Lajgzpscb8auya5pGJHKoyk8Q9v/cHfpP6krP9/QG9jmdGs+NEHao6k8QOf+N/I/G7991fXvFwMCMLC3nRgg69P2das+UCIPb4qp70ila1sTwyyMb0RMWgGpQa3GjhlrkKCQb0VaIS1funbk4BUpK5iVxin0NE69D1bRPiSTP+AH7Kh9ehwLdzDVnD03+grXAeIWykvlEcJZ7lp1lLU8Xq9B3dxzmZq6xoh9JEUySHGrEU+kapRBseu68IUSVrhECwabnuj76Eskf0EeERJjpuegK0SIUgkzP9aK7ExghEWJ6rlujQjRZhN8WqqfnonNogJBEtdNzNSqVVEBQocrpuehurUYQlKhmeq7NidOhQQISlU/PLdx3GqlDg/gVKp2ea7e+e4p9IiGCX6Ky6blaH/AqxS9RwWhZj6YHvGpQJpEe8Gr5CUIdPonypuemikOD+CTKmZ6r7ScIGIhGydNzOW/5XC0/QQBBk2Fp03M5Z2o5NMzwsLTpuWUzUs6hYYYlTM91l1zAlMzLRmx6LtZUSQ4Jp+ciTOYVkGB6LspkXhH803NrR4BDQ/BNzx0ZDg0TNz3Xi6vBDwij03NHDMmanvs/IRDTs/D4mYgAAAAASUVORK5CYII="
                />
              </defs>
              <path
                id="Shape 2"
                className="s0"
                d="m5 188"
                fill="#000000"
                stroke="#00ff00"
                strokeWidth={9.9}
              />
              <path
                id="Layer"
                fill-rule="evenodd"
                fill="#ffffff"
                className="s1"
                d="m350 320c-88.5 0-160-71.5-160-160 0-88.5 71.5-160 160-160 88.5 0 160 71.5 160 160 0 88.5-71.5 160-160 160zm100.1-62.1q0-0.8 0.2-1.6c14.8-58 7-100.2 2.7-116.4q-1.5 0.1-3 0.1c-15.8 0-31-6.2-42.4-17.6-11.3-11.3-17.6-26.4-17.6-42.4 0-16 6.3-31.1 17.6-42.4q1.8-1.8 3.7-3.5c-18.5-9-39.3-14.1-61.3-14.1-13.9 0-27.3 2-40 5.8v24.2c0 2.6-1 5.2-2.9 7.1l-40 40c-1.9 1.8-4.4 2.9-7.1 2.9h-36.5c-8.7 18.2-13.5 38.5-13.5 60 0 47.6 23.7 89.6 60 114.9v-58.7l-34.5-17.3c-3.4-1.6-5.5-5.1-5.5-8.9v-60c0-5.5 4.5-10 10-10h40c2.7 0 5.2 1 7.1 2.9 0.3 0.4 37.6 37.1 72.9 37.1 5.5 0 10 4.5 10 10v30c0 2.5-0.9 4.8-2.5 6.6l-72.9 82c17 7.3 35.7 11.4 55.4 11.4 39.2 0 74.6-16.1 100.1-42.1z"
              />
              <use id="Layer 8" href="#img1" x="0" y="125" />
            </svg>
          </div> */}
          <h2>
            worldies<span className="highlighted-text">le</span>
          </h2>
        </div>
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
        {modalIsOpen === 'stats' ? <StatsModal /> : null}
        {modalIsOpen === 'support' ? <SupportModal /> : null}
        {modalIsOpen === 'help' ? <HelpModal /> : null}
      </Modal>
    </>
  );
};

export default Header;
