import Modal from 'react-modal';
import ReactPlayer from 'react-player'
import { NOTRAILERERROR } from '../constants';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    border: 'none',
    overflow: 'hidden',
  },
};


const YoutubePlayer = ({ videoKey,closeModal,isOpen }) => {

  return(
      <Modal 
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="youtube-modal"
      >
        {videoKey !== NOTRAILERERROR ? 
          <ReactPlayer 
            className="video-player" 
            url={`https://www.youtube.com/watch?v=${videoKey}`} 
            controls={true}
            playing={true}
            data-testid="youtube-player"
          /> : <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        }
      </Modal>
  )

};

export default YoutubePlayer;