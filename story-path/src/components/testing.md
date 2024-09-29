This file will be used to monitor the progress of the project.
Specifically regarding what needs to be fixed or what is not working as expected.

Working
- Edit location is not working, creates copy of location instead of editing current one
- Location content disappears in edit mode
- delay with loading, need to see if this is network connectivity based or if the useEffect and simultaneous fetching is not working as expected
    - project list momentarily displays, no projects available
    - location list momentarily displays, no locations added
- Print all QR codes displays all QR codes, not just those in the project, should also have labels that match locations
- sometimes points box will generate random negative numbers while I am typing
- not sure what the ordering of locations is based on, is this local or remote through API
- content is being posted with username appended in apiRequest(), see if this is necessary
    - location_content is an object with content_body and username, edit mode does not correctly retrieve information
    - location[0].location_content.content_body and location[0].location_content[0].content_body causes type error
- does preview count the first location or wait till user selects first location, which is what it is now
- currently preview doesn't account for the fact that you may select the same location twice, which should not effect scoring or locations visited

Done
- preview is not displaying project information
- preview scoring reflects participant scoring choice
- in preview, make locations only ones that belong to the project
- preview locations visited total should reflect number of total locations and total score in specific project