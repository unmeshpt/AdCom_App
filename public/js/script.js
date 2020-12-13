
$(document).ready($(".viewtodo").click(function (e) {
    e.preventDefault();
    var id = this.value
    modal = $('#myViewModal');
    $.getJSON('/view-todo/' + id, (todo) => {
        modal.find('[name=Id]').value(todo._id)
        modal.find('[name=Date]').value(todo.Date)
        modal.find('[name=Todo]').value(todo.Todo);
        modal.find('[name=File]').value(todo.File);
        modal.modal('show');
    });
    
}));




$(function () {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});

jQuery(document).ready(function () {
    TaskList.initTaskWidget();
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imagethumb')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function() {
    $('#datatable').DataTable();
} );

window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 3000);


function goBack() {
  window.history.back()
}


