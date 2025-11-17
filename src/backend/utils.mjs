import xml2js from 'xml2js'

import crc from 'crc'
export async function parseExtractedXml(xmlString) {
    const parser = new xml2js.Parser({ explicitArray: false });
    try {
        const result = await parser.parseStringPromise(xmlString);
        // console.log(JSON.stringify(result));
        // console.log(result);
        return result;
    } catch (err) {
        console.error("Gagal parsing XML:", err.message);
        return null;
    }
}


export function generateHexMsg(head, command, msg) {
    let hexMsg = textToHex(msg)
    let cmd = `${head}${command}${msg.length.toString(16).padStart(2, '0')}${hexMsg}`
    let crcCmd = crc.crc8(cmd).toString(16)
    let cmdData = `${cmd}${crcCmd}`
    return cmdData
}
function textToHex(text) {
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16);
    }
    return hex;
}