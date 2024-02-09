### logger microservice

this is a simple implementation of a logger microservice in nodejs, it sends logs from the producer and consumes them via the warning-consumer and info-consumer.
The log message is described s follows 
```
{
  "logType": "Warning",
  "message": "this request is malicious!!"
}
```
where logType `Warning` will send logs to the warning-consumer and logType `Info` will send logs to the info-consumer

this projects require rabbitmq to run, you can run a container by pulling from docker using `docker pull rabbitmq` and running an image.
A Rabbitmq url has been provided in the config.js file in the producer directory 
so navigate to `http://localhost:15672` to run the management dashboard,
fire up your api platform like postman and send a log!
