// ==============================================================
// FICHIER : compoundgraph-module.js
// ==============================================================

// --- 1. Les Fonctions (Logique Pure) ---

// === NODES ===
function collapseAllNodes() { 
    console.log("[CompoundGraph] Exécution: Collapse All Nodes"); 
}

function collapseSelectedNodesRecursively() { 
    console.log("[CompoundGraph] Exécution: Collapse Selected Nodes Recursively"); 
}

function expandAllNodes() { 
    console.log("[CompoundGraph] Exécution: Expand All Nodes"); 
}

function expandSelectedNodesRecursively() { 
    console.log("[CompoundGraph] Exécution: Expand Selected Nodes Recursively"); 
}

function addCompoundForSelected() { 
    console.log("[CompoundGraph] Exécution: Add Compound for Selected"); 
}

function removeSelectedCompound() { 
    console.log("[CompoundGraph] Exécution: Remove Selected Compound"); 
}

function addNestedForSelected() { 
    console.log("[CompoundGraph] Exécution: Add Nested for Selected"); 
}

function createNodes() { 
    console.log("[CompoundGraph] Exécution: Create Nodes"); 
}

// === EDGES ===
function collapseAllEdges() { 
    console.log("[CompoundGraph] Exécution: Collapse All Edges"); 
}

function expandAllEdges() { 
    console.log("[CompoundGraph] Exécution: Expand All Edges"); 
}

function collapseSelectedEdges() { 
    console.log("[CompoundGraph] Exécution: Collapse Selected Edges"); 
}

function expandSelectedEdges() { 
    console.log("[CompoundGraph] Exécution: Expand Selected Edges"); 
}

function collapseEdgesBetweenSelected() { 
    console.log("[CompoundGraph] Exécution: Collapse Edges Between Selected"); 
}

function expandEdgesBetweenSelected() { 
    console.log("[CompoundGraph] Exécution: Expand Edges Between Selected"); 
}

// --- 2. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'CompoundGraph';

var CompoundGraphMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        description: 'Module de gestion des graphes composés (nodes et edges)'
    },
    
    // Registre des Fonctions
    functions: [
        // === NODES ===
        { 
            id: 'CollapseAllNodes', 
            handler: collapseAllNodes, 
            description: 'Réduire tous les nœuds du graphe.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'CollapseSelectedNodesRecursively', 
            handler: collapseSelectedNodesRecursively, 
            description: 'Réduire récursivement les nœuds sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ExpandAllNodes', 
            handler: expandAllNodes, 
            description: 'Développer tous les nœuds du graphe.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ExpandSelectedNodesRecursively', 
            handler: expandSelectedNodesRecursively, 
            description: 'Développer récursivement les nœuds sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'AddCompoundForSelected', 
            handler: addCompoundForSelected, 
            description: 'Ajouter un composé pour les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'RemoveSelectedCompound', 
            handler: removeSelectedCompound, 
            description: 'Supprimer le composé sélectionné.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'AddNestedForSelected', 
            handler: addNestedForSelected, 
            description: 'Ajouter un élément imbriqué pour la sélection.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'CreateNodes', 
            handler: createNodes, 
            description: 'Créer de nouveaux nœuds.',
            archimateElement: 'Application Function'
        },
        
        // === EDGES ===
        { 
            id: 'CollapseAllEdges', 
            handler: collapseAllEdges, 
            description: 'Réduire toutes les relations du graphe.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ExpandAllEdges', 
            handler: expandAllEdges, 
            description: 'Développer toutes les relations du graphe.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'CollapseSelectedEdges', 
            handler: collapseSelectedEdges, 
            description: 'Réduire les relations sélectionnées.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ExpandSelectedEdges', 
            handler: expandSelectedEdges, 
            description: 'Développer les relations sélectionnées.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'CollapseEdgesBetweenSelected', 
            handler: collapseEdgesBetweenSelected, 
            description: 'Réduire les relations entre les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ExpandEdgesBetweenSelected', 
            handler: expandEdgesBetweenSelected, 
            description: 'Développer les relations entre les éléments sélectionnés.',
            archimateElement: 'Application Function'
        }
    ],

    // Déclaration du Menu
    menuItems: [
        {
            type: "menu", 
            id: "compoundGraph", 
            textKey: "menu.compoundGraph", 
            icon: "fa fa-object-group",
            items: [
                {
                    id: "nodes", 
                    textKey: "menu.nodes", 
                    items: [
                        { id: "collapseAllNodes", textKey: "menu.collapseAllNodes", functionId: 'CollapseAllNodes' },
                        { id: "collapseSelectedNodesRecursively", textKey: "menu.collapseSelectedNodesRecursively", functionId: 'CollapseSelectedNodesRecursively' },
                        { id: "expandAllNodes", textKey: "menu.expandAllNodes", functionId: 'ExpandAllNodes' },
                        { id: "expandSelectedNodesRecursively", textKey: "menu.expandSelectedNodesRecursively", functionId: 'ExpandSelectedNodesRecursively' },
                        { id: "addCompoundForSelected", textKey: "menu.addCompoundForSelected", functionId: 'AddCompoundForSelected' },
                        { id: "removeSelectedCompound", textKey: "menu.removeSelectedCompound", functionId: 'RemoveSelectedCompound' },
                        { id: "addNestedForSelected", textKey: "menu.addNestedForSelected", functionId: 'AddNestedForSelected' },
                        { id: "createNodes", textKey: "menu.createNodes", functionId: 'CreateNodes' }
                    ]
                },
                {
                    id: "edges", 
                    textKey: "menu.edges", 
                    items: [
                        { id: "collapseAllEdges", textKey: "menu.collapseAllEdges", functionId: 'CollapseAllEdges' },
                        { id: "expandAllEdges", textKey: "menu.expandAllEdges", functionId: 'ExpandAllEdges' },
                        { id: "collapseSelectedEdges", textKey: "menu.collapseSelectedEdges", functionId: 'CollapseSelectedEdges' },
                        { id: "expandSelectedEdges", textKey: "menu.expandSelectedEdges", functionId: 'ExpandSelectedEdges' },
                        { id: "collapseEdgesBetweenSelected", textKey: "menu.collapseEdgesBetweenSelected", functionId: 'CollapseEdgesBetweenSelected' },
                        { id: "expandEdgesBetweenSelected", textKey: "menu.expandEdgesBetweenSelected", functionId: 'ExpandEdgesBetweenSelected' }
                    ]
                }
            ]
        }
    ],
    
    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            menu: { 
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
                expandEdgesBetweenSelected: "Expand Edges Between Selected"
            } 
        },
        fr: { 
            menu: { 
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
                collapseSelectedEdges: "Réduire relations sélectionnées",
                expandAllEdges: "Développer toutes les relations",
                expandSelectedEdges: "Développer relations sélectionnées",
                collapseEdgesBetweenSelected: "Réduire relations entre sélectionnés",
                expandEdgesBetweenSelected: "Développer relations entre sélectionnés"
            } 
        },
        de: {
            menu: {
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
                collapseSelectedEdges: "Ausgewählte Kanten zuklappen",
                expandAllEdges: "Alle Kanten aufklappen",
                expandSelectedEdges: "Ausgewählte Kanten aufklappen",
                collapseEdgesBetweenSelected: "Kanten zwischen Auswahl zuklappen",
                expandEdgesBetweenSelected: "Kanten zwischen Auswahl aufklappen"
            }
        },
        ar: {
            menu: {
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
                collapseSelectedEdges: "طي الحواف المحددة",
                expandAllEdges: "توسيع جميع الحواف",
                expandSelectedEdges: "توسيع الحواف المحددة",
                collapseEdgesBetweenSelected: "طي الحواف بين المحددات",
                expandEdgesBetweenSelected: "توسيع الحواف بين المحددات"
            }
        },
        zh: {
            menu: {
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
                collapseSelectedEdges: "折叠选定边",
                expandAllEdges: "展开所有边",
                expandSelectedEdges: "展开选定边",
                collapseEdgesBetweenSelected: "折叠选定项之间的边",
                expandEdgesBetweenSelected: "展开选定项之间的边"
            }
        },
        es: {
            menu: {
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
                collapseSelectedEdges: "Colapsar aristas seleccionadas",
                expandAllEdges: "Expandir todas las aristas",
                expandSelectedEdges: "Expandir aristas seleccionadas",
                collapseEdgesBetweenSelected: "Colapsar aristas entre seleccionados",
                expandEdgesBetweenSelected: "Expandir aristas entre seleccionados"
            }
        },
        it: {
            menu: {
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
                collapseSelectedEdges: "Comprimi relazioni selezionate",
                expandAllEdges: "Espandi tutte le relazioni",
                expandSelectedEdges: "Espandi relazioni selezionate",
                collapseEdgesBetweenSelected: "Comprimi relazioni tra selezionati",
                expandEdgesBetweenSelected: "Espandi relazioni tra selezionati"
            }
        }
    }
};

console.log("[CompoundGraph Module] Registering module...");
registerModule(CompoundGraphMetadata);