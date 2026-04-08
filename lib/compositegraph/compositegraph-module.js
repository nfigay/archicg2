// ==============================================================
// FICHIER : compositegraph-module.js
// ==============================================================

// --- 1. Les Fonctions (Logique Pure) ---

function selectedCompoundToGraph() { 
    console.log("[CompositeGraph] Exécution: Selected Compound to Graph"); 
}

function selectedGraphToCompound() { 
    console.log("[CompositeGraph] Exécution: Selected Graph to Compound"); 
}

function createComponent() { 
    console.log("[CompositeGraph] Exécution: Create Component"); 
}

function showEdges() { 
    console.log("[CompositeGraph] Exécution: Show Edges"); 
}

function hideEdges() { 
    console.log("[CompositeGraph] Exécution: Hide Edges"); 
}

// --- 2. Le Manifeste Holon ---

var MODULE_ID = 'CompositeGraph';

var CompositeGraphMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        descriptionKey: 'module.description'
    },
    
    // Registre des Fonctions
    functions: [
        { 
            id: 'SelectedCompoundToGraph', 
            handler: selectedCompoundToGraph, 
            descriptionKey: 'function.selectedCompoundToGraph',
            archimateElement: 'Application Function'
        },
        { 
            id: 'SelectedGraphToCompound', 
            handler: selectedGraphToCompound, 
            descriptionKey: 'function.selectedGraphToCompound',
            archimateElement: 'Application Function'
        },
        { 
            id: 'CreateComponent', 
            handler: createComponent, 
            descriptionKey: 'function.createComponent',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ShowEdges', 
            handler: showEdges, 
            descriptionKey: 'function.showEdges',
            archimateElement: 'Application Function'
        },
        { 
            id: 'HideEdges', 
            handler: hideEdges, 
            descriptionKey: 'function.hideEdges',
            archimateElement: 'Application Function'
        }
    ],

    // Menu
    menuItems: [
        {
            type: "menu", 
            id: "compositeGraph", 
            textKey: "menu.compositeGraph", 
            icon: "fa fa-object-group",
            items: [
                { id: "selectedCompoundToGraph", textKey: "menu.selectedCompoundToGraph", functionId: 'SelectedCompoundToGraph' },
                { id: "selectedGraphToCompound", textKey: "menu.selectedGraphToCompound", functionId: 'SelectedGraphToCompound' },
                { id: "createComponent", textKey: "menu.createComponent", functionId: 'CreateComponent' },
                { id: "showEdges", textKey: "menu.showEdges", functionId: 'ShowEdges' },
                { id: "hideEdges", textKey: "menu.hideEdges", functionId: 'HideEdges' }
            ]
        }
    ],
    
    // --- I18N COMPLET ---
    i18n: {
        en: { 
            module: {
                description: "Composite graph and component management module"
            },
            menu: {
                compositeGraph: "Composite Graph",
                selectedCompoundToGraph: "Selected Compound to Graph",
                selectedGraphToCompound: "Selected Graph to Compound",
                createComponent: "Create Component",
                showEdges: "Show Edges",
                hideEdges: "Hide Edges"
            },
            function: {
                selectedCompoundToGraph: "Convert the selected compound into a graph.",
                selectedGraphToCompound: "Convert the selected graph into a compound.",
                createComponent: "Create a new component.",
                showEdges: "Display graph relationships.",
                hideEdges: "Hide graph relationships."
            }
        },
        fr: { 
            module: {
                description: "Module de gestion des graphes composites et des composants"
            },
            menu: {
                compositeGraph: "Graphe Composite",
                selectedCompoundToGraph: "Composé sélectionné vers graphe",
                selectedGraphToCompound: "Graphe sélectionné vers composé",
                createComponent: "Créer composant",
                showEdges: "Afficher relations",
                hideEdges: "Masquer relations"
            },
            function: {
                selectedCompoundToGraph: "Convertir le composé sélectionné en graphe.",
                selectedGraphToCompound: "Convertir le graphe sélectionné en composé.",
                createComponent: "Créer un nouveau composant.",
                showEdges: "Afficher les relations du graphe.",
                hideEdges: "Masquer les relations du graphe."
            }
        },
        de: {
            module: {
                description: "Modul zur Verwaltung zusammengesetzter Graphen und Komponenten"
            },
            menu: {
                compositeGraph: "Zusammengesetzter Graph",
                selectedCompoundToGraph: "Ausgewählten Verbund zu Graph",
                selectedGraphToCompound: "Ausgewählten Graph zu Verbund",
                createComponent: "Komponente erstellen",
                showEdges: "Kanten anzeigen",
                hideEdges: "Kanten ausblenden"
            },
            function: {
                selectedCompoundToGraph: "Den ausgewählten Verbund in einen Graphen umwandeln.",
                selectedGraphToCompound: "Den ausgewählten Graphen in einen Verbund umwandeln.",
                createComponent: "Eine neue Komponente erstellen.",
                showEdges: "Graphbeziehungen anzeigen.",
                hideEdges: "Graphbeziehungen ausblenden."
            }
        },
        ar: {
            module: {
                description: "وحدة إدارة الرسوم البيانية المركبة والمكونات"
            },
            menu: {
                compositeGraph: "الرسم البياني المركب",
                selectedCompoundToGraph: "تحويل المركب المحدد إلى رسم بياني",
                selectedGraphToCompound: "تحويل الرسم البياني المحدد إلى مركب",
                createComponent: "إنشاء مكون",
                showEdges: "إظهار الحواف",
                hideEdges: "إخفاء الحواف"
            },
            function: {
                selectedCompoundToGraph: "تحويل المركب المحدد إلى رسم بياني.",
                selectedGraphToCompound: "تحويل الرسم البياني المحدد إلى مركب.",
                createComponent: "إنشاء مكون جديد.",
                showEdges: "إظهار علاقات الرسم البياني.",
                hideEdges: "إخفاء علاقات الرسم البياني."
            }
        }
    }
};

console.log("[CompositeGraph Module] Registering module...");
registerModule(CompositeGraphMetadata);
