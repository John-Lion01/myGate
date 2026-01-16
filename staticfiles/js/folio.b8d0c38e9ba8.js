// voir project detail
const project_list = document.querySelectorAll(".card.proj");
const grid_p = document.querySelector(".grid.project")
const all_projects = JSON.parse(grid_p.dataset.allproject);
var cur_project = 0;

function show_project() {    
    const data = all_projects[cur_project];
    // console.log(data.title, data.tools);
    const proj_detail = fill_project(data);
    set_detail(proj_detail);
    // console.log(document.querySelector(".folio.content.hide"));
    // chevron();
    attendre_fermeture(proj_detail);
}

function fill_project(data) {
    const html = document.querySelector(".project-detail");
    // main image
    html.querySelector("img.msh-image").setAttribute("src", data["main_image"]);
    // thumbs    
    html.querySelector(".project-thumbs").textContent = "";
    if (data["images"].length > 1) {
        data["images"].forEach(im_t => {
            const im_tel = document.createElement("img");
            im_tel.setAttribute("src", im_t);
            im_tel.setAttribute("width", "80px")
            html.querySelector(".project-thumbs").appendChild(im_tel);
            // console.log(im_tel);
        });
    }

    // project title & description
    html.querySelector("h3.psh-title").textContent = data["title"];
    html.querySelector("p.psh-desc").textContent = data["description"];

    // tools
    html.querySelector(".project-tools").textContent = "";
    data["tools"].forEach(tool => {
        const span = document.createElement("span");
        span.textContent = tool;
        html.querySelector(".project-tools").appendChild(span);
    });

    // web et github
    if (data["web"].length < 10) {
        html.querySelector("a.act-web").setAttribute("src", data["web"]);
    }
    if (data["github"].length < 10) {
        html.querySelector("a.act-git").setAttribute("src", data["github"]);
    }
    // console.log(html);
    return html
}
function set_detail(detail) {
    detail.classList.add("show");
    document.querySelector(".folio.content").classList.add("hide-root");
    document.body.style.overflow = "hidden";
}

// event
project_list.forEach(el => {
    el.querySelector("img").addEventListener("click", e => {
        cur_project = JSON.parse(el.dataset.num);
        show_project();        
    });
    el.querySelector("a.det").addEventListener("click", e => {
        e.preventDefault();
        cur_project = JSON.parse(el.dataset.num);
        show_project();
    });
} );

function attendre_fermeture(detail){
    document.addEventListener("click", (e) => {
        // console.log(e.target)
        if (e.target.classList.contains("hide-root")) {
            detail.classList.remove("show");
            document.querySelector(".folio.content").classList.remove("hide-root");
            document.body.style.overflow = "";
            cur_project = 0
        }
    })
}
// chevron
function chevron(){
    const ch_l = document.querySelector(".chevron.left");
    const ch_r = document.querySelector(".chevron.right");
    ch_l.addEventListener("click", (e) =>{
        e.preventDefault();
        cur_project = (cur_project - 1 + all_projects.length)%all_projects.length
        console.log("left" + cur_project);
        show_project();
        setTimeout(() => {
            
        }, 5);
    });

    ch_r.addEventListener("click", (e) =>{
        e.preventDefault();
        cur_project = (cur_project + 1)%all_projects.length
        console.log("right => " + cur_project);
        show_project();
    });
}

document.addEventListener("DOMContentLoaded", (r) => {
    chevron();
});