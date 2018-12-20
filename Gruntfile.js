module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass2css: {
      options: {
        files: {
          'style/**/*.sass': ['style/**/*.sass']
        }
      },
      your_target: {
        'dist/scss': ['dist/scss']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass2scss');
  grunt.registerTask('scss', ['sass2css']);
};