/*map start*/
seajs.config({
    map: [
	[
		"admin/blogs/form.js",
		"admin/blogs/form-1632fcddcdaf9bb063342865d67502f5.js"
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
		"admin/pages/form-544bd4e861786fc46be15252eec4b82e.js"
	],
	[
		"admin/settings/sidebar/edit.js",
		"admin/settings/sidebar/edit-49bb734795342dfd56718bd0df364162.js"
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