/**
 * 将生成的文件重命名为 xx-{{md5(content)}}.js 格式
 * 需要 package.json 中配置 configFilepath，以便寻找到对应的 seajs 配置文件，并自动添加 Map 规则
 * 配置时使用相对路径,
 */
var path = require('path');
var _ = require("underscore");
var crypto = require('crypto');

var templatePath = path.join(path.dirname(__filename), './seajs-map.tpl'); // 配置模板

var plugin = module.exports = Plugin.create('md5stamp-rename');

plugin.run = function (project, callback) {
    var distDir = project.distDirectory;
    var map = [];

    files = fsExt.list(distDir, /\.js$/).forEach(function (file) {
        if (isSkip(file)) {
            return;
        }
        var filepath = path.join(distDir, file);
        var code = fsExt.readFileSync(filepath);
        var hash = crypto.createHash('md5').update(code).digest("hex");
        var file_with_hash = file.replace(/\.js/, '-' + hash + '.js');
        fsExt.writeFileSync(path.join(distDir, file_with_hash), code);

        map.push([file, file_with_hash]);
    });

    writeMapToConfig(map, project);
    callback();
}

// 忽略掉 -debug.js  -{{md5}}.js 的文件
function isSkip(filepath) {
    return /\-debug\.js$/.test(filepath) || /\-[a-z0-9]{32}\.js$/.test(filepath)
}

function normalizePath(filepath) {
    return filepath.replace(/\\/g, '/');
}

// 将映射关系 append 进入seajs的config文件
function writeMapToConfig(map, project) {
    if (!project.configFilepath) {
        return;
    }

    map = _.map(map, function (arr) {
        return [normalizePath(arr[0]), normalizePath(arr[1])];
    });
    var temp = fsExt.readFileSync(templatePath);
    var mapCode = _.template(temp, {mapJson: JSON.stringify(map, null, '\t')});

    var file = path.join(project.distDirectory, project.configFilepath);
    var code = fsExt.readFileSync(file);
    code = code.replace(/\/\*map start\*\/[\s\S]*\/\*map end\*\//, '').trim(); // 去掉以前的配置

    fsExt.writeFileSync(file, mapCode + '\r\n' + code);
}