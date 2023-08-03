import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Controller()
export class AppController {
  @GrpcStreamMethod('HelloService', 'SayHello')
  sayHello(request: Observable<any>) {
    throw new RpcException({
      code: status.INVALID_ARGUMENT,
      message: 'hello, error happened'
    });
  }
  @GrpcMethod('HelloService', 'SayHi')
  sayHi(request: any) {
    throw new RpcException({
      code: status.INVALID_ARGUMENT,
      message: 'hi, error happened'
    });
  }
}
