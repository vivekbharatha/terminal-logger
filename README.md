# terminal-logger

Simple tool to log your daily task in a terminal.

## Features
- saving logs to google sheet (your account)

### Setup & Installation
- Configuring the google sheet
  - Go to the [Google APIs Console](https://console.developers.google.com/).
  - Create new project with **terminal-logger** or any name you want
  - Click **Enable API**. Enable the Google Drive API in search bar.
  - Create credentials for a Web Server to access Application Data.
  - Name the service account and grant it a Project Role of Editor.
  - Download the JSON file, place in repo folder and rename to **env.json**
  
- Preparing the env.json 
  - Add your google sheet id from your sheet url in env.json file, with key as **sheet_id**
  Example:
  
  { 
    "sheet_id": "sheet id from url here",
    .
    .
  }
  
  
  - Installing
  
  `npm install`
  - Running
  
  `npm start`

### Upcoming
- Tick icon, once the log is saved to sheet
- Total logs info on startup
