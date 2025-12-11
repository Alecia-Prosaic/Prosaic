// 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    // 粒子配置
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4285f4" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4285f4",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // 观察所有卡片和节点
    document.querySelectorAll('.service-card, .node, .demo-step').forEach(el => {
        observer.observe(el);
    });

    // 演示交互
    const demoSteps = document.querySelectorAll('.demo-step');
    const demoScreens = document.querySelectorAll('.demo-screen');

    demoSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            
            // 更新活动状态
            demoSteps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的屏幕
            demoScreens.forEach(screen => {
                screen.classList.remove('active');
                if (screen.classList.contains(`screen-${stepNumber}`)) {
                    screen.classList.add('active');
                }
            });
            
            // 触发动画
            animateDemoStep(stepNumber);
        });
    });

    // 联系表单
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your request has been submitted to Google Cloud.');
            this.reset();
        });
    }

    // 动态交易流
    createTransactionStream();
});

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// 演示步骤动画
function animateDemoStep(step) {
    const screen = document.querySelector(`.screen-${step}`);
    if (!screen) return;

    switch(step) {
        case '1':
            // 模拟银行交易流
            simulateBankTransactions();
            break;
        case '2':
            // AI处理动画
            animateAIProcessing();
            break;
        case '3':
            // 报告生成
            generateReport();
            break;
        case '4':
            // 客户批准
            simulateApproval();
            break;
    }
}

// 创建交易流
function createTransactionStream() {
    const stream = document.querySelector('.transaction-stream');
    if (!stream) return;

    const transactions = [
        { type: 'income', amount: '$1,250.00', desc: 'Freelance Payment' },
        { type: 'expense', amount: '$89.99', desc: 'Software Subscription' },
        { type: 'expense', amount: '$45.50', desc: 'Office Supplies' },
        { type: 'income', amount: '$3,000.00', desc: 'Client Invoice' },
        { type: 'expense', amount: '$22.30', desc: 'Bank Fee' }
    ];

    transactions.forEach((tx, i) => {
        const element = document.createElement('div');
        element.className = `transaction ${tx.type}`;
        element.innerHTML = `
            <span class="tx-desc">${tx.desc}</span>
            <span class="tx-amount">${tx.amount}</span>
        `;
        element.style.animationDelay = `${i * 0.2}s`;
        stream.appendChild(element);
    });
}

// 模拟交易
function simulateBankTransactions() {
    const stream = document.querySelector('.transaction-stream');
    if (!stream) return;

    // 清除现有交易
    stream.innerHTML = '';
    
    // 添加新交易
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const tx = document.createElement('div');
            tx.className = `transaction ${Math.random() > 0.5 ? 'income' : 'expense'}`;
            tx.innerHTML = `
                <span class="tx-desc">Transaction ${i+1}</span>
                <span class="tx-amount">$${(Math.random() * 1000).toFixed(2)}</span>
            `;
            stream.appendChild(tx);
            
            // 移除旧交易
            if (stream.children.length > 5) {
                stream.removeChild(stream.firstChild);
            }
        }, i * 500);
    }
}

// AI处理动画
function animateAIProcessing() {
    const container = document.querySelector('.ai-processing');
    if (!container) return;

    container.innerHTML = '';
    
    // 创建AI处理可视化
    for (let i = 0; i < 5; i++) {
        const node = document.createElement('div');
        node.className = 'ai-node';
        node.style.left = `${20 + i * 15}%`;
        node.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(node);
        
        // 添加连接线
        if (i > 0) {
            const line = document.createElement('div');
            line.className = 'ai-connection';
            line.style.left = `${20 + (i-1) * 15 + 7.5}%`;
            container.appendChild(line);
        }
    }
    
    // 添加标签
    const labels = ['Raw Data', 'AI Processing', 'Categorized', 'Validated', 'Ready'];
    labels.forEach((label, i) => {
        const labelEl = document.createElement('div');
        labelEl.className = 'ai-label';
        labelEl.textContent = label;
        labelEl.style.left = `${20 + i * 15}%`;
        labelEl.style.transform = 'translateX(-50%)';
        container.appendChild(labelEl);
    });
}

// 报告生成动画
function generateReport() {
    // 模拟报告生成进度
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
        <div class="progress-fill" style="width: 0%"></div>
        <div class="progress-text">Generating GST Report...</div>
    `;
    
    const container = document.querySelector('.screen-3');
    if (container) {
        container.innerHTML = '';
        container.appendChild(progressBar);
        
        // 动画进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            const fill = progressBar.querySelector('.progress-fill');
            fill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    container.innerHTML = `
                        <div class="report-complete">
                            <i class="fas fa-check-circle"></i>
                            <h3>Report Generated!</h3>
                            <p>GST Return ready for review</p>
                        </div>
                    `;
                }, 500);
            }
        }, 100);
    }
}

// 客户批准模拟
function simulateApproval() {
    const container = document.querySelector('.screen-4');
    if (!container) return;

    container.innerHTML = `
        <div class="approval-flow">
            <div class="approval-step active">
                <div class="step-icon"><i class="fas fa-envelope"></i></div>
                <h4>Sent to Client</h4>
            </div>
            <div class="approval-connector"></div>
            <div class="approval-step">
                <div class="step-icon"><i class="fas fa-eye"></i></div>
                <h4>Client Reviewing</h4>
            </div>
            <div class="approval-connector"></div>
            <div class="approval-step">
                <div class="step-icon"><i class="fas fa-check"></i></div>
                <h4>Approved</h4>
            </div>
        </div>
    `;

    // 模拟批准流程
    const steps = container.querySelectorAll('.approval-step');
    let currentStep = 0;

    const progress = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(progress);
        }
    }, 1000);
}

// 添加CSS到头部
function addDemoCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .transaction {
            background: white;
            padding: 10px 20px;
            margin: 10px 0;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .transaction.income { border-left: 4px solid #34a853; }
        .transaction.expense { border-left: 4px solid #ea4335; }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .ai-node {
            width: 40px;
            height: 40px;
            background: var(--gradient);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            animation: pulse 1s infinite;
        }
        
        .ai-connection {
            position: absolute;
            top: 50%;
            height: 2px;
            width: 15%;
            background: var(--primary);
            transform: translateY(-50%);
        }
        
        .ai-label {
            position: absolute;
            top: 70%;
            font-size: 0.8rem;
            color: var(--text-light);
        }
        
        .progress-bar {
            width: 80%;
            height: 20px;
            background: #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            margin: 100px auto;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient);
            transition: width 0.3s;
        }
        
        .progress-text {
            position: absolute;
            top: -30px;
            width: 100%;
            text-align: center;
            font-weight: 600;
            color: var(--text);
        }
        
        .report-complete {
            text-align: center;
            padding: 50px;
        }
        
        .report-complete i {
            font-size: 4rem;
            color: #34a853;
            margin-bottom: 20px;
        }
        
        .approval-flow {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px;
        }
        
        .approval-step {
            text-align: center;
            opacity: 0.3;
            transition: opacity 0.3s;
        }
        
        .approval-step.active {
            opacity: 1;
        }
        
        .step-icon {
            width: 60px;
            height: 60px;
            background: var(--gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }
        
        .step-icon i {
            color: white;
            font-size: 1.5rem;
        }
        
        .approval-connector {
            width: 50px;
            height: 2px;
            background: var(--primary);
            margin: 0 20px;
        }
    `;
    document.head.appendChild(style);
}

// 初始化CSS
addDemoCSS();
