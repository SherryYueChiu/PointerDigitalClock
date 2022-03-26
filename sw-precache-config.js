module.exports = {
    staticFileGlobs: [
        './**.{js,css,png,svg,html}',
    ],
    runtimeCaching: [{
        urlPattern: /.*/,
        handler: 'networkFirst'
    }],
    swFile: 'service-worker.js'
};