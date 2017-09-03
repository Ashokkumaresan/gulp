var gulp=require('gulp');
var uglify=require('gulp-uglify');
var cleanCss=require('gulp-clean-css');
var pump = require('pump');
var livereload=require('gulp-livereload');
var concat=require('gulp-concat');
var autoprefixer=require('gulp-autoprefixer');
var plumber=require('gulp-plumber');
var sourcemaps=require('gulp-sourcemaps');
var less=require('gulp-less');
var Lessauto=require('less-plugin-autoprefix');
var lessautoprefix=new Lessauto();

var SCRIPTSPATH="public/scripts/**/*.js";
var STYLESPATH="public/style/**/*.css";
//Default
gulp.task("default",function(){
	console.log("Default task started");
});
//Css
gulp.task("styles",function(){
	console.log("Style task started");
	/*return gulp.src('public/style/*.css')
	.pipe(cleanCss())
	.pipe(gulp.dest('public/css')); */
	return gulp.src(['public/style/reset.css',STYLESPATH])
			.pipe(plumber(function(err){
				console.log("Error is style");
				console.log(err);
				this.emit('end');
			}))
			.pipe(sourcemaps.init())
			.pipe(autoprefixer())
			.pipe(concat('fullstyle.css'))
			.pipe(cleanCss())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('public/css'))
			.pipe(livereload());
});

//Less
gulp.task("lessconvert",function(){
	console.log("Less conversion task started");
	return gulp.src('public/less/*.less')
			.pipe(plumber(function(err){
				console.log("Error is style");
				console.log(err);
				this.emit('end');
			}))
			.pipe(sourcemaps.init())
			.pipe(less({
				plugins:[lessautoprefix]
			}))
			.pipe(cleanCss())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('public/css'))
			.pipe(livereload());
});

//Scripts
gulp.task("scripts",function(){
	console.log("Scripts task started");
  	return gulp.src('public/scripts/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('public/js'));
	//.pipe(livereload());
	/*pump([
		gulp.src('public/scripts/*.js'),
		uglify(),
		gulp.dest('public/js')
		]) */
});
//Images
gulp.task("images",function(){
	console.log("Images task started");
});

//watch
gulp.task("watch",function(){
	console.log("Started watch task");
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTSPATH,['scripts']);
	gulp.watch(STYLESPATH,['styles']);
});