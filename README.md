# OpenDoor
![super agent](http://freeiconbox.com/icon/256/32567.png)

OpenDoor makes it easy, casually, and quickly plan your night or host your friends. Find parties, kickbacks, hot new bars, or old favorites open to you on a fun and inviting feed. Share your experience to your event’s story using videos and pictures. Save memories of your experiences in automatically built music videos.

## Installation

Requirements:
- OS X is needed for iOS development
- Xcode 7.0 or higher [download here](https://developer.apple.com/xcode/download/)
- npm [install here](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
- rnpm [install here](https://github.com/rnpm/rnpm)

Run `npm run install:all` from the root directory
- This will install all the necessary packages in the root, native, and server directories

```
$ npm run install:all
```
Rename the file /server/config.example.js to /server/config.js
- Replace the required line with your docker IP address

Open the project with Xcode
- Open the xcode project file in /native/iOS
- Change the project name because all Xcode projects need to be globally unique
 - If prompted, allow Xcode to 'Fix Issue'

## Run Simulator

- Select the appropriate device (ie, iPhone 6s) in Xcode
- Comment out/in the appropriate lines
- Select schema type [Product > Scheme > Edit Scheme...] and set Build Configuration to Debug or Release
 - Debug will show warnings and display error messages
 - Release will hide warnings and quit on errors
- Press Play (&#8984;R) to run the simulator

## Deploy to iOS

- Connect your iOS device via Lightning cable
- Select your device as the active scheme in Xcode:
![super agent](http://i.imgur.com/tTAOEL3.png)
- Change the javascript code location by commenting out line 34 and uncommenting line 42:
![super agent](http://i.imgur.com/DJhbdzh.png)
- Select schema type [Product > Scheme > Edit Scheme...] and set Build Configuration:
![super agent](http://i.imgur.com/hN30YC8.png)
![super agent](http://i.imgur.com/wEzJ4xT.png)
 - Debug will show warnings and display error messages
 - Release will hide warnings and quit on errors
- Press Play (&#8984;R) to load onto your iOS device

## Setup type definitions (optional)
If you setup your editor to use .tsd files, you will be able to get autocomplete on NPM modules

1. Run `npm install -g tsd`
2. Run `tsd install` from the project root
3. Add a tsd/typescript plugin to your editor of choice

## Testing
Run tests for the front-end, server, and database with
`$ npm run test`
From the root directory. Testing is done with Jest and the test scripts are located in
`~/tests/__tests__`
