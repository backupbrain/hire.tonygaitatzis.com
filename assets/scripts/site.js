// fixme: put this all in a class
function getUrlVars() {
    var vars = [], hash;
    full_url = window.location.href;
    fragments = full_url.split("#")
    url = fragments[0]
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function tailorPageToJob(jobId) {
	job = job_info[jobId]
	setCookie("jobid", jobId)
	setCookie("company", job["company"])
	setCookie("job_title", job["job_title"])
	setCookie("search_terms", job["search_terms"])
	if ((job["company"] != "") && (job["company"] != null)) {
		$(".company").text(job["company"]);
	} else {
		$("#company_group").hide()
	}
	$('.job_title').each(function(index, element) {
		$(this).text(job["job_title"]);
	});
	if (job["industries"].length > 0) {
		industry = job["industries"][0]
		setCookie("industry", job["industries"])
		$(".industry").text(industry)
		if (industry in industry_reasons) {
			industryReason = industry_reasons[industry].replace(
				"{company}", job['company']
			)
			$(".industry_reason").text(
				industryReason
			);
			setCookie("industry_reason", industryReason)
		}
	}
}

function main() {
	id = getUrlVars("id")
	if (id["id"]in job_info) {
		tailorPageToJob(id["id"])
	} else {
		jobId = getCookie("jobid");
		if (jobId != null) {
			tailorPageToJob(jobId)
		}
	}
}
$(function() {
    main()
});