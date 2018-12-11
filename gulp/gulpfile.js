var gulp = require('gulp');
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require('browser-sync').create();

//ベンダープレフィックスの付与対象
var options = {
  browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
  cascade: false
};


//ブラウザ同期
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});


//再読み込みの自動化
gulp.task('bs-reload', function () {
    browserSync.reload();
});


//scssコンパイル
gulp.task("sass", function() {
    gulp.src("./css/*.scss")

        //エラー時の停止を防止&エラー時に通知を表示
        .pipe(plumber({
          errorHandler: notify.onError({
            title: "エラーがあります", // エラー時の文言
            message: "<%= error.message %>" // エラー内容を表示させる
          })
        }))


        //cssに出力時にインデントを整える
        .pipe(sass({
            outputStyle: 'expanded'
        }))


        //ベンダープレフィックス
        .pipe(autoprefixer(options))
        .pipe(gulp.dest("./css"))
});


//下記のファイルが変更されたらリロード
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./css/*.scss", ['sass']);
    gulp.watch("./*.html", ['bs-reload']);
    gulp.watch("./css/*.css", ['bs-reload']);
});
