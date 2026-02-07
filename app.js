// MAIN APPLICATION - Professional Grade
let currentWeek = '3-4';
let mealData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    document.getElementById('week').addEventListener('change', updateWeek);
    buildMealUI();
    updateTargets();
});

function updateWeek() {
    currentWeek = document.getElementById('week').value;
    updateTargets();
    calculate();
}

function updateTargets() {
    const t = WEEKLY_TARGETS[currentWeek].daily;
    document.getElementById('tgt-p').textContent = t.p + 'g';
    document.getElementById('tgt-c').textContent = t.c + 'g';
    document.getElementById('tgt-f').textContent = t.f + 'g';
    document.getElementById('tgt-cal').textContent = t.cal;
}

// Build UI for all meals
function buildMealUI() {
    const mealsContainer = document.getElementById('meals');
    const meals = [
        {id:'em', name:'🌅 EARLY MORNING (6:30 AM)', target:'Water + Supplements'},
        {id:'bf', name:'🍳 BREAKFAST (8:30 AM)', target:'30g P | 75g C'},
        {id:'mm', name:'🍎 MID-MORNING (11:00 AM)', target:'5g P | 25g C'},
        {id:'ln', name:'🍛 LUNCH (1:30 PM)', target:'40g P | 110g C'},
        {id:'as', name:'🥤 AFTERNOON (3:30 PM)', target:'Optional'},
        {id:'pw', name:'⚡ PRE-WORKOUT (4:45 PM)', target:'30g C (CARBS ONLY)'},
        {id:'po', name:'🏋️ POST-WORKOUT (6:30 PM)', target:'25g P | 25g C'},
        {id:'dn', name:'🍽️ DINNER (8:15 PM)', target:'30g P | 80g C'},
        {id:'bd', name:'🌙 BEFORE BED (10:15 PM)', target:'8g P | 15g C'}
    ];
    
    meals.forEach(meal => {
        mealsContainer.innerHTML += createMealHTML(meal);
    });
    
    attachEventListeners();
}

function createMealHTML(meal) {
    let html = `<div class="meal"><div class="meal-header"><h3>${meal.name}</h3><div class="target">${meal.target}</div></div><div class="meal-body">`;
    
    // Meal-specific content
    if (meal.id === 'em') {
        html += `
            <div class="checkbox-item">
                <input type="checkbox" id="em-water" checked onchange="calculate()">
                <label>Water 500ml</label>
                <div class="macros">Mandatory</div>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="em-vitd" onchange="calculate()">
                <label>Vitamin D3</label>
                <div class="macros">Optional</div>
            </div>
            <div class="checkbox-item">
                <input type="checkbox" id="em-whey" onchange="calculate()">
                <label>Whey Half Scoop (15g)</label>
                <div class="macros">P:12.0 C:1.5 F:0.75</div>
            </div>`;
    } else if (meal.id === 'bf') {
        html += createDropdownItem('bf1', 'Choose Main', 'breakfast_main');
        html += `<div class="checkbox-item"><input type="checkbox" id="bf-milk" checked onchange="calculate()"><label>Milk 200ml</label><div class="macros">P:7.0 C:10.0 F:3.0</div></div>`;
        html += createDropdownItem('bf2', 'Choose Fruit', 'fruits');
        html += createDropdownItem('bf3', 'Nuts (Optional)', 'nuts', true);
    } else if (meal.id === 'mm') {
        html += createDropdownItem('mm1', 'Choose Fruit', 'fruits');
        html += createDropdownItem('mm2', 'Nuts (Optional)', 'nuts', true);
    } else if (meal.id === 'ln') {
        html += createDropdownItem('ln1', 'Choose Grain', 'grains');
        html += createDropdownItem('ln2', 'Choose Dal', 'dals');
        html += createDropdownItem('ln3', 'Choose Protein', 'proteins');
        html += `<div class="checkbox-item"><input type="checkbox" id="ln-veg" checked onchange="calculate()"><label>Vegetables 120g</label><div class="macros">P:1.9 C:7.9 F:0.2</div></div>`;
        html += `<div class="checkbox-item"><input type="checkbox" id="ln-curd" checked onchange="calculate()"><label>Curd 150g</label><div class="macros">P:6.0 C:6.6 F:4.7</div></div>`;
    } else if (meal.id === 'as') {
        html += createDropdownItem('as1', 'Choose Snack (Optional)', 'snacks', true);
    } else if (meal.id === 'pw') {
        html += createDropdownItem('pw1', 'Choose Fast Carb', 'preworkout');
    } else if (meal.id === 'po') {
        html += `<div class="checkbox-item"><input type="checkbox" id="po-whey" checked onchange="calculate()"><label>Whey 1 Scoop (30g)</label><div class="macros">P:24.0 C:3.0 F:1.5</div></div>`;
        html += createDropdownItem('po1', 'Fast Carb (Optional)', 'postcarbs', true);
        html += `<div class="checkbox-item"><input type="checkbox" id="po-creat" onchange="calculate()"><label>Creatine 5g</label><div class="macros">Mix in shake</div></div>`;
    } else if (meal.id === 'dn') {
        html += createDropdownItem('dn1', 'Choose Grain', 'grains');
        html += createDropdownItem('dn2', 'Choose Dal', 'dals');
        html += createDropdownItem('dn3', 'Choose Protein', 'proteins');
        html += `<div class="checkbox-item"><input type="checkbox" id="dn-veg" checked onchange="calculate()"><label>Vegetables 120g</label><div class="macros">P:1.9 C:7.9 F:0.2</div></div>`;
    } else if (meal.id === 'bd') {
        html += createDropdownItem('bd1', 'Choose ONE', 'bed');
    }
    
    html += `<div class="total" id="${meal.id}-total">TOTAL: Select items</div>`;
    if (meal.id !== 'em' && meal.id !== 'as') {
        html += `<div class="status-grid" id="${meal.id}-status"></div>`;
    }
    html += `</div></div>`;
    return html;
}

function createDropdownItem(id, label, category, optional = false) {
    const foods = FOOD_DATABASE[category];
    let options = optional ? '<option value="">-- Skip --</option>' : '<option value="">-- Select --</option>';
    foods.forEach(f => {
        options += `<option value="${f.name}">${f.name}</option>`;
    });
    return `
        <div class="item">
            <div class="item-label">${label}:</div>
            <div class="item-row">
                <select id="${id}" onchange="calculate()">${options}</select>
                <input type="number" class="qty" id="${id}-qty" value="0" min="0" step="5" onchange="rebalance('${id}')">
                <div class="macros" id="${id}-macros">-</div>
            </div>
        </div>`;
}

function attachEventListeners() {
    document.getElementById('btnSave').addEventListener('click', saveData);
}

// MAIN CALCULATION
function calculate() {
    mealData = {};
    calcEarlyMorning();
    calcBreakfast();
    calcMidMorning();
    calcLunch();
    calcAfternoon();
    calcPreWorkout();
    calcPostWorkout();
    calcDinner();
    calcBed();
    updateDailySummary();
}

function calcEarlyMorning() {
    let p=0, c=0, f=0, cal=0;
    if (document.getElementById('em-whey')?.checked) {
        const whey = FIXED_ITEMS.whey_15g;
        p += whey.p; c += whey.c; f += whey.f; cal += whey.cal;
    }
    document.getElementById('em-total').textContent = `TOTAL: P:${p.toFixed(1)}g C:${c.toFixed(1)}g F:${f.toFixed(1)}g | ${Math.round(cal)} cal`;
    mealData.em = {p, c, f, cal};
}

function calcBreakfast() {
    const target = WEEKLY_TARGETS[currentWeek].breakfast;
    const selected = getSelected(['bf1', 'bf2', 'bf3']);
    if (selected.length === 0) return;
    
    let fixed = [];
    if (document.getElementById('bf-milk')?.checked) {
        fixed.push(FIXED_ITEMS.milk_200ml);
    }
    
    const qtys = NutritionCalculator.calculateMeal(selected, fixed, target);
    displayMeal('bf', selected, qtys, fixed, target);
}

function calcMidMorning() {
    const target = WEEKLY_TARGETS[currentWeek].midmorning;
    const selected = getSelected(['mm1', 'mm2']);
    if (selected.length === 0) return;
    const qtys = NutritionCalculator.calculateMeal(selected, [], target);
    displayMeal('mm', selected, qtys, [], target);
}

function calcLunch() {
    const target = WEEKLY_TARGETS[currentWeek].lunch;
    const selected = getSelected(['ln1', 'ln2', 'ln3']);
    if (selected.length === 0) return;
    
    let fixed = [];
    if (document.getElementById('ln-veg')?.checked) fixed.push(FIXED_ITEMS.veg_120g);
    if (document.getElementById('ln-curd')?.checked) fixed.push(FIXED_ITEMS.curd_150g);
    
    const qtys = NutritionCalculator.calculateMeal(selected, fixed, target);
    displayMeal('ln', selected, qtys, fixed, target);
}

function calcAfternoon() {
    const selected = getSelected(['as1']);
    if (selected.length === 0) {
        document.getElementById('as-total').textContent = 'TOTAL: Optional';
        mealData.as = {p:0, c:0, f:0, cal:0};
        return;
    }
    const qty = 100;
    document.getElementById('as1-qty').value = qty;
    const m = qty / 100;
    const food = selected[0];
    document.getElementById('as1-macros').textContent = `P:${(food.p*m).toFixed(1)} C:${(food.c*m).toFixed(1)} F:${(food.f*m).toFixed(1)}`;
    document.getElementById('as-total').textContent = `TOTAL: P:${(food.p*m).toFixed(1)}g C:${(food.c*m).toFixed(1)}g F:${(food.f*m).toFixed(1)}g | ${Math.round(food.cal*m)} cal`;
    mealData.as = {p:food.p*m, c:food.c*m, f:food.f*m, cal:food.cal*m};
}

function calcPreWorkout() {
    const target = WEEKLY_TARGETS[currentWeek].preworkout;
    const selected = getSelected(['pw1']);
    if (selected.length === 0) return;
    const qtys = NutritionCalculator.calculateMeal(selected, [], target);
    displayMeal('pw', selected, qtys, [], target);
}

function calcPostWorkout() {
    const target = WEEKLY_TARGETS[currentWeek].postworkout;
    const selected = getSelected(['po1']);
    
    let fixed = [];
    if (document.getElementById('po-whey')?.checked) {
        fixed.push(FIXED_ITEMS.whey_30g);
    }
    
    if (selected.length === 0 && fixed.length > 0) {
        let p=0, c=0, f=0, cal=0;
        fixed.forEach(item => {
            p += item.p; c += item.c; f += item.f; cal += item.cal;
        });
        document.getElementById('po-total').textContent = `TOTAL: P:${p.toFixed(1)}g C:${c.toFixed(1)}g F:${f.toFixed(1)}g | ${Math.round(cal)} cal`;
        displayMealStatus('po', p, c, target.p, target.c);
        mealData.po = {p, c, f, cal};
        return;
    }
    
    const qtys = NutritionCalculator.calculateMeal(selected, fixed, target);
    displayMeal('po', selected, qtys, fixed, target);
}

function calcDinner() {
    const target = WEEKLY_TARGETS[currentWeek].dinner;
    const selected = getSelected(['dn1', 'dn2', 'dn3']);
    if (selected.length === 0) return;
    
    let fixed = [];
    if (document.getElementById('dn-veg')?.checked) fixed.push(FIXED_ITEMS.veg_120g);
    
    const qtys = NutritionCalculator.calculateMeal(selected, fixed, target);
    displayMeal('dn', selected, qtys, fixed, target);
}

function calcBed() {
    const target = WEEKLY_TARGETS[currentWeek].bed;
    const selected = getSelected(['bd1']);
    if (selected.length === 0) return;
    const qtys = NutritionCalculator.calculateMeal(selected, [], target);
    displayMeal('bd', selected, qtys, [], target);
}

// Helper functions
function getSelected(ids) {
    const foods = [];
    ids.forEach(id => {
        const select = document.getElementById(id);
        if (select && select.value) {
            const category = select.id.substring(0, 2);
            const catMap = {bf:'breakfast_main', mm:'fruits', ln:'grains', as:'snacks', pw:'preworkout', po:'postcarbs', dn:'grains', bd:'bed'};
            if (id.includes('2')) catMap[category] = id.includes('bf') || id.includes('mm') ? 'fruits' : 'dals';
            if (id.includes('3')) catMap[category] = id.includes('bf') || id.includes('mm') ? 'nuts' : 'proteins';
            
            // Find correct category
            let dbCategory = '';
            if (id.startsWith('bf')) dbCategory = id.endsWith('1') ? 'breakfast_main' : id.endsWith('2') ? 'fruits' : 'nuts';
            else if (id.startsWith('mm')) dbCategory = id.endsWith('1') ? 'fruits' : 'nuts';
            else if (id.startsWith('ln') || id.startsWith('dn')) {
                dbCategory = id.endsWith('1') ? 'grains' : id.endsWith('2') ? 'dals' : 'proteins';
            }
            else if (id.startsWith('as')) dbCategory = 'snacks';
            else if (id.startsWith('pw')) dbCategory = 'preworkout';
            else if (id.startsWith('po')) dbCategory = 'postcarbs';
            else if (id.startsWith('bd')) dbCategory = 'bed';
            
            const food = FOOD_DATABASE[dbCategory]?.find(f => f.name === select.value);
            if (food) foods.push(food);
        }
    });
    return foods;
}

function displayMeal(prefix, foods, qtys, fixed, target) {
    let totalP = 0, totalC = 0, totalF = 0, totalCal = 0;
    
    // Fixed items
    fixed.forEach(item => {
        totalP += item.p; totalC += item.c; totalF += item.f; totalCal += item.cal;
    });
    
    // Variable items
    foods.forEach((food, i) => {
        const id = prefix + (i + 1);
        const qty = qtys[i];
        document.getElementById(id + '-qty').value = qty;
        const m = qty / 100;
        totalP += food.p * m;
        totalC += food.c * m;
        totalF += food.f * m;
        totalCal += food.cal * m;
        document.getElementById(id + '-macros').textContent = `P:${(food.p*m).toFixed(1)} C:${(food.c*m).toFixed(1)} F:${(food.f*m).toFixed(1)}`;
    });
    
    document.getElementById(prefix + '-total').textContent = `TOTAL: P:${totalP.toFixed(1)}g C:${totalC.toFixed(1)}g F:${totalF.toFixed(1)}g | ${Math.round(totalCal)} cal`;
    displayMealStatus(prefix, totalP, totalC, target.p, target.c);
    mealData[prefix] = {p: totalP, c: totalC, f: totalF, cal: totalCal};
}

function displayMealStatus(prefix, p, c, targetP, targetC) {
    const statusEl = document.getElementById(prefix + '-status');
    if (!statusEl) return;
    const pPct = Math.round((p / targetP) * 100);
    const cPct = Math.round((c / targetC) * 100);
    const pClass = pPct >= 100 ? 'status-good' : pPct >= 95 ? 'status-warn' : 'status-bad';
    const cClass = cPct >= 100 ? 'status-good' : cPct >= 95 ? 'status-warn' : 'status-bad';
    statusEl.innerHTML = `
        <div class="${pClass}">Protein: ${p.toFixed(1)}g / ${targetP}g (${pPct}%)</div>
        <div class="${cClass}">Carbs: ${c.toFixed(1)}g / ${targetC}g (${cPct}%)</div>`;
}

function updateDailySummary() {
    let totalP = 0, totalC = 0, totalF = 0, totalCal = 0;
    Object.values(mealData).forEach(m => {
        totalP += m.p || 0;
        totalC += m.c || 0;
        totalF += m.f || 0;
        totalCal += m.cal || 0;
    });
    
    const t = WEEKLY_TARGETS[currentWeek].daily;
    document.getElementById('sum-p').textContent = totalP.toFixed(1) + 'g';
    document.getElementById('sum-c').textContent = totalC.toFixed(1) + 'g';
    document.getElementById('sum-f').textContent = totalF.toFixed(1) + 'g';
    document.getElementById('sum-cal').textContent = Math.round(totalCal);
    
    const pPct = Math.round((totalP / t.p) * 100);
    const cPct = Math.round((totalC / t.c) * 100);
    const fPct = Math.round((totalF / t.f) * 100);
    const calPct = Math.round((totalCal / t.cal) * 100);
    
    document.getElementById('st-p').textContent = pPct >= 100 ? '🟢' : pPct >= 95 ? '🟡' : '🔴';
    document.getElementById('st-c').textContent = cPct >= 100 ? '🟢' : cPct >= 95 ? '🟡' : '🔴';
    document.getElementById('st-f').textContent = fPct >= 90 ? '🟢' : fPct >= 80 ? '🟡' : '🔴';
    document.getElementById('st-cal').textContent = calPct >= 100 ? '🟢' : calPct >= 95 ? '🟡' : '🔴';
}

function rebalance(id) {
    calculate(); // Simple recalculate for now
}

// Save to Google Sheets
async function saveData() {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('Please select a date!');
        return;
    }
    
    const data = {date, week: currentWeek, meals: mealData, targets: WEEKLY_TARGETS[currentWeek]};
    localStorage.setItem(`nutrition_${date}`, JSON.stringify(data));
    
    const URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    if (URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        alert('✅ Saved locally! Setup Google Sheets to save online.');
        setTimeout(() => location.reload(), 2000);
        return;
    }
    
    try {
        await fetch(URL, {method: 'POST', mode: 'no-cors', body: JSON.stringify(data)});
        alert('✅ Saved to Google Sheets!');
        setTimeout(() => location.reload(), 2000);
    } catch (e) {
        alert('✅ Saved locally! Google Sheets error.');
    }
}
