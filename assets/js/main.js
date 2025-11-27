// Config & State
const username = "jrtkl";
const hostname = "portfolio";
let currentPath = []; 
const history = [];
let historyIndex = -1;

// File System
const fileSystem = {
    "root": {
        "about.txt": `Hi, I'm JR Torikul.\nI am a Network Engineer and Co-Founder of BongoLab IT.\nI’m passionate about building reliable networks, optimizing connectivity, and creating efficient tech solutions.`,
        "skills.txt": `SKILLS:\n--------------------\n[Certifications] CompTIA A+, RHCSA (running), CCNA (running), MTCNA (running)\n[Networking] Cisco Networking Academy, MikroTik Training & Certification\n[Server] RHEL, Windows Server\n[Systems] Red Hat Enterprise Linux, Fedora Linux, AlmaLinux OS, Rocky Linux, Ubuntu Linux (Primary)\n[Languages] C, Python, Java, PHP\n[Web] HTML, CSS, JavaScript, Web Design\n[Databases] MySQL\n[Graphics] Graphic Design`,

        "networks.txt": `Currently managing a broadband business with 25+ active users.\nExperience in ISP routing, static IP setups, and fiber infrastructure.`,
        "contact": {
             "email.txt": "Email: jrtkl2005@gmail.com",
             "facebook.txt": "https://www.facebook.com/jrtkl"
        },
        "projects": {
            "bongolab-network.md": "Managed ISP network setup and routing for BongoLab IT.",
            "waydroid-research.md": "Deep dive into Waydroid internals and containerization on Linux.",
            "portfolio-site.md": "This terminal-based portfolio website built with vanilla JS."
        }
    }
};


const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const promptLabel = document.getElementById('prompt-label');


window.onload = function() {
    printNeofetch();
    if (!hasSelection()) {
        commandInput.focus();
    }
};

function hasSelection() {
    const selection = window.getSelection();
    return selection.type === 'Range' && selection.toString().length > 0;
}


document.addEventListener('mouseup', function(e) {
    if (hasSelection()) return;
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    commandInput.focus();
});


function execLink(cmd) {
    commandInput.value = cmd;
    handleCommand(cmd);
}


commandInput.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
        if (!hasSelection()) {
            e.preventDefault();
            printLine(`<span style="color:var(--prompt-user)">${username}@${hostname}</span>:<span style="color:var(--prompt-path)">${getPathString()}</span>$ ${this.value}^C`, 'cmd-history');
            this.value = '';
            scrollToBottom();
            return;
        }

    }

    if (e.key === 'Enter') {
        const cmd = this.value.trim();
        if (cmd) {
            history.push(cmd);
            historyIndex = history.length;
            printLine(`<span style="color:var(--prompt-user)">${username}@${hostname}</span>:<span style="color:var(--prompt-path)">${getPathString()}</span>$ ${cmd}`, 'cmd-history');
            handleCommand(cmd);
        } else {
            printLine(`<span style="color:var(--prompt-user)">${username}@${hostname}</span>:<span style="color:var(--prompt-path)">${getPathString()}</span>$`, 'cmd-history');
        }
        this.value = '';
        scrollToBottom();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = history[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
            historyIndex++;
            this.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            this.value = '';
        }
    }
});

function getPathString() {
    return currentPath.length === 0 ? "~" : "~/" + currentPath.join("/");
}

function updatePrompt() {
    let pathStr = currentPath.length === 0 ? "" : "/" + currentPath.join("/");
    promptLabel.innerHTML = `<span style="color:var(--prompt-user)">${username}@${hostname}</span>:<span style="color:var(--prompt-path)">${pathStr}</span>$`;
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

function printLine(html, className = '') {
    const div = document.createElement('div');
    if (className) div.className = className;
    div.innerHTML = html;
    outputDiv.appendChild(div);
}


function printNeofetch() {
    const html = `
    <div class="neofetch-container">
        <div class="neofetch-img">
            <img src="assets/img/profile.jpeg" alt="Profile">
        </div>
        <div class="neofetch-info">
            <div class="neo-title">jrtkl@portfolio</div>
            <div class="neo-sep">------------------------------</div>
            
            <div class="neo-row"><span class="neo-key">User:</span><span class="neo-val">JR Torikul Islam</span></div>
            <div class="neo-row"><span class="neo-key">Education:</span><span class="neo-val">Diploma in Engineering(in progress)</span></div>
            <div class="neo-row"><span class="neo-key">Institute:</span><span class="neo-val">Institute of Science & Information Technology(ISIT)</span></div>
            <div class="neo-row"><span class="neo-key">Career Path:</span><span class="neo-val">CCIE, RHCA, MTCINE (in progress)</span></div>
            <div class="neo-row"><span class="neo-key">Systems:</span><span class="neo-val">Linux Based</span></div>
            <div class="neo-row"><span class="neo-key">Mastering:</span><span class="neo-val">Linux kernel behavior, system internals, TCP/IP stack, advanced routing, packet inspection, QoS & traffic shaping, security hardening, enterprise network design & architecture</span></div>

            
        </div>
    </div>
    `;
    printLine(html);
}

function handleCommand(cmdInput) {
    const parts = cmdInput.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch(cmd) {
        case 'help':
            const commands = ["help", "neofetch", "about", "skills", "projects", "social", "contact", "github", "history", "clear", "ls", "cd", "cat", "whoami", "gui"];
            printLine(`<div class="help-grid">${commands.map(c => `<span class="exec">${c}</span>`).join('')}</div>`, 'output-content');
            break;

        case 'neofetch':
            printNeofetch();
            break;

        case 'about':
            printLine(fileSystem["root"]["about.txt"].replace(/\n/g, "<br>"), 'output-content');
            break;
 case 'contact':
    printLine(`Email: <a href="mailto:jrtkl2005@gmail.com" class="txt-green">jrtkl2005@gmail.com</a><br>Facebook: <a href="https://www.facebook.com/jrtkl" target="_blank" class="txt-green">https://www.facebook.com/jrtkl</a>`, 'output-content');
    break;
        
        case 'skills':
            printLine(fileSystem["root"]["skills.txt"].replace(/\n/g, "<br>"), 'output-content');
            break;

        case 'projects':
            printLine(`Listing projects directory:<br>${Object.keys(fileSystem["root"]["projects"]).map(f => `<span class="file">${f}</span>`).join("   ")}<br><span class="txt-green">Tip: use 'cd projects' then 'cat &lt;filename&gt;'</span>`, 'output-content');
            break;



        case 'social':
            printLine(`Facebook: <a href="https://facebook.com/jrtkl" target="_blank" class="txt-green">https://facebook.com/jrtkl</a><br>Github: <a href="https://github.com/jrtkl44" target="_blank" class="txt-green">https://github.com/jrtkl44</a>`, 'output-content');
            break;

        case 'github':
            printLine(`Opening GitHub...`, 'output-content');
            window.open('https://github.com/jrtkl44', '_blank');
            break;

        case 'history':
            printLine(history.map((c, i) => `${i + 1}  ${c}`).join('<br>'), 'output-content');
            break;

        case 'clear':
            outputDiv.innerHTML = '';
            break;

        case 'ls':
            handleLs();
            break;

        case 'cd':
            handleCd(args[0]);
            break;

        case 'cat':
            handleCat(args[0]);
            break;

        case 'whoami':
            printLine(`JR Torikul – Network engineer & co-founder of BongoLab IT.`, 'output-content');
            break;

        case 'gui':
            window.open("https://jrtkl-gui.netlify.app", "_blank");
            break;

        default:
            printLine(`<span class="txt-red">Command not found: ${cmd}</span>. Type 'help'.`, 'output-content');
    }
    scrollToBottom();
}


function getCurrentDirObj() {
    if (currentPath.length === 0) return fileSystem["root"];
    let current = fileSystem["root"];
    for (let dir of currentPath) {
        current = current[dir];
    }
    return current;
}

function handleLs() {
    const dirObj = getCurrentDirObj();
    const items = Object.keys(dirObj).map(item => typeof dirObj[item] === 'string' ? `<span class="file">${item}</span>` : `<span class="dir">${item}/</span>`);
    printLine(items.join('   '), 'output-content');
}

function handleCd(target) {
    if (!target || target === '~') {
        currentPath = [];
    } else if (target === '..') {
        if (currentPath.length > 0) currentPath.pop();
    } else {
        const dirObj = getCurrentDirObj();
        if (dirObj[target] && typeof dirObj[target] === 'object') {
            currentPath.push(target);
        } else {
            printLine(`<span class="txt-red">cd: ${target}: No such directory</span>`, 'output-content');
            return;
        }
    }
    updatePrompt();
}

function handleCat(filename) {
    if (!filename) { printLine("Usage: cat <filename>", 'output-content'); return; }
    const dirObj = getCurrentDirObj();
    if (dirObj[filename] && typeof dirObj[filename] === 'string') {
        printLine(dirObj[filename].replace(/\n/g, "<br>"), 'output-content');
    } else {
        printLine(`<span class="txt-red">cat: ${filename}: No such file or is a directory</span>`, 'output-content');
    }
}
