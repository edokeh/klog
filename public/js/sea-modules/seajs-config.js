/*map start*/
seajs.config({
    map: [
	[
		"admin/blogs/form.js",
		"admin/blogs/form-fffea9f53bc33d552ffbf1712987a831.js"
	],
	[
		"admin/blogs/new.js",
		"admin/blogs/new-1d180b18ed816b7c625e95f8fac02d93.js"
	],
	[
		"admin/categories/index.js",
		"admin/categories/index-488b768eff7edf0c92b1a92b218c6098.js"
	],
	[
		"admin/comments/index.js",
		"admin/comments/index-bb0334c60856b3dff84e4dbb804a4ba7.js"
	],
	[
		"admin/common/pop-confirm.js",
		"admin/common/pop-confirm-f67f84049e209822d68def6f681f6056.js"
	],
	[
		"admin/index.js",
		"admin/index-0b2c867ba2a0b37f0865dabf3eab63ad.js"
	],
	[
		"admin/pages/form.js",
		"admin/pages/form-a3bf585ec94ad3d7a02c476b652564eb.js"
	],
	[
		"admin/settings/sidebar/edit.js",
		"admin/settings/sidebar/edit-8ea02fcadcc145180278c6b64550ddfc.js"
	],
	[
		"blogs/show.js",
		"blogs/show-bcdafa770a9a888053e570db8ce0077f.js"
	]
]
});
seajs.production = true;
/*map end*/
seajs.config({
    alias: {
        '$': 'gallery/jquery/1.8.3/jquery',
        '_': 'gallery/underscore/1.4.4/underscore',
        'backbone': 'gallery/backbone/0.9.10/backbone',
        'swfupload': 'gallery/swfupload/2.2.0/swfupload',
        'events': 'gallery/events/1.0.0/events',
        'tab': 'gallery/tab/0.0.1/tab',
        'modal': 'gallery/modal/0.0.1/modal',
        'jquery-ujs': 'gallery/jquery-ujs/2.2.1/jquery-ujs',
        'jquery.color': 'jquery/color/2.1.2/color'
    },
    preload: [seajs.production ? '' : 'seajs/plugin-text']
});