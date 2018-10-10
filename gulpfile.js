var gulp = require('gulp')
var less = require('gulp-less')
var cssmin = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var htmlmin = require('gulp-htmlmin')

gulp.task('css-min',function() {
	gulp.src('src/less/*.less')
	    .pipe(less())
	    .pipe(cssmin())
	    .pipe(gulp.dest('dist/css'))
})

gulp.task('js-min',function() {
	gulp.src('src/js/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/js'))
})

gulp.task('img-min',function() {
	gulp.src('src/img/*.{png,jpg,gif,ico}')
	    .pipe(imagemin())
	    .pipe(gulp.dest('dist/img'))
})

gulp.task('html-min',function() {
	var options = {
		removeComments:true,  //清除HTML注释
		collapseWhitespace:true,  //压缩HTML
		collapseBooleanAttributes:true,  //省略布尔属性的值 <input checked='true'/>   ==> <input/>
		removeEmptyAttributes:true,  //删除所有空格做属性值  <input id=''>   ==> <input/>
		removeScriptTypeAttributes:true,   //删除script标签的 type='text/javascript'
		removeStyleLinkTypeAttributes:true,  //删除link和style标签的 type='text/css'
		minifyJS:true,  //压缩页面js
		minifyCSS:true  //压缩页面css
	}
	gulp.src('src/*.html')
	    .pipe(htmlmin(options))
	    .pipe(gulp.dest('dist'))
})

gulp.task('watcher',function() {
	gulp.watch('src/js/*.js',['js-min'])
	gulp.watch('src/less/*.less',['css-min'])
	gulp.watch('src/img/*.{png,jpg,gif,ico}',['img-min'])
	gulp.watch('src/*.html',['html-min'])
})

gulp.task('default',['watcher'])
