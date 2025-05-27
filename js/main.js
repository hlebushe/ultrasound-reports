$(document).ready(function() {
    // populate current date
    document.getElementById('currentDate').value = getCurrentDate();

    // add technicalConditionsSelect listener
    $('#technicalConditionsSelect').change(function() {
        var selectedIndex = $(this).prop('selectedIndex');
        if (selectedIndex === 0) {
            $('#limitedTechnicalConditionsForm').hide();
        } else {
            $('#limitedTechnicalConditionsForm').show();
        }
    });
});

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function printPage() {
    // change title (title will be used as filename when saving to pdf from browser)
    var patientFullName = $('#patientFullName').val();
    var currentDate = getCurrentDate().replaceAll('/', '.');
    var pageName = window.location.pathname.split("/").pop().replace(".html", "");
    document.title = patientFullName + " - " + currentDate + " - " + pageName;

    // hide print button
    $('#printButton').hide();

    // hide select and add text value of select instead of it
    $('select').each(function() {
        var selectedValue = $(this).find('option:selected').text(); // Get the selected text value
        var textNode = $('<span>').addClass('replacedSelectText').addClass('text-medium').text(selectedValue); // Create a span with class and selected value

        $(this).hide(); // Hide the select element
        $(this).after(textNode); // Insert the span after the select element
    });

    // hide input and add text value of input instead of it
    $('input:not([type="checkbox"])').each(function() {
        var inputValue = $(this).val();
        var textNode = $('<span>').addClass('replacedInputText').addClass('text-medium').text(inputValue);

        $(this).hide(); // Hide the input element
        $(this).after(textNode); // Insert the span after the input element
    });

    // checkbox handling
    $('input[type="checkbox"]').each(function () {
        // hide checkbox label if checkbox for this label is not checked
        if (!this.checked) {
            $(this).closest('label').hide();
        }
        // hide the checkbox element itself
        $(this).hide();
    });

    // hide textarea and add text value of textarea after it
    $('textarea').each(function() {
        var inputValue = $(this).val();
        var textNode = $('<span>').addClass('replacedTextareaText').addClass('text-medium').text(inputValue);

        $(this).hide(); // Hide the textarea element
        $(this).after(textNode); // Insert the span after the input element
    });


    window.print();
    revertChangesAfterPrint();
}

function revertChangesAfterPrint() {
    // show print button
    $('#printButton').show();

    // show all hidden selects
    $('select').show();
    // remove all text elements which were added
    $('.replacedSelectText').remove();

    // show all hidden inputs
    $('input').show();
    // remove all text elements which were added
    $('.replacedInputText').remove();

    // checkbox restore
    $('input[type="checkbox"]').each(function () {
        // show checkbox labels
        $(this).closest('label').show();
        // show the checkbox element itself
        $(this).show();
    });

    // show all hidden textareas
    $('textarea').show();
    // remove all text elements which were added
    $('.replacedTextareaText').remove();
}
