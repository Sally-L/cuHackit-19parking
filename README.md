# cuHackit-19parking

One common problem that Clemson students face is having trouble finding parking during the day. We wanted to do a proof-of-concept project where we took photos of model lots and used AWS Machine Learning to help solve this problem.

We used many different components to pull this off. First we have a python script controlling a camera by taking pictures every minute of a lot. This image is then uploaded to an S3 bucket which triggers a lambda function. This lambda function uses AWS Rekognition to look for all cars in the parking lot photo. The result is sent to our API in a running EC2 instance with a HTTP POST and an entry is saved into our MySQL database. When invoked, the Alexa skill uses an HTTP GET on our API to fetch the most recent entry describing the lot capacity and returns the space available to the user.
