import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import LoginModal from 'src/components/LoginModal';
// import UpdateModal from 'src/components/UpdateModal';

const Login = () => {
  // const [isUpdateAvailable, setIsUpdateAvailable] = useState(true);

  useEffect(() => {
    window.electronApi.on('is-update-available', (data: boolean) => {
      // setIsUpdateAvailable(data[0]);
    })
    // navigate('/update')
  }, [])    


  return (
    <div className='main-bg'>
        <LoginModal />
    </div>
  )
}

export default Login