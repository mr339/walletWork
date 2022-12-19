// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const { spawn } = require('child_process');

process.env.ELECTRON_OWNER = 'mr339';
process.env.ELECTRON_REPO = 'walletWork';
process.env.ELECTRON_TOKEN = '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';

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let mainWindow;

function sendStatusToWindow(text) {
  mainWindow.webContents.send('message', text);
}
// Create the native browser window.
function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, `index.html`),
      protocol: 'file:',
      slashes: true,
    })
    : 'http://localhost:3000';
  console.log(appURL, '<=======');
  mainWindow.loadURL(appURL);
  mainWindow.webContents.openDevTools();

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  return mainWindow;
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
// function setupLocalFilesNormalizerProxy() {
//   protocol.registerHttpProtocol(
//     "file",
//     (request, callback) => {
//       const url = request.url.substr(8);
//       callback({ path: path.normalize(`${__dirname}/${url}`) });
//     },
//     error => {
//       if (error) console.error("Failed to register protocol");
//     },
//   );
// }

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
  mainWindow.webContents.send('checking-for-update', true);
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  mainWindow.webContents.send('is-update-available', true);
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
  mainWindow.webContents.send('is-update-available', false);
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message =
    log_message +
    ' (' +
    progressObj.transferred +
    '/' +
    progressObj.total +
    ')';
  sendStatusToWindow(log_message);
  mainWindow.webContents.send(
    'download-progress',
    Math.trunc(progressObj.percent),
  );
});
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded, please restart the app');
  mainWindow.webContents.send('is-download-complete', true);
});
// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow();
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//
// CHOOSE one of the following options for Auto updates
//

//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------

function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
  mainWindow.webContents.send('update-app', true);
}

app.on('ready', function () {
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: process.env.ELECTRON_OWNER,
    repo: process.env.ELECTRON_REPO,
    token: process.env.ELECTRON_TOKEN,
  });
  checkForUpdates();
  setTimeout(() => {
    mainWindow.webContents.send('update-app', true);
  }, 1000);
});

ipcMain.on('check-updates', () => {
  checkForUpdates();
});

ipcMain.on('open-notepad', () => {
  if (process.platform === 'darwin') {
    mainWindow.loadURL("notes://run");
  } else {
    spawn('notepad.exe');
  }
});
//-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();
// })

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
// const allowedNavigationDestinations = "https://my-electron-app.com";
// app.on("web-contents-created", (event, contents) => {
//   contents.on("will-navigate", (event, navigationUrl) => {
//     const parsedUrl = new URL(navigationUrl);

//     if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
//       event.preventDefault();
//     }
//   });
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
