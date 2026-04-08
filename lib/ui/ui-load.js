// ============================================================
// FICHIER : ui-load.js (Contrôleur Central et API de Module)
// VERSION COMPLÈTE avec support Modules et Tools
// ============================================================

// ============================================================
// ARCHITECTURE CENTRALISÉE ET REGISTRES
// ============================================================

// Registres Globaux
var functionMetaRegistry = {};
var menuActionRegistry = {};
var moduleMenuRegistry = [];
var toolsRegistry = [];
// SUPPRIMÉ: consolidatedI18nResources — plus nécessaire, i18next gère ses propres ressources

/**
 * Enregistre les métadonnées descriptives d'une fonction et sa référence au handler.
 * @param {string} functionName - Nom unique de la fonction (ex: 'LoadFile').
 * @param {object} metadata - Objet contenant au moins le handler et la description.
 */
function registerFunctionMetadata(functionName, metadata) {
    if (!metadata || typeof metadata.handler !== 'function') {
        console.error(`[ARCHITECTURAL ERROR] Metadata for ${functionName} must include a valid 'handler' function.`);
        return;
    }
    functionMetaRegistry[functionName] = metadata;
}

/**
 * Parcourt récursivement les items de menu et lie l'ID de l'item (clicable) 
 * à son FunctionId (le nom de la fonction à exécuter).
 */
function extractAndRegisterActions(menuItems) {
    if (!menuItems || !Array.isArray(menuItems)) return;

    menuItems.forEach(item => {
        if (item.id && item.functionId) {
            registerMenuAction(item.id, item.functionId);
        }
        if (item.items && Array.isArray(item.items)) {
            extractAndRegisterActions(item.items);
        }
    });
}

/**
 * Exécute une fonction enregistrée via son nom fonctionnel et affiche ses métadonnées.
 * @param {string} functionName - Le nom de la fonction tel qu'enregistré dans functionMetaRegistry.
 * @param {object} event - L'objet événement déclencheur.
 */
function executeRegisteredFunction(functionName, event) {
    const functionMeta = functionMetaRegistry[functionName];

    if (!functionMeta || typeof functionMeta.handler !== 'function') {
        console.error(`[EXECUTION ERROR] Le handler de fonction est manquant ou invalide pour : "${functionName}".`);
        return;
    }

    const isNoOp = functionName === 'NoOp';

    if (!isNoOp) {
        const moduleName = functionMeta.module || 'System';

        const safeMeta = { ...functionMeta };
        delete safeMeta.handler;

        console.groupCollapsed(`[${moduleName}] INVOCATION: ${functionName}`);
        console.log(`=== Méta-données de la fonction "${functionName}" ===`);
        console.log(`  Module d'origine : ${moduleName}`);
        console.log(`  Description : ${safeMeta.description || 'Non fournie'}`);
        console.log(`  Élément Archimate : ${safeMeta.archimateElement || 'Non spécifié'}`);

        if (safeMeta.input) {
            console.log("  Input :", safeMeta.input);
        }
        if (safeMeta.output) {
            console.log("  Output :", safeMeta.output);
        }

        console.log("  Objet Méta-données complet (sans Handler) :");
        console.dir(safeMeta);
        console.log("--- Début de l'exécution du handler ---");
    }

    try {
        functionMeta.handler(event);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la fonction "${functionName}" :`, error);
    }

    if (!isNoOp) {
        console.log("--- Fin de l'exécution ---");
        console.groupEnd();
    }
}

/**
 * Enregistrer une action de menu : lie l'ID du menu au NOM de la Fonction.
 */
function registerMenuAction(menuId, functionName) {
    menuActionRegistry[menuId] = functionName;
}

/**
 * Vérifier si une action existe.
 */
function hasMenuAction(actionId) {
    return typeof menuActionRegistry[actionId] === 'string' && menuActionRegistry[actionId].length > 0;
}

/**
 * Gestionnaire dynamique des actions de menu.
 */
function handleMenuAction(event) {
    var actionId = event.target;
    var functionName = null;

    if (hasMenuAction(actionId)) {
        functionName = menuActionRegistry[actionId];
    }
    else if (actionId.indexOf(':') > -1) {
        var shortId = actionId.split(':')[1];
        if (hasMenuAction(shortId)) {
            functionName = menuActionRegistry[shortId];
        }
    }

    if (functionName) {
        executeRegisteredFunction(functionName, event);
    } else {
        console.warn('No handler (or function name) found for: ' + actionId);
    }
}

// ============================================================
// GESTION DE L'INTERNATIONALISATION (I18N)
// ============================================================

/**
 * Enregistre les ressources i18n d'un module via l'API native i18next.
 * Remplace l'ancienne mergeModuleI18nResources() et son objet consolidatedI18nResources.
 *
 * Les deux flags (deep=true, overwrite=true) garantissent :
 *   - deep     : fusion récursive dans le namespace existant (pas de remplacement brutal)
 *   - overwrite: un rechargement de module peut mettre à jour ses propres clés
 *
 * Le namespace 'translation' est conservé pour tous les modules, ce qui signifie
 * que les textKey existants (ex: "menu.about") continuent de fonctionner sans modification.
 *
 * @param {object} moduleI18n - Ressources i18n du module : { en: {...}, fr: {...}, ... }
 * @param {string} moduleId   - ID du module (pour le log uniquement)
 */
function registerModuleI18n(moduleI18n, moduleId) {
    if (!moduleI18n || typeof moduleI18n !== 'object') return;

    Object.entries(moduleI18n).forEach(([lang, resources]) => {
        i18next.addResourceBundle(lang, 'translation', resources, true, true);
    });

    console.log(`[i18n] Resources registered for module "${moduleId}", languages: ${Object.keys(moduleI18n).join(', ')}`);
}

// ============================================================
// DYNAMIC MODULE REGISTRATION (API Publique pour les Modules)
// ============================================================

/**
 * Fonction API publique utilisée par les modules pour s'auto-déclarer.
 * @param {object} moduleManifest - Le manifeste du module.
 */
function registerModule(moduleManifest) {
    console.log("entered in function registerModule");
    if (!moduleManifest || !moduleManifest.metadata || !moduleManifest.metadata.id) {
        console.error("ERROR: Module manifest is invalid or missing ID.");
        return;
    }

    const moduleId = moduleManifest.metadata.id;
    console.log(`Registering module: ${moduleId}`);

    // 1. Enregistrer les Fonctions/Handlers
    if (Array.isArray(moduleManifest.functions)) {
        moduleManifest.functions.forEach(func => {
            const metadata = Object.assign({}, func, {
                module: moduleId,
                handler: func.handler
            });
            delete metadata.id;

            if (typeof metadata.handler !== 'function') {
                console.error(`[ARCHITECTURAL ERROR] Le handler de la fonction "${func.id}" dans le module "${moduleId}" n'est pas une fonction valide.`);
                return;
            }

            registerFunctionMetadata(func.id, metadata);
        });
    }

    // 2. Enregistrer la Structure de Menu
    if (Array.isArray(moduleManifest.menuItems)) {
        extractAndRegisterActions(moduleManifest.menuItems);
        moduleMenuRegistry.push(...moduleManifest.menuItems);
        w2ui.mainMenu.insert('compoundGraph', moduleManifest.menuItems);
        updateToolbarTranslations();
    }

    // 3. Enregistrer les ressources i18n via addResourceBundle (pas de re-init)
    if (moduleManifest.i18n) {
        registerModuleI18n(moduleManifest.i18n, moduleId);
        updateToolbarTranslations();
    }
}

// ============================================================
// TOOL REGISTRATION SYSTEM (Toolbars + Palettes)
// ============================================================

/**
 * Enregistre un tool (toolbar + fonctions + i18n).
 * @param {object} toolManifest - Le manifeste du tool.
 */
function registerTool(toolManifest) {
    if (!toolManifest || !toolManifest.metadata || !toolManifest.metadata.id) {
        console.error("[TOOL ERROR] Tool manifest is invalid or missing ID.");
        return;
    }

    const toolId = toolManifest.metadata.id;
    console.log(`[TOOL] Registering tool: ${toolId}`);

    // 1. Enregistrer les Fonctions
    if (Array.isArray(toolManifest.functions)) {
        toolManifest.functions.forEach(func => {
            const metadata = Object.assign({}, func, {
                module: toolId,
                handler: func.handler
            });
            delete metadata.id;

            if (typeof metadata.handler !== 'function') {
                console.error(`[TOOL ERROR] Handler for function "${func.id}" in tool "${toolId}" is not a valid function.`);
                return;
            }

            registerFunctionMetadata(func.id, metadata);
        });
    }

    // 2. Créer et enregistrer la Toolbar w2ui
    if (toolManifest.toolbar) {
        const toolbarDef = toolManifest.toolbar;

        if (Array.isArray(toolbarDef.items)) {
            toolbarDef.items.forEach(item => {
                if (item.textKey) {
                    item.text = i18next.t(item.textKey);
                }
            });
        }

        const toolbarName = toolbarDef.name || `toolbar${toolId}`;

        if (w2ui[toolbarName]) {
            console.warn(`[TOOL] Toolbar "${toolbarName}" already exists. Skipping creation.`);
        } else {
            new w2toolbar({
                name: toolbarName,
                style: toolbarDef.style || "background-color:white",
                items: toolbarDef.items,
                onClick: toolbarDef.onClick
            });

            if (typeof config !== 'undefined') {
                config[toolbarName] = w2ui[toolbarName];
            }

            console.log(`[TOOL] Toolbar "${toolbarName}" created successfully.`);
        }
    }

    // 3. Enregistrer les ressources i18n via addResourceBundle (pas de re-init)
    if (toolManifest.i18n) {
        registerModuleI18n(toolManifest.i18n, toolId);

        if (toolManifest.toolbar && toolManifest.toolbar.name) {
            // setTimeout conservé : garantit que w2ui a fini de créer la toolbar
            setTimeout(() => {
                updateToolTranslations(toolManifest.toolbar.name);
            }, 100);
        }
    }

    // 4. Enregistrer le tool dans la liste globale
    toolsRegistry.push({
        id: toolId,
        metadata: toolManifest.metadata,
        toolbarName: toolManifest.toolbar ? toolManifest.toolbar.name : null
    });

    // 5. Compatibilité avec l'ancien système tools array
    if (typeof tools !== 'undefined' && Array.isArray(tools)) {
        if (!tools.includes(toolId)) {
            tools.push(toolId);
        }
    }

    console.log(`[TOOL] Tool "${toolId}" registered successfully.`);
}

/**
 * Met à jour les traductions d'une toolbar de tool spécifique.
 */
function updateToolTranslations(toolbarName) {
    if (!toolbarName) {
        console.warn(`[TOOL] No toolbar name provided for translation update.`);
        return;
    }

    if (!w2ui[toolbarName]) {
        console.warn(`[TOOL] Toolbar "${toolbarName}" not found in w2ui. It may not be created yet.`);
        return;
    }

    const toolbar = w2ui[toolbarName];

    if (toolbar.items && Array.isArray(toolbar.items)) {
        toolbar.items.forEach(item => {
            if (item.textKey) {
                item.text = i18next.t(item.textKey);
            }
        });

        toolbar.refresh();
        console.log(`[TOOL] Toolbar "${toolbarName}" translations updated for language: ${i18next.language}`);
    }
}

/**
 * Met à jour toutes les traductions des toolbars de tools.
 */
function updateAllToolsTranslations() {
    console.log(`[TOOL] Updating all tool translations for language: ${i18next.language}`);

    toolsRegistry.forEach(tool => {
        if (tool.toolbarName) {
            updateToolTranslations(tool.toolbarName);
        }
    });
}

function getTool(toolId) {
    return toolsRegistry.find(tool => tool.id === toolId) || null;
}

function listTools() {
    return toolsRegistry.map(tool => ({
        id: tool.id,
        description: tool.metadata.description,
        type: tool.metadata.type,
        toolbarName: tool.toolbarName
    }));
}

// ============================================================
// I18N RESOURCES & W2UI MENU INITIALIZATION
// ============================================================

// Ressources i18n de BASE (système uniquement)
// Chargées directement dans i18next.init() — pas de consolidation nécessaire
const baseResources = {
    en: {
        translation: {
            forms: {
                blipForm: 'Standard follow up relative data'
            },
            menu: {
                display: "Display",
                showowlconstructs: "Show OWL Constructs Nodes",
                showisa: "Show isa as link",
                showdomainrange: "Show domain and range as nodes",
                showlabelasnode: "Show labels as nodes",
                showlabelasedge: "Show labels as edges",
                showannotationasnode: "Show annotations as nodes",
                showannotationasedge: "Show annotations as edges",
                viewpoint: "Viewpoints",
                individual: "Individuals",
                ontology: "Ontologies",
                sop: "Subject Object Properties",
                data: "Data",
                layout: "Layouts",
                fcose: "Fcose",
                grid: "Grid",
                circle: "Circle",
                cose: "Cose",
                breadthfirst: "Breadthfirst",
                concentric: "Concentric",
                random: "Random",
                cola: "Cola",
                dagre: "Dagre",
                tools: "Tools",
                checker: "Checker",
                archimateAllowedRelationships: "ArchiMate Allowed Relationships",
                palettes: "Palettes"
            },
            confirm: {
                replacegraph: "Do you want to replace the current graph?",
                rdfinplaceofowl: "Do you want to show RDF triples in place of OWL?"
            },
            alert: {
                selectowlinferred: "Please select the inferred OWL File",
                selectowl: "Please select you OWL File"
            }
        }
    },
    fr: {
        translation: {
            forms: {
                blipForm: 'Données relatives au standard suivi',
            },
            menu: {
                display: "Affichage",
                showowlconstructs: "Afficher ... des nœuds OWL",
                showisa: "Afficher ... de 'isa' comme lien",
                showdomainrange: "Afficher ... des domaines et portées comme nœuds",
                showlabelasnode: "Afficher ... des labels comme noeuds",
                showlabelasedge: "Afficher ... des labels comme liens",
                showannotationasnode: "Afficher ... des annotations comme noeuds",
                showannotationasedge: "Afficher ... des annotations comme liens",
                viewpoint: "Points de vue",
                individual: "Individus",
                ontology: "Ontologies",
                sop: "Propriétés sujet-objet",
                data: "Données",
                layout: "Mises en page",
                fcose: "Fcose",
                grid: "Grille",
                circle: "Cercle",
                cose: "Cose",
                breadthfirst: "Parcours en largeur",
                concentric: "Concentrique",
                random: "Aléatoire",
                cola: "Cola",
                dagre: "Dagre",
                tools: "Outils",
                checker: "Validation",
                archimateAllowedRelationships: "Relations ArchiMate Permises",
                palettes: "Palettes"
            },
            confirm: {
                replacegraph: "Voulez vous remplacer le graphe courant?",
                rdfinplaceofowl: "Voulez vous afficher les triples RDF à la place de l'OWL?"
            },
            alert: {
                selectowlinferred: "Veuillez sélectionner le fichier OWL inféré.",
                selectowl: "Veuillez sélectionner votre fichier OWL."
            }
        }
    },
    de: {
        translation: {
            menu: {
                display: "Anzeige",
                viewpoint: "Sichtweisen",
                layout: "Layouts",
                tools: "Werkzeuge",
                checker: "Prüfer",
                palettes: "Paletten"
            }
        }
    },
    ar: {
        translation: {
            menu: {
                display: "عرض",
                viewpoint: "وجهات النظر",
                layout: "التخطيطات",
                tools: "أدوات",
                checker: "مدقق",
                palettes: "لوحات الألوان"
            }
        }
    },
    zh: {
        translation: {
            menu: {
                display: "显示",
                viewpoint: "视点",
                layout: "布局",
                tools: "工具",
                checker: "检查器",
                palettes: "调色板"
            }
        }
    },
    es: {
        translation: {
            menu: {
                display: "Mostrar",
                viewpoint: "Puntos de Vista",
                layout: "Diseños",
                tools: "Herramientas",
                checker: "Comprobador",
                palettes: "Paletas"
            }
        }
    },
    it: {
        translation: {
            menu: {
                display: "Visualizza",
                viewpoint: "Punti di Vista",
                layout: "Layouts",
                tools: "Strumenti",
                checker: "Verificatore",
                palettes: "Palette"
            }
        }
    }
};

// Initialiser i18next avec les ressources de base uniquement.
// Les modules et tools ajouteront leurs ressources via registerModuleI18n()
// en utilisant i18next.addResourceBundle() — sans re-init.
i18next.init({
    lng: "fr",
    fallbackLng: "en",
    resources: baseResources
});

/**
 * Met à jour les traductions du menu principal.
 */
function updateToolbarTranslations() {
    if (typeof w2ui.mainMenu !== 'undefined') {
        const menu = w2ui.mainMenu;

        const translateItems = (items) => {
            if (!items) return;
            items.forEach(item => {
                if (item.textKey) {
                    item.text = i18next.t(item.textKey);
                }
                if (item.items) {
                    translateItems(item.items);
                }
            });
        };

        translateItems(menu.items);
        menu.refresh();

        console.log('[i18n] Toolbar translations applied for language: ' + i18next.language);
    }
}

/**
 * Change la langue de l'application et met à jour toutes les traductions.
 * Inchangé : changeLanguage n'a jamais eu besoin de re-init,
 * et avec addResourceBundle toutes les ressources sont déjà dans i18next.
 */
function changeLanguage(lang) {
    i18next.changeLanguage(lang, () => {
        updateToolbarTranslations();

        if (typeof updateAllToolsTranslations === 'function') {
            updateAllToolsTranslations();
        }

        console.log(`[i18n] Language changed to: ${lang}`);
    });
}

/**
 * Charge les éléments de menu principaux.
 */
function getMenuItems() {
    let dynamicMenuItems = [...moduleMenuRegistry];

    const staticMenuItems = [
        {
            type: 'menu-check',
            id: 'display',
            textKey: "menu.display",
            text: i18next.t('menu.display'),
            hidden: true,
            icon: 'fa fa-eye',
            disabled: false,
            items: [
                { id: 'showowlconstructs', textKey: "menu.showowlconstructs", text: i18next.t('menu.showowlconstructs'), disabled: true },
                { id: 'showisa', textKey: "menu.showisa", text: i18next.t('menu.showisa'), disabled: true },
                { id: 'showdomainrange', textKey: "menu.showdomainrange", text: i18next.t('menu.showdomainrange'), disabled: true },
                { id: 'showlabelasnode', textKey: "menu.showlabelasnode", text: i18next.t('menu.showlabelasnode'), disabled: true },
                { id: 'showlabelasedge', textKey: "menu.showlabelasedge", text: i18next.t('menu.showlabelasedge'), disabled: true },
                { id: 'showannotationasnode', textKey: "menu.showannotationasnode", text: i18next.t('menu.showannotationasnode'), disabled: true },
                { id: 'showannotationasedge', textKey: "menu.showannotationasedge", text: i18next.t('menu.showannotationasedge'), disabled: true }
            ]
        },
        {
            type: 'menu-check',
            id: 'viewpoint',
            textKey: "menu.viewpoint",
            text: i18next.t('menu.viewpoint'),
            hidden: true,
            icon: 'fa fa-eye',
            disabled: false,
            items: [
                { id: 'individual', textKey: "menu.individual", text: i18next.t('menu.individual'), disabled: true },
                { id: 'ontology', textKey: "menu.ontology", text: i18next.t('menu.ontology'), disabled: true },
                { id: 'sop', textKey: "menu.sop", text: i18next.t('menu.sop'), disabled: true },
                { id: 'data', textKey: "menu.data", text: i18next.t('menu.data'), disabled: true }
            ]
        },
        {
            type: "menu-radio",
            id: "layout",
            textKey: "menu.layout",
            text: i18next.t("menu.layout"),
            hidden: true,
            icon: "fa fa-sitemap",
            selected: "fcose",
            items: [
                { id: "fcose", textKey: "menu.fcose", text: i18next.t("menu.fcose") },
                { id: "grid", textKey: "menu.grid", text: i18next.t("menu.grid") },
                { id: "circle", textKey: "menu.circle", text: i18next.t("menu.circle") },
                { id: "cose", textKey: "menu.cose", text: i18next.t("menu.cose") },
                { id: "breadthfirst", textKey: "menu.breadthfirst", text: i18next.t("menu.breadthfirst") },
                { id: "concentric", textKey: "menu.concentric", text: i18next.t("menu.concentric") },
                { id: "random", textKey: "menu.random", text: i18next.t("menu.random") },
                { id: "cola", textKey: "menu.cola", text: i18next.t("menu.cola") },
                { id: "dagre", textKey: "menu.dagre", text: i18next.t("menu.dagre") }
            ]
        },
        { type: 'spacer' },
        {
            type: "menu",
            id: "tools",
            textKey: "menu.tools",
            text: i18next.t("menu.tools"),
            icon: "fa fa-wrench",
            items: []
        },
        {
            type: "menu",
            id: "checker",
            textKey: "menu.checker",
            text: i18next.t("menu.checker"),
            icon: "fa fa-check-circle",
            items: [
                {
                    id: "archimateAllowedRelationships",
                    textKey: "menu.archimateAllowedRelationships",
                    text: i18next.t("menu.archimateAllowedRelationships")
                }
            ]
        },
        {
            type: "menu",
            id: "palettes",
            textKey: "menu.palettes",
            text: i18next.t("menu.palettes"),
            icon: "fa fa-palette",
            items: []
        }
    ];

    return dynamicMenuItems.concat(staticMenuItems);
}

/**
 * Initialiser tous les handlers de menu.
 */
function initializeMenuHandlers() {
    console.log('Initializing menu handlers...');

    registerFunctionMetadata('NoOp', {
        module: 'Control_System',
        description: 'Action de navigation sans logique métier associée.',
        archimateElement: 'Application Interaction',
        handler: function (event) {}
    });

    const allItems = getMenuItems();
    allItems.forEach(rootItem => {
        extractAndRegisterActions([rootItem]);
    });

    console.log(`Menu handlers initialized: ${Object.keys(menuActionRegistry).length} actions`);
}

/**
 * Initialiser le menu principal.
 */
function initializeMainMenu() {
    if (typeof w2ui === 'undefined' || w2ui.mainMenu) return;

    initializeMenuHandlers();

    mainMenu = new w2toolbar({
        name: "mainMenu",
        items: getMenuItems(),
        onClick: function (event) {
            handleMenuAction(event);
        }
    });

    updateToolbarTranslations();

    if (typeof w2ui.mainLayout !== 'undefined') {
        w2ui.mainLayout.html('top', mainMenu);
    }

    return mainMenu;
}

if (typeof w2ui !== 'undefined' && typeof w2ui.mainLayout !== 'undefined') {
    initializeMainMenu();
}

// ============================================================
// SYSTEM READY
// ============================================================
console.log("[TOOL SYSTEM] Tool registration system initialized.");
console.log("[UI-LOAD] System ready. Modules and Tools can now be registered.");