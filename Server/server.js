import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement (since using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load proto
const PROTO_PATH = path.join(__dirname, "service.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const myService = grpcObj.myservice;


const serviceImpl = {
  SayHello: (call, callback) => {
    const { name } = call.request;
    callback(null, { message: `Hello, ${name}! 👋` });
  },

  AddNumbers: (call, callback) => {
    const { a, b } = call.request;
    callback(null, { sum: a + b });
  },

  GetUser: (call, callback) => {
    const { id } = call.request;
   
    const user = { id, name: `User${id}` };
    callback(null, user);
  },
};

// Create and start gRPC server
const server = new grpc.Server();
server.addService(myService.MyService.service, serviceImpl);

const PORT = "50051";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC server running at http://localhost:${PORT}`);
    server.start();
  }
);
