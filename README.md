# Project02: `Filter Image`
### The Goal:
1) Create a Rest API and how does it work on NodeJS
2) Create a Elastic BeanTalks servier and How to Deploy a Rest API on it

### The Steps:
1) Fork source code from https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code
2) Create a new project name `imagefiltering`
3) In the file `Server.ts` and create a new `filteredimage` endpoint // http://localhost:8082/filteredimage 
4) Execute statement `npm install`
5) Execute statement `npm run dev`
```
PS E:\Udacity\Project2\imagefiltering> npm run dev

> imagefiltering@1.0.0 dev
> ts-node-dev --respawn --transpile-only ./src/server.ts

[INFO] 21:49:55 ts-node-dev ver. 2.0.0-0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
server running http://localhost:8082
press CTRL+C to stop server
```
6) Open Chrome and access to http://localhost:8082/filteredimage?image_url=https://www.thebluediamondgallery.com/handwriting/images/testing.jpg

7) Create a Elastic Beanstalk Service and Configuration with NodeJS
7.1)  Create a deployable build package
_ Navigate to current project and execute statement `npm run build`:
```
PS E:\Udacity\Project2\imagefiltering> npm run build

> imagefiltering@1.0.0 build
> npm run clean && tsc && copy .npmrc www\.npmrc && copy package.json www\package.json && mkdir www\tmp\ && cd www && zip -r imagefiltering-archive.zip . && cd ..


> imagefiltering@1.0.0 clean
> rimraf www/ || true

        1 file(s) copied.
        1 file(s) copied.
  adding: .npmrc (172 bytes security) (stored 0%)
  adding: package.json (172 bytes security) (deflated 52%)
  adding: server.js (172 bytes security) (deflated 61%)
  adding: server.js.map (172 bytes security) (deflated 63%)
  adding: tmp/ (260 bytes security) (stored 0%)
  adding: util/ (260 bytes security) (stored 0%)
  adding: util/util.js (172 bytes security) (deflated 62%)
  adding: util/util.js.map (172 bytes security) (deflated 56%)
```
7.2) Install [EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
7.3) At current directory project. Execute statement: `eb init`
```
PS E:\Udacity\Project2\imagefiltering> eb init

Select a default region
1) us-east-1 : US East (N. Virginia)
2) us-west-1 : US West (N. California)
3) us-west-2 : US West (Oregon)
.....
.....
.....
22) af-south-1 : Africa (Cape Town)
23) ap-southeast-3 : Asia Pacific (Jakarta)
(Y/n): Y
Select a platform branch.
1) Node.js 16 running on 64bit Amazon Linux 2
2) Node.js 14 running on 64bit Amazon Linux 2
(default is 1): 1

Cannot setup CodeCommit because there is no Source Control setup, continuing with initialization
Do you want to set up SSH for your instances?
(Y/n): n

Enter Application Name
(default is "imagefiltering"):
Application imagefiltering has been created.
```
7.4) Jump into config.yml file on .elasticbeanstalk directory. Add 2 lines as below:
```
deploy:
artifact: ./www/imagefiltering-archive.zip
```

7.5) Create `eb create`
```
Enter Environment Name
(default is imagefiltering-dev):
Enter DNS CNAME prefix
(default is imagefiltering-dev):

Select a load balancer type
1) classic
2) application
3) network
(default is 2):


Would you like to enable Spot Fleet requests for this environment? (y/N): y
Enter a list of one or more valid EC2 instance types separated by commas (at least two instance types are recommended).
(Defaults provided on Enter): t3.micro

Uploading imagefiltering/app-3ef1-231115_220322554808.zip to S3. This may take a while.
Upload Complete.
Environment details for: imagefiltering-dev
  Application name: imagefiltering
  Region: us-east-1
  Deployed Version: app-3ef1-231115_220322554808
  Environment ID: e-ymktk3p9vm
  Platform: arn:aws:elasticbeanstalk:us-east-1::platform/Node.js 18 running on 64bit Amazon Linux 2023/6.0.2
  Tier: WebServer-Standard-1.0
  CNAME: imagefiltering-dev.us-east-1.elasticbeanstalk.com
  Updated: 2023-11-15 15:04:11.955000+00:00
Printing Status:
2023-11-15 15:04:10    INFO    createEnvironment is starting.
2023-11-15 15:04:12    INFO    Using elasticbeanstalk-us-east-1-318477294292 as Amazon S3 storage bucket for environment data.
2023-11-15 15:04:38    INFO    Created security group named: sg-08ff434937d7889e3
2023-11-15 15:04:53    INFO    Created security group named: awseb-e-ymktk3p9vm-stack-AWSEBSecurityGroup-RQY7M4ON9M6T
2023-11-15 15:04:53    INFO    Created target group named: arn:aws:elasticloadbalancing:us-east-1:318477294292:targetgroup/awseb-AWSEB-HLKQN4XLJLNI/04c0cbdb7cb698d4
2023-11-15 15:05:40    INFO    Created Auto Scaling group named: awseb-e-ymktk3p9vm-stack-AWSEBAutoScalingGroup-iBHsGSEAAftq
2023-11-15 15:05:40    INFO    Waiting for EC2 instances to launch. This may take a few minutes.
2023-11-15 15:05:40    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-1:318477294292:scalingPolicy:62c06df2-eb39-4808-87be-096d8c211e35:autoScalingGroupName/awseb-e-ymktk3p9vm-stack-AWSEBAutoScalingGroup-iBHsGSEAAftq:policyName/awseb-e-ymktk3p9vm-stack-AWSEBAutoScalingScaleUpPolicy-eeCSBYSgwgy5
2023-11-15 15:05:40    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-1:318477294292:scalingPolicy:97380d44-8a64-4dfc-8767-2bd18a3aab0b:autoScalingGroupName/awseb-e-ymktk3p9vm-stack-AWSEBAutoScalingGroup-iBHsGSEAAftq:policyName/awseb-e-ymktk3p9vm-stack-AWSEBAutoScalingScaleDownPolicy-J9OfvC0bqv9T
2023-11-15 15:05:40    INFO    Created CloudWatch alarm named: awseb-e-ymktk3p9vm-stack-AWSEBCloudwatchAlarmLow-Rcq5uvYQvGbL
2023-11-15 15:05:40    INFO    Created CloudWatch alarm named: awseb-e-ymktk3p9vm-stack-AWSEBCloudwatchAlarmHigh-S9MBsT7MGkgs
2023-11-15 15:07:15    INFO    Created load balancer named: arn:aws:elasticloadbalancing:us-east-1:318477294292:loadbalancer/app/awseb--AWSEB-0CUpjeaauncp/dcb7c9850e8aa9f2
2023-11-15 15:07:15    INFO    Created Load Balancer listener named: arn:aws:elasticloadbalancing:us-east-1:318477294292:listener/app/awseb--AWSEB-0CUpjeaauncp/dcb7c9850e8aa9f2/68f954b082c3b3fb
2023-11-15 15:07:42    INFO    Instance deployment completed successfully.
2023-11-15 15:07:56    INFO    Application available at imagefiltering-dev.us-east-1.elasticbeanstalk.com.
2023-11-15 15:07:57    INFO    Successfully launched environment: imagefiltering-dev
```
7.6) Check Elastic Beanstalk Application and Environment
[Elastic Beanstalk Environment](https://github.com/thaiwhere/imagefiltering/images/Elastic-Beanstalk-Environment-imagefiltering-dev.PNG)

http://imagefiltering-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://www.thebluediamondgallery.com/handwriting/images/testing.jpg

8. git source
https://github.com/thaiwhere/imagefiltering
