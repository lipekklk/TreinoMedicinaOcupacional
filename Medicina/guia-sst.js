// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================

const root = document.documentElement;


// ==========================================
// TEMA DARK / LIGHT
// ==========================================

const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    root.dataset.theme = theme;

    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☾' : '☼';
    }
}

const savedTheme = localStorage.getItem('medisocial-theme') || 'light';

applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = root.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('medisocial-theme', newTheme);

    applyTheme(newTheme);
});


// ==========================================
// MENU MOBILE
// ==========================================

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menu?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    menu.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav?.classList.remove('open');
        menu?.setAttribute('aria-expanded', 'false');
    });
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

const parallaxElements = document.querySelectorAll('[data-speed]');

let ticking = false;

function updateParallax() {
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.speed || 0);

        const rect = element.getBoundingClientRect();

        const center =
            rect.top +
            rect.height / 2 -
            window.innerHeight / 2;

        element.style.transform =
            `translate3d(0, ${center * speed}px, 0)`;
    });

    ticking = false;
}

window.addEventListener(
    'scroll',
    () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);

            ticking = true;
        }
    },
    {
        passive: true
    }
);

updateParallax();


const data = [
    [
        "NR-1",
        "Disposições Gerais e Gerenciamento de Riscos Ocupacionais",
        "GRO • PGR • prevenção",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-1" 
    ],
    [
        "NR-2",
        "Inspeção Prévia",
        "Revogada",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-2-nr-2"
    ],
    [
        "NR-3",
        "Embargo e Interdição",
        "medidas administrativas",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-3-nr-3"
    ],
    [
        "NR-4",
        "SESMT",
        "serviços especializados",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-4-nr-4"
    ],
    [
        "NR-5",
        "CIPA",
        "prevenção • assédio",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-5-nr-5"
    ],
    [
        "NR-6",
        "Equipamento de Proteção Individual",
        "EPI",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-6-nr-6"
    ],
    [
        "NR-7",
        "PCMSO",
        "saúde ocupacional • exames",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-7-nr-7"
    ],
    [
        "NR-8",
        "Edificações",
        "condições de segurança",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-8-nr-8"
    ],
    [
        "NR-9",
        "Avaliação e Controle das Exposições",
        "agentes físicos • químicos • biológicos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-9-nr-9"
    ],
    [
        "NR-10",
        "Instalações e Serviços em Eletricidade",
        "eletricidade",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10"
    ],
    [
        "NR-11",
        "Transporte, Movimentação, Armazenagem e Manuseio",
        "materiais",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-11-nr-11"
    ],
    [
        "NR-12",
        "Máquinas e Equipamentos",
        "segurança de máquinas",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-12-nr-12"
    ],
    [
        "NR-13",
        "Caldeiras, Vasos, Tubulações e Tanques",
        "equipamentos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-13-nr-13"
    ],
    [
        "NR-14",
        "Fornos",
        "segurança",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-14-nr-14"
    ],
    [
        "NR-15",
        "Atividades e Operações Insalubres",
        "insalubridade",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-15-nr-15"
    ],
    [
        "NR-16",
        "Atividades e Operações Perigosas",
        "periculosidade",
        "http://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-16-nr-16"
    ],
    [
        "NR-17",
        "Ergonomia",
        "organização do trabalho",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-17-nr-17"
    ],
    [
        "NR-18",
        "Indústria da Construção",
        "construção",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-18-nr-18"
    ],
    [
        "NR-19",
        "Explosivos",
        "explosivos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-19-nr-19"
    ],
    [
        "NR-20",
        "Inflamáveis e Combustíveis",
        "inflamáveis",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-20-nr-20"
    ],
    [
        "NR-21",
        "Trabalhos a Céu Aberto",
        "exposição ambiental",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-21-nr-21"
    ],
    [
        "NR-22",
        "Mineração",
        "mineração",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-22-nr-22"
    ],
    [
        "NR-23",
        "Proteção Contra Incêndios",
        "incêndio",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-23-nr-23"
    ],
    [
        "NR-24",
        "Condições Sanitárias e de Conforto",
        "instalações",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-24-nr-24"
    ],
    [
        "NR-25",
        "Resíduos Industriais",
        "resíduos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-25-nr-25"
    ],
    [
        "NR-26",
        "Sinalização de Segurança",
        "sinalização",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-26-nr-26"
    ],
    [
        "NR-27",
        "Registro Profissional do TST",
        "Revogada",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-27-nr-27"
    ],
    [
        "NR-28",
        "Fiscalização e Penalidades",
        "fiscalização",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-28-nr-28"
    ],
    [
        "NR-29",
        "Trabalho Portuário",
        "portos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-29-nr-29"
    ],
    [
        "NR-30",
        "Trabalho Aquaviário",
        "aquaviário",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-30-nr-30"
    ],
    [
        "NR-31",
        "Agricultura, Pecuária, Silvicultura e Aquicultura",
        "rural",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-31-nr-31"
    ],
    [
        "NR-32",
        "Serviços de Saúde",
        "saúde",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-32-nr-32"
    ],
    [
        "NR-33",
        "Espaços Confinados",
        "espaços confinados",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-33-nr-33"
    ],
    [
        "NR-34",
        "Construção, Reparação e Desmonte Naval",
        "naval",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-34-nr-34"
    ],
    [
        "NR-35",
        "Trabalho em Altura",
        "altura",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-35-nr-35"
    ],
    [
        "NR-36",
        "Abate e Processamento de Carnes",
        "frigoríficos",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-36-nr-36"
    ],
    [
        "NR-37",
        "Plataformas de Petróleo",
        "petróleo",
        "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-37-nr-37"
    ],
    [
        "NR-38",
        "Limpeza Urbana e Manejo de Resíduos",
        "limpeza urbana",
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-38-nr-38"
    ]
];


const grid = document.getElementById('nrGrid');
const search = document.getElementById('nrSearch');
const count = document.getElementById('nrCount');


function render(query = '') {

    if (!grid) return;

    const searchTerm = query.toLowerCase().trim();

    const filteredData = data.filter(item => {
        const content = `${item[0]} ${item[1]} ${item[2]}`;

        return content
            .toLowerCase()
            .includes(searchTerm);
    });


    // Cria os cards
    grid.innerHTML = filteredData
        .map(item => {
            const [number, title, category, link] = item;

            return `
                <a
                    href="${link}"
                    class="nr-card reveal visible"
                >
                    <span>${number}</span>

                    <h3>${title}</h3>

                    <p>${category}</p>
                </a>
            `;
        })
        .join('');


        const total = filteredData.length;

    count.textContent =
        `${total} ${total === 1 ? 'norma' : 'normas'}`;
}


search?.addEventListener('input', event => {
    render(event.target.value);
});

render();
