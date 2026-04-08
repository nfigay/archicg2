// ==============================================================
// FICHIER : about-module.js
// ==============================================================

// --- 1. Logo SVG ArchiCG (utilisé dans toutes les langues) ---

const archiCGLogoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" id="archicg" width="100" height="100" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke-width="3" stroke="black"></rect>
    <g>
        <polygon points="28.39735803824,29.909844 44.8589176271,29.909844 53.089516407590004,43.678824 44.8589176271,57.447803 28.39735803824,57.447803 20.16675925775,43.678824" style="fill:#99ccff" />
        <polygon points="55.32160450328001,44.804442 71.78280310457001,44.804442 80.01376287263,58.573074 71.78280310457001,72.342054 55.32160450328001,72.342054 47.09136567005,58.573074" style="fill:#ffff99" />
        <polygon points="28.39735803824,59.699738 44.8589176271,59.699738 53.089516407590004,73.468717 44.8589176271,87.236999 28.39735803824,87.236999 20.16675925775,73.468717" style="fill:#ccf4cc" />
        <polygon points="34.257127779890006,78.132449 31.72564158713,73.894792 34.257127779890006,69.65692 39.32020939796001,69.65692 41.85169455041,73.894792 39.32020939796001,78.132449" style="fill:#009900" />
        <polygon points="33.74702945666,38.787938 38.81011107473,38.787938 41.341596227180005,43.025809 38.81011107473,47.263466 33.74702945666,47.263466 31.215543263900003,43.025809" style="fill:#0066cc" />
        <polygon points="66.19790303081001,54.230892 68.72938922357001,58.468763 66.19790303081001,62.70642 61.13482141274001,62.70642 58.60333626029,58.468763 61.13482141274001,54.230892" style="fill:#ffcc00" />
        <path style="fill:none;stroke:#000000;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-width:1.1429829598131216" d="M 41.3416 43.0258 C 41.3416 43.0258 89.3429 23.3981 77.2842 41.0447 L 66.1979 54.2309" />
    </g>
    <text x="50" y="20" font-size="16" font-weight="bold" text-anchor="middle" fill="#000">ArchiCG</text>
</svg>
`;

// --- 2. Contenu HTML de la boîte "À propos" par langue ---
// Le logo SVG est injecté dynamiquement via ${archiCGLogoSVG}
// Cela évite la duplication du SVG dans chaque traduction

const aboutArchiCGContent = {
    en: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG is a solution aiming at assessing the value of using Interactive Compound Graphs for
            the various stakeholders involved in enterprise digitalisation and who adopted standardized architecture
            description language.<br><br>
            ArchiCG aims at serving actors dealing with End to End Digital Processes, Model Based System Engineering,
            Product Lifecycle Management industrial approach and Interoperability of Enterprise Application components.<br><br>
            For this, ArchiCG supports creation of advanced interactive compound graphs visualization and algorithms
            in order to analyze architecture descriptions and blueprints produced using the Architectural Description
            Language.<br><br>
            ArchiCG is not intended to replace legacy modeling platforms and enterprise repositories, but to
            complement and extend them with previously described features.<br><br>
            Consequently ArchiCG comes with various import and export functionalities, and complementary sets of
            scripts for Architects' modeling tools.<br><br>
            ArchiCG is realized by combined usage of HTML, SVG and JavaScript, in order to run on and require only a
            Web Navigator.<br><br>
            Contact point: <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG Version 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    fr: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG est une solution visant à évaluer la valeur de l'utilisation des Graphes Composés Interactifs pour
            les différentes parties prenantes impliquées dans la digitalisation des entreprises et qui ont adopté un langage
            de description d'architecture standardisé.<br><br>
            ArchiCG vise à servir les acteurs traitant des Processus Numériques de bout en bout, de l'Ingénierie Système
            Basée sur les Modèles, de l'approche industrielle de Gestion du Cycle de Vie des Produits et de
            l'Interopérabilité des composants d'Applications d'Entreprise.<br><br>
            Pour cela, ArchiCG supporte la création de visualisations avancées de graphes composés interactifs et
            d'algorithmes afin d'analyser les descriptions d'architecture et les plans directeurs produits à l'aide du
            Langage de Description Architecturale.<br><br>
            ArchiCG n'est pas destiné à remplacer les plateformes de modélisation existantes et les référentiels
            d'entreprise, mais à les compléter et à les étendre avec les fonctionnalités décrites précédemment.<br><br>
            Par conséquent, ArchiCG est livré avec diverses fonctionnalités d'import et d'export, et des ensembles
            complémentaires de scripts pour les outils de modélisation des Architectes.<br><br>
            ArchiCG est réalisé par l'utilisation combinée de HTML, SVG et JavaScript, afin de fonctionner sur et
            nécessiter uniquement un Navigateur Web.<br><br>
            Contact : <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG Version 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    de: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG ist eine Lösung zur Bewertung des Nutzens interaktiver Verbundgraphen für die verschiedenen
            Stakeholder, die an der digitalen Transformation von Unternehmen beteiligt sind und eine standardisierte
            Architekturbeschreibungssprache einsetzen.<br><br>
            ArchiCG richtet sich an Akteure, die sich mit durchgängigen digitalen Prozessen, modellbasiertem
            Systems Engineering, dem industriellen Ansatz des Product Lifecycle Managements und der
            Interoperabilität von Unternehmensanwendungskomponenten befassen.<br><br>
            Dazu unterstützt ArchiCG die Erstellung erweiterter interaktiver Verbundgraphen-Visualisierungen
            und Algorithmen zur Analyse von Architekturbeschreibungen und Blaupausen, die mit der
            Architekturbeschreibungssprache erstellt wurden.<br><br>
            ArchiCG soll bestehende Modellierungsplattformen und Unternehmensrepositories nicht ersetzen,
            sondern durch die beschriebenen Funktionen ergänzen und erweitern.<br><br>
            Daher bietet ArchiCG verschiedene Import- und Exportfunktionen sowie ergänzende Skriptsammlungen
            für die Modellierungswerkzeuge von Architekten.<br><br>
            ArchiCG wird durch den kombinierten Einsatz von HTML, SVG und JavaScript realisiert, um ausschließlich
            einen Webbrowser zu benötigen.<br><br>
            Kontakt: <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG Version 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    ar: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div dir="rtl" style="text-align: justify; line-height: 1.6;">
            ArchiCG هو حل يهدف إلى تقييم قيمة استخدام الرسوم البيانية المركبة التفاعلية لمختلف أصحاب المصلحة
            المشاركين في الرقمنة المؤسسية والذين اعتمدوا لغة وصف معمارية موحدة.<br><br>
            يهدف ArchiCG إلى خدمة الجهات الفاعلة التي تتعامل مع العمليات الرقمية الشاملة، وهندسة الأنظمة المعتمدة
            على النماذج، والنهج الصناعي لإدارة دورة حياة المنتج، وقابلية التشغيل البيني لمكونات تطبيقات المؤسسة.<br><br>
            لهذا، يدعم ArchiCG إنشاء تصورات متقدمة للرسوم البيانية المركبة التفاعلية وخوارزميات لتحليل أوصاف
            البنية والمخططات التوضيحية المنتجة باستخدام لغة الوصف المعماري.<br><br>
            لا يُقصد من ArchiCG استبدال منصات النمذجة القديمة ومستودعات المؤسسات، بل تكميلها وتوسيعها بالميزات
            الموضحة سابقاً.<br><br>
            وبالتالي، يأتي ArchiCG مع وظائف استيراد وتصدير متنوعة، ومجموعات تكميلية من البرامج النصية لأدوات
            النمذجة الخاصة بالمهندسين المعماريين.<br><br>
            يتم تحقيق ArchiCG من خلال الاستخدام المشترك لـ HTML وSVG وJavaScript، للعمل وعدم الحاجة إلا إلى
            متصفح ويب.<br><br>
            للتواصل: <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG الإصدار 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    zh: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG 是一个旨在评估交互式复合图价值的解决方案，面向参与企业数字化转型并采用标准化架构描述语言的各类利益相关者。<br><br>
            ArchiCG 旨在为处理端到端数字流程、基于模型的系统工程、产品全生命周期管理工业方法以及企业应用组件互操作性的参与者提供服务。<br><br>
            为此，ArchiCG 支持创建高级交互式复合图可视化和算法，以便分析使用架构描述语言生成的架构描述和蓝图。<br><br>
            ArchiCG 并非旨在取代传统建模平台和企业存储库，而是通过前述功能对其进行补充和扩展。<br><br>
            因此，ArchiCG 提供各种导入和导出功能，以及用于架构师建模工具的互补脚本集。<br><br>
            ArchiCG 通过综合使用 HTML、SVG 和 JavaScript 实现，仅需一个网络浏览器即可运行。<br><br>
            联系方式：<a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG 版本 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    es: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG es una solución que busca evaluar el valor del uso de Grafos Compuestos Interactivos para
            las diversas partes interesadas involucradas en la digitalización empresarial que han adoptado un lenguaje
            de descripción de arquitectura estandarizado.<br><br>
            ArchiCG tiene como objetivo servir a los actores que trabajan con Procesos Digitales de extremo a extremo,
            Ingeniería de Sistemas Basada en Modelos, el enfoque industrial de Gestión del Ciclo de Vida del Producto
            e Interoperabilidad de los componentes de Aplicaciones Empresariales.<br><br>
            Para ello, ArchiCG soporta la creación de visualizaciones avanzadas de grafos compuestos interactivos
            y algoritmos para analizar descripciones de arquitectura y planos producidos con el Lenguaje de
            Descripción Arquitectónica.<br><br>
            ArchiCG no pretende reemplazar las plataformas de modelado existentes y los repositorios empresariales,
            sino complementarlos y ampliarlos con las características descritas anteriormente.<br><br>
            En consecuencia, ArchiCG incluye diversas funcionalidades de importación y exportación, y conjuntos
            complementarios de scripts para las herramientas de modelado de los Arquitectos.<br><br>
            ArchiCG está desarrollado con HTML, SVG y JavaScript, de forma que solo requiere un Navegador Web.<br><br>
            Contacto: <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG Versión 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`,

    it: `
        <div style="text-align: center; margin-bottom: 20px;">
            ${archiCGLogoSVG}
        </div>
        <div style="text-align: justify; line-height: 1.6;">
            ArchiCG è una soluzione volta a valutare il valore dell'utilizzo dei Grafi Composti Interattivi per
            i vari stakeholder coinvolti nella digitalizzazione aziendale che hanno adottato un linguaggio di
            descrizione dell'architettura standardizzato.<br><br>
            ArchiCG mira a servire gli attori che si occupano di Processi Digitali End-to-End, Ingegneria dei
            Sistemi Basata su Modelli, approccio industriale alla Gestione del Ciclo di Vita del Prodotto e
            Interoperabilità dei componenti delle Applicazioni Aziendali.<br><br>
            Per questo, ArchiCG supporta la creazione di visualizzazioni avanzate di grafi composti interattivi
            e algoritmi per analizzare descrizioni architetturali e blueprint prodotti con il Linguaggio di
            Descrizione Architetturale.<br><br>
            ArchiCG non intende sostituire le piattaforme di modellazione legacy e i repository aziendali, ma
            complementarli ed estenderli con le funzionalità precedentemente descritte.<br><br>
            Di conseguenza, ArchiCG include varie funzionalità di importazione ed esportazione, e set
            complementari di script per gli strumenti di modellazione degli Architetti.<br><br>
            ArchiCG è realizzato mediante l'uso combinato di HTML, SVG e JavaScript, per funzionare e richiedere
            solo un Browser Web.<br><br>
            Contatto: <a href="mailto:nicolas.figay@gmail.com?subject=archicg">Nicolas Figay</a>
            <div style="margin-top: 20px; text-align: center;">
                <strong>ArchiCG Versione 2.0.1</strong><br>
                &copy; 2022&ndash;2026 Nicolas Figay
            </div>
        </div>`
};

// --- 2. Les Fonctions (Logique Pure) ---

/**
 * Affiche la boîte de dialogue "À propos d'ArchiCG" dans la langue courante.
 * Utilise w2popup pour afficher le contenu HTML localisé avec fenêtre redimensionnable.
 */
function aboutArchiCG() {
    const lang = i18next.language || 'en';
    // Fallback sur 'en' si la langue courante n'est pas disponible
    const content = aboutArchiCGContent[lang] || aboutArchiCGContent['en'];
    const title = i18next.t('menu.aboutArchiCG');

    // Utilisation de w2popup pour une fenêtre avec plus d'options
    w2popup.open({
        title: title,
        body: '<div style="padding: 20px; overflow-y: auto; max-height: 100%;">' + content + '</div>',
        width: 700,
        height: 550,
        showMax: true,      // Affiche le bouton maximiser
        modal: true,        // Fenêtre modale (bloque le reste de l'interface)
        keyboard: true      // Fermeture avec la touche Échap
    });
    
    console.log(`[ArchiCG] Exécution: About ArchiCG (lang: ${lang})`);
}

// --- 3. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'ArchiCG';

var ArchiCGMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        description: 'Module principal ArchiCG - informations sur l\'application',
        position: 'right' // NOUVEAU: Positionner ce module à droite du menu
    },
    
    // Registre des Fonctions
    functions: [
        { 
            id: 'AboutArchiCG', 
            handler: aboutArchiCG, 
            description: 'Afficher la boîte de dialogue À propos d\'ArchiCG dans la langue courante.',
            archimateElement: 'Application Function'
        }
    ],

    // Déclaration du Menu
    menuItems: [
        {
            type: "menu", 
            id: "archicg", 
            textKey: "menu.archicg", 
            icon: "fa fa-info-circle",
            items: [
                { 
                    id: "aboutArchiCG", 
                    textKey: "menu.aboutArchiCG", 
                    functionId: 'AboutArchiCG' 
                }
            ]
        }
    ],
    
    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            menu: { 
                archicg: "ArchiCG",
                aboutArchiCG: "About ArchiCG"
            } 
        },
        fr: { 
            menu: { 
                archicg: "ArchiCG",
                aboutArchiCG: "À propos d'ArchiCG"
            } 
        },
        de: {
            menu: {
                archicg: "ArchiCG",
                aboutArchiCG: "Über ArchiCG"
            }
        },
        ar: {
            menu: {
                archicg: "ArchiCG",
                aboutArchiCG: "حول ArchiCG"
            }
        },
        zh: {
            menu: {
                archicg: "ArchiCG",
                aboutArchiCG: "关于 ArchiCG"
            }
        },
        es: {
            menu: {
                archicg: "ArchiCG",
                aboutArchiCG: "Acerca de ArchiCG"
            }
        },
        it: {
            menu: {
                archicg: "ArchiCG",
                aboutArchiCG: "Informazioni su ArchiCG"
            }
        }
    }
};

console.log("[ArchiCG Module] Registering module...");
registerModule(ArchiCGMetadata);