import { resolve } from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const PROTO_PATH = resolve('./src/proto/hello.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const helloProto: any = grpc.loadPackageDefinition(packageDefinition).hello;

const client = new helloProto.HelloService('localhost:50051', grpc.credentials.createInsecure());

interface HelloRequest {
  name: string;
}

interface HelloResponse {
  message: string;
}

describe('HelloService', () => {
  it('SayHello should throw exception', async () => {
    try {
      const request: HelloRequest = { name: '' };
      const res = await new Promise((resolve, reject) => {
        const call = client.SayHello((error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });

        // Write some requests to the stream
        call.write({ name: 'Alice' });
        call.write({ name: 'Bob' });
        call.write({ name: 'Charlie' });
        call.end();
      });
    }
    catch (e) {
      expect(e.message).toContain('3 INVALID_ARGUMENT: hello, error happened');
    }
  });

  it('SayHi should throw exception', async () => {
    const request: HelloRequest = { name: '' };

    try {
      const res = await new Promise((resolve, reject) => {
        client.SayHi(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    }
    catch (e) {
      expect(e.message).toContain('3 INVALID_ARGUMENT: hi, error happened');
    }
  });
});