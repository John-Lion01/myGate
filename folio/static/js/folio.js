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
    load_image();
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
    html.querySelector("a.act-web").style.display = "none";
    html.querySelector("a.act-git").style.display = "none";
    if (data["web"].length > 10) {
        html.querySelector("a.act-web").setAttribute("src", data["web"]);
        html.querySelector("a.act-web").style.display = 'flex';
    } 
    if (data["github"].length > 10) {
        html.querySelector("a.act-git").setAttribute("src", data["github"]);
            html.querySelector("a.act-git").style.display = "flex";
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
    document.addEventListener("keydown", (e) =>{
        if (e.code == "Escape") {
            detail.classList.remove("show");
            document.querySelector(".folio.content").classList.remove("hide-root");
            document.body.style.overflow = "";
            cur_project = 0
        }
    });
}
// chevron
function chevron(){
    const ch_l = document.querySelector(".chevron.left");
    const ch_r = document.querySelector(".chevron.right");
    ch_l.addEventListener("click", (e) =>{
        e.preventDefault();
        cur_project = (cur_project - 1 + all_projects.length)%all_projects.length
        show_project();
    });

    ch_r.addEventListener("click", (e) =>{
        e.preventDefault();
        cur_project = (cur_project + 1)%all_projects.length
        show_project();
    });

    const det_html = document.querySelector(".project-detail");
    document.addEventListener("keydown", (e)=>{
        if (e.code == "ArrowLeft" || e.code == "Numpad4") {
            if (det_html.classList.contains("show")) {
                e.preventDefault();
                cur_project = (cur_project - 1 + all_projects.length)%all_projects.length
                show_project();
            }
        } else if (e.code == "ArrowRight" || e.code == "Numpad6") {
            if (det_html.classList.contains("show")) {
                e.preventDefault();
                cur_project = (cur_project + 1)%all_projects.length
                show_project();
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", (r) => {
    chevron();
});

function load_image() {
    const main_image = document.querySelector("img.msh-image");
    const thumbs = document.querySelectorAll(".project-thumbs img");
    thumbs.forEach(img => {
        img.addEventListener("mouseover", (e) => {
            main_image.setAttribute(
                "src",
                img.getAttribute("src")
            );
        })
    })
}
