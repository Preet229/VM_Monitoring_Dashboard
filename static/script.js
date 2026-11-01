
async function loadStats() {
    try {
        const response = await fetch('/stats');

        if (!response.ok) {
            throw new Error("Unable to fetch system statistics");
        }

        const data = await response.json();

        document.getElementById('cpu').innerText = data.cpu + '%';
        document.getElementById('memory').innerText = data.memory + '%';
        document.getElementById('disk').innerText = data.disk + '%';

        document.getElementById('system').innerText = data.system;
        document.getElementById('processor').innerText =
            data.processor || 'Not available';

        document.getElementById('ram-details').innerText =
            'Memory Used: ' + data.ram_used + ' GB / ' +
            data.ram_total + ' GB';

        document.getElementById('cpu-circle').style.borderColor =
            data.cpu > 80 ? '#dc2626' : '#2563eb';

        document.getElementById('ram-circle').style.borderColor =
            data.memory > 80 ? '#dc2626' : '#16a34a';

        document.getElementById('disk-circle').style.borderColor =
            data.disk > 80 ? '#dc2626' : '#f59e0b';

        document.getElementById('updated').innerText =
            new Date().toLocaleTimeString();

    } catch (error) {
        console.error(error);
        document.getElementById('updated').innerText =
            'Connection error: Check Flask server';
    }
}

loadStats();
setInterval(loadStats, 3000);
