let pstyle = 'border: 1px solid #efefef; padding: 5px'
let myLayout = new w2layout({
    name: 'mainLayout',
    box: '#mainLayout',
    panels: [
        {type: 'top', size: 40, style: 'border-bottom: 1px solid #ccc;',html:`Top Panel` },
        {type: 'left', resizable: true, size: 250, style: 'border-right: 1px solid #ccc;',title:"My custom title",
            html: `<div id="toolbar-container"></div>`},
        {type: 'main', resizable: true, style: 'background: #f8f9fa;',
            html: `<div id="main-container" style="display: flex; flex-direction: row;height: 100%; width: 100%;"></div>` },
        {type: 'right', resizable: true, size: 300, style: 'border-left: 1px solid #ccc;',html: `Right Panel`},
        { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle, html: 'Preview' },
        { type: 'bottom', resizable: true, size: 50, style: 'border-top: 1px solid #ccc;', html: `Bottom Panel` }
    ]
})
myLayout.render('#mainLayout'); // Render the layout in the container      
//w2ui.mainLayout.html('top', initializeMainMenu());
//w2ui.mainLayout.html('left', initializeToolbar());//initializeToolbar2());
//initializeToolbar().render("#toolbar-container")
//initializeISCSidebar()
//w2ui.mainLayout.html('bottom', "");