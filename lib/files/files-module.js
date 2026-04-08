// ==============================================================
// FICHIER : files-module.js (Correction de la structure du menu)
// ==============================================================

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
   // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            menu: { 
                files: "Files", 
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
                saveasImageSVGFull: "SVG Full" 
            } 
        },
        fr: { 
            menu: { 
                files: "Fichiers", 
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
                saveasImageSVGFull: "SVG Complet" 
            } 
        },
        de: {
            menu: {
                files: "Dateien",
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
                saveasImageSVGFull: "SVG Vollbild"
            }
        },
        ar: {
            menu: {
                files: "ملفات",
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
                saveasImageSVGFull: "SVG كامل"
            }
        },
        zh: {
            menu: {
                files: "文件",
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
                saveasImageSVGFull: "SVG 完整"
            }
        },
        es: {
            menu: {
                files: "Archivos",
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
                saveasImageSVGFull: "SVG Completo"
            }
        },
        it: {
            menu: {
                files: "File",
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
                saveasImageSVGFull: "SVG Completo"
            }
        }
    }
};
console.log("call of registerModule follow")
registerModule(FileIOMetadata);
   
;