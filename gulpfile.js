var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var del = require('del');
var reload = browserSync.reload;

var middleware = function(_baseDir) {
  return [
    require('connect-modrewrite')(['^(.*)\.html$ $1.shtm']),
    function(req, res, next) {
      var fs = require('fs'),
        ssi = require('ssi'),
        baseDir = _baseDir,
        pathname = require('url').parse(req.url).pathname,
        filename = require('path').join(baseDir, pathname.substr(-1) === '/' ? pathname + 'index.shtm' : pathname),
        parser = new ssi(baseDir, baseDir, '/**/*.shtm');

      if (filename.indexOf('.shtm') > -1 && fs.existsSync(filename)) {
        res.end(parser.parse(filename, fs.readFileSync(filename, {encoding: 'utf8'})).contents);
      } else {
        next();
      }
    }
  ];
};

gulp.task('extras', function() {
  return gulp.src([
    '!app/*.{html,shtm}',
    'app/*.{ico,jpg,png,txt,xml}',
    'app/**/*.{json,yml,yaml}',
    'app/**/*.{html,shtm}',
    'app/**/*.{template}',
    'app/*.*'
  ], {dot: true})
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('images', function() {
  return gulp.src('app/img/**/*')
    .pipe($.cache($.imagemin({})))
    .pipe(gulp.dest('build/img'));
});

gulp.task('stylesheet', function() {
  return gulp.src('app/less/main.less')
    .pipe($.less({
      paths: [require('path').join(__dirname, 'less', 'includes')]
    }))
    .pipe($.autoprefixer({browsers: ['> 5%', 'last 2 versions', 'Firefox > 5']}))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
});

gulp.task('lint', function() {
  return gulp.src([
    '!app/js/main.js',
    'app/js/**/*.js'
  ])
    .pipe($.eslint({fix: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
    .pipe(gulp.dest('app/js'));
});

gulp.task('javascript', ['lint'], function() {
  return gulp.src([
    '!app/js/main.js',
    'app/js/**/*.js'
  ])
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream: true}));
});

gulp.task('wiredep', function() {
  return gulp.src([
    'app/*.{html,shtm}',
    'app/**/*.{html,shtm}'
  ])
    .pipe(wiredep({
      exclude: ['modernizr', 'respond'],
      ignorePath: /^(\.\.\/)*\.\.\//
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('serve', ['wiredep', 'javascript', 'stylesheet'], function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    middleware: middleware('app')
  });

  gulp.watch([
    'app/**/*.{html,shtm}',
    'app/css/**/*.css',
    'app/js/**/*.js'
  ]).on('change', reload);

  gulp.watch('app/less/**/*', ['stylesheet']);
  gulp.watch('app/js/**/*', ['javascript']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve:build', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    middleware: middleware('build')
  });
});

gulp.task('clean', del.bind(null, ['build']));

gulp.task('markup', ['javascript', 'stylesheet'], function() {
  return gulp.src([
    'app/*.{html,shtm}',
    'app/**/*.{html,shtm}'
  ])
    .pipe($.useref({
      searchPath: ['.', 'app']
    }))
    .pipe($.if('**/!(main).js', $.uglify()))
    .pipe($.if('**/!(main).css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['wiredep', 'markup', 'images', 'fonts', 'extras'], function() {
  return gulp.src('build/**/*')
    .pipe($.size({title: 'build', gzip: false}));
});

gulp.task('default', function() {
  gulp.start('build');
});