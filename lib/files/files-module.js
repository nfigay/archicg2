// =======================================================
// FICHIER : files-module.js (Correction de la structure du menu)
// =======================================================

// --- 1. Les Fonctions (Logique Pure) ---
function loadfile() { console.log("[File_IO] Exécution: Charger Fichier (LoadFile)"); }
function savefile() { console.log("[File_IO] Exécution: Sauvegarder Fichier (SaveFile)"); }
function exportCSV() { console.log("Exécution: Export CSV"); }
function exportOWL() { console.log("Exécution: Export OWL"); }
function importJArchicg() { console.log("Exécution: Import JArchicg"); }
function importOEF() { console.log("Exécution: Import OEF"); }
function importJson() { console.log("Exécution: Import JSON"); }
function saveasImagePNGView() { console.log("Exécution: Save PNG View"); }
function saveasImagePNGFull() { console.log("Exécution: Save PNG Full"); }
function saveasImageJPGView() { console.log("Exécution: Save JPG View"); }
function saveasImageJPGFull() { console.log("Exécution: Save JPG Full"); }
function saveasImageSVGView() { console.log("Exécution: Save SVG View"); }
function saveasImageSVGFull() { console.log("Exécution: Save SVG Full"); }

// --- 2. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'File_IO';

var FileIOMetadata = {
    metadata: { id: MODULE_ID, archimateElement: 'Application Component' },
    
    // Registre des Fonctions
    functions: [
        { id: 'LoadFile', handler: loadfile, description: 'Charger un fichier de graphe.' },
        { id: 'SaveFile', handler: savefile, description: 'Sauvegarder le graphe actuel.' },
        { id: 'ExportCSV', handler: exportCSV },
        { id: 'ExportOWL', handler: exportOWL },
        { id: 'ImportJArchicg', handler: importJArchicg },
        { id: 'ImportOEF', handler: importOEF },
        { id: 'ImportJson', handler: importJson },
        { id: 'SaveAsImagePNGView', handler: saveasImagePNGView },
        { id: 'SaveAsImagePNGFull', handler: saveasImagePNGFull },
        { id: 'SaveAsImageJPGView', handler: saveasImageJPGView },
        { id: 'SaveAsImageJPGFull', handler: saveasImageJPGFull },
        { id: 'SaveAsImageSVGView', handler: saveasImageSVGView },
        { id: 'SaveAsImageSVGFull', handler: saveasImageSVGFull }
    ],

    // Déclaration du Menu (Correction: Ajout de 'text')
    menuItems: [
        {
            type: "menu", id: "files", text:  i18next.t("menu.file"), textKey: "menu.files",
            items: [
                { id: "loadfile", textKey: "menu.loadfile",text:  i18next.t("menu.loadfile"), functionId: 'LoadFile' }, 
                { id: "savefile", textKey: "menu.savefile",text: i18next.t("menu.savefile"),  functionId: 'SaveFile' },
                { type: "break" },
                {
                    id: "import",text: i18next.t("menu.import"),  textKey: "menu.import",
                    items: [
                        { id: "importJArchicg",text: i18next.t("menu.importJArchicg"),  textKey: "menu.importJArchicg", functionId: 'ImportJArchicg' },
                        { id: "importOEF",text: i18next.t("menu.importOEF"), textKey: "menu.importOEF", functionId: 'ImportOEF' },
                        { id: "importJson",text: i18next.t("menu.importJson"), textKey: "menu.importJson", functionId: 'ImportJson' },
                    ]
                },
                { type: "break" },
                {
                    id: "export", textKey: "menu.export",
                    items: [
                        { id: "exportCSV", text: i18next.t("menu.exportCSV"),textKey: "menu.exportCSV", functionId: 'ExportCSV' },
                        { id: "exportOWL", text: i18next.t("menu.exportOWL"),textKey: "menu.exportOWL", functionId: 'ExportOWL' }
                    ]
                },
                { type: "break" },
                {
                    id: "saveasImage", textKey: "menu.saveasImage",
                    items: [
                        { id: "saveasImagePNGView",text: i18next.t("menu.saveasImagePNGView"), textKey: "menu.saveasImagePNGView", functionId: 'SaveAsImagePNGView' },
                        { id: "saveasImagePNGFull",text: i18next.t("menu.saveasImagePNGFull"), textKey: "menu.saveasImagePNGFull", functionId: 'SaveAsImagePNGFull' },
                        { id: "saveasImageJPGView",text: i18next.t("menu.saveasImageJPGView"), textKey: "menu.saveasImageJPGView", functionId: 'SaveAsImageJPGView' },
                        { id: "saveasImageJPGFull",text: i18next.t("menu.saveasImageJPGFull"), textKey: "menu.saveasImageJPGFull", functionId: 'SaveAsImageJPGFull' },
                        { id: "saveasImageSVGView",text: i18next.t("menu.saveasImageSVGView"), textKey: "menu.saveasImageSVGView", functionId: 'SaveAsImageSVGView' },
                        { id: "saveasImageSVGFull",text: i18next.t("menu.saveasImageSVGFull"), textKey: "menu.saveasImageSVGFull", functionId: 'SaveAsImageSVGFull' }
                    ]
                },
            ]
        },
    ],
    
    // Ressources I18n spécifiques (essentielles pour les clés du menu)
    i18n: {
        en: { menu: { files: "Files", loadfile: "Load", savefile: "Save", import: "Import", importJArchicg: "JArchiCG", importOEF: "Open Format", importJson: "Cytoscape JSON", export: "Export", exportCSV: "Export CSV", exportOWL: "Export OWL", saveasImage: "Save as Image", saveasImagePNGView: "PNG (View)", saveasImagePNGFull: "PNG (Full)", saveasImageJPGView: "JPG (View)", saveasImageJPGFull: "JPG (Full)", saveasImageSVGView: "SVG (View)", saveasImageSVGFull: "SVG (Full)" } },
        fr: { menu: { files: "Fichiers", loadfile: "Charger", savefile: "Sauvegarder", import: "Importer", importJArchicg: "JArchiCG", importOEF: "Format Ouvert", importJson: "JSON Cytoscape", export: "Exporter", exportCSV: "Exporter CSV", exportOWL: "Exporter OWL", saveasImage: "Sauvegarder comme Image", saveasImagePNGView: "PNG (Vue)", saveasImagePNGFull: "PNG (Complet)", saveasImageJPGView: "JPG (Vue)", saveasImageJPGFull: "JPG (Complet)", saveasImageSVGView: "SVG (Vue)", saveasImageSVGFull: "SVG (Complet)" } },
    }
};
console.log("call of registerModule follow")
registerModule(FileIOMetadata);
   
;