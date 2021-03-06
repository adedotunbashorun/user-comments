import * as bodyParser from "body-parser";
import * as controllers from "../controllers";
import * as cors from "cors";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import * as mongoose from "mongoose";
import { config } from "../config";

class AppServer extends Server {
  private readonly SERVER_STARTED = "Example server started on port: ";

  constructor() {
    super(true);
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cors());
    this.mongo();
    this.setupControllers();
  }

  private mongo() {
    const connection = mongoose.connection;
    connection.on("connected", () => {
      Logger.Imp("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
      Logger.Imp("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
      Logger.Imp("Mongo Connection Disconnected");
      Logger.Imp("Trying to reconnect to Mongo ...");
      setTimeout(() => {
        mongoose.connect(config.db.url, {
          keepAlive: true,
        });
      }, 3000);
    });
    connection.on("close", () => {
      Logger.Imp("Mongo Connection Closed");
    });
    connection.on("error", (error: Error) => {
      Logger.Imp("Mongo Connection ERROR: " + error);
    });

    const run = async () => {
      await mongoose.connect(config.db.url, {
        keepAlive: true,
      });
    };
    run().catch((error: Error) => Logger.Imp(error));
    require('../models');
  }

    private setupControllers(): void {
      const ctlrInstances = [];
      for (const name in controllers) {
        if (controllers.hasOwnProperty(name)) {
          const controller = (controllers as any)[name];
          ctlrInstances.push(new controller());
        }
      }
      super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
      this.app.get("*", (req, res) => {
        res.send(this.SERVER_STARTED + port);
      });
      this.app.listen(port, () => {
        Logger.Imp(this.SERVER_STARTED + port);
      });
    }
}

export default AppServer;