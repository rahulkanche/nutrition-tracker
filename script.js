// Initialize
let currentWeek = '3-4';
let mealData = {};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    populateDropdowns();
    updateTargets();
});

// Populate all dropdowns
function populateDropdowns() {
    // Breakfast Main
    populateSelect('b1', 'Breakfast Main');
    // Breakfast Fruits
    populateSelect('b3', 'Fruit');
    // Breakfast Nuts
    populateSelect('b4', 'Nuts');
    
    // Lunch
    populateSelect('l1', 'Grain');
    populateSelect('l2', 'Dal');
    populateSelect('l3', 'Main Protein');
    
    // Pre-workout
    populateSelect('pw1', 'Pre-Workout');
    
    // Post-workout carb
    populateSelect('po2', 'Post-Carb');
    
    // Dinner
    populateSelect('d1', 'Grain');
    populateSelect('d2', 'Dal');
    populateSelect('d3', 'Main Protein');
}

function populateSelect(id, category) {
    const select = document.getElementById(id);
    if (!select) return;
    
    const foods = FOOD_DATABASE.filter(f => f.category === category);
    foods.forEach(food => {
        const option = document.createElement('option');
        option.value = food.name;
        option.textContent = food.name;
        select.appendChild(option);
    });
}

function updateTargets() {
    currentWeek = document.getElementById('week').value;
    const t = TARGETS[currentWeek].daily;
    document.getElementById('target-p').textContent = t.protein + 'g';
    document.getElementById('target-c').textContent = t.carbs + 'g';
    document.getElementById('target-cal').textContent = t.calories;
}

// MAIN CALCULATION FUNCTION
function calculate() {
    mealData = {};
    calculateBreakfast();
    calculateLunch();
    calculatePreWorkout();
    calculatePostWorkout();
    calculateDinner();
    updateDailySummary();
}

// BREAKFAST CALCULATION
function calculateBreakfast() {
    const t = TARGETS[currentWeek].breakfast; // 30P, 75C
    
    const main = document.getElementById('b1').value;
    const fruit = document.getElementById('b3').value;
    const nuts = document.getElementById('b4').value;
    
    if (!main || !fruit) {
        clearMeal('b', 4);
        return;
    }
    
    const mainFood = FOOD_DATABASE.find(f => f.name === main);
    const fruitFood = FOOD_DATABASE.find(f => f.name === fruit);
    const nutsFood = nuts ? FOOD_DATABASE.find(f => f.name === nuts) : null;
    
    // Milk is FIXED at 200ml
    const milkP = 7.0, milkC = 10.0, milkF = 3.0;
    
    let mainQty, fruitQty, nutsQty = 0;
    
    if (nutsFood) {
        // WITH nuts: reduce main and fruit, add nuts
        nutsQty = 15; // Fixed 15g nuts
        const nutsP = (15/100) * nutsFood.protein;
        const nutsC = (15/100) * nutsFood.carbs;
        
        const remainP = t.protein - milkP - nutsP;
        const remainC = t.carbs - milkC - nutsC;
        
        // Distribute between main and fruit
        // Main has more protein, fruit has more carbs
        const mainRatio = 0.6; // 60% of remaining from main
        const fruitRatio = 0.4; // 40% from fruit
        
        mainQty = (remainC * mainRatio / mainFood.carbs) * 100;
        fruitQty = (remainC * fruitRatio / fruitFood.carbs) * 100;
        
    } else {
        // NO nuts: higher quantities of main and fruit
        const remainP = t.protein - milkP;
        const remainC = t.carbs - milkC;
        
        // 65% carbs from main, 35% from fruit
        mainQty = (remainC * 0.65 / mainFood.carbs) * 100;
        fruitQty = (remainC * 0.35 / fruitFood.carbs) * 100;
    }
    
    // Round quantities
    mainQty = Math.round(mainQty);
    fruitQty = Math.round(fruitQty);
    
    // Display
    displayItem('b1', mainQty, mainFood);
    displayItem('b2', 200, {name: 'Milk', protein: 3.5, carbs: 5.0, fats: 1.5, calories: 45}); // 200ml
    displayItem('b3', fruitQty, fruitFood);
    if (nutsFood) displayItem('b4', nutsQty, nutsFood);
    else clearItem('b4');
    
    // Calculate total
    let totalP = milkP + (mainQty/100)*mainFood.protein + (fruitQty/100)*fruitFood.protein;
    let totalC = milkC + (mainQty/100)*mainFood.carbs + (fruitQty/100)*fruitFood.carbs;
    let totalF = milkF + (mainQty/100)*mainFood.fats + (fruitQty/100)*fruitFood.fats;
    let totalCal = (200/100)*45 + (mainQty/100)*mainFood.calories + (fruitQty/100)*fruitFood.calories;
    
    if (nutsFood) {
        totalP += (nutsQty/100)*nutsFood.protein;
        totalC += (nutsQty/100)*nutsFood.carbs;
        totalF += (nutsQty/100)*nutsFood.fats;
        totalCal += (nutsQty/100)*nutsFood.calories;
    }
    
    displayTotal('b', totalP, totalC, totalF, totalCal);
    displayStatus('b', totalP, totalC, t.protein, t.carbs);
    
    mealData.breakfast = {totalP, totalC, totalF, totalCal};
}

// LUNCH CALCULATION
function calculateLunch() {
    const t = TARGETS[currentWeek].lunch; // 40P, 110C
    
    const grain = document.getElementById('l1').value;
    const dal = document.getElementById('l2').value;
    const protein = document.getElementById('l3').value;
    
    if (!grain || !dal || !protein) {
        clearMeal('l', 5);
        return;
    }
    
    const grainFood = FOOD_DATABASE.find(f => f.name === grain);
    const dalFood = FOOD_DATABASE.find(f => f.name === dal);
    const proteinFood = FOOD_DATABASE.find(f => f.name === protein);
    
    // FIXED: Vegetables 120g, Curd 150g
    const vegP = 1.9, vegC = 7.9, vegF = 0.2;
    const curdP = 6.0, curdC = 6.6, curdF = 4.7;
    
    const fixedP = vegP + curdP;
    const fixedC = vegC + curdC;
    
    const remainP = t.protein - fixedP;
    const remainC = t.carbs - fixedC;
    
    // Protein distribution: 50% from main protein, 30% from dal, 20% from grain
    const proteinTargetP = remainP * 0.50;
    const dalTargetP = remainP * 0.30;
    const grainTargetP = remainP * 0.20;
    
    let proteinQty = (proteinTargetP / proteinFood.protein) * 100;
    let dalQty = (dalTargetP / dalFood.protein) * 100;
    let grainQty = (grainTargetP / grainFood.protein) * 100;
    
    // Now check carbs
    let carbsAchieved = (proteinQty/100)*proteinFood.carbs + 
                        (dalQty/100)*dalFood.carbs + 
                        (grainQty/100)*grainFood.carbs;
    
    const carbGap = remainC - carbsAchieved;
    
    if (carbGap > 0) {
        // Need more carbs - add to grain (highest carb)
        grainQty += (carbGap / grainFood.carbs) * 100;
    }
    
    // Round
    grainQty = Math.round(grainQty);
    dalQty = Math.round(dalQty);
    proteinQty = Math.round(proteinQty);
    
    // Display
    displayItem('l1', grainQty, grainFood);
    displayItem('l2', dalQty, dalFood);
    displayItem('l3', proteinQty, proteinFood);
    // Vegetables and Curd already displayed as fixed
    
    // Calculate total
    const totalP = (grainQty/100)*grainFood.protein + (dalQty/100)*dalFood.protein + 
                   (proteinQty/100)*proteinFood.protein + vegP + curdP;
    const totalC = (grainQty/100)*grainFood.carbs + (dalQty/100)*dalFood.carbs + 
                   (proteinQty/100)*proteinFood.carbs + vegC + curdC;
    const totalF = (grainQty/100)*grainFood.fats + (dalQty/100)*dalFood.fats + 
                   (proteinQty/100)*proteinFood.fats + vegF + curdF;
    const totalCal = (grainQty/100)*grainFood.calories + (dalQty/100)*dalFood.calories + 
                     (proteinQty/100)*proteinFood.calories + 35 + 93;
    
    displayTotal('l', totalP, totalC, totalF, totalCal);
    displayStatus('l', totalP, totalC, t.protein, t.carbs);
    
    mealData.lunch = {totalP, totalC, totalF, totalCal};
}

// PRE-WORKOUT CALCULATION
function calculatePreWorkout() {
    const t = TARGETS[currentWeek].preworkout; // 30C only
    
    const food = document.getElementById('pw1').value;
    if (!food) {
        clearMeal('pw', 1);
        document.getElementById('pw-warning').style.display = 'none';
        return;
    }
    
    const foodData = FOOD_DATABASE.find(f => f.name === food);
    
    // Calculate quantity to hit 30g carbs
    const qty = Math.round((t.carbs / foodData.carbs) * 100);
    
    displayItem('pw1', qty, foodData);
    
    const totalP = (qty/100) * foodData.protein;
    const totalC = (qty/100) * foodData.carbs;
    const totalF = (qty/100) * foodData.fats;
    const totalCal = (qty/100) * foodData.calories;
    
    displayTotal('pw', totalP, totalC, totalF, totalCal);
    
    // Warning if contains protein/fat
    if (totalP > 1 || totalF > 1) {
        document.getElementById('pw-warning').style.display = 'block';
    } else {
        document.getElementById('pw-warning').style.display = 'none';
    }
    
    mealData.preworkout = {totalP, totalC, totalF, totalCal};
}

// POST-WORKOUT CALCULATION
function calculatePostWorkout() {
    const t = TARGETS[currentWeek].postworkout; // 25P, 25C
    
    // Whey is FIXED 30g
    const wheyP = 24.0, wheyC = 3.0, wheyF = 1.5, wheyCal = 123;
    
    const carb = document.getElementById('po2').value;
    if (!carb) {
        clearMeal('po', 2);
        return;
    }
    
    const carbFood = FOOD_DATABASE.find(f => f.name === carb);
    
    // Need 25-3 = 22g more carbs
    const carbQty = Math.round(((t.carbs - wheyC) / carbFood.carbs) * 100);
    
    displayItem('po2', carbQty, carbFood);
    
    const totalP = wheyP + (carbQty/100)*carbFood.protein;
    const totalC = wheyC + (carbQty/100)*carbFood.carbs;
    const totalF = wheyF + (carbQty/100)*carbFood.fats;
    const totalCal = wheyCal + (carbQty/100)*carbFood.calories;
    
    displayTotal('po', totalP, totalC, totalF, totalCal);
    displayStatus('po', totalP, totalC, t.protein, t.carbs);
    
    mealData.postworkout = {totalP, totalC, totalF, totalCal};
}

// DINNER CALCULATION (similar to lunch but smaller)
function calculateDinner() {
    const t = TARGETS[currentWeek].dinner; // 30P, 80C
    
    const grain = document.getElementById('d1').value;
    const dal = document.getElementById('d2').value;
    const protein = document.getElementById('d3').value;
    
    if (!grain || !dal || !protein) {
        clearMeal('d', 4);
        return;
    }
    
    const grainFood = FOOD_DATABASE.find(f => f.name === grain);
    const dalFood = FOOD_DATABASE.find(f => f.name === dal);
    const proteinFood = FOOD_DATABASE.find(f => f.name === protein);
    
    // FIXED: Vegetables 120g
    const vegP = 1.9, vegC = 7.9, vegF = 0.2;
    
    const remainP = t.protein - vegP;
    const remainC = t.carbs - vegC;
    
    // Same distribution as lunch
    const proteinTargetP = remainP * 0.50;
    const dalTargetP = remainP * 0.30;
    const grainTargetP = remainP * 0.20;
    
    let proteinQty = (proteinTargetP / proteinFood.protein) * 100;
    let dalQty = (dalTargetP / dalFood.protein) * 100;
    let grainQty = (grainTargetP / grainFood.protein) * 100;
    
    let carbsAchieved = (proteinQty/100)*proteinFood.carbs + 
                        (dalQty/100)*dalFood.carbs + 
                        (grainQty/100)*grainFood.carbs;
    
    const carbGap = remainC - carbsAchieved;
    
    if (carbGap > 0) {
        grainQty += (carbGap / grainFood.carbs) * 100;
    }
    
    grainQty = Math.round(grainQty);
    dalQty = Math.round(dalQty);
    proteinQty = Math.round(proteinQty);
    
    displayItem('d1', grainQty, grainFood);
    displayItem('d2', dalQty, dalFood);
    displayItem('d3', proteinQty, proteinFood);
    
    const totalP = (grainQty/100)*grainFood.protein + (dalQty/100)*dalFood.protein + 
                   (proteinQty/100)*proteinFood.protein + vegP;
    const totalC = (grainQty/100)*grainFood.carbs + (dalQty/100)*dalFood.carbs + 
                   (proteinQty/100)*proteinFood.carbs + vegC;
    const totalF = (grainQty/100)*grainFood.fats + (dalQty/100)*dalFood.fats + 
                   (proteinQty/100)*proteinFood.fats + vegF;
    const totalCal = (grainQty/100)*grainFood.calories + (dalQty/100)*dalFood.calories + 
                     (proteinQty/100)*proteinFood.calories + 35;
    
    displayTotal('d', totalP, totalC, totalF, totalCal);
    displayStatus('d', totalP, totalC, t.protein, t.carbs);
    
    mealData.dinner = {totalP, totalC, totalF, totalCal};
}

// DISPLAY FUNCTIONS
function displayItem(id, qty, food) {
    const qtyEl = document.getElementById(id + '-qty');
    const macrosEl = document.getElementById(id + '-macros');
    
    const m = qty / 100;
    const p = (food.protein * m).toFixed(1);
    const c = (food.carbs * m).toFixed(1);
    const f = (food.fats * m).toFixed(1);
    
    qtyEl.textContent = Math.round(qty) + (id === 'b2' ? 'ml' : 'g');
    macrosEl.textContent = `P:${p} C:${c} F:${f}`;
}

function clearItem(id) {
    document.getElementById(id + '-qty').textContent = '0g';
    document.getElementById(id + '-macros').textContent = '-';
}

function displayTotal(prefix, p, c, f, cal) {
    const el = document.getElementById(prefix + '-total');
    el.textContent = `TOTAL: P:${p.toFixed(1)}g | C:${c.toFixed(1)}g | F:${f.toFixed(1)}g | ${Math.round(cal)} cal`;
}

function displayStatus(prefix, p, c, targetP, targetC) {
    const el = document.getElementById(prefix + '-status');
    if (!el) return;
    
    const pPercent = Math.round((p / targetP) * 100);
    const cPercent = Math.round((c / targetC) * 100);
    
    const pClass = pPercent >= 95 ? 'good' : pPercent >= 85 ? 'warning' : 'bad';
    const cClass = cPercent >= 95 ? 'good' : cPercent >= 85 ? 'warning' : 'bad';
    
    el.innerHTML = `
        <div class="${pClass}">Protein: ${p.toFixed(1)}g / ${targetP}g (${pPercent}%)</div>
        <div class="${cClass}">Carbs: ${c.toFixed(1)}g / ${targetC}g (${cPercent}%)</div>
    `;
}

function clearMeal(prefix, numItems) {
    for (let i = 1; i <= numItems; i++) {
        const id = prefix + i;
        const el = document.getElementById(id + '-qty');
        if (el && id !== prefix + '2' && id !== 'l4' && id !== 'l5' && id !== 'd4' && id !== 'po1') {
            clearItem(id);
        }
    }
    const totalEl = document.getElementById(prefix + '-total');
    if (totalEl) totalEl.textContent = 'TOTAL: Waiting for selection...';
    
    const statusEl = document.getElementById(prefix + '-status');
    if (statusEl) statusEl.innerHTML = '';
}

// UPDATE DAILY SUMMARY
function updateDailySummary() {
    let totalP = 0, totalC = 0, totalF = 0, totalCal = 0;
    
    Object.values(mealData).forEach(meal => {
        totalP += meal.totalP || 0;
        totalC += meal.totalC || 0;
        totalF += meal.totalF || 0;
        totalCal += meal.totalCal || 0;
    });
    
    const t = TARGETS[currentWeek].daily;
    
    document.getElementById('daily-p').textContent = totalP.toFixed(1) + 'g';
    document.getElementById('daily-c').textContent = totalC.toFixed(1) + 'g';
    document.getElementById('daily-cal').textContent = Math.round(totalCal);
    
    const pPercent = Math.round((totalP / t.protein) * 100);
    const cPercent = Math.round((totalC / t.carbs) * 100);
    const calPercent = Math.round((totalCal / t.calories) * 100);
    
    document.getElementById('status-p').textContent = pPercent >= 95 ? '🟢' : pPercent >= 85 ? '🟡' : '🔴';
    document.getElementById('status-c').textContent = cPercent >= 95 ? '🟢' : cPercent >= 85 ? '🟡' : '🔴';
    document.getElementById('status-cal').textContent = calPercent >= 95 ? '🟢' : calPercent >= 85 ? '🟡' : '🔴';
    
    const avgPercent = (pPercent + cPercent + calPercent) / 3;
    const msgEl = document.getElementById('final-message');
    
    if (avgPercent >= 95) {
        msgEl.textContent = `🎉 PERFECT! You achieved ${Math.round(avgPercent)}% - CHAMPION LEVEL!`;
        msgEl.style.background = '#c8e6c9';
    } else if (avgPercent >= 85) {
        msgEl.textContent = `💪 EXCELLENT! You achieved ${Math.round(avgPercent)}% - Keep it up!`;
        msgEl.style.background = '#fff9c4';
    } else if (avgPercent > 0) {
        msgEl.textContent = `👍 Good start! You achieved ${Math.round(avgPercent)}%`;
        msgEl.style.background = '#ffcc80';
    } else {
        msgEl.textContent = 'Select your foods to see daily nutrition summary';
        msgEl.style.background = '#e0e0e0';
    }
}

// SAVE TO GOOGLE SHEETS
async function saveData() {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('❌ Please select a date first!');
        return;
    }
    
    // Collect all data
    const saveData = {
        date: date,
        week: currentWeek,
        targets: TARGETS[currentWeek],
        summary: {
            protein: mealData.breakfast?.totalP + mealData.lunch?.totalP + mealData.preworkout?.totalP + 
                    mealData.postworkout?.totalP + mealData.dinner?.totalP || 0,
            carbs: mealData.breakfast?.totalC + mealData.lunch?.totalC + mealData.preworkout?.totalC + 
                  mealData.postworkout?.totalC + mealData.dinner?.totalC || 0,
            fats: mealData.breakfast?.totalF + mealData.lunch?.totalF + mealData.preworkout?.totalF + 
                 mealData.postworkout?.totalF + mealData.dinner?.totalF || 0,
            calories: mealData.breakfast?.totalCal + mealData.lunch?.totalCal + mealData.preworkout?.totalCal + 
                     mealData.postworkout?.totalCal + mealData.dinner?.totalCal || 0
        },
        meals: {}
    };
    
    // Collect each meal
    ['breakfast', 'lunch', 'preworkout', 'postworkout', 'dinner'].forEach(meal => {
        const prefix = meal.substring(0, meal === 'preworkout' || meal === 'postworkout' ? 2 : 1);
        const totalEl = document.getElementById(prefix + '-total');
        saveData.meals[meal] = {
            totals: totalEl ? totalEl.textContent : '',
            selections: []
        };
    });
    
    // Save to localStorage
    localStorage.setItem(`nutrition_${date}`, JSON.stringify(saveData));
    
    // Google Sheets URL - UPDATE THIS!
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        alert(`✅ Data saved locally for ${date}!\n\n⚠️ To save to Google Sheets:\n1. Follow DEPLOYMENT_GUIDE.md\n2. Update GOOGLE_SCRIPT_URL in script.js`);
        // Clear form for next day
        setTimeout(() => location.reload(), 2000);
        return;
    }
    
    // Save to Google Sheets
    const btn = document.getElementById('save-btn');
    btn.textContent = '💾 SAVING...';
    btn.disabled = true;
    
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(saveData)
        });
        
        btn.textContent = '✅ SAVED!';
        alert(`✅ Data saved to Google Sheets for ${date}!\n\nForm will refresh for next day.`);
        
        setTimeout(() => location.reload(), 2000);
        
    } catch (error) {
        btn.textContent = '💾 SAVE TO GOOGLE SHEETS';
        btn.disabled = false;
        alert(`✅ Saved locally!\n\n❌ Google Sheets error: ${error.message}`);
    }
}
