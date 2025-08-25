import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement (since using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load proto (make sure path points correctly to service.proto)
const PROTO_PATH = path.join(__dirname, "../server/service.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const myService = grpcObj.myservice;

// Create client
const client = new myService.MyService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call SayHello
client.SayHello({ name: "Sabari" }, (err, response) => {
  if (err) return console.error("SayHello error:", err);
  console.log("SayHello Response:", response);
});

// Call AddNumbers
client.AddNumbers({ a: 10, b: 32 }, (err, response) => {
  if (err) return console.error("AddNumbers error:", err);
  console.log("AddNumbers Response:", response);
});

// Call GetUser
client.GetUser({ id: 5 }, (err, response) => {
  if (err) return console.error("GetUser error:", err);
  console.log("GetUser Response:", response);
});
