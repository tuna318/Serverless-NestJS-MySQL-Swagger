# Serverless, AwS, NestJS, Swagger, Mysql get started.

## 1. Description
A stater project for creating, setting up and deploying nestjs project to aws lambda. <br/>
This project presume that you have aws account with privilege to setup neccessary services.
## 2. Technologies
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS RDS](https://aws.amazon.com/rds/)
- [Serverless](https://www.serverless.com/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)

## 3. Usage

### Setup repository
First, clone the repository:
```
$ git clone https://github.com/tuna-date/Serverless-NestJS-MySQL-Swagger.git
```

Install dependency package:
```
$ npm install
```

Create enviroment file:
```
$ cp .env.example .env
```

Modify the enviroment variables in `.env` to match your setting.

```
STAGE=<YOUR STAGE>
REGION=<DEPLOYMENT REGION>

TYPEORM_CONNECTION = <YOUR CONNECTION>
TYPEORM_HOST = <DB HOST>
TYPEORM_PORT = <DB PORT>
TYPEORM_USERNAME = <DB USER>
TYPEORM_PASSWORD = <DB PASSWORD>
TYPEORM_DATABASE = <DB NAME>
```
### Setup AWS Credentials
Install serverless:
```
$ npm install -g serverless
```

Set up aws profile
```
$ serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_ACCESS_KEY --profile nest-test
```

### Deployment
Compile project:
```
$ npm run-script build
```

Before deploying, we can verify that serverless configuration is OK or not with:
```
$ sls offline start
```

##### Deploy to aws lambda. 
In this project, I use:
- `serverless-plugin-optimize` for optimizing code before deploying.
- `serverless-dotenv-plugin` for injecting enviroment variables from `.env` to lambda instance enviroment.

Deploy
```
$ sls deploy
```

While deploying, serverless may warn you about access authorities over services like APIGateway, CloudFormation, etc. Just attach the corresponding policies to those services with your aws user and continue.

### 4. Result.
After the deployment command executing complete, follow the generated endpoints and get the result:
![](https://github.com/tuna-date/Serverless-NestJS-MySQL-Swagger/blob/master/images/example.jpg)
