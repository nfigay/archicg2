// ==============================================================
// FICHIER : rendering-module.js
// ==============================================================

// --- 1. Les Fonctions (Logique Pure) ---

// === NODE RENDERING ===
function renderingNodeIRIShortName() {
    console.log("[Rendering] Exécution: Render Node by Entity IRI Short Name (id)");
}

function nodeRenderingLabel() {
    console.log("[Rendering] Exécution: Render Node by Label (RDFS Label)");
}

function nodeRenderingPrefix() {
    console.log("[Rendering] Exécution: Render Node by Prefixed Name");
}

function nodeRenderingAnnotation() {
    console.log("[Rendering] Exécution: Render Node by Annotation Property");
}

function nodeRenderingCustom() {
    console.log("[Rendering] Exécution: Custom Node Rendering");
}

// === EDGE RENDERING ===
function edgeIRIShortName() {
    console.log("[Rendering] Exécution: Render Edge by Property IRI Short Name (id)");
}

function edgeRenderingPrefixName() {
    console.log("[Rendering] Exécution: Render Edge by Prefixed Name");
}

function edgeRenderingLabel() {
    console.log("[Rendering] Exécution: Render Edge by Label (RDFS Label)");
}

function edgeRenderingAnnotationProperty() {
    console.log("[Rendering] Exécution: Render Edge by Annotation Property");
}

function edgeRenderingCustom() {
    console.log("[Rendering] Exécution: Custom Edge Rendering");
}

// --- 2. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'Rendering';

var RenderingMetadata = {
    metadata: {
        id: MODULE_ID,
        archimateElement: 'Application Component',
        description: 'Module de gestion du rendu des nœuds et des relations'
    },

    // Registre des Fonctions
    functions: [
        // === NODE RENDERING ===
        {
            id: 'RenderingNodeIRIShortName',
            handler: renderingNodeIRIShortName,
            description: 'Rendu des nœuds par nom court IRI de l\'entité.',
            archimateElement: 'Application Function'
        },
        {
            id: 'NodeRenderingLabel',
            handler: nodeRenderingLabel,
            description: 'Rendu des nœuds par libellé RDFS.',
            archimateElement: 'Application Function'
        },
        {
            id: 'NodeRenderingPrefix',
            handler: nodeRenderingPrefix,
            description: 'Rendu des nœuds par nom préfixé.',
            archimateElement: 'Application Function'
        },
        {
            id: 'NodeRenderingAnnotation',
            handler: nodeRenderingAnnotation,
            description: 'Rendu des nœuds par propriété d\'annotation.',
            archimateElement: 'Application Function'
        },
        {
            id: 'NodeRenderingCustom',
            handler: nodeRenderingCustom,
            description: 'Rendu personnalisé des nœuds.',
            archimateElement: 'Application Function'
        },

        // === EDGE RENDERING ===
        {
            id: 'EdgeIRIShortName',
            handler: edgeIRIShortName,
            description: 'Rendu des relations par nom court IRI de la propriété.',
            archimateElement: 'Application Function'
        },
        {
            id: 'EdgeRenderingPrefixName',
            handler: edgeRenderingPrefixName,
            description: 'Rendu des relations par nom préfixé.',
            archimateElement: 'Application Function'
        },
        {
            id: 'EdgeRenderingLabel',
            handler: edgeRenderingLabel,
            description: 'Rendu des relations par libellé RDFS.',
            archimateElement: 'Application Function'
        },
        {
            id: 'EdgeRenderingAnnotationProperty',
            handler: edgeRenderingAnnotationProperty,
            description: 'Rendu des relations par propriété d\'annotation.',
            archimateElement: 'Application Function'
        },
        {
            id: 'EdgeRenderingCustom',
            handler: edgeRenderingCustom,
            description: 'Rendu personnalisé des relations.',
            archimateElement: 'Application Function'
        }
    ],

    // Déclaration du Menu
    menuItems: [
        {
            type: 'menu-check',
            id: 'rendering',
            textKey: "menu.rendering",
            hidden: false,
            icon: 'fa fa-eye',
            disabled: false,
            items: [
                { text: '-- Node' },
                {
                    id: 'renderingnodeirishortname',
                    textKey: "menu.renderingnodeirishortname",
                    disabled: false,
                    functionId: 'RenderingNodeIRIShortName'
                },
                {
                    id: 'noderenderinglabel',
                    textKey: "menu.noderenderinglabel",
                    disabled: false,
                    functionId: 'NodeRenderingLabel'
                },
                {
                    id: 'noderenderingprefix',
                    textKey: "menu.noderenderingprefix",
                    disabled: false,
                    functionId: 'NodeRenderingPrefix'
                },
                {
                    id: 'noderenderingannotation',
                    textKey: "menu.noderenderingannotation",
                    disabled: false,
                    functionId: 'NodeRenderingAnnotation'
                },
                {
                    id: 'noderenderingcustom',
                    textKey: "menu.noderenderingcustom",
                    disabled: false,
                    functionId: 'NodeRenderingCustom'
                },
                { text: '-- Edge' },
                {
                    id: 'edgeirishortName',
                    textKey: "menu.edgeirishortName",
                    disabled: false,
                    functionId: 'EdgeIRIShortName'
                },
                {
                    id: 'edgerenderingprefixName',
                    textKey: "menu.edgerenderingprefixName",
                    disabled: false,
                    functionId: 'EdgeRenderingPrefixName'
                },
                {
                    id: 'edgerenderinglabel',
                    textKey: "menu.edgerenderinglabel",
                    disabled: false,
                    functionId: 'EdgeRenderingLabel'
                },
                {
                    id: 'edgerenderingannotationProperty',
                    textKey: "menu.edgerenderingannotationProperty",
                    disabled: false,
                    functionId: 'EdgeRenderingAnnotationProperty'
                },
                {
                    id: 'edgerenderingcustom',
                    textKey: "menu.edgerenderingcustom",
                    disabled: false,
                    functionId: 'EdgeRenderingCustom'
                }
            ]
        }
    ],

    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: {
            menu: {
                rendering: "Rendering",
                renderingnodeirishortname: "Render by Entity IRI Short Name(id)",
                noderenderinglabel: "Render by Label(RDFS Label)",
                noderenderingprefix: "Render by prefixed name",
                noderenderingannotation: "Render by annotation property",
                noderenderingcustom: "Customed rendering",
                edgeirishortName: "Render by Property IRI Short Name(id)",
                edgerenderingprefixName: "Render by prefixed name",
                edgerenderinglabel: "Render by Label(RDFS Label)",
                edgerenderingannotationProperty: "Render by annotation property",
                edgerenderingcustom: "Customed rendering"
            }
        },
        fr: {
            menu: {
                rendering: "Rendu",
                renderingnodeirishortname: "Rendu par Nom Court de l'IRI de l'Entité (id)",
                noderenderinglabel: "Rendu par Libellé (RDFS Label)",
                noderenderingprefix: "Rendu par Nom Préfixé",
                noderenderingannotation: "Rendu par Propriété d'Annotation",
                noderenderingcustom: "Rendu Personnalisé",
                edgeirishortName: "Rendu par Nom Court de l'IRI de la Propriété (id)",
                edgerenderingprefixName: "Rendu par Nom Préfixé",
                edgerenderinglabel: "Rendu par Libellé (RDFS Label)",
                edgerenderingannotationProperty: "Rendu par Propriété d'Annotation",
                edgerenderingcustom: "Rendu Personnalisé"
            }
        },
        de: {
            menu: {
                rendering: "Rendering",
                renderingnodeirishortname: "Rendern nach Entitäts-IRI Kurzname (id)",
                noderenderinglabel: "Rendern nach Label (RDFS Label)",
                noderenderingprefix: "Rendern nach präfiguriertem Namen",
                noderenderingannotation: "Rendern nach Annotationseigenschaft",
                noderenderingcustom: "Benutzerdefiniertes Rendering",
                edgeirishortName: "Rendern nach Eigenschafts-IRI Kurzname (id)",
                edgerenderingprefixName: "Rendern nach präfiguriertem Namen",
                edgerenderinglabel: "Rendern nach Label (RDFS Label)",
                edgerenderingannotationProperty: "Rendern nach Annotationseigenschaft",
                edgerenderingcustom: "Benutzerdefiniertes Rendering"
            }
        },
        ar: {
            menu: {
                rendering: "عرض",
                renderingnodeirishortname: "عرض باسم IRI القصير للكيان (id)",
                noderenderinglabel: "عرض بالوصف (RDFS Label)",
                noderenderingprefix: "عرض بالاسم المسبوق",
                noderenderingannotation: "عرض بخصائص التعليق التوضيحي",
                noderenderingcustom: "عرض مخصص",
                edgeirishortName: "عرض باسم IRI القصير للخاصية (id)",
                edgerenderingprefixName: "عرض بالاسم المسبوق",
                edgerenderinglabel: "عرض بالوصف (RDFS Label)",
                edgerenderingannotationProperty: "عرض بخصائص التعليق التوضيحي",
                edgerenderingcustom: "عرض مخصص"
            }
        },
        zh: {
            menu: {
                rendering: "渲染",
                renderingnodeirishortname: "按实体 IRI 短名称 (id) 渲染",
                noderenderinglabel: "按标签 (RDFS Label) 渲染",
                noderenderingprefix: "按带前缀的名称渲染",
                noderenderingannotation: "按注解属性渲染",
                noderenderingcustom: "自定义渲染",
                edgeirishortName: "按属性 IRI 短名称 (id) 渲染",
                edgerenderingprefixName: "按带前缀的名称渲染",
                edgerenderinglabel: "按标签 (RDFS Label) 渲染",
                edgerenderingannotationProperty: "按注解属性渲染",
                edgerenderingcustom: "自定义渲染"
            }
        },
        es: {
            menu: {
                rendering: "Renderizado",
                renderingnodeirishortname: "Renderizar por Nombre Corto IRI de Entidad (id)",
                noderenderinglabel: "Renderizar por Etiqueta (RDFS Label)",
                noderenderingprefix: "Renderizar por Nombre Prefijado",
                noderenderingannotation: "Renderizar por Propiedad de Anotación",
                noderenderingcustom: "Renderizado Personalizado",
                edgeirishortName: "Renderizar por Nombre Corto IRI de Propiedad (id)",
                edgerenderingprefixName: "Renderizar por Nombre Prefijado",
                edgerenderinglabel: "Renderizar por Etiqueta (RDFS Label)",
                edgerenderingannotationProperty: "Renderizar por Propiedad de Anotación",
                edgerenderingcustom: "Renderizado Personalizado"
            }
        },
        it: {
            menu: {
                rendering: "Rendering",
                renderingnodeirishortname: "Rendering per Nome Breve IRI Entità (id)",
                noderenderinglabel: "Rendering per Etichetta (RDFS Label)",
                noderenderingprefix: "Rendering per Nome Prefissato",
                noderenderingannotation: "Rendering per Proprietà di Annotazione",
                noderenderingcustom: "Rendering Personalizzato",
                edgeirishortName: "Rendering per Nome Breve IRI Proprietà (id)",
                edgerenderingprefixName: "Rendering per Nome Prefissato",
                edgerenderinglabel: "Rendering per Etichetta (RDFS Label)",
                edgerenderingannotationProperty: "Rendering per Proprietà di Annotazione",
                edgerenderingcustom: "Rendering Personalizzato"
            }
        }
    }
};

console.log("[Rendering Module] Registering module...");
registerModule(RenderingMetadata);