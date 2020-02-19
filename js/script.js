function myFunction() {
  let last = document.getElementById("last").value;
  let dob = document.getElementById("dob").value;
  let ssn = document.getElementById("ssn").value;
  let debtResult = document.getElementById("debtResult");
  let detailsResult = document.getElementById("detailsResult");

  $.getJSON(
    `http://localhost:3000/submit-form-get?last=${last}&dob=${dob}&ssn=${ssn}&Submitted=Submit`,
    function(result) {
      $.each(result, function(i, field) {
        debtResult.innerHTML = `$${field.debt}`;
        detailsResult.innerHTML = `${field.details}`;
      });
    }
  );
}
