export function secondsToHMS(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
export function getBulanTahun(isoDateStr) {
        const date = new Date(isoDateStr);
        const bulan = String(date.getMonth() + 1).padStart(2, '0'); // Bulan: 01-12
         const bulan2 = date.toLocaleString('id-ID', { month: 'short' });
        const tahun = date.getFullYear();
        return `${bulan}_${bulan2}_${tahun}`;
}
