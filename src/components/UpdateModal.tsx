import React, { useEffect, useState } from 'react'
import Logo from "../assets/logo-big.png"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const UpdateModal = () => {
  const navigate = useNavigate();
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateComplete, setUpdateComplete] = useState(false);


  const checkUpdates = () => {
    window.electronApi.on('checking-for-update', (data: boolean) => {
      setCheckingUpdate(data[0]);
    })
  }

  const checkUpdateAvailability = () => {
    window.electronApi.on('is-update-available', (data: boolean) => {
      setUpdateAvailable(data[0]);
      setCheckingUpdate(false);
      if (!data[0]){
        setUpdateUnavailable(true);
      }
    })
  }

  const trackUpdateProgress = () => {
    window.electronApi.on('download-progress', (data: number) => {
      setIsUpdating(true);
      setUpdateAvailable(false);
      setUpdateProgress(data[0]);
    })
    window.electronApi.on('update-downloaded', (data: boolean) => {
      setIsUpdating(false);
      setUpdateComplete(data[0]);
    })
  }

  useEffect(() => {
    checkUpdates();
    checkUpdateAvailability();
    trackUpdateProgress();
  }, [])
  return (
    <div className='modal'>
      <img src={Logo} alt="Avalon Launcher" className="logo" />
      {checkingUpdate && <h5>Checking for Updates</h5>}
      {updateAvailable && <h5>Update Available. Your app update will begin shortly</h5>}
      {(updateUnavailable) && (
        <>
          <h5>Update Not Available</h5>
          <p className='link' onClick={() => navigate(-1)}>Go back</p>
        </>
      )}
      {isUpdating && <h5>Your App is being updated - {updateProgress} %</h5>}
      {isUpdating && <ProgressBar completed={updateProgress} maxCompleted={100} width='300px' customLabel='  ' bgColor='#0b954f' />}
      {updateComplete && <h5>Update downloaded, please restart the app</h5>}
      {!updateUnavailable && <p>Please Wait...</p>}
    </div>
  )
}

export default UpdateModal