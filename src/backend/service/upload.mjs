// uploadThread.mjs
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function uploadData(fileInfo) {
    return new Promise((resolve, reject) => {
        const workerPath = path.join(__dirname, "uploadWorker.mjs");

        const worker = new Worker(workerPath, {
            type: "module"
        });

        worker.postMessage(fileInfo);

        worker.on("message", (result) => {
            resolve(result);
            worker.terminate();
        });

        worker.on("error", (err) => {
            resolve({ success: false, error: err.message });
            worker.terminate();
        });
    });
}
