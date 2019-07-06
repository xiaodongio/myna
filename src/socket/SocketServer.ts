import SocketIO from "socket.io";
import { Server } from "http";


export default class SocketServer {
    private server: Server;
    private io: SocketIO.Server;

    public constructor(app: Server) {
        this.server = app;
        this.sockets();
        this.listen();
    }

    private sockets(): void {
        this.io = SocketIO(this.server);
    }

    private listen(): void {
        this.io.on("connection", (socket: any) => {
            console.log("Connected client ");
            socket.emit("hello", {
                hello: "world"
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }
}