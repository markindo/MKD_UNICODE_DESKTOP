// udp_client.js
import dgram from "dgram";
import { Buffer } from "buffer";

const PORT = 4096;       // port tujuan (server)
const HOST = "192.168.103.202"; // IP server (bisa diganti IP lain)

const client = dgram.createSocket("udp4");

const message = Buffer.from("aaa10079", "hex");

// kirim pesan ke server
client.send(message, PORT, HOST, (err) => {
    if (err) {
        console.error("Error:", err);
        client.close();
    } else {
        console.log("Pesan terkirim ke server");
    }
});

// event menerima balasan dari server
client.on("message", (msg, rinfo) => {
    console.log(`Balasan dari server: ${msg}`);
    // client.close(); // tutup setelah dapat balasan
});
client.on("data", (msg, rinfo) => {
    console.log(`Balasan dari server: ${msg}`);
    //client.close(); // tutup setelah dapat balasan
});
setInterval(() => {
    console.log("kirimke", message)
    client.send(message, PORT, HOST, (err) => {
        if (err) {
            console.error("Error:", err);
            client.close();
        } else {
            console.log("Pesan terkirim ke server");
        }
    });
}, 3000)