// PROFESSIONAL NUTRITION DATABASE - Google Engineer + Dietician + Trainer Approved
// All values per 100g unless specified

const FOOD_DATABASE = {
    // BREAKFAST MAINS
    breakfast_main: [
        {name: 'Poha', p: 6.6, c: 76.9, f: 1.5, cal: 340},
        {name: 'Oats', p: 13.0, c: 64.0, f: 7.0, cal: 380},
        {name: 'Idli (4 pieces)', p: 3.6, c: 22.7, f: 0.9, cal: 118},
        {name: 'Upma (Sooji)', p: 11.0, c: 73.0, f: 0.6, cal: 348},
        {name: 'Dalia', p: 11.5, c: 71.0, f: 1.8, cal: 340},
        {name: 'Brown Bread', p: 9.0, c: 42.0, f: 2.5, cal: 220}
    ],
    
    // FRUITS
    fruits: [
        {name: 'Banana', p: 1.3, c: 27.0, f: 0.4, cal: 105},
        {name: 'Apple', p: 0.3, c: 14.0, f: 0.2, cal: 52},
        {name: 'Papaya', p: 0.6, c: 11.0, f: 0.1, cal: 43},
        {name: 'Orange', p: 0.9, c: 12.0, f: 0.1, cal: 47},
        {name: 'Pomegranate', p: 1.7, c: 19.0, f: 1.2, cal: 83},
        {name: 'Guava', p: 2.6, c: 14.0, f: 1.0, cal: 68},
        {name: 'Kiwi', p: 1.1, c: 15.0, f: 0.5, cal: 61},
        {name: 'Watermelon', p: 0.6, c: 8.0, f: 0.2, cal: 30},
        {name: 'Mango', p: 0.8, c: 15.0, f: 0.4, cal: 60}
    ],
    
    // NUTS
    nuts: [
        {name: 'Peanuts', p: 26.0, c: 16.0, f: 49.0, cal: 567},
        {name: 'Mixed Nuts', p: 16.0, c: 11.0, f: 64.0, cal: 684},
        {name: 'Almonds', p: 21.0, c: 22.0, f: 50.0, cal: 576},
        {name: 'Cashews', p: 18.0, c: 30.0, f: 44.0, cal: 553},
        {name: 'Walnuts', p: 15.0, c: 14.0, f: 65.0, cal: 654}
    ],
    
    // GRAINS
    grains: [
        {name: 'Rice (White)', p: 7.0, c: 78.0, f: 0.7, cal: 345},
        {name: 'Rice (Brown)', p: 7.5, c: 76.0, f: 2.0, cal: 350},
        {name: 'Wheat Roti', p: 11.8, c: 69.0, f: 1.7, cal: 340},
        {name: 'Jowar Roti', p: 10.4, c: 67.7, f: 1.9, cal: 329},
        {name: 'Bajra Roti', p: 11.6, c: 67.5, f: 5.0, cal: 361},
        {name: 'Ragi Roti', p: 7.3, c: 72.0, f: 1.3, cal: 328},
        {name: 'Quinoa', p: 14.0, c: 64.0, f: 6.0, cal: 368}
    ],
    
    // DALS
    dals: [
        {name: 'Moong Dal', p: 24.0, c: 63.0, f: 1.2, cal: 347},
        {name: 'Masoor Dal', p: 25.1, c: 60.1, f: 1.1, cal: 343},
        {name: 'Toor Dal', p: 22.3, c: 60.9, f: 1.5, cal: 335},
        {name: 'Chana Dal', p: 22.5, c: 57.2, f: 6.0, cal: 372},
        {name: 'Urad Dal', p: 25.2, c: 59.6, f: 1.4, cal: 341},
        {name: 'Chole', p: 19.0, c: 61.0, f: 6.1, cal: 364},
        {name: 'Rajma', p: 22.9, c: 60.3, f: 0.8, cal: 333}
    ],
    
    // PROTEINS
    proteins: [
        {name: 'Paneer', p: 18.0, c: 3.0, f: 22.0, cal: 282},
        {name: 'Tofu', p: 12.0, c: 2.0, f: 6.0, cal: 94},
        {name: 'Soy Chunks', p: 54.0, c: 36.0, f: 1.4, cal: 326}
    ],
    
    // PRE-WORKOUT (PURE CARBS)
    preworkout: [
        {name: 'Banana', p: 1.3, c: 27.0, f: 0.4, cal: 105},
        {name: 'Apple', p: 0.3, c: 14.0, f: 0.2, cal: 52},
        {name: 'Dates', p: 2.5, c: 75.0, f: 0.4, cal: 282},
        {name: 'Raisins', p: 3.0, c: 79.0, f: 0.5, cal: 299},
        {name: 'Honey', p: 0.3, c: 82.0, f: 0.0, cal: 304},
        {name: 'Orange Juice', p: 0.7, c: 11.0, f: 0.2, cal: 45}
    ],
    
    // POST-WORKOUT CARBS
    postcarbs: [
        {name: 'Banana', p: 1.3, c: 27.0, f: 0.4, cal: 105},
        {name: 'Dates', p: 2.5, c: 75.0, f: 0.4, cal: 282},
        {name: 'Raisins', p: 3.0, c: 79.0, f: 0.5, cal: 299},
        {name: 'Honey', p: 0.3, c: 82.0, f: 0.0, cal: 304}
    ],
    
    // SNACKS
    snacks: [
        {name: 'Banana', p: 1.3, c: 27.0, f: 0.4, cal: 105},
        {name: 'Apple', p: 0.3, c: 14.0, f: 0.2, cal: 52},
        {name: 'Buttermilk', p: 3.0, c: 4.5, f: 0.5, cal: 40},
        {name: 'Dates', p: 2.5, c: 75.0, f: 0.4, cal: 282},
        {name: 'Peanuts', p: 26.0, c: 16.0, f: 49.0, cal: 567}
    ],
    
    // BEFORE BED
    bed: [
        {name: 'Turmeric Milk', p: 3.5, c: 6.0, f: 1.5, cal: 50},
        {name: 'Plain Curd', p: 4.0, c: 4.4, f: 3.1, cal: 62},
        {name: 'Casein Protein', p: 78.0, c: 8.0, f: 2.0, cal: 360}
    ]
};

// FIXED ITEMS (nutritional values for standard portions)
const FIXED_ITEMS = {
    milk_200ml: {qty: 200, p: 7.0, c: 10.0, f: 3.0, cal: 90},
    whey_30g: {qty: 30, p: 24.0, c: 3.0, f: 1.5, cal: 123},
    whey_15g: {qty: 15, p: 12.0, c: 1.5, f: 0.75, cal: 62},
    veg_120g: {qty: 120, p: 1.9, c: 7.9, f: 0.2, cal: 35},
    curd_150g: {qty: 150, p: 6.0, c: 6.6, f: 4.7, cal: 93},
    creatine_5g: {qty: 5, p: 0, c: 0, f: 0, cal: 0}
};

// WEEKLY TARGETS - 100% COMPLIANCE MANDATORY
const WEEKLY_TARGETS = {
    '1-2': {
        breakfast: {p: 30, c: 75},
        midmorning: {p: 5, c: 25},
        lunch: {p: 40, c: 110},
        afternoon: {p: 3, c: 20},
        preworkout: {p: 0, c: 30},
        postworkout: {p: 25, c: 25},
        dinner: {p: 30, c: 80},
        bed: {p: 8, c: 15},
        daily: {p: 130, c: 300, f: 50, cal: 2200}
    },
    '3-4': {
        breakfast: {p: 30, c: 75},
        midmorning: {p: 5, c: 25},
        lunch: {p: 40, c: 110},
        afternoon: {p: 3, c: 20},
        preworkout: {p: 0, c: 30},
        postworkout: {p: 25, c: 25},
        dinner: {p: 30, c: 80},
        bed: {p: 8, c: 15},
        daily: {p: 135, c: 325, f: 58, cal: 2350}
    },
    '5-6': {
        breakfast: {p: 30, c: 75},
        midmorning: {p: 5, c: 25},
        lunch: {p: 40, c: 110},
        afternoon: {p: 3, c: 20},
        preworkout: {p: 0, c: 30},
        postworkout: {p: 25, c: 25},
        dinner: {p: 30, c: 80},
        bed: {p: 8, c: 15},
        daily: {p: 140, c: 350, f: 61, cal: 2500}
    }
};
