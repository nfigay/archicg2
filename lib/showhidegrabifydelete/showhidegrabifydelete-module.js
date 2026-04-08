// ==============================================================
// FICHIER : showhidegrabifydelete-module.js
// ==============================================================

// --- 1. Les Fonctions (Logique Pure) ---

// === SHOW/HIDE ===
function hideSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Hide Selected"); 
}

function hideNonSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Hide Non Selected"); 
}

function unhideAll() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Unhide All"); 
}

// === GRABIFY/UNGRABIFY ===
function ungrabifySelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Ungrabify Selected"); 
}

function ungrabifyNonSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Ungrabify Non Selected"); 
}

function grabifySelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Grabify Selected"); 
}

function grabifyNonSelect() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Grabify Non Select"); 
}

// === LOCK/UNLOCK ===
function lockSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Lock Selected"); 
}

function lockNonSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Lock Non Selected"); 
}

function unlockSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Unlock Selected"); 
}

function unlockNonSelect() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Unlock Non Select"); 
}

// === REMOVE/RESTORE ===
function removeSelected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Remove Selected"); 
}

function removeUnselected() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Remove Unselected"); 
}

function removeAll() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Remove All"); 
}

function restore() { 
    console.log("[ShowHideGrabifyDelete] Exécution: Restore"); 
}

// --- 2. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'ShowHideGrabifyDelete';

var ShowHideGrabifyDeleteMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        description: 'Module de gestion des actions sur les éléments du graphe (visibilité, manipulation, verrouillage, suppression)'
    },
    
    // Registre des Fonctions
    functions: [
        // === SHOW/HIDE ===
        { 
            id: 'HideSelected', 
            handler: hideSelected, 
            description: 'Masquer les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'HideNonSelected', 
            handler: hideNonSelected, 
            description: 'Masquer les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'UnhideAll', 
            handler: unhideAll, 
            description: 'Afficher tous les éléments.',
            archimateElement: 'Application Function'
        },
        
        // === GRABIFY/UNGRABIFY ===
        { 
            id: 'UngrabifySelected', 
            handler: ungrabifySelected, 
            description: 'Libérer les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'UngrabifyNonSelected', 
            handler: ungrabifyNonSelected, 
            description: 'Libérer les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'GrabifySelected', 
            handler: grabifySelected, 
            description: 'Saisir les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'GrabifyNonSelect', 
            handler: grabifyNonSelect, 
            description: 'Saisir les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        
        // === LOCK/UNLOCK ===
        { 
            id: 'LockSelected', 
            handler: lockSelected, 
            description: 'Verrouiller les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'LockNonSelected', 
            handler: lockNonSelected, 
            description: 'Verrouiller les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'UnlockSelected', 
            handler: unlockSelected, 
            description: 'Déverrouiller les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'UnlockNonSelect', 
            handler: unlockNonSelect, 
            description: 'Déverrouiller les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        
        // === REMOVE/RESTORE ===
        { 
            id: 'RemoveSelected', 
            handler: removeSelected, 
            description: 'Supprimer les éléments sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'RemoveUnselected', 
            handler: removeUnselected, 
            description: 'Supprimer les éléments non sélectionnés.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'RemoveAll', 
            handler: removeAll, 
            description: 'Supprimer tous les éléments.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'Restore', 
            handler: restore, 
            description: 'Restaurer les éléments supprimés.',
            archimateElement: 'Application Function'
        }
    ],

    // Déclaration du Menu
    menuItems: [
        {
            type: 'menu', 
            id: 'showhidegrabifydelete', 
            textKey: "menu.showhidegrabifydelete", 
            icon: 'fa fa-eye',
            items: [
                {
                    id: 'showhide', 
                    textKey: "menu.showhide", 
                    items: [
                        { 
                            id: 'hideselected', 
                            textKey: "menu.hideselected", 
                            functionId: 'HideSelected' 
                        },
                        { 
                            id: 'hidenonselected', 
                            textKey: "menu.hidenonselected", 
                            functionId: 'HideNonSelected' 
                        },
                        { 
                            id: 'unhideall', 
                            textKey: "menu.unhideall", 
                            functionId: 'UnhideAll' 
                        }
                    ]
                },
                {
                    id: 'grabifyungrabify', 
                    textKey: "menu.grabifyungrabify", 
                    items: [
                        { 
                            id: 'ungrabifyselected', 
                            textKey: "menu.ungrabifyselected", 
                            functionId: 'UngrabifySelected' 
                        },
                        { 
                            id: 'ungrabifynonselected', 
                            textKey: "menu.ungrabifynonselected", 
                            functionId: 'UngrabifyNonSelected' 
                        },
                        { 
                            id: 'grabifyselected', 
                            textKey: "menu.grabifyselected", 
                            functionId: 'GrabifySelected' 
                        },
                        { 
                            id: "grabifynonselect", 
                            textKey: "menu.grabifynonselect", 
                            functionId: 'GrabifyNonSelect' 
                        }
                    ]
                },
                {
                    id: 'lockunlock', 
                    textKey: "menu.lockunlock", 
                    items: [
                        { 
                            id: 'lockselected', 
                            textKey: "menu.lockselected", 
                            functionId: 'LockSelected' 
                        },
                        { 
                            id: 'locknonselected', 
                            textKey: "menu.locknonselected", 
                            functionId: 'LockNonSelected' 
                        },
                        { 
                            id: 'unlockselected', 
                            textKey: "menu.unlockselected", 
                            functionId: 'UnlockSelected' 
                        },
                        { 
                            id: 'unlocknonselect', 
                            textKey: "menu.unlocknonselect", 
                            functionId: 'UnlockNonSelect' 
                        }
                    ]
                },
                {
                    id: 'removerestore', 
                    textKey: "menu.removerestore", 
                    items: [
                        { 
                            id: 'removeselected', 
                            textKey: "menu.removeselected", 
                            functionId: 'RemoveSelected' 
                        },
                        { 
                            id: 'removeunselected', 
                            textKey: "menu.removeunselected", 
                            functionId: 'RemoveUnselected' 
                        },
                        { 
                            id: 'removeall', 
                            textKey: "menu.removeall", 
                            functionId: 'RemoveAll' 
                        },
                        { 
                            id: 'restore', 
                            textKey: "menu.restore", 
                            functionId: 'Restore' 
                        }
                    ]
                }
            ]
        }
    ],
    
    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            menu: { 
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
            } 
        },
        fr: { 
            menu: { 
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
                restore: "Restaurer"
            } 
        },
        de: {
            menu: {
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
                restore: "Wiederherstellen"
            }
        },
        ar: {
            menu: {
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
                restore: "استعادة"
            }
        },
        zh: {
            menu: {
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
                restore: "恢复"
            }
        },
        es: {
            menu: {
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
                restore: "Restaurar"
            }
        },
        it: {
            menu: {
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
                restore: "Ripristina"
            }
        }
    }
};

console.log("[ShowHideGrabifyDelete Module] Registering module...");
registerModule(ShowHideGrabifyDeleteMetadata);