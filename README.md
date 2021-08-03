# Timestamp API
This API is simply returns the time in both unix and UTC format based of the given input (either unix or Date format) or the current time with no input

## Setup and Run the API
1. Clone the repository.
2. Navigate to the folder and run `npm install`. This will install all the dependencies required to run this API.
3. Create a `.env` file and add `PORT=3000` or any other value on which you want your endpoint to be. Remember not to place any spaces between the PORT, = or 3000
4. Run the server by `node server`

## Demo
### Getting Current Time
Navigate to `/api/` on your browser.
this will return you the current time in both unix and UTC format.

### Getting Unix Time from your Date
Navigate to `/api/yourDate` on your browser.
replace `yourDate` with the date you want to get the unix for. eg. `/api/2015-12-25`
this will return you the unix time along with the date you passed in UTC format.

### Getting Date from your Unix value
Navigate to `/api/yourUnix` on your browser.
replace `yourUnix` with the unix value of your choice for. eg. `/api/1451001600000`
this will return you the Date in UTC format along with the unix time you passed.