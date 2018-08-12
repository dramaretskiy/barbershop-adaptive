"use strict";

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minifyhtml = require("gulp-htmlmin");
var minifyjs = require("gulp-uglify");
var run = require("run-sequence");
var server = require("browser-sync").create();

/* Задание для очистки папки build
Команда gulp clean */

gulp.task("clean", function () {
  return del("build");
});

/* Задание для копирования файлов в папку build
Чтобы копировались не только файлы, но и папки, указываем, что базовая папка для gulp это source
Команда gulp copy */

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

/* Задание запускает препроцессор, собирает файл css, делает префиксы, миминизирует и снова сохраняет в папку build
Команда gulp style */

gulp.task("style", function () {
  gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

/* Запускаем posthtml c плагином include, чтобы автоматически вставить спрайт в html файл, минифицируем html
Команда gulp html */

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(minifyhtml({
    minifyJS: true,
    minifyURLs: true,
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true
  }))
  .pipe(gulp.dest("build"))
  .pipe(server.stream());
});

/* Запускаем минификацию изображений
Команда gulp minimg */

gulp.task('minimg', function () {
  gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img'));
});

/* Запускаем минификацию js
Команда gulp minjs */

gulp.task("minjs", function () {
  gulp.src("source/js/script.js")
  .pipe(minifyjs())
  .pipe(gulp.dest("build/js"))
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

/* Запускаем последовательно все задания
Команда npm run build */

gulp.task("build", function (done) {
  run(
  "clean",
  "copy",
  "style",
  "html",
  "minimg",
  "minjs",
  done
  );
});

/* Живой сервер разработки, отслеживает изменения в  less и html  файлах, и если фиксирует их
прогоняет через все наши зависимости и загружает страницу с изменениями
Команда gulp serve */

gulp.task("serve", function() {
  server.init({
    server: "build/"
    // notify: false,
    // open: true,
    // cors: true,
    // ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/*.js", ["js"]);
  // gulp.watch("source/*.html").on("change", server.reload);
});
