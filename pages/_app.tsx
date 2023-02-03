import '../styles/globals.css';
import 'node_modules/rc-tooltip/assets/bootstrap.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        input {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <main className={`${inter.className} main-container`}>
        <Component {...pageProps} />
      </main>
      <ToastContainer
        hideProgressBar
        position="top-center"
        autoClose={2500}
        transition={Slide}
        theme="dark"
        toastClassName="toast-inner"
        bodyClassName="toast-body"
        className="toast-container"
      />
    </>
  );
}
