 // Define the layout first
 let layout = new w2layout({
    //box: '#layout',
    name: 'mainLayout',
    panels: [
        { type: 'top', size: 50, style: 'border-bottom: 1px solid #ccc;' },
        { type: 'left', size: 200, style: 'border-right: 1px solid #ccc;' },
        { type: 'main', style: 'background: #f8f9fa;', html: '<div id="cy"></div> ' },
        {
            type: 'right', size: 250, style: 'border-left: 1px solid #ccc;', html: ``
                    },
        {
            type: 'bottom', size: 50, style: 'border-top: 1px solid #ccc;', html: ``
        }
    ]
})
layout.render('#mainLayout'); // Render the layout in the container      
w2ui.mainLayout.html('top', initializeToolbar());


const resources = {
    en: {
        translation: {
            tooltips:{

            },

            tabs: {
                triplesTab: "Triples",
                classesTab: "Classes",
                classEquivalenceTab: "Equivalence Classes",
                objectPropertiesTab: "Obj. Properties",
                dataPropertiesTab: "Data Properties",
                namedIndividualsTab: "Individuals",
                isaRelationsTab: "Individual Typing",
                classSubsumptionTab: "Class Subsumption",
                propertySubsumptionTab: "Property Subsumption",
                propertyEquivalenceTab: "Property Equivalence",
                propertyInverseTab: "Inverse Properties",
                individualRelationsTab: "Individual Relations",
                domainsTab: "Domains",
                rangesTab: "Ranges",
                triplesLabel: "Triplets trouvés",
                classesLabel: "Found OWL Classes",
                classEquivalenceLabel: "Equivalence classes between properties",
                objectPropertiesLabel: "Found object properties",
                dataPropertiesLabel: "Found datatype properties",
                namedIndividualsLabel: "Found NamedIndividuals",
                isaRelationsLabel: "Individuals typring Relations",
                classSubsumptionLabel: "Classes subsumption relations",
                propertySubsumptionLabel: "Properties subsumption relations",
                propertyEquivalenceLabel: "Properties equivalence relations",
                propertyInverseLabel: "Properties inverse relations",
                individualRelationsLabel: "Relations between individuals",
                domainsLabel: "Domain declarations",
                rangesLabel: "Tange declarations",
            },
            menu: {
                language: "Language",
                fr: "🇫🇷 French",
                en: "🇬🇧 English",
                owl: "OWL File",
                open: "Open",
                importinferred: "Import inferred axioms as ontology",
                savegraph: "Save Graph",
                loadgraph: "Load Graph",
                exportjson: "Export Json",
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
                restore: "Restore"
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
            tooltips:{
                
            },
            tabs: {
                triplesTab: "Triplets",
                classesTab: "Classes",
                classEquivalenceTab: "Équivalence Classes",
                objectPropertiesTab: "Propriétés Obj.",
                dataPropertiesTab: "Propriétés Données",
                namedIndividualsTab: "Individus",
                isaRelationsTab: "Typage Individus",
                classSubsumptionTab: "Subsomption Classes",
                propertySubsumptionTab: "Subsomption Prop.",
                propertyEquivalenceTab: "Équivalence Prop.",
                propertyInverseTab: "Propriétés Inverses",
                individualRelationsTab: "Relations Individus",
                domainsTab: "Domaines",
                rangesTab: "Portées",
                triplesLabel: "Found triples",
                classesLabel: "Classes OWL trouvées",
                classEquivalenceLabel: "Classes d'équivalence entre propriétés",
                objectPropertiesLabel: "Propriétés de type objet trouvées",
                dataPropertiesLabel: "Propriétés de type données trouvées",
                namedIndividualsLabel: "Individus nommés OWL trouvés",
                isaRelationsLabel: "Relations de typage d'individus",
                classSubsumptionLabel: "Relations de subsomption entre classes",
                propertySubsumptionLabel: "Relations de subsomption entre propriétés",
                propertyEquivalenceLabel: "Relations d'équivalence entre propriétés",
                propertyInverseLabel: "Relations inverses entre propriétés",
                individualRelationsLabel: "Relations entre individus",
                domainsLabel: "Déclarations de domaines",
                rangesLabel: "Déclarations de portées",

            },
            menu: {
                language: "Langage",
                fr: "🇫🇷 Français",
                en: "🇬🇧 English",
                owl: "Fichier OWL",
                open: "Ouvrir",
                importinferred: "Import des axiomes inférré de l'ontologie",
                savegraph: "Sauve Graphe",
                loadgraph: "Charge Graphe",
                exportjson: "Exporte Json",
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
                renderingnodeirishortname: "Nom court IRI",
                label: "Étiquette",
                prefixName: "Nom du préfixe",
                annotationProperty: "Propriété d’annotation",
                customRendering: "Rendu personnalisé",
                display: "Affichage",
                showowlconstructs: "... des nœuds OWL",
                showisa: "... de 'isa' comme lien",
                showdomainrange: "... des domaines et portées comme nœuds",
                showlabelasnode: "... des labels comme noeuds",
                showlabelasedge: "... des labels comme liens",
                showannotationasnode: "... des annotations comme noeuds",
                showannotationasedge: "... des annotations comme liens",
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
            },
            confirm: {
                replacegraph: "Voulez vous remplacer le graphe courant? Sinon l'import sera fusionné avec le graphe courant.",
                rdfinplaceofowl: "Voulez vous visualizer le graphe RDF au lien de l'ontologie OWL?   "
            }
            ,
            alert: {
                selectowlinferred: "Veuillez sélectionner le fichier OWL inferred.",
                selectowl: "Veuillez sélectionner un fichier OWL."
            }
        }
    }
};

i18next.init({
    lng: "fr", // Default language
    fallbackLng: "en", // Fallback language
    resources: resources // Use in-memory translations
})
function changeLanguage(lang) {
    i18next.changeLanguage(lang, () => {
        updateToolbarTranslations();
        updateTabsTranslations();
    });
}

function updateTabsTranslations() {
   /*
    tripleTabs.tabs.forEach(tab => {
        var myLabel = tab.id + "Tab"
        if (myLabel in i18next.t("tabs", { returnObjects: true })) {
            tab.text = i18next.t(`tabs.${myLabel}`);
        }
        var myLabel = tab.id + "Label"
        const label = document.querySelector(`label[for="${tab.id}Select"]`);
        if (label) {

            if (myLabel in i18next.t("tabs", { returnObjects: true })) {
                label.textContent = i18next.t(`tabs.${myLabel}`) + " :";
            }
        }
    });
    tripleTabs.refresh(); // Apply the changes
    */
}

function updateToolbarTranslations() {
    mainMenu.items.forEach(item => {

        if (item.id in i18next.t("menu", { returnObjects: true })) {
            item.text = i18next.t(`menu.${item.id}`);
            //  console.log(item.id)
            // console.log(item.id + " -> " + item.text)
            if (item.items) {
                item.items.forEach(subItem => {
                    if (subItem.id in i18next.t("menu", { returnObjects: true })) {
                        subItem.text = i18next.t(`menu.${subItem.id}`);
                    }
                    // console.log(subItem.id + " -> " + subItem.text)
                    if (subItem.items) {
                        subItem.items.forEach(subSubItem => {
                            if (subSubItem.id in i18next.t("menu", { returnObjects: true })) {
                                subSubItem.text = i18next.t(`menu.${subSubItem.id}`);
                            }
                            //  console.log(subSubItem.id + " -> " + subSubItem.text)
                        });
                    }
                });
            }
        }

    });

    mainMenu.refresh(); // Apply the changes
}

function initializeToolbar() {
    if (w2ui.mainMenu) return; // Prevent multiple initializations
    mainMenu = new w2toolbar({
        name: "mainMenu",
        items: getMenuItems(),
        onClick: function (event) {
            handleMenuAction(event); // Handle menu actions
        }
    });
    updateToolbarTranslations()
    return mainMenu;
}

function getMenuItems() {
    return [
        {
            type: 'menu', id: 'file', text: i18next.t("menu.file"), icon: "fa fa-folder-open",
            items: [
                { id: 'fileload', text: i18next.t("menu.fileload"), tooltip: i18next.t("tooltip.fileload"), icon: "fa fa-folder-open" },//"Loading previously saved archicg graph." },//id1
                { id: 'filesave', text: i18next.t("menu.filesave"), tooltip: i18next.t("tooltip.fileload") },//"Loading previously saved archicg graph." },//id1

                //{ id: 'id2', text: 'Save' },
                { text: '--' },
                {
                    id: 'filesave', text: i18next.t("menu.filesave"), tooltip: i18next.t("tooltip.filesave"), icon: "fa fa-folder-open",//id: 'id3', text: 'Import',
                    items: [
                        { id: 'filesavejarchicg', text: i18next.t("menu.filesavejarchicg"), tooltip: i18next.t("tooltip.filesavejarchicg") },//{ id: 'id4', text: 'jArchiECG' },
                        { id: 'filesaveoef', text: i18next.t("menu.filesaveoef"), tooltip: i18next.t("tooltip.filesaveoef") },//{ id: 'oef', text: 'Open Format' },
                        { id: 'filesavejson', text: i18next.t("menu.filesavejson"), tooltip: i18next.t("tooltip.filesavejson") },//{ id: 'json', text: 'cytoscape Json' }
                    ]
                },
                { text: '--' },

                {
                    id: 'fileexport', text: i18next.t("menu.fileexport"), tooltip: i18next.t("tooltip.fileexport"), icon: "fa fa-folder-open",//id: 'id7', text: 'Export',
                    items: [
                        { id: 'fileexportcsv', text: i18next.t("menu.fileexportcsv"), tooltip: i18next.t("tooltip.fileexportcsv") },//{ id: 'id8', text: 'CSV' },
                        { id: 'fileexportowl', text: i18next.t("menu.fileexportowl"), tooltip: i18next.t("tooltip.fileexportowl") },//{ id: 'owlexport', text: 'OWL' },
                    ]
                },
                { text: '--' },
                {
                    id: 'filesaveasimage', text: i18next.t("menu.filesaveasimage"), tooltip: i18next.t("tooltip.filesaveasimage"), icon: "fa fa-folder-open",//id: 'id9', text: 'Save as image',
                    items: [
                        { id: 'filesaveasimageviewpng', text: i18next.t("menu.filesaveasimageviewpng"), tooltip: i18next.t("tooltip.filesaveasimageviewpng") },//{ id: 'id10', text: 'PNG View' },
                        { id: 'filesaveasimagefullpng', text: i18next.t("menu.filesaveasimagefullpng"), tooltip: i18next.t("tooltip.filesaveasimagefullpng") },//{ id: 'id11', text: 'PNG Full' },
                        { id: 'filesaveasimageviewjpg', text: i18next.t("menu.filesaveasimageviewjpg"), tooltip: i18next.t("tooltip.filesaveasimageviewjpg") },//{ id: 'id12', text: 'JPG View' },
                        { id: 'filesaveasimagefulljpg', text: i18next.t("menu.filesaveasimagefulljpg"), tooltip: i18next.t("tooltip.filesaveasimagefimmjpg") },//{ id: 'id13', text: 'JPG Full' },
                        { id: 'filesaveasimageviewsvg', text: i18next.t("menu.filesaveasimageviewsvg"), tooltip: i18next.t("tooltip.filesaveasimageviewsvg") },//{ id: 'id14', text: 'SVG View' },
                        { id: 'filesaveasimagefullsvg', text: i18next.t("menu.filesaveasimagefullsvg"), tooltip: i18next.t("tooltip.filesaveasimagefullsvg") },//{ id: 'id15', text: 'SVG Full' },
                    ]
                }

            ]
        },
        { type: 'break' },
        {
            type: 'menu', id: 'compoundgraph', text: i18next.t("menu.compoundgraph"), icon: "fa fa-folder-open",//type: 'menu', id: 'submenu3',text(item) { return "Compound Graph" },
            items: [
                {
                    id: 'compoundgraphnodes', text: i18next.t("menu.compoundgraphnodes"), tooltip: i18next.t("tooltip.compoundgraphnodes"),//id: 'id1', text: 'Nodes',
                    items: [
                        { id: 'compoundgraphcollapseallnodes', text: i18next.t("menu.compoundgraphcollapseallnodes"), tooltip: i18next.t("tooltip.filesaveacompoundgraphcollapseallnodessimagefullsvg") },//{ id: 'id2', text: 'Collapse all nodes' },
                        { id: 'compoundgraphcollapseselectedrecursively', text: i18next.t("menu.compoundgraphcollapseselectedrecursively"), tooltip: i18next.t("tooltip.compoundgraphcollapseselectedrecursively") },//{ id: 'id3', text: 'Collapse selected recursively' },
                        { id: 'compoundgraphcexpandallnodes', text: i18next.t("menu.compoundgraphcexpandallnodes"), tooltip: i18next.t("tooltip.compoundgraphcexpandallnodes") },//{ id: 'id4', text: 'Expand all nodes' },
                        { id: 'compoundgraphexpandselectedrecursively', text: i18next.t("menu.compoundgraphexpandselectedrecursively"), tooltip: i18next.t("tooltip.compoundgraphexpandselectedrecursively") },//{ id: 'id5', text: 'Expand selected recursively' },
                        { id: 'compoundgraphaddcompoundforselected', text: i18next.t("menu.compoundgraphaddcompoundforselected"), tooltip: i18next.t("tooltip.compoundgraphaddcompoundforselected") },//{ id: 'id6', text: 'Add Compound for selected' },
                        { id: 'compoundgraphremoveselectedcompound', text: i18next.t("menu.compoundgraphremoveselectedcompound"), tooltip: i18next.t("tooltip.compoundgraphremoveselectedcompound") },//{ id: 'id7', text: 'Remove selected compound' },
                        { id: 'compoundgraphaddnestedforselected', text: i18next.t("menu.compoundgraphaddnestedforselected"), tooltip: i18next.t("tooltip.compoundgraphaddnestedforselected") },//{ id: 'id8', text: 'Add Nested for selected' },
                        { id: 'compoundgraphcreatenodes', text: i18next.t("menu.compoundgraphcreatenodes"), tooltip: i18next.t("tooltip.compoundgraphcreatenodes") },//{ id: 'id16', text: 'Create Nodes' }
                    ]
                },
                {
                    id: 'compoundgraphedges', text: i18next.t("menu.compoundgraphedges"), tooltip: i18next.t("tooltip.compoundgraphedges"),//id: 'id9', text: 'Edges',
                    items: [
                        { id: 'compoundgraphedgescollapsealledges', text: i18next.t("menu.compoundgraphedgescollapsealledges"), tooltip: i18next.t("tooltip.compoundgraphedgescollapsealledges") },//{ id: 'id10', text: 'Collapse all edges' },
                        { id: 'compoundgraphedgesexpandalledges', text: i18next.t("menu.compoundgraphedgesexpandalledges"), tooltip: i18next.t("tooltip.compoundgraphedgesexpandalledges") },//{ id: 'id11', text: 'Expand all edges' },
                        { id: 'compoundgraphedgescollapseselectededges', text: i18next.t("menu.compoundgraphedgescollapseselectededges"), tooltip: i18next.t("tooltip.compoundgraphedgescollapseselectededges") },//{ id: 'id12', text: 'Collapse selected edges' },
                        { id: 'compoundgraphedgesexpandselectededges', text: i18next.t("menu.compoundgraphedgesexpandselectededges"), tooltip: i18next.t("tooltip.compoundgraphedgesexpandselectededges") },//{ id: 'id13', text: 'Expand selected edges' },
                        { id: 'compoundgraphedgescollapsebetweenselected', text: i18next.t("menu.compoundgraphedgescollapsebetweenselected"), tooltip: i18next.t("tooltip.compoundgraphedgescollapsebetweenselected") },//{ id: 'id14', text: 'Collapse between selected' },
                        { id: 'compoundgraphedgesexpandbetweenselected', text: i18next.t("menu.compoundgraphedgesexpandbetweenselected"), tooltip: i18next.t("tooltip.compoundgraphedgesexpandbetweenselected") },//{ id: 'id15', text: 'Expand between selected' }
                    ]
                },
            ]
        },
        { type: 'break' },
        {
            type: 'menu', id: 'compositegraph', text: i18next.t("menu.compositegraph"), tooltip: i18next.t("tooltip.compositegraph"),//type: 'menu', id: 'submenu4',text(item) { return "Composite Graph" },
            items: [
                { id: 'compositegraphselectedcompoundtograph', text: i18next.t("menu.compositegraphselectedcompoundtograph"), tooltip: i18next.t("tooltip.compositegraphselectedcompoundtograph") },//{ id: 'id1', text: 'Selected compound to graph' },
                { id: 'compositegraphselectedgraphtocompound', text: i18next.t("menu.compositegraphselectedgraphtocompound"), tooltip: i18next.t("tooltip.compositegraphselectedgraphtocompound") },//{ id: 'id2', text: 'Selected graph to compound' },
                { id: 'compositegraphcreatecomponent', text: i18next.t("menu.compositegraphcreatecomponent"), tooltip: i18next.t("tooltip.compositegraphcreatecomponent") },//{ id: 'id3', text: 'Create Component' },
                { id: 'compositegraphshowedges', text: i18next.t("menu.compositegraphshowedges"), tooltip: i18next.t("tooltip.compositegraphshowedges") },//{ id: 'id4', text: 'Show Edge' },
                { id: 'compositegraphhideedges', text: i18next.t("menu.compositegraphhideedges"), tooltip: i18next.t("tooltip.compositegraphhideedges") },//{ id: 'id5', text: 'Hide Edge' },
            ]
        },
        { type: 'break' },
        {
            type: 'menu', id: 'graphmanipulation', text: i18next.t("menu.graphmanipulation"), tooltip: i18next.t("tooltip.graphmanipulation"),//type: 'menu', id: 'submenu5',text(item) { return "Graph manipulation" },
            items: [
                {
                    id: 'graphmanipulationshowhide', text: i18next.t("menu.graphmanipulationshowhide"), tooltip: i18next.t("tooltip.graphmanipulationshowhide"),//id: 'id1', text: 'Show/Hide',
                    items: [
                        { id: 'graphmanipulationhideselected', text: i18next.t("menu.graphmanipulationhideselected"), tooltip: i18next.t("tooltip.graphmanipulationhideselected") },//{ id: 'id2', text: 'Hide selected' },
                        { id: 'graphmanipulationhidenonselected', text: i18next.t("menu.graphmanipulationhidenonselected"), tooltip: i18next.t("tooltip.graphmanipulationhidenonselected") },//{ id: 'id3', text: 'Hide non selected' },
                        { id: 'graphmanipulationunhideall', text: i18next.t("menu.graphmanipulationunhideall"), tooltip: i18next.t("tooltip.graphmanipulationunhideall") },//{ id: 'id4', text: 'Unhide all' },
                    ]
                },
                {
                    id: 'graphmanipulationgrabiphyungrabify', text: i18next.t("menu.graphmanipulationgrabiphyungrabify"), tooltip: i18next.t("tooltip.graphmanipulationgrabiphyungrabify"),// id: 'id5', text: 'Grabify/Ungrabify',
                    items: [
                        { id: 'graphmanipulationungrabifyselected', text: i18next.t("menu.graphmanipulationungrabifyselected"), tooltip: i18next.t("tooltip.graphmanipulationungrabifyselected") },//{ id: 'id6', text: 'Ungrabify selected' },
                        { id: 'graphmanipulationungrabifynonselected', text: i18next.t("menu.graphmanipulationungrabifynonselected"), tooltip: i18next.t("tooltip.graphmanipulationungrabifynonselected") },//{ id: 'id7', text: 'Ungrabify non selected' },
                        { id: 'graphmanipulationgrabifyselected', text: i18next.t("menu.graphmanipulationgrabifyselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifyselected") },//{ id: 'id8', text: 'Grabify selected ' },
                        { id: 'graphmanipulationgrabifynonselected', text: i18next.t("menu.graphmanipulationgrabifynonselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifynonselected") },//{ id: 'id9', text: 'Grabify non select' }
                    ]
                },
                {
                    id: 'graphmanipulationlockunlock', text: i18next.t("menu.graphmanipulationlockunlock"), tooltip: i18next.t("tooltip.graphmanipulationlockunlock"),//id: 'id10', text: 'Lock/Unlock',
                    items: [
                        { id: 'graphmanipulationgrabifylockselected', text: i18next.t("menu.graphmanipulationgrabifylockselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifylockselected") },//{ id: 'id11', text: 'Lock selected' },
                        { id: 'graphmanipulationgrabifylocknonselected', text: i18next.t("menu.graphmanipulationgrabifylocknonselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifylocknonselected") },//{ id: 'id12', text: 'Lock non selected' },
                        { id: 'graphmanipulationgrabifyunlockselected', text: i18next.t("menu.graphmanipulationgrabifyunlockselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifylockselected") },// { id: 'id13', text: 'Unlock selected ' },
                        { id: 'graphmanipulationgrabifyunlocknonselected', text: i18next.t("menu.graphmanipulationgrabifyunlocknonselected"), tooltip: i18next.t("tooltip.graphmanipulationgrabifyunlocknonselected") },//{ id: 'id14', text: 'Unlock non select' }
                    ]
                },
                {
                    id: 'graphmanipulationremoverestore', text: i18next.t("menu.graphmanipulationremoverestore"), tooltip: i18next.t("tooltip.graphmanipulationremoverestore"),//id: 'id15', text: 'Remove/Restore',
                    items: [
                        { id: 'graphmanipulationremoveselected', text: i18next.t("menu.graphmanipulationremoveselected"), tooltip: i18next.t("tooltip.graphmanipulationremoveselected") },//{ id: 'id16', text: 'Remove selected' },
                        { id: 'graphmanipulationremoveunselected', text: i18next.t("menu.graphmanipulationremoveunselected"), tooltip: i18next.t("tooltip.graphmanipulationremoveunselected") },//{ id: 'id17', text: 'Remove unselected' },
                        { id: 'graphmanipulationremoveall', text: i18next.t("menu.graphmanipulationremoveall"), tooltip: i18next.t("tooltip.graphmanipulationremoveall") },//{ id: 'id18', text: 'Remove all' },
                        { id: 'graphmanipulationrestore', text: i18next.t("menu.graphmanipulationrestore"), tooltip: i18next.t("tooltip.graphmanipulationrestore") },//{ id: 'id19', text: 'Restore' },

                    ]
                }
            ]
        },
        { type: 'break' },
        { type: 'spacer' },
        {
            type: 'menu', id: 'parameters', text: i18next.t("menu.parameters"), icon: "fa fa-folder-open",// id: 'parameters',text(item) { return "Parameters" },
            items: [
                { 
                    id: 'tooltips', text: i18next.t("menu.tooltips"), tooltip: i18next.t("menu.tooltips"),//id: 'id0',text: 'tooltips',
                    items: [
                        { id: 'tooltipson', text: i18next.t("menu.tooltipson"), tooltip: i18next.t("tooltip.tooltipson") },//{ id: 'id1', text: 'Palette tooltips on' },
                        { id: 'tooltipsoff', text: i18next.t("menu.tooltipsoff"), tooltip: i18next.t("tooltip.tooltipsoff") },//{ id: 'id2', text: 'Palette tooltips off' }        
                    ]
                },
                {
                    id: 'log', text: i18next.t("menu.log"), tooltip: i18next.t("menu.log"),//id: 'id7',text: 'Log',hidden: true,
                    items: [
                        { id: 'showhidelog', text: i18next.t("menu.showhidelog"), tooltip: i18next.t("tooltip.showhidelog") },//{ id: 'id8', text: 'Show/Hide log' }
                    ]
                },
                {
                    id: 'visualelementdisplaymode', text: i18next.t("menu.visualelementdisplaymode"), tooltip: i18next.t("menu.visualelementdisplaymode"),//id: 'id10',text: 'Visual Element Display Mode',
                    items: [
                        { id: 'visualelementdisplaymodenodes', text: i18next.t("menu.visualelementdisplaymodenodes"), tooltip: i18next.t("tooltip.visualelementdisplaymodenodes") },//{ id: 'id11', text: 'Nodes' },
                        { id: 'visualelementdisplaymodeboxes', text: i18next.t("menu.visualelementdisplaymodeboxes"), tooltip: i18next.t("tooltip.visualelementdisplaymodeboxes") },//{ id: 'id12', text: 'Boxes' }
                    ]
                }
                ,
                {
                    id: 'visualrelationdisplaymode', text: i18next.t("menu.visualrelationdisplaymode"), tooltip: i18next.t("menu.visualrelationdisplaymode"),//id: 'id17',text: 'Visual Relation Display Mode',
                    items: [
                        { id: 'visualrelationdisplaymodeedges', text: i18next.t("menu.visualrelationdisplaymodeedges"), tooltip: i18next.t("tooltip.visualrelationdisplaymodeedges") },//{ id: 'id18', text: 'Edges' },
                        { id: 'visualrelationdisplaymodenodes', text: i18next.t("menu.visualrelationdisplaymodenodes"), tooltip: i18next.t("tooltip.visualrelationdisplaymodenodes") },//{ id: 'id19', text: 'Nodes' }
                    ]
                },
                {
                    id: 'undoredo', text: i18next.t("menu.undoredo"), tooltip: i18next.t("menu.undoredo"),//id: 'id13',text: 'Undo/Redo',
                    items: [
                        { id: 'undoredoon', text: i18next.t("menu.undoredoon"), tooltip: i18next.t("tooltip.undoredoon") },//{ id: 'id14', text: 'On' },
                        { id: 'undoredooff', text: i18next.t("menu.undoredooff"), tooltip: i18next.t("tooltip.undoredooff") },//{ id: 'id15', text: 'Off' },
                        { id: 'undoredoclear', text: i18next.t("menu.undoredoclear"), tooltip: i18next.t("tooltip.undoredoclear") },//{ id: 'id16', text: 'Clear' }
                    ]
                }
                ,
                {
                    id: 'archimaterelationshipsrules', text: i18next.t("menu.archimaterelationshipsrules"), tooltip: i18next.t("menu.archimaterelationshipsrules"),//id: 'id20',text: 'ArchiMate Relationships Rules',
                    items: [
                        { id: 'archimaterelationshiprulesenforce', text: i18next.t("menu.archimaterelationshiprulesenforce"), tooltip: i18next.t("tooltip.archimaterelationshiprulesenforce") },//{ id: 'id21', text: 'Enforce' },
                        { id: 'archimaterelationshiprulesrelax', text: i18next.t("menu.archimaterelationshiprulesrelax"), tooltip: i18next.t("tooltip.archimaterelationshiprulesrelax") },//{ id: 'id22', text: 'Relax' }
                    ]
                }
                ,
                {
                    id: 'urlnavigation', text: i18next.t("menu.urlnavigation"), tooltip: i18next.t("menu.urlnavigation"),//id: 'id30',text: 'URL Navigation',
                    items: [
                        { id: 'urlnavigationchangemode', text: i18next.t("menu.urlnavigationchangemode"), tooltip: i18next.t("tooltip.urlnavigationchangemode") },//{ id: 'id31', text: 'Change mode' }
                    ]
                }
            ]
        },
        {
            type: 'menu',id: 'checker', text: i18next.t("menu.checker"), icon: "fa fa-folder-open",// id: 'checker',text(item) { return "Checker" },
            items: [
                { id: 'allowedrelationship', text: i18next.t("menu.allowedrelationship"), tooltip: i18next.t("tooltip.allowedrelationship") },//{ id: 'allowedRelationship', text: 'ArchiMate AllowedRelationship', tooltip: "set this property to true or false" }
            ]
        },

        { type: 'menu-check', id: 'palettes', text: i18next.t("menu.palettes"), selected: ['archimate', 'meta'], items: palettesMenu },

        {
            type: 'menu',id: 'archicg', text: "ArchiCG",// id: 'submenu1',text(item) { return "archicg" },
            items: [
                { id: 'aboutarchicg', text: i18next.t("menu.aboutarchicg"), tooltip: i18next.t("tooltip.aboutarchicg") },//{ id: 'id1', text: 'About archicg', tooltip: "Information about the application" }
            ]
        }
    ]
}

function handleMenuAction(event) {
    switch (event.target) {
        case '':
            break;
       
    }
}
