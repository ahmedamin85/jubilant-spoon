let money = 0;
let income = 0;
const maxIncomePerClick = 20;
const investments = [];
const investmentData = {
    cars: Array.from({ length: 30 }, (_, i) => ({
        name: `Car ${i + 1}`,
        cost: (i + 1) * 1000,
        income: Math.min((i + 1) * 2, maxIncomePerClick)
    })),
    houses: Array.from({ length: 30 }, (_, i) => ({
        name: `House ${i + 1}`,
        cost: (i + 1) * 2000,
        income: Math.min((i + 1) * 3, maxIncomePerClick)
    })),
    companies: Array.from({ length: 30 }, (_, i) => ({
        name: `Company ${i + 1}`,
        cost: (i + 1) * 5000,
        income: Math.min((i + 1) * 5, maxIncomePerClick)
    })),
    contracts: Array.from({ length: 30 }, (_, i) => ({
        name: `Contract ${i + 1}`,
        cost: (i + 1) * 3000,
        income: Math.min((i + 1) * 3, maxIncomePerClick)
    })),
    airplanes: Array.from({ length: 30 }, (_, i) => ({
        name: `Airplane ${i + 1}`,
        cost: (i + 1) * 10000,
        income: Math.min((i + 1) * 7, maxIncomePerClick)
    })),
};

function increaseMoney() {
    money += 1 + income;
    updateMoneyDisplay();
}

function updateMoneyDisplay() {
    document.getElementById("money-display").innerText = `$${money}`;
}

function showInvestmentOptions() {
    const category = document.getElementById("investment-select").value;
    const container = document.getElementById("investment-options");
    container.innerHTML = "";
    if (category && investmentData[category]) {
        investmentData[category].forEach((item) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "investment-option";
            optionDiv.innerHTML = `
                <span>${item.name}: $${item.cost} (Income: +$${item.income}/click)</span>
                <button onclick="buyInvestment('${category}', '${item.name}', ${item.cost}, ${item.income})">Buy</button>
            `;
            container.appendChild(optionDiv);
        });
    }
}

function buyInvestment(category, name, cost, additionalIncome) {
    if (money >= cost) {
        money -= cost;
        income = Math.min(income + additionalIncome, maxIncomePerClick);
        investments.push({ category, name, cost, additionalIncome });
        alert(`${name} purchased!`);
        updateMoneyDisplay();
        updateInventory();
    } else {
        alert("Not enough money to buy this!");
    }
}

function updateInventory() {
    const inventory = document.getElementById("inventory");
    inventory.innerHTML = investments
        .map((item) => {
            const salePrice = item.cost * 0.85;  // 15% discount on the original price
            return `
                <div>${item.name} (Income: +$${item.additionalIncome}/click)
                    <button onclick="sellInvestment('${item.name}', ${item.cost})">Sell for $${salePrice}</button>
                </div>`;
        })
        .join("");
}

function sellInvestment(name, originalCost) {
    const salePrice = originalCost * 0.85;  // 15% discount
    money += salePrice;
    investments.splice(investments.findIndex(item => item.name === name), 1);  // Remove item from investments
    alert(`Sold ${name} for $${salePrice}`);
    updateMoneyDisplay();
    updateInventory();
}
