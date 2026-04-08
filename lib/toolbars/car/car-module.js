// ==============================================================
// FICHIER : lib/toolbars/car/car-module.js
// ==============================================================
// Tool pour la visualisation de décomposition de produit (Voiture)

// --- 1. Les Données du Tool ---
// Graphe de décomposition hiérarchique d'une voiture
const carGraphData = [
  // Top-Level Nodes
  { data: { id: 'Car', type: "product", label: 'Car' } },
  
  // Systems
  { data: { id: 'Chassis', type: "product", label: 'Chassis' } },
  { data: { id: 'EngineSystem', type: "product", label: 'Engine System' } },
  { data: { id: 'TransmissionSystem', type: "product", label: 'Transmission System' } },
  { data: { id: 'ElectricalSystem', type: "product", label: 'Electrical System' } },
  { data: { id: 'BodyInterior', type: "product", label: 'Body & Interior' } },
  { data: { id: 'SuspensionSteering', type: "product", label: 'Suspension & Steering' } },
  { data: { id: 'BrakingSystem', type: "product", label: 'Braking System' } },
  { data: { id: 'FuelSystem', type: "product", label: 'Fuel System' } },

  // Chassis Subcomponents
  { data: { id: 'ChassisFrame', type: "product", label: 'Chassis Frame' } },
  { data: { id: 'CrossMember', type: "product", label: 'Cross Member' } },
  { data: { id: 'FloorPan', type: "product", label: 'Floor Pan' } },
  { data: { id: 'Bumper', type: "product", label: 'Bumper' } },
  
  // Engine System Subcomponents
  { data: { id: 'EngineBlock', type: "product", label: 'Engine Block' } },
  { data: { id: 'Cylinder', type: "product", label: 'Cylinder' } },
  { data: { id: 'Piston', type: "product", label: 'Piston' } },
  { data: { id: 'Crankshaft', type: "product", label: 'Crankshaft' } },
  { data: { id: 'OilPump', type: "product", label: 'Oil Pump' } },
  { data: { id: 'SparkPlug', type: "product", label: 'Spark Plug' } },
  { data: { id: 'CoolingSystem', type: "product", label: 'Cooling System' } },
  { data: { id: 'Radiator', type: "product", label: 'Radiator' } },
  { data: { id: 'CoolantHoses', type: "product", label: 'Coolant Hoses' } },
  
  // Transmission System Subcomponents
  { data: { id: 'Transmission', type: "product", label: 'Transmission' } },
  { data: { id: 'Clutch', type: "product", label: 'Clutch' } },
  { data: { id: 'Gearbox', type: "product", label: 'Gearbox' } },
  { data: { id: 'Differential', type: "product", label: 'Differential' } },
  { data: { id: 'Axle', type: "product", label: 'Axle' } },

  // Electrical System Subcomponents
  { data: { id: 'Battery', type: "product", label: 'Battery' } },
  { data: { id: 'Alternator', type: "product", label: 'Alternator' } },
  { data: { id: 'StarterMotor', type: "product", label: 'Starter Motor' } },
  { data: { id: 'FuseBox', type: "product", label: 'Fuse Box' } },
  { data: { id: 'WiringHarness', type: "product", label: 'Wiring Harness' } },

  // Body & Interior Subcomponents
  { data: { id: 'Doors', type: "product", label: 'Doors' } },
  { data: { id: 'Dashboard', type: "product", label: 'Dashboard' } },
  { data: { id: 'Seats', type: "product", label: 'Seats' } },
  { data: { id: 'Windows', type: "product", label: 'Windows' } },
  { data: { id: 'Mirrors', type: "product", label: 'Mirrors' } },
  { data: { id: 'Roof', type: "product", label: 'Roof' } },

  // Suspension & Steering Subcomponents
  { data: { id: 'SteeringWheel', type: "product", label: 'Steering Wheel' } },
  { data: { id: 'SteeringColumn', type: "product", label: 'Steering Column' } },
  { data: { id: 'SuspensionArms', type: "product", label: 'Suspension Arms' } },
  { data: { id: 'ShockAbsorbers', type: "product", label: 'Shock Absorbers' } },
  { data: { id: 'Springs', type: "product", label: 'Springs' } },

  // Braking System Subcomponents
  { data: { id: 'BrakePedal', type: "product", label: 'Brake Pedal' } },
  { data: { id: 'MasterCylinder', type: "product", label: 'Master Cylinder' } },
  { data: { id: 'BrakeLine', type: "product", label: 'Brake Line' } },
  { data: { id: 'DiscBrake', type: "product", label: 'Disc Brake' } },
  { data: { id: 'BrakePads', type: "product", label: 'Brake Pads' } },
  { data: { id: 'Calipers', type: "product", label: 'Calipers' } },

  // Fuel System Subcomponents
  { data: { id: 'FuelTank', type: "product", label: 'Fuel Tank' } },
  { data: { id: 'FuelPump', type: "product", label: 'Fuel Pump' } },
  { data: { id: 'FuelInjectors', type: "product", label: 'Fuel Injectors' } },
  { data: { id: 'FuelFilter', type: "product", label: 'Fuel Filter' } },

  // Edges - "is part of" relationships
  { data: { id: 'edge1', edgeType: "composition", source: 'Car', target: 'Chassis' } },
  { data: { id: 'edge2', edgeType: "composition", source: 'Chassis', target: 'ChassisFrame' } },
  { data: { id: 'edge3', edgeType: "composition", source: 'ChassisFrame', target: 'CrossMember' } },
  { data: { id: 'edge4', edgeType: "composition", source: 'ChassisFrame', target: 'FloorPan' } },
  { data: { id: 'edge5', edgeType: "composition", source: 'Chassis', target: 'Bumper' } },
  { data: { id: 'edge6', edgeType: "composition", source: 'Car', target: 'EngineSystem' } },
  { data: { id: 'edge7', edgeType: "composition", source: 'EngineSystem', target: 'EngineBlock' } },
  { data: { id: 'edge8', edgeType: "composition", source: 'EngineBlock', target: 'Cylinder' } },
  { data: { id: 'edge9', edgeType: "composition", source: 'Cylinder', target: 'Piston' } },
  { data: { id: 'edge10', edgeType: "composition", source: 'EngineBlock', target: 'Crankshaft' } },
  { data: { id: 'edge11', edgeType: "composition", source: 'EngineSystem', target: 'OilPump' } },
  { data: { id: 'edge12', edgeType: "composition", source: 'EngineSystem', target: 'SparkPlug' } },
  { data: { id: 'edge13', edgeType: "composition", source: 'EngineSystem', target: 'CoolingSystem' } },
  { data: { id: 'edge14', edgeType: "composition", source: 'CoolingSystem', target: 'Radiator' } },
  { data: { id: 'edge15', edgeType: "composition", source: 'Radiator', target: 'CoolantHoses' } },
  { data: { id: 'edge16', edgeType: "composition", source: 'Car', target: 'TransmissionSystem' } },
  { data: { id: 'edge17', edgeType: "composition", source: 'TransmissionSystem', target: 'Transmission' } },
  { data: { id: 'edge18', edgeType: "composition", source: 'Transmission', target: 'Clutch' } },
  { data: { id: 'edge19', edgeType: "composition", source: 'Transmission', target: 'Gearbox' } },
  { data: { id: 'edge20', edgeType: "composition", source: 'TransmissionSystem', target: 'Differential' } },
  { data: { id: 'edge21', edgeType: "composition", source: 'Differential', target: 'Axle' } },
  { data: { id: 'edge22', edgeType: "composition", source: 'Car', target: 'ElectricalSystem' } },
  { data: { id: 'edge23', edgeType: "composition", source: 'ElectricalSystem', target: 'Battery' } },
  { data: { id: 'edge24', edgeType: "composition", source: 'Battery', target: 'WiringHarness' } },
  { data: { id: 'edge25', edgeType: "composition", source: 'WiringHarness', target: 'FuseBox' } },
  { data: { id: 'edge26', edgeType: "composition", source: 'ElectricalSystem', target: 'Alternator' } },
  { data: { id: 'edge27', edgeType: "composition", source: 'ElectricalSystem', target: 'StarterMotor' } },
  { data: { id: 'edge28', edgeType: "composition", source: 'Car', target: 'BodyInterior' } },
  { data: { id: 'edge29', edgeType: "composition", source: 'BodyInterior', target: 'Doors' } },
  { data: { id: 'edge30', edgeType: "composition", source: 'BodyInterior', target: 'Dashboard' } },
  { data: { id: 'edge31', edgeType: "composition", source: 'BodyInterior', target: 'Seats' } },
  { data: { id: 'edge32', edgeType: "composition", source: 'Doors', target: 'Windows' } },
  { data: { id: 'edge33', edgeType: "composition", source: 'Doors', target: 'Mirrors' } },
  { data: { id: 'edge34', edgeType: "composition", source: 'BodyInterior', target: 'Roof' } },
  { data: { id: 'edge35', edgeType: "composition", source: 'Car', target: 'SuspensionSteering' } },
  { data: { id: 'edge36', edgeType: "composition", source: 'SuspensionSteering', target: 'SteeringWheel' } },
  { data: { id: 'edge37', edgeType: "composition", source: 'SuspensionSteering', target: 'SteeringColumn' } },
  { data: { id: 'edge38', edgeType: "composition", source: 'SuspensionSteering', target: 'SuspensionArms' } },
  { data: { id: 'edge39', edgeType: "composition", source: 'SuspensionArms', target: 'ShockAbsorbers' } },
  { data: { id: 'edge40', edgeType: "composition", source: 'SuspensionArms', target: 'Springs' } },
  { data: { id: 'edge41', edgeType: "composition", source: 'Car', target: 'BrakingSystem' } },
  { data: { id: 'edge42', edgeType: "composition", source: 'BrakingSystem', target: 'BrakePedal' } },
  { data: { id: 'edge43', edgeType: "composition", source: 'BrakingSystem', target: 'MasterCylinder' } },
  { data: { id: 'edge44', edgeType: "composition", source: 'MasterCylinder', target: 'BrakeLine' } },
  { data: { id: 'edge45', edgeType: "composition", source: 'BrakingSystem', target: 'DiscBrake' } },
  { data: { id: 'edge46', edgeType: "composition", source: 'DiscBrake', target: 'BrakePads' } },
  { data: { id: 'edge47', edgeType: "composition", source: 'DiscBrake', target: 'Calipers' } },
  { data: { id: 'edge48', edgeType: "composition", source: 'Car', target: 'FuelSystem' } },
  { data: { id: 'edge49', edgeType: "composition", source: 'FuelSystem', target: 'FuelTank' } },
  { data: { id: 'edge50', edgeType: "composition", source: 'FuelTank', target: 'FuelPump' } },
  { data: { id: 'edge51', edgeType: "composition", source: 'FuelPump', target: 'FuelInjectors' } },
  { data: { id: 'edge52', edgeType: "composition", source: 'FuelSystem', target: 'FuelFilter' } }
];

// --- 2. Les Fonctions (Logique Pure) ---

/**
 * Charge les données de démonstration de la voiture dans le graphe Cytoscape.
 * Supprime d'abord tous les éléments existants, puis ajoute les données de la voiture.
 */
function loadCarDemoData() {
    console.log("[Car Tool] Chargement des données de démonstration...");
    
    // Suppression du graphe existant
    cy.$().remove();
    
    // Ajout des données de la voiture
    cy.add(carGraphData);
    
    // Application des opérations de collapse
    api.collapseAll();
    api.collapseAllEdges(getEdgeOptions());
    
    console.log("[Car Tool] Données de démonstration chargées avec succès.");
}

// --- 3. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'CarTool';

var CarToolMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        description: 'Tool pour la visualisation de décomposition de produit (Voiture)',
        type: 'toolbar' // Type de module: toolbar sans palette
    },
    
    // Registre des Fonctions
    functions: [
        { 
            id: 'LoadCarDemoData', 
            handler: loadCarDemoData, 
            description: 'Charge les données de démonstration de la voiture dans le graphe.',
            archimateElement: 'Application Function',
            input: 'Aucun',
            output: 'Graphe Cytoscape avec décomposition de voiture'
        }
    ],

    // Déclaration de la Toolbar
    toolbar: {
        name: "toolbarCar",
        style: "background-color:white",
        items: [
            { 
                type: "button", 
                id: "loadCarDemoData", 
                textKey: "toolbar.car.loadDemoData",
                icon: "fa fa-car" // Icône FontAwesome optionnelle
            }
        ],
        // Handler unifié qui traduit l'action en appel de fonction
        onClick: function(event) {
            const actionId = event.target;
            
            // Mapping action → fonction
            const actionMap = {
                'loadCarDemoData': 'LoadCarDemoData'
            };
            
            const functionName = actionMap[actionId];
            if (functionName) {
                executeRegisteredFunction(functionName, event);
            } else {
                console.warn(`[Car Tool] No handler found for action: ${actionId}`);
            }
        }
    },
    
    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            toolbar: {
                car: {
                    loadDemoData: "Load Car Demo Data"
                }
            }
        },
        fr: { 
            toolbar: {
                car: {
                    loadDemoData: "Charger Données Démo Voiture"
                }
            }
        },
        de: {
            toolbar: {
                car: {
                    loadDemoData: "Auto-Demodaten Laden"
                }
            }
        },
        ar: {
            toolbar: {
                car: {
                    loadDemoData: "تحميل بيانات تجريبية للسيارة"
                }
            }
        },
        zh: {
            toolbar: {
                car: {
                    loadDemoData: "加载汽车演示数据"
                }
            }
        },
        es: {
            toolbar: {
                car: {
                    loadDemoData: "Cargar Datos Demo Coche"
                }
            }
        },
        it: {
            toolbar: {
                car: {
                    loadDemoData: "Carica Dati Demo Auto"
                }
            }
        }
    }
};

console.log("[Car Tool] Registering tool...");
registerTool(CarToolMetadata);