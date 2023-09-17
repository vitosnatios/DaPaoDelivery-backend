"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerStatusController {
    getServerStatus(req, res) {
        res.status(200).json({ message: 'server ok' });
    }
}
exports.default = ServerStatusController;
