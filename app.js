$(document).ready(function () {
    console.log("HW9 jQuery Loaded Successfully.")
    const name = "Marcell Kapas"
    function timeBasedGreeting(name) {
        const hour = new Date().getHours()
        let greetingPrefix
        if (hour < 12) greetingPrefix = "Good Morning, "
        else if (hour < 18) greetingPrefix = "Good Afternoon, "
        else greetingPrefix = "Good Evening, "
        return `${greetingPrefix}my name is ${name}! Welcome to my portfolio!`
    }
    $("#greetingMessage").text(timeBasedGreeting(name))
    let skills = ["Python", "Java", "C++", "HTML"]
    const renderSkills = () => {
        const $skillContainer = $("#skills .row")
        $skillContainer.empty()
        skills.forEach((skill, index) => {
            const $col = $(`
                <div class="col-md-3 col-sm-6 skill-item" data-index="${index}">
                    <div class="badge bg-primary p-3 w-100 fs-6 d-flex justify-content-between align-items-center">
                        <span class="skill-name">${skill}</span>
                        <button class="btn btn-danger btn-sm delete-skill">X</button>
                    </div>
                </div>
            `)
            $col.hide().fadeIn(300)
            $skillContainer.append($col)
        })
    }
    renderSkills()
    $("#addSkillBtn").on("click", () => {
        const newSkill = $("#newSkillInput").val().trim()
        if (!newSkill) {
            alert("Please enter a valid skill!")
            return
        }
        if (skills.includes(newSkill)) {
            alert("This skill already exists!")
            return
        }
        skills.push(newSkill)
        $("#newSkillInput").val("")
        renderSkills()
    })
    $("#skills").on("click", ".skill-name", function () {
        const index = $(this).closest(".skill-item").data("index")
        const edited = prompt("Edit skill name:", skills[index])
        if (edited && edited.trim() !== "") {
            skills[index] = edited.trim()
            renderSkills()
        }
    })
    $("#skills").on("click", ".delete-skill", function () {
        const index = $(this).closest(".skill-item").data("index")
        $(this).closest(".skill-item").slideUp(300, function () {
            skills.splice(index, 1)
            renderSkills()
        })
    })
    $("#newSkillInput").on("keydown", function (e) {
        if (e.key === "Enter") $("#addSkillBtn").click()
        if (e.key === "Escape") $(this).val("")
    })
    $("#addSkillSection").append(`
        <input type="text" id="skillSearch" class="form-control w-50 mx-auto mt-3" placeholder="Search skills...">
    `)
    $("#skillSearch").on("input", function () {
        const query = $(this).val().toLowerCase()
        $(".skill-item").each(function () {
            const skillName = $(this).find(".skill-name").text().toLowerCase()
            $(this).toggle(skillName.includes(query))
        })
    })
    const navItems = ["Summary", "Education", "Experience", "Skills", "Projects", "Contact"]
    const $navList = $(".navbar-nav")
    $navList.empty()
    navItems.forEach(item => {
        const id = item.toLowerCase()
        $navList.append(`<li class="nav-item"><a class="nav-link" href="#${id}">${item}</a></li>`)
    })
    $("a.nav-link").on("click", function (e) {
        e.preventDefault()
        const target = $(this).attr("href")
        $("html, body").animate({
            scrollTop: $(target).offset().top - 50
        }, 600)
    })
    let projects = [
        {
            title: 'Portfolio Website',
            description: 'Responsive personal website built with Bootstrap.',
            deadline: new Date("2025-02-01"),
            imageURL: 'https://via.placeholder.com/300x200'
        },
        {
            title: 'JavaScript Game',
            description: 'Web game built using JavaScript and Canvas.',
            deadline: new Date("2024-12-10"),
            imageURL: 'https://via.placeholder.com/300x200'
        },
        {
            title: 'Data Dashboard',
            description: 'Data visualization dashboard using Chart.js.',
            deadline: new Date("2025-03-15"),
            imageURL: 'https://via.placeholder.com/300x200'
        }
    ]
    const renderProjects = () => {
        const $container = $("#projects .row")
        $container.empty()
        projects.forEach(p => {
            const $card = $(`
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${p.imageURL}" class="card-img-top">
                        <div class="card-body">
                            <h5>${p.title}</h5>
                            <p>${p.description}</p>
                            <p class="text-muted">Deadline: ${p.deadline.toDateString()}</p>
                        </div>
                    </div>
                </div>
            `)
            $container.append($card.hide().fadeIn(300))
        })
    }
    renderProjects()
    $("#projects").before(`<div class="text-center mb-3"><button id="sortProjects" class="btn btn-secondary">Sort by Deadline</button></div>`)
    $("#sortProjects").on("click", () => {
        projects.sort((a, b) => a.deadline - b.deadline)
        renderProjects()
    })
    let resumeDownloadCount = 0
    let hasDownloadedResume = false
    $("footer a.btn-light").on("click", function () {
        resumeDownloadCount++
        $("#downloadCountDisplay").text(`Resume downloaded: ${resumeDownloadCount} time${resumeDownloadCount > 1 ? "s" : ""}`)
        if (!hasDownloadedResume) {
            hasDownloadedResume = true
            setTimeout(() => { alert("The resume has downloaded successfully!") }, 1500)
        }
    })
    const educationData = [
        { institution: "Northern Arizona University", degree: "B.S. in Informatics", duration: "2023 - Present" }
    ]
    const experienceData = [
        { role: "Informatics Student", description: "CS 105, 126, 136, 200, 205, 212, 305", duration: "2023 - Present" }
    ]
    const eduTable = $(`
        <table class="table table-striped table-hover align-middle text-center shadow-sm">
            <thead class="table-dark">
                <tr><th>Institution</th><th>Degree / Field</th><th>Duration</th></tr>
            </thead>
            <tbody>
                ${educationData.map(e =>
        `<tr><td>${e.institution}</td><td>${e.degree}</td><td>${e.duration}</td></tr>`
    ).join("")}
            </tbody>
        </table>
    `)
    $("#education").append(eduTable)
    const expTable = $(`
        <table class="table table-bordered align-middle text-center shadow-sm">
            <thead class="table-light fw-bold">
                <tr><th>Role</th><th>Description</th><th>Duration</th></tr>
            </thead>
            <tbody>
                ${experienceData.map(e =>
        `<tr><td>${e.role}</td><td>${e.description}</td><td>${e.duration}</td></tr>`
    ).join("")}
            </tbody>
        </table>
    `)
    $("#experience").append(expTable)
    $("#toggleThemeBtn").on("click", function () {
        $("body").toggleClass("dark-theme")
    })
    console.log("HW9 functions executed successfully.")
})