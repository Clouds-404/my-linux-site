const data = {
    kali: { c: '#00ebff', w: 'Kali_Linux', f: 'Offensive Security', y: '2013', b: 'Debian' },
    debian: { c: '#d70a53', w: 'Debian', f: 'Ian Murdock', y: '1993', b: 'Independent' },
    arch: { c: '#1793d1', w: 'Arch_Linux', f: 'Judd Vinet', y: '2002', b: 'Independent' },
    ubuntu: { c: '#e95420', w: 'Ubuntu', f: 'Canonical', y: '2004', b: 'Debian' }
};

async function update(id) {
    const d = data[id];
    const content = document.getElementById('content-area');
    const desc = document.getElementById('distro-desc');

    // 1. Починаємо плавне зникнення тексту
    content.classList.add('hidden');

    // Чекаємо поки текст зникне (0.4с), потім міняємо дані
    setTimeout(async () => {
        document.documentElement.style.setProperty('--accent', d.c);
        document.getElementById('distro-name').innerText = id;
        document.getElementById('founder').innerText = "Founder: " + d.f;
        document.getElementById('year').innerText = "Year: " + d.y;
        document.getElementById('base').innerText = "Base: " + d.b;
        
        desc.innerText = "З'єднання з базою Вікіпедії...";

        try {
            // Отримуємо розширену версію тексту (extract з великим лімітом)
            const res = await fetch(`https://uk.wikipedia.org/api/rest_v1/page/summary/${d.w}`);
            const json = await res.json();
            
            // Замінюємо текст. Вікіпедія дає чистий текст без HTML в 'extract'
            desc.innerText = json.extract || "Дані про цей дистрибутив відсутні у Вікіпедії.";
            
        } catch (e) {
            desc.innerText = "Помилка мережі. Не вдалося підвантажити статтю.";
        }

        // Повертаємо текст на екран з плавним проявленням
        desc.scrollTop = 0; // Скидаємо скролл на початок
        content.classList.remove('hidden');
    }, 400);
}

window.onload = () => update('ubuntu');