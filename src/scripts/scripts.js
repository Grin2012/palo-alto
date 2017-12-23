//Example from
// https://github.com/chrislkeller/projects.chrislkeller.com/blob/master/demos/ajax-handlebars/data-script.js

var jqueryNoConflict = jQuery;

//begin main function
jqueryNoConflict(document).ready(function(){
    retriveData();
});
//end main function

// grab data
function retriveData() {
    var dataSource = './mockapi/structure.json';
    jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
};

// render compiled handlebars template
function renderDataVisualsTemplate(data){
    handlebarsDebugHelper();
    renderHandlebarsTemplate('./partials/articles.hbs', '#articles', data);
};

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
};

// function to compile handlebars template
function renderHandlebarsTemplate(withTemplate,inElement,withData){
    getTemplateAjax(withTemplate, function(template) {
        jqueryNoConflict(inElement).html(template(withData));
    })
};

// add handlebars debugger
function handlebarsDebugHelper(){
    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);
    });
};

// Slider menu
// Example from https://www.idg.net.ua/blog/slide-menu-jquery
//
// var main = function() {
//
//     $('.header-menu').toggle(function() {
//          $('.menu-slider').animate({right: '0px'}, 200);
//          $('body').animate({right: '330'}, 200);
//      });
//
//     $('.header-menu').click(function() {
//          $('.menu-slider').animate({right: '-330'}, 200);
//          $('body').animate({right: '0px'}, 200); /
//      });
// };
// $(document).ready(main);