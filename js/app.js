function calculateDates(event) {
    event.preventDefault();

    const inputDate = document.getElementById('purchaseDate').value;
    const errorEl = document.getElementById('form-error');

    if (!inputDate) {
        errorEl.classList.remove('hidden');
        return;
    }
    errorEl.classList.add('hidden');

    const purchase = new Date(inputDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const maxYears = 25;

    const periods = [
        { label: '1 Year',   years: 1  },
        { label: '3 Years',  years: 3  },
        { label: '5 Years',  years: 5  },
        { label: '25 Years', years: 25 },
    ];

    const cards = periods.map((p, i) => {
        const expiry = new Date(purchase);
        expiry.setFullYear(expiry.getFullYear() + p.years);

        const daysFromToday = Math.round((expiry - today) / msPerDay);
        const active = daysFromToday > 0;
        const barPct = Math.round((p.years / maxYears) * 100);

        const expiryFormatted = expiry.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        let countText;
        if (daysFromToday === 0) {
            countText = 'Expires today';
        } else if (active) {
            const years = Math.floor(daysFromToday / 365);
            const months = Math.floor((daysFromToday % 365) / 30);
            const parts = [];
            if (years > 0)  parts.push(`${years}y`);
            if (months > 0) parts.push(`${months}mo`);
            if (parts.length === 0) parts.push(`${daysFromToday}d`);
            countText = `${parts.join(' ')} remaining`;
        } else {
            countText = `Expired ${Math.abs(daysFromToday).toLocaleString()} days ago`;
        }

        return `
            <div class="warranty-card ${active ? 'card-active' : 'card-expired'}"
                 style="animation-delay: ${i * 0.07}s">
                <div class="card-top">
                    <span class="card-period">${p.label}</span>
                    <span class="card-badge ${active ? 'badge-active' : 'badge-expired'}">
                        ${active ? 'ACTIVE' : 'EXPIRED'}
                    </span>
                </div>
                <div class="card-date">${expiryFormatted}</div>
                <div class="card-count">${countText}</div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${barPct}%"></div>
                </div>
            </div>
        `;
    });

    const purchaseFormatted = purchase.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    document.getElementById('warrantyDetails').innerHTML = `
        <div class="results-meta">
            <span class="results-label">Purchase Date</span>
            <span class="results-purchase-date">${purchaseFormatted}</span>
        </div>
        <div class="cards-grid">
            ${cards.join('')}
        </div>
    `;

    const resultEl = document.getElementById('result');
    resultEl.classList.remove('hidden');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Allow Enter key on date input
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('purchaseDate').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculateDates(e);
    });
});
