// Contenuto per custom-scripts.js

// Inizializzazione del plugin apmpp
$(document).ready(function ($) {
    var settings = {
        sourcePath: "",
        muted: true,
        useControls: false,
        breakPointArr: [
            { width: 0, column: 1, gutter: 0 },
            { width: 480, column: 1, gutter: 0 },
            { width: 500, column: 2, gutter: 0 },
            { width: 700, column: 3, gutter: 10 },
            { width: 1100, column: 3, gutter: 10 },
            { width: 1600, column: 4, gutter: 10 },
        ],
        useShare: true,
        facebookAppId: "",
        playbackMethod: "hover",
        playbackTrigger: ".mpp-inner",
        linkTrigger: ".mpp-link-icon",
        lightboxTrigger: ".mpp-lightbox-icon",
    };

    // Consiglio: usa una classe comune per inizializzarli tutti insieme,
    // ad esempio <div id="wrap" class="apmpp-gallery">...</div>
    // e poi usa: mppjq(".apmpp-gallery").apmpp(settings);
    // In questo modo eviti di ripetere il codice.

    var mppjq = jQuery;
    mppjq("#wrap, #wrap2, #wrap3, #wrap4, .wrap, .wrap1, .wrap2, .wrap3, .wrap4, .wrap5, .wrap6, .wrap7, #wrap10, #wrap32, #wrap13, .wrap8, #wrap11, #wrap14, #wrap17, #wrap18, #wrap19, #wrap20, #wrap21, #wrap22, #wrap30").apmpp(settings);

    // Loading The Video List
    run(); // Assicurati che la funzione run() sia definita in uno dei tuoi script
});

// Qui puoi anche unire il contenuto degli altri tuoi file JS come new.js, return-img.js, etc.