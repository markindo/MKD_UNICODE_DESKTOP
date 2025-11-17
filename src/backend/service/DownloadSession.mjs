import { dialog } from "electron";
export function downloadSession(session) {
    session.defaultSession.on("will-download", (event, item, webContents) => {

        console.log("Download dimulai:", item.getFilename());

        // TRACK PROGRESS
        item.on("updated", (e, state) => {
            if (state === "progressing") {
                const percent = (item.getReceivedBytes() / item.getTotalBytes()) * 100;
                console.log(`Progress: ${percent.toFixed(1)}%`);
            }
        });

        // KETIKA DOWNLOAD SELESAI
        item.on("done", async (e, state) => {
            if (state === "completed") {

                console.log("Download selesai:", item.getFilename());

                await dialog.showMessageBox({
                    type: "info",
                    title: "Download Success",
                    message: `File ${item.getFilename()} berhasil diunduh.`,
                    buttons: ["OK"]
                });

            } else {
                console.log("Download gagal:", state);
            }
        });

    });
}