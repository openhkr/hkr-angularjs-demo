var gulp = require('gulp'),
    watch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),

    // buildTS and buildSass
    assign = require('lodash.merge'),
    argv = process.argv;


gulp.task('build', ['clean'], function(done) {
    runSequence(
        ['sass', 'html', 'scripts', 'assets', 'lib'],
        function() {
            // buildBrowserify().on('end', done);
        }
    );
});


gulp.task('sass', buildSass);

gulp.task('html', copyHTML);

gulp.task('scripts', copyScripts);

gulp.task('assets', copyAssets);

gulp.task('lib', copyLib);


gulp.task('clean', function() {
    return del('dist/platform');
});

var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        files: ["app/**/*.ts","dist/platform/*.js"],
        port: 8080,
        server: {
            baseDir: './dist',
            index: "./platform/index.html"
        }
    });
    gulp.watch("app/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("app/**/*.html",['html']).on('change', browserSync.reload);
});

gulp.task('browser', ["browser-sync"]);

gulp.task('watch',function () {
    gulp.watch("app/**/*.scss", ['sass']);
    gulp.watch("app/**/*.html",['html']);
})

var concat = require('gulp-concat');
function buildSass(opts) {
    var sass = require('gulp-sass')

    var defaultOptions = {
        src: 'app/**/*.scss',
        // src: 'app/assets/css/app.scss',
        dest: 'dist/platform/css',
        sassOptions: {
            includePaths: ['app'
            ],
            outputStyle: 'expanded'
        },
        onError: function(err) {
            console.error(err.message);
            this.emit('end');
        }
    };

    opts = assign(defaultOptions, opts);

    return gulp.src(opts.src)
        .pipe(sass(opts.sassOptions))
        .pipe(concat('app.css'))
        .on('error', opts.onError)
        .pipe(gulp.dest(opts.dest));
}


function  copyHTML(opts) {
    opts.src = opts.src || 'app/**/*.html';
    opts.dest = opts.dest || 'dist/platform';

    return gulp.src(opts.src)
        .pipe(gulp.dest(opts.dest));
}

function copyScripts(opts) {
    opts.src = opts.src || 'node_modules/angular2/bundles/angular2-polyfills.js';
    opts.dest = opts.dest || 'dist/platform/js';

    return gulp.src(opts.src)
        .pipe(gulp.dest(opts.dest));
}

function copyAssets(opts) {
    opts.src = opts.src || 'app/assets/**/*';
    opts.dest = opts.dest || 'dist/platform/assets';

    return gulp.src(opts.src)
        .pipe(gulp.dest(opts.dest));
}

function copyLib(opts) {
    var result;
    result = gulp.src(['node_modules/primeng/resources/**/**/*'])
        .pipe(gulp.dest('dist/platform/lib/primeng'));
    result = gulp.src(['app/lego/**/*'])
        .pipe(gulp.dest('dist/platform/lib/lego'));
    result = gulp.src(['node_modules/jquery/dist/*'])
        .pipe(gulp.dest('dist/platform/lib/jquery'));
    result = gulp.src(['node_modules/bootstrap/dist/**/*'])
        .pipe(gulp.dest('dist/platform/lib/bootstrap'));
    result = gulp.src(['node_modules/font-awesome/css/*'])
        .pipe(gulp.dest('dist/platform/lib/font-awesome/css'));
    result = gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('dist/platform/lib/font-awesome/fonts'));
    return result;
}

