const {src, dest} = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();
//相対パスで設定することを忘れないように！
const pkg = require('./package.json');
const conf = pkg["gulp-config"];
const sizes = conf.sizes;

//ファイルのコピー
function icon(done) {
    for(let size of sizes) {
        let width = size[0];
        let height = size[1];
        //ワイルドカードで全てのファイルをコピーすることができる(今はhtmlのみ)
        //他階層になると少し難しくなる
        src('./favicon.png')
            //サイズ変更のプラグイン使用(-で繋がっているのでキャメル型にする)
            .pipe($.imageResize({
                width,
                height,
                crop: true,
                upscale: false
            }))
            //画像の圧縮プラグインの使用
            .pipe($.imagemin())
            //サイズ設定はここで行う
            .pipe($.rename(`favicon-${width}×${height}.png`))
            .pipe(dest('./dist/images/icon'));    
    }
    done();
}

exports.icon = icon;