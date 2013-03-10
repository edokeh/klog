seajs.config({
    alias: {
        '$': 'gallery/jquery/1.8.3/jquery',
        '_': 'gallery/underscore/1.4.4/underscore',
        'backbone': 'gallery/backbone/0.9.10/backbone',
        'klog-backbone': '/assets/klog/admin/common/backbone',
        'swfupload': 'gallery/swfupload/2.2.0/swfupload'
    },
    preload: ['seajs/plugin-text']
})