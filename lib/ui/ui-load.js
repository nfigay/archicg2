// FICHIER : ui-load.js (Contrôleur Central et API de Module)
// ============================================================

// ============================================================
// ARCHITECTURE CENTRALISÉE ET REGISTRES
// ============================================================

// Registres Globaux
var functionMetaRegistry = {};
var menuActionRegistry = {};
// Registre des structures de menu fournies par les modules
var moduleMenuRegistry = [];

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

// DANS ui-load.js (Définition de la fonction)

/**
 * Parcourt récursivement les items de menu et lie l'ID de l'item (clicable) 
 * à son FunctionId (le nom de la fonction à exécuter).
 * Cette fonction établit le pont entre la structure de menu et le moteur d'exécution.
 */
function extractAndRegisterActions(menuItems) {
    if (!menuItems || !Array.isArray(menuItems)) return;

    menuItems.forEach(item => {
        // Enregistrement : item.id (ce que w2ui donne) -> item.functionId (ce que le handler attend)
        if (item.id && item.functionId) {
            registerMenuAction(item.id, item.functionId);
        }

        // Continuer récursivement pour les sous-menus
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

    // Gère l'erreur si la fonction n'est pas correctement enregistrée
    if (!functionMeta || typeof functionMeta.handler !== 'function') {
        console.error(`[EXECUTION ERROR] Le handler de fonction est manquant ou invalide pour : "${functionName}".`);
        return;
    }

    // =======================================================
    // NOUVEAU: EXCLUSION DES FONCTIONS NO-OP DU LOGGING DÉTAILLÉ
    // =======================================================
    const isNoOp = functionName === 'NoOp';

    // Seul le code qui ne fait pas partie du NoOp continue l'affichage détaillé.
    if (!isNoOp) {
        
        const moduleName = functionMeta.module || 'System';
        
        // 1. Créer une copie des métadonnées et supprimer la référence au handler
        const safeMeta = { ...functionMeta }; 
        delete safeMeta.handler; 

        console.groupCollapsed(`[${moduleName}] INVOCATION: ${functionName}`); 
        
        console.log(`=== Méta-données de la fonction \"${functionName}\" ===`);
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
    // =======================================================

    try {
        functionMeta.handler(event); // L'exécution du handler (même le NoOp) a toujours lieu.
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la fonction "${functionName}" :`, error);
    }
    
    // Ferme le groupe seulement si l'affichage détaillé a été ouvert
    if (!isNoOp) {
        console.log("--- Fin de l'exécution ---");
        console.groupEnd();
    }
}


/**
 * Enregistrer une action de menu : lie l'ID du menu au NOM de la Fonction.
 * @param {string} menuId - L'ID de l'élément de menu (ex: 'loadfile').
 * @param {string} functionName - Le nom de la fonction métier (ex: 'LoadFile').
 */
function registerMenuAction(menuId, functionName) {
    menuActionRegistry[menuId] = functionName;
}

/**
 * Vérifier si une action existe (utilise le registre du menu pour la vérification)
 */
function hasMenuAction(actionId) {
    return typeof menuActionRegistry[actionId] === 'string' && menuActionRegistry[actionId].length > 0;
}

/**
 * Gestionnaire dynamique des actions de menu.
 * Son rôle est uniquement de traduire l'action du menu en Nom de Fonction.
 */
function handleMenuAction(event) {
    var actionId = event.target;
    var functionName = null;
    
    // 1. Chercher l'ID complet (ex: "files:loadfile")
    if (hasMenuAction(actionId)) {
        functionName = menuActionRegistry[actionId];
    }
    // 2. Chercher le short ID (ex: "loadfile")
    else if (actionId.indexOf(':') > -1) {
        var shortId = actionId.split(':')[1];
        if (hasMenuAction(shortId)) {
            functionName = menuActionRegistry[shortId];
        }
    }
    
    if (functionName) {
        // APPEL CENTRALISÉ
        executeRegisteredFunction(functionName, event);
    } else {
        console.warn('No handler (or function name) found for: ' + actionId);
    }
}


// ============================================================
// DYNAMIC MODULE REGISTRATION (API Publique pour les Modules)
// ============================================================

/**
 * Fonction API publique utilisée par les modules pour s'auto-déclarer.
 * Elle inscrit les fonctions et les structures de menu.
 * @param {object} moduleManifest - Le manifeste du module (ex: FileIOMetadata).
 */
function registerModule(moduleManifest) {
    console.log("entered in function registerModule")
    if (!moduleManifest || !moduleManifest.metadata || !moduleManifest.metadata.id) {
        console.error("ERROR: Module manifest is invalid or missing ID.");
        return;
    }

    const moduleId = moduleManifest.metadata.id;
    console.log(`Registering module: ${moduleId}`);

    // 1. Enregistrer les Fonctions/Handlers
    if (Array.isArray(moduleManifest.functions)) {
        moduleManifest.functions.forEach(func => {
           // Création d'un objet de métadonnées complet en copiant toutes les propriétés de 'func'.
            // On utilise Object.assign ou {...func} pour transférer 'description', 'input', 'output', etc.
            const metadata = Object.assign({}, func, {
                // On écrase ou ajoute les propriétés architecturales essentielles
                module: moduleId,
                // On s'assure que 'handler' est inclus, même s'il était déjà dans 'func'
                handler: func.handler 
            });
            
            // On retire la propriété 'id' de l'objet metadata, car elle est passée comme premier argument
            delete metadata.id; 
            
            // On s'assure que le handler est valide avant l'enregistrement final (la vérification est dans registerFunctionMetadata)
            if (typeof metadata.handler !== 'function') {
                console.error(`[ARCHITECTURAL ERROR] Le handler de la fonction "${func.id}" dans le module "${moduleId}" n'est pas une fonction valide.`);
                return;
            }
            
            registerFunctionMetadata(func.id, metadata);
        });
    }

    // 2. Enregistrer la Structure de Menu pour la construction UI
    if (Array.isArray(moduleManifest.menuItems)) {
        extractAndRegisterActions(moduleManifest.menuItems);
        moduleMenuRegistry.push(...moduleManifest.menuItems); 
        w2ui.mainMenu.insert('compoundGraph', moduleManifest.menuItems);
        updateToolbarTranslations()
    }
    
    // 3. Logique i18n (si le module fournit ses propres traductions)
    if (moduleManifest.i18n) {
        // Cette logique est complexe (fusionner les ressources i18next),
        // mais l'appel est ici pour l'architecture. Pour cet exemple, les ressources sont hardcodées ci-dessous.
    }
}


// ============================================================
// I18N RESOURCES & W2UI MENU INITIALIZATION
// ============================================================

// --- Ressources i18n (Inchangées) ---
const resources = {
    en: {
        translation: {
            forms: {
                blipForm: 'Standard follow up relative data'
            },
            menu: {
                loadfile: "Load",
                savefile: "Save",
                import: "Import",
                importJArchicg: "JArchiCG",
                importOEF: "Open Format",
                importJson: "Cytoscape JSON",
                export: "Export",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "Save as image",
                saveasImagePNGView: "PNG View",
                saveasImagePNGFull: "PNG Full",
                saveasImageJPGView: "JPG View",
                saveasImageJPGFull: "JPG Full",
                saveasImageSVGView: "SVG View",
                saveasImageSVGFull: "SVG Full",
                language: "Language",
                compoundGraph: "Compound Graph",
    nodes: "Nodes",
    collapseAllNodes: "Collapse All Nodes",
    collapseSelectedNodesRecursively: "Collapse Selected Nodes Recursively",
    expandAllNodes: "Expand All Nodes",
    expandSelectedNodesRecursively: "Expand Selected Nodes Recursively",
    addCompoundForSelected: "Add Compound for Selected",
    removeSelectedCompound: "Remove Selected Compound",
    addNestedForSelected: "Add Nested for Selected",
    createNodes: "Create Nodes",
    edges: "Edges",
    collapseAllEdges: "Collapse All Edges",
    collapseSelectedEdges: "Collapse Selected Edges",
    expandAllEdges: "Expand All Edges",
    expandSelectedEdges: "Expand Selected Edges",
    collapseEdgesBetweenSelected: "Collapse Edges Between Selected",
    expandEdgesBetweenSelected: "Expand Edges Between Selected",
    compositeGraph: "Composite Graph",
    selectedCompoundToGraph: "Selected Compound to Graph",
    selectedGraphToCompound: "Selected Graph to Compound",
    createComponent: "Create Component",
    showEdges: "Show Edges",
    hideEdges: "Hide Edges",
                iso: "ISO",
                tc: "Technical Committees",
                loadtc: "Load",
                savetc: "Save",
                fetchstandard: "Fetch Standard(RSS)",
                fr: "🇫🇷 French",
                en: "🇬🇧 English",
                de: "🇩🇪 German",
                ar: "🇸🇦 Arabic",
                zh: "🇨🇳 Chinese",
                es: "🇪🇸 Spanish",
                it: "🇮🇹 Italian",
                files: "Files",
                savecsvssr: "Save",
                loadcsvssr: "Load",
                loadgraphssr: "Load",
                savegraphssr: "Save",
                switch: "Switch",
                radars: "Legacy radars",
                mbse: "SE and MBSE Radar",
                plm: "PLM ASD SSG Radar",
                virtualmanufacturing: "Virtual Manufacturing Radar",
                expandCollapse: "Expand/Collapse",
                nodes: "Nodes",
                expandAllNodes: "Expand All",
                collapseAllNodes: "Collapse All",
                expandSelectedNodes: "Expand Selected",
                collapseSelectedNodes: "Collapse Selected",
                expandSelectedNodesRecursively: "Expand Selected Recursively",
                collapseSelectedNodesRecursively: "Collapse Selected Recursively",
                edges: "Edges",
                expandAllEdges: "Expand All",
                collapseAllEdges: "Collapse All",
                expandSelectedEdges: "Expand Selected",
                collapseSelectedEdges: "Collapse Selected",
                collapseEdgesBetweenNodes: "Reduce Between Selected Nodes",
                expandEdgesBetweenNodes: "Expand Between Selected Nodes",
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
                edgerenderingcustom: "Customed rendering",
                label: "Label",
                prefixName: "Prefix Name",
                annotationProperty: "Annotation Property",
                customRendering: "Custom Rendering",
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
                showhidegrabifydelete: "Actions on graph elements",
                showhide: "Show/Hide",
                hideselected: "Hide Selected",
                hidenonselected: "Hide Non Selected",
                unhideall: "Unhide All",
                grabifyungrabify: "Grabify/Ungrabify",
                ungrabifyselected: "Ungrabify Selected",
                ungrabifynonselected: "Ungrabify Non Selected",
                grabifyselected: "Grabify Selected",
                grabifynonselect: "Grabify Non Selected",
                lockunlock: "Lock/Unlock",
                lockselected: "Lock Selected",
                locknonselected: "Lock Non Selected",
                unlockselected: "Unlock Selected",
                unlocknonselect: "Unlock Non Select",
                removerestore: "Remove Restore",
                removeselected: "Remove Selected",
                removeunselected: "Remove Unselected",
                removeall: "Remove All",
                restore: "Restore",
                parameters: "Parameters",
                paletteTooltipsOn: "Palette Tooltips On",
                visualElementsDisplayMode: "Visual Elements Display Mode",
                visualElementsDisplayModeNode: "Nodes",
                visualElementsDisplayModeBox: "Boxes",
                visualRelationsDisplayMode: "Visual Relations Display Mode",
                visualRelationsDisplayModeEdges: "Edges",
                visualRelationsDisplayModeBoxes: "Boxes",
                undoRedo: "Undo/Redo",
                undoRedoOn: "On",
                undoRedoOff: "Off",
                undoRedoClear: "Clear",
                archimateRelationshipsRules: "ArchiMate Relationships Rules",
                rulesEnforce: "Enforce",
                rulesRelax: "Relax",
                paletteTooltipsOff: "Palette Tooltips Off",
                tooltips: "Tooltips",
                tools: "Tools",
                checker: "Checker",
                archimateAllowedRelationships: "ArchiMate Allowed Relationships",
                palettes: "Palettes",
                archicg: "ArchiCG",
                aboutArchiCG: "About ArchiCG"
            },
            confirm: {
                replacegraph: "Do you want to replace the current graph? If yes, current graph will be removed, if no, it will be merged with the import.",
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
                loadfile: "Ouvrir",
                savefile: "Sauver",
                import: "Import",
                importJArchicg: "JArchiCG",
                importOEF: "Open Format",
                importJson: "Cytoscape JSON",
                export: "Export",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "Sauver comme image",
                saveasImagePNGView: "PNG Vue",
                saveasImagePNGFull: "PNG Complet",
                saveasImageJPGView: "JPG Vue",
                saveasImageJPGFull: "JPG Complet",
                saveasImageSVGView: "SVG Vue",
                saveasImageSVGFull: "SVG Complet",

   compoundGraph: "Graphe Composé",
    nodes: "Nœuds",
    collapseAllNodes: "Réduire tous les nœuds",
    collapseSelectedNodesRecursively: "Réduire nœuds sélectionnés récursivement",
    expandAllNodes: "Développer tous les nœuds",
    expandSelectedNodesRecursively: "Développer nœuds sélectionnés récursivement",
    addCompoundForSelected: "Ajouter composé pour sélection",
    removeSelectedCompound: "Supprimer composé sélectionné",
    addNestedForSelected: "Ajouter imbriqué pour sélection",
    createNodes: "Créer nœuds",
    edges: "Relations",
    collapseAllEdges: "Réduire toutes les relations",
    expandAllEdges: "Développer toutes les relations",
    collapseSelectedEdges: "Réduire relations sélectionnées",
    expandSelectedEdges: "Développer relations sélectionnées",
    collapseEdgesBetweenSelected: "Réduire relations entre sélectionnés",
    expandEdgesBetweenSelected: "Développer relations entre sélectionnés",
    compositeGraph: "Graphe Composite",
    selectedCompoundToGraph: "Composé sélectionné vers graphe",
    selectedGraphToCompound: "Graphe sélectionné vers composé",
    createComponent: "Créer composant",
    showEdges: "Afficher relations",
    hideEdges: "Masquer relations",


                language: "Langage",
                iso: "ISO",
                tc: "Comités Techniques",
                loadtc: "Charger",
                savetc: "Sauver",
                fetchstandard: ("Charger Norme (RSS)"),
                fr: "🇫🇷 Français",
                en: "🇬🇧 Anglais",
                de: "🇩🇪 Allemand",
                ar: "🇸🇦 Arabe",
                zh: "🇨🇳 Chinois",
                es: "🇪🇸 Espagnol",
                it: "🇮🇹 Italien",
                files: "Fichiers",
                loadcsvssr: "Ouvrir",
                savecsvssr: "Sauver",
                loadgraphssr: "Ouvrir",
                savegraphssr: "Sauver",
                switch: "Inverser",
                semanticlandscape: "Paysage de la standardisation",
                radars: "Radars existant",
                mbse: "Radar SE et MBSE",
                plm: "Radar PLM de l'ASD SSG",
                virtualmanufacturing: "Radar Virtual Manufacturing",
                expandCollapse: "Développer/Réduire",
                nodes: "Nœuds",
                expandAllNodes: "Tout développer",
                collapseAllNodes: "Tout réduire",
                expandSelectedNodes: "Développer sélectionnés",
                collapseSelectedNodes: "Réduire sélectionnés",
                expandSelectedNodesRecursively: "Développer sélectionnés récursivement",
                collapseSelectedNodesRecursively: "Réduire sélectionnés récursivement",
                edges: "Arêtes",
                expandAllEdges: "Tout développer",
                collapseAllEdges: "Tout réduire",
                expandSelectedEdges: "Développer sélectionnés",
                collapseSelectedEdges: "Réduire sélectionnés",
                collapseEdgesBetweenNodes: "Réduire entre les noeuds sélectionnés",
                expandEdgesBetweenNodes: "Développer entre les noeuds sélectionnés",
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
                edgerenderingcustom: "Rendu Personnalisé",
                label: "Étiquette",
                prefixName: "Nom du préfixe",
                annotationProperty: "Propriété d’annotation",
                customRendering: "Rendu personnalisé",
                display: "Affichage",
                showowlconstructs: "Afficher ... des nœuds OWL", // Correction pour la cohérence avec les autres 'Afficher...'
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
                showhidegrabifydelete: "Actions sur éléments du graphe",
                showhide: "Montrer/Cacher",
                hideselected: "Cacher les sélectionnés",
                hidenonselected: "Cacher les non sélectionnés",
                unhideall: "Révéler tout",
                grabifyungrabify: "Activer/Désactiver la prise",
                ungrabifyselected: "Libérer la sélection",
                ungrabifynonselected: "Libérer les non sélectionnés",
                grabifyselected: "Prendre la sélection",
                grabifynonselect: "Prendre les non sélectionnés",
                lockunlock: "Verrouiller/Déverrouiller",
                lockselected: "Verrouiller la sélection",
                locknonselected: "Verrouiller les non sélectionnés",
                unlockselected: "Déverrouiller la sélection",
                unlocknonselect: "Déverrouiller les non sélectionnés",
                removerestore: "Supprimer/Restaurer",
                removeselected: "Supprimer la sélection",
                removeunselected: "Supprimer les non sélectionnés",
                removeall: "Tout supprimer",
                restore: "Restaurer",
                parameters: "Parametres",
                paletteTooltipsOn: "Tooltips Palette Activé",
                paletteTooltipsOff: "Tooltips Palette Désactivé",
                visualElementsDisplayMode: "Mode d'affichage visuel des éléments",
                visualElementsDisplayModeNode: "Noeuds",
                visualElementsDisplayModeBox: "Boîtes",
                visualRelationsDisplayMode: "Mode d'affichage visuel des relations",
                visualRelationsDisplayModeEdges: "Arcs",
                visualRelationsDisplayModeBoxes: "Boîtes",
                undoRedo: "Défaire/Refaire",
                undoRedoOn: "Activé",
                undoRedoOff: "Désactivé",
                undoRedoClear: "Nettoyer",
                archimateRelationshipsRules: "Règles Relations ArchiMate",
                rulesEnforce: "Forcer",
                rulesRelax: "Relaxer",
                tooltips: "Tooltips",
                tools: "Outils",
                checker: "Validation",
                archimateAllowedRelationships: "Relations ArchiMate Permises",
                palettes: "Palettes",
                archicg: "ArchiCG",
                aboutArchiCG: "A propos d'ArchiCG",
            },
            confirm: {
                replacegraph: "Voulez vous remplacer le graphe courant? Si oui, le graphe actuel sera supprimé, sinon il sera fusionné avec l'import.",
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
            forms: {
                blipForm: 'Standard-Folgeinformationen',
            },
            menu: {
                loadfile: "Laden",
                savefile: "Speichern",
                import: "Importieren",
                importJArchicg: "JArchiCG",
                importOEF: "Offenes Format",
                importJson: "Cytoscape JSON",
                export: "Exportieren",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "Als Bild speichern",
                saveasImagePNGView: "PNG Ansicht",
                saveasImagePNGFull: "PNG Vollbild",
                saveasImageJPGView: "JPG Ansicht",
                saveasImageJPGFull: "JPG Vollbild",
                saveasImageSVGView: "SVG Ansicht",
                saveasImageSVGFull: "SVG Vollbild",

                compoundGraph: "Verbundgraph",
    nodes: "Knoten",
    collapseAllNodes: "Alle Knoten zuklappen",
    collapseSelectedNodesRecursively: "Ausgewählte Knoten rekursiv zuklappen",
    expandAllNodes: "Alle Knoten aufklappen",
    expandSelectedNodesRecursively: "Ausgewählte Knoten rekursiv aufklappen",
    addCompoundForSelected: "Verbund für Auswahl hinzufügen",
    removeSelectedCompound: "Ausgewählten Verbund entfernen",
    addNestedForSelected: "Verschachtelung für Auswahl hinzufügen",
    createNodes: "Knoten erstellen",
    edges: "Kanten",
    collapseAllEdges: "Alle Kanten zuklappen",
    expandAllEdges: "Alle Kanten aufklappen",
    collapseSelectedEdges: "Ausgewählte Kanten zuklappen",
    expandSelectedEdges: "Ausgewählte Kanten aufklappen",
    collapseEdgesBetweenSelected: "Kanten zwischen Auswahl zuklappen",
    expandEdgesBetweenSelected: "Kanten zwischen Auswahl aufklappen",
    compositeGraph: "Zusammengesetzter Graph",
    selectedCompoundToGraph: "Ausgewählten Verbund zu Graph",
    selectedGraphToCompound: "Ausgewählten Graph zu Verbund",
    createComponent: "Komponente erstellen",
    showEdges: "Kanten anzeigen",
    hideEdges: "Kanten ausblenden",
                language: "Sprache",
                iso: "ISO",
                tc: "Technische Komitees",
                loadtc: "Laden",
                savetc: "Speichern",
                fetchstandard: ("Standard abrufen (RSS)"),
                fr: "🇫🇷 Französisch",
                en: "🇬🇧 Englisch",
                de: "🇩🇪 Deutsch",
                ar: "🇸🇦 Arabisch",
                zh: "🇨🇳 Chinesisch",
                es: "🇪🇸 Spanisch",
                it: "🇮🇹 Italienisch",
                files: "Dateien",
                loadcsvssr: "Laden",
                savecsvssr: "Speichern",
                loadgraphssr: "Laden",
                savegraphssr: "Speichern",
                switch: "Umschalten",
                radars: "Legacy Radare",
                mbse: "SE und MBSE Radar",
                plm: "PLM ASD SSG Radar",
                virtualmanufacturing: "Virtuelle Fertigung Radar",
                expandCollapse: "Erweitern/Reduzieren",
                nodes: "Knoten",
                expandAllNodes: "Alle erweitern",
                collapseAllNodes: "Alle reduzieren",
                expandSelectedNodes: "Ausgewählte erweitern",
                collapseSelectedNodes: "Ausgewählte reduzieren",
                expandSelectedNodesRecursively: "Ausgewählte rekursiv erweitern",
                collapseSelectedNodesRecursively: "Ausgewählte rekursiv reduzieren",
                edges: "Kanten",
                expandAllEdges: "Alle erweitern",
                collapseAllEdges: "Alle reduzieren",
                expandSelectedEdges: "Ausgewählte erweitern",
                collapseSelectedEdges: "Ausgewählte reduzieren",
                collapseEdgesBetweenNodes: "Zwischen ausgewählten Knoten reduzieren",
                expandEdgesBetweenNodes: "Zwischen ausgewählten Knoten erweitern",
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
                edgerenderingcustom: "Benutzerdefiniertes Rendering",
                label: "Label",
                prefixName: "Präfix Name",
                annotationProperty: "Annotationseigenschaft",
                customRendering: "Benutzerdefiniertes Rendering",
                display: "Anzeige",
                showowlconstructs: "OWL Konstrukt Knoten anzeigen",
                showisa: "'isa' als Link anzeigen",
                showdomainrange: "Domain und Range als Knoten anzeigen",
                showlabelasnode: "Labels als Knoten anzeigen",
                showlabelasedge: "Labels als Kanten anzeigen",
                showannotationasnode: "Annotationen als Knoten anzeigen",
                showannotationasedge: "Annotationen als Kanten anzeigen",
                viewpoint: "Sichtweisen",
                individual: "Individuen",
                ontology: "Ontologien",
                sop: "Subjekt-Objekt-Eigenschaften",
                data: "Daten",
                layout: "Layouts",
                fcose: "Fcose",
                grid: "Gitter",
                circle: "Kreis",
                cose: "Cose",
                breadthfirst: "Breitensuche",
                concentric: "Konzentrisch",
                random: "Zufällig",
                cola: "Cola",
                dagre: "Dagre",
                showhidegrabifydelete: "Aktionen auf Graphelementen",
                showhide: "Anzeigen/Ausblenden",
                hideselected: "Ausgewählte ausblenden",
                hidenonselected: "Nicht ausgewählte ausblenden",
                unhideall: "Alle wiederherstellen",
                grabifyungrabify: "Greifen/Loslassen",
                ungrabifyselected: "Ausgewählte loslassen",
                ungrabifynonselected: "Nicht ausgewählte loslassen",
                grabifyselected: "Ausgewählte greifen",
                grabifynonselect: "Nicht ausgewählte greifen",
                lockunlock: "Sperren/Entsperren",
                lockselected: "Ausgewählte sperren",
                locknonselected: "Nicht ausgewählte sperren",
                unlockselected: "Ausgewählte entsperren",
                unlocknonselect: "Nicht ausgewählte entsperren",
                removerestore: "Entfernen/Wiederherstellen",
                removeselected: "Ausgewählte entfernen",
                removeunselected: "Nicht ausgewählte entfernen",
                removeall: "Alle entfernen",
                restore: "Wiederherstellen",
                parameters: "Parameter",
                paletteTooltipsOn: "Paletten-Tooltips An",
                visualElementsDisplayMode: "Anzeigemodus für visuelle Elemente",
                visualElementsDisplayModeNode: "Knoten",
                visualElementsDisplayModeBox: "Boxen",
                visualRelationsDisplayMode: "Anzeigemodus für visuelle Beziehungen",
                visualRelationsDisplayModeEdges: "Kanten",
                visualRelationsDisplayModeBoxes: "Boxen",
                undoRedo: "Rückgängig/Wiederherstellen",
                undoRedoOn: "An",
                undoRedoOff: "Aus",
                undoRedoClear: "Löschen",
                archimateRelationshipsRules: "ArchiMate Beziehungsregeln",
                rulesEnforce: "Erzwingen",
                rulesRelax: "Lockern",
                paletteTooltipsOff: "Paletten-Tooltips Aus",
                tooltips: "Tooltips",
                tools: "Werkzeuge",
                checker: "Prüfer",
                archimateAllowedRelationships: "Zulässige ArchiMate Beziehungen",
                palettes: "Paletten",
                archicg: "ArchiCG",
                aboutArchiCG: "Über ArchiCG"
            },
            confirm: {
                replacegraph: "Möchten Sie den aktuellen Graphen ersetzen? Wenn ja, wird der aktuelle Graph entfernt, andernfalls wird er mit dem Import zusammengeführt.",
                rdfinplaceofowl: "Möchten Sie RDF-Tripel anstelle von OWL anzeigen?"
            },
            alert: {
                selectowlinferred: "Bitte wählen Sie die inferierte OWL-Datei aus",
                selectowl: "Bitte wählen Sie Ihre OWL-Datei aus"
            }
        }
    },
    ar: {
        translation: {
            forms: {
                blipForm: 'بيانات المتابعة القياسية النسبية',
            },
            menu: {
                loadfile: "تحميل",
                savefile: "حفظ",
                import: "استيراد",
                importJArchicg: "JArchiCG",
                importOEF: "تنسيق مفتوح",
                importJson: "Cytoscape JSON",
                export: "تصدير",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "حفظ كصورة",
                saveasImagePNGView: "عرض PNG",
                saveasImagePNGFull: "PNG كامل",
                saveasImageJPGView: "عرض JPG",
                saveasImageJPGFull: "JPG كامل",
                saveasImageSVGView: "عرض SVG",
                saveasImageSVGFull: "SVG كامل",
                compoundGraph: "الرسم البياني المركب",
    nodes: "العُقد",
    collapseAllNodes: "طي جميع العُقد",
    collapseSelectedNodesRecursively: "طي العُقد المحددة بشكل متكرر",
    expandAllNodes: "توسيع جميع العُقد",
    expandSelectedNodesRecursively: "توسيع العُقد المحددة بشكل متكرر",
    addCompoundForSelected: "إضافة مركب للمحدد",
    removeSelectedCompound: "إزالة المركب المحدد",
    addNestedForSelected: "إضافة متداخل للمحدد",
    createNodes: "إنشاء عُقد",
    edges: "الحواف/العلاقات",
    collapseAllEdges: "طي جميع الحواف",
    expandAllEdges: "توسيع جميع الحواف",
    collapseSelectedEdges: "طي الحواف المحددة",
    expandSelectedEdges: "توسيع الحواف المحددة",
    collapseEdgesBetweenSelected: "طي الحواف بين المحددات",
    expandEdgesBetweenSelected: "توسيع الحواف بين المحددات",
    compositeGraph: "الرسم البياني المركب",
    selectedCompoundToGraph: "تحويل المركب المحدد إلى رسم بياني",
    selectedGraphToCompound: "تحويل الرسم البياني المحدد إلى مركب",
    createComponent: "إنشاء مكون",
    showEdges: "إظهار الحواف",
    hideEdges: "إخفاء الحواف",
                language: "اللغة",
                iso: "ISO",
                tc: "اللجان الفنية",
                loadtc: "تحميل",
                savetc: "حفظ",
                fetchstandard: ("جلب المعيار (RSS)"),
                fr: "🇫🇷 الفرنسية",
                en: "🇬🇧 الإنجليزية",
                de: "🇩🇪 الألمانية",
                ar: "🇸🇦 العربية",
                zh: "🇨🇳 الصينية",
                es: "🇪🇸 الإسبانية",
                it: "🇮🇹 الإيطالية",
                files: "ملفات",
                loadcsvssr: "تحميل",
                savecsvssr: "حفظ",
                loadgraphssr: "تحميل",
                savegraphssr: "حفظ",
                switch: "تبديل",
                radars: "الردارات القديمة",
                mbse: "رادار SE و MBSE",
                plm: "رادار PLM ASD SSG",
                virtualmanufacturing: "رادار التصنيع الافتراضي",
                expandCollapse: "توسيع/طي",
                nodes: "العقد",
                expandAllNodes: "توسيع الكل",
                collapseAllNodes: "طي الكل",
                expandSelectedNodes: "توسيع المحدد",
                collapseSelectedNodes: "طي المحدد",
                expandSelectedNodesRecursively: "توسيع المحدد بشكل متكرر",
                collapseSelectedNodesRecursively: "طي المحدد بشكل متكرر",
                edges: "الحواف",
                expandAllEdges: "توسيع الكل",
                collapseAllEdges: "طي الكل",
                expandSelectedEdges: "توسيع المحدد",
                collapseSelectedEdges: "طي المحدد",
                collapseEdgesBetweenNodes: "تقليص بين العقد المحددة",
                expandEdgesBetweenNodes: "توسيع بين العقد المحددة",
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
                edgerenderingcustom: "عرض مخصص",
                label: "الوصف",
                prefixName: "اسم البادئة",
                annotationProperty: "خاصية التعليق التوضيحي",
                customRendering: "عرض مخصص",
                display: "عرض",
                showowlconstructs: "إظهار عقد بناء OWL",
                showisa: "إظهار 'isa' كرابط",
                showdomainrange: "إظهار النطاق والمجال كعقد",
                showlabelasnode: "إظهار الأوصاف كعقد",
                showlabelasedge: "إظهار الأوصاف كحواف",
                showannotationasnode: "إظهار التعليقات التوضيحية كعقد",
                showannotationasedge: "إظهار التعليقات التوضيحية كحواف",
                viewpoint: "وجهات النظر",
                individual: "الأفراد",
                ontology: "الأنطولوجيات",
                sop: "خصائص الموضوع والكائن",
                data: "البيانات",
                layout: "التخطيطات",
                fcose: "Fcose",
                grid: "شبكة",
                circle: "دائرة",
                cose: "Cose",
                breadthfirst: "بحث اتساعي",
                concentric: "متحد المركز",
                random: "عشوائي",
                cola: "Cola",
                dagre: "Dagre",
                showhidegrabifydelete: "إجراءات على عناصر الرسم البياني",
                showhide: "إظهار/إخفاء",
                hideselected: "إخفاء المحدد",
                hidenonselected: "إخفاء غير المحدد",
                unhideall: "إظهار الكل",
                grabifyungrabify: "التقاط/إلغاء الالتقاط",
                ungrabifyselected: "إلغاء التقاط المحدد",
                ungrabifynonselected: "إلغاء التقاط غير المحدد",
                grabifyselected: "التقاط المحدد",
                grabifynonselect: "التقاط غير المحدد",
                lockunlock: "قفل/فتح القفل",
                lockselected: "قفل المحدد",
                locknonselected: "قفل غير المحدد",
                unlockselected: "فتح قفل المحدد",
                unlocknonselect: "فتح قفل غير المحدد",
                removerestore: "إزالة/استعادة",
                removeselected: "إزالة المحدد",
                removeunselected: "إزالة غير المحدد",
                removeall: "إزالة الكل",
                restore: "استعادة",
                parameters: "المعايير",
                paletteTooltipsOn: "تلميحات الألوان مفعلة",
                visualElementsDisplayMode: "وضع عرض العناصر المرئية",
                visualElementsDisplayModeNode: "عقد",
                visualElementsDisplayModeBox: "صناديق",
                visualRelationsDisplayMode: "وضع عرض العلاقات المرئية",
                visualRelationsDisplayModeEdges: "حواف",
                visualRelationsDisplayModeBoxes: "صناديق",
                undoRedo: "تراجع/إعادة",
                undoRedoOn: "مفعل",
                undoRedoOff: "معطل",
                undoRedoClear: "مسح",
                archimateRelationshipsRules: "قواعد علاقات ArchiMate",
                rulesEnforce: "فرض",
                rulesRelax: "تخفيف",
                paletteTooltipsOff: "تلميحات الألوان معطلة",
                tooltips: "تلميحات الأدوات",
                tools: "أدوات",
                checker: "مدقق",
                archimateAllowedRelationships: "علاقات ArchiMate المسموح بها",
                palettes: "لوحات الألوان",
                archicg: "ArchiCG",
                aboutArchiCG: "حول ArchiCG"
            },
            confirm: {
                replacegraph: "هل تريد استبدال الرسم البياني الحالي؟ إذا نعم، سيتم إزالة الرسم البياني الحالي، وإذا لا، فسيتم دمجه مع الاستيراد.",
                rdfinplaceofowl: "هل تريد إظهار ثلاثيات RDF بدلاً من OWL؟"
            },
            alert: {
                selectowlinferred: "الرجاء تحديد ملف OWL المستنتج",
                selectowl: "الرجاء تحديد ملف OWL الخاص بك"
            }
        }
    },
    zh: {
        translation: {
            forms: {
                blipForm: '标准跟进相关数据',
            },
            menu: {
                loadfile: "加载",
                savefile: "保存",
                import: "导入",
                importJArchicg: "JArchiCG",
                importOEF: "开放格式",
                importJson: "Cytoscape JSON",
                export: "导出",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "另存为图片",
                saveasImagePNGView: "PNG 视图",
                saveasImagePNGFull: "PNG 完整",
                saveasImageJPGView: "JPG 视图",
                saveasImageJPGFull: "JPG 完整",
                saveasImageSVGView: "SVG 视图",
                saveasImageSVGFull: "SVG 完整",
                compoundGraph: "复合图",
    nodes: "节点",
    collapseAllNodes: "折叠所有节点",
    collapseSelectedNodesRecursively: "递归折叠选定节点",
    expandAllNodes: "展开所有节点",
    expandSelectedNodesRecursively: "递归展开选定节点",
    addCompoundForSelected: "为选定项添加复合",
    removeSelectedCompound: "移除选定复合",
    addNestedForSelected: "为选定项添加嵌套",
    createNodes: "创建节点",
    edges: "边",
    collapseAllEdges: "折叠所有边",
    expandAllEdges: "展开所有边",
    collapseSelectedEdges: "折叠选定边",
    expandSelectedEdges: "展开选定边",
    collapseEdgesBetweenSelected: "折叠选定项之间的边",
    expandEdgesBetweenSelected: "展开选定项之间的边",
    compositeGraph: "组合图",
    selectedCompoundToGraph: "选定复合到图",
    selectedGraphToCompound: "选定图到复合",
    createComponent: "创建组件",
    showEdges: "显示边",
    hideEdges: "隐藏边",
                language: "语言",
                iso: "ISO",
                tc: "技术委员会",
                loadtc: "加载",
                savetc: "保存",
                fetchstandard: ("获取标准 (RSS)"),
                fr: "🇫🇷 法语",
                en: "🇬🇧 英语",
                de: "🇩🇪 德语",
                ar: "🇸🇦 阿拉伯语",
                zh: "🇨🇳 中文",
                es: "🇪🇸 西班牙语",
                it: "🇮🇹 意大利语",
                files: "文件",
                loadcsvssr: "加载",
                savecsvssr: "保存",
                loadgraphssr: "加载",
                savegraphssr: "保存",
                switch: "切换",
                radars: "传统雷达",
                mbse: "SE 和 MBSE 雷达",
                plm: "PLM ASD SSG 雷达",
                virtualmanufacturing: "虚拟制造雷达",
                expandCollapse: "展开/折叠",
                nodes: "节点",
                expandAllNodes: "全部展开",
                collapseAllNodes: "全部折叠",
                expandSelectedNodes: "展开选中",
                collapseSelectedNodes: "折叠选中",
                expandSelectedNodesRecursively: "递归展开选中",
                collapseSelectedNodesRecursively: "递归折叠选中",
                edges: "边",
                expandAllEdges: "全部展开",
                collapseAllEdges: "全部折叠",
                expandSelectedEdges: "展开选中",
                collapseSelectedEdges: "折叠选中",
                collapseEdgesBetweenNodes: "收缩选中节点之间",
                expandEdgesBetweenNodes: "展开选中节点之间",
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
                edgerenderingcustom: "自定义渲染",
                label: "标签",
                prefixName: "前缀名称",
                annotationProperty: "注解属性",
                customRendering: "自定义渲染",
                display: "显示",
                showowlconstructs: "显示 OWL 结构节点",
                showisa: "显示 'isa' 为链接",
                showdomainrange: "显示 Domain 和 Range 为节点",
                showlabelasnode: "显示 Label 为节点",
                showlabelasedge: "显示 Label 为边",
                showannotationasnode: "显示 Annotation 为节点",
                showannotationasedge: "显示 Annotation 为边",
                viewpoint: "视点",
                individual: "个体",
                ontology: "本体",
                sop: "主语-宾语属性",
                data: "数据",
                layout: "布局",
                fcose: "Fcose",
                grid: "网格",
                circle: "圆形",
                cose: "Cose",
                breadthfirst: "广度优先",
                concentric: "同心圆",
                random: "随机",
                cola: "Cola",
                dagre: "Dagre",
                showhidegrabifydelete: "图元素操作",
                showhide: "显示/隐藏",
                hideselected: "隐藏选中",
                hidenonselected: "隐藏未选中",
                unhideall: "显示全部",
                grabifyungrabify: "抓取/取消抓取",
                ungrabifyselected: "取消抓取选中",
                ungrabifynonselected: "取消抓取未选中",
                grabifyselected: "抓取选中",
                grabifynonselect: "抓取未选中",
                lockunlock: "锁定/解锁",
                lockselected: "锁定选中",
                locknonselected: "锁定未选中",
                unlockselected: "解锁选中",
                unlocknonselect: "解锁未选中",
                removerestore: "移除/恢复",
                removeselected: "移除选中",
                removeunselected: "移除未选中",
                removeall: "移除全部",
                restore: "恢复",
                parameters: "参数",
                paletteTooltipsOn: "调色板提示开启",
                visualElementsDisplayMode: "可视化元素显示模式",
                visualElementsDisplayModeNode: "节点",
                visualElementsDisplayModeBox: "框",
                visualRelationsDisplayMode: "可视化关系显示模式",
                visualRelationsDisplayModeEdges: "边",
                visualRelationsDisplayModeBoxes: "框",
                undoRedo: "撤销/重做",
                undoRedoOn: "开启",
                undoRedoOff: "关闭",
                undoRedoClear: "清除",
                archimateRelationshipsRules: "ArchiMate 关系规则",
                rulesEnforce: "强制执行",
                rulesRelax: "放宽",
                paletteTooltipsOff: "调色板提示关闭",
                tooltips: "工具提示",
                tools: "工具",
                checker: "检查器",
                archimateAllowedRelationships: "允许的 ArchiMate 关系",
                palettes: "调色板",
                archicg: "ArchiCG",
                aboutArchiCG: "关于 ArchiCG"
            },
            confirm: {
                replacegraph: "您想替换当前图表吗？如果选择是，当前图表将被删除；如果选择否，它将与导入合并。",
                rdfinplaceofowl: "您想显示 RDF 三元组而不是 OWL 吗？"
            },
            alert: {
                selectowlinferred: "请选择推断的 OWL 文件",
                selectowl: "请选择您的 OWL 文件"
            }
        }
    },
    es: {
        translation: {
            forms: {
                blipForm: 'Datos relativos al seguimiento estándar',
            },
            menu: {
                loadfile: "Cargar",
                savefile: "Guardar",
                import: "Importar",
                importJArchicg: "JArchiCG",
                importOEF: "Formato Abierto",
                importJson: "Cytoscape JSON",
                export: "Exportar",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "Guardar como imagen",
                saveasImagePNGView: "PNG Vista",
                saveasImagePNGFull: "PNG Completo",
                saveasImageJPGView: "JPG Vista",
                saveasImageJPGFull: "JPG Completo",
                saveasImageSVGView: "SVG Vista",
                saveasImageSVGFull: "SVG Completo",
                compoundGraph: "Grafo Compuesto",
    nodes: "Nodos",
    collapseAllNodes: "Colapsar todos los nodos",
    collapseSelectedNodesRecursively: "Colapsar nodos seleccionados recursivamente",
    expandAllNodes: "Expandir todos los nodos",
    expandSelectedNodesRecursively: "Expandir nodos seleccionados recursivamente",
    addCompoundForSelected: "Añadir compuesto a la selección",
    removeSelectedCompound: "Eliminar compuesto seleccionado",
    addNestedForSelected: "Añadir anidado a la selección",
    createNodes: "Crear nodos",
    edges: "Aristas",
    collapseAllEdges: "Colapsar todas las aristas",
    expandAllEdges: "Expandir todas las aristas",
    collapseSelectedEdges: "Colapsar aristas seleccionadas",
    expandSelectedEdges: "Expandir aristas seleccionadas",
    collapseEdgesBetweenSelected: "Colapsar aristas entre seleccionados",
    expandEdgesBetweenSelected: "Expandir aristas entre seleccionados",
    compositeGraph: "Grafo Compuesto",
    selectedCompoundToGraph: "Compuesto seleccionado a grafo",
    selectedGraphToCompound: "Grafo seleccionado a compuesto",
    createComponent: "Crear componente",
    showEdges: "Mostrar aristas",
    hideEdges: "Ocultar aristas",
                language: "Idioma",
                iso: "ISO",
                tc: "Comités Técnicos",
                loadtc: "Cargar",
                savetc: "Guardar",
                fetchstandard: ("Cargar Norma (RSS)"),
                fr: "🇫🇷 Francés",
                en: "🇬🇧 Inglés",
                de: "🇩🇪 Alemán",
                ar: "🇸🇦 Árabe",
                zh: "🇨🇳 Chino",
                es: "🇪🇸 Español",
                it: "🇮🇹 Italiano",
                files: "Archivos",
                loadcsvssr: "Cargar",
                savecsvssr: "Guardar",
                loadgraphssr: "Cargar",
                savegraphssr: "Guardar",
                switch: "Cambiar",
                radars: "Radares Heredados",
                mbse: "Radar SE y MBSE",
                plm: "Radar PLM ASD SSG",
                virtualmanufacturing: "Radar de Fabricación Virtual",
                expandCollapse: "Expandir/Colapsar",
                nodes: "Nodos",
                expandAllNodes: "Expandir Todo",
                collapseAllNodes: "Colapsar Todo",
                expandSelectedNodes: "Expandir Seleccionados",
                collapseSelectedNodes: "Colapsar Seleccionados",
                expandSelectedNodesRecursively: "Expandir Seleccionados Recursivamente",
                collapseSelectedNodesRecursively: "Colapsar Seleccionados Recursivamente",
                edges: "Aristas",
                expandAllEdges: "Expandir Todo",
                collapseAllEdges: "Colapsar Todo",
                expandSelectedEdges: "Expandir Seleccionados",
                collapseSelectedEdges: "Colapsar Seleccionados",
                collapseEdgesBetweenNodes: "Reducir Entre Nodos Seleccionados",
                expandEdgesBetweenNodes: "Expandir Entre Nodos Seleccionados",
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
                edgerenderingcustom: "Renderizado Personalizado",
                label: "Etiqueta",
                prefixName: "Nombre de Prefijo",
                annotationProperty: "Propiedad de Anotación",
                customRendering: "Renderizado Personalizado",
                display: "Mostrar",
                showowlconstructs: "Mostrar Nodos de Constructos OWL",
                showisa: "Mostrar 'isa' como enlace",
                showdomainrange: "Mostrar dominio y rango como nodos",
                showlabelasnode: "Mostrar etiquetas como nodos",
                showlabelasedge: "Mostrar etiquetas como aristas",
                showannotationasnode: "Mostrar anotaciones como nodos",
                showannotationasedge: "Mostrar anotaciones como aristas",
                viewpoint: "Puntos de Vista",
                individual: "Individuos",
                ontology: "Ontologías",
                sop: "Propiedades Sujeto Objeto",
                data: "Datos",
                layout: "Diseños",
                fcose: "Fcose",
                grid: "Cuadrícula",
                circle: "Círculo",
                cose: "Cose",
                breadthfirst: "Primero en Amplitud",
                concentric: "Concéntrico",
                random: "Aleatorio",
                cola: "Cola",
                dagre: "Dagre",
                showhidegrabifydelete: "Acciones en Elementos del Grafo",
                showhide: "Mostrar/Ocultar",
                hideselected: "Ocultar Seleccionados",
                hidenonselected: "Ocultar No Seleccionados",
                unhideall: "Mostrar Todo",
                grabifyungrabify: "Agarrar/Soltar",
                ungrabifyselected: "Soltar Seleccionados",
                ungrabifynonselected: "Soltar No Seleccionados",
                grabifyselected: "Agarrar Seleccionados",
                grabifynonselect: "Agarrar No Seleccionados",
                lockunlock: "Bloquear/Desbloquear",
                lockselected: "Bloquear Seleccionados",
                locknonselected: "Bloquear No Seleccionados",
                unlockselected: "Desbloquear Seleccionados",
                unlocknonselect: "Desbloquear No Seleccionados",
                removerestore: "Eliminar/Restaurar",
                removeselected: "Eliminar Seleccionados",
                removeunselected: "Eliminar No Seleccionados",
                removeall: "Eliminar Todo",
                restore: "Restaurar",
                parameters: "Parámetros",
                paletteTooltipsOn: "Tooltips de Paleta Activados",
                visualElementsDisplayMode: "Modo de Visualización de Elementos Visuales",
                visualElementsDisplayModeNode: "Nodos",
                visualElementsDisplayModeBox: "Cajas",
                visualRelationsDisplayMode: "Modo de Visualización de Relaciones Visuales",
                visualRelationsDisplayModeEdges: "Aristas",
                visualRelationsDisplayModeBoxes: "Cajas",
                undoRedo: "Deshacer/Rehacer",
                undoRedoOn: "Activado",
                undoRedoOff: "Desactivado",
                undoRedoClear: "Limpiar",
                archimateRelationshipsRules: "Reglas de Relaciones ArchiMate",
                rulesEnforce: "Aplicar",
                rulesRelax: "Relajar",
                paletteTooltipsOff: "Tooltips de Paleta Desactivados",
                tooltips: "Tooltips",
                tools: "Herramientas",
                checker: "Comprobador",
                archimateAllowedRelationships: "Relaciones ArchiMate Permitidas",
                palettes: "Paletas",
                archicg: "ArchiCG",
                aboutArchiCG: "Acerca de ArchiCG"
            },
            confirm: {
                replacegraph: "Quiere reemplazar el grafo actual? Si sí, el grafo actual será eliminado, si no, se fusionará con la importación.",
                rdfinplaceofowl: "¿Desea mostrar los triples RDF en lugar de OWL?"
            },
            alert: {
                selectowlinferred: "Por favor, seleccione el archivo OWL inferido",
                selectowl: "Por favor, seleccione su archivo OWL"
            }
        }
    },
    it: {
        translation: {
            forms: {
                blipForm: 'Dati relativi al follow-up standard',
            },
            menu: {
                loadfile: "Carica",
                savefile: "Salva",
                import: "Importa",
                importJArchicg: "JArchiCG",
                importOEF: "Formato Aperto",
                importJson: "Cytoscape JSON",
                export: "Esporta",
                exportCSV: "CSV",
                exportOWL: "OWL",
                saveasImage: "Salva come immagine",
                saveasImagePNGView: "PNG Vista",
                saveasImagePNGFull: "PNG Completo",
                saveasImageJPGView: "JPG Vista",
                saveasImageJPGFull: "JPG Completo",
                saveasImageSVGView: "SVG Vista",
                saveasImageSVGFull: "SVG Completo",
                compoundGraph: "Grafo Composto",
    nodes: "Nodi",
    collapseAllNodes: "Comprimi tutti i nodi",
    collapseSelectedNodesRecursively: "Comprimi nodi selezionati in modo ricorsivo",
    expandAllNodes: "Espandi tutti i nodi",
    expandSelectedNodesRecursively: "Espandi nodi selezionati in modo ricorsivo",
    addCompoundForSelected: "Aggiungi composto per la selezione",
    removeSelectedCompound: "Rimuovi composto selezionato",
    addNestedForSelected: "Aggiungi annidato per la selezione",
    createNodes: "Crea nodi",
    edges: "Relazioni",
    collapseAllEdges: "Comprimi tutte le relazioni",
    expandAllEdges: "Espandi tutte le relazioni",
    collapseSelectedEdges: "Comprimi relazioni selezionate",
    expandSelectedEdges: "Espandi relazioni selezionate",
    collapseEdgesBetweenSelected: "Comprimi relazioni tra selezionati",
    expandEdgesBetweenSelected: "Espandi relazioni tra selezionati",
    compositeGraph: "Grafo Composito",
    selectedCompoundToGraph: "Composto selezionato a grafo",
    selectedGraphToCompound: "Grafo selezionato a composto",
    createComponent: "Crea componente",
    showEdges: "Mostra relazioni",
    hideEdges: "Nascondi relazioni",
                language: "Lingua",
                iso: "ISO",
                tc: "Comitati Tecnici",
                loadtc: "Carica",
                savetc: "Salva",
                fetchstandard: ("Carica Standard (RSS)"),
                fr: "🇫🇷 Francese",
                en: "🇬🇧 Inglese",
                de: "🇩🇪 Tedesco",
                ar: "🇸🇦 Arabo",
                zh: "🇨🇳 Cinese",
                es: "🇪🇸 Spagnolo",
                it: "🇮🇹 Italiano",
                files: "File",
                loadcsvssr: "Carica",
                savecsvssr: "Salva",
                loadgraphssr: "Carica",
                savegraphssr: "Salva",
                switch: "Scambia",
                radars: "Radar Ereditati",
                mbse: "Radar SE e MBSE",
                plm: "Radar PLM ASD SSG",
                virtualmanufacturing: "Radar Produzione Virtuale",
                expandCollapse: "Espandi/Comprimi",
                nodes: "Nodi",
                expandAllNodes: "Espandi Tutto",
                collapseAllNodes: "Comprimi Tutto",
                expandSelectedNodes: "Espandi Selezionati",
                collapseSelectedNodes: "Comprimi Selezionati",
                expandSelectedNodesRecursively: "Espandi Selezionati Ricorsivamente",
                collapseSelectedNodesRecursively: "Comprimi Selezionati Ricorsivamente",
                edges: "Archi",
                expandAllEdges: "Espandi Tutto",
                collapseAllEdges: "Comprimi Tutto",
                expandSelectedEdges: "Espandi Selezionati",
                collapseSelectedEdges: "Comprimi Selezionati",
                collapseEdgesBetweenNodes: "Riduci Tra Nodi Selezionati",
                expandEdgesBetweenNodes: "Espandi Tra Nodi Selezionati",
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
                edgerenderingcustom: "Rendering Personalizzato",
                label: "Etichetta",
                prefixName: "Nome Prefisso",
                annotationProperty: "Proprietà di Annotazione",
                customRendering: "Rendering Personalizzato",
                display: "Visualizza",
                showowlconstructs: "Mostra Nodi Costrutti OWL",
                showisa: "Mostra 'isa' come link",
                showdomainrange: "Mostra dominio e range come nodi",
                showlabelasnode: "Mostra etichette come nodi",
                showlabelasedge: "Mostra etichette come archi",
                showannotationasnode: "Mostra annotazioni come nodi",
                showannotationasedge: "Mostra annotazioni come archi",
                viewpoint: "Punti di Vista",
                individual: "Individui",
                ontology: "Ontologie",
                sop: "Proprietà Soggetto Oggetto",
                data: "Dati",
                layout: "Layouts",
                fcose: "Fcose",
                grid: "Griglia",
                circle: "Cerchio",
                cose: "Cose",
                breadthfirst: "In Ampiezza",
                concentric: "Concentrico",
                random: "Casuale",
                cola: "Cola",
                dagre: "Dagre",
                showhidegrabifydelete: "Azioni sugli Elementi del Grafo",
                showhide: "Mostra/Nascondi",
                hideselected: "Nascondi Selezionati",
                hidenonselected: "Nascondi Non Selezionati",
                unhideall: "Mostra Tutto",
                grabifyungrabify: "Afferra/Rilascia",
                ungrabifyselected: "Rilascia Selezionati",
                ungrabifynonselected: "Rilascia Non Selezionati",
                grabifyselected: "Afferra Selezionati",
                grabifynonselect: "Afferra Non Selezionati",
                lockunlock: "Blocca/Sblocca",
                lockselected: "Blocca Selezionati",
                locknonselected: "Blocca Non Selezionati",
                unlockselected: "Sblocca Selezionati",
                unlocknonselect: "Sblocca Non Selezionati",
                removerestore: "Rimuovi/Ripristina",
                removeselected: "Rimuovi Selezionati",
                removeunselected: "Rimuovi Non Selezionati",
                removeall: "Rimuovi Tutto",
                restore: "Ripristina",
                parameters: "Parametri",
                paletteTooltipsOn: "Tooltips Palette Attivati",
                visualElementsDisplayMode: "Modalità di Visualizzazione Elementi Visivi",
                visualElementsDisplayModeNode: "Nodi",
                visualElementsDisplayModeBox: "Box",
                visualRelationsDisplayMode: "Modalità di Visualizzazione Relazioni Visive",
                visualRelationsDisplayModeEdges: "Archi",
                visualRelationsDisplayModeBoxes: "Box",
                undoRedo: "Annulla/Ripristina",
                undoRedoOn: "Attivato",
                undoRedoOff: "Disattivato",
                undoRedoClear: "Cancella",
                archimateRelationshipsRules: "Regole Relazioni ArchiMate",
                rulesEnforce: "Applica",
                rulesRelax: "Rilassa",
                paletteTooltipsOff: "Tooltips Palette Disattivati",
                tooltips: "Tooltips",
                tools: "Strumenti",
                checker: "Verificatore",
                archimateAllowedRelationships: "Relazioni ArchiMate Consentite",
                palettes: "Palette",
                archicg: "ArchiCG",
                aboutArchiCG: "Informazioni su ArchiCG"
            },
            confirm: {
                replacegraph: "Vuoi sostituire il grafo corrente? Se sì, il grafo corrente verrà rimosso, altrimenti verrà fuso con l'importazione.",
                rdfinplaceofowl: "Vuoi mostrare le triple RDF al posto di OWL?"
            },
            alert: {
                selectowlinferred: "Si prega di selezionare il file OWL inferito",
                selectowl: "Si prega di selezionare il tuo file OWL"
            }
        }
    }
};
// ============================================================

i18next.init({
    lng: "fr", 
    fallbackLng: "en", 
    resources: resources
});

function updateToolbarTranslations() {
    if (typeof w2ui.mainMenu !== 'undefined') {
        const menu = w2ui.mainMenu;

        // Fonction récursive pour traduire les éléments de menu.
        // Elle doit parcourir tous les items dans 'menu.items'
        const translateItems = (items) => {
            if (!items) return;
            items.forEach(item => {
                // IMPORTANT: Utiliser item.textKey s'il existe
                if (item.textKey) {
                    // Traduit le texte et le met dans la propriété 'text'
                    item.text = i18next.t(item.textKey); 
                }
                
                // Récurrence pour les sous-menus
                if (item.items) {translateItems(item.items);
                }
            });
        };

        // 1. Traduire tous les éléments du menu principal
        translateItems(menu.items);
        
        // 2. Tenter de rafraîchir le menu pour appliquer les changements
        menu.refresh(); 
        
        console.log('[i18n] Toolbar translations applied for language: ' + i18next.language);
    }
}

function changeLanguage(lang) {
    i18next.changeLanguage(lang, () => {
        updateToolbarTranslations();
    });
}

// --- NOUVEAU: Helper et Enregistrement des Handlers de Langue (CORRECTION de l'erreur) ---
const langCodes = ['fr', 'en', 'de', 'ar', 'zh', 'es', 'it'];

function createLanguageChangeHandler(langCode) {
    return function(event) {
        changeLanguage(langCode);
        // Met à jour l'état visuel du menu radio
        if (w2ui.mainMenu) {
            w2ui.mainMenu.check(langCode);
        }
    }
}

/**
 * Enregistre les handlers de changement de langue dans le registre functionMetaRegistry.
 */
function registerSystemLanguageHandlers() {
    langCodes.forEach(code => {
        const functionName = `ChangeLanguage${code.toUpperCase()}`;
        // Enregistre la fonction de gestion pour ChangeLanguageEN, ChangeLanguageFR, etc.
        registerFunctionMetadata(functionName, {
            module: 'Control_System_i18n',
            description: `Change the application language to ${code.toUpperCase()}.`,
            archimateElement: 'Application Function',
            handler: createLanguageChangeHandler(code) // Associe la vraie fonction
        });
    });
}

/**
 * Charge les éléments de menu principaux.
 * Fusionne les menus statiques du système + les menus dynamiques enregistrés.
 */
function getMenuItems() {
    // 1. Récupérer les menus enregistrés dynamiquement (ex: le menu 'files')
    let dynamicMenuItems = [...moduleMenuRegistry];

    // 2. Définir les autres menus statiques/système (le menu 'files' est volontairement omis ici)
    const staticMenuItems = [
        
        {
            type: "menu", id: "compoundGraph", textKey:"menu.compoundGraph",text: i18next.t("menu.compoundGraph"), hidden: false, icon: "fa fa-object-group",
            items: [
                { id: "nodes", textKey:"menu.nodes",text: i18next.t("menu.nodes"), items: [
                    { id: "collapseAllNodes", textKey:"menu.collapseAllNodes",text: i18next.t("menu.collapseAllNodes")},
                    { id: "collapseSelectedNodesRecursively",textKey:"menu.collapseSelectedNodesRecursively", text: i18next.t("menu.collapseSelectedNodesRecursively") },
                    { id: "expandAllNodes",textKey:"menu.expandAllNodes", text: i18next.t("menu.expandAllNodes") },
                    { id: "expandSelectedNodesRecursively",textKey:"menu.expandSelectedNodesRecursively", text: i18next.t("menu.expandSelectedNodesRecursively") },
                    { id: "addCompoundForSelected",textKey:"menu.addCompoundForSelected", text: i18next.t("menu.addCompoundForSelected") },
                    { id: "removeSelectedCompound",textKey:"menu.removeSelectedCompound", text: i18next.t("menu.removeSelectedCompound") },
                    { id: "addNestedForSelected",textKey:"menu.addNestedForSelected", text: i18next.t("menu.addNestedForSelected") },
                    { id: "createNodes",textKey:"menu.createNodes", text: i18next.t("menu.createNodes") }
                ]},
                { id: "edges",textKey:"menu.edges", text: i18next.t("menu.edges"), items: [
                    { id: "collapseAllEdges",textKey:"menu.collapseAllEdges", text: i18next.t("menu.collapseAllEdges") },
                    { id: "expandAllEdges",textKey:"menu.expandAllEdges", text: i18next.t("menu.expandAllEdges") },
                    { id: "collapseSelectedEdges",textKey:"menu.collapseSelectedEdges", text: i18next.t("menu.collapseSelectedEdges") },
                    { id: "expandSelectedEdges",textKey:"menu.expandSelectedEdges", text: i18next.t("menu.expandSelectedEdges") },
                    { id: "collapseEdgesBetweenSelected",textKey:"enu.collapseEdgesBetweenSelected", text: i18next.t("menu.collapseEdgesBetweenSelected") },
                    { id: "expandEdgesBetweenSelected",textKey:"menu.expandEdgesBetweenSelected", text: i18next.t("menu.expandEdgesBetweenSelected") },
                ]}
            ]
        },
        {
            type: "menu", id: "compositeGraph",textKey:"menu.compositeGraph", text: i18next.t("menu.compositeGraph"), hidden: false, icon: "fa fa-object-group",
            items: [
                { id: "selectedCompoundToGraph",textKey:"menu.selectedCompoundToGraph", text: i18next.t("menu.selectedCompoundToGraph") },
                { id: "selectedGraphToCompound",textKey:"menu.selectedGraphToCompound", text: i18next.t("menu.selectedGraphToCompound") },
                { id: "createComponent",textKey:"menu.createComponent", text: i18next.t("menu.createComponent") },
                { id: "showEdges",textKey:"menu.showEdges", text: i18next.t("menu.showEdges") },
                { id: "hideEdges",textKey:"menu.hideEdges", text: i18next.t("menu.hideEdges") },
            ]
        },
        {
            type: 'menu-check', id: 'rendering',textKey:"menu.rendering", text: i18next.t("menu.rendering"), hidden: true, icon: 'fa fa-eye', disabled: false,
            items: [
                { text: '-- Node' },
                { id: 'renderingnodeirishortname',textKey:"menu.renderingnodeirishortname", text: i18next.t("menu.renderingnodeirishortname"), disabled: true },
                { id: 'noderenderinglabel',textKey:"menu.noderenderinglabel", text: i18next.t("menu.noderenderinglabel"), disabled: true },
                { id: 'noderenderingprefix',textKey:"menu.noderenderingprefix", text: i18next.t("menu.noderenderingprefix"), disabled: true },
                { id: 'noderenderingannotation',textKey:"menu.noderenderingannotation", text: i18next.t("menu.noderenderingannotation"), disabled: true },
                { id: 'noderenderingcustom',textKey:"menu.noderenderingcustom", text: i18next.t("menu.noderenderingcustom"), disabled: true },
                { text: '-- Edge' },
                { id: 'edgeirishortName',textKey:"menu.edgeirishortName", text: i18next.t("menu.edgeirishortName"), disabled: true },
                { id: 'edgerenderingprefixName',textKey:"menu.edgerenderingprefixName", text: i18next.t("menu.edgerenderingprefixName"), disabled: true },
                { id: 'edgerenderinglabel',textKey:"menu.edgerenderinglabel", text: i18next.t("menu.edgerenderinglabel"), disabled: true },
                { id: 'edgerenderingannotationProperty',textKey:"menu.edgerenderingannotationProperty", text: i18next.t("menu.edgerenderingannotationProperty"), disabled: true },
                { id: 'edgerenderingcustom',textKey:"menu.edgerenderingcustom", text: i18next.t("menu.edgerenderingcustom"), disabled: true }
            ]
        },
        {
            type: 'menu', id: 'showhidegrabifydelete', text: i18next.t("menu.showhidegrabifydelete"), textKey:"menu.showhidegrabifydelete",icon: 'fa fa-eye',
            items: [
                { id: 'showhide', text: i18next.t("menu.showhide"), textKey:"menu.showhide",items: [
                    { id: 'hideselected',textKey:"menu.hideselected", text: i18next.t("menu.hideselected") },
                    { id: 'hidenonselected',textKey:"menu.hidenonselected", text: i18next.t("menu.hidenonselected") },
                    { id: 'unhideall',textKey:"menu.unhideall", text: i18next.t("menu.unhideall") },
                ]},
                { id: 'grabifyungrabify',textKey:"menu.ungrabifyselected", text: i18next.t("menu.ungrabifyselected"), items: [
                    { id: 'ungrabifyselected',textKey:"menu.ungrabifyselected", text: i18next.t("menu.ungrabifyselected") },
                    { id: 'ungrabifynonselected',textKey:"menu.ungrabifynonselected", text: i18next.t("menu.ungrabifynonselected") },
                    { id: 'grabifyselected',textKey:"menu.grabifyselected", text: i18next.t("menu.grabifyselected") },
                    { id: "grabifynonselect",textKey:"menu.grabifynonselect", text: i18next.t("menu.grabifynonselect") }
                ]},
                { id: 'lockunlock',textKey:"menu.lockunlock", text: i18next.t("menu.lockunlock"), items: [
                    { id: 'lockselected',textKey:"menu.lockselected", text: i18next.t("menu.lockselected") },
                    { id: 'locknonselected',textKey:"menu.locknonselected", text: i18next.t("menu.locknonselected") },
                    { id: 'unlockselected',textKey:"menu.unlockselected", text: i18next.t("menu.unlockselected") },
                    { id: 'unlocknonselect',textKey:"menu.unlocknonselect", text: i18next.t("menu.unlocknonselect") }
                ]},
                { id: 'removerestore',textKey:"menu.removerestore", text: i18next.t("menu.removerestore"), items: [
                    { id: 'removeselected',textKey:"menu.removeselected", text: i18next.t("menu.removeselected") },
                    { id: 'removeunselected',textKey:"menu.removeunselected", text: i18next.t("menu.removeunselected") },
                    { id: 'removeall',textKey:"menu.removeall", text: i18next.t("menu.removeall") },
                    { id: 'restore',textKey:"menu.restore", text: i18next.t("menu.restore") },
                ]}
            ]
        },
        {
            type: 'menu-check', id: 'display',textKey:"menu.display", text: i18next.t('menu.display'), hidden: true, icon: 'fa fa-eye', disabled: false,
            items: [
                { id: 'showowlconstructs',textKey:"menu.showowlconstructs", text: i18next.t('menu.showowlconstructs'), disabled: true },
                { id: 'showisa',textKey:"menu.showisa", text: i18next.t('menu.showisa'), disabled: true },
                { id: 'showdomainrange',textKey:"menu.showdomainrange", text: i18next.t('menu.showdomainrange'), disabled: true },
                { id: 'showlabelasnode',textKey:"menu.showlabelasnode", text: i18next.t('menu.showlabelasnode'), disabled: true },
                { id: 'showlabelasedge',textKey:"menu.showlabelasedge", text: i18next.t('menu.showlabelasedge'), disabled: true },
                { id: 'showannotationasnode',textKey:"menu.showannotationasnode", text: i18next.t('menu.showannotationasnode'), disabled: true },
                { id: 'showannotationasedge',textKey:"menu.showannotationasedge", text: i18next.t('menu.showannotationasedge'), disabled: true }
            ],
        },
        {
            type: 'menu-check', id: 'viewpoint',textKey:"menu.viewpoint", text: i18next.t('menu.viewpoint'), hidden: true, icon: 'fa fa-eye', disabled: false,
            items: [
                { id: 'individual',textKey:"menu.individual", text: i18next.t('menu.individual'), disabled: true },
                { id: 'ontology',textKey:"menu.ontology", text: i18next.t('menu.ontology'), disabled: true },
                { id: 'sop',textKey:"menu.sop", text: i18next.t('menu.sop'), disabled: true },
                { id: 'data',textKey:"menu.data", text: i18next.t('menu.data'), disabled: true },
            ]
        },
        {
            type: "menu-radio", id: "layout",textKey:"menu.layout", text: i18next.t("menu.layout"), hidden: true, icon: "fa fa-eye",
            selected: "fcose",
            items: [
                { id: "fcose", textKey:"menu.fcose",text: i18next.t("menu.fcose") },
                { id: "grid",textKey:"menu.grid", text: i18next.t("menu.grid") },
                { id: "circle",textKey:"menu.circle", text: i18next.t("menu.circle") },
                { id: "cose",textKey:"menu.cose", text: i18next.t("menu.cose") },
                { id: "breadthfirst",textKey:"menu.breadthfirst", text: i18next.t("menu.breadthfirst") },
                { id: "concentric",textKey:"menu.concentric", text: i18next.t("menu.concentric") },
                { id: "random",textKey:"menu.random", text: i18next.t("menu.random") },
                { id: "cola",textKey:"menu.cola", text: i18next.t("menu.cola") },
                { id: "dagre",textKey:"menu.dagre", text: i18next.t("menu.dagre") }
            ]
        },
        {
            type: "menu-radio", id: "language",textKey:"menu.language", text: i18next.t("menu.language"), icon: "fa fa-eye",
            selected: "fr",
            items: [
                { id: "fr",textKey:"menu.fr", text: i18next.t("menu.fr") },
                { id: "en",textKey:"menu.en", text: i18next.t("menu.en") },
                { id: "de",textKey:"menu.de", text: i18next.t("menu.de") },
                { id: "ar",textKey:"menu.ar", text: i18next.t("menu.ar") },
                { id: "zh",textKey:"menu.zh", text: i18next.t("menu.zh") },
                { id: "es",textKey:"menu.es", text: i18next.t("menu.es") },
                { id: "it",textKey:"menu.it", text: i18next.t("menu.it") },
            ]

        },
        { type: 'spacer' },
        {
            type: "menu", id: "parameters",textKey:"menu.parameters", text: i18next.t("menu.parameters"), icon: "fa fa-eye",
            items: [
                { id: "tooltips",textKey:"menu.tooltips", text: i18next.t("menu.tooltips"), expanded: true, items: [
                    { id: "paletteTooltipsOn",textKey:"menu.paletteTooltipsOn", text: i18next.t("menu.paletteTooltipsOn") },
                    { id: "paletteTooltipsOff",textKey:"menu.paletteTooltipsOff", text: i18next.t("menu.paletteTooltipsOff") },
                ]},
                { id: 'visualElementsDisplayMode',textKey:"menu.visualElementsDisplayMode", text: i18next.t("menu.visualElementsDisplayMode"), items: [
                    { id: "visualElementsDisplayModeNodes",textKey:"menu.visualElementsDisplayModeNode", text: i18next.t("menu.visualElementsDisplayModeNode") },
                    { id: "visualElementsDisplayModeBoxes",textKey:"menu.visualElementsDisplayModeBox", text: i18next.t("menu.visualElementsDisplayModeBox") },
                ]},
                { id: 'visualRelationsDisplayMode',textKey:"menu.visualRelationsDisplayMode", text: i18next.t("menu.visualRelationsDisplayMode"), items: [
                    { id: "visualRelationsDisplayModeEdges",textKey:"menu.visualRelationsDisplayModeEdges", text: i18next.t("menu.visualRelationsDisplayModeEdges") },
                    { id: "visualRelationsDisplayModeBoxes",textKey:"menu.visualRelationsDisplayModeBoxe", text: i18next.t("menu.visualRelationsDisplayModeBoxes") },
                ]},
                { id: 'undoRedo',textKey:"menu.undoRedo", text: i18next.t("menu.undoRedo"), items: [
                    { id: "undoRedoOn",textKey:"menu.undoRedoOn", text: i18next.t("menu.undoRedoOn") },
                    { id: "undoRedoOff",textKey:"menu.undoRedoOff", text: i18next.t("menu.undoRedoOff") },
                    { id: "undoRedoClear",textKey:"menu.undoRedoClear", text: i18next.t("menu.undoRedoClear") },
                ]},
                { id: 'archimateRelationshipsRules',textKey:"menu.archimateRelationshipsRules", text: i18next.t("menu.archimateRelationshipsRules"), items: [
                    { id: "rulesEnforce",textKey:"", text: i18next.t("menu.rulesEnforce") },
                    { id: "rulesRelax",textKey:"", text: i18next.t("menu.rulesRelax") }
                ]},
                { id: 'URLNavigation',textKey:"menu.URLNavigation", text: i18next.t("menu.URLNavigation"), items: [
                    { id: "URLNavigationChangeMode",textKey:"menu.URLNavigationChangeMode", text: i18next.t("menu.URLNavigationChangeMode") }
                ]}
            ]
        },
        { type: "menu", id: "tools",textKey:"menu.tools", text: i18next.t("menu.tools"), icon: "fa fa-eye", items: [ /* ... */ ] },
        { type: "menu", id: "checker",textKey:"menu.checker", text: i18next.t("menu.checker"), icon: "fa fa-eye", items: [
            { id: "archimateAllowedRelationships",textKey:"menu.archimateAllowedRelationships", text: i18next.t("menu.archimateAllowedRelationships") }
        ]},
        { type: "menu", id: "palettes",textKey:"menu.palettes", text: i18next.t("menu.palettes"), icon: "fa fa-eye", items: [ /* ... */ ] },
        { type: "menu", id: "archicg",textKey:"menu.archicg", text: i18next.t("menu.archicg"), icon: "fa fa-eye", items: [
            { id: "aboutArchiCG",textKey:"menu.aboutArchiCG", text: i18next.t("menu.aboutArchiCG") }
        ]},
    ];

    // Fusionner les menus dynamiques (en premier) et les menus statiques
    return dynamicMenuItems.concat(staticMenuItems);
}


/**
 * Fonction récursive pour extraire les ID de fonction des structures de menu.
 * @param {Array} items - La liste des items de menu.
 */
function extractAndRegisterActions(items) {
    if (!items) return;
    items.forEach(item => {
        // Enregistre l'action si functionId est défini
        if (item.functionId) {
            registerMenuAction(item.id, item.functionId);
        }
        // Pour les menus parents sans functionId, lie à 'NoOp'
        if ((item.type === "menu" || item.items) && !item.functionId) {
             registerMenuAction(item.id, 'NoOp');
        }
        // Appel récursif pour les sous-menus
        if (item.items) {
            extractAndRegisterActions(item.items);
        }
    });
}

/**
 * Initialiser tous les handlers de menu (appelé au moment de la construction du menu).
 */
function initializeMenuHandlers() {
    console.log('Initializing menu handlers: Linking Menu IDs to Function Names (Simplified & Dynamic)...');

    // 1. Définir le handler NoOp
    registerFunctionMetadata('NoOp', {
        module: 'Control_System',
        description: 'Action de navigation sans logique métier associée.',
        archimateElement: 'Application Interaction',
        handler: function(event) { 
            console.log(`No-op action pour l'élément parent: ${event.target}`); 
        }
    });
    
    // 2. ENREGISTREMENT DES HANDLERS DE LANGUE (C'EST LA CORRECTION)
    registerSystemLanguageHandlers(); 

    // 3. ENREGISTREMENT DYNAMIQUE ET STATIQUE
    const allItems = getMenuItems(); 
    allItems.forEach(rootItem => {
        // A. Extraction automatique des actions si functionId est présent ou lien NoOp pour les parents
        extractAndRegisterActions([rootItem]); 
        
        // B. Gestion spéciale pour le menu 'language' (lie les actions des sous-menus aux handlers)
        if (rootItem.id === 'language' && rootItem.items) {
            rootItem.items.forEach(langItem => {
                if (langItem.id) {
                    // On s'assure que l'ID du menu (ex: 'en') appelle la fonction enregistrée (ex: 'ChangeLanguageEN')
                    registerMenuAction(langItem.id, `ChangeLanguage${langItem.id.toUpperCase()}`);
                }
            });
        }
        
        // ... (le reste de votre logique d'enregistrement des autres actions)
    });

    console.log(`Menu handlers initialized: ${Object.keys(menuActionRegistry).length} actions`);
}
function initializeMainMenu() {
    // Vérifier si w2ui est défini
    if (typeof w2ui === 'undefined' || w2ui.mainMenu) return;

    // Étape cruciale : lier les IDs d'action aux fonctions AVANT de construire l'UI
    initializeMenuHandlers(); 
    
    mainMenu = new w2toolbar({
        name: "mainMenu",
        items: getMenuItems(), // Récupère la liste fusionnée (y compris le menu 'files')
        onClick: function (event) {
            handleMenuAction(event);
        }
    });
    // On suppose que updateToolbarTranslations est définie et fonctionne
    updateToolbarTranslations(); 

    // Afficher la barre de menu
    if (typeof w2ui.mainLayout !== 'undefined') {
        w2ui.mainLayout.html('top', mainMenu);
    }

    return mainMenu;
}

// Lancement de l'initialisation de l'interface utilisateur
if (typeof w2ui !== 'undefined' && typeof w2ui.mainLayout !== 'undefined') {
    initializeMainMenu();
}